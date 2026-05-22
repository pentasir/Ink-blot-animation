# Ink Blot Animation
![gif of the ink blot](https://github.com/pentasir/Ink-blot-animation/blob/46bd0fae92c3f77077cfba4fb3b2cb7ba8ef5f0b/banner.gif)

[![Cursor](https://img.shields.io/badge/Cursor-Agent-161618?style=flat&logo=cursor&logoColor=white)](https://cursor.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![Ghostty](https://img.shields.io/badge/Ghostty-Terminal-4B5873?style=flat)](https://ghostty.org/)
[![Claude](https://img.shields.io/badge/Claude-macOS_terminal-D4A574?style=flat&logo=anthropic&logoColor=white&labelColor=141413)](https://www.anthropic.com/claude)
[![Three.js](https://img.shields.io/badge/Three.js-000?style=flat&logo=threedotjs&logoColor=white)](https://threejs.org/)

---

## The Vision

For my portfolio website I wanted something that feels like peering into a psychological mirror — an animation that’s alien-esque and ambiguous enough to invite interpretation, like the cultural idea of the Rorschach test (symmetrical “ink blots”), without claiming to recreate the standardised clinical plates.

---


## The Journey: From ferrofluid / liquid‑mercury fantasies → fragment shaders

### Phase 1: Ferrofluid in CSS

**Goal:** Emulate liquid mercury/ferrofluid motion

I started with **CSS blob animations** because:
- Faster load times
- Lower memory overhead (preserves bandwidth for other assets)
- I was thinking design-first, code-second (80% designer, 20% technical)

I spent days tweaking CSS blur, animations, and distortion effects but none of those iterations landed the specific silhouette language I wanted.

![screenshot of the CSS blot](https://github.com/pentasir/Ink-blot-animation/blob/f0f4e216d09441d5d4c10862205830b901d4c457/cssblur.png)

### Phase 2: The Rorschach Insight
While researching, I leaned on the **Rorschach ink blot test** (from popular culture (psychology documentaries, film, mythology around “ambiguous images psychology"):

- Ambiguous bilateral shapes invite projection
- Used to assess psychological traits/ interpretation differs by viewer

*Idea:* What if I merged my blob animation with the Rorschach concept? 
Viewers could explore an animation that felt like looking into their own 
subconscious, every shape suggesting something different.

Side note - The clinical Rorschach test uses 10 ink blots while mine are 6 ink blots for visual purposes

### Phase 3: CSS Hits Its Limits
**Problem:** CSS couldn’t give me sculpted, morph‑friendly silhouettes at the fidelity I wanted. Heavy blur/readability tradeoffs tended to muddy the blot “bones.”


**Decision:** Move the core look to **WebGL** so I could manipulate a **noise field mathematically**:
- Cleaner control over masking & edges  
- Smoother time‑based modulation  
- Direct iteration via fragment shader uniforms  

### Phase 4: The Creative Breakthrough
**Still stuck emotionally on “liquid metal” → “printed ink blot”**

**Inspiration:** CRT TV static—that beautiful white noise when there's no signal (or in this case - layered noise).
_Organic texture comes from layered (octave‑stacked) 3D gradient noise in the fragment shader. Then masking and thresholding turn that field into ink vs paper._

![Gif of noise](https://github.com/pentasir/Ink-blot-animation/blob/81deb052bc1fd034b6edf811e4e97985dd3a1c01/noise.gif)

**The Solution:**
Instead of morphing pre‑authored DIV blobs, generate **smooth random fields** (layered gradient noise — “noise that feels like texture”) then **posterize / threshold** into ink versus paper:

- Blur → softness  
- Contrast → edge crispness once combined with thresholds  
- Contour softness → avoids harsh jaggy thresholds  
- Gap / ellipse coverage → rhythmic negative space (“paper showing through”)  
- Speed → overall morph tempo  

This produced **organic, ambiguous shapes** **without timestepped physics simulations** (no particles colliding in a solver, no navier‑stokes, etc.). Rendering runs on the **GPU**.
Different devices mainly differ by **resolution / supersampling budgets / frame pacing / how CSS blur stacks** plus normal GPU/driver variance.
Also: silhouette *families* are **designed presets** (`15` ellipse parameters interpolated across `6` states) — I’m **not claiming “zero authorship.”** What’s generative is the **changing noise texture** fused with those constraints.


### Phase 5: Engineering for the Web
**Challenge:** Real fluid dynamics on every pageload ≠ practical for marketing/portfolio sites.

**My Solution:** "Control Randomness"
- Six original bilateral presets sculpted to feel like distinct ink moods  
- They crossfade cleanly over time rather than jittering stochastic chaos  
- Time‑indexed noise modulation keeps subtle motion hypnotic instead of jittery flicker  
- Elliptical masking defines **shape envelopes** symmetrically mirrored  
- Optional CSS blur + contrast exaggerates photographic “wet ink bleed” economically 

![Gif of ink blot](https://github.com/pentasir/Ink-blot-animation/blob/e021db5ee5f81986547b69c11ae6da9f4cad9164/inkblotgif.gif)


---

## Technical Architecture

### Core Stack
- **THREE.js** — thin WebGL scaffolding  
- **OrthographicCamera + fullscreen quad** — classic 2D‑in‑3D cheat  
- **Custom `fragmentShader`** — noise evaluation, masking, tonal shaping  
- **CSS filters** (`blur` / `contrast`) — perceptual sharpening pass on wrapper (cheap vs simulating microscopic ink absorption)


### Shader responsibilities
1. **Symmetric noise field** mirrored about vertical midline (`abs` trick on X)  
2. **Ellipse envelope morph** — interpolated uniform arrays easing between adjacent presets  
3. **Ink vs paper shaping** via threshold‑relative smooth transitions  
4. **`requestAnimationFrame` loop** pushes `uTime` + morph easing variables  
Slider UI live‑edits uniforms & CSS knobs for exploratory tuning ([demo](https://inkblot-eight.vercel.app)).

![screenshot of sliders](https://github.com/pentasir/Ink-blot-animation/blob/687d2b59022c8d334fcb85be9d1946c030e81fe4/sliders.png)

You can use these values to edit animation configuration on the live code. 

### Approach tradeoffs
| Approach | Resource vibe | Artistic control |
|-----------|---------------|------------------|
| Real fluid solver | Heavy | Gorgeous but brittle for brochure sites |
| Pure CSS blobs | Cheap | Morph language hits a ceiling quickly |
| Procedural shader noise + sculpted masks | Light | Highest creative leverage per watt |

---

## Design principles
| Principle | Reason it matters |
|-----------|-------------------|
| **Symmetry = instant readability** | One mirror line → cultural “that’s an ink blot” shorthand |
| **Bounded variety** | Six anchors → rhythm & intentionality vs pure stochastic noise seizure |
| **Composite signal** | Generative turbulence + deterministic envelope = hypnotic ambiguity |
| **Performance as constraint** | If the animation can’t load fast nobody sees the artistry & it will also annoy me |


---


### Why 6 Shapes?
- Enough rotation to resist monotony  
- Keeps authoring & QA tractable  
- Each preset can evoke a different perceptual leaning  
- I was too lazy to add the whole 10 ink blots and my sessions kept timing out

---

## Learnings / philosophy

Design intuition unlocked the **noise scaffold** (“static you sculpt”) faster than brute-forcing mesh-morph fantasies inside CSS constraints.
Synthetic ink also taught me that ambiguity is directional: you steer it with masking not hope.
Controlled variation **feels** random to casual viewers yet stays debuggable internally.
Collaborating with Claude + Cursor was accelerant for shader iteration throughput. Aesthetic decisions & veto power on outputs stayed mine.
Future thought experiment: longevity of ephemeral web art. Unknown; worth building anyway because process compounds for future work.

---

## The "Vibe Code" Angle

I worked with Claude & Cursor to:
- Prototype WebGL noise generation algorithms
- Debug the fragment shader logic
- Optimise performance bottlenecks
- Iterate on parameters and clarity

**Key difference:** I brought the vision.
AI helped solve the technical "how." The collaboration was iterative.
I'd reject approaches that didn't match my aesthetic and vision, AI would adjust.

This shows how AI can accelerate development while maintaining 
creative control.

personal/ side note - I think in the current age of technology it is best to add AI to your tech stack without avoiding it, especially if you are a creative person. Some visions are difficult to bring to life and this is where AI steps in. Although, you can argue that the painstaking process of creating art is what makes it valuable at the end. I am not technical in the sense of writing mathematical animations through code but I play with man made horrors beyond my wildest imagination. Will any of this survive a thousand years? I don't know.

---

## Setup & Running Locally
One HTML artifact + remote Three.js CDN (`cdn.jsdelivr.net`). Use a WebGL‑capable modern browser (+ network access for CDN pull).
### Method A: Quick open (`file:`)
Download `index.html` → double click (or drag into browser). Often fine; CDN still loads over HTTPS while page is local.
### Method B: Local static server (**recommended if anything blocks**)
Serving from `localhost` avoids some edge `file:` restrictions.

```bash
python3 -m http.server 8080
```
Then open:

```bash
http://localhost:8080/index.html
```

(To stop the server: ```Ctrl+C``` in the terminal.)

Windows fallback:

```bash
py -m http.server 8080
```

Node helper

```bash
npx --yes serve -p 8080
```
Follow CLI URL → pick ```index.html```.

VS Code Live Server
Install → right‑click ```index.html``` → Open with Live Server.

## Project layout

- **`index.html`** (or **`inkblot.html`**) — open in a browser  
- **`inkblot.css`** — layout, blob frame, control panel styles  
- **`inkblot.js`** — Three.js scene, GLSL shader strings, sliders  

All three files live in the repo root and must stay **in the same folder** (same relative paths).

---

## One file vs split

| Version | When to use |
|--------|--------------|
| **Split** (`html` + `css` + `js`) | Easier to edit; GitHub shows **HTML / CSS / JavaScript** in the language bar |
| **Single-file** (optional) | Drop one `*.html` somewhere and share; simplest “copy one file” |

*Individual source files are included in this repository; a single-file bundle is optional and not required to run the split version.*

---

Portfolio embed: [PENTASIR](https://pentasir.com)

Interactive sliders build: [sandbox](https://inkblot-eight.vercel.app)

Professional enquiries/ remote jobs are welcome - [LinkedIn](https://www.linkedin.com/in/jason-don-b01390189/)


---

## “Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.” ― Frank Herbert, Dune
