# Tech Stack Documentation

## Core Framework

- **Next.js 14**: React framework with App Router for server-side rendering and static generation
- **TypeScript**: Type-safe JavaScript with enhanced developer experience
- **React 18**: Modern React with concurrent features

## Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible React components built on Radix UI
- **CSS Variables**: Custom properties for consistent theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Animations

- **Framer Motion**: Production-ready motion library for React
  - Page transitions
  - Component animations
  - Gesture handling
  - Advanced variants with proper TypeScript support

## Internationalization

- **next-intl**: Professional internationalization library for Next.js
  - Locale-based routing (`/en`, `/es`)
  - Server-side rendering support
  - Type-safe translations
  - Automatic locale detection

## Form Handling

- **React Hook Form**: Performant forms with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **Real-time validation**: Instant feedback for better UX

## Theme System

- **next-themes**: Dark/light theme switching
- **System preference detection**: Respects user's OS theme
- **Smooth transitions**: CSS transitions for theme changes

## Development Tools

- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Tailwind
- **Git**: Version control with conventional commits

## Build & Deployment

- **Vercel**: Optimized for Next.js deployment
- **Static Generation**: Pre-rendered pages for better performance
- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Built-in bundle analyzer

## Performance Features

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP conversion and responsive images
- **Font Optimization**: Self-hosted fonts with display: swap

## SEO & Metadata

- **Next.js Metadata API**: Type-safe metadata management
- **Open Graph**: Social media preview optimization
- **Structured Data**: Rich snippets for search engines
- **Internationalized URLs**: SEO-friendly locale routing

## Accessibility

- **Radix UI**: WAI-ARIA compliant components
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG 2.1 compliant color schemes

## File Structure Philosophy

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── sections/         # Page sections
├── i18n/                 # Internationalization config
├── lib/                  # Utilities and data
└── middleware.ts         # Next.js middleware
```

This structure promotes:

- Clear separation of concerns
- Easy maintainability
- Scalable architecture
- Type safety throughout
