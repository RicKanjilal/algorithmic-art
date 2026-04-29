// ============================================================
// Sketch 01 — Flow Field
// ============================================================
// 2,000 particles drift through a 2D field of Perlin noise.
// Each cell of the underlying grid maps a noise value to an
// angle; particles read the angle of the cell they're standing
// in and add that as a force. The field slowly shifts over time
// (the third dimension of the noise) so nothing ever stays still.
//
// This is the same idea behind windswept-looking art, abstract
// topographic maps, and procedural smoke effects.
// ============================================================

const NUM_PARTICLES = 2000;
const SCALE = 20;          // size of each noise cell in pixels
const NOISE_INC = 0.1;     // how fast noise changes across space
const TIME_INC = 0.0008;   // how fast the field shifts over time
const PARTICLE_SPEED = 2;
const TRAIL_ALPHA = 8;     // lower = longer trails

let particles = [];
let cols, rows;
let zoff = 0;
let paused = false;

function setup() {
  const canvas = createCanvas(900, 600);
  canvas.parent(document.body);
  document.body.insertBefore(canvas.elt, document.body.firstChild);

  cols = floor(width / SCALE);
  rows = floor(height / SCALE);

  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(new Particle());
  }

  background(10, 10, 15);
}

function draw() {
  if (paused) return;

  // Soft trail effect — semi-transparent overlay each frame
  noStroke();
  fill(10, 10, 15, TRAIL_ALPHA);
  rect(0, 0, width, height);

  // Build the flow field for this frame
  const field = [];
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      const angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      field[x + y * cols] = p5.Vector.fromAngle(angle);
      xoff += NOISE_INC;
    }
    yoff += NOISE_INC;
  }
  zoff += TIME_INC;

  // Update + draw particles
  for (const p of particles) {
    p.follow(field);
    p.update();
    p.edges();
    p.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = PARTICLE_SPEED;
    this.prevPos = this.pos.copy();
    // Each particle gets a hue that drifts a bit over its lifetime
    this.hue = random(180, 280);
  }

  follow(field) {
    const x = floor(this.pos.x / SCALE);
    const y = floor(this.pos.y / SCALE);
    const idx = x + y * cols;
    const force = field[idx];
    if (force) this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(this.hue, 60, 90, 60);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width)  { this.pos.x = 0; this.updatePrev(); }
    if (this.pos.x < 0)      { this.pos.x = width; this.updatePrev(); }
    if (this.pos.y > height) { this.pos.y = 0; this.updatePrev(); }
    if (this.pos.y < 0)      { this.pos.y = height; this.updatePrev(); }
  }
}

// HSB color mode for prettier hues
function setupColorMode() { colorMode(HSB, 360, 100, 100, 100); }

// Apply color mode after setup (p5 weirdness)
const origSetup = setup;
setup = function() { origSetup(); setupColorMode(); };

// ============================================================
// Keyboard shortcuts
// ============================================================
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('flow-field-' + Date.now(), 'png');
  }
  if (key === 'r' || key === 'R') {
    particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) particles.push(new Particle());
    background(10, 10, 15);
  }
  if (key === ' ') {
    paused = !paused;
  }
}
