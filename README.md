# InsectOmics lab website

A fast, single-page lab site with no build step. It runs directly on GitHub Pages.

## Publish on GitHub Pages

1. Create a repository. For a site at `https://<your-org>.github.io`, name it `<your-org>.github.io`; any other name gives `https://<your-org>.github.io/<repo>/`.
2. Upload everything in this folder (including the hidden `.nojekyll` file) to the repository root.
3. Go to **Settings > Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, and save.
4. Your site is live within a minute or two.

To use your own domain (for example `insectomics.org`), add it under **Settings > Pages > Custom domain**.

## Edit the content

All text lives in **`assets/data.js`**. You never need to touch the HTML to update the site.

| To change | Edit in `data.js` |
|---|---|
| Lab name, intro, contact, social links, headline numbers | `lab` |
| Research interests (each has an A/C/G/T color) | `themes` |
| Projects (linked to a theme by `theme: "id"`) | `projects` |
| PI, members, alumni | `team` |
| Names to bold in author lists | `labAuthors` |
| Papers (add `doi`, `pdf`, `code` to show buttons) | `publications` |
| Software and databases | `tools` |
| Protocols (materials, steps, download link) | `protocols` |

**Photos:** put images in `assets/img/` (square, about 400 x 400 px) and set `photo: "assets/img/name.jpg"`. Without a photo, a colored hexagon with initials is shown.

**Protocol files:** put PDFs in a `protocols/` folder and set `file: "protocols/hmw-dna.pdf"`.

## Features

- Interactive compound-eye hero: each facet is a nucleotide that reveals its letter under the cursor or finger
- Light and dark mode (follows the system, with a manual toggle)
- Project filter by research theme
- Live publication search with highlighting, grouped by year, type filter
- Expandable protocols with numbered steps
- Responsive, keyboard accessible, respects reduced-motion settings

## Files

```
index.html        Page structure
assets/style.css  Design (colors are CSS variables at the top)
assets/data.js    All content
assets/main.js    Rendering and interactions
.nojekyll         Tells GitHub Pages to serve files as-is
```
