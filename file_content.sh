#!/bin/bash

echo "💳 Implementing Subscriptions, Admin Orders & Enhanced Store..."

# 1. Database Schema for Subscriptions
cat > supabase/ecommerce_advanced.sql << 'EOF'
-- 1. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'active', -- active, cancelled, expired
  plan_name text DEFAULT 'Premium Monthly',
  current_period_end timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- RLS for Subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins full access subscriptions" ON public.subscriptions FOR ALL USING (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));

-- 2. SEED SUBSCRIPTION PRODUCT
INSERT INTO public.products (id, title, description, price, type, image_url)
VALUES 
  ('premium-plan', 'Annyeong Premium', 'Access to ALL courses + Monthly Live Sessions.', '9900 Ft/mo', 'subscription', 'https://placehold.co/400x400/gold/white?text=Premium')
ON CONFLICT DO NOTHING;
EOF

echo "⚠️  Run content of 'supabase/ecommerce_advanced.sql' in Supabase!"

# 2. Create Admin Order Manager
mkdir -p src/components/admin
cat > src/components/admin/OrderManager.jsx << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, Search, DollarSign, RefreshCcw, XCircle, CheckCircle } from 'lucide-react'

export default function OrderManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('purchases')
      .select('*, profiles(full_name, email), products(title, price, type)')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  const handleRefund = async (id) => {
    if (!confirm("Are you sure you want to refund and revoke access?")) return
    // In real Stripe app, call API here.
    await supabase.from('purchases').update({ status: 'refunded' }).eq('id', id)
    fetchOrders()
  }

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.products?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Loader2 className="animate-spin text-brand-purple" />

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><DollarSign size={20}/> Transaction History</h3>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search order ID, email..." 
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg outline-none focus:border-brand-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-mono text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <p className="font-bold text-gray-800">{order.profiles?.full_name || 'Guest'}</p>
                  <p className="text-xs text-gray-500">{order.profiles?.email}</p>
                </td>
                <td className="p-4">
                  <span className="font-medium text-brand-purple">{order.products?.title}</span>
                  <span className="block text-xs text-gray-400 uppercase">{order.products?.type}</span>
                </td>
                <td className="p-4 font-bold">{order.products?.price}</td>
                <td className="p-4">
                  {order.status === 'completed' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      <CheckCircle size={12}/> Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      <XCircle size={12}/> Refunded
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  {order.status === 'completed' && (
                    <button 
                      onClick={() => handleRefund(order.id)}
                      className="text-gray-400 hover:text-red-500 flex items-center gap-1 ml-auto text-xs font-bold"
                      title="Refund & Revoke"
                    >
                      <RefreshCcw size={14}/> Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && <div className="p-8 text-center text-gray-400">No transactions found.</div>}
      </div>
    </div>
  )
}
EOF

