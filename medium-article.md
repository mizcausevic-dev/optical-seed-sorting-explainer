# Optical seed sorting: what bichromatic inspection can remove, and what it cannot prove

A 34-second sectional explainer of singulation, sensing, and timed air ejection, checked against a USDA review of optical methods for internal insects and fungi.

A seed sorter does not clean a lot. It makes a fast optical call on one seed. Later, it may fire a short pulse of air. Those are two operations. The first can be wrong. The second only moves the seed the first one selected. The kernel that was not selected stays in the accept stream, including the one whose interior the cameras never resolved.

That is the product claim once the brochure language comes off. Optical sorting can pull out seeds that show an optical cue. It cannot guarantee that every internal insect or fungal condition is gone. It cannot prove that pathogens are absent. A passing seed is a seed the chosen sensor did not flag at the chosen threshold. It is not a certificate.

The drawing that goes with this article is a frame-accurate section, not a machine design. It runs 34 seconds at 30 frames a second, frames 0 through 1019. The code is public:

https://github.com/mizcausevic-dev/optical-seed-sorting-explainer

The site files sit on the `pages` branch. After GitHub Pages is set to deploy from that branch at the root, the preview is:

https://mizcausevic-dev.github.io/optical-seed-sorting-explainer/

Scrub to frame 640 for the air pulse. Scrub to frame 1019 for the held system view, when nothing is still moving and every illustrated kernel is in a bin.

## What the machine is actually doing

Commercial optical sorters already run on beans, peanuts, coffee, peas, and rice. The public review behind this explainer is Pasikatan and Dowell, "Sorting systems based on optical methods for detecting and removing seeds infested internally by insects or fungi," Applied Spectroscopy Reviews 36(4), 399-416 (2001), from USDA-ARS. The review is about seeds with internal insects or fungi. It is not a certification of any sorter, including the one drawn here.

Read the machine as four jobs in order.

1. A feeder meters seed into a spaced layer. If two seeds overlap in the view, the record is no longer about one kernel.
2. Illumination and a camera look at each seed as it crosses a viewing plane. In this drawing the selected sensor is bichromatic reflectance: one visible band and one near-infrared band. Other machines use a single wavelength, transmittance, or fluorescence. Full-spectrum models show up in the research literature. The review notes that many of those models are useful for finding wavelengths and are not the practical high-speed path.
3. A controller compares the readings with a threshold and, if the seed is to be rejected, schedules an eject. The schedule has to wait. The seed still has to travel from the viewing plane to the nozzle.
4. A timed air pulse diverts that seed into the reject stream. Accepted seeds are not pulsed. They continue.

Detection does not move the seed. Ejection does not inspect it. If you collapse those two into one sentence, "the sorter removes contamination," you have already said something the hardware does not do.

The housing in the explainer is a section. The near cover is omitted in the drawing. It was not taken off a machine. A second camera is drawn with a dashed outline and labeled as a schematic, because orientation changes the signal and a single view is not the whole story. Valve internals, nozzle count, and channel width are not specified, because this is not a vendor layout.

Colors are overlays. Cyan is transport or the signal path. Gold is energy or the air pulse. Violet is sensing or a state change. The metal is metal. The seeds are seed-colored. Nothing in the picture is a lamp pretending to be a user interface.

## What visible light can see, and what it misses

The review's split is the one that matters for copy.

Surface cues, including discoloration from fungi, generally show up in the visible range, about 400 to 750 nanometers. Internal attributes are a near-infrared problem. Symptomless fungal contamination, and insect larvae or pupae inside the seed, were not caught by visible color sorting in the studies the review cites. Near-infrared differences can carry information about those internal conditions. They can also be moved by moisture, by which way the kernel is turned, and by ordinary biological variation.

That is why the explainer does not treat "a nice looking seed" as a clean seed. A darker patch on the surface is a cue this selected sensor is meant to notice. A normal surface is not evidence about the interior.

