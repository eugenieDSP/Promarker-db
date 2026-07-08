# My Promarker studio (personal PWA)

A personal, offline companion for your Winsor & Newton Promarker collection — pre-loaded with your 115 colours. Catalogue markers, measure real swatch colours from photos (1, 2 and 3 ink layers), view a Munsell-style hue–chroma wheel, and find harmonies across the whole range with your owned colours highlighted.

Data lives only in this browser on this device. No account, no server, no analytics. Back up or move devices via Export/Import in the About tab.

## Files
- `index.html` — the whole app, pre-seeded with your collection
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — installability + offline

## Publish it (pick one)
**Netlify Drop (easiest):** go to https://app.netlify.com/drop and drag this folder onto the page. You get an HTTPS URL instantly; a free account keeps it up.
**GitHub Pages:** new public repo → upload these files → Settings → Pages → deploy from `main` / root.

## Install on your phone
Open the URL, then:
- Android (Chrome/Firefox): menu → "Add to Home screen" / "Install app"
- iPhone (Safari): share → "Add to Home Screen"
Works fully offline after the first visit.

## First launch
The app seeds your 115 colours once, then leaves your data alone forever after. Anything you add, measure, or remove sticks. "Erase everything" empties it for good (no surprise re-seed).

## Updating later
Edit `index.html`, bump the cache name in `sw.js` (e.g. `-personal-v2`), redeploy. The cache bump makes your installed copy pick up the new version.

Not affiliated with or endorsed by Winsor & Newton.
