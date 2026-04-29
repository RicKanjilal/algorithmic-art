# 01 — Flow Field

> 2,000 particles drift through an invisible field of Perlin noise. The field shifts slowly over time. Nothing repeats.

## Run it

[**Live demo →**](https://rickanjilal.github.io/algorithmic-art/sketches/01-flow-field/)

Or locally:
```bash
python -m http.server 8000
# open http://localhost:8000
```

**Keys:** `S` save · `R` reset · `SPACE` pause

---

## How it works

This is one of those algorithms that looks magical until you understand it, and then looks magical *because* you understand it.

### Step 1 — Make a 2D grid of angles

Divide the canvas into cells, say 45 columns × 30 rows. For each cell, you need an angle. You could use random angles — but random angles produce static. You'd see a chaotic mess with no flow.

Instead, you use **Perlin noise**. Perlin noise is a function that gives you a smooth, continuous random value at every point — meaning two nearby points have nearby values, but points far apart can be wildly different. It's the algorithm behind procedural terrain in Minecraft, the cloud textures in Photoshop, and basically every "natural-looking" generated thing in computer graphics.

```js
const angle = noise(x * 0.1, y * 0.1) * TWO_PI * 4;
```

`noise()` returns a value between 0 and 1. Multiplying by `TWO_PI * 4` gives an angle between 0 and 8π. The result: nearby cells point in nearby directions, so the field has *flow*.

### Step 2 — Drop particles into the field

Each particle has a position and a velocity. On every frame:

1. Look up the cell the particle is in
2. Get the angle for that cell
3. Push the particle in that direction
4. Move

That's it. No physics simulation, no AI, no path planning. Just *"each particle reads its current cell's arrow and follows it."*

### Step 3 — Animate the field

The third dimension of `noise(x, y, z)` is time. Slowly increment `z` and the entire field morphs smoothly. The arrows don't change individually — the whole landscape does.

### Step 4 — Don't clear the canvas

Most p5 sketches call `background()` every frame to wipe and redraw. We don't. We draw a *semi-transparent* black rectangle each frame instead, which slowly fades the previous frames without erasing them. That's why each particle leaves a trail.

---

## Tuning knobs

| Parameter | What it does | Try values |
|-----------|--------------|------------|
| `NUM_PARTICLES` | More = denser, slower | 500 → 5000 |
| `SCALE` | Cell size — larger = bigger flow patterns | 5 → 50 |
| `NOISE_INC` | How fast the field varies across space — lower = smoother | 0.05 → 0.5 |
| `TIME_INC` | How fast the field shifts over time — lower = more meditative | 0.0001 → 0.01 |
| `PARTICLE_SPEED` | Higher = jerkier | 1 → 6 |
| `TRAIL_ALPHA` | Lower = longer trails (5) — higher = barely any (50) | 1 → 50 |

The whole sketch is ~80 lines of code with 6 numbers controlling the entire aesthetic. Change one, get a completely different mood.

---

## Where this idea comes from

The technique is sometimes called *"flow field art"* in the creative-coding scene. Tyler Hobbs's piece [*Fidenza*](https://tylerxhobbs.com/fidenza) is the canonical large-scale example — generative, sold as NFTs for serious money. Daniel Shiffman's [*Coding Train*](https://thecodingtrain.com/) episodes on flow fields are how most people (including me) first learned the algorithm.

The maths goes back to Ken Perlin's 1985 noise function, originally invented for rendering fire and clouds in the movie *Tron*.

---

## What I'd try next

- **Color from velocity** — fast particles red, slow particles blue
- **Field driven by an image** — sample brightness from a photo to make the field
- **Multiple noise layers** at different scales added together
- **3D version** in p5's WebGL mode, particles flowing through volumetric noise
