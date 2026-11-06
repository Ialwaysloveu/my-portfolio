# Angelo Salivio — Portfolio

A data-driven personal portfolio built with plain HTML, CSS, and JavaScript. All content is edited in a single file: `data/person.json`.

Live: https://ialwaysloveu.github.io/my-portfolio and https://my-portfolio-jade-omega-84.vercel.app

## Features
- Dark/light theme toggle (saved in localStorage)
- Floating bottom nav dock
- Hero with profile photo and animated gradient ring
- Tilt-on-hover cards, certificate viewer pop-up, Resume viewer
- Responsive layout (phone, tablet, desktop)
- Projects, skills, education, certificates, about, contact

## Tech
HTML5, CSS3, vanilla JavaScript, Three.js (removed), data/person.json. Deployed to GitHub Pages and Vercel.

## File structure
- index.html — markup
- styles.css — styles
- script.js — rendering + theme toggle
- tilt.js — card tilt effect
- certificates.js — certificate/resume viewer
- data/person.json — all content
- assets/ — images, certificates, resume

## Run locally
Serve the folder with a static server (e.g. VS Code Live Server) and open index.html. Do not open via file:// (fetch needs a server).

## Rubric checklist
- HTML Structure: semantic landmarks in index.html
- CSS Styling: variables in styles.css :root
- Layout/Responsive: media queries in styles.css
- Content: sections in index.html
- Code Quality: organized files above
- Functionality: links/buttons tested manually
- Deployment: live URLs above, public repo
- Defense: see docs/TESTING.md