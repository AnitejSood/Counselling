import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Clock, ArrowRight, Zap, Crown } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CounsellorCard = ({ counsellor }) => {
  const { compareList, addToCompare } = useData();

  const isCompared = compareList.some(c => c.id === counsellor.id);

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group ${
      counsellor.isBoosted 
        ? 'border-amber-400/80 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/20' 
        : 'border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow-xl'
    }`}>
      
      {/* Top Banner for Boosted Status */}
      {counsellor.isBoosted && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 flex items-center justify-between text-xs font-extrabold shadow-sm">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            Boosted Top Match
          </span>
          <span className="text-[10px] bg-slate-950 text-amber-400 px-2 py-0.5 rounded-full font-mono uppercase">
            Priority Rank
          </span>
        </div>
      )}

      {!counsellor.isBoosted && counsellor.isSponsored && (
        <div className="bg-amber-500/10 border-b border-amber-200/60 px-4 py-1.5 flex items-center justify-between text-xs font-semibold text-amber-800">
          <span className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Sponsored Partner
          </span>
          <span className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full font-mono">Featured</span>
        </div>
      )}

      <div className="p-6">
        {/* Header with Photo, Name & Compare Checkbox */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <img 
              src={counsellor.photoUrl} 
              alt={counsellor.fullName} 
              className={`w-16 h-16 rounded-2xl object-cover ring-2 shadow-md group-hover:scale-105 transition-transform ${
                counsellor.isBoosted ? 'ring-amber-400' : 'ring-indigo-50'
              }`}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {counsellor.fullName}
                </h3>
                {counsellor.verificationStatus === 'VERIFIED' && (
                  <span title="Verified Placements Seal" className="inline-flex items-center text-emerald-600">
                    <ShieldCheck className="w-5 h-5 fill-emerald-50 text-emerald-600" />
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-indigo-600 mb-1">{counsellor.track}</p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {counsellor.rating}
                  <span className="text-slate-400 font-normal">({counsellor.reviewCount})</span>
                </span>
                <span>•</span>
                <span>{counsellor.experienceYears} Yrs Exp</span>
              </div>
            </div>
          </div>

          {/* Add to Compare Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-indigo-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:text-indigo-600 transition-all select-none">
            <input 
              type="checkbox" 
              checked={isCompared}
              onChange={() => addToCompare(counsellor)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Compare</span>
          </label>
        </div>

        {/* Credentials Line */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          {counsellor.credentials}
        </p>

        {/* Key Metrics Pill Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-center">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 block">Verified Placements</span>
            <span className="font-bold text-emerald-900 text-sm">{counsellor.verifiedPlacementsCount}+ Placements</span>
          </div>
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-2.5 text-center">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-700 block">Response Time</span>
            <span className="font-bold text-indigo-900 text-sm flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-indigo-500" />
              {counsellor.responseTime}
            </span>
          </div>
        </div>

        {/* Specialty Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {counsellor.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Package Rate & Actions */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Starting rate</span>
          <span className="text-base font-extrabold text-slate-900">₹{(counsellor.pricePerSession || 25000).toLocaleString('en-IN')}</span>
          <span className="text-xs text-slate-500 font-normal"> / package</span>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            to={`/counsellor-profile/${counsellor.id}`}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Profile
          </Link>
          <Link 
            to={`/book?counsellorId=${counsellor.id}`}
            className={`px-4 py-2 text-xs font-bold rounded-xl shadow-md flex items-center gap-1 transition-all ${
              counsellor.isBoosted ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            Book Session
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
