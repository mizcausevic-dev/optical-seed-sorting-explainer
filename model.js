/**
 * Deterministic scene model for the optical seed-sorting explainer.
 * Positions are functions of frame index only. Nothing here is a machine specification.
 */

export const FPS = 30;
export const FRAME_COUNT = 1020;
export const LAST_FRAME = FRAME_COUNT - 1;

export const PALETTE = {
  stage: "#0B1019",
  metal: "#344257",
  cyan: "#00E5FF",
  gold: "#FFD166",
  violet: "#9D4EDD",
  bone: "#E7ECF2",
  muted: "#93A0B5",
};

/** Side-section landmarks. Seed size is enlarged relative to the housing. */
export const GEO = {
  shell: { x: 136, y: 44, w: 980, h: 820 },
  hopper: { x: 206, y: 62, w: 156, h: 112 },
  tray: { x: 228, y: 178, w: 348, h: 36 },
  nozzle: { x: 548, y: 632 },
  camera: { x: 392, y: 392, w: 92, h: 70 },
  lamp: { x: 386, y: 292, w: 78, h: 30 },
  plate: { x: 804, y: 352, w: 18, h: 168 },
  acceptBin: { x: 548, y: 778, w: 188, h: 74 },
  rejectBin: { x: 868, y: 778, w: 188, h: 74 },
  measureS: 0.52,
  ejectS: 0.76,
};

const MAINLINE = [
  { s: 0.0, x: 284, y: 112 },
  { s: 0.06, x: 284, y: 170 },
  { s: 0.16, x: 368, y: 190 },
  { s: 0.3, x: 530, y: 196 },
  { s: 0.38, x: 598, y: 278 },
  { s: 0.46, x: 640, y: 372 },
  { s: 0.52, x: 654, y: 452 },
  { s: 0.62, x: 666, y: 542 },
  { s: 0.76, x: 676, y: 632 },
  { s: 0.88, x: 694, y: 742 },
  { s: 1, x: 642, y: 816 },
];

const REJECTLINE = [
  { s: 0.76, x: 676, y: 632 },
  { s: 0.84, x: 770, y: 692 },
  { s: 0.92, x: 868, y: 758 },
  { s: 1, x: 948, y: 816 },
];

/**
 * Eight-seed teaching cohort. Decisions are authored for the lesson.
 * They are not a sample, a yield, or an error rate.
 */
