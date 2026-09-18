import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Check, 
  Globe, 
  ArrowRight, 
  MessageSquare, 
  Info,
  Award,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CounsellorProfile = () => {
  const { id } = useParams();
  const { counsellors, reviews, counsellorServices } = useData();

  // Find counsellor by URL param or default to Arti Sood
  const counsellor = counsellors.find(c => c.id === id) || counsellors[0];
  const counsellorReviews = reviews.filter(r => r.counsellorId === counsellor.id);

  const [reviewFilterTrack, setReviewFilterTrack] = useState('ALL');
  const [showTooltip, setShowTooltip] = useState(false);

  const filteredReviews = reviewFilterTrack === 'ALL' 
    ? counsellorReviews 
    : counsellorReviews.filter(r => r.track === reviewFilterTrack);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/explore" className="hover:text-indigo-600">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-bold">{counsellor.fullName}</span>
        </div>

        {/* Profile Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Photo & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative">
                <img 
                  src={counsellor.photoUrl} 
                  alt={counsellor.fullName}
                  className="w-28 h-28 rounded-3xl object-cover ring-4 ring-amber-100 shadow-lg border-2 border-[#CFA25E]" 
                />
                {counsellor.hasBlueTick && (
                  <span className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                    <UserCheck className="w-5 h-5 text-sky-600 fill-sky-100" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] flex items-center gap-2">
                    {counsellor.fullName}
                    {counsellor.hasBlueTick && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-300">
                        Blue Tick Verified
                      </span>
                    )}
                  </h1>
                  {counsellor.verificationStatus === 'VERIFIED' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                      Verified Platform Strategist
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-[#0B2545] mb-2">{counsellor.title}</p>
                <p className="text-xs text-slate-600 max-w-2xl mb-4 leading-relaxed">{counsellor.credentials}</p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {counsellor.rating}
                    <span className="text-slate-400 font-normal">({counsellor.reviewCount} reviews)</span>
                  </span>
                  <span>•</span>
                  <span>{counsellor.experienceYears} Years Experience</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#CFA25E]" />
                    Response time: {counsellor.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Booking CTA Card */}
            <div className="w-full md:w-auto bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center min-w-[280px]">
              <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Transparent Pricing</span>
              <div className="text-3xl font-extrabold text-[#0B2545] mb-0.5">
                ₹{counsellor.pricePerSession.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-500 font-semibold block mb-4">Starting rate per package</span>

              <div className="space-y-2">
                <Link 
                  to={`/book?counsellorId=${counsellor.id}`}
                  className="w-full bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Book Full Package (Escrow)
                  <ArrowRight className="w-4 h-4 text-[#CFA25E]" />
                </Link>

                <Link 
                  to={`/book?counsellorId=${counsellor.id}&type=free`}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Book 15-Min Free Discovery Call
                </Link>
              </div>

              <span className="block text-[10px] text-slate-400 mt-2">1-Month Switch Guarantee included</span>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Bio, Verified Outcome Tooltip, Services, Filterable Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About & Verified Outcome Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">About {counsellor.fullName}</h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">{counsellor.bio}</p>

              {/* Verified Placement Badge with Tooltip from User Flow Spec */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-5 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-base">
                          {counsellor.verifiedPlacementsCount}+ Verified Placements
                        </span>
                        <button 
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          onClick={() => setShowTooltip(!showTooltip)}
                          className="text-slate-400 hover:text-emerald-700 cursor-pointer"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-emerald-800 font-medium">Verified by official university offer letters</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Audited Metric
                  </span>
                </div>

                {/* How this is calculated Tooltip */}
                {showTooltip && (
                  <div className="mt-3 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl border border-slate-700 animate-in fade-in duration-200">
                    <strong>How this is calculated:</strong> Only student admissions verified through submitted university offer letters or verified student portal receipts count towards this public seal.
                  </div>
                )}
              </div>
            </div>

            {/* Complete Services & Fixed Pricing List */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Services & Transparent Fixed Pricing</h2>
              <div className="space-y-4">
                {(counsellorServices || counsellor.services).map(srv => (
                  <div key={srv.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase inline-block mb-1">
                        {srv.duration || 'Package'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mb-1">{srv.title}</h3>
                      <p className="text-xs text-slate-600 mb-2">{srv.description || srv.desc}</p>
                      {(srv.features || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {srv.features.map((f, i) => (
                            <span key={i} className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-semibold">
                        ✓ No hidden agency fees
                      </span>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <div className="text-lg font-extrabold text-slate-900">₹{srv.price.toLocaleString('en-IN')}</div>
                      <Link 
                        to={`/book?counsellorId=${counsellor.id}&serviceId=${srv.id}`}
                        className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-1"
                      >
                        Select Service <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filterable Review History (User Flow Spec: Track-specific filtering & Right-of-Reply) */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Student Reviews & Outcomes</h2>
                  <p className="text-xs text-slate-500">Only students who booked and paid through the platform can review</p>
                </div>

                {/* Track Filter */}
                <select 
                  value={reviewFilterTrack}
                  onChange={(e) => setReviewFilterTrack(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none"
                >
                  <option value="ALL">All Tracks ({counsellorReviews.length})</option>
                  <option value="Study abroad admissions">Study abroad admissions</option>
                  <option value="International athletic scholarships">Athletic Scholarships</option>
                  <option value="Domestic India admissions">Domestic India</option>
                </select>
              </div>

              {/* Review Feed */}
              <div className="space-y-6">
                {filteredReviews.map(rev => (
                  <div key={rev.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{rev.studentName}</span>
                        {rev.outcomeVerified && (
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified Admit
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 mb-3 leading-relaxed">{rev.content}</p>

                    {/* Track-specific review tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {rev.tags.map((t, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Verified Outcome Note */}
                    {rev.outcomeText && (
                      <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl px-3 py-2 text-xs font-semibold text-indigo-900 mb-3">
                        🎓 Outcome: {rev.outcomeText}
                      </div>
                    )}

                    {/* Counsellor Right-of-Reply */}
                    {rev.counsellorReply && (
                      <div className="bg-slate-50 border-l-2 border-indigo-600 p-3 rounded-r-xl ml-4 text-xs">
                        <span className="font-bold text-slate-900 block mb-1">{counsellor.fullName} (Counsellor Response):</span>
                        <p className="text-slate-600">{rev.counsellorReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Specialisation Details & Calendar Availability Preview */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Qualifications & Memberships</h3>
              <div className="space-y-2.5 text-xs text-slate-700">
                {counsellor.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-4">Specialisations</h3>
              <div className="flex flex-wrap gap-2">
                {counsellor.specialisations.map((s, idx) => (
                  <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-xl border border-indigo-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800">
              <h3 className="font-bold text-base mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Live Calendar Preview
              </h3>
              <p className="text-xs text-slate-300 mb-4">Next available session slots:</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">Thu, 11:00 AM</div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">Thu, 02:00 PM</div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">Fri, 10:00 AM</div>
                <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">Fri, 04:30 PM</div>
              </div>
              <Link 
                to={`/book?counsellorId=${counsellor.id}`}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                Pick Time & Book Session
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
