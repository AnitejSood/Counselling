import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  Users, 
  Menu, 
  X, 
  Sparkles,
  User,
  ShieldCheck,
  Briefcase,
  Bell,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { isStudent, isCounsellor, isAdmin, logout, switchRole, currentUser } = useAuth();
  const { platformConfig, notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const unreadNotifs = notifications.filter(n => !n.read);

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Marketplace', path: '/explore' },
    { name: 'Apply as Counsellor', path: '/apply-counsellor' },
    { name: 'Resources Hub', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all">
      
      {/* Demo Perspective Switcher Header Bar */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3 h-3 mr-1 text-indigo-400" /> {platformConfig?.companyName || "AspirantHQ Marketplace"}
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Verified Counsellor & Student Platform Engine
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium mr-1 hidden md:inline">Demo Switcher:</span>
          <button 
            onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isStudent ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <User className="w-3 h-3" />
            Student View
          </button>
          <button 
            onClick={() => { switchRole('COUNSELLOR'); navigate('/counsellor'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isCounsellor ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Briefcase className="w-3 h-3" />
            Counsellor View
          </button>
          <button 
            onClick={() => { switchRole('ADMIN'); navigate('/admin'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isAdmin ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <ShieldCheck className="w-3 h-3" />
            Admin View
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Marketplace Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                Aspirant<span className="text-indigo-600">HQ</span>
              </span>
              <span className="text-[10px] text-indigo-600 font-extrabold tracking-wider uppercase block">
                Verified Counsellor Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors hover:text-indigo-600 ${
                    isActive ? 'text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Role Login Links */}
          <div className="hidden md:flex items-center gap-3">
            {/* Counsellor Portal Login Link */}
            <Link
              to="/counsellor"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Counsellor Portal
            </Link>

            {/* Student Portal */}
            <Link
              to="/dashboard"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-slate-600" />
              Student Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          {mainNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/counsellor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              Counsellor Portal Login
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100"
            >
              Student Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
