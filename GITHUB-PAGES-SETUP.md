# Publish your portfolio on GitHub Pages

This package adds a ready-to-publish `docs` folder and editable source in `github-pages` to your existing repository. No Cloudflare account or extra installation is needed to publish these files.

1. Extract this ZIP.
2. Copy `docs`, `github-pages`, and this guide into your existing `tejaswini-portfolio` folder (the folder containing package.json).
3. In your existing project terminal, run:

```bash
git add docs github-pages GITHUB-PAGES-SETUP.md
git commit -m "Add GitHub Pages portfolio"
git push
```

4. Open https://github.com/tejaswini14345/TejaswiniBetina-Portfolio/settings/pages
5. Under Build and deployment, choose Deploy from a branch. Select main and /docs, then Save.
6. Wait for the Pages deployment to finish. Use the Visit site link on that screen. Expected URL: https://tejaswini14345.github.io/TejaswiniBetina-Portfolio/

The existing backend project is still available in the root. This Pages version is a separate static build with the same portfolio content and interactions. The Like button saves the visitor's choice in localStorage in their browser; there is no global count or visitor tracking. Clearing browser storage clears that choice.

## Change the Pages website later

Edit `github-pages/src/app/page.tsx` for content and `github-pages/src/app/globals.css` for styling. From the repository root:

```bash
cd github-pages
npm install
npm run build
cd ..
git add docs github-pages
git commit -m "Update portfolio"
git push
```

Building updates `docs`. GitHub Pages publishes those updated files. Root project changes alone do not change the Pages version. Node.js 24 is suitable for this source project.
