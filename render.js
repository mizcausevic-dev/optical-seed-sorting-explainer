import {
  GEO,
  PALETTE,
  VIEW_ANCHOR_Y,
  camera,
  poses,
  pulses,
  project,
  insetOpacity,
  qaOpacity,
  labelAlpha,
  feederOffset,
  chapterAt,
  timeMode,
  accounting,
} from "./model.js";

const SANS = '"Segoe UI", system-ui, sans-serif';
const MONO = 'ui-monospace, "Cascadia Code", "SFMono-Regular", monospace';

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function metalFill(ctx, x, y, w, h) {
  const g = ctx.createLinearGradient(x, y, x + w * 0.2, y + h);
  g.addColorStop(0, "#55687f");
  g.addColorStop(0.42, "#344257");
  g.addColorStop(1, "#1d2633");
  ctx.fillStyle = g;
}

function hatchStrip(ctx, x, y, w, h) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.strokeStyle = "rgba(176, 190, 208, 0.35)";
  ctx.lineWidth = 1;
  for (let i = -h; i < w + h; i += 7) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i + h, y + h);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGrid(ctx) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let x = 100; x <= 1180; x += 22) {
    for (let y = 30; y <= 900; y += 22) {
      ctx.fillRect(x, y, 1.15, 1.15);
    }
  }
  ctx.restore();
}

function drawShell(ctx) {
  const s = GEO.shell;
  roundRect(ctx, s.x, s.y, s.w, s.h, 20);
  ctx.fillStyle = "#121924";
  ctx.fill();
  ctx.save();
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#344257";
  ctx.stroke();
  ctx.restore();
  hatchStrip(ctx, s.x - 2, s.y + 8, 16, s.h - 16);

  roundRect(ctx, s.x + 26, s.y + 24, s.w - 52, s.h - 48, 12);
  ctx.fillStyle = "#0b1019";
  ctx.fill();
  ctx.strokeStyle = "rgba(109,126,150,0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawHopper(ctx, frame) {
  const h = GEO.hopper;
  ctx.beginPath();
  ctx.moveTo(h.x, h.y);
  ctx.lineTo(h.x + h.w, h.y);
  ctx.lineTo(h.x + h.w - 28, h.y + h.h);
  ctx.lineTo(h.x + 36, h.y + h.h);
  ctx.closePath();
  metalFill(ctx, h.x, h.y, h.w, h.h);
  ctx.fill();
  ctx.strokeStyle = "#6d7e96";
  ctx.lineWidth = 1.25;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(h.x + 18, h.y + 16);
  ctx.lineTo(h.x + h.w - 18, h.y + 16);
  ctx.lineTo(h.x + h.w - 40, h.y + h.h - 18);
  ctx.lineTo(h.x + 48, h.y + h.h - 18);
  ctx.closePath();
  ctx.fillStyle = "#0e141d";
  ctx.fill();

  const gate = 10 + Math.sin(frame * 0.08) * (frame >= 960 ? 0 : 1.2);
  roundRect(ctx, h.x + 58, h.y + h.h - 4, 40, gate, 2);
  ctx.fillStyle = "#243140";
  ctx.fill();
}

function drawTray(ctx, frame) {
  const t = GEO.tray;
  const bob = feederOffset(frame);
  ctx.save();
  ctx.translate(0, bob);
  roundRect(ctx, t.x, t.y, t.w, t.h, 7);
  metalFill(ctx, t.x, t.y, t.w, t.h);
  ctx.fill();
  ctx.strokeStyle = "#7d8da3";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, t.x + 8, t.y + 8, t.w - 16, 8, 3);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = PALETTE.cyan;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(t.x + 40, t.y + t.h + 16);
  ctx.lineTo(t.x + t.w - 30, t.y + t.h + 16);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(t.x + t.w - 30, t.y + t.h + 16);
  ctx.lineTo(t.x + t.w - 40, t.y + t.h + 12);
  ctx.lineTo(t.x + t.w - 40, t.y + t.h + 20);
  ctx.closePath();
  ctx.fillStyle = PALETTE.cyan;
  ctx.fill();
  ctx.restore();
}

