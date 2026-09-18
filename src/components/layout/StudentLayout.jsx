import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SupportModal } from '../common/SupportModal';
import { MatchEdLogo } from '../common/MatchEdLogo';
import { NotificationBellPopup } from '../common/NotificationBellPopup';
import {
  LayoutDashboard,
  User,
  Compass,
  Sparkles,
  Bookmark,
  FileCheck,
  FolderOpen,
  Calendar,
  MessageSquare,
  Briefcase,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Brain,
  HelpCircle
} from 'lucide-react';

export const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { studentProfile, messages, appointments } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const unreadMessagesCount = (messages || []).filter(m => m.senderRole === 'COUNSELLOR' && m.unread).length;
  const upcomingAppts = (appointments || []).filter(a => a.status === 'UPCOMING');

  const studentNavItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/dashboard/profile', icon: User, badge: `${studentProfile?.academicBackground ? '85%' : 'Incomplete'}` },
    { name: 'Psychometric Evaluation', path: '/dashboard/assessments', icon: Brain, highlight: true },
    { name: 'My Journey', path: '/dashboard/journey', icon: Compass },
    { name: 'My Recommendations', path: '/dashboard/recommendations', icon: Sparkles },
    { name: 'Explore Marketplace', path: '/dashboard/explore', icon: Briefcase },
    { name: 'Top Scholar Add-Ons', path: '/dashboard/explore?tab=scholars', icon: Compass, highlight: true },
    { name: 'My Shortlist', path: '/dashboard/shortlist', icon: Bookmark },
    { name: 'Applications', path: '/dashboard/applications', icon: FileCheck },
    { name: 'Documents', path: '/dashboard/documents', icon: FolderOpen },
    { name: 'Appointments', path: '/dashboard/appointments', icon: Calendar, badge: upcomingAppts.length > 0 ? upcomingAppts.length : null },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0B2545] text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <MatchEdLogo variant="light" size="sm" />
        <div className="flex items-center gap-3">
          <NotificationBellPopup />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-200"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-[#0B2545] text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Top Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <MatchEdLogo variant="light" size="md" />
          </div>

          {/* User Card */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <img
              src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
              alt={currentUser?.fullName || "Student"}
              className="w-10 h-10 rounded-full object-cover border border-[#CFA25E]/60"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser?.fullName || "Rohan Mehta"}</p>
              <p className="text-[11px] text-amber-200/80 truncate">Student Portal</p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)] pt-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const basePath = item.path.split('?')[0];
              const query = item.path.includes('?') ? item.path.split('?')[1] : null;
              const isActive = item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : query
                  ? location.pathname === basePath && location.search.includes(query)
                  : (location.pathname === basePath || location.pathname.startsWith(basePath + '/')) && (!location.search.includes('tab=scholars'));

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive
                      ? 'bg-[#CFA25E] text-[#0B2545] font-bold shadow-sm shadow-[#CFA25E]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                    ${item.highlight && !isActive ? 'border border-[#CFA25E]/40 text-[#CFA25E]' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B2545]' : item.highlight ? 'text-[#CFA25E]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#0B2545]/20 text-[#0B2545]' : 'bg-white/10 text-amber-300 border border-white/10'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
          <button
            onClick={() => setSupportModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#CFA25E]/15 text-[#CFA25E] border border-[#CFA25E]/30 text-xs font-semibold hover:bg-[#CFA25E]/25 transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#CFA25E]" />
            <span>Get Support</span>
          </button>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-3 bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Welcome back,</span>
            <span className="font-bold text-[#0B2545]">{currentUser?.fullName || 'Student'}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              1-Month Switch Guarantee Active
            </span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBellPopup />
            <div className="h-5 w-px bg-slate-200"></div>
            <Link to="/dashboard/profile" className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#0B2545]">
              <img
                src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                alt=""
                className="w-7 h-7 rounded-full object-cover border border-slate-300"
              />
              <span>My Account</span>
            </Link>
          </div>
        </header>

        {/* Content Page */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Shared Support Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        userRole="STUDENT"
        userName={currentUser?.fullName || 'Rohan Mehta'}
        userEmail={currentUser?.email || 'rohan.mehta@example.com'}
      />
    </div>
  );
};
