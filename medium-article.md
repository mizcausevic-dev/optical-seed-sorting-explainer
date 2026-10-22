# Optical seed sorting: what bichromatic inspection can remove, and what it cannot prove

A 34-second sectional explainer of singulation, sensing, and timed air ejection, checked against a USDA review of optical methods for internal insects and fungi.

A seed sorter does not clean a lot. It makes a fast optical call on one seed. Later, it may fire a short pulse of air. Those are two operations. The first can be wrong. The second only moves the seed the first one selected. The kernel that was not selected stays in the accept stream, including the one whose interior the cameras never resolved.

That is the product claim once the brochure language comes off. Optical sorting can pull out seeds that show an optical cue. It cannot guarantee that every internal insect or fungal condition is gone. It cannot prove that pathogens are absent. A passing seed is a seed the chosen sensor did not flag at the chosen threshold. It is not a certificate.

The drawing that goes with this article is a frame-accurate section, not a machine design. It runs 34 seconds at 30 frames a second, frames 0 through 1019. The code is public:

https://github.com/mizcausevic-dev/optical-seed-sorting-explainer

The site files sit on the `pages` branch. After GitHub Pages is set to deploy from that branch at the root, the preview is:

https://mizcausevic-dev.github.io/optical-seed-sorting-explainer/

Scrub to frame 640 for the air pulse. Scrub to frame 1019 for the held system view, when nothing is still moving and every illustrated kernel is in a bin.
