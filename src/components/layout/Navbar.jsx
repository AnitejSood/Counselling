import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MatchEdLogo } from '../common/MatchEdLogo';
import { 
  Users, 
  Menu, 
  X, 
  Sparkles,
  User,
  ShieldCheck,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Home as HomeIcon,
  Compass,
  BookOpen,
  Mail,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isStudent, isCounsellor, isAdmin, switchRole, currentUser } = useAuth();
  const { platformConfig } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mainNavLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Explore Counsellors', path: '/explore', icon: Compass },
    { name: 'Top Scholars & Add-ons', path: '/explore?tab=scholars', icon: GraduationCap, highlight: true },
    { name: 'Apply as Counsellor', path: '/apply-counsellor', icon: Briefcase },
    { name: 'Resources Hub', path: '/resources', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav transition-all font-sans">
        
        {/* Perspective Switcher & Trust Bar */}
        <div className="bg-[#07192F] text-slate-300 text-[11px] py-1.5 px-3 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800/90">
          <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            
            {/* Left: Brand & Trust Guarantee */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFA25E]/20 text-[#CFA25E] border border-[#CFA25E]/30 shrink-0">
                <Sparkles className="w-3 h-3 mr-1 text-[#CFA25E]" /> {platformConfig?.companyName || "matchEd"}
              </span>
              <span className="hidden lg:inline text-slate-400 text-[11px] shrink-0">
                Precision Mentor Matching · 1st Free Discovery Call · 1-Month Switch Guarantee
              </span>
            </div>
            
            {/* Right: Demo Role Switcher */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="text-[10px] text-slate-400 font-medium mr-1 hidden md:inline">Demo Switcher:</span>
              
              <button 
                onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
                className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                  isStudent ? 'bg-[#0B2545] text-white shadow-xs ring-1 ring-[#CFA25E]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Switch to Student Portal"
              >
                <User className="w-3 h-3 text-[#CFA25E]" />
                <span className="hidden sm:inline">Student View</span>
                <span className="sm:hidden">Student</span>
              </button>

              <button 
                onClick={() => { switchRole('COUNSELLOR'); navigate('/counsellor'); }}
                className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                  isCounsellor ? 'bg-emerald-700 text-white shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Switch to Counsellor Portal"
              >
                <Briefcase className="w-3 h-3" />
                <span className="hidden sm:inline">Counsellor View</span>
                <span className="sm:hidden">Counsellor</span>
              </button>

              <button 
                onClick={() => { switchRole('ADMIN'); navigate('/admin'); }}
                className={`px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shrink-0 ${
                  isAdmin ? 'bg-purple-700 text-white shadow-xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Switch to Admin Console"
              >
                <ShieldCheck className="w-3 h-3" />
                <span className="hidden sm:inline">Admin View</span>
                <span className="sm:hidden">Admin</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Navbar */}
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Left: matchEd Logo (Protected from shrinking) */}
            <div className="flex items-center gap-4 shrink-0">
              <MatchEdLogo size="md" />
            </div>

            {/* Desktop Nav Links (Visible only on XL+ to prevent cramped overlap on medium/resized screens) */}
            <nav className="hidden xl:flex items-center gap-2 2xl:gap-5 shrink-0">
              {mainNavLinks.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' && !location.search
                  : link.path.includes('?') 
                    ? location.pathname === link.path.split('?')[0] && location.search.includes(link.path.split('?')[1])
                    : location.pathname === link.path && !location.search.includes('tab=scholars');

                if (link.highlight) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-xs font-bold transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shrink-0 whitespace-nowrap ${
                        isActive 
                          ? 'bg-[#CFA25E] text-[#0B2545] border-[#CFA25E] shadow-sm' 
                          : 'text-[#0B2545] bg-[#FDF8EE] border-[#EBD6B0] hover:bg-[#F9EDD6]'
                      }`}
                    >
                      <GraduationCap className={`w-3.5 h-3.5 ${isActive ? 'text-[#0B2545]' : 'text-[#CFA25E]'}`} />
                      <span>{link.name}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs font-bold transition-all px-2.5 py-1.5 rounded-lg shrink-0 whitespace-nowrap hover:text-[#0B2545] hover:bg-slate-100/80 ${
                      isActive 
                        ? 'text-[#0B2545] bg-slate-100 font-extrabold shadow-2xs' 
                        : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Desktop Actions (XL+) — common login for all roles */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigate('/login?role=COUNSELLOR')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition flex items-center gap-1.5 shadow-2xs cursor-pointer shrink-0 whitespace-nowrap"
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                <span>Advisor Login</span>
              </button>

              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E68] transition flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-[#CFA25E]" />
                <span>Sign In</span>
              </button>
            </div>

            {/* Medium / Tablet view actions (< XL & >= MD) */}
            <div className="hidden md:flex xl:hidden items-center gap-2.5 shrink-0">
              <button
                onClick={() => navigate('/login')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E68] transition flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
              >
                <User className="w-3.5 h-3.5 text-[#CFA25E]" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
                <span className="text-xs">Menu</span>
              </button>
            </div>

            {/* Mobile menu trigger (< MD) */}
            <div className="md:hidden flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate('/login')}
                className="p-2 rounded-xl text-white bg-[#0B2545] hover:bg-[#133E68] transition flex items-center justify-center cursor-pointer shadow-xs"
                title="Sign In"
              >
                <User className="w-4 h-4 text-[#CFA25E]" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition focus:outline-none cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Modern Slide-Over Drawer for Mobile & Resized Screens */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <MatchEdLogo size="md" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer"
                aria-label="Close Navigation Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6">
              
              {/* Role Switcher Widget */}
              <div className="bg-[#07192F] text-white p-3.5 rounded-2xl border border-slate-800 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#CFA25E] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#CFA25E]" /> Demo Perspective
                  </span>
                  <span className="text-[9px] text-slate-400">Interactive Portal Roles</span>
                </div>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); setMobileMenuOpen(false); }}
                    className={`p-2 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                      isStudent ? 'bg-[#0B2545] text-white ring-1 ring-[#CFA25E] shadow-sm' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <User className="w-4 h-4 text-[#CFA25E]" />
                    <span className="text-[10px]">Student</span>
                  </button>

                  <button
                    onClick={() => { switchRole('COUNSELLOR'); navigate('/counsellor'); setMobileMenuOpen(false); }}
                    className={`p-2 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                      isCounsellor ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span className="text-[10px]">Counsellor</span>
                  </button>

                  <button
                    onClick={() => { switchRole('ADMIN'); navigate('/admin'); setMobileMenuOpen(false); }}
                    className={`p-2 rounded-xl text-center text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                      isAdmin ? 'bg-purple-700 text-white shadow-sm' : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px]">Admin</span>
                  </button>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">Navigation</p>
                <div className="space-y-1">
                  {mainNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = link.path === '/' 
                      ? location.pathname === '/' && !location.search
                      : link.path.includes('?') 
                        ? location.pathname === link.path.split('?')[0] && location.search.includes(link.path.split('?')[1])
                        : location.pathname === link.path && !location.search.includes('tab=scholars');

                    if (link.highlight) {
                      return (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold transition ${
                            isActive 
                              ? 'bg-[#CFA25E] text-[#0B2545] border-[#CFA25E] shadow-sm' 
                              : 'bg-[#FDF8EE] text-[#0B2545] border-[#EBD6B0] hover:bg-[#F9EDD6]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/80 text-[#CFA25E] shadow-2xs">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <span>{link.name}</span>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#0B2545] text-white font-extrabold uppercase">
                            Featured
                          </span>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition ${
                          isActive 
                            ? 'bg-slate-100 text-[#0B2545] font-bold' 
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B2545]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#CFA25E]' : 'text-slate-400'}`} />
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Common login — pick student / counsellor / admin on the login page */}
              <div className="pt-2 space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-1">Account Access</p>
                <button
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0B2545] text-white font-bold text-xs hover:bg-[#133E68] transition shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#CFA25E]" />
                    <span>Sign In (Student / Advisor / Admin)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

            </div>

            {/* Drawer Footer / Trust Guarantee */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#CFA25E] shrink-0" />
                <span>1-Month Switch Guarantee · 100% Escrow Protected</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
