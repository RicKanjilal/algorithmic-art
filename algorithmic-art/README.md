<div align="center">

# 🎨 Algorithmic Art

### *Code that makes pictures. Math that becomes mood.*

A growing collection of generative art sketches — Perlin flow fields, circle packing, L-system trees, recursive subdivision, pixel sorting — written from scratch in **p5.js** and **Python**.

[View the live gallery →](https://rickanjilal.github.io/algorithmic-art/)

</div>

---

## What this repo is

Each folder under `sketches/` is one self-contained piece — a single algorithm, a single aesthetic, a single short writeup explaining the math behind it.

Some are clean and geometric. Some are organic and flowing. One is deliberately broken — pixels sorted into impossible gradients of their own colors. They're all the same thing underneath: **rules executed by a computer that produce something a human finds beautiful.**

This repo serves two audiences:

- **If you're another student learning to code**, every sketch is annotated with the *why*, not just the *what*. The Perlin flow field doesn't just say "noise" — it explains what noise actually is, why it makes things feel natural, and how to tune it
- **If you're a reviewer / recruiter / admissions officer**, each sketch is a working artifact you can run in 10 seconds. The hosted gallery has live demos and high-res renders

---

## The sketches

| # | Sketch | Aesthetic | Tech | Math |
|---|--------|-----------|------|------|
| 01 | [**Flow Field**](sketches/01-flow-field/) | Organic | p5.js | Perlin noise + vector fields |
| 02 | [**Circle Packing**](sketches/02-circle-packing/) | Geometric | p5.js | Greedy packing + collision detection |
| 03 | [**L-System Tree**](sketches/03-l-system-tree/) | Organic | p5.js | String rewriting + turtle graphics |
| 04 | [**Recursive Subdivision**](sketches/04-recursive-subdivision/) | Geometric | p5.js | Mondrian-style binary partitioning |
| 05 | [**Pixel Sort**](sketches/05-pixel-sort/) | Glitch | Python | Threshold-based row sorting on real images |

---

## Running the sketches

### p5.js sketches (01–04)

The fastest path is the live gallery: **[rickanjilal.github.io/algorithmic-art](https://rickanjilal.github.io/algorithmic-art/)**

To run locally, you just need any local HTTP server (browsers block `file://` access to the p5 library). The simplest:

```bash
cd sketches/01-flow-field
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Press **`s`** in any p5 sketch to save the current frame to your Downloads folder.

### Python sketch (05)

```bash
cd sketches/05-pixel-sort
pip install pillow numpy
python pixel_sort.py path/to/your/image.jpg
```

The sorted output is written to `output.png` next to the source.

---

## The gallery folder

`gallery/` collects the best outputs from each sketch — high-res PNGs, ready to use as wallpapers or share on socials. Every sketch has a keyboard shortcut to save its current frame; the curated favourites get committed to this folder.

---

## What I learned building this

- **Randomness is boring. Noise is beautiful.** A `random()` call gives you static. `noise()` gives you something that looks alive. The difference between the two is the difference between a TV with no signal and a slow river
- **Constraints make the art.** Every sketch in here has fewer than 5 free parameters. The interesting ones are tweaked, not cluttered
- **Generative art is debugging in public.** Most failed runs don't look "wrong" — they look weird. Telling the difference between *broken* and *unexpectedly cool* is half the skill
- **Code-as-art makes you a better engineer.** Writing the L-system forced me to actually understand string rewriting. The flow field made me internalize 2D vectors. Circle packing taught me when collision detection is fast enough and when it isn't

---

## What's next

- [ ] Reaction-diffusion (Gray-Scott model) — patterns that evolve like coral
- [ ] Voronoi tessellation with animated points
- [ ] Wave Function Collapse for tile-based generation
- [ ] 3D variants using p5's WebGL mode
- [ ] Audio-reactive versions — sketch responds to mic input
- [ ] Print versions — properly sized for A3/poster output

---

## License

MIT. Fork anything, remix anything, post your weird descendants of these sketches and tag me — I'd love to see them.

---

Built by **Ric Kanjilal** · Grade 10, Don Bosco School, Liluah · Kolkata
