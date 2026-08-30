import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { SupportModal } from '../common/SupportModal';
import {
  Briefcase, UserCheck, Calendar, Compass, Users, ShieldCheck, BarChart2,
  LogOut, Menu, X, ChevronRight, MessageSquare, Settings, Lock, Sparkles, HelpCircle, ArrowUpRight, User, Layers, LayoutDashboard, Bell
} from 'lucide-react';

const navItems = [
  { name: 'Counsellor Overview', path: '/counsellor', icon: LayoutDashboard },
  { name: 'My Profile & Services', path: '/counsellor/profile', icon: Briefcase },
  { name: 'Session Bookings & Slots', path: '/counsellor/bookings', icon: Calendar },
  { name: 'Student Intake', path: '/counsellor/intake', icon: UserCheck },
  { name: 'Roadmap & Milestones', path: '/counsellor/roadmap', icon: Compass },
  { name: 'Application Pipeline', path: '/counsellor/pipeline', icon: Users },
  { name: 'Proof & Document Counter', path: '/counsellor/proof', icon: ShieldCheck },
  { name: 'Analytics & Hero Boost', path: '/counsellor/analytics', icon: BarChart2 },
  { name: 'Portal Settings', path: '/counsellor/settings', icon: Settings },
];

export const CounsellorLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
  const { 
    counsellorProfile, 
    hasPortalAccess, 
    upgradeCounsellorTier,
    activeStudentId,
    switchActiveStudent,
    activeStudent,
    allStudentsList
  } = useData();

  const location = useLocation();
  const navigate = useNavigate();

  const isAccessGranted = hasPortalAccess(counsellorProfile);
  const currentTier = counsellorProfile?.subscriptionTier || 'FREE';

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
              src={counsellorProfile?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"}
              alt={counsellorProfile?.fullName || "Arti Sood"}
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{counsellorProfile?.fullName || "Arti Sood"}</p>
              <div className="flex items-center gap-1">
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                  currentTier === 'FREE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {currentTier === 'FREE' ? 'Tier 1 Free' : 'PRO Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Active Student Dropdown Widget */}
          <div className="mx-3 my-2 p-3 bg-indigo-950/80 rounded-xl border border-indigo-800/60 space-y-1.5">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">Active Student Context:</span>
            <select
              value={activeStudentId}
              onChange={(e) => switchActiveStudent(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold border border-indigo-700 focus:outline-none cursor-pointer"
            >
              {(allStudentsList || []).map(s => (
                <option key={s.studentId || s.id} value={s.studentId || s.id}>
                  👤 {s.fullName || s.name} ({s.targetGoal ? s.targetGoal.split('/')[0] : 'Student'})
                </option>
              ))}
            </select>
          </div>

          {/* Nav Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-380px)] pt-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/40">
          <button
            onClick={() => setSupportModalOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 text-xs font-semibold hover:bg-emerald-900/40 transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
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

      {/* Main content area */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen flex flex-col">

        {/* Top Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-3.5 justify-between items-center sticky top-0 z-30 shadow-xs">
          <div>
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">AspirantHQ Verified Counsellor Portal</span>
            <h1 className="text-base font-extrabold text-slate-900">{counsellorProfile?.fullName || 'Arti Sood'} — Career Strategist</h1>
          </div>
          <div className="flex items-center gap-3">
            {currentTier === 'FREE' ? (
              <button
                onClick={() => upgradeCounsellorTier(counsellorProfile?.id || 'counsellor_01', 'PRO')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-sm hover:bg-amber-400 transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Upgrade to Pro ($49/mo)
              </button>
            ) : (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                PRO Advisor Active
              </span>
            )}
          </div>
        </header>

        {/* Top Active Student Context Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white px-6 py-3 border-b border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeStudent?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                alt={activeStudent?.fullName || 'Rohan Mehta'}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-400 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-300">Active Student:</span>
                <span className="text-xs font-black text-white">{activeStudent?.fullName || 'Rohan Mehta'}</span>
              </div>
              <p className="text-[11px] text-indigo-200 font-medium">Target: {activeStudent?.targetGoal} · {activeStudent?.targetCountries}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-indigo-800/80">
            <span className="text-xs text-indigo-200 font-semibold">Switch Student:</span>
            <select
              value={activeStudentId}
              onChange={(e) => switchActiveStudent(e.target.value)}
              className="px-3 py-1 rounded-lg bg-indigo-950 text-white text-xs font-bold border border-indigo-600 focus:outline-none cursor-pointer"
            >
              {(allStudentsList || []).map(s => (
                <option key={s.studentId || s.id} value={s.studentId || s.id}>
                  👤 {s.fullName || s.name} ({s.targetGoal ? s.targetGoal.split('/')[0] : 'Student'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subscription Tier 1 Access Guard */}
        {!isAccessGranted ? (
          <div className="p-8 max-w-4xl mx-auto my-8 bg-white rounded-3xl border border-amber-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 uppercase tracking-wider">
                Tier 1: Free Marketplace Directory Only
              </span>
              <h2 className="text-2xl font-black text-slate-900">Unlock Full Counsellor Portal Access</h2>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your profile is active on the public directory! Upgrade to <strong>Pro Tier ($49/mo)</strong> to manage student intakes, build tabular roadmaps, assign psychometric tests, and dispatch recommendations.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => upgradeCounsellorTier(counsellorProfile?.id || 'counsellor_01', 'PRO')}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro Tier ($49/mo or ₹3,999/mo)
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex-1">
            {children}
          </div>
        )}
      </main>

      {/* Support Ticket Modal */}
      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        userRole="COUNSELLOR"
        userName={counsellorProfile?.fullName || 'Arti Sood'}
        userEmail={counsellorProfile?.contact?.email || 'arti.sood@careerguide.com'}
      />
    </div>
  );
};
