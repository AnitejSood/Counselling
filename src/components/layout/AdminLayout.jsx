import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Sparkles,
  FileCheck,
  FolderOpen,
  CheckSquare,
  Briefcase,
  Clock,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Building2
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
  const { platformConfig, adminStudentsList, documents, appointments } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const studentsNeedingAttention = (adminStudentsList || []).filter(s => s.needsAttention).length;
  const pendingDocsCount = (documents || []).filter(d => d.status === 'Under Review').length;

  const adminNavItems = [
    { name: 'Executive Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Student Directory', path: '/admin/students', icon: Users, badge: studentsNeedingAttention > 0 ? `${studentsNeedingAttention} Attention` : `${adminStudentsList.length}` },
    { name: 'Appointments Ledger', path: '/admin/appointments', icon: Calendar, badge: (appointments || []).length },
    { name: 'Support Tickets', path: '/admin/messages', icon: MessageSquare },
    { name: 'System Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-950 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">AspirantHQ Executive Control</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Top Admin Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white block leading-tight">AspirantHQ</span>
              <span className="text-xs text-purple-400 font-semibold block">Platform Executive Desk</span>
            </div>
          </div>

          {/* Business Owner Profile Widget */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-xs ring-2 ring-purple-400">
              HQ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Platform Executive</p>
              <p className="text-[10px] text-purple-300 truncate">Chandigarh HQ Desk</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pt-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${isActive
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-purple-950 text-purple-300 border border-purple-800/40'
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
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950">
          <button
            onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-800/40 text-xs font-semibold hover:bg-blue-900/40 transition cursor-pointer"
          >
            <span>View Marketplace as Student</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-900 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Sign Out Control Desk</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">
        {/* Global Admin Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 justify-between items-center sticky top-0 z-30 shadow-xs">
          <div>
            <span className="text-xs text-purple-600 font-bold uppercase tracking-wider">AspirantHQ Corporate Oversight</span>
            <h1 className="text-lg font-extrabold text-slate-900">
              Welcome Back, Platform Executive
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Chandigarh HQ Active
            </span>
            <button
              onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Switch to Student View
            </button>
          </div>
        </header>

        {/* Page Container */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
