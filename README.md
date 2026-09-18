# Zagham Arif - Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features internationalization with next-intl and a professional design system.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations using Framer Motion
- **Responsive Layout**: Mobile-first design optimized for all device sizes
- **Dark/Light Theme**: Toggle between themes with smooth transitions using next-themes
- **Internationalization**: Multi-language support (English/Spanish) using next-intl
- **Interactive Sections**: Hero, Projects, Experience, Skills, and Contact sections
- **Form Validation**: Contact form with proper validation using React Hook Form + Zod
- **Performance Optimized**: Built with Next.js 14 App Router and TypeScript
- **SEO Friendly**: Server-rendered content, per-locale metadata with canonical and hreflang, `Person` JSON-LD, sitemap, robots and web manifest
- **Dual CV Support**: Traditional and Europass CV download options
- **Project Slider**: Interactive project showcase with navigation controls

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router with TypeScript)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Button, Input, Textarea, Card, Tooltip)
- **Icons**: React Icons
- **Animations**: Framer Motion with advanced variants
- **Form Handling**: React Hook Form + Zod validation
- **Theme**: next-themes for dark/light mode
- **Internationalization**: next-intl for professional i18n
- **Deployment**: Vercel (deployment-ready)

## 📋 Prerequisites

- **Node.js**: Version 18.x or higher (22.x recommended for optimal performance)
- **Package Manager**: Yarn (recommended) or npm

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Zagham-Arif/zagham-portfolio.git
cd zagham-portfolio
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open your browser:
   - English: [http://localhost:3000/en](http://localhost:3000/en)
   - Spanish: [http://localhost:3000/es](http://localhost:3000/es)

## 🛠️ Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues automatically
- `yarn type-check` - Run TypeScript type checking

## 🔧 Development Setup

### Environment

Ensure you have the correct Node.js version:

```bash
node --version  # Should be >= 18.0.0 (22.x recommended)
```

### VS Code Setup (Recommended)

Install these extensions for the best development experience:

- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter

### Hot Reload

The development server supports hot reload for:

- React components
- CSS changes
- Translation updates
- Configuration changes

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based routing (en/es)
│   │   ├── layout.tsx     # Locale layout with metadata and Person JSON-LD
│   │   ├── page.tsx       # Main portfolio page (server component)
│   │   ├── projects/      # /[locale]/projects, all projects grouped by recency
│   │   └── contact/       # /[locale]/contact, contact details and form
│   ├── manifest.ts        # Web app manifest route
│   ├── robots.ts          # robots.txt route
│   ├── sitemap.ts         # sitemap.xml route
│   ├── fonts/             # Custom fonts (Geist Sans/Mono)
│   ├── globals.css        # Global styles and CSS variables
│   └── layout.tsx         # Root layout with ThemeProvider
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section (CV buttons hidden while cvUrls are empty)
│   │   ├── Projects.tsx   # Projects with slider functionality
│   │   ├── Experience.tsx # Work experience timeline
│   │   ├── Skills.tsx     # Skills and technologies
│   │   ├── Contact.tsx    # Contact form with validation
│   │   └── Footer.tsx     # Footer with social links
│   └── Navigation.tsx     # Navigation with theme toggle
├── i18n/
│   ├── config.ts          # Supported locales and the default
│   └── request.ts         # next-intl request configuration
├── lib/
│   ├── data.ts           # Portfolio data (projects, experience, skills)
│   ├── icons.ts          # Explicit icon registry (only these icons are bundled)
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── middleware.ts         # Locale middleware for routing
└── public/
    └── projects/         # Project card images (architecture diagrams, screenshots)
messages/
├── en.json              # English translations
└── es.json              # Spanish translations
```

## 🎨 Customization

### Personal Information

Update your personal information in `src/lib/data.ts`:

```typescript
export const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  cvUrls: {
    traditional: '/Your-CV-Traditional.pdf',
    europass: '/Your-CV-Europass.pdf',
  },
  // ... other details
};
```

### Projects

Add your projects in `src/lib/data.ts`:

```typescript
export const projects: Project[] = [
  {
    id: 'project-id',
    title: 'Project Title',
    description: 'Project description',
    technologies: ['Next.js', 'TypeScript'],
    liveUrl: 'https://your-project.com',
    imageUrl: '/projects/project-id.webp',
    imageAlt: 'projectsData.project-id.imageAlt',
    featured: true,
  },
  // ... more projects
];
```

`description` and `imageAlt` are translation keys, not literal text, and must exist
in every file under `messages/`. `yarn check-i18n` (part of `yarn check-all`) fails
the build if a key referenced here is missing from a locale.

### Experience & Skills

Update your work experience and skills in `src/lib/data.ts`

### Translations

Modify translations in `messages/en.json` and `messages/es.json`

### CV Files

Place your CV files in the `public/` directory:

- Traditional format CV
- Europass format CV

## 🌐 Internationalization

The portfolio supports multiple languages using next-intl:

- **URLs**: `/en` for English, `/es` for Spanish
- **Automatic Detection**: Browser language detection
- **Fallback**: Defaults to English
- **Scalable**: Easy to add more languages

### Adding New Languages

1. Create a new translation file: `messages/[locale].json`
2. Update middleware: `src/middleware.ts` to include the new locale
3. Add translations following the existing structure

## 🔄 Migration Notes

This project has been migrated from a custom translation system to **next-intl** for better maintainability and professional standards. The migration includes:

- ✅ Locale-based routing (`/en`, `/es`)
- ✅ Professional i18n configuration
- ✅ Type-safe translations
- ✅ Server-side rendering support

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms

The project is compatible with any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 📱 Features Details

### Theme System

- Light/Dark mode toggle
- System preference detection
- Smooth transitions
- CSS variables for theming

### Form Validation

- Real-time validation
- Email format checking
- Required field validation
- Success/error states

### Project Slider

- Navigation controls
- Pagination indicators
- Smooth animations
- Responsive design

### SEO Optimization

- Every section is server-rendered, so crawlers see the content without running JavaScript
- Per-locale `generateMetadata` with `metadataBase`, canonical URLs and `en` / `es` / `x-default` hreflang
- Open Graph and Twitter Card tags with an absolute image URL
- `Person` JSON-LD in the locale layout
- Three indexable routes per locale (home, `/projects`, `/contact`), each with its own title, description and canonical
- `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` as App Router routes
- Both locales prerendered at build time via `generateStaticParams` and `setRequestLocale`

## 📞 Contact

- **Email**: zaghamarif@gmail.com
- **LinkedIn**: [linkedin.com/in/zagham-arif](https://www.linkedin.com/in/zagham-arif)
- **GitHub**: [github.com/Zagham-Arif](https://github.com/Zagham-Arif)

---

Built with ❤️ using Next.js 14, TypeScript, and next-intl