The review is also blunt about the models. A sorting index is just the form of the optical measurement that separates acceptable seed from objectionable seed for a stated purpose. Commercial units have used one wavelength or two. Two-wavelength ratios and differences have been practical. Full-spectrum discriminant analysis, principal components, and partial least squares can point at useful wavelengths. They are not, by themselves, a high-speed sorter. Wavelengths that worked for one fungus, one insect, or one seed do not travel as a universal calibration. The drawing therefore refuses to print a nanometer pair as "the" setting. The axis says visible darkening and near-infrared difference. The threshold line is labeled illustrated.

## The record has to stay on the seed

Once a seed crosses the viewing plane it gets a record. Seeds still upstream have none. That sounds fussy until a lot of product language treats the sorter as if it knew the whole hopper at once.

In the explainer, a leader line ties the feature card to one physical kernel, S-17. The card shows three different readings, not one blended score:

- Color, as a visible-band comparison against a reference surface.
- Outline, as a camera silhouette. Aspect and area are qualitative. There is no millimeter scale. Seed size is enlarged so the cue stays readable, and the picture says so.
- A two-band index, plotted against an illustrated threshold, with an overlap band marked uncertain.

S-17 sits on the reject side of that line because it carries a visible dark patch. S-16 sits in the overlap. It is marked uncertain before anyone pretends the threshold is a property of the seed. The threshold is an operating choice. Move it and you trade one error for the other. The review describes that trade directly: raise the cutoff and more sound seed goes to reject; lower it and more objectionable seed stays in the accept stream. Acceptable and unacceptable seeds do not form two neat piles in the data. Their spectra overlap. Moisture bands interfere. A kernel turned the wrong way can move a sound seed across the line. A small larva, or a fungal infection with no surface mark, can sit on the accept side of a visible measurement.

The time labels matter as much as the science labels. The pass across the camera is slow motion. The feeder and the final sampling are time compressed. The last second is held. If a viewer thinks they are watching a real throughput, the badges are there to stop that reading. There is no kilograms-per-hour number in the picture, and there should not be one in the caption either.

## Four outcomes, and only two of them are the slogan

The explainer follows eight seeds. Eight is a teaching cohort. It is not a sample size, a yield, or an error rate. Anyone who screenshots the final panel and calls it a performance study has misread the label on the panel. The label says so.

At the held frame the accounting is simple, because the drawing is required to conserve material.

- Six seeds are in the accept bin.
- Two seeds are in the reject bin.
- None are left on the machine.

Inside that count, the interesting seeds are the ones a slogan would skip.

S-17 is the clear reject. It has a visible surface cue. The index is beyond the illustrated threshold. A single nozzle pulse, timed for that seed, diverts it. Neighboring seeds are not pulsed. S-18 has already passed the nozzle and continues down the accept path while S-17 is in the air. That is the whole point of a timed pulse. Rejection is selective. It is not a gate that closes on the stream.

S-16 looks ordinary and sits in the overlap. The illustrated threshold sends it to reject anyway. That is a false reject. It is the cost of a more aggressive cutoff. The seed is not deleted. It is in the reject bin, where a later decision can put it back into a resort, a feed use, or a waste stream. The drawing does not choose that later decision. It only refuses to make the kernel vanish.

S-19 is the uncomfortable one. The surface looks ordinary. The call is accept. An internal condition is still possible, and this pass did not resolve it. That is a false accept relative to an interior the sensor did not clear. A violet ring stays on that kernel in the accept bin so it cannot be mistaken for a proven good seed. The review's point, carried into the picture, is that visible sorting misses symptomless internal insects and fungi, and near-infrared helps only inside the limits of moisture, orientation, size of the infestation, and the threshold you chose.

The other five seeds have no defect cue drawn. They are accepts in this illustration. They are not a purity claim.

## Rejected seed and spent air have to go somewhere

