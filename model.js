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
