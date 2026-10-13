# Angelo Salivio — Portfolio

A data-driven portfolio with a modern dark theme, glassmorphism cards, smooth animations, and a fully responsive layout.

Change every detail by editing just **one file**: `data/person.json`.

## Features

- **Modern design**: Dark theme with gradient accents, glassmorphism cards, and subtle animations
- **Fully responsive**: Works on mobile and desktop
- **Data-driven**: All content loaded from a single JSON file
- **Smooth interactions**: Staggered animations, hover effects

## How to Customize

Edit `data/person.json` to update:

- `brand` — logo text, page title, meta description
- `hero` — subtitle, name, description, photo path, CTA links, social links
- `contact` — focus area, email, location
- `navLinks` — navigation links
- `expertise` — skill/expertise cards (title, description, icon path)
- `education` — education entries (degree, institution, dates, GPA)
- `works` — project cards (title, description, tech tags, image path)
- `about` — intro, quote, skills (list of tags), tools list
- `footer` — blurb, social links, nav links, copyright

Place any images you reference in `assets/person/`.

## Run Locally

Open `index.html` in your browser. Data is loaded via `fetch()`, so use a local server if needed:

```bash
npx serve .
# or
python -m http.server 8000
```
