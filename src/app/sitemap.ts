import { Links } from 'constants/links';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ['en', 'es'].map(locale => ({
    url: `${Links.siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 1,
  }));
}