const SEED_DEFS = [
  {
    id: "S-14",
    decision: "accept",
    cue: "none",
    tilt: 0.15,
    phase: 0.4,
    plot: { x: 0.22, y: 0.24 },
    keys: [
      { f: 0, s: 0.58 },
      { f: 90, s: 0.74 },
      { f: 160, s: 0.9 },
      { f: 240, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-15",
    decision: "accept",
    cue: "none",
    tilt: -0.2,
    phase: 1.1,
    plot: { x: 0.3, y: 0.18 },
    keys: [
      { f: 0, s: 0.4 },
      { f: 149, s: 0.52 },
      { f: 220, s: 0.6 },
      { f: 300, s: 0.7 },
      { f: 420, s: 0.88 },
      { f: 520, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-16",
    decision: "reject",
    cue: "overlap",
    tilt: 0.85,
    phase: 2.2,
    plot: { x: 0.56, y: 0.5 },
    keys: [
      { f: 0, s: 0.26 },
      { f: 149, s: 0.42 },
      { f: 220, s: 0.52 },
      { f: 320, s: 0.58 },
      { f: 450, s: 0.68 },
      { f: 530, s: 0.76 },
      { f: 620, s: 0.94 },
      { f: 700, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-17",
    decision: "reject",
    cue: "surface",
    tilt: 0.35,
    phase: 0.8,
    plot: { x: 0.9, y: 0.86 },
    keys: [
      { f: 0, s: 0.15 },
      { f: 149, s: 0.32 },
      { f: 220, s: 0.44 },
      { f: 300, s: 0.52 },
      { f: 509, s: 0.6 },
      { f: 640, s: 0.76 },
      { f: 730, s: 0.9 },
      { f: 830, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-18",
    decision: "accept",
    cue: "none",
    tilt: -0.12,
    phase: 1.7,
    plot: { x: 0.18, y: 0.36 },
    keys: [
      { f: 0, s: 0.09 },
      { f: 149, s: 0.22 },
      { f: 300, s: 0.38 },
      { f: 509, s: 0.62 },
      { f: 600, s: 0.78 },
      { f: 700, s: 0.94 },
      { f: 780, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-19",
    decision: "accept",
    cue: "internal",
    tilt: 0.22,
    phase: 2.8,
    plot: { x: 0.34, y: 0.3 },
    keys: [
      { f: 0, s: 0.05 },
      { f: 149, s: 0.16 },
      { f: 300, s: 0.3 },
      { f: 509, s: 0.44 },
      { f: 700, s: 0.64 },
      { f: 860, s: 0.9 },
      { f: 980, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-20",
    decision: "accept",
    cue: "none",
    tilt: 0.08,
    phase: 3.4,
    plot: { x: 0.28, y: 0.44 },
    keys: [
      { f: 0, s: 0.03 },
      { f: 300, s: 0.18 },
      { f: 560, s: 0.36 },
      { f: 800, s: 0.7 },
      { f: 960, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
  {
    id: "S-21",
    decision: "accept",
    cue: "none",
    tilt: -0.28,
    phase: 4.1,
    plot: { x: 0.4, y: 0.2 },
    keys: [
      { f: 0, s: 0.012 },
      { f: 400, s: 0.14 },
      { f: 700, s: 0.36 },
      { f: 880, s: 0.78 },
      { f: 980, s: 1 },
      { f: 1019, s: 1 },
    ],
  },
];

export const SEEDS = SEED_DEFS;

export const CHAPTERS = [
  { id: "reveal", start: 0, end: 149, title: "System reveal", timeMode: "TIME COMPRESSED" },
  { id: "inspect", start: 150, end: 299, title: "Inspection pass", timeMode: "SLOW MOTION" },
  { id: "features", start: 300, end: 509, title: "Feature record", timeMode: "SLOW MOTION" },
  { id: "eject", start: 510, end: 749, title: "Timed ejection", timeMode: "SLOW MOTION" },
  { id: "output", start: 750, end: 1019, title: "Outputs and limits", timeMode: "TIME COMPRESSED" },
];

export const CAPTIONS = [
  { start: 0, end: 49, text: "A metered feeder releases seed into a spaced layer. The housing is a section: the near cover is omitted in the drawing, not taken off a machine." },
  { start: 50, end: 99, text: "The tray and chute carry seed toward an inspection region. Lamps and a camera face that region. Measurement has not removed anything." },
  { start: 100, end: 149, text: "Downstream are a timed air nozzle, an accept path, and a reject path. Detection and ejection are separate operations." },
  { start: 150, end: 199, text: "Slow motion. Spaced seeds cross a viewing plane. Selected sensor in this drawing: bichromatic reflectance, one visible band and one near-infrared band." },
  { start: 200, end: 249, text: "A record is created only after a seed crosses the viewing plane, and it stays tied to that seed. Surface discoloration can show in the visible band." },
  { start: 250, end: 299, text: "A near-infrared difference can carry internal information in published studies. Moisture, orientation, and biological variation move the signal too." },
  { start: 300, end: 359, text: "Enlarged feature inset. Color, outline, and a two-band index are separate readings. The leader line keeps the record on the physical seed." },
  { start: 360, end: 429, text: "Accept and reject signatures overlap. S-16 sits in the overlap and is marked uncertain. A threshold is an operating choice, not a property of the seed." },
  { start: 430, end: 509, text: "S-17 carries a visible surface cue on the reject side of the illustrated threshold. Seeds still upstream have no record yet." },
  { start: 510, end: 579, text: "S-17 leaves the camera and travels to the nozzle. Its record travels with it. S-16, still uncertain at the threshold, is already on the reject path." },
  { start: 580, end: 659, text: "One air pulse is timed for S-17. Accepted seeds are not pulsed. S-18 has already passed the nozzle and continues down the accept path." },
  { start: 660, end: 749, text: "The pulse diverts S-17 into the reject stream. The kernel remains in that stream. Spent air leaves the hood. The seed is not erased." },
  { start: 750, end: 829, text: "Time compressed. The eight illustrated seeds are sampled at the outputs. False accept and false reject are categories in this drawing, not a measured rate." },
  { start: 830, end: 929, text: "Qualitative balance: every illustrated kernel is accounted for. Light, drive, control power, and compressed air leave as heat or spent air." },
  { start: 930, end: 1019, text: "Stable system view. Optical sorting can remove some seeds that show an optical cue. It cannot guarantee removal of every internal condition, and it cannot prove pathogens are absent." },
];

const CAMERA_KEYS = [
  { f: 0, cx: 420, cy: 188, z: 2.05, ax: 0.55 },
  { f: 78, cx: 500, cy: 300, z: 1.38, ax: 0.48 },
  { f: 149, cx: 590, cy: 470, z: 0.9, ax: 0.5 },
  { f: 190, cx: 650, cy: 450, z: 1.82, ax: 0.4 },
  { f: 299, cx: 656, cy: 470, z: 1.98, ax: 0.38 },
  { f: 340, cx: 640, cy: 478, z: 1.7, ax: 0.33 },
  { f: 509, cx: 660, cy: 500, z: 1.74, ax: 0.33 },
  { f: 560, cx: 690, cy: 560, z: 1.72, ax: 0.38 },
  { f: 680, cx: 740, cy: 670, z: 1.58, ax: 0.4 },
  { f: 749, cx: 700, cy: 620, z: 1.18, ax: 0.4 },
  { f: 860, cx: 620, cy: 500, z: 0.84, ax: 0.36 },
  { f: 960, cx: 600, cy: 488, z: 0.82, ax: 0.35 },
  { f: 1019, cx: 600, cy: 488, z: 0.82, ax: 0.35 },
];

export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function smoothstep(t) {
  const u = clamp(t, 0, 1);
  return u * u * (3 - 2 * u);
}

function sampleNumberKeys(keys, frame) {
  if (frame <= keys[0].f) return keys[0].s;
  const last = keys[keys.length - 1];
  if (frame >= last.f) return last.s;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame >= a.f && frame <= b.f) {
      const u = (frame - a.f) / (b.f - a.f || 1);
      return lerp(a.s, b.s, smoothstep(u));
    }
  }
  return last.s;
}

function viewFrom(key) {
  return { cx: key.cx, cy: key.cy, z: key.z, ax: key.ax };
}

function sampleCameraKeys(frame) {
  const keys = CAMERA_KEYS;
  if (frame <= keys[0].f) return viewFrom(keys[0]);
  const last = keys[keys.length - 1];
  if (frame >= last.f) return viewFrom(last);
  for (let i = 0; i < keys.length - 1; i += 1) {
    const a = keys[i];
    const b = keys[i + 1];
    if (frame >= a.f && frame <= b.f) {
      const e = smoothstep((frame - a.f) / (b.f - a.f || 1));
      return {
        cx: lerp(a.cx, b.cx, e),
        cy: lerp(a.cy, b.cy, e),
        z: lerp(a.z, b.z, e),
        ax: lerp(a.ax, b.ax, e),
      };
    }
  }
  return viewFrom(last);
}

export function pointOn(path, s) {
  if (s <= path[0].s) return { x: path[0].x, y: path[0].y };
  const last = path[path.length - 1];
  if (s >= last.s) return { x: last.x, y: last.y };
  for (let i = 0; i < path.length - 1; i += 1) {
    const a = path[i];
    const b = path[i + 1];
    if (s >= a.s && s <= b.s) {
      const u = (s - a.s) / (b.s - a.s || 1);
      return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u) };
    }
  }
  return { x: last.x, y: last.y };
}

export function feederOffset(frame) {
  if (frame >= 960) return 0;
  const fade = frame > 900 ? 1 - (frame - 900) / 60 : 1;
  return Math.sin(frame * 0.42) * 2.4 * fade;
}

function pathFor(seed, s) {
  if (seed.decision === "reject" && s >= GEO.ejectS) return REJECTLINE;
  return MAINLINE;
}

function binFor(seed, s) {
  if (s < 0.985) return "path";
  return seed.decision === "reject" ? "reject" : "accept";
}

function slotIndex(seed, frame) {
  const same = SEEDS.filter((other) => other.decision === seed.decision);
  const ranked = same
    .map((other) => ({ id: other.id, s: sampleNumberKeys(other.keys, frame) }))
    .filter((other) => other.s >= 0.985)
    .sort((a, b) => b.s - a.s || (a.id < b.id ? -1 : 1));
  return Math.max(0, ranked.findIndex((other) => other.id === seed.id));
}

function slotPosition(decision, index) {
  const bin = decision === "reject" ? GEO.rejectBin : GEO.acceptBin;
  const col = index % 4;
  const row = Math.floor(index / 4);
  return {
    x: bin.x + 32 + col * 40,
    y: bin.y + bin.h - 20 - row * 22,
  };
}

export function chapterAt(frame) {
  return CHAPTERS.find((c) => frame >= c.start && frame <= c.end) || CHAPTERS[0];
}

export function timeMode(frame) {
  if (frame >= 960) return "HELD";
  return chapterAt(frame).timeMode;
}

export function captionAt(frame) {
  const row = CAPTIONS.find((c) => frame >= c.start && frame <= c.end);
  if (!row) {
    throw new Error(`Caption gap at frame ${frame}`);
  }
  return row.text;
}

export function seedProgress(seed, frame) {
  return sampleNumberKeys(seed.keys, frame);
}

export function seedPose(seed, frame) {
  const s = seedProgress(seed, frame);
  const along = pointOn(pathFor(seed, s), s);
  let x = along.x;
  let y = along.y;
  if (s < 0.1) {
    const idx = SEEDS.findIndex((item) => item.id === seed.id);
    const fade = 1 - smoothstep(s / 0.1);
    x += ((idx % 3) - 1) * 18 * fade;
    y -= (idx % 2) * 10 * fade;
  }
  if (s > 0.08 && s < 0.32) {
    const envelope = Math.sin(((s - 0.08) / 0.24) * Math.PI);
    y += feederOffset(frame) * envelope;
  }
  const bin = binFor(seed, s);
  if (s >= 0.96) {
    const slot = slotPosition(seed.decision, slotIndex(seed, frame));
    const u = smoothstep((s - 0.96) / 0.04);
    x = lerp(x, slot.x, u);
    y = lerp(y, slot.y, u);
  }
  const ahead = pointOn(pathFor(seed, Math.min(1, s + 0.02)), Math.min(1, s + 0.02));
  let rot = Math.atan2(ahead.y - along.y, ahead.x - along.x);
  if (frame < 960 && s < 0.96) {
    rot += Math.sin(frame * 0.05 + seed.phase) * seed.tilt * 0.35;
  } else {
    rot = seed.tilt * 0.4;
  }
  return {
    id: seed.id,
    decision: seed.decision,
    cue: seed.cue,
    plot: seed.plot,
    s,
    x,
    y,
    rot,
    bin,
    measured: s >= GEO.measureS - 0.005,
    status: statusFor(seed, s, frame),
  };
}

function statusFor(seed, s, frame) {
  if (s < GEO.measureS - 0.005) return "upstream";
  if (seed.cue === "overlap" && frame < 530) return "uncertain";
  if (seed.cue === "surface") return "reject-surface";
  if (seed.cue === "overlap") return "false-reject";
  if (seed.cue === "internal") return "false-accept";
  return "accept";
}

export function poses(frame) {
  return SEEDS.map((seed) => seedPose(seed, frame));
}

export function camera(frame) {
  const base = sampleCameraKeys(frame);
  if (frame < 530 || frame > 760) return base;
  const hero = seedPose(SEEDS.find((s) => s.id === "S-17"), frame);
  const enter = smoothstep((frame - 530) / 36);
  const exit = 1 - smoothstep((frame - 724) / 36);
  const k = clamp(enter * exit, 0, 1);
  return {
    ...base,
    cx: lerp(base.cx, hero.x + 30, k),
    cy: lerp(base.cy, hero.y, k),
  };
}

/** The stage is the canvas between the header and footer, so the subject can sit on center. */
export const VIEW_ANCHOR_Y = 0.5;

export function project(cam, width, height, x, y) {
  return {
    x: cam.ax * width + (x - cam.cx) * cam.z,
    y: height * VIEW_ANCHOR_Y + (y - cam.cy) * cam.z,
  };
}

function hump(frame, a, b) {
  if (frame <= a || frame >= b) return 0;
  return Math.sin(((frame - a) / (b - a)) * Math.PI);
}

/** Single pulses, not a repeating flash. S-16 fires first. S-17 is the tracked pulse. */
export function pulses(frame) {
  return [
    { id: "S-16", a: 508, b: 588, strength: hump(frame, 508, 588) },
    { id: "S-17", a: 612, b: 704, strength: hump(frame, 612, 704) },
  ];
}

export function activePulse(frame) {
  return pulses(frame).find((p) => p.strength > 0.02) || null;
}

export function insetOpacity(frame) {
  if (frame < 286 || frame > 548) return 0;
  if (frame < 330) return smoothstep((frame - 286) / 44);
  if (frame > 508) return 1 - smoothstep((frame - 508) / 40);
  return 1;
}

export function qaOpacity(frame) {
  if (frame < 750) return 0;
  if (frame < 830) return smoothstep((frame - 750) / 80);
  return 1;
}

export function labelAlpha(group, frame) {
  const id = chapterAt(frame).id;
  const table = {
    reveal: { feeder: 1, inspect: 1, eject: 1, bins: 1, signal: 0.35 },
    inspect: { feeder: 0.28, inspect: 1, eject: 0.4, bins: 0.2, signal: 1 },
    features: { feeder: 0.12, inspect: 0.85, eject: 0.22, bins: 0.08, signal: 0.7 },
    eject: { feeder: 0.08, inspect: 0.35, eject: 1, bins: 0.75, signal: 1 },
    output: { feeder: 0.72, inspect: 0.72, eject: 0.85, bins: 1, signal: 0.45 },
  };
  const fade = frame >= 960 ? 1 : 1;
  return (table[id][group] ?? 1) * fade;
}

export function accounting(frame) {
  const all = poses(frame);
  const accept = all.filter((p) => p.bin === "accept");
  const reject = all.filter((p) => p.bin === "reject");
  const path = all.filter((p) => p.bin === "path");
  return {
    total: all.length,
    accept,
    reject,
    path,
    conserved: accept.length + reject.length + path.length === all.length,
  };
}

export function snapshot(frame) {
  const f = clamp(Math.round(frame), 0, LAST_FRAME);
  return {
    frame: f,
    chapter: chapterAt(f),
    timeMode: timeMode(f),
    caption: captionAt(f),
    camera: camera(f),
    poses: poses(f),
    pulses: pulses(f),
    accounting: accounting(f),
    inset: insetOpacity(f),
    qa: qaOpacity(f),
  };
}
