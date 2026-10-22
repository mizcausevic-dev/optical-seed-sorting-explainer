# Optical seed-sorting machine

Frame-accurate sectional explainer of a free-fall optical seed sorter. 34 seconds, 30 fps, frames 0-1019. Singulation, a selected bichromatic reflectance sensor, an uncertain classification, and a timed air pulse are shown as separate operations.

**About:** Frame-accurate sectional explainer of an optical seed sorter: singulation, bichromatic sensing, uncertain calls, and timed air ejection.

**Topics:** agricultural-technology, optical-sorting, seed-sorting, explainer, animation, anatomy, visualization, food-quality, canvas, schematic

## What this is

A conceptual, source-informed drawing. It is not a certified machine design, a calibration, or a food-safety claim. The mechanism follows the public account in Pasikatan and Dowell, "Sorting systems based on optical methods for detecting and removing seeds infested internally by insects or fungi: a review," Applied Spectroscopy Reviews 36(4), 399-416 (2001), USDA-ARS file. That review supports visible cues for surface damage, near-infrared information for some internal conditions, threshold overlap, and a separate ejector. It does not supply the dimensions, valve timing, or throughput drawn here, because those are not claimed.

Selected sensor in this drawing: bichromatic reflectance, one visible band and one near-infrared band. Commercial machines have also used monochromatic sorting, transmittance, and fluorescence. Full-spectrum models appear in the research literature and are not drawn as the high-speed path.

## Safeguards

- Detection does not move a seed. Ejection is a later, timed air pulse.
- Uncertain overlap is marked. The threshold is labeled as illustrated, not calibrated.
- S-19 stays in the accept bin with an unresolved interior. That is a false accept in this teaching cohort, not a measured rate.
- S-16 is a sound-looking seed sent to reject by the illustrated threshold.
- Rejected kernels remain in the reject bin. Spent air and lamp heat are shown leaving the section.
- No throughput, defect sensitivity, or certification number is stated.
- Enlarged scale, slow motion, time compression, and the held final frame are labeled.
- The housing is a section. The second camera is marked as a schematic.
- The page is static. No forms, trackers, or third-party scripts. A content security policy allows only this site's own style and script.

## Live preview

The site files are the root of the `pages` branch.

https://mizcausevic-dev.github.io/optical-seed-sorting-explainer/

In the repository settings, set Pages to deploy from the `pages` branch at `/`. Then open that URL and scrub to frame 1019 for the held system view. `?frame=640` opens on the air pulse.

## Run

```bash
python3 -m http.server 8734
```

Open `http://127.0.0.1:8734/`. Space plays and pauses. Arrow keys step one frame, or thirty with Shift. `?frame=640` opens on a frame and stays paused. `?play=1` starts playback. If the browser asks for reduced motion, playback starts paused.

```bash
node test-model.mjs
```

The model test checks caption coverage, conservation of the eight-seed cohort, monotonic travel, the tracked seed's divert, and a motionless hold from frame 980 through 1019.

## Chapters

| Frames | Seconds | What the camera does |
| --- | --- | --- |
| 0-149 | 0-5 | Reveal feeder, inspection, illumination, camera, nozzle, and bins |
| 150-299 | 5-10 | Follow spaced seeds across the viewing plane |
| 300-509 | 10-17 | Feature record for color, outline, and the two-band index |
| 510-749 | 17-25 | Track S-17 into a timed air pulse. Accepted seeds continue |
| 750-1019 | 25-34 | Output sample, qualitative balance, stable system view |

## Repurpose

The same frame model fits other singulated sorters: a belt instead of a chute, a different sensor card, and the same accept, reject, uncertain, and false-accept accounting. Keep the sensor choice explicit and keep rejected material on screen.
