# 05 — Pixel Sort

> Real photos, run through a threshold, then each row of pixels sorted by brightness. Beautiful glitches that look intentional.

## Run it

```bash
pip install -r requirements.txt
python pixel_sort.py path/to/your/image.jpg
```

The output is saved as `<original-name>_sorted.png` next to the source.

---

## What it does

You take a real photo. You decide which pixels are "in-bounds" — for example, only those with brightness between 60 and 200 (excluding pure shadows and pure highlights). Then for every horizontal row of the image, you find every contiguous run of in-bounds pixels and sort them by brightness.

The result: streaks of color that flow horizontally, while the highlights and shadows remain untouched. The image stays recognizable but feels broken — like the photo is melting along its midtones.

This is the technique that powers a lot of the *"glitch art"* you see on album covers, club flyers, and vaporwave Tumblr — it was popularized by Kim Asendorf's 2010 ASDF Pixel Sort tool.

## How it works in detail

### Step 1 — Compute brightness for every pixel

```python
brightness = 0.299*R + 0.587*G + 0.114*B
```

These weights aren't arbitrary — they're from ITU-R BT.601, the spec that defines luminance for analog TV. They reflect the fact that human eyes are most sensitive to green, then red, then blue. A flat `(R+G+B)/3` works but looks weirdly green-shifted on bright objects.

### Step 2 — Find "runs" in each row

Walk along the row pixel by pixel. While brightness is between the low and high thresholds, you're inside a run. Pixels outside the thresholds act as **fences** — they break the row into segments.

```
Row:     [dark][BRIGHT_RUN_1][dark][BRIGHT_RUN_2][bright_pixel][BRIGHT_RUN_3]
              ↑                    ↑                                       ↑
              These three runs get sorted independently.
              The dark and bright pixels stay where they are.
```

This is what gives pixel sort its signature look. The "fences" preserve the high-contrast structure of the image (faces, edges, sky) while the midtones smear into perfect gradients.

### Step 3 — Sort each run

```python
sorted_run = sorted(run, key=brightness)
```

That's the whole sort. By default ascending — dark pixels of a run on the left, bright on the right.

### Step 4 — Vertical mode (free)

If you want vertical sorting, you don't write a separate algorithm. You transpose the image, sort the (now-rows-which-are-original-columns), transpose back. Same code, 90° rotated.

## Tuning

The four constants at the top of `pixel_sort.py` control everything:

| Constant | Effect |
|----------|--------|
| `LOW_THRESHOLD` | Raise → more shadows excluded → less of the image is sorted |
| `HIGH_THRESHOLD` | Lower → more highlights excluded → preserves bright details |
| `DIRECTION` | `"horizontal"` or `"vertical"` — totally different vibes |
| `SORT_KEY` | `brightness`, `hue`, `saturation`, `red`, `green`, `blue` |
| `REVERSE` | `True` → brightest pixels first (looks more aggressive) |

### Recommended starting points

- **Subtle melt** — `LOW=80, HIGH=180`, horizontal, brightness, no reverse
- **Heavy glitch** — `LOW=20, HIGH=240`, horizontal, brightness, reverse
- **Color smear** — `LOW=50, HIGH=220`, sort by `hue` instead of brightness
- **Vertical ribbon look** — same as subtle melt but `DIRECTION = "vertical"`

## What images work best

- **High-contrast photos** — sunsets, landscapes, portraits with strong lighting. The fences (shadows / highlights) preserve enough structure to keep the image readable
- **Cityscapes at night** — neon and dark sky create natural fence patterns
- **Anything with a face** — the eyes and mouth survive as fences while skin smears

What doesn't work as well: flat / evenly-lit images. With no shadows or highlights, almost everything passes the threshold and the entire image becomes a horizontal gradient blur. Sometimes that's the look you want, but usually not.

## Where this idea comes from

The technique was formalized by Kim Asendorf in 2010 with their *ASDF Pixel Sort* Processing sketch. The idea spread fast in the glitch-art community and now powers everything from album covers to live VJ visuals. Daniel Temkin's *Internet Archaeology* essays on glitch aesthetics are a good rabbit hole if you want to read more about why broken-on-purpose images feel the way they do.
