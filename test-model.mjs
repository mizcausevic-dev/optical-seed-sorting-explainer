import assert from "node:assert/strict";
import {
  FRAME_COUNT,
  LAST_FRAME,
  CAPTIONS,
  SEEDS,
  camera,
  captionAt,
  accounting,
  poses,
  snapshot,
  timeMode,
  seedProgress,
} from "./model.js";

assert.equal(FRAME_COUNT, 1020);
assert.equal(LAST_FRAME, 1019);

for (let frame = 0; frame < FRAME_COUNT; frame += 1) {
  const text = captionAt(frame);
  assert.equal(typeof text, "string");
  assert.ok(text.length > 40, `short caption at ${frame}`);
  const snap = snapshot(frame);
  assert.equal(snap.accounting.conserved, true);
  assert.equal(snap.accounting.total, 8);
  for (const pose of snap.poses) {
    assert.ok(Number.isFinite(pose.x) && Number.isFinite(pose.y), pose.id);
    assert.ok(pose.s >= 0 && pose.s <= 1.0001, `${pose.id} s=${pose.s} @ ${frame}`);
  }
  const cam = snap.camera;
  assert.ok(cam.z > 0.5 && cam.z < 2.4, `zoom ${cam.z} @ ${frame}`);
}

for (const seed of SEEDS) {
  let prev = -1;
  for (let frame = 0; frame < FRAME_COUNT; frame += 5) {
    const s = seedProgress(seed, frame);
    assert.ok(s + 1e-9 >= prev, `${seed.id} moved backward at ${frame}: ${prev} -> ${s}`);
    prev = s;
  }
  assert.ok(seedProgress(seed, 980) >= 0.999, `${seed.id} not settled by 980`);
}

const endA = poses(980);
const endB = poses(1019);
for (let i = 0; i < endA.length; i += 1) {
  assert.equal(endA[i].x, endB[i].x, endA[i].id);
  assert.equal(endA[i].y, endB[i].y, endA[i].id);
  assert.equal(endA[i].bin === "path", false, `${endA[i].id} still on path`);
}
assert.deepEqual(camera(980), camera(1019));
assert.equal(timeMode(1019), "HELD");

const books = accounting(1019);
assert.equal(books.accept.length, 6);
assert.equal(books.reject.length, 2);
assert.equal(books.path.length, 0);
const rejectIds = books.reject.map((p) => p.id).sort();
assert.deepEqual(rejectIds, ["S-16", "S-17"]);
const falseAccept = books.accept.find((p) => p.id === "S-19");
assert.ok(falseAccept, "S-19 should remain in the accept bin");

const mid = poses(220);
const inView = mid.filter((p) => p.s > 0.42 && p.s < 0.66).map((p) => p.id);
assert.ok(inView.includes("S-15") && inView.includes("S-16") && inView.includes("S-17"), inView.join(","));

const hero640 = poses(640).find((p) => p.id === "S-17");
assert.ok(Math.abs(hero640.s - 0.76) < 0.02, `hero s at 640 is ${hero640.s}`);
const hero700 = poses(700).find((p) => p.id === "S-17");
assert.equal(hero700.decision, "reject");
assert.ok(hero700.x > hero640.x + 40, `hero should move toward reject, x ${hero640.x} -> ${hero700.x}`);

const pass = poses(660).find((p) => p.id === "S-18");
assert.equal(pass.decision, "accept");
assert.ok(pass.s > 0.8, `S-18 should be past the nozzle at 660, s=${pass.s}`);

assert.equal(CAPTIONS[0].start, 0);
assert.equal(CAPTIONS[CAPTIONS.length - 1].end, 1019);
for (let i = 1; i < CAPTIONS.length; i += 1) {
  assert.equal(CAPTIONS[i].start, CAPTIONS[i - 1].end + 1, `caption gap before ${CAPTIONS[i].start}`);
}

const early = snapshot(400);
assert.equal(early.poses.find((p) => p.id === "S-17").measured, true);
assert.equal(early.poses.find((p) => p.id === "S-19").measured, false);
assert.equal(early.poses.find((p) => p.id === "S-16").status, "uncertain");

console.log("model tests passed");
console.log(
  "f220",
  mid.map((p) => `${p.id}:${p.s.toFixed(2)}`).join(" ")
);
console.log(
  "f1019",
  books.accept.map((p) => p.id).join(","),
  "|",
  books.reject.map((p) => p.id).join(",")
);
