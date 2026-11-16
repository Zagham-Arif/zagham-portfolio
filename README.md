# Zagham Arif, portfolio

The source for [zagham-portfolio.vercel.app](https://zagham-portfolio.vercel.app), the portfolio of a senior full-stack engineer whose work is mostly backend. Most of that work has no screenshots, so the site shows the systems themselves. It has a live console where you try to break a system, architecture diagrams, and a stack map that links each skill to the projects that used it.

Built with Next.js 16, React 19, TypeScript and Tailwind CSS 4, in English and Spanish, with light and dark themes. See [TECH_STACK.md](TECH_STACK.md) for the reasoning behind each choice.

## What's on the page

The homepage, top to bottom:

1. **Nav**: section links, a **Plain English / Engineering** switch, the ⌘K button, language, theme and "Hire me".
2. **Hero**: headline, a short intro in both reading modes, booking and work buttons, and four count-up numbers.
3. **"Try to break my system" console**: a simulated system (users → API → cache / queue → workers → DB, plus a third-party provider). Each of the three scenarios (traffic spike, provider outage, duplicate request) comes from a real project and shows the pattern that handles it. The console is labelled as a simulation.
4. **Tech marquee**: logos scroll past and pause on hover.
5. **What I do**: four capability cards.
6. **Work explorer**: three featured case studies, each with tabs, a problem / what I did / what changed story, an animated diagram, result tiles, and a button that runs the matching console scenario. Below it, a one-line list of the other projects, each with a mini architecture diagram.
7. **Stack map**: skills grouped into Core, Strong and Familiar. Each skill opens a popover that lists where it was used and can filter the work section by it.
8. **Experience timeline**: the line fills as you scroll and the current role is marked live.
9. **How I work**: three steps.
10. **Contact**: email with a copy button, booking, Upwork, LinkedIn, GitHub and a live Lahore clock.

Three more pages per locale: `/projects` (the explorer plus a table of every project), `/contact` and a localized 404.

**⌘K / Ctrl+K** opens a command menu from anywhere. You can copy the email, jump to a section, switch reading mode, theme or language, open a case study, or run a console demo.

## Getting started

You need **Node.js 22.18 or later** (the tests run TypeScript directly through Node's type stripping) and **Yarn 1**.

```bash
git clone https://github.com/Zagham-Arif/zagham-portfolio.git
cd zagham-portfolio
yarn install
yarn dev
```

Then open [localhost:3000/en](http://localhost:3000/en) or [localhost:3000/es](http://localhost:3000/es). `/` redirects to `/en`, and the site never redirects based on browser language.

## Scripts

| Command           | What it does                                                         |
| ----------------- | -------------------------------------------------------------------- |
| `yarn dev`        | Start the dev server                                                 |
| `yarn build`      | Production build (both locales are prerendered)                      |
| `yarn start`      | Serve the production build                                           |
| `yarn lint`       | ESLint (Next core-web-vitals + TypeScript + Prettier rules)          |
| `yarn lint:fix`   | ESLint with autofix                                                  |
| `yarn type-check` | `tsc --noEmit`                                                       |
| `yarn test`       | Unit tests with `node --test` (no test framework)                    |
| `yarn check-i18n` | Fails if a locale is missing a key or the locale key trees differ    |
| `yarn format`     | Prettier write (`format:check` to verify only)                       |
| `yarn check-all`  | type-check, check-i18n, lint, test and format check. Run before a PR |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root: imports globals.css only
│   ├── globals.css             # Design tokens, component classes, all keyframes
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── [locale]/
│       ├── layout.tsx          # Fonts, metadata, Person JSON-LD, theme + intl providers, ⌘K
│       ├── page.tsx            # Homepage, composed of server sections
│       ├── projects/, contact/ # Sub-pages with their own metadata
│       ├── opengraph-image.tsx # Per-locale social image (also twitter-image.tsx)
│       ├── not-found.tsx, [...rest]/
├── components/
│   ├── shell/       # Nav, CommandMenu, ModeText, TechIcon (SVG sprite)
│   ├── hero/        # Hero, CountUp
│   ├── console/     # Console, SystemDiagram, simulation.ts (pure, tested)
│   ├── home/        # Capabilities, Marquee, HowIWork, ContactBlock, SectionHead, SiteFooter
│   ├── work/        # WorkSection, WorkExplorer, MiniDiagram, ArchiveTable, diagrams/
│   ├── stack/       # StackMap, SkillButton
│   ├── timeline/    # Timeline, TimelineProgress
│   └── contact/     # CopyEmail, LocalClock
├── lib/
│   ├── data.ts          # Personal info, projects, experience, education
│   ├── case-studies.ts  # The three featured projects: scenario, KPIs, wiring
│   ├── stack.ts         # Skills and their tier; where each was used
│   ├── skills.ts        # normalizeTech(): folds "React.js"/"ReactJS" → "react"
│   ├── lanes.ts         # Sorts a project's tech into client / service / data lanes
│   ├── events.ts        # Typed window events between client islands
│   ├── view-mode.ts     # Plain / Engineering preference + no-flash inline script
│   ├── page-metadata.ts # Sub-page metadata (canonical, hreflang, OG)
│   └── *.test.ts        # Unit tests next to the code they cover
├── i18n/            # Locales, request config, canonical/hreflang helper
├── constants/links.ts
└── proxy.ts         # next-intl locale routing (Next 16's replacement for middleware.ts)
messages/en.json, es.json   # All visible copy
scripts/check-i18n-keys.mjs
public/projects/            # Project images (.webp)
```

## How it's built

**Server first, small client islands.** Every section renders on the server, so crawlers and visitors without JavaScript get the full content. Only interactive pieces are client components: the console, work explorer, skill popovers, ⌘K, nav controls, count-ups, clock, copy button and timeline progress. The islands don't share a React provider. They send typed `CustomEvent`s on `window` (`lib/events.ts`), so the stack map can filter the work section and the explorer can run a console scenario.

**Two reading modes without a re-render.** `ModeText` outputs both the Plain and the Engineering version of a passage, and CSS on `html[data-mode]` shows one of them. An inline script in `<head>` applies the saved mode before first paint. The page reads correctly before hydration and with storage blocked, and the switch never flashes.

**Design tokens in one place.** Colours are `--c-*` custom properties in `globals.css`, redefined under `.dark` and exposed to Tailwind through `@theme inline` (`bg-surface`, `text-ink`, `text-brand` and so on). Type is Bricolage Grotesque for display, Inter for body and JetBrains Mono for labels, all loaded with `next/font/google`. The accent runs from blue (`#3B5BFD`) to teal.

**Motion in CSS.** The site has no animation library. The hero entrance, console boot, diagram draw-in, marquee, ⌘K and the circular theme reveal (View Transitions API) are all CSS keyframes. The timeline fill is the one scroll-linked effect. Every animation has a static version under `prefers-reduced-motion`.

**Diagrams and icons are inline SVG.** They follow the theme and need no network requests. Tech logos come from named `simple-icons` imports, which are rendered once into an SVG sprite and referenced with `<use>`, so only the icons the site uses are bundled.

## Editing content

All visible text is in `messages/en.json` and `messages/es.json`. Both files need the same key structure, and `yarn check-i18n` enforces it.

- **Personal details, booking link, avatar, CV paths:** `personalInfo` in `src/lib/data.ts`. Empty `avatarUrl`, `bookingUrl` or `cvUrls` hide the related UI or fall back to something else (a "ZA" monogram, the contact section, no resume button).
- **Projects and experience:** `projects` and `experiences` in `src/lib/data.ts`. `description`, `imageAlt` and the experience keys are translation keys, not literal text. Technology names are free text, and `normalizeTech()` folds the variants together, so a new alias may need an entry in `src/lib/skills.ts`.
- **Featured case studies:** `src/lib/case-studies.ts` (facts and wiring), copy under `caseStudies.<id>` in the messages, and the diagram in `src/components/work/diagrams/`. A KPI with `pending: true` shows a visible `*` until the number is confirmed. Numbers on this site are real and are not estimated.
- **Skills:** the `tier` of a skill in `src/lib/stack.ts`. Its "where used" list is derived from `projects` and `experiences`.
- **Plain / Engineering copy:** paired keys ending in `plain` and `tech`.
- **Links:** `src/constants/links.ts`.

## Adding a language

1. Add the code to `locales` in `src/i18n/config.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate it.
3. Add its Open Graph locale to `ogLocales` in `src/app/[locale]/layout.tsx` and `src/lib/page-metadata.ts`.
4. The language button in `Nav.tsx` toggles between two locales, so with three or more it would need to become a menu.

## SEO and accessibility

- One `h1` per page, server-rendered content, and both locales prerendered with `generateStaticParams`. Pages revalidate daily so "years of experience" and the © year stay current.
- Per-locale titles and descriptions, a canonical URL, and `en` / `es` / `x-default` hreflang on every route. Per-locale Open Graph and Twitter images. `Person` JSON-LD.
- `sitemap.xml` (three routes × two locales), `robots.txt` and `manifest.webmanifest` are App Router routes.
- Target WCAG 2.2 AA. Icon-only buttons are labelled and at least 24 × 24 px, the explorer follows the WAI-ARIA tabs pattern, ⌘K is a native `<dialog>` opened with `showModal()` (focus trap, Escape and focus return come from the browser), the console log is `aria-live="polite"`, and the page has a skip link.

## Deployment

Hosted on Vercel and deployed from `main`. Any host that runs Next.js 16 on Node 22 works.

## Contact

- Email: zaghamarif@gmail.com
- LinkedIn: [linkedin.com/in/zagham-arif](https://www.linkedin.com/in/zagham-arif)
- GitHub: [github.com/Zagham-Arif](https://github.com/Zagham-Arif)
- Upwork: [upwork.com/freelancers/~01b58b210c60ff7195](https://www.upwork.com/freelancers/~01b58b210c60ff7195)
