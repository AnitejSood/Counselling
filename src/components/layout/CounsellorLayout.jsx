import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase, UserCheck, Calendar, Compass, Users, ShieldCheck, BarChart2,
  LogOut, Menu, X, ChevronRight, Bell, MessageSquare, Settings, Home
} from 'lucide-react';

const navItems = [
  { name: 'My Profile & Services', path: '/counsellor/profile', icon: Briefcase },
  { name: 'Session Bookings', path: '/counsellor/bookings', icon: Calendar },
  { name: 'Student Intake', path: '/counsellor/intake', icon: UserCheck },
  { name: 'Roadmap & Milestones', path: '/counsellor/roadmap', icon: Compass },
  { name: 'Application Pipeline', path: '/counsellor/pipeline', icon: Users },
  { name: 'Proof & Documents', path: '/counsellor/proof', icon: ShieldCheck },
  { name: 'Analytics & Reviews', path: '/counsellor/analytics', icon: BarChart2 },
];

export const CounsellorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">Counsellor Portal</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg bg-slate-800">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Brand */}
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block">AspirantHQ</span>
              <span className="text-xs text-emerald-400 font-semibold block">Counsellor Portal</span>
            </div>
          </div>

          {/* Advisor Profile Card */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
              alt="Arti Sood"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Arti Sood</p>
              <p className="text-[10px] text-emerald-400 font-semibold">Verified Advisor · PRO</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active" />
          </div>

          {/* Nav */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/50' : 'text-slate-700'}`} />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <button
            onClick={() => { switchRole('ADMIN'); navigate('/admin'); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-800/40 text-xs font-semibold hover:bg-purple-900/40 transition cursor-pointer"
          >
            <span>Platform Executive Control</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 text-xs font-semibold hover:bg-indigo-900/40 transition cursor-pointer"
          >
            <span>View as Student</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">

        {/* Top Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 justify-between items-center sticky top-0 z-30 shadow-sm">
          <div>
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Verified Counsellor Dashboard</span>
            <h1 className="text-lg font-extrabold text-slate-900">Arti Sood — Career Consultant</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PRO Advisor Active
            </span>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
