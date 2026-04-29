# Adding a new sketch

The repo is structured so that every sketch is its own self-contained folder. This makes it easy to share a single sketch on its own, and easy to add new ones without touching anything else.

## Structure of one sketch

```
sketches/NN-sketch-name/
├── index.html      # The runner — loads p5 and sketch.js
├── sketch.js       # The actual generative code
└── README.md       # What it is, how it works, the math behind it
```

For Python sketches, swap `sketch.js` for `your_script.py` and add a `requirements.txt`.

## Steps

### 1. Pick a number and a name

Number sketches in order of creation. `06-`, `07-`, etc. Use kebab-case for the folder.

### 2. Copy an existing sketch as a template

Easiest is to copy `01-flow-field/` and gut the contents. The HTML wrapper is the same for every p5 sketch — just change the title and description.

### 3. Write the sketch

Keep the file small. The whole appeal of generative art is that meaningful results come from short programs. If your sketch goes over ~150 lines, ask whether it's actually one sketch or two.

### 4. Add keyboard shortcuts

Convention used in this repo:

- `S` — save the current frame
- `R` — reset / regenerate
- `SPACE` — pause, or cycle through variants

### 5. Write the README

Cover three things:

- **What it is** — one paragraph, plain English
- **How it works** — the algorithm, with code snippets where useful
- **What to tweak** — the parameters someone running it would want to play with

Keep the tone curious, not academic. Future-you will appreciate the explanations more than the maths.

### 6. Update the root README

Add a row to the table in the main `README.md` and a card in `index.html` pointing at the new sketch's folder.

### 7. Push

GitHub Pages auto-deploys on push to `main`. The new sketch will be live at `rickanjilal.github.io/algorithmic-art/sketches/NN-sketch-name/` within a minute.