A sorter that "removes" material without showing where it went is a magic trick. The explainer keeps a qualitative balance on screen.

Seed in: the eight illustrated kernels.
Seed out: the accept bin and the reject bin.
Energy in: illumination, the tray drive, the controller, and compressed air.
Energy out: heat that stays with the enclosure, and spent air that leaves the hood.

Bar lengths are not measurements. The panel says the widths are teaching weights. What matters is the direction. Rejected kernels stay rejected. The air pulse is not an erase function. The lamps do not run cold. If a process diagram drops the reject stream or the heat, it is hiding the part of the machine a buyer will actually have to design for: the reject handling, the compressor, and the enclosure.

## What not to put on the product page

The review gives a copy desk a short list of sentences that do not survive contact with the literature.

Do not say the sorter removes all internal contamination. Internal insects and fungi can leave little or no visible mark. Near-infrared can help and can still miss small, moist, poorly oriented, or overlapping cases. Dowell and colleagues could detect larger larvae in wheat more reliably than small ones. That is a limit, not a footnote you drop at launch.

Do not say a passed lot is free of pathogens. Optical sorting is not a pathogen test. Aflatoxin can be concentrated in a tiny fraction of a lot, and bright greenish-yellow fluorescence is a presumptive screen, not proof. The explainer's disclaimer is the same sentence the product page needs: a seed in the accept bin is not evidence that pathogens are absent.

Do not publish a universal defect sensitivity. The review's own conclusion is that performance depended on the seed, its orientation, how far the infestation had gone, and the threshold. A pair of wavelengths that separated one fungus on one crop is not a specification for the next crop.

Do not publish a throughput as if the explainer measured it. The picture is slow motion on purpose. A real feeder is faster. The drawing is about sequence and failure modes, not about a nameplate rate.

Do not show a single "AI score" with no sensor behind it. The honest diagram is duller and more useful: which bands, which threshold, which delay, which valve, which bin. If the sensor changes, the claim changes. Say so.

## How to watch the 34 seconds

The camera is doing the argument, not decorating it.

From 0 to 5 seconds the view reveals the feeder, the inspection region, the lamps, the camera, the nozzle, and the two bins. Nothing has been sorted yet. Measurement is not removal.

From 5 to 10 seconds, slow motion, spaced seeds cross the viewing plane. A record starts only at that plane.

From 10 to 17 seconds the feature card is enlarged and tied to S-17. Uncertain overlap is marked. Upstream seeds are absent from the plot.

From 17 to 25 seconds the camera follows S-17 to the nozzle. S-16 is already on the way to reject. The pulse fires for S-17. Accepted seed continues.

From 25 to 34 seconds the view pulls back. The eight seeds are sampled at the outputs. The balance is qualitative. The last frames hold still. A sorter diagram that keeps animating at the end is asking you to feel activity. This one stops so you can count.

Playback is ordinary. Space starts and pauses. Arrow keys step a frame, or thirty frames with Shift. If the browser asks for reduced motion, the film waits until you press play.

## The source, and the limit of the source

Pasikatan, M.C. and Dowell, F.E. (2001). Sorting systems based on optical methods for detecting and removing seeds infested internally by insects or fungi: a review. Applied Spectroscopy Reviews, 36(4), 399-416.

The USDA-ARS file is here:

https://www.ars.usda.gov/ARSUserFiles/30200525/348%20Sorting%20systems%20optical%20methods.pdf

The review supports the mechanism and the limits: visible cues for surface damage, near-infrared information for some internal conditions, overlapping classes, a threshold that trades errors, and a separate ejector. It does not supply the dimensions, the valve timing, or a performance guarantee for the drawing. Mention of any commercial approach in that paper was for identification, not an endorsement, which is the paper's own caution and a good one to keep.

Use the explainer as a way to show the sequence and the failure modes. Do not use the final frame as a datasheet. The eight seeds are still eight seeds at the end. That is the feature.
