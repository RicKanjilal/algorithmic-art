// ============================================================
// Sketch 03 — L-System Tree
// ============================================================
// An L-system (Lindenmayer system) is a way of growing complex
// structures from simple rewriting rules. You start with an axiom
// (a single letter) and a set of rules that say "every time you
// see this letter, replace it with this string". Apply the rules
// over and over and the string explodes in complexity.
//
// Then you draw it. Each letter becomes a turtle-graphics command:
//   F = move forward and draw
//   + = turn right
//   - = turn left
//   [ = save current position
//   ] = restore saved position (so we can backtrack and branch)
//
// The result: trees that look organic but were generated from a
// 2-line rewriting rule.
// ============================================================

let axiom = 'F';
let rules = {};
let sentence = axiom;
const ITERATIONS = 5;
let len = 8;
let angle;

// A few different rulesets, each producing a different "species"
const RULESETS = [
  {
    name: 'Plant 1',
    axiom: 'X',
    rules: { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' },
    angle: 22.5,
    iterations: 5,
    initialLen: 4
  },
  {
    name: 'Symmetric tree',
    axiom: 'F',
    rules: { 'F': 'FF+[+F-F-F]-[-F+F+F]' },
    angle: 22.5,
    iterations: 4,
    initialLen: 8
  },
  {
    name: 'Dragon-ish',
    axiom: 'F',
    rules: { 'F': 'F[+F]F[-F]F' },
    angle: 25.7,
    iterations: 4,
    initialLen: 6
  }
];

let currentRuleset = 0;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent(document.body);
  document.body.insertBefore(canvas.elt, document.body.firstChild);
  generate();
}

function generate() {
  const rs = RULESETS[currentRuleset];
  axiom = rs.axiom;
  rules = rs.rules;
  angle = radians(rs.angle);
  len = rs.initialLen;
  sentence = axiom;

  // Apply the rules `iterations` times
  for (let i = 0; i < rs.iterations; i++) {
    let next = '';
    for (const ch of sentence) {
      next += rules[ch] !== undefined ? rules[ch] : ch;
    }
    sentence = next;
    len *= 0.5;
  }

  drawTree();
}

function drawTree() {
  background(245, 240, 235);
  stroke(40, 50, 35, 180);
  strokeWeight(1);

  push();
  translate(width / 2, height);  // start at bottom center
  rotate(-PI);                   // pointing up

  for (const ch of sentence) {
    if (ch === 'F') {
      line(0, 0, 0, len);
      translate(0, len);
    } else if (ch === '+') {
      rotate(angle);
    } else if (ch === '-') {
      rotate(-angle);
    } else if (ch === '[') {
      push();
    } else if (ch === ']') {
      pop();
    }
    // Other letters (X, etc.) are no-ops during drawing — they exist
    // only as variables in the rewriting rules.
  }

  pop();
}

function keyPressed() {
  if (key === ' ') {
    currentRuleset = (currentRuleset + 1) % RULESETS.length;
    generate();
  }
  if (key === 's' || key === 'S') {
    saveCanvas('l-system-' + Date.now(), 'png');
  }
}
