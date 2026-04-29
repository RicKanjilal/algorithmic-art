# 02 — Circle Packing

> Greedy algorithm fills empty space with circles of every size. Looks designed; isn't.

## Run it

[**Live demo →**](https://rickanjilal.github.io/algorithmic-art/sketches/02-circle-packing/)

**Keys:** `S` save · `R` reset

---

## How it works

This is one of the most satisfying algorithms to write because it's just three rules:

### Rule 1 — Try to seed a new circle

Pick a random `(x, y)` somewhere on the canvas. If that point isn't already inside an existing circle, plant a tiny new circle there with radius 1. If it *is* inside a circle, throw it away and try again.

### Rule 2 — Grow the live circles

Every frame, every circle that's still "growing" gets slightly bigger (radius += 0.5). Each one keeps growing until one of three things happens:
- It hits another circle
- It hits the canvas edge
- It reaches the maximum allowed radius

When any of those happens, the circle freezes forever.

### Rule 3 — Stop when full

After 5,000 attempts in a row to seed a new circle without finding empty space, give up. The canvas is packed.

That's the whole algorithm. ~50 lines of JavaScript.

---

## Why it looks good

The reason this looks aesthetically pleasing — almost hand-designed — is that it naturally produces **a power-law distribution of sizes**. A few enormous circles claim the open canvas first. As space fills up, mid-sized circles fit into the medium gaps. Eventually only tiny circles can squeeze into the slivers between everything else.

This same distribution shows up everywhere in nature — the size of cities, the size of leaves, the gaps between sand grains. Greedy algorithms applied to space tend to produce it.

---

## Tuning knobs

| Parameter | What it does |
|-----------|--------------|
| `SEEDS_PER_FRAME` | Higher = fills faster, slightly less even |
| `MAX_RADIUS` | Cap on biggest circle. Set lower for finer texture |
| `GROWTH_RATE` | Higher = quicker but lumpier (overshoots collisions) |
| `MAX_ATTEMPTS` | How long we keep trying before giving up |
| `PALETTE` | Edit this for a totally different mood |

---

## Variations to try

- **No fill, only stroke** → looks like a network diagram
- **Circle size determined by distance from canvas center** → radial composition
- **Pack rectangles instead** → much harder collision math, but the result feels tighter
- **Pack circles inside a non-rectangular shape** (e.g., the silhouette of a letter)
- **Animate the growth in real-time, then stop** vs. **fill instantly** — completely different vibe

---

## Where this idea comes from

Circle packing as a generative-art technique was popularized by people like Anders Hoff (inconvergent.net) and the work of Robert Hodgin. The mathematical question of *optimal* circle packing (densest possible) is much harder and is unsolved for many cases — what we're doing here is *greedy*, which is fast and pretty but never optimal.
