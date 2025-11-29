"use client";
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Section from '../ui/Section'
import { ArrowRight } from 'lucide-react'

export default function LatestBlog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').eq('published', true).order('created_at', {ascending: false}).limit(3)
      setPosts(data || [])
    }
    fetchPosts()
  }, [])

  if(posts.length === 0) return null

  return (
    <Section className="bg-white">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">Latest from the Blog</h2>
          <p className="text-gray-600">Culture, tips, and academy news.</p>
        </div>
        <Link href="/blog" className="hidden md:flex items-center gap-2 font-bold text-brand-purple hover:underline">View All <ArrowRight size={18}/></Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map(post => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden mb-4 bg-gray-100 h-48">
              <img src={post.image_url || 'https://placehold.co/600x400'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={post.title} />
            </div>
            <h3 className="font-bold text-xl text-brand-dark mb-2 group-hover:text-brand-purple transition">{post.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link href="/blog" className="btn btn-plum-gradient px-8 py-3">View All Posts</Link>
      </div>
    </Section>
  )
}
