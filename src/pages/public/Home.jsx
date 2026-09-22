import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  Briefcase,
  BadgeCheck,
  ChevronRight,
  Clock,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CounsellorCard } from '../../components/common/CounsellorCard';
import { CompareDrawer } from '../../components/common/CompareDrawer';

export const Home = () => {
  const navigate = useNavigate();
  const { counsellors, peerMentors } = useData();

  const [searchDestination, setSearchDestination] = useState('');
  const [searchTrack, setSearchTrack] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDestination) params.set('destination', searchDestination);
    if (searchTrack) params.set('track', searchTrack);
    navigate(`/explore?${params.toString()}`);
  };

  const handleQuickTagSearch = (dest, trk) => {
    const params = new URLSearchParams();
    if (dest) params.set('destination', dest);
    if (trk) params.set('track', trk);
    navigate(`/explore?${params.toString()}`);
  };

  // Curate top counsellors for spotlight
  const featuredCounsellors = counsellors.slice(0, 3);
  const featuredScholars = (peerMentors || []).slice(0, 3);

  return (
    <div className="bg-[#FAFBFD] min-h-screen font-sans text-slate-800">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-[#0B2545] text-white">
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-[#CFA25E]/10 blur-[130px]" />
          <div className="absolute bottom-0 right-10 w-[350px] h-[250px] rounded-full bg-blue-600/10 blur-[100px]" />
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-14 sm:pt-20 pb-16 sm:pb-24">
          
          {/* Header Copy */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#CFA25E]/30 text-[11px] font-semibold text-amber-200 mb-4 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" />
              <span>Marketplace FOR Verified Admissions & Mentorship</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.15] mb-4">
              Admissions guidance you can{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#CFA25E] to-amber-300">
                actually verify.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Connect with vetted study abroad counsellors and Ivy League & Oxbridge scholars. Every placement audited, milestone escrow protected, with a 30-day switch guarantee.
            </p>
          </div>

          {/* Bespoke Search Console */}
          <div className="max-w-2xl mx-auto">
            <form 
              onSubmit={handleHeroSearch}
              className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-xl border border-white/20 text-slate-800 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-2 sm:gap-2.5 items-center"
            >
              <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors px-3 py-2 rounded-xl border border-slate-200/80">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">
                  Target Destination
                </label>
                <select 
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="">All Destinations</option>
                  <option value="United States">United States</option>
                  <option value="UK & Ireland">UK & Ireland</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Domestic (India)">Domestic (India)</option>
                </select>
              </div>

              <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors px-3 py-2 rounded-xl border border-slate-200/80">
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">
                  Admissions Track
                </label>
                <select 
                  value={searchTrack}
                  onChange={(e) => setSearchTrack(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="">All Tracks</option>
                  <option value="Study abroad admissions">Study Abroad</option>
                  <option value="Domestic India admissions">Domestic India</option>
                  <option value="Sports quota admissions">Sports Quota</option>
                  <option value="International athletic scholarships">Athletic Scholarships</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer sm:self-stretch"
              >
                <Search className="w-3.5 h-3.5 text-[#CFA25E]" />
                <span>Search</span>
              </button>
            </form>

            {/* Trending Quick Search Chips */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap text-[11px]">
              <span className="text-slate-400 font-medium">Popular:</span>
              <button 
                type="button"
                onClick={() => handleQuickTagSearch('United States', 'Study abroad admissions')}
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
              >
                US Ivy League
              </button>
              <button 
                type="button"
                onClick={() => handleQuickTagSearch('UK & Ireland', 'Study abroad admissions')}
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
              >
                Oxford & Cambridge
              </button>
              <button 
                type="button"
                onClick={() => handleQuickTagSearch('', 'Sports quota admissions')}
                className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
              >
                Sports Quota
              </button>
              <Link 
                to="/explore?tab=scholars"
                className="px-2.5 py-0.5 rounded-full bg-[#CFA25E]/20 text-amber-300 hover:bg-[#CFA25E]/30 font-medium transition-colors"
              >
                Top Scholar Add-Ons ✨
              </Link>
            </div>
          </div>

          {/* Hero trust strip — 2×2 on narrow, single row when space allows */}
          <div className="border-t border-white/10 mt-10 pt-6 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-2 text-[10px] sm:text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 min-w-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span className="leading-snug">100% Audited Offer Letters</span>
            </span>
            <span className="flex items-center gap-1.5 min-w-0">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CFA25E] shrink-0" />
              <span className="leading-snug">Milestone Escrow Protection</span>
            </span>
            <span className="flex items-center gap-1.5 min-w-0">
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
              <span className="leading-snug">30-Day Switch Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5 min-w-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span className="leading-snug">Free 15-Min Intro Calls</span>
            </span>
          </div>

        </div>
      </section>


      {/* ─── 2. THE MATCHED STANDARD (TRUST & SAFETY) ─── */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold text-[#CFA25E] uppercase tracking-wider block mb-1">
              Why matchEd Is Different
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Built to protect students, not promote agencies.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Traditional counselling is filled with hidden sales commissions and unverified claims. We built a platform founded on verifiable proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <div className="p-4 rounded-xl bg-[#FAFBFD] border border-slate-200/80 transition-all hover:border-slate-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Audited Placement Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We independently verify past admission letters and student outcomes with university documentation before awarding any verified badge.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-xl bg-[#FAFBFD] border border-slate-200/80 transition-all hover:border-slate-300">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center mb-3">
                <Lock className="w-4 h-4 text-[#CFA25E]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Milestone Escrow Protection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your payment is held safely in matchEd escrow and disbursed gradually as each agreed milestone (shortlist, SOP draft, submission) is delivered.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-xl bg-[#FAFBFD] border border-slate-200/80 transition-all hover:border-slate-300">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center mb-3">
                <RotateCcw className="w-4 h-4 text-[#0B2545]" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                30-Day Switch Guarantee
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Finding the right mentor is deeply personal. If you and your advisor aren't aligned, switch up to 3 times in the first 30 days within your tier at zero cost.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ─── 3. FEATURED VERIFIED COUNSELLORS ─── */}
      <section className="py-14 sm:py-16 bg-[#FAFBFD]">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[11px] font-bold text-[#CFA25E] uppercase tracking-wider block mb-1">
                Verified Directory Spotlight
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Top-Rated Admissions Advisors
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore advisors with verified admits to top US, UK, Canadian, and Indian universities.
              </p>
            </div>

            <Link 
              to="/explore"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2545] hover:text-[#CFA25E] transition-colors self-start sm:self-auto"
            >
              <span>Explore all advisors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredCounsellors.map(counsellor => (
              <CounsellorCard key={counsellor.id} counsellor={counsellor} />
            ))}
          </div>

        </div>
      </section>


      {/* ─── 4. SCHOLAR NETWORK SPOTLIGHT (OXFORD / STANFORD / HARVARD) ─── */}
      <section className="py-14 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FDF8EE] border border-[#EBD6B0] text-[10px] font-bold text-[#0B2545] uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-[#CFA25E]" />
                Top Scholar Mentorship
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Learn directly from recent Oxford, Stanford & Harvard admits.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Need targeted assistance instead of a full package? Book 1-on-1 SOP roasts, technical interview drills, and quick doubt-solving calls starting at ₹799.
              </p>
            </div>

            <Link 
              to="/explore?tab=scholars"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B2545] text-white hover:bg-slate-800 text-xs font-bold transition-all shrink-0 self-start md:self-auto shadow-xs"
            >
              <span>Browse All Scholar Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CFA25E]" />
            </Link>
          </div>

          {/* Scholar Preview Cards — compact directory-style rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredScholars.map(scholar => (
              <div 
                key={scholar.id} 
                className="bg-[#FAFBFD] rounded-xl border border-slate-200 p-3 flex flex-col gap-2.5 hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={scholar.photoUrl} 
                    alt={scholar.fullName} 
                    className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-[#0B2545] transition-colors">
                        {scholar.fullName}
                      </h4>
                      <BadgeCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[10px] font-semibold text-[#0B2545] truncate">{scholar.university}</p>
                    <p className="text-[10px] text-slate-500 truncate">{scholar.degree}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-medium">From</span>
                    <span className="text-xs font-black text-slate-900">₹{scholar.hourlyRate.toLocaleString('en-IN')}</span>
                  </div>

                  <Link 
                    to={`/explore?tab=scholars`}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-[#0B2545] transition shrink-0"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ─── 5. HOW MATCHED WORKS (FRICTIONLESS 3-STEP FLOW) ─── */}
      <section className="py-14 sm:py-16 bg-[#FAFBFD]">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold text-[#CFA25E] uppercase tracking-wider block mb-1">
              How It Works
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              A transparent, stress-free admissions journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="relative">
              <span className="text-3xl font-black text-[#CFA25E]/40 font-mono block mb-2">01</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Explore & Compare Vetted Profiles
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Filter by country, academic discipline, and budget. Review authentic student feedback and audited admit statistics.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <span className="text-3xl font-black text-[#CFA25E]/40 font-mono block mb-2">02</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Book a Free 15-Minute Intro Call
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Connect 1-on-1 with your shortlisted advisor before paying a rupee. Confirm mutual compatibility, communication rhythm, and strategy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <span className="text-3xl font-black text-[#CFA25E]/40 font-mono block mb-2">03</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                Execute with Escrow & Switch Protection
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Collaborate on shortlists, SOPs, and interviews. Payments are released on agreed milestones, backed by our 30-day switch guarantee.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* Floating Compare Drawer */}
      <CompareDrawer />

    </div>
  );
};

export default Home;
