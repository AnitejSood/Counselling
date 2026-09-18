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
import { TopScholarsAddonsSection } from '../../components/common/TopScholarsAddonsSection';
import { PartnerAdsBanner } from '../../components/common/PartnerAdsBanner';

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

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B2545] text-white pt-16 pb-24 border-b border-white/10">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-25">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#CFA25E] rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-[#CFA25E]/50 text-amber-200 text-xs font-extrabold mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-[#CFA25E] animate-pulse" />
              <span>matchEd Guarantee · 1-Month Switch Window · 100% Free Discovery Calls</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Connect With Verified Counsellors <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#CFA25E] to-amber-400">On a Single Platform</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg">
              Compare verified placement records, starting package rates, and authentic student reviews. Backed by platform escrow and our signature <strong>1-Month Counsellor Switch Guarantee</strong> (₹0 extra for same price).
            </p>
          </div>

          {/* Dual Call To Actions for Counsellors & Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#CFA25E] font-bold uppercase tracking-wider block">For Students</span>
                <h4 className="font-bold text-white text-base">Find Your Mentor</h4>
                <p className="text-xs text-slate-300">1-month switch window & free discovery</p>
              </div>
              <Link
                to="/explore"
                className="px-4 py-2.5 bg-[#CFA25E] hover:bg-amber-400 text-[#0B2545] rounded-xl text-xs font-bold shadow-md whitespace-nowrap"
              >
                Browse Mentors
              </Link>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">For Counsellors</span>
                <h4 className="font-bold text-white text-base">Counsellor Portal</h4>
                <p className="text-xs text-slate-300">Join directory or unlock Pro workspace</p>
              </div>
              <Link
                to="/counsellor"
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 shadow-md whitespace-nowrap"
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
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Destination</label>
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
              <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Track & Specialty</label>
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
              className="bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-sm py-3 px-6 rounded-2xl shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#CFA25E]" />
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

      {/* Top University Scholars & Quick Doubt Solving Add-ons Section */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-amber-50/40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TopScholarsAddonsSection />
        </div>
      </section>

      {/* Value Proposition Banners */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-amber-50 text-[#0B2545] rounded-2xl flex items-center justify-center font-bold border border-amber-200">
              <ShieldCheck className="w-6 h-6 text-[#0B2545]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">1-Month Switch Guarantee</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Up to 1 month (30 days) from onboarding to change counsellors up to 3 times. Same price = ₹0 extra; pay difference if higher; no refund if lower.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center font-bold border border-emerald-200">
              <Gift className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Free Discovery Calls</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule a 15-minute 1-on-1 strategy call at ₹0 before purchasing packages to confirm mentorship fit with zero financial obligation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center font-bold border border-indigo-200">
              <BadgeCheck className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Audited Offer Letters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every placement record displayed is audited by matchEd against actual admissions letters. No inflated claims or unverified stats.
            </p>
          </div>

        </div>
      </section>

      {/* Partner Ads Banner (Travel, IELTS, TOEFL) */}
      <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerAdsBanner />
      </section>

      {/* Directory Grid Preview */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs text-[#0B2545] font-bold uppercase tracking-wider">Top Counsellors</span>
              <h2 className="text-2xl font-black text-slate-900">Verified Marketplace Directory</h2>
            </div>
            <Link to="/explore" className="text-xs font-bold text-[#0B2545] hover:underline flex items-center gap-1">
              Explore all counsellors <ChevronRight className="w-4 h-4 text-[#CFA25E]" />
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
