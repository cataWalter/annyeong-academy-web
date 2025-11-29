export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/', '/profile/', '/cart/'],
    },
    sitemap: 'https://annyeong-academy.com/sitemap.xml',
  }
}
