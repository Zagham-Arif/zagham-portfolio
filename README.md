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
- **SEO Friendly**: Proper metadata, structured data, and internationalized URLs
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
│   │   ├── layout.tsx     # Locale layout with NextIntlClientProvider
│   │   └── page.tsx       # Main portfolio page
│   ├── fonts/             # Custom fonts (Geist Sans/Mono)
│   ├── globals.css        # Global styles and CSS variables
│   └── layout.tsx         # Root layout with ThemeProvider
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section with dual CV downloads
│   │   ├── Projects.tsx   # Projects with slider functionality
│   │   ├── Experience.tsx # Work experience timeline
│   │   ├── Skills.tsx     # Skills and technologies
│   │   ├── Contact.tsx    # Contact form with validation
│   │   └── Footer.tsx     # Footer with social links
│   └── Navigation.tsx     # Navigation with theme toggle
├── i18n/
│   └── request.ts         # next-intl configuration
├── lib/
│   ├── data.ts           # Portfolio data (projects, experience, skills)
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── middleware.ts         # Locale middleware for routing
└── public/               # Static assets and CV files
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
    featured: true,
  },
  // ... more projects
];
```

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

- Meta tags configuration
- Open Graph support
- Twitter Card support
- Structured data

## 📞 Contact

- **Email**: zaghamarif@gmail.com
- **LinkedIn**: [linkedin.com/in/zagham-arif](https://linkedin.com/in/zagham-arif)
- **GitHub**: [github.com/Zagham-Arif](https://github.com/Zagham-Arif)

---

Built with ❤️ using Next.js 14, TypeScript, and next-intl
