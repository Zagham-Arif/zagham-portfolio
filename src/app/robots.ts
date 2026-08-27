import { Links } from 'constants/links';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${Links.siteUrl}/sitemap.xml`,
  };
}
