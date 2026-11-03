# Portfolio

A dark, bento-style portfolio built with Next.js (3-column grid, dotted globe, floating filter). All content lives in one file: `data/site.js`.

## Run locally

```bash
npm install
npm run dev
```

## Update your content

Open `data/site.js` and edit:

- `site` — name, role, tagline, email, socials, tools, to-dos, principles
- `projects` — add, remove or reorder projects. Each one gets its own page at `/work/<slug>`
- Set `cvUrl: "/your-cv.pdf"` after dropping the PDF into the `public/` folder

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to vercel.com/new and import the repository.
3. Keep the defaults (Framework: Next.js) and click Deploy.

Or with the CLI: `npx vercel` from this folder.

## Add a new project / upload your designs

1. Export your design from Figma (PNG, JPG or WebP, about 1600px wide, under ~500 KB each).
2. Put the files in `public/projects/` (e.g. `pos-cover.png`, `pos-1.png`, `pos-2.png`).
3. Open `data/site.js`, copy an existing project object, and set:
   - a unique `slug` (becomes the page URL `/work/<slug>`)
   - `title`, `kind`, `summary`, `year`, `role`, `tools`
   - `category`: `"products"` or `"design"` (used by the filter pill)
   - `variant`: `"card"`, `"feature"` or `"art"`, and `column`: `"left"`, `"mid"` or `"right"`
   - `image: "/projects/pos-cover.png"` (tile + case-study cover)
   - `gallery: ["/projects/pos-1.png", "/projects/pos-2.png"]` (images on the case-study page)
   - `sections`: your case-study text
4. Commit and push — Vercel redeploys automatically.

No code editor? On GitHub you can use **Add file → Upload files** for the images and the pencil icon to edit `data/site.js`.

The cursor effect (fluid smoke glow + follower ring) lives in `components/CursorTrail.jsx` (remove `<CursorTrail />` in `app/layout.jsx` to turn it off).
