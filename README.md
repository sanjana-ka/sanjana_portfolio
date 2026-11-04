# Sanjana K.A. — Portfolio

Static site (HTML + CSS + JS). No build step.

## Add your Figma images
Export each frame from Figma (select frame -> Export -> PNG, 2x) and save into `assets/` with these exact names:

red-fibre-site, pteck-analysis, pteck-nodes, pteck-report, pteck-upload,
pipetech-hero, pipetech-product, pipetech-vision, pipetech-suite,
mbq-hero, mbq-plans, mbq-founder, mbq-quiz,
rg-hero, rg-steps, rashtra-impact,
sh-hero, sh-entry, sh-list, sh-map, sh-style

(.png or .jpg). Missing files show a labelled placeholder, so the site never breaks.
Also: each project page shows its first image as a cover and all of them in a gallery (click to enlarge). Optional: add `assets/resume.pdf` for the Résumé link.

## Deploy
Vercel -> Add New Project -> upload this folder (or `vercel` CLI). Framework preset: Other. Output dir: root.

Extra image names used on the Red Fibre page: red-fibre-2, red-fibre-3, red-fibre-brand.
Pages: index.html (home) and project.html?p=<slug> (case studies). Content lives in data.js.

## Image status
Included: Red Fibre, PTeck P&ID PRO, Pipetech, Rashtragranth (+ style guide), My Body Qode, and your photo (assets/sanjana.jpg).
Still placeholders: Sheltering (sh-hero, sh-entry, sh-list, sh-map, sh-style).
