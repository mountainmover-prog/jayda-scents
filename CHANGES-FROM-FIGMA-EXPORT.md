# Fixes applied to the raw Figma Make export

The export was cleaner than expected — no versioned imports, no `figma:asset`
imports, and Vite/PostCSS/index.html/main.tsx were all present. Four real
problems were fixed:

1. **react / react-dom were listed as optional peerDependencies.**
   `npm install` therefore installed no React and the build failed.
   Both moved into `dependencies` (18.3.1).
2. **No TypeScript config.** Added `tsconfig.json` + `tsconfig.node.json`
   with the `@/*` → `src/*` path alias matching `vite.config.ts`.
3. **No `preview` script, and pnpm-only fields** (`pnpm.overrides`,
   `peerDependenciesMeta`) that confuse npm. Scripts are now
   dev / build / preview; pnpm fields removed.
4. **Package named `@figma/my-make-file`.** Renamed to `jayda-scents`.

Also added `.gitignore` (node_modules, dist, .env) and set the page title
to "Jayda Scents — Luxury Fragrances".

## Verified
`npm install` && `npm run build` → clean build, 1623 modules, no errors.
Rendered in a headless browser: home page, header, hero and category grid
all correct. The only console errors were blocked Unsplash image requests,
caused by the sandbox having no outbound access to images.unsplash.com —
they will load normally on your machine and in Bolt.

## Stack
React 18 + Vite 6 + Tailwind v4 (@tailwindcss/vite) + react-router 7 +
shadcn/ui (Radix) + MUI + lucide-react.

Routes: `/`, `/shop`, `/women`, `/men`, `/unisex`, `/product/:id`, `/cart`.
Product data is hardcoded in `src/app/data/perfumes.ts`.
Branding has been updated to "Jayda Scents"; prices are rendered as TZS with thousands separators.

---

# SLIM VERSION

This copy additionally removes dead weight found by auditing imports.

The entire app imports only **react, react-dom, react-router and
lucide-react**. Nothing else was referenced anywhere:

- `src/app/components/ui/` — 48 shadcn/Radix components, **zero imports**. Deleted.
- Dependencies removed: all 27 @radix-ui packages, @mui/material,
  @mui/icons-material, @emotion/*, recharts, embla-carousel-react,
  react-slick, react-dnd(+html5-backend), react-hook-form, react-day-picker,
  date-fns, cmdk, sonner, vaul, input-otp, next-themes, motion,
  react-popper, @popperjs/core, react-resizable-panels,
  react-responsive-masonry, class-variance-authority, clsx, tailwind-merge.

Kept `tw-animate-css` — it is imported by `src/styles/tailwind.css`.

Result: 22 source files instead of 70, 62 packages instead of ~400.
Build verified identical output; CSS bundle dropped 94 kB → 21.5 kB
because Tailwind no longer scans 48 unused component files.

**Trade-off:** if you later want shadcn dialogs, sheets or selects for the
cart and checkout, Bolt will have to generate them. That is a cheap prompt,
and cheaper than carrying 48 unused files through every Bolt read.