function strokeChannel(ctx, pts, outer, inner) {
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.strokeStyle = "#46566c";
  ctx.lineWidth = outer;
  ctx.stroke();
  ctx.strokeStyle = "#121a26";
  ctx.lineWidth = inner;
  ctx.stroke();
  ctx.restore();
}

function drawChuteAndDucts(ctx) {
  strokeChannel(
    ctx,
    [
      { x: 530, y: 196 },
      { x: 604, y: 268 },
      { x: 646, y: 360 },
      { x: 656, y: 452 },
      { x: 668, y: 560 },
      { x: 676, y: 632 },
      { x: 688, y: 720 },
      { x: 648, y: 778 },
    ],
    42,
    24
  );
  strokeChannel(
    ctx,
    [
      { x: 676, y: 632 },
      { x: 770, y: 694 },
      { x: 900, y: 778 },
    ],
    38,
    22
  );
}

function drawInspection(ctx) {
  roundRect(ctx, 590, 336, 230, 236, 8);
  ctx.fillStyle = "rgba(13, 18, 28, 0.55)";
  ctx.fill();
  ctx.strokeStyle = "rgba(125,141,163,0.85)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.save();
  ctx.strokeStyle = "rgba(157,78,221,0.95)";
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(604, 452);
  ctx.lineTo(806, 452);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(255,209,102,0.9)";
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(600, 632);
  ctx.lineTo(790, 632);
  ctx.stroke();
  ctx.restore();

  roundRect(ctx, GEO.plate.x, GEO.plate.y, GEO.plate.w, GEO.plate.h, 2);
  const g = ctx.createLinearGradient(GEO.plate.x, GEO.plate.y, GEO.plate.x + 18, GEO.plate.y);
  g.addColorStop(0, "#8b97a8");
  g.addColorStop(0.5, "#d5dde6");
  g.addColorStop(1, "#5c6b7e");
  ctx.fillStyle = g;
  ctx.fill();
}

function drawLamp(ctx) {
  const l = GEO.lamp;
  roundRect(ctx, l.x, l.y, l.w, l.h, 5);
  metalFill(ctx, l.x, l.y, l.w, l.h);
  ctx.fill();
  ctx.strokeStyle = "#6d7e96";
  ctx.stroke();
  ctx.fillStyle = "rgba(255,209,102,0.35)";
  roundRect(ctx, l.x + 8, l.y + l.h - 6, l.w - 16, 4, 1);
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.moveTo(l.x + 8, l.y + l.h);
  ctx.lineTo(620, 470);
  ctx.lineTo(700, 430);
  ctx.closePath();
  const wash = ctx.createLinearGradient(l.x, l.y, 660, 452);
  wash.addColorStop(0, "rgba(255,209,102,0.95)");
  wash.addColorStop(1, "rgba(255,209,102,0)");
  ctx.fillStyle = wash;
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "rgba(255,209,102,0.8)";
  for (let i = 0; i < 4; i += 1) {
    ctx.fillRect(l.x + 14 + i * 8, l.y - 10 - (i % 2) * 3, 2, 7);
  }
  ctx.restore();
}

