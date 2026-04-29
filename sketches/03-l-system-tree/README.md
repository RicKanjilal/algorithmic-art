# 03 — L-System Tree

> A string of letters, rewritten by recursive rules, then drawn with turtle graphics. The same maths describes how real plants grow.

## Run it

[**Live demo →**](https://rickanjilal.github.io/algorithmic-art/sketches/03-l-system-tree/)

**Keys:** `SPACE` cycle through species · `S` save

---

## What's an L-system?

An **L-system** (Lindenmayer system) is a way of growing complex structures from very simple rewriting rules. It was invented in 1968 by a Hungarian biologist named Aristid Lindenmayer to model how plants and bacteria grow. The idea turned out to be perfect for procedural art too.

You start with two things:

1. **An axiom** — a single starting string. Often just `F` or `X`.
2. **A set of rules** — each rule says *"every time you see this letter, replace it with this longer string."*

You apply the rules to the string. Then again. Then again. The string explodes in complexity.

### Example

Axiom: `F`
Rule: `F → FF+[+F-F-F]-[-F+F+F]`

After 0 iterations: `F`
After 1 iteration: `FF+[+F-F-F]-[-F+F+F]`
After 2 iterations: `FF+[+F-F-F]-[-F+F+F]FF+[+F-F-F]-[-F+F+F]+[+FF+[+F-F-F]-[-F+F+F]-FF+[+F-F-F]-[-F+F+F]-FF+[+F-F-F]-[-F+F+F]]-[-FF+[+F-F-F]-[-F+F+F]+FF+[+F-F-F]-[-F+F+F]+FF+[+F-F-F]-[-F+F+F]]`

After 4–5 iterations the string is thousands of characters long.

## How does a string become a tree?

This is where **turtle graphics** comes in. Imagine a turtle holding a pen, walking across the canvas. Each letter in our string is a command:

| Letter | Command |
|--------|---------|
| `F` | move forward, drawing a line |
| `+` | turn right by `angle` |
| `-` | turn left by `angle` |
| `[` | **push** — remember current position and direction |
| `]` | **pop** — return to remembered position and direction |
| (anything else) | do nothing — these letters exist only to drive rule rewriting |

The push/pop pair is what creates **branches**. When the turtle hits `[`, it saves where it is. It draws a branch, then `]` teleports it back to where the branch started, ready to draw another branch in a different direction.

That's it. Strings → tree drawings.

## Why it looks like a real plant

The reason this works as botanical modeling is that real plants grow by *recursive cellular division* with constraints — and that's exactly what L-systems simulate. A bud splits into branches, each branch develops the same way the trunk did, and the constraints (angle, branch length scaling) determine the species.

Tweak the angle from 22° to 30° and you go from a willow to an oak. Tweak the rule and you get a fern, a grass, or something not from this Earth.

## The rulesets in this sketch

Press `SPACE` to cycle through three different "species":

```js
// Plant 1 — the classic asymmetric L-system plant
{ axiom: 'X', rules: { 'X': 'F+[[X]-X]-F[-FX]+X', 'F': 'FF' }, angle: 22.5° }

// Symmetric tree — perfectly mirrored, more architectural
{ axiom: 'F', rules: { 'F': 'FF+[+F-F-F]-[-F+F+F]' }, angle: 22.5° }

// Dragon-ish — much more chaotic, less plant-like
{ axiom: 'F', rules: { 'F': 'F[+F]F[-F]F' }, angle: 25.7° }
```

## Try writing your own ruleset

Open `sketch.js`, find `RULESETS`, add a new entry:

```js
{
  name: 'My weird plant',
  axiom: 'F',
  rules: { 'F': 'F[+FF][-FF]F[-F]+F' },
  angle: 27,
  iterations: 4,
  initialLen: 8
}
```

The fun is finding rulesets that produce something nobody has seen before. The space of possible L-systems is effectively infinite.

## Where this idea comes from

Lindenmayer's original 1968 paper modeled the growth of algae. Mathematicians Przemyslaw Prusinkiewicz and Aristid Lindenmayer's 1990 book *The Algorithmic Beauty of Plants* is the canonical reference — it's free online and absolutely worth flipping through if any of this caught your eye.
