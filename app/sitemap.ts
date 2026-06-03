import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://docusprint.app'
  
  const staticPages = [
    '',
    '/tools',
    '/pricing',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/login',
    '/register',
  ]

  const toolPages = [
    '/tools/ai-writer',
    '/tools/code-generator',
    '/tools/summarizer',
    '/tools/qr-generator',
    '/tools/word-counter',
    '/tools/image-compress',
    '/tools/json-formatter',
    '/tools/password-generator',
  ]

  const allPages = [...staticPages, ...toolPages]

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route.startsWith('/tools/') ? 0.9 : 0.8,
  }))
}