# 3. Update Admin Dashboard to include Orders
cat > "src/app/(app)/admin/page.jsx" << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { 
  LayoutList, Loader2, Users, GraduationCap, DollarSign,
  Megaphone, Mail, PenTool, Brain, Calendar, ShoppingBag, LayoutTemplate, BarChart2, UserCheck, HelpCircle, MessageSquare, Gift, Settings
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import CourseManager from '@/components/admin/CourseManager'
import EventManager from '@/components/admin/EventManager'
import ShopManager from '@/components/admin/ShopManager'
import BlogManager from '@/components/admin/BlogManager'
import StudentManager from '@/components/admin/StudentManager'
import LeadsManager from '@/components/admin/LeadsManager'
import AnnouncementManager from '@/components/admin/AnnouncementManager'
import CMSManager from '@/components/admin/CMSManager'
import AnalyticsManager from '@/components/admin/AnalyticsManager'
import TutorManager from '@/components/admin/TutorManager'
import FAQManager from '@/components/admin/FAQManager'
import ReviewManager from '@/components/admin/ReviewManager'
import TestManager from '@/components/admin/TestManager'
import GiveawayManager from '@/components/admin/GiveawayManager'
import SettingsManager from '@/components/admin/SettingsManager'
import OrderManager from '@/components/admin/OrderManager' // NEW

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('analytics')
  
  if (authLoading || !isAdmin) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1">
        {[
          { id: 'analytics', icon: BarChart2, label: 'Overview' },
          { id: 'orders', icon: DollarSign, label: 'Sales' }, // NEW
          { id: 'settings', icon: Settings, label: 'Settings' },
          { id: 'lessons', icon: LayoutList, label: 'Courses' },
          { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
          { id: 'tutors', icon: UserCheck, label: 'Tutors' },
          { id: 'events', icon: Calendar, label: 'Events' },
          { id: 'cms', icon: LayoutTemplate, label: 'CMS' },
          { id: 'tests', icon: Brain, label: 'Tests' },
          { id: 'giveaway', icon: Gift, label: 'Giveaway' },
          { id: 'faq', icon: HelpCircle, label: 'FAQ' },
          { id: 'shop', icon: ShoppingBag, label: 'Shop' },
          { id: 'blog', icon: PenTool, label: 'Blog' },
          { id: 'students', icon: GraduationCap, label: 'Students' },
          { id: 'leads', icon: Users, label: 'CRM' },
          { id: 'announce', icon: Megaphone, label: 'Alerts' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 font-bold rounded-t-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <tab.icon size={18}/> {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === 'analytics' && <AnalyticsManager />}
        {activeTab === 'orders' && <OrderManager />}
        {activeTab === 'settings' && <SettingsManager />}
        {activeTab === 'lessons' && <CourseManager />}
        {activeTab === 'reviews' && <ReviewManager />}
        {activeTab === 'tutors' && <TutorManager />}
        {activeTab === 'events' && <EventManager />}
        {activeTab === 'cms' && <CMSManager />}
        {activeTab === 'tests' && <TestManager />}
        {activeTab === 'giveaway' && <GiveawayManager />}
        {activeTab === 'faq' && <FAQManager />}
        {activeTab === 'shop' && <ShopManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'students' && <StudentManager />}
        {activeTab === 'leads' && <LeadsManager />}
        {activeTab === 'announce' && <AnnouncementManager />}
      </div>
    </div>
  )
}
EOF

# 4. Create User Subscription Page
mkdir -p src/app/\(app\)/subscription
cat > "src/app/(app)/subscription/page.jsx" << 'EOF'
"use client";
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2, CreditCard, CheckCircle, XCircle, Calendar } from 'lucide-react'

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [sub, setSub] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) fetchSub()
  }, [user])

  const fetchSub = async () => {
    const { data } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single()
    setSub(data)
    setLoading(false)
  }

  const handleCancel = async () => {
    if(!confirm("Are you sure you want to cancel your subscription? You will lose access at the end of the period.")) return
    
    setLoading(true)
    // In real app, call Stripe API via Edge Function
    await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', user.id)
    fetchSub()
  }

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-purple"/></div>

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-brand-dark mb-2 flex items-center gap-3">
        <CreditCard className="text-brand-blue"/> Membership
      </h1>
      <p className="text-gray-500 mb-8">Manage your Premium access.</p>

      {sub ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-brand-dark">{sub.plan_name}</h3>
              <div className="flex items-center gap-2 mt-2">
                {sub.status === 'active' ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle size={14}/> Active</span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={14}/> Cancelled</span>
                )}
              </div>
            </div>
            <div className="text-right">
               <p className="text-xs text-gray-500 uppercase font-bold">Renews On</p>
               <p className="text-lg font-bold text-gray-800">{sub.current_period_end ? new Date(sub.current_period_end).toLocaleDateString() : 'Lifetime'}</p>
            </div>
          </div>

          <hr className="border-gray-100 my-6"/>

          <div className="space-y-3 mb-8">
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> Access to ALL video courses</p>
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> Monthly Live Q&A</p>
             <p className="flex items-center gap-3 text-gray-600"><CheckCircle size={18} className="text-brand-purple"/> 10% Store Discount</p>
          </div>

          {sub.status === 'active' && (
            <button onClick={handleCancel} className="text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition text-sm">
              Cancel Subscription
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-brand-purple to-brand-blue p-10 rounded-3xl text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Upgrade to Premium 👑</h2>
          <p className="text-white/90 mb-8 max-w-md mx-auto">Unlock unlimited access to all courses, live sessions, and exclusive content for one simple price.</p>
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-xs mx-auto border border-white/20 mb-8">
             <p className="text-4xl font-black">9.900 Ft<span className="text-sm font-normal text-white/70">/mo</span></p>
          </div>

          <button 
            onClick={() => alert("Redirecting to Stripe Checkout...")} 
            className="bg-white text-brand-purple px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            Start Free Trial
          </button>
        </div>
      )}
    </div>
  )
}
EOF

# 5. Enhanced Store Page (Categories & Search)
cat > "src/app/(app)/store/page.jsx" << 'EOF'
"use client";
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import Link from 'next/link'
import { ShoppingBag, Loader2, Download, Check, Plus, Filter, Search, Shirt, Book } from 'lucide-react'
import { cleanDescription } from '@/lib/helpers'
import WishlistButton from '@/components/ui/WishlistButton'

