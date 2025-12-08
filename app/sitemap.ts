import { MetadataRoute } from 'next'

// Blog post slugs - should match the slugs in blog/[slug]/page.tsx
const blogPostSlugs = [
  '10-ways-to-get-more-votes-on-outfit-posts',
  'how-to-win-fashion-community-challenges',
  'building-fashion-following-fitscheck-vs-instagram',
  'psychology-of-outfit-voting',
  'top-20-fitscheck-community-members-to-follow',
  'how-to-settle-this-or-that-outfit-debates',
  'best-fashion-challenge-apps-for-creators',
  'where-to-get-real-fashion-feedback-from-community',
  'social-media-alternatives-for-fashion-creators',
  'fitscheck-vs-ai-styling-apps',
  '10-tips-for-better-outfit-photos',
  'how-to-win-style-challenges',
  '2025-fashion-trends',
  'outfit-ideas-for-every-occasion',
  'how-to-style-denim',
  'fashion-challenges-on-social-media',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fitscheck.com'
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/founding-creator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/for-creators`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/style-challenges`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rate-my-outfit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-fit-check-apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-get-better-fitscheck-photos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help/article?id=create-account`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Add blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPostSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}

