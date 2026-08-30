import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  Scale, 
  Lock, 
  Star, 
  ArrowRight, 
  GraduationCap, 
  Globe, 
  Trophy, 
  CheckCircle2, 
  Users,
  Award,
  Sparkles,
  Briefcase,
  Gift,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CounsellorCard } from '../../components/common/CounsellorCard';
import { CompareDrawer } from '../../components/common/CompareDrawer';
import { HeroBoostCarousel } from '../../features/marketplace/components/HeroBoostCarousel';

export const Home = () => {
  const navigate = useNavigate();
  const { counsellors } = useData();

  const [searchDestination, setSearchDestination] = useState('');
  const [searchTrack, setSearchTrack] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination) params.set('destination', searchDestination);
    if (searchTrack) params.set('track', searchTrack);
    navigate(`/explore?${params.toString()}`);
  };

  const tracksPills = [
    { name: "Study abroad admissions", icon: Globe, count: "120+ Verified Mentors" },
    { name: "Domestic India admissions", icon: GraduationCap, count: "80+ Specialists" },
    { name: "Sports quota admissions", icon: Trophy, count: "35+ Specialists" },
    { name: "International athletic scholarships", icon: Award, count: "25+ NCAA Mentors" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 border-b border-slate-800">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              🎉 First 1 Session 100% FREE + 14-Day Money-Back Guarantee
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Connect With Verified Counsellors <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-400">On a Single Platform</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg">
              Compare verified placement records, starting package rates, and student reviews. Protected by platform escrow holding with <strong>1st Session Free & 2-Week 100% Money-Back Guarantee</strong> if not satisfied.
            </p>
          </div>

          {/* Dual Call To Actions for Counsellors & Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">For Students</span>
                <h4 className="font-bold text-white text-base">Book a Counsellor</h4>
                <p className="text-xs text-slate-400">2-week & 3-session trial refund window</p>
              </div>
              <Link
                to="/explore"
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md whitespace-nowrap"
              >
                Browse Advisors
              </Link>
            </div>

            <div className="bg-slate-900/90 border border-emerald-900/50 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">For Counsellors</span>
                <h4 className="font-bold text-white text-base">Counsellor Portal</h4>
                <p className="text-xs text-slate-400">Free directory sign-up or Pro portal</p>
              </div>
              <Link
                to="/counsellor"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md whitespace-nowrap"
              >
                Counsellor Login
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleHeroSearch}
            className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl max-w-3xl mx-auto border border-slate-200 text-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Destination</label>
              <select 
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">All Destinations</option>
                <option value="UK & Ireland">UK & Ireland</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Domestic — India">Domestic — India</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Track & Specialty</label>
              <select 
                value={searchTrack}
                onChange={(e) => setSearchTrack(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">All Specialization Tracks</option>
                <option value="Study abroad admissions">Study Abroad Admissions</option>
                <option value="Domestic India admissions">Domestic India Admissions</option>
                <option value="Sports quota admissions">Sports Quota Admissions</option>
                <option value="International athletic scholarships">Athletic Scholarships</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              <Search className="w-4 h-4" />
              Search Directory
            </button>
          </form>

        </div>
      </section>

      {/* Featured Boosted Counsellors Hero Carousel */}
      <section className="py-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroBoostCarousel />
        </div>
      </section>

      {/* Value Proposition Banners */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Platform Escrow Holding</h3>
            <p className="text-xs text-slate-600">
              Student package fees are held securely in platform escrow and released to counsellors upon milestone progress.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-bold">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">2-Wk / 3-Session Guarantee</h3>
            <p className="text-xs text-slate-600">
              Students receive a 2-week window AND up to 3 sessions to request a refund or switch counsellors if fit isn't right.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Counsellor Subscription Tiers</h3>
            <p className="text-xs text-slate-600">
              Free sign-up for public directory listing. Pro subscription unlocks student intake, roadmaps, and pipeline tools.
            </p>
          </div>

        </div>
      </section>

      {/* Directory Grid Preview */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Top Counsellors</span>
              <h2 className="text-2xl font-black text-slate-900">Verified Marketplace Directory</h2>
            </div>
            <Link to="/explore" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              Explore all counsellors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counsellors.slice(0, 3).map(counsellor => (
              <CounsellorCard key={counsellor.id} counsellor={counsellor} />
            ))}
          </div>
        </div>
      </section>

      {/* Compare Floating Drawer */}
      <CompareDrawer />
    </div>
  );
};
