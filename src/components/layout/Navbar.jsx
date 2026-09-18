import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MatchEdLogo } from '../common/MatchEdLogo';
import { NotificationBellPopup } from '../common/NotificationBellPopup';
import { 
  Users, 
  Menu, 
  X, 
  Sparkles,
  User,
  ShieldCheck,
  Briefcase,
  ExternalLink,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isStudent, isCounsellor, isAdmin, logout, switchRole, currentUser, isAuthenticated } = useAuth();
  const { platformConfig } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Counsellors', path: '/explore' },
    { name: 'Top Scholars & Add-ons', path: '/explore?tab=scholars', highlight: true },
    { name: 'Apply as Counsellor', path: '/apply-counsellor' },
    { name: 'Resources Hub', path: '/resources' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all font-sans">
      
      {/* Perspective Switcher & Trust Bar */}
      <div className="bg-[#07192F] text-slate-300 text-[11px] py-1.5 px-4 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#CFA25E]/20 text-[#CFA25E] border border-[#CFA25E]/30">
            <Sparkles className="w-3 h-3 mr-1 text-[#CFA25E]" /> {platformConfig?.companyName || "matchEd"}
          </span>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Precision Mentor Matching · 1st Free Discovery Call · 1-Month Switch Guarantee
          </span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 font-medium mr-1 hidden md:inline">Demo Switcher:</span>
          <button 
            onClick={() => { switchRole('STUDENT'); navigate('/dashboard'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isStudent ? 'bg-[#0B2545] text-white shadow-sm ring-1 ring-[#CFA25E]' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <User className="w-3 h-3 text-[#CFA25E]" />
            Student View
          </button>
          <button 
            onClick={() => { switchRole('COUNSELLOR'); navigate('/counsellor'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isCounsellor ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Briefcase className="w-3 h-3" />
            Counsellor View
          </button>
          <button 
            onClick={() => { switchRole('ADMIN'); navigate('/admin'); }}
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${isAdmin ? 'bg-purple-700 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <ShieldCheck className="w-3 h-3" />
            Admin View
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* matchEd Logo */}
          <div className="flex items-center gap-4">
            <MatchEdLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.includes('?') && location.pathname + location.search === link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold transition-colors hover:text-[#0B2545] flex items-center gap-1 ${
                    isActive ? 'text-[#0B2545] border-b-2 border-[#CFA25E] pb-1' : 'text-slate-600'
                  } ${link.highlight ? 'text-[#0B2545] bg-[#FDF8EE] px-2.5 py-1 rounded-xl border border-[#EBD6B0]' : ''}`}
                >
                  {link.highlight && <GraduationCap className="w-3.5 h-3.5 text-[#CFA25E]" />}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Notifications Bell & Portals */}
          <div className="hidden md:flex items-center gap-3">
            <NotificationBellPopup theme="light" />

            <Link
              to="/counsellor"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Counsellor Portal
            </Link>

            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B2545] hover:bg-[#133E68] transition flex items-center gap-1.5 shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-[#CFA25E]" />
              Student Portal
            </Link>
          </div>

          {/* Mobile menu and bell */}
          <div className="md:hidden flex items-center gap-2">
            <NotificationBellPopup theme="light" />

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
              Counsellor Portal
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B2545]"
            >
              Student Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
