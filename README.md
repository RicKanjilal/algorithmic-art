<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=200&section=header&text=algorithmic%20art&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38" />

<h3>code that makes pictures · math that becomes mood</h3>

<p>
  <a href="https://rickanjilal.github.io/algorithmic-art/"><img src="https://img.shields.io/badge/▶_LIVE_GALLERY-000?style=for-the-badge&labelColor=000" /></a>
  <img src="https://img.shields.io/badge/sketches-5-6ee7b7?style=for-the-badge&labelColor=000" />
  <img src="https://img.shields.io/badge/license-MIT-93c5fd?style=for-the-badge&labelColor=000" />
</p>

</div>

<br>

<table>
<tr>
<td width="50%" valign="top">

### what this is

Five generative-art sketches. Four in p5.js running in the browser, one in Python doing nasty things to real photos.

Each one is a single algorithm. Each one explains itself in its README. None of them are longer than 150 lines.

You can run any sketch in your browser by clicking it on [the gallery page](https://rickanjilal.github.io/algorithmic-art/). Press <kbd>S</kbd> to save the current frame as a PNG. The good ones go in `gallery/`.

</td>
<td width="50%" valign="top">

### why i made it

I got tired of writing code that just *works*. I wanted to write code that produces something a human looks at and goes *"wait, what."*

Generative art does that. You sit down, write 80 lines of vector math, and an hour later you've got something on your screen that nobody on Earth has ever seen before. Then you change one number and it's a new thing again.

Also recruiters and admissions officers spend ~6 seconds on a GitHub profile. A repo full of moving things buys you another 30.

</td>
</tr>
</table>

---

## the five sketches

<table>
<tr>
<td width="20%" align="center"><h3>01</h3><b>flow field</b><br><sub>organic · p5.js</sub></td>
<td width="80%">

2,000 particles drifting through invisible currents. The currents are made of Perlin noise. Perlin noise is what randomness looks like after it grows up.

The whole sketch is a 2D grid of arrows. Each particle reads the arrow it's standing on and moves that way. The arrows shift slowly over time. Nothing is ever still.

→ <a href="https://rickanjilal.github.io/algorithmic-art/sketches/01-flow-field/">run it</a> · <a href="sketches/01-flow-field/">read how it works</a>

</td>
</tr>
<tr>
<td align="center"><h3>02</h3><b>circle packing</b><br><sub>geometric · p5.js</sub></td>
<td>

Greedy algorithm: drop a tiny circle somewhere empty, let it grow until it touches another circle, freeze it. Repeat 5,000 times.

The result is a tightly-packed mosaic where huge circles hog the open spaces and tiny circles squeeze into the slivers. Nature does this constantly. Cities, sand grains, leaves on a tree. Power-law distribution of sizes from one stupid greedy rule.

→ <a href="https://rickanjilal.github.io/algorithmic-art/sketches/02-circle-packing/">run it</a> · <a href="sketches/02-circle-packing/">read how it works</a>

</td>
</tr>
<tr>
<td align="center"><h3>03</h3><b>l-system tree</b><br><sub>organic · p5.js</sub></td>
<td>

You start with the letter <code>F</code>. You apply a rule like <code>F → FF+[+F-F-F]-[-F+F+F]</code>. Then you apply it to the result. Then again. After five rounds your string is 5,000 characters of garbage.

Then you walk that string with a turtle. F is "draw forward". Plus is "turn right". Brackets save and restore position. Now you have a tree. Real biologists use this to model how plants actually grow.

Three different rulesets. Press <kbd>SPACE</kbd> to cycle.

→ <a href="https://rickanjilal.github.io/algorithmic-art/sketches/03-l-system-tree/">run it</a> · <a href="sketches/03-l-system-tree/">read how it works</a>

</td>
</tr>
<tr>
<td align="center"><h3>04</h3><b>recursive subdivision</b><br><sub>geometric · p5.js</sub></td>
<td>

Take a rectangle. Maybe split it. Maybe fill it. If you split it, recurse on the halves. The probability of splitting drops with depth.

Result: Mondrian. The 30 lines of code that produced this look has been making 21st-century designers a lot of money.

→ <a href="https://rickanjilal.github.io/algorithmic-art/sketches/04-recursive-subdivision/">run it</a> · <a href="sketches/04-recursive-subdivision/">read how it works</a>

</td>
</tr>
<tr>
<td align="center"><h3>05</h3><b>pixel sort</b><br><sub>glitch · python</sub></td>
<td>

Take a real photo. Pick a brightness threshold. Inside every horizontal row, find the runs of pixels that pass the threshold and sort them.

What you get is the photo, but melted along its midtones. Faces stay recognizable. Skies become impossible gradients. It looks broken on purpose.

→ <a href="sketches/05-pixel-sort/">read how it works</a> (python · run locally)

</td>
</tr>
</table>

---

## running the p5 sketches locally

```bash
git clone https://github.com/RicKanjilal/algorithmic-art.git
cd algorithmic-art
python -m http.server 8000
# open http://localhost:8000 in your browser
```

The `python -m http.server` is just to serve the files. Browsers won't load p5.js from a `file://` URL, so you need any local server running. Python's built-in one works fine.

## running the python sketch

```bash
cd sketches/05-pixel-sort
pip install -r requirements.txt
python pixel_sort.py path/to/your/photo.jpg
```

Output goes to `<photo-name>_sorted.png` next to the original.

---

## stuff i learned building this

<table>
<tr>
<td width="50%" valign="top">

**randomness is boring. noise is beautiful.**

A `random()` call gives you static. A `noise()` call gives you something that looks alive. The difference between the two is the difference between a TV with no signal and a slow river. I had no idea this was true before I built sketch 01.

</td>
<td width="50%" valign="top">

**generative art is debugging in public.**

Most failed runs don't look broken. They look weird. Telling the difference between *"this is wrong"* and *"this is unexpectedly cool"* is most of the skill.

</td>
</tr>
<tr>
<td valign="top">

**constraints make the art.**

Every sketch in here has fewer than five tunable numbers. The good outputs come from picking those numbers carefully. Bigger parameter space, worse results. This is also true for everything else in life and I'm slowly learning that.

</td>
<td valign="top">

**code-as-art makes you a better engineer.**

Writing the L-system forced me to actually understand string rewriting. The flow field made me internalize 2D vectors. Circle packing taught me when collision detection is fast enough and when it isn't. Five sketches taught me more than a semester of CS class.

</td>
</tr>
</table>

---

## what's next

Things in the queue when I get back to this:

- [ ] Reaction-diffusion (Gray-Scott model). Patterns that evolve like coral
- [ ] Voronoi tessellation with animated points
- [ ] Wave Function Collapse for tile-based generation
- [ ] 3D versions in p5's WebGL mode
- [ ] Audio-reactive sketches that respond to mic input
- [ ] Print versions properly sized for A3 / poster output

If you make something based on this repo, please show me. I'm <a href="https://github.com/RicKanjilal">@RicKanjilal</a> on GitHub and I'd genuinely love to see your remixes.

---

<div align="center">

<sub>built by <a href="https://github.com/RicKanjilal"><b>Ric Kanjilal</b></a> · grade 10 · don bosco school, liluah · kolkata</sub>

<sub>MIT licensed · fork it, hack it, post your weird descendants</sub>

</div>
