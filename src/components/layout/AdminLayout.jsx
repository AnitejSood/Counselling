import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MatchEdLogo } from '../common/MatchEdLogo';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  ShieldCheck,
  DollarSign,
  Zap,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Crown,
  Headphones,
  FileText,
  Radio
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout, switchRole } = useAuth();
  const { verificationApps, escrowBookings, usersList } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.role && currentUser.role !== 'ADMIN') {
      switchRole('ADMIN');
    }
  }, [currentUser?.role]);

  const [adminRole, setAdminRole] = useState(() => {
    return localStorage.getItem('matched_admin_role') || 'SUPER_ADMIN';
  });

  const handleRoleToggle = (role) => {
    setAdminRole(role);
    localStorage.setItem('matched_admin_role', role);
  };

  const pendingApps = (verificationApps || []).filter(a => a.status === 'PENDING_REVIEW').length;
  const pendingVerifications = (verificationApps || []).filter(a => a.status === 'PENDING_REVIEW').length;
  const activeEscrowPending = (escrowBookings || []).filter(b => b.escrowStatus === 'HELD_IN_ESCROW').length;

  const superAdminNav = [
    { name: 'Dashboard & Control', path: '/admin', icon: LayoutDashboard },
    { name: 'Counsellor Applications', path: '/admin/counsellor-applications', icon: FileText, badge: pendingApps > 0 ? `${pendingApps} New` : null },
    { name: 'Verification & Credentials', path: '/admin/verifications', icon: ShieldCheck, badge: pendingVerifications > 0 ? `${pendingVerifications} Pending` : null },
    { name: 'Escrow & Billing Ledger', path: '/admin/billing', icon: DollarSign, badge: activeEscrowPending > 0 ? `${activeEscrowPending} Escrow` : null },
    { name: 'User Management', path: '/admin/students', icon: Users, badge: `${usersList.length}` },
    { name: 'Appointments Ledger', path: '/admin/appointments', icon: Calendar },
    { name: 'Counsellor Boost Manager', path: '/admin/boosts', icon: Zap },
    { name: 'Support & Broadcasts', path: '/admin/messages', icon: MessageSquare },
    { name: 'System Settings', path: '/admin/settings', icon: Settings }
  ];

  const supportOfficerNav = [
    { name: 'Support Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Counsellor Applications', path: '/admin/counsellor-applications', icon: FileText, badge: pendingApps > 0 ? `${pendingApps} New` : null },
    { name: 'Verification & Audit', path: '/admin/verifications', icon: ShieldCheck, badge: pendingVerifications > 0 ? `${pendingVerifications} Pending` : null },
    { name: 'User Directory', path: '/admin/students', icon: Users, badge: `${usersList.length}` },
    { name: 'Appointments Ledger', path: '/admin/appointments', icon: Calendar },
    { name: 'Support & Broadcasts', path: '/admin/messages', icon: MessageSquare },
  ];

  const adminNavItems = adminRole === 'SUPER_ADMIN' ? superAdminNav : supportOfficerNav;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0B2545] text-white px-4 py-3 flex justify-between items-center sticky top-0 z-40 border-b border-slate-800">
        <MatchEdLogo variant="light" size="sm" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside className={`
        fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-[#0B2545] text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Top Admin Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <MatchEdLogo variant="light" size="md" />
          </div>

          {/* Role Mode Switcher Widget */}
          <div className="mx-3 my-3 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#CFA25E] to-amber-200 flex items-center justify-center text-[#0B2545] font-extrabold text-xs shadow-xs">
                {adminRole === 'SUPER_ADMIN' ? <Crown className="w-4 h-4 text-[#0B2545]" /> : <Headphones className="w-4 h-4 text-[#0B2545]" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {adminRole === 'SUPER_ADMIN' ? 'Super Admin' : 'Support Officer'}
                </p>
                <p className="text-[10px] text-amber-300 truncate">
                  {adminRole === 'SUPER_ADMIN' ? 'Finances & Full System' : 'Intake & Verification'}
                </p>
              </div>
            </div>

            {/* Switch Pills */}
            <div className="grid grid-cols-2 gap-1 bg-black/30 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleRoleToggle('SUPER_ADMIN')}
                className={`py-1 text-[10px] font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                  adminRole === 'SUPER_ADMIN' ? 'bg-[#CFA25E] text-[#0B2545] shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Crown className="w-3 h-3" />
                <span>Super</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('SUPPORT_OFFICER')}
                className={`py-1 text-[10px] font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                  adminRole === 'SUPPORT_OFFICER' ? 'bg-[#CFA25E] text-[#0B2545] shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Headphones className="w-3 h-3" />
                <span>Staff</span>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)] pt-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all
                    ${isActive
                      ? 'bg-[#CFA25E] text-[#0B2545] font-bold shadow-sm shadow-[#CFA25E]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B2545]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#0B2545]/20 text-[#0B2545]' : 'bg-amber-900/60 text-amber-200 border border-amber-700/50'
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
            onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 text-amber-200 border border-amber-400/20 text-xs font-semibold hover:bg-white/15 transition cursor-pointer"
          >
            <span>View as Student</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out Control Desk</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">
        {/* Global Admin Header */}
        <header className="hidden md:flex bg-white border-b border-slate-200 px-8 py-4 justify-between items-center sticky top-0 z-30 shadow-2xs">
          <div>
            <span className="text-xs text-[#0B2545] font-bold uppercase tracking-wider">matchEd Corporate Oversight</span>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-[#0B2545]">
                Platform Executive Control Desk
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                adminRole === 'SUPER_ADMIN' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-sky-50 text-sky-900 border-sky-300'
              }`}>
                {adminRole === 'SUPER_ADMIN' ? 'Super Admin Mode' : 'Support Officer Mode'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Quick Mode Toggle in Header */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => handleRoleToggle('SUPER_ADMIN')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  adminRole === 'SUPER_ADMIN' ? 'bg-[#0B2545] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Crown className="w-3 h-3 text-[#CFA25E]" /> Super Admin
              </button>
              <button
                onClick={() => handleRoleToggle('SUPPORT_OFFICER')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  adminRole === 'SUPPORT_OFFICER' ? 'bg-[#0B2545] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Headphones className="w-3 h-3 text-[#CFA25E]" /> Staff Officer
              </button>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Escrow Engine Active
            </span>
            <button
              onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
            >
              Student View
            </button>
          </div>
        </header>

        {/* Page Container */}
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

