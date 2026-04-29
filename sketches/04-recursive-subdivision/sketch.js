// ============================================================
// Sketch 04 — Recursive Subdivision (Mondrian-style)
// ============================================================
// Take a rectangle. Decide whether to split it. If yes, randomly
// pick horizontal or vertical, randomly pick where to cut, and
// recurse on each half. If no, fill the rectangle with a color
// from the palette.
//
// The probability of splitting decreases with depth — small
// rectangles are less likely to subdivide further. This produces
// a clean composition reminiscent of Piet Mondrian's
// "Composition with Red, Yellow and Blue" series.
// ============================================================

const MAX_DEPTH = 6;
const MIN_SIZE = 50;
const STROKE_WEIGHT = 6;

// Mondrian-inspired palette (high-contrast primaries + neutrals)
const PALETTE = [
  '#f4ede4',  // off-white (most common — gives breathing room)
  '#f4ede4',
  '#f4ede4',
  '#f4ede4',
  '#d63031',  // red
  '#fdcb6e',  // yellow
  '#0984e3',  // blue
  '#2d3436'   // near-black
];

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent(document.body);
  document.body.insertBefore(canvas.elt, document.body.firstChild);
  generate();
}

function generate() {
  background('#f4ede4');
  stroke('#0a0a0f');
  strokeWeight(STROKE_WEIGHT);
  subdivide(0, 0, width, height, 0);
}

function subdivide(x, y, w, h, depth) {
  // Decide: split, or fill?
  const splitProb = map(depth, 0, MAX_DEPTH, 0.95, 0.0);
  const tooSmall = w < MIN_SIZE || h < MIN_SIZE;
  const shouldSplit = !tooSmall && random() < splitProb;

  if (!shouldSplit) {
    fill(random(PALETTE));
    rect(x, y, w, h);
    return;
  }

  // Split — pick orientation. Bias toward whichever axis is longer,
  // which keeps the resulting rectangles more balanced.
  const horizontal = w < h ? true : (random() < 0.5);

  if (horizontal) {
    // Horizontal cut — pick where, somewhere in the middle 60%
    const cutY = y + h * random(0.2, 0.8);
    subdivide(x, y, w, cutY - y, depth + 1);
    subdivide(x, cutY, w, y + h - cutY, depth + 1);
  } else {
    const cutX = x + w * random(0.2, 0.8);
    subdivide(x, y, cutX - x, h, depth + 1);
    subdivide(cutX, y, x + w - cutX, h, depth + 1);
  }
}

function keyPressed() {
  if (key === ' ') generate();
  if (key === 's' || key === 'S') {
    saveCanvas('subdivision-' + Date.now(), 'png');
  }
}
