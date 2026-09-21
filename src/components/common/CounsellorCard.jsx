import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Clock, ArrowRight, Zap, Crown } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CounsellorCard = ({ counsellor }) => {
  const { compareList, addToCompare } = useData();

  const isCompared = compareList.some(c => c.id === counsellor.id);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden group font-sans ${
      counsellor.isBoosted 
        ? 'border-[#CFA25E]/60 shadow-sm ring-1 ring-[#CFA25E]/20' 
        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    }`}>
      
      {/* Subtle Priority / Boosted ribbon */}
      {counsellor.isBoosted && (
        <div className="bg-gradient-to-r from-[#0B2545] to-[#143B6A] text-[#CFA25E] px-3 py-1 flex items-center justify-between text-[10px] font-bold border-b border-[#CFA25E]/20">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 fill-[#CFA25E]" />
            <span>Top Verified Advisor</span>
          </span>
          <span className="bg-[#CFA25E]/20 text-[#CFA25E] px-1.5 py-0.2 rounded text-[9px] font-mono">
            Priority
          </span>
        </div>
      )}

      {!counsellor.isBoosted && counsellor.isSponsored && (
        <div className="bg-[#FDF8EE] border-b border-[#EBD6B0] px-3 py-1 flex items-center justify-between text-[10px] font-bold text-[#0B2545]">
          <span className="flex items-center gap-1">
            <Crown className="w-3 h-3 text-[#CFA25E] fill-[#CFA25E]" />
            <span>Featured Advisor</span>
          </span>
          <span className="text-[9px] text-[#0B2545] bg-[#EBD6B0]/60 px-1.5 py-0.2 rounded font-semibold">Featured</span>
        </div>
      )}

      <div className="p-3.5 space-y-2.5">
        {/* Header: Photo, Name, Verified, Track, Compare */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img 
              src={counsellor.photoUrl} 
              alt={counsellor.fullName} 
              className={`w-10 h-10 rounded-lg object-cover ring-1 shrink-0 ${
                counsellor.isBoosted ? 'ring-[#CFA25E]' : 'ring-slate-200'
              }`}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-[#0B2545] transition-colors">
                  {counsellor.fullName}
                </h3>
                {counsellor.verificationStatus === 'VERIFIED' && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Audited Placement Record" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">{counsellor.track}</p>
            </div>
          </div>

          {/* Quick Compare Checkbox */}
          <label className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-400 hover:text-slate-700 transition-colors select-none shrink-0">
            <input 
              type="checkbox" 
              checked={isCompared}
              onChange={() => addToCompare(counsellor)}
              className="rounded border-slate-300 text-[#0B2545] focus:ring-[#CFA25E] w-3 h-3 cursor-pointer"
            />
            <span>Compare</span>
          </label>
        </div>

        {/* Clean Natural Credential Line (No box inside box) */}
        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
          {counsellor.credentials}
        </p>

        {/* Inline Key Metrics (clean divider, no heavy boxes) */}
        <div className="flex items-center gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-0.5 font-bold text-slate-900">
            <Star className="w-3 h-3 fill-[#CFA25E] text-[#CFA25E]" />
            {counsellor.rating}
            <span className="text-slate-400 font-normal">({counsellor.reviewCount})</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="font-semibold text-emerald-700">
            {counsellor.verifiedPlacementsCount}+ Admits
          </span>
          <span className="text-slate-300">·</span>
          <span className="flex items-center gap-0.5 text-slate-500">
            <Clock className="w-2.5 h-2.5 text-slate-400" />
            {counsellor.responseTime}
          </span>
        </div>

        {/* Specialty Tag Pills */}
        <div className="flex flex-wrap gap-1">
          {counsellor.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 text-[9px] font-medium px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Price & Actions */}
      <div className="bg-slate-50/70 px-3.5 py-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-medium">Starting from</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs sm:text-sm font-black text-slate-900">₹{(counsellor.pricePerSession || 25000).toLocaleString('en-IN')}</span>
            <span className="text-[9px] text-slate-400 font-normal">/ pkg</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link 
            to={`/counsellor-profile/${counsellor.id}`}
            className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition cursor-pointer"
          >
            Profile
          </Link>
          <Link 
            to={`/book?counsellorId=${counsellor.id}`}
            className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#0B2545] hover:bg-slate-800 text-white flex items-center gap-1 transition cursor-pointer"
          >
            <span>Book Call</span>
            <ArrowRight className="w-2.5 h-2.5 text-[#CFA25E]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CounsellorCard;
