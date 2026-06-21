import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'Google-Extended', 'PerplexityBot', 'Bytespider', 'CCBot'],
        disallow: '/',
      }
    ],
    sitemap: 'https://2qnhanthuat.com/sitemap.xml',
  };
}
