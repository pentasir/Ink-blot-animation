# Ink Blot Animation
![screenshot of the ink blot](https://github.com/pentasir/Ink-blot-animation/blob/e021db5ee5f81986547b69c11ae6da9f4cad9164/inkblot.png)

[![Cursor](https://img.shields.io/badge/Cursor-Agent-161618?style=flat&logo=cursor&logoColor=white)](https://cursor.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![Ghostty](https://img.shields.io/badge/Ghostty-Terminal-4B5873?style=flat)](https://ghostty.org/)
[![Claude](https://img.shields.io/badge/Claude-macOS_terminal-D4A574?style=flat&logo=anthropic&logoColor=white&labelColor=141413)](https://www.anthropic.com/claude)
[![Three.js](https://img.shields.io/badge/Three.js-000?style=flat&logo=threedotjs&logoColor=white)](https://threejs.org/)

---

## The Vision

For my portfolio website I wanted to create something that feels like peering into a psychological 
mirror an animation that's alien-esque and ambiguous enough to invite interpretation,
like the Rorschach test itself.

---

## The Journey: From Ferrofluid/ liquid mercury particles to Fragment Shaders

### Phase 1: Ferrofluid in CSS
**Goal:** Emulate liquid mercury/ferrofluid physics

I started with **CSS blob animations** because:
- Faster load times
- Lower memory overhead (preserves bandwidth for other assets)
- I think design-first, code-second (20% technical, 80% designer)

I spent days tweaking CSS blur, animations, and distortion effects. But none of this iterations produced what I had in mind.


![screenshot of the CSS blot](https://github.com/pentasir/Ink-blot-animation/blob/e021db5ee5f81986547b69c11ae6da9f4cad9164/cssblur.png)

### Phase 2: The Rorschach Insight
While researching, I discovered the **Rorschach ink blot test** (psychology):
- Ambiguous shapes that reveal different meanings to different people
- Used to assess psychological traits

*Idea:* What if I merged my blob animation with the Rorschach concept? 
Viewers could explore an animation that felt like looking into their own 
subconscious—every shape suggesting something different.

Side note - The clinical Rorschach test uses 10 ink blots while mine are 6 ink blots for artistic viewing.

### Phase 3: CSS Hits Its Limits
**Problem:** CSS couldn't morph blobs into recognizable ink blot shapes without losing quality of the shapes. The blobs would bleed and blur which is not what I was looking for.

**Decision:** Switch to **WebGL** for:
- 3D rendering capabilities
- Smoother, more fluid animations
- Direct control via fragment shaders to test out values

### Phase 4: The Creative Breakthrough
**New Problem:** I still couldn't morph CSS blobs into ink blots effectively.

**Inspiration:** CRT TV static—that beautiful white noise when there's no signal.

**The Solution:**
Instead of trying to morph pre-made CSS shapes, I generated noise patterns 
(like CRT static) and sculpted them with parameters:
- **Blur** (softness)
- **Contrast** (definition)
- **Edge Detection** (boundary emphasis)
- **Gap/Speed** (rhythm) ..etc.

This approach let me create organic, ambiguous shapes without hard coding 
them or relying on resource heavy physics simulations. The animation uses a GPU to render the image which means different devices shows different particle physics.

### Phase 5: Engineering for the Web
**Challenge:** Real fluid simulation = too many resources for a live website.

**My Solution:** "Control Randomness"
- 6 base ink blots pulled from a Rorscharch test and fed into Cursor as a "guideline"
- These shapes morph smoothly into each other
- Animated noise creates variation
- Elliptical masks define "shape families"
- Symmetry guarantees ink blot recognition
- CSS blur/contrast adds visual polish without computation

**Result:** Every refresh looks different, but it's not wastefully random. 
It *feels* organic while staying lightweight.

![Gif of ink blot](https://github.com/pentasir/Ink-blot-animation/blob/e021db5ee5f81986547b69c11ae6da9f4cad9164/inkblotgif.gif)


---

## Technical Architecture

### Core Stack
- **THREE.js** for 3D rendering
- **Orthographic Camera + Quad Geometry** for efficient 2D rendering
- **Custom Fragment Shader** — where the magic happens
- **Parametric Filters** for CSS blur/contrast for polish

### The Fragment Shader (The Heart)
The shader handles:
1. **Symmetric Noise Generation:** Creates organic, fluid-like patterns
2. **Shape Morphing:** Smooth transitions between 6 base shapes
3. **Elliptical Masking:** Constrains shapes into ink-blot-like forms
4. **Animation Loop:** Soft, continuous morphing - alien esque, similar to the alien alphabet shown in the movie "Arrival"

![screenshot of sliders](https://github.com/pentasir/Ink-blot-animation/blob/687d2b59022c8d334fcb85be9d1946c030e81fe4/sliders.png)

You can use these values to edit animation configuration on the live code. 

### Why This Approach?
| Approach | Resource | Result |
|----------|------|--------|
| Real fluid simulation |  High | Physics-accurate but slow |
| CSS blob morphing | Low | Limited expressiveness |
| Noise + hand-authored shapes | Low | Organic, fast, controlled |

---

## The Design Principles

1. **Symmetry = Immediate Recognition**
   - Symmetrical shapes read as ink blots instantly
   - Eliminates ambiguity about whether it "looks" like a test

2. **Deterministic Randomness**
   - 6 base shapes cycling = variety without waste
   - Noise adds organic variation
   - Every refresh different, but not chaotic

3. **Performance = Art**
   - Can't afford real physics? Fake it with perception
   - CSS filters (blur/contrast) achieve visual polish without computation
   - Orthographic rendering is faster than perspective

4. **Hand-Crafted + Generative Blend**
   - 6 shapes hand-designed (intentional)
   - Noise and morphing (organic)
   - Best of both worlds

---

## How It Actually Works

### The Render Loop

### Why 6 Shapes?
- Enough variety to feel random
- Few enough to stay performant
- Allows for intentional design curation
- Each shape is a "psychological anchor"
- I was too lazy to add the whole 10 ink blots and my sessions kept timing out

---

## Learnings

### Design > Pure Technical
Coming from design (not a pure developer) meant I thought visually first. 
This led to the CRT static insight—a designer's solution, not an engineer's.

### Constraints = Creativity
CSS failed → WebGL. WebGL morphing failed → Noise sculpting.
Every limitation forced a more creative solution.

### "Fake It" Is Valid
Real fluid simulation would be beautiful but wasteful. 
Faking it with noise + hand-crafted shapes is faster, lighter, and more intentional.

### Randomness ≠ Chaos
True randomness looks broken -- but also a computer can't generate "true random". Controlled randomness (6 shapes + noise) 
feels organic without being wasteful.

### Symmetry Is Psychology
The instant you add symmetry, viewers *know* it's an ink blot. 
This is a power principle for ambiguous art.

---


### Try the sliders [here](https://ink-blot-animation-q5lx.vercel.app).

---

## The "AI Vibe" Angle

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

I think in the current age of technology, it is best to add AI to your tech stack without completely avoiding it. Especially if you are a creative person. Some visions are difficult to bring to life and this is where AI steps in. Although, you can argue that the difficulty of creating art is what makes it valuable at the end. I am not technical in the sense of writing code but I play with man made horrors beyond my wildest imagination. Will any of this survive a thousand years? I don't know.

---

## Setup & Running Locally

The project is one HTML file plus Three.js loaded from the internet (cdn.jsdelivr.net). Use a recent Chrome, Firefox, Edge, or Safari with hardware acceleration/WebGL enabled.

Method 1: Open the file directly (quickest try)
Download index.html.
Double-click it, or drag it into a browser window.
Works on many setups. If WebGL/CDN scripts are blocked, use Method 2.

Method 2: Tiny local server (recommended)
Serving over ```http://localhost``` avoids some browser restrictions and matches how demos are usually viewed.

Python 3 (macOS/Linux/Windows, if Python is installed)
In the folder that contains index.html:

```python3 -m http.server 8080```
Then open:

```http://localhost:8080/index.html```

(To stop the server: ```Ctrl+C``` in the terminal.)

Windows might use:

```py -m http.server 8080```
```npx``` + ```serve``` (needs Node.js installed)
In the folder with the HTML file:

```npx --yes serve -p 8080```
Then open the URL printed in the terminal (often ```http://localhost:8080```) and choose index.html.

VS Code — Live Server
Install extension Live Server.
Right‑click ```index.html``` → Open with Live Server.

---

This animation is live on my website [PENTASIR](https://pentasir.com). Buy my services pls. Or hire me for a remote job <3 My [LinkedIn](https://www.linkedin.com/in/jason-don-b01390189/)

---

> “Once men turned their thinking over to machines in the hope that this would set them free. But that only permitted other men with machines to enslave them.”
― Frank Herbert, Dune
