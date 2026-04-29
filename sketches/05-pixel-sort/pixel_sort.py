"""
Sketch 05 — Pixel Sort
======================

Pixel sorting is a glitch-art technique: take a real photo, apply a
threshold (e.g., "only sort pixels brighter than X"), and within each
horizontal row sort the matching runs of pixels by their brightness.
The result is unsettling streaks that look digital and intentional —
but the algorithm is dead simple.

Usage:
    pip install pillow numpy
    python pixel_sort.py path/to/image.jpg

By default sorts horizontally, brightness-thresholded, ascending.
Tweak the constants below to change the look.

Author: Ric Kanjilal
License: MIT
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image


# =====================
# CONFIG
# =====================
LOW_THRESHOLD = 60      # pixels darker than this are NOT sorted
HIGH_THRESHOLD = 200    # pixels brighter than this are NOT sorted
DIRECTION = "horizontal"  # "horizontal" or "vertical"
SORT_KEY = "brightness"   # "brightness", "hue", "saturation", or "red" / "green" / "blue"
REVERSE = False           # True = bright pixels first
# =====================


def brightness(pixel):
    """ITU-R BT.601 luma — closer to perceived brightness than a flat mean."""
    r, g, b = pixel[0], pixel[1], pixel[2]
    return 0.299 * r + 0.587 * g + 0.114 * b


def sort_key_func(key):
    """Return a function that takes a pixel and returns a sort value."""
    if key == "brightness":
        return brightness
    if key == "red":
        return lambda p: p[0]
    if key == "green":
        return lambda p: p[1]
    if key == "blue":
        return lambda p: p[2]
    if key == "saturation":
        return lambda p: max(p[:3]) - min(p[:3])
    if key == "hue":
        # Quick & dirty hue: angle of (R, G, B) in RGB space
        return lambda p: np.arctan2(
            np.sqrt(3) * (p[1] - p[2]),
            2 * p[0] - p[1] - p[2],
        )
    raise ValueError(f"Unknown sort key: {key}")


def find_runs(row_brightness, low, high):
    """
    Walk along a 1D array of brightness values and return a list of
    (start, end) index pairs identifying contiguous runs of pixels
    that fall *between* the low and high thresholds.

    Pixels outside the threshold band act as "fences" — we sort
    only the runs of in-band pixels between fences.
    """
    runs = []
    in_run = False
    start = 0
    for i, b in enumerate(row_brightness):
        if low <= b <= high:
            if not in_run:
                start = i
                in_run = True
        else:
            if in_run:
                runs.append((start, i))
                in_run = False
    if in_run:
        runs.append((start, len(row_brightness)))
    return runs


def sort_row(row, key_fn, reverse=False):
    """Sort the threshold-passing runs of a single row in-place."""
    row_brightness = np.array([brightness(p) for p in row])
    runs = find_runs(row_brightness, LOW_THRESHOLD, HIGH_THRESHOLD)

    for start, end in runs:
        slice_pixels = sorted(
            row[start:end],
            key=lambda p: key_fn(p),
            reverse=reverse,
        )
        row[start:end] = slice_pixels

    return row


def pixel_sort(image_path: str, output_path: str = "output.png"):
    img = Image.open(image_path).convert("RGB")
    pixels = np.array(img)

    print(f"Loaded {img.size[0]}×{img.size[1]} image from {image_path}")
    print(f"Direction: {DIRECTION} | Sort by: {SORT_KEY} | "
          f"Threshold: {LOW_THRESHOLD}–{HIGH_THRESHOLD} | Reverse: {REVERSE}")

    key_fn = sort_key_func(SORT_KEY)

    if DIRECTION == "vertical":
        # Transpose, sort rows (which are now original columns), transpose back
        pixels = np.transpose(pixels, (1, 0, 2))

    n_rows = pixels.shape[0]
    for y in range(n_rows):
        row = [tuple(p) for p in pixels[y]]
        pixels[y] = sort_row(row, key_fn, reverse=REVERSE)

        if y % 50 == 0:
            print(f"  row {y}/{n_rows}")

    if DIRECTION == "vertical":
        pixels = np.transpose(pixels, (1, 0, 2))

    Image.fromarray(pixels).save(output_path)
    print(f"\n✓ Saved → {output_path}")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    src = Path(sys.argv[1])
    if not src.exists():
        print(f"File not found: {src}")
        sys.exit(1)

    out = src.parent / f"{src.stem}_sorted.png"
    pixel_sort(str(src), str(out))


if __name__ == "__main__":
    main()
