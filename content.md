# Portfolio Update Guide

### How Future Updates Work:

Whenever you make edits to your code or update your info in `data/person.json`:

1. **Update GitHub & GitHub Pages:**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```
   *(GitHub Pages will automatically rebuild and deploy your changes within ~1 minute)*

2. **Update Vercel:**
   ```bash
   npx vercel --prod --yes
   ```
