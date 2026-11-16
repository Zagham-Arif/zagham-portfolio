# Tech stack

This file lists what the site runs on and why each piece is there. The rule behind most of these choices: send as little JavaScript as possible, keep content on the server, and make no network calls that aren't needed.

## Runtime

| Package           | Version | Role                                                             |
| ----------------- | ------- | ---------------------------------------------------------------- |
| Next.js           | 16      | App Router, static prerendering, `next/font`, `next/og`, Proxy   |
| React / React DOM | 19      | Server Components by default; client components only for islands |
| next-intl         | 4.x     | `[locale]` routing, server and client translations               |
| next-themes       | 0.4     | Light / dark / system theme on `html.dark`, no flash             |
| simple-icons      | 16      | Tech logo paths, imported by name so only the used ones ship     |
| lucide-react      | 1.x     | A few UI icons (play, pause, reset, sun, moon)                   |

That is the whole dependency list. There is no UI kit, animation library, form library or CMS.

## Language and tooling

- **TypeScript 5** in strict mode. `allowImportingTsExtensions` lets the pure `lib/` modules import each other as `./x.ts`, so Node can run their tests without a build step.
- **Node 22.18+**. That release turned on type stripping by default, which `yarn test` depends on.
- **Tests**: `node --test "src/**/*.test.ts"`. They cover the pure logic: the console simulation, tech-name normalisation, stack tiers, diagram lanes, command filtering, view mode, hreflang alternates and text helpers. There is no Jest or Vitest.
- **ESLint 9** flat config: `eslint-config-next` (core-web-vitals and TypeScript), then `eslint-plugin-prettier`.
- **Prettier 3** with `prettier-plugin-tailwindcss` for class ordering. Single quotes, ES5 trailing commas, `arrowParens: avoid`.
- **`scripts/check-i18n-keys.mjs`** fails the build if a translation key referenced in `data.ts` is missing, or if the locale files' key trees differ.
- **Path aliases**: `components/*`, `lib/*`, `i18n/*`, `constants/*` (see `tsconfig.json`).

## Styling

- **Tailwind CSS 4**, configured in CSS. There is no `tailwind.config.*`. `globals.css` holds `@import 'tailwindcss'`, `@custom-variant dark` and `@theme inline`. PostCSS runs only `@tailwindcss/postcss`.
- **Tokens**: `--c-*` custom properties for background, surface, ink, muted, rule, accent (blue `#3B5BFD`), accent-2 (teal), lime "live" dot and the dark panel. They are redefined under `.dark` and exposed to Tailwind as `bg-surface`, `text-ink`, `text-brand` and so on.
- **Type**: Bricolage Grotesque 700/800 for display, Inter for body, JetBrains Mono for labels and numbers, all from `next/font/google` (self-hosted at build time).
- **Component classes** (`.card`, `.btn`, `.kicker`, `.display`, `.mono`, `.layer` and others) sit in `@layer components` next to the tokens. Tailwind utilities handle layout.

## Motion

- **CSS only.** Keyframes cover the hero word rise, console node boot and log lines, diagram stroke draw-in, marquee, mini-diagram pulses and the ⌘K entrance.
- **Theme switch**: a circular reveal through `document.startViewTransition`. It is instant when the API is missing or reduced motion is on.
- **Scroll**: the experience timeline fill is the only scroll-linked effect (`TimelineProgress`, one `requestAnimationFrame`-throttled listener).
- **Reduced motion**: every animation has a static version under `prefers-reduced-motion: reduce`. Keyframes animate paint and compositor properties only (`transform`, `opacity`, `clip-path`, `box-shadow`, SVG `stroke-dashoffset`), never layout, so animation causes no layout shift.

## Rendering model

- Sections are async Server Components that read `lib/data.ts` and translations on the server.
- Client islands receive plain props and only the message namespaces they need (`home.nav`, `home.console`, `home.cmdk`, `caseStudies`). The rest of the messages never reach the browser.
- Islands talk through typed `window` events (`lib/events.ts`) rather than a shared context, so no provider has to wrap the server tree.
- The Plain / Engineering mode is a `data-mode` attribute set by an inline `<head>` script and read by CSS. It costs no hydration.
- Both locales are prerendered (`generateStaticParams`, `dynamicParams = false`) and revalidate every 24 hours.

## SEO and metadata

- Metadata API: `metadataBase`, per-locale title and description, canonical URLs, `en` / `es` / `x-default` hreflang.
- `opengraph-image.tsx` and `twitter-image.tsx` generate a social card per locale with `next/og`.
- `Person` JSON-LD in the locale layout, with `knowsAbout` taken from the stack list.
- `sitemap.ts`, `robots.ts` and `manifest.ts` as route handlers.
- Security headers in `next.config.mjs`: `X-Frame-Options: DENY`, `nosniff` and a strict referrer policy.

## Accessibility

- Target WCAG 2.2 AA in both themes.
- ⌘K is a native `<dialog>` opened with `showModal()`. The work explorer uses `role="tablist"` / `tab` / `tabpanel` with arrow-key navigation. Skill details use the native Popover API.
- Live regions announce the console log and the "copied" confirmation.
- Skip link, labelled icon buttons of at least 24 × 24 px, and visible focus rings.

## Removed in the 2026 redesign

These were in the Next.js 14 version and are gone: Framer Motion, shadcn/ui and Radix, react-icons, React Hook Form + Zod and the Formspree contact form (contact is now email and booking first), the Lottie splash screen, the custom cursor and the project slider.