export default function Store() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { addToCart } = useCart()
  
  const [products, setProducts] = useState([])
  const [purchasedIds, setPurchasedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => { fetchData() }, [user])

  const fetchData = async () => {
    try {
      const { data } = await supabase.from('products').select('*').in('type', ['ebook', 'merch', 'bundle'])
      setProducts(data || [])
      if (user) {
        const { data: purchases } = await supabase.from('purchases').select('product_id').eq('user_id', user.id).eq('status', 'completed')
        if (purchases) setPurchasedIds(purchases.map(p => p.product_id))
      }
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const filteredProducts = products.filter(p => {
    const matchesCat = filter === 'all' || p.type === filter
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand-purple" /></div>

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark mb-2">{t('store_title')}</h1>
          <p className="text-gray-500">{t('store_desc')}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
           <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
              <input 
                placeholder="Search items..." 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-brand-purple w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>
           <div className="flex gap-2">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'all' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>All</button>
              <button onClick={() => setFilter('ebook')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'ebook' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>Ebooks</button>
              <button onClick={() => setFilter('merch')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filter === 'merch' ? 'bg-brand-dark text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>Merch</button>
           </div>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-gray-400">No products found.</div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const isOwned = purchasedIds.includes(product.id)
          const isEbook = product.type === 'ebook'
          
          return (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition group flex flex-col relative">
              <div className="h-56 overflow-hidden relative bg-gray-50 flex items-center justify-center">
                <img src={product.image_url || 'https://placehold.co/400x400'} alt={product.title} className={`h-full w-full object-cover transition duration-500 ${!isOwned && 'group-hover:scale-105'}`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-purple shadow-sm uppercase">{product.type}</div>
                <div className="absolute top-4 left-4"><WishlistButton productId={product.id} /></div>
                {isOwned && isEbook && <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"><div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"><Check size={24} strokeWidth={3} /></div></div>}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-brand-dark mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{cleanDescription(product.description)}</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  {isOwned && isEbook ? (
                    <Link href="/downloads" className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition"><Download size={16} /> {t('store_download')}</Link>
                  ) : (
                    <>
                      <span className="text-xl font-bold text-brand-purple">{product.price}</span>
                      <button onClick={() => addToCart(product)} className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-md">
                        <Plus size={16} /> Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
EOF

# 6. Update App Layout Sidebar
cat > src/components/layout/AppLayout.jsx << 'EOF'
"use client";
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { LayoutDashboard, BookOpen, Calendar, LogOut, User, ShieldCheck, ShoppingBag, Settings, Download, Menu, X, Trophy, StickyNote, PenTool, MessageSquare, CreditCard } from 'lucide-react'
import AnnouncementBanner from '../ui/AnnouncementBanner'

export default function AppLayout() {
  const { signOut, user, profile, isAdmin } = useAuth()
  const { t } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  const NavItem = ({ href, icon: Icon, label }) => {
    const isActive = pathname === href
    return (
      <Link 
        href={href} 
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
          isActive ? 'bg-brand-purple text-white shadow-md' : 'text-gray-600 hover:bg-purple-50 hover:text-brand-purple'
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <div className="md:hidden fixed top-0 left-0 w-full bg-white z-30 px-4 py-3 shadow-sm flex justify-between items-center">
        <span className="font-bold text-brand-purple text-lg">Annyeong LMS</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700"><X size={24} className={!mobileOpen && "hidden"}/><Menu size={24} className={mobileOpen && "hidden"}/></button>
      </div>

      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMobileOpen(false)}></div>}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 hidden md:block">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">Annyeong LMS</span>
        </div>
        
        <div className="md:hidden p-6 border-b border-gray-100 flex items-center justify-between">
           <span className="font-bold text-brand-dark">Menu</span>
           <button onClick={() => setMobileOpen(false)}><X size={20}/></button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <NavItem href="/dashboard" icon={LayoutDashboard} label={t('nav_dashboard')} />
          <NavItem href="/corsi" icon={BookOpen} label={t('nav_courses')} />
          <NavItem href="/notebook" icon={StickyNote} label={t('nav_notebook')} />
          <NavItem href="/leaderboard" icon={Trophy} label={t('nav_leaderboard')} />
          <NavItem href="/lezioni-live" icon={Calendar} label={t('nav_live')} />
          <NavItem href="/store" icon={ShoppingBag} label={t('nav_store')} />
          <NavItem href="/subscription" icon={CreditCard} label="Membership" /> {/* NEW */}
          <NavItem href="/blog" icon={PenTool} label="Blog" />
          <NavItem href="/feedback" icon={MessageSquare} label="Feedback" />
          <NavItem href="/downloads" icon={Download} label={t('nav_downloads')} />
          <NavItem href="/profile" icon={Settings} label={t('nav_profile')} />
          
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-gray-100">
               <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">{t('nav_admin')}</p>
               <NavItem href="/admin" icon={ShieldCheck} label={t('nav_management')} />
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
              {profile?.avatar_url ? <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover"/> : <User size={16} />}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-bold text-gray-700 truncate">{profile?.full_name || 'Student'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm font-medium">
            <LogOut size={18} /> {t('nav_logout')}
          </button>
        </div>
      </aside>

      <div className="flex-1 md:ml-64 pt-16 md:pt-0 flex flex-col min-h-screen">
        <AnnouncementBanner />
        <main className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1">
          {/* Outlet is implicit */}
        </main>
      </div>
    </div>
  )
}
EOF

echo "✅ Advanced E-commerce & Subscriptions Implemented!"