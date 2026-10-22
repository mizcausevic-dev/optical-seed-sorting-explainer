import { render } from "./render.js";
import {
  FPS,
  LAST_FRAME,
  CHAPTERS,
  captionAt,
  chapterAt,
  timeMode,
} from "./model.js";

const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("play");
const scrub = document.getElementById("scrub");
const readout = document.getElementById("frame-readout");
const frameLabel = document.getElementById("frame-label");
const caption = document.getElementById("caption");
const timeBadge = document.getElementById("time-mode");
const chapterButtons = [...document.querySelectorAll(".chapters button")];

const params = new URLSearchParams(location.search);
const requested = Number(params.get("frame"));
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let frame = Number.isFinite(requested) ? Math.max(0, Math.min(LAST_FRAME, Math.round(requested))) : 0;
let playing = params.get("play") === "1" || (!reduce && !Number.isFinite(requested));
let acc = 0;
let last = 0;
let view = { w: 1, h: 1 };

function resize() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  view = { w: canvas.clientWidth, h: canvas.clientHeight };
  canvas.width = Math.max(1, Math.round(view.w * dpr));
  canvas.height = Math.max(1, Math.round(view.h * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function pad(n) {
  return String(n).padStart(4, "0");
}

function paint() {
  render(ctx, view.w, view.h, frame);
  const chapter = chapterAt(frame);
  readout.textContent = `${pad(frame)} / 1019`;
  frameLabel.textContent = `Frame ${frame} of 1019, ${chapter.title}`;
  scrub.value = String(frame);
  scrub.setAttribute("aria-valuenow", String(frame));
  scrub.setAttribute("aria-valuetext", `${chapter.title}, ${timeMode(frame).toLowerCase()}`);
  caption.textContent = captionAt(frame);
  const mode = timeMode(frame).toLowerCase();
  timeBadge.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
  playButton.textContent = playing ? "Pause" : "Play";
  playButton.setAttribute("aria-label", playing ? "Pause" : "Play");
  for (const button of chapterButtons) {
    const start = Number(button.dataset.frame);
    const spec = CHAPTERS.find((item) => item.start === start);
    const on = spec && frame >= spec.start && frame <= spec.end;
    button.setAttribute("aria-current", on ? "true" : "false");
  }
  canvas.setAttribute("data-frame", String(frame));
  document.body.dataset.ready = "1";
}

function seek(next, pause = true) {
  frame = Math.max(0, Math.min(LAST_FRAME, Math.round(next)));
  if (pause) playing = false;
  acc = 0;
  paint();
}

playButton.addEventListener("click", () => {
  playing = !playing;
  if (playing && frame >= LAST_FRAME) frame = 0;
  last = performance.now();
  paint();
});

scrub.addEventListener("input", () => {
  seek(Number(scrub.value), true);
});

for (const button of chapterButtons) {
  button.addEventListener("click", () => seek(Number(button.dataset.frame), true));
}

window.addEventListener("keydown", (event) => {
  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
    playButton.click();
  } else if (event.key === "ArrowRight") {
    seek(frame + (event.shiftKey ? 30 : 1), true);
  } else if (event.key === "ArrowLeft") {
    seek(frame - (event.shiftKey ? 30 : 1), true);
  } else if (event.key === "Home") {
    seek(0, true);
  } else if (event.key === "End") {
    seek(LAST_FRAME, true);
  }
});

window.addEventListener("resize", () => {
  resize();
  paint();
});

function tick(now) {
  if (!last) last = now;
  const delta = Math.min(100, now - last);
  last = now;
  if (playing) {
    acc += delta;
    const step = 1000 / FPS;
    while (acc >= step) {
      acc -= step;
      if (frame >= LAST_FRAME) {
        playing = false;
        break;
      }
      frame += 1;
    }
    paint();
  }
  requestAnimationFrame(tick);
}

resize();
paint();
requestAnimationFrame(tick);

window.__explainer = {
  seek,
  get frame() {
    return frame;
  },
  fps: FPS,
  lastFrame: LAST_FRAME,
};