function drawCamera(ctx) {
  const c = GEO.camera;
  roundRect(ctx, c.x, c.y, c.w, c.h, 6);
  metalFill(ctx, c.x, c.y, c.w, c.h);
  ctx.fill();
  ctx.strokeStyle = "#93a0b5";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(c.x + c.w - 8, c.y + c.h / 2, 16, 0, Math.PI * 2);
  ctx.fillStyle = "#101820";
  ctx.fill();
  ctx.strokeStyle = "#9aa8ba";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(c.x + c.w - 8, c.y + c.h / 2, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#1b2836";
  ctx.fill();

  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = PALETTE.violet;
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(c.x + c.w + 8, c.y + 18);
  ctx.lineTo(700, 390);
  ctx.lineTo(700, 520);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawGhostView(ctx, zoom) {
  if (zoom > 1.4) return;
  ctx.save();
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = PALETTE.violet;
  ctx.lineWidth = 1.25;
  roundRect(ctx, 948, 430, 46, 30, 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(962, 445, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawNozzle(ctx) {
  roundRect(ctx, 508, 548, 18, 168, 5);
  metalFill(ctx, 508, 548, 18, 168);
  ctx.fill();
  ctx.strokeStyle = "#6d7e96";
  ctx.lineWidth = 1;
  ctx.stroke();

  const n = GEO.nozzle;
  roundRect(ctx, n.x - 8, n.y - 14, 118, 28, 6);
  metalFill(ctx, n.x - 8, n.y - 14, 118, 28);
  ctx.fill();
  ctx.strokeStyle = "#d7b15a";
  ctx.lineWidth = 1.25;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(n.x + 100, n.y - 6);
  ctx.lineTo(n.x + 118, n.y);
  ctx.lineTo(n.x + 100, n.y + 6);
  ctx.closePath();
  ctx.fillStyle = "#101820";
  ctx.fill();
  ctx.stroke();
}

function drawWindowLane(ctx) {
  ctx.save();
  roundRect(ctx, 592, 338, 226, 232, 8);
  ctx.clip();
  strokeChannel(
    ctx,
    [
      { x: 642, y: 328 },
      { x: 656, y: 452 },
      { x: 674, y: 590 },
    ],
    34,
    16
  );
  ctx.restore();
}

function drawBins(ctx) {
  for (const bin of [GEO.acceptBin, GEO.rejectBin]) {
    roundRect(ctx, bin.x, bin.y, bin.w, bin.h, 6);
    metalFill(ctx, bin.x, bin.y, bin.w, bin.h);
    ctx.fill();
    ctx.strokeStyle = "#6d7e96";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    roundRect(ctx, bin.x + 8, bin.y + 8, bin.w - 16, bin.h - 14, 3);
    ctx.fillStyle = "#0c121a";
    ctx.fill();
  }
}

function drawVent(ctx, frame) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,209,102,0.75)";
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(930, 742);
  ctx.bezierCurveTo(980, 700, 1000, 690, 1024, 676);
  ctx.stroke();
  const alpha = frame > 600 ? 0.45 : 0.2;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(255,209,102,0.8)";
  ctx.beginPath();
  ctx.ellipse(1032, 668, 16, 7, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSignal(ctx) {
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = PALETTE.cyan;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(GEO.camera.x + 40, GEO.camera.y + GEO.camera.h);
  ctx.lineTo(GEO.camera.x + 40, 560);
  ctx.lineTo(500, 632);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(720, 452);
  ctx.lineTo(720, 632);
  ctx.stroke();
  ctx.restore();
}

function drawSeeds(ctx, poseList) {
  const ordered = [...poseList].sort((a, b) => a.s - b.s);
  for (const pose of ordered) {
    ctx.save();
    ctx.translate(pose.x, pose.y);
    ctx.rotate(pose.rot);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath();
    ctx.ellipse(2, 5, 15, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    const g = ctx.createLinearGradient(-14, -8, 14, 10);
    if (pose.cue === "surface") {
      g.addColorStop(0, "#e4c48a");
      g.addColorStop(0.45, "#8a5a34");
      g.addColorStop(1, "#3a2618");
    } else {
      g.addColorStop(0, "#f3ddb0");
      g.addColorStop(0.55, "#c6a36a");
      g.addColorStop(1, "#6e4c28");
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(48,30,14,0.55)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-9, 1);
    ctx.quadraticCurveTo(0, 4, 10, 0);
    ctx.strokeStyle = "rgba(70,44,18,0.7)";
    ctx.stroke();
    if (pose.cue === "surface") {
      ctx.beginPath();
      ctx.ellipse(5, -1, 6.5, 4.2, 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#1a100c";
      ctx.fill();
    }
    ctx.restore();

    if (pose.status === "uncertain" || (pose.id === "S-19" && pose.bin === "accept")) {
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = PALETTE.violet;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pose.x, pose.y, 20, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    if (pose.measured && pose.s < 0.8) {
      const proximity = Math.max(0, 1 - Math.abs(pose.s - GEO.measureS) / 0.035);
      if (proximity > 0) {
        ctx.save();
        ctx.globalAlpha = proximity;
        ctx.strokeStyle = PALETTE.violet;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pose.x, pose.y, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function drawPulses(ctx, frame, poseList) {
  const origin = { x: GEO.nozzle.x + 40, y: GEO.nozzle.y };
  for (const pulse of pulses(frame)) {
    if (pulse.strength <= 0) continue;
    const seed = poseList.find((p) => p.id === pulse.id);
    if (!seed) continue;
    ctx.save();
    ctx.globalAlpha = 0.25 + pulse.strength * 0.65;
    ctx.lineCap = "round";
    const grad = ctx.createLinearGradient(origin.x, origin.y, seed.x, seed.y);
    grad.addColorStop(0, "rgba(255,209,102,0.15)");
    grad.addColorStop(0.35, "rgba(255,209,102,0.95)");
    grad.addColorStop(1, "rgba(255,209,102,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 6 + pulse.strength * 12;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.quadraticCurveTo((origin.x + seed.x) / 2, origin.y - 16, seed.x - 8, seed.y);
    ctx.stroke();
    ctx.globalAlpha = pulse.strength;
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 4; i += 1) {
      const spread = (i - 1.5) * 7;
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y + spread * 0.2);
      ctx.lineTo(seed.x - 12, seed.y + spread);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function dock(width, height, preferredH) {
  const margin = 12;
  const wide = width >= 980;
  const panelW = Math.min(424, width - margin * 2);
  return {
    x: wide ? width - panelW - 16 : margin,
    y: wide ? 12 : 8,
    w: panelW,
    h: Math.min(preferredH, height - (wide ? 24 : 16)),
  };
}

function plate(ctx, x, y, text, accent) {
  ctx.font = `600 12px ${SANS}`;
  const w = ctx.measureText(text).width + 14;
  const h = 20;
  roundRect(ctx, x, y, w, h, 4);
  ctx.fillStyle = "rgba(11,16,25,0.9)";
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = PALETTE.bone;
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 7, y + h / 2 + 0.5);
  ctx.textBaseline = "alphabetic";
  return { w, h };
}

function drawWorldLabels(ctx, w, h, frame, cam) {
  if (w < 980 && (qaOpacity(frame) > 0.2 || insetOpacity(frame) > 0.2)) return;
  const labels = [
    { group: "feeder", x: 250, y: 78, dx: -20, dy: -26, text: "Metered feeder", accent: PALETTE.bone },
    { group: "feeder", x: 400, y: 186, dx: -30, dy: 28, text: "Vibratory tray \u00b7 transport", accent: PALETTE.cyan },
    { group: "inspect", x: 700, y: 330, dx: 8, dy: -28, text: "Inspection region", accent: PALETTE.bone },
    {
      group: "inspect",
      x: 420,
      y: 300,
      dx: -70,
      dy: -22,
      text: chapterAt(frame).id === "output" ? "Illumination \u00b7 heat remains" : "Illumination",
      accent: PALETTE.gold,
    },
    { group: "inspect", x: 430, y: 430, dx: -78, dy: 18, text: "Camera", accent: PALETTE.violet },
    { group: "inspect", x: 760, y: 452, dx: 16, dy: -22, text: "Viewing plane", accent: PALETTE.violet },
    { group: "inspect", x: 812, y: 360, dx: 16, dy: -8, text: "Reference plate", accent: PALETTE.bone },
    { group: "signal", x: 720, y: 540, dx: 14, dy: -8, text: "Travel delay", accent: PALETTE.cyan },
    { group: "inspect", x: 970, y: 430, dx: 4, dy: -26, text: "Second view \u00b7 schematic", accent: PALETTE.violet },
    { group: "eject", x: 548, y: 620, dx: -138, dy: -28, text: "Timed air nozzle", accent: PALETTE.gold },
    { group: "bins", x: 690, y: 700, dx: -110, dy: -6, text: "Accept path", accent: PALETTE.bone },
    { group: "bins", x: 800, y: 690, dx: 16, dy: -28, text: "Reject path", accent: PALETTE.bone },
    { group: "eject", x: 1020, y: 668, dx: 8, dy: -16, text: "Spent air", accent: PALETTE.gold },
  ];
  for (const label of labels) {
    const alpha = labelAlpha(label.group, frame);
    if (alpha < 0.2) continue;
    const p = project(cam, w, h, label.x, label.y);
    const lx = p.x + label.dx;
    const ly = p.y + label.dy;
    if (label.group === "inspect" && label.text.startsWith("Second") && cam.z > 1.4) continue;
    if (lx < 8 || ly < 8 || lx > w - (w >= 980 ? 300 : 8) || ly > h - 8) continue;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "rgba(231,236,242,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(lx, ly + 10);
    ctx.stroke();
    plate(ctx, lx, ly, label.text, label.accent);
    ctx.restore();
  }
}

function drawSeedTags(ctx, w, h, frame, cam, poseList) {
  for (const pose of poseList) {
    if (pose.bin !== "path") continue;
    if (pose.id === "S-17" && frame >= 520 && frame <= 790) continue;
    const p = project(cam, w, h, pose.x, pose.y);
    if (p.x < 12 || p.x > w - (w >= 980 ? 460 : 12) || p.y < 12 || p.y > h - 12) continue;
    const hopper = pose.s < 0.12;
    const n = Number(pose.id.slice(2));
    const ox = hopper ? (n % 2 === 0 ? 22 : -52) : -54;
    const oy = hopper ? -30 - (n % 3) * 16 : -10;
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.font = `600 11px ${MONO}`;
    const tag = pose.id;
    const tw = ctx.measureText(tag).width + 8;
    const lx = p.x + ox;
    const ly = p.y + oy;
    roundRect(ctx, lx, ly, tw, 16, 3);
    ctx.fillStyle = "rgba(11,16,25,0.86)";
    ctx.fill();
    ctx.strokeStyle = pose.status === "uncertain" ? PALETTE.violet : "rgba(147,160,181,0.45)";
    ctx.stroke();
    ctx.fillStyle = pose.status === "uncertain" ? PALETTE.violet : PALETTE.bone;
    ctx.textBaseline = "middle";
    ctx.fillText(tag, lx + 4, ly + 8);
    ctx.restore();
  }

  if (qaOpacity(frame) > 0.55) {
    for (const spec of [
      { decision: "accept", bin: GEO.acceptBin, accent: PALETTE.bone },
      { decision: "reject", bin: GEO.rejectBin, accent: PALETTE.gold },
    ]) {
      const ids = poseList.filter((pose) => pose.bin === spec.decision).map((pose) => pose.id);
      if (!ids.length) continue;
      const anchor = project(cam, w, h, spec.bin.x + 8, spec.bin.y - 6);
      if (anchor.y < 8 || anchor.y > h - 28 || anchor.x > w - (w >= 980 ? 460 : 80)) continue;
      ctx.save();
      plate(ctx, anchor.x, anchor.y, ids.join("  "), spec.accent);
      ctx.restore();
    }
  }

  const hero = poseList.find((p) => p.id === "S-17");
  if (hero && frame >= 520 && frame <= 790) {
    const p = project(cam, w, h, hero.x, hero.y);
    let text = "S-17 \u00b7 record travels with the seed";
    if (frame >= 600 && frame < 690) text = "S-17 \u00b7 timed air pulse";
    if (frame >= 690) text = "S-17 \u00b7 reject stream";
    ctx.save();
    plate(ctx, p.x + 22, p.y - 42, text, frame >= 600 && frame < 710 ? PALETTE.gold : PALETTE.cyan);
    ctx.restore();
  }
}

function drawControlCard(ctx, width, frame) {
  if (width < 760) return;
  if (insetOpacity(frame) > 0.25 || qaOpacity(frame) > 0.2) return;
  const id = chapterAt(frame).id;
  if (id === "eject" && frame > 560) return;
  const x = 12;
  const y = 12;
  const cardW = Math.min(300, width * 0.34);
  const copy = [
    { text: "Not vendor software. Not a calibrated equation.", tone: "bone", font: `12px ${SANS}` },
    { text: "index = compare(visible, NIR)", tone: "muted", font: `12px ${MONO}` },
    { text: "past threshold: schedule eject", tone: "muted", font: `12px ${MONO}` },
    { text: "else: seed continues", tone: "muted", font: `12px ${MONO}` },
    { text: "delay = plane to nozzle", tone: "muted", font: `12px ${MONO}` },
    { text: "Detection does not move the seed.", tone: "bone", font: `12px ${SANS}` },
  ];
  const wrapped = [];
  for (const row of copy) {
    ctx.font = row.font;
    for (const line of wrapText(ctx, row.text, cardW - 24)) wrapped.push({ ...row, line });
  }
  const cardH = 36 + wrapped.length * 16 + 12;
  ctx.save();
  roundRect(ctx, x, y, cardW, cardH, 10);
  ctx.fillStyle = "rgba(11,16,25,0.92)";
  ctx.fill();
  ctx.setLineDash([4, 3]);
  ctx.strokeStyle = PALETTE.violet;
  ctx.lineWidth = 1.25;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = PALETTE.violet;
  ctx.font = `700 11px ${MONO}`;
  ctx.fillText("CONTROL SCHEMATIC", x + 12, y + 20);
  wrapped.forEach((row, i) => {
    ctx.font = row.font;
    ctx.fillStyle = row.tone === "bone" ? PALETTE.bone : PALETTE.muted;
    ctx.fillText(row.line, x + 12, y + 42 + i * 16);
  });
  ctx.restore();
}

function wrapText(ctx, text, max) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const trial = line ? `${line} ${word}` : word;
    if (ctx.measureText(trial).width > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = trial;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawInset(ctx, w, h, frame, cam, poseList) {
  const alpha = insetOpacity(frame);
  if (alpha <= 0.01) return null;
  const panel = dock(w, h, 560);
  ctx.save();
  ctx.globalAlpha = alpha;
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 12);
  ctx.fillStyle = "rgba(11,16,25,0.92)";
  ctx.fill();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "rgba(157,78,221,0.85)";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.save();
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 12);
  ctx.clip();

  ctx.fillStyle = PALETTE.violet;
  ctx.font = `700 12px ${MONO}`;
  ctx.fillText("FEATURE RECORD  \u00b7  S-17", panel.x + 16, panel.y + 24);
  ctx.fillStyle = PALETTE.muted;
  ctx.font = `12px ${SANS}`;
  ctx.fillText("Schematic analysis. Enlarged. Not a laboratory printout.", panel.x + 16, panel.y + 42);

  ctx.fillStyle = PALETTE.bone;
  ctx.font = `700 12px ${SANS}`;
  ctx.fillText("Color \u00b7 visible band", panel.x + 16, panel.y + 70);
  roundRect(ctx, panel.x + 16, panel.y + 80, 36, 22, 4);
  ctx.fillStyle = "#c6a36a";
  ctx.fill();
  ctx.fillStyle = PALETTE.muted;
  ctx.font = `11px ${SANS}`;
  ctx.fillText("reference surface", panel.x + 58, panel.y + 95);
  roundRect(ctx, panel.x + 180, panel.y + 80, 36, 22, 4);
  ctx.fillStyle = "#5a3a24";
  ctx.fill();
  ctx.fillStyle = PALETTE.bone;
  ctx.fillText("S-17 darker patch", panel.x + 224, panel.y + 95);

  ctx.fillStyle = PALETTE.bone;
  ctx.font = `700 12px ${SANS}`;
  ctx.fillText("Outline \u00b7 camera silhouette", panel.x + 16, panel.y + 124);
  ctx.strokeStyle = PALETTE.muted;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(panel.x + 52, panel.y + 152, 22, 12, 0.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = PALETTE.bone;
  ctx.beginPath();
  ctx.ellipse(panel.x + 140, panel.y + 152, 20, 13, -0.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = PALETTE.muted;
  ctx.font = `11px ${SANS}`;
  ctx.fillText("reference", panel.x + 28, panel.y + 176);
  ctx.fillText("S-17", panel.x + 126, panel.y + 176);
  ctx.fillText("Qualitative only. No millimeter scale.", panel.x + 190, panel.y + 156);

  ctx.fillStyle = PALETTE.bone;
  ctx.font = `700 12px ${SANS}`;
  ctx.fillText("Two-band index", panel.x + 16, panel.y + 206);
  ctx.font = `11px ${SANS}`;
  ctx.fillStyle = PALETTE.muted;
  ctx.fillText("Visible darkening cue \u2192     near-infrared difference cue \u2191", panel.x + 16, panel.y + 224);

  const plot = { x: panel.x + 36, y: panel.y + 240, w: 300, h: 180 };
  ctx.strokeStyle = "rgba(147,160,181,0.5)";
  ctx.strokeRect(plot.x, plot.y, plot.w, plot.h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(plot.x, plot.y, plot.w, plot.h);
  ctx.clip();
  ctx.fillStyle = "rgba(157,78,221,0.2)";
  ctx.beginPath();
  ctx.moveTo(plot.x + plot.w * 0.36, plot.y + plot.h);
  ctx.lineTo(plot.x + plot.w * 0.58, plot.y + plot.h);
  ctx.lineTo(plot.x + plot.w * 0.9, plot.y);
  ctx.lineTo(plot.x + plot.w * 0.66, plot.y);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = PALETTE.violet;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(plot.x + plot.w * 0.46, plot.y + plot.h);
  ctx.lineTo(plot.x + plot.w * 0.78, plot.y);
  ctx.stroke();
  ctx.restore();
  ctx.font = `11px ${SANS}`;
  ctx.fillStyle = PALETTE.muted;
  ctx.fillText("accept side", plot.x + 8, plot.y + plot.h - 8);
  ctx.fillStyle = PALETTE.violet;
  ctx.fillText("illustrated threshold", plot.x + plot.w * 0.34, plot.y + 16);
  ctx.fillStyle = "#c4a574";
  ctx.fillText("reject side", plot.x + plot.w - 72, plot.y + plot.h - 8);

  for (const pose of poseList) {
    if (!pose.measured) continue;
    const px = plot.x + pose.plot.x * plot.w;
    const py = plot.y + (1 - pose.plot.y) * plot.h;
    ctx.beginPath();
    ctx.arc(px, py, pose.id === "S-17" ? 6 : 4, 0, Math.PI * 2);
    if (pose.id === "S-16") {
      ctx.strokeStyle = PALETTE.violet;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    } else if (pose.id === "S-17") {
      ctx.fillStyle = "#8a5a34";
      ctx.fill();
      ctx.strokeStyle = PALETTE.bone;
      ctx.stroke();
    } else {
      ctx.fillStyle = "rgba(231,236,242,0.85)";
      ctx.fill();
    }
    ctx.font = `10px ${MONO}`;
    ctx.fillStyle = PALETTE.bone;
    ctx.fillText(pose.id, px + 7, py - 6);
  }

  const footer = "S-16 is inside the overlap. Seeds still upstream are absent: a record starts at the viewing plane.";
  ctx.font = `12px ${SANS}`;
  ctx.fillStyle = PALETTE.bone;
  const lines = wrapText(ctx, footer, panel.w - 32);
  lines.forEach((line, i) => ctx.fillText(line, panel.x + 16, panel.y + panel.h - 36 + i * 15));
  ctx.restore();
  ctx.restore();

  const hero = poseList.find((p) => p.id === "S-17");
  if (hero) {
    const p = project(cam, w, h, hero.x, hero.y);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = PALETTE.cyan;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(panel.x, panel.y + 28);
    ctx.stroke();
    ctx.restore();
  }
  return panel;
}

function matrixCell(ctx, x, y, w, h, title, body, accent) {
  roundRect(ctx, x, y, w, h, 6);
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = `700 11px ${SANS}`;
  const titleLines = wrapText(ctx, title, w - 16);
  titleLines.forEach((line, i) => ctx.fillText(line, x + 8, y + 16 + i * 13));
  ctx.fillStyle = PALETTE.bone;
  ctx.font = `12px ${SANS}`;
  const lines = wrapText(ctx, body, w - 16);
  const bodyY = y + 20 + titleLines.length * 13;
  lines.forEach((line, i) => ctx.fillText(line, x + 8, bodyY + i * 14));
}

function drawQA(ctx, w, h, frame) {
  const alpha = qaOpacity(frame);
  if (alpha <= 0.01) return;
  const books = accounting(frame);
  const panel = dock(w, h, 640);
  ctx.save();
  ctx.globalAlpha = alpha;
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 12);
  ctx.fillStyle = "rgba(11,16,25,0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(0,229,255,0.45)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.save();
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 12);
  ctx.clip();

  ctx.fillStyle = PALETTE.cyan;
  ctx.font = `700 12px ${MONO}`;
  ctx.fillText("OUTPUT ASSESSMENT", panel.x + 16, panel.y + 22);
  ctx.fillStyle = PALETTE.muted;
  ctx.font = `12px ${SANS}`;
  const intro = wrapText(
    ctx,
    "Qualitative panel for this illustrated cohort of 8. Not a yield, an error rate, or a certification.",
    panel.w - 32
  );
  intro.forEach((line, i) => ctx.fillText(line, panel.x + 16, panel.y + 42 + i * 14));

  const top = panel.y + 78;
  const cellW = (panel.w - 44) / 2;
  matrixCell(ctx, panel.x + 14, top, cellW, 72, "Accept call \u00b7 no cue drawn", "S-14 S-15 S-18 S-20 S-21", PALETTE.bone);
  matrixCell(ctx, panel.x + 22 + cellW, top, cellW, 72, "Reject call \u00b7 no cue drawn", "S-16 false reject. Overlap, illustrated threshold.", PALETTE.violet);
  matrixCell(ctx, panel.x + 14, top + 80, cellW, 78, "Accept call \u00b7 interior unresolved", "S-19 false accept. Surface looks ordinary. Interior is not cleared.", PALETTE.violet);
  matrixCell(ctx, panel.x + 22 + cellW, top + 80, cellW, 78, "Reject call \u00b7 surface cue", "S-17. Visible darkening. Pulse diverted this seed only.", PALETTE.gold);

  let cursor = top + 176;
  const bottom = panel.y + panel.h - 12;
  const write = (text, color, font, gap) => {
    ctx.font = font;
    ctx.fillStyle = color;
    const lines = wrapText(ctx, text, panel.w - 32);
    for (const line of lines) {
      if (cursor > bottom) return;
      ctx.fillText(line, panel.x + 16, cursor);
      cursor += gap;
    }
  };
  write("Where the illustrated material and energy go", PALETTE.bone, `700 12px ${SANS}`, 18);
  write(`Kernels on the machine: ${books.path.length}`, PALETTE.bone, `12px ${SANS}`, 16);
  write(`Accept bin: ${books.accept.length}. Reject bin: ${books.reject.length}.`, PALETTE.bone, `12px ${SANS}`, 16);
  write("In: mixed cohort, lamp supply, tray drive, controller, compressed air.", PALETTE.muted, `12px ${SANS}`, 15);
  write("Out: accept stream, reject stream, heat at the enclosure, spent air.", PALETTE.muted, `12px ${SANS}`, 15);
  write("Rejected kernels stay in the reject bin. They are not deleted.", PALETTE.muted, `12px ${SANS}`, 16);
  cursor += 8;
  write("What this pass does not establish", PALETTE.bone, `700 12px ${SANS}`, 16);
  write(
    "Internal insects or fungi can leave little visible mark. Near-infrared readings can help in published studies and can still miss small, moist, poorly oriented, or overlapping cases. A seed in the accept bin is not evidence that pathogens are absent. No throughput, sensitivity, or food-safety certification is stated.",
    PALETTE.muted,
    `12px ${SANS}`,
    15
  );
  ctx.restore();
  ctx.restore();
}

function drawVignette(ctx, w, h) {
  const g = ctx.createRadialGradient(w * 0.45, h * 0.45, h * 0.2, w * 0.5, h * 0.5, h * 0.75);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.38)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

export function render(ctx, width, height, frame) {
  const cam = camera(frame);
  const poseList = poses(frame);

  ctx.save();
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = PALETTE.stage;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(cam.ax * width, height * VIEW_ANCHOR_Y);
  ctx.scale(cam.z, cam.z);
  ctx.translate(-cam.cx, -cam.cy);

  drawGrid(ctx);
  drawShell(ctx);
  drawHopper(ctx, frame);
  drawTray(ctx, frame);
  drawChuteAndDucts(ctx);
  drawInspection(ctx);
  drawWindowLane(ctx);
  drawLamp(ctx);
  drawBins(ctx);
  drawVent(ctx, frame);
  drawSeeds(ctx, poseList);
  drawCamera(ctx);
  drawGhostView(ctx, cam.z);
  drawNozzle(ctx);
  if (labelAlpha("signal", frame) > 0.25) drawSignal(ctx);
  drawPulses(ctx, frame, poseList);
  ctx.restore();

  drawVignette(ctx, width, height);
  drawWorldLabels(ctx, width, height, frame, cam);
  drawSeedTags(ctx, width, height, frame, cam, poseList);
  drawControlCard(ctx, width, frame);
  drawInset(ctx, width, height, frame, cam, poseList);
  drawQA(ctx, width, height, frame);

  ctx.restore();
  return { chapter: chapterAt(frame).title, timeMode: timeMode(frame) };
}
