import { createClient } from '@supabase/supabase-js'

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const baseUrl = 'https://annyeong-academy.com'

  // 1. Static Routes
  const routes = [
    '', '/about', '/tutors', '/corsi', '/lezioni-live', '/store', 
    '/blog', '/contact', '/faq', '/login', '/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  // 2. Dynamic Courses
  const { data: courses } = await supabase.from('products').select('id, updated_at').eq('type', 'course')
  const courseRoutes = courses?.map((course) => ({
    url: `${baseUrl}/corsi/${course.id}`,
    lastModified: new Date(course.updated_at || new Date()),
    changeFrequency: 'weekly',
    priority: 0.9,
  })) || []

  // 3. Dynamic Blog Posts
  const { data: posts } = await supabase.from('posts').select('slug, created_at').eq('published', true)
  const postRoutes = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) || []

  // 4. Dynamic Tutors
  const { data: tutors } = await supabase.from('tutors').select('id')
  const tutorRoutes = tutors?.map((tutor) => ({
    url: `${baseUrl}/tutors/${tutor.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  })) || []

  return [...routes, ...courseRoutes, ...postRoutes, ...tutorRoutes]
}
