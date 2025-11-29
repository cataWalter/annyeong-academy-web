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
