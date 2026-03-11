# Cosmic Portfolio

## Current State
Blank Caffeine project with React + Three.js + React Three Fiber + Drei already installed. No App.tsx or frontend scenes exist yet.

## Requested Changes (Diff)

### Add
- GSAP animation library for cinematic camera transitions
- 7 sequential 3D scenes rendered inside a React Three Fiber Canvas
- Scene 1: Black Hole Opening — rotating black hole, glowing accretion disk, gravitational lensing GLSL shader, orbiting stars, fade-in text, "Cross the Event Horizon" CTA button
- Scene 2: Wormhole Transition — procedural tunnel with light streaks and space-bending GLSL distortion shader, flashing role labels
- Scene 3: Galaxy of Skills — star clusters (Frontend, Backend, AI/Data, Tools), orbiting stars, hover panels with technology labels
- Scene 4: Planetary Projects System — planets orbiting a central star, click-to-zoom camera, holographic overlay with project details (title, description, tech, GitHub, demo links)
- Scene 5: Timeline Orbit — ring system around a massive star, nodes per ring for education/work/achievements, scroll-driven camera rotation
- Scene 6: Tesseract Archive — multidimensional floating geometric frames, resume section with download button, contact holographic panel
- Scene 7: Contact Portal — holographic contact form (Name, Email, Message, Transmit Signal button), orbiting social link satellites (GitHub, LinkedIn, Twitter)
- Global: procedural starfield background, GSAP camera transitions, custom GLSL shaders, ambient space atmosphere
- All personal data as clearly-labeled placeholder content

### Modify
- index.css: space-black background, custom CSS variables for the color palette
- App.tsx: replace default content with full portfolio canvas experience

### Remove
- Default template placeholder content

## Implementation Plan
1. Install gsap via package.json dependency
2. Set up index.css with space color palette CSS variables
3. Create App.tsx as root with full-screen Canvas + scene state manager
4. Create scene components:
   - `scenes/BlackHoleScene.tsx` — black hole mesh + accretion disk shader + starfield + hero text overlay
   - `scenes/WormholeScene.tsx` — tunnel geometry + wormhole distortion shader + role flash text
   - `scenes/GalaxyScene.tsx` — instanced star clusters, hover panels, orbital animation
   - `scenes/PlanetsScene.tsx` — planet meshes + orbits + click zoom + holographic project overlay
   - `scenes/TimelineScene.tsx` — ring system + timeline nodes + scroll-driven camera
   - `scenes/TesseractScene.tsx` — geometric frame lattice + resume panel + download button
   - `scenes/ContactScene.tsx` — holographic form + orbiting social satellite spheres
5. Create shared components:
   - `components/Starfield.tsx` — procedural starfield Points mesh used across all scenes
   - `components/SceneManager.tsx` — GSAP camera tween logic between scenes
   - `components/HolographicPanel.tsx` — reusable glassmorphism-style 3D-positioned HTML panel
6. Placeholder data file: `data/portfolio.ts` — name, skills, projects, timeline, social links clearly annotated
7. Validate and build
