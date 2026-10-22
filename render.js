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
