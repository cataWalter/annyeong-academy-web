"use client";
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { 
  LayoutList, Loader2, Users, GraduationCap, DollarSign, Database, Tag,
  Megaphone, PenTool, Brain, Calendar, ShoppingBag, LayoutTemplate, BarChart2, UserCheck, HelpCircle, MessageSquare, Gift, Settings, FileText, MessageCircle
} from 'lucide-react'

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
import OrderManager from '@/components/admin/OrderManager'
import HomeworkManager from '@/components/admin/HomeworkManager'
import FeedbackViewer from '@/components/admin/FeedbackViewer'
import SeedManager from '@/components/admin/SeedManager'
import CouponManager from '@/components/admin/CouponManager'
import CommentManager from '@/components/admin/CommentManager'

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('analytics')
  
  if (authLoading || !isAdmin) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-brand-purple"/></div>

  const tabs = [
    { id: 'analytics', icon: BarChart2, label: 'Overview' },
    { id: 'orders', icon: DollarSign, label: 'Sales' },
    { id: 'coupons', icon: Tag, label: 'Coupons' },
    { id: 'students', icon: GraduationCap, label: 'Students' },
    { id: 'lessons', icon: LayoutList, label: 'Courses' },
    { id: 'grading', icon: FileText, label: 'Homework' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'tutors', icon: UserCheck, label: 'Tutors' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'blog', icon: PenTool, label: 'Blog' },
    { id: 'comments', icon: MessageCircle, label: 'Comments' }, // NEW
    { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
    { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
    { id: 'giveaway', icon: Gift, label: 'Giveaway' },
    { id: 'tests', icon: Brain, label: 'Tests' },
    { id: 'cms', icon: LayoutTemplate, label: 'CMS' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ' },
    { id: 'leads', icon: Users, label: 'CRM' },
    { id: 'announce', icon: Megaphone, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'db', icon: Database, label: 'DB Tools' },
  ]

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 font-bold rounded-t-lg transition whitespace-nowrap ${activeTab === tab.id ? 'bg-brand-purple text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
            <tab.icon size={18}/> {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in">
        {activeTab === 'analytics' && <AnalyticsManager />}
        {activeTab === 'orders' && <OrderManager />}
        {activeTab === 'coupons' && <CouponManager />}
        {activeTab === 'grading' && <HomeworkManager />}
        {activeTab === 'db' && <SeedManager />}
        {activeTab === 'feedback' && <FeedbackViewer />}
        {activeTab === 'lessons' && <CourseManager />}
        {activeTab === 'reviews' && <ReviewManager />}
        {activeTab === 'comments' && <CommentManager />}
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
        {activeTab === 'settings' && <SettingsManager />}
      </div>
    </div>
  )
}
