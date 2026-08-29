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
  Zap
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
  const [searchBudget, setSearchBudget] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination) params.set('destination', searchDestination);
    if (searchTrack) params.set('track', searchTrack);
    if (searchBudget) params.set('budget', searchBudget);
    navigate(`/explore?${params.toString()}`);
  };

  const tracksPills = [
    { name: "Study abroad admissions", icon: Globe, count: "120+ Counsellors" },
    { name: "Domestic India admissions", icon: GraduationCap, count: "80+ Counsellors" },
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              The Verified Counsellor Marketplace
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Find a Counsellor That <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-400">Actually Fits</span> Your Situation
            </h1>

            <p className="text-slate-300 text-base sm:text-lg">
              Compare verified placement outcomes, transparent fixed rates, and student reviews. Protected by platform escrow payment holding.
            </p>
          </div>

          {/* Student Step 1: Discover & Search Form */}
          <form 
            onSubmit={handleHeroSearch}
            className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl max-w-4xl mx-auto border border-slate-200 text-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3"
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
                <option value="New Zealand">New Zealand</option>
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
                <option value="">All Tracks</option>
                <option value="Study abroad admissions">Study abroad admissions</option>
                <option value="Domestic India admissions">Domestic India admissions</option>
                <option value="Sports quota admissions">Sports quota admissions</option>
                <option value="International athletic scholarships">International athletic scholarships</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Budget / Session</label>
              <select 
                value={searchBudget}
                onChange={(e) => setSearchBudget(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="">Any Budget</option>
                <option value="Under ₹15,000/session">Under ₹15,000</option>
                <option value="₹15,000–25,000">₹15,000–25,000</option>
                <option value="₹25,000+">₹25,000+</option>
              </select>
            </div>

            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl py-3 px-6 shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Search Marketplace
            </button>
          </form>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {tracksPills.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(`/explore?track=${encodeURIComponent(item.name)}`)}
                  className="bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl px-4 py-2.5 text-xs font-semibold flex items-center gap-2.5 transition-all hover:scale-105"
                >
                  <IconComponent className="w-4 h-4 text-indigo-400" />
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full">{item.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3 Core Trust Layer Pillars */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Escrow Protected Payments</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Funds stay safely in platform escrow and are only released to the counsellor after your session is completed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">100% Verified Outcomes</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Placement stats require audited offer letters before counting toward a counsellor's public verified seal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-200">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Unbiased Side-by-Side Compare</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compare up to 3 counsellors simultaneously across verified outcomes, price per service, and track reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Boosted Partners & Counsellors Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Boosted Partners Carousel */}
        <HeroBoostCarousel />

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">Top Verified Advisors</span>
            <h2 className="text-3xl font-extrabold text-slate-900">All Featured Counsellors</h2>
          </div>
          <Link 
            to="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition"
          >
            View All Marketplace Counsellors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counsellors.slice(0, 3).map(counsellor => (
            <CounsellorCard key={counsellor.id} counsellor={counsellor} />
          ))}
        </div>
      </section>

      {/* Dual CTA Section for Students & Counsellors */}
      <section className="py-16 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-indigo-900/60 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 mb-4">
                  <Users className="w-3.5 h-3.5" /> For Students & Parents
                </span>
                <h3 className="text-2xl font-bold mb-3">Ready to find your ideal counsellor?</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Search across verified tracks, compare side-by-side, and book with zero risk using escrow payment holding.
                </p>
              </div>
              <Link 
                to="/explore"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all w-fit"
              >
                Browse Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-emerald-950/60 p-8 rounded-3xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> For Independent Counsellors
                </span>
                <h3 className="text-2xl font-bold mb-3">Are you a high-performing counsellor?</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Join the marketplace, showcase your verified student outcomes, manage student pipelines, and get paid securely.
                </p>
              </div>
              <Link 
                to="/apply-counsellor"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all w-fit"
              >
                Apply & Get Verified
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CompareDrawer />
    </div>
  );
};
