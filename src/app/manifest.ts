import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zagham Arif - Senior Full-Stack Engineer',
    short_name: 'Zagham Arif',
    description:
      'Portfolio of Zagham Arif, a senior full-stack engineer building backend architecture, data pipelines and payment systems in Node.js, TypeScript and AWS.',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#4f46e5',
    background_color: '#0a0a0a',
    display: 'standalone',
    start_url: '/en',
    scope: '/',
    orientation: 'portrait-primary',
    categories: ['productivity', 'business'],
  };
}
