# 04 — Recursive Subdivision

> A canvas split, then split again, then split again. Mondrian compositions from a 30-line recursive function.

## Run it

[**Live demo →**](https://rickanjilal.github.io/algorithmic-art/sketches/04-recursive-subdivision/)

**Keys:** `SPACE` generate · `S` save

---

## The algorithm in one sentence

> *Take a rectangle. Maybe split it; maybe fill it.*

That's it. The recursion does the rest.

## How it works

```
subdivide(x, y, w, h, depth):
    if too small or random check fails:
        fill with a color from palette
        return

    pick horizontal or vertical
    pick where to cut (somewhere in the middle 60%)
    subdivide(left half,  depth + 1)
    subdivide(right half, depth + 1)
```

Each rectangle either:
1. **Fills itself** with a color and stops, or
2. **Splits in half** somewhere and recurses on each piece

The probability of splitting decreases with depth. Top-level rectangles almost always split. By depth 6, almost nothing splits — small rectangles are too small to be interesting if cut further.

## Why it looks like Mondrian

Piet Mondrian's "Composition" series (the famous red/yellow/blue grid paintings) are built on roughly this principle — a few large rectangles, a few small ones, mostly white space, accented by primary colors with thick black borders.

The two technical tricks that make this look intentional rather than random:

### Trick 1 — White is overweighted in the palette

```js
const PALETTE = [
  '#f4ede4',  // appears 4×
  '#f4ede4',
  '#f4ede4',
  '#f4ede4',
  '#d63031',  // red appears 1×
  '#fdcb6e',  // yellow 1×
  '#0984e3',  // blue 1×
  '#2d3436'   // black 1×
];
```

50% of cells end up off-white. That breathing room is what makes the colored cells *pop*. Without it, the canvas looks like a quilt.

### Trick 2 — Cuts are biased toward the longer axis

If a rectangle is taller than it is wide, we're more likely to cut horizontally. This keeps the children roughly balanced rather than producing long thin slivers.

## Tuning knobs

| Parameter | What it does |
|-----------|--------------|
| `MAX_DEPTH` | Cap on recursion. Higher = denser composition |
| `MIN_SIZE` | Don't split rectangles smaller than this |
| `STROKE_WEIGHT` | Border thickness — Mondrian was famously thick |
| `PALETTE` | Edit the colors. Try a sunset palette, or grayscale |

## Variations to try

- **Diagonal cuts** instead of strictly horizontal/vertical → produces triangulation
- **Three-way splits** → like a quadtree but only when both dimensions are large
- **Cut only at "good" ratios** (golden, halves, thirds) instead of random → more architectural
- **Make some leaves nested** (smaller rectangles inside bigger ones) → adds depth
- **Animate the subdivision** so you watch it happen frame by frame

## Where this idea comes from

Recursive spatial subdivision is one of the foundational techniques in computer graphics — it's how raytracing accelerators (BVHs), 2D quadtrees, and texture compression all work. Using it for art was popularized by people like Saskia Freeke (sasj.tumblr.com) and Tyler Hobbs.

The connection to Mondrian's actual paintings is mostly aesthetic — Mondrian was working from an artistic philosophy called *Neoplasticism*, not from any algorithm. But the *output* is uncannily similar, which says something about why his paintings feel mathematically clean.
