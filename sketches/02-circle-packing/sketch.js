// ============================================================
// Sketch 02 — Circle Packing
// ============================================================
// At every frame, we try to place a few new "seed" circles at
// random positions. If a seed isn't already overlapping with an
// existing circle, it stays — and starts to grow. As it grows,
// it checks each frame whether it's touching another circle or
// the canvas edge. The moment it does, it freezes at its current
// radius.
//
// The result is a tightly-packed mosaic where big circles fill
// the open spaces and small circles squeeze into the gaps. It
// looks designed but is purely greedy.
// ============================================================

const SEEDS_PER_FRAME = 30;     // how aggressively we try new circles
const MIN_RADIUS = 1;
const MAX_RADIUS = 80;
const GROWTH_RATE = 0.5;
const PALETTE = [
  '#f5e6d3',  // cream
  '#e8b4a0',  // dusty rose
  '#a8c3a8',  // sage
  '#7a9eb5',  // muted blue
  '#4a5d6e',  // deep grey-blue
  '#2c3e50'   // near-black blue
];

let circles = [];
let attempts = 0;
const MAX_ATTEMPTS = 5000;  // give up after this many failed seedings

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent(document.body);
  document.body.insertBefore(canvas.elt, document.body.firstChild);
  background(245, 240, 235);
  noStroke();
}

function draw() {
  // Try to seed new circles
  for (let i = 0; i < SEEDS_PER_FRAME; i++) {
    if (attempts > MAX_ATTEMPTS) break;
    const seed = trySeed();
    if (seed) {
      circles.push(seed);
      attempts = 0;
    } else {
      attempts++;
    }
  }

  // Grow + draw all circles
  for (const c of circles) {
    if (c.growing) {
      c.r += GROWTH_RATE;
      // Stop growing if too big or touching another circle
      if (c.r >= MAX_RADIUS || edgeHit(c) || circleHit(c)) {
        c.growing = false;
        c.r -= GROWTH_RATE;  // back off one step
      }
    }
    fill(c.color);
    circle(c.x, c.y, c.r * 2);
  }

  // Stop the loop when full
  if (attempts > MAX_ATTEMPTS) {
    noLoop();
    console.log(`Done. ${circles.length} circles placed.`);
  }
}

function trySeed() {
  const x = random(width);
  const y = random(height);
  // Don't seed inside an existing circle
  for (const c of circles) {
    const d = dist(x, y, c.x, c.y);
    if (d < c.r + MIN_RADIUS) return null;
  }
  return {
    x, y,
    r: MIN_RADIUS,
    growing: true,
    color: random(PALETTE)
  };
}

function edgeHit(c) {
  return c.x - c.r < 0 || c.x + c.r > width ||
         c.y - c.r < 0 || c.y + c.r > height;
}

function circleHit(c) {
  for (const other of circles) {
    if (other === c) continue;
    const d = dist(c.x, c.y, other.x, other.y);
    if (d < c.r + other.r + 1) return true;
  }
  return false;
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('circle-packing-' + Date.now(), 'png');
  }
  if (key === 'r' || key === 'R') {
    circles = [];
    attempts = 0;
    background(245, 240, 235);
    loop();
  }
}
