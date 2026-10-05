# Archived: full case study page (Ormedo)

The full write-up (About, Before w/ scroll parallax, "My thinking process" band that
slides over Before, After gallery, next-case-study strip) was pulled from the live site
while the case study is "coming soon". Nothing here is imported by the app.

To restore: copy `page.full.tsx` -> `src/app/case-studies/[slug]/page.tsx`,
`BeforePoints.tsx` / `Icons.tsx` / `Reveal.tsx` / `data.ts` -> `src/app/case-studies/`,
and `public-images/*.png` -> `public/case-studies/ormedo/`. Also re-add (globals.css)
`html { scroll-behavior: smooth }` inside `prefers-reduced-motion: no-preference`.
