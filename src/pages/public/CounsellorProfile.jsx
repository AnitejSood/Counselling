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
  UserCheck,
  Sparkles,
  CheckCircle2
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
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link to="/" className="hover:text-[#0B2545] transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/explore" className="hover:text-[#0B2545] transition">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0B2545] font-bold">{counsellor.fullName}</span>
        </div>

        {/* Profile Banner Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/90 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Photo & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative shrink-0">
                <img 
                  src={counsellor.photoUrl} 
                  alt={counsellor.fullName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-[#FDF8EE] shadow-md border-2 border-[#CFA25E]" 
                />
                {counsellor.hasBlueTick && (
                  <span className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md" title="Blue Tick Verified">
                    <UserCheck className="w-5 h-5 text-sky-600 fill-sky-100" />
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#0B2545] flex items-center gap-2">
                    {counsellor.fullName}
                    {counsellor.hasBlueTick && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        Blue Tick Verified
                      </span>
                    )}
                  </h1>
                  {counsellor.verificationStatus === 'VERIFIED' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-0.5 rounded-full">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Verified Platform Strategist
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#0B2545] mb-1.5">{counsellor.title}</p>
                <p className="text-xs text-slate-600 max-w-2xl mb-3 leading-relaxed">{counsellor.credentials}</p>

                <div className="flex items-center gap-3 text-xs font-medium text-slate-600 flex-wrap">
                  <span className="flex items-center gap-1 font-bold text-slate-900">
                    <Star className="w-4 h-4 fill-[#CFA25E] text-[#CFA25E]" />
                    {counsellor.rating}
                    <span className="text-slate-400 font-normal">({counsellor.reviewCount} reviews)</span>
                  </span>
                  <span>•</span>
                  <span>{counsellor.experienceYears} Years Experience</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-700 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#CFA25E]" />
                    Average response: {counsellor.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Booking CTA Card */}
            <div className="w-full md:w-auto bg-[#FDF8EE]/60 border border-[#EBD6B0] rounded-2xl p-5 text-center min-w-[280px] shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-1">Transparent Pricing</span>
              <div className="text-2xl sm:text-3xl font-black text-[#0B2545] mb-0.5">
                ₹{counsellor.pricePerSession.toLocaleString('en-IN')}
              </div>
              <span className="text-xs text-slate-500 font-medium block mb-4">Starting rate per package</span>

              <div className="space-y-2">
                <Link 
                  to={`/book?counsellorId=${counsellor.id}`}
                  className="w-full bg-[#0B2545] hover:bg-[#133E68] text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Book Package with Escrow</span>
                  <ArrowRight className="w-4 h-4 text-[#CFA25E]" />
                </Link>

                <Link 
                  to={`/book?counsellorId=${counsellor.id}&type=free`}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Book Free 15-Min Discovery Call</span>
                </Link>
              </div>

              <span className="block text-[10px] text-slate-500 mt-2">1-Month Switch Guarantee included</span>
            </div>

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Columns: Bio, Verified Outcome Tooltip, Services, Filterable Reviews */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About & Verified Outcome Card */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/90">
              <h2 className="text-base font-extrabold text-[#0B2545] mb-3">About {counsellor.fullName}</h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">{counsellor.bio}</p>

              {/* Verified Placement Badge with Tooltip */}
              <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {counsellor.verifiedPlacementsCount}+ Verified Placements
                        </span>
                        <button 
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          onClick={() => setShowTooltip(!showTooltip)}
                          className="text-slate-400 hover:text-emerald-700 cursor-pointer"
                          aria-label="Verification Info"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-emerald-800 font-medium">Audited directly from university admission letters</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                    Audited Metric
                  </span>
                </div>

                {/* How this is calculated Tooltip */}
                {showTooltip && (
                  <div className="mt-3 p-3 bg-[#07192F] text-white text-xs rounded-xl shadow-xl border border-slate-700 animate-in fade-in duration-200">
                    <strong>How this is calculated:</strong> Only student admissions confirmed with verified university offer letters or official enrolment receipts count towards this public credential.
                  </div>
                )}
              </div>
            </div>

            {/* Complete Services & Fixed Pricing List */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/90">
              <h2 className="text-base font-extrabold text-[#0B2545] mb-4">Admissions Packages & Fixed Pricing</h2>
              <div className="space-y-3">
                {(counsellorServices || counsellor.services).map(srv => (
                  <div key={srv.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B2545]/10 text-[#0B2545] uppercase inline-block">
                        {srv.duration || 'Package'}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">{srv.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{srv.description || srv.desc}</p>
                      {(srv.features || []).length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {srv.features.map((f, i) => (
                            <span key={i} className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                      <div className="text-base font-black text-slate-900">₹{srv.price.toLocaleString('en-IN')}</div>
                      <Link 
                        to={`/book?counsellorId=${counsellor.id}&serviceId=${srv.id}`}
                        className="inline-flex items-center text-xs font-bold text-[#0B2545] hover:text-[#133E68] mt-1"
                      >
                        <span>Select Service</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#CFA25E]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filterable Review History */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-slate-200/90">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-base font-extrabold text-[#0B2545]">Student Reviews & Verified Results</h2>
                  <p className="text-xs text-slate-500">Reviews submitted only by students who booked through matchEd</p>
                </div>

                {/* Track Filter */}
                <select 
                  value={reviewFilterTrack}
                  onChange={(e) => setReviewFilterTrack(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0B2545]"
                >
                  <option value="ALL">All Tracks ({counsellorReviews.length})</option>
                  <option value="Study abroad admissions">Study abroad admissions</option>
                  <option value="International athletic scholarships">Athletic Scholarships</option>
                  <option value="Domestic India admissions">Domestic India</option>
                </select>
              </div>

              {/* Review Feed */}
              <div className="space-y-5">
                {filteredReviews.map(rev => (
                  <div key={rev.id} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{rev.studentName}</span>
                        {rev.outcomeVerified && (
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            Verified Admit
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#CFA25E]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#CFA25E]" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{rev.content}</p>

                    {/* Track-specific review tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {rev.tags.map((t, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Verified Outcome Note */}
                    {rev.outcomeText && (
                      <div className="bg-[#FDF8EE] border border-[#EBD6B0] rounded-xl px-3 py-2 text-xs font-bold text-[#0B2545]">
                        🎓 Result: {rev.outcomeText}
                      </div>
                    )}

                    {/* Counsellor Response */}
                    {rev.counsellorReply && (
                      <div className="bg-slate-50 border-l-2 border-[#0B2545] p-3 rounded-r-xl ml-2 text-xs">
                        <span className="font-bold text-slate-900 block mb-0.5">{counsellor.fullName} (Counsellor Response):</span>
                        <p className="text-slate-600">{rev.counsellorReply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Specialisation Details & Calendar Preview */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/90">
              <h3 className="font-extrabold text-[#0B2545] text-sm mb-3">Qualifications & Certifications</h3>
              <div className="space-y-2 text-xs text-slate-700">
                {counsellor.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/90">
              <h3 className="font-extrabold text-[#0B2545] text-sm mb-3">Focus Areas & Specialisations</h3>
              <div className="flex flex-wrap gap-1.5">
                {counsellor.specialisations.map((s, idx) => (
                  <span key={idx} className="bg-[#FDF8EE] text-[#0B2545] text-xs font-bold px-2.5 py-1 rounded-xl border border-[#EBD6B0]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#07192F] text-white rounded-2xl p-5 border border-slate-800 shadow-md">
              <h3 className="font-black text-sm mb-1.5 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#CFA25E]" />
                Live Availability Preview
              </h3>
              <p className="text-[11px] text-slate-400 mb-4">Upcoming consultation slots this week:</p>
              <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center font-semibold">Thu, 11:00 AM</div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center font-semibold">Thu, 02:00 PM</div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center font-semibold">Fri, 10:00 AM</div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/10 text-center font-semibold">Fri, 04:30 PM</div>
              </div>
              <Link 
                to={`/book?counsellorId=${counsellor.id}`}
                className="w-full bg-[#CFA25E] hover:bg-[#B88B46] text-[#07192F] font-black text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <span>Select Slot & Book</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#07192F]" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CounsellorProfile;
