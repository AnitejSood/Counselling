import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SupportModal } from '../common/SupportModal';
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
  GraduationCap,
  Brain,
  HelpCircle
} from 'lucide-react';

export const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
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
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">AspirantHQ Student Portal</span>
        </div>
        <div className="flex items-center gap-2">
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
        fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Top Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white block leading-tight">AspirantHQ</span>
              <span className="text-xs text-indigo-400 font-bold block">Verified Student Portal</span>
            </div>
          </div>

          {/* User Card */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center gap-3">
            <img
              src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
              alt={currentUser?.fullName || "Student"}
              className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser?.fullName || "Rohan Mehta"}</p>
              <p className="text-[11px] text-slate-400 truncate">MS Computer Science '27</p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)] pt-1">
            {studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname === item.path || location.pathname.startsWith(item.path + '/');

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }
                    ${item.highlight && !isActive ? 'border border-indigo-500/30 text-indigo-300' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'
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
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <button
            onClick={() => setSupportModalOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 text-xs font-semibold hover:bg-indigo-900/40 transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Get Support</span>
          </button>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

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
