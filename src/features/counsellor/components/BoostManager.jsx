import React, { useState } from 'react';
import { Zap, TrendingUp, Clock, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const BoostManager = ({ counsellorId = "counsellor_01" }) => {
  const { counsellors, toggleCounsellorBoost } = useData();
  const counsellor = counsellors.find(c => c.id === counsellorId) || counsellors[0];

  const [boostedNotice, setBoostedNotice] = useState(false);

  const handleToggleBoost = () => {
    toggleCounsellorBoost(counsellor.id);
    setBoostedNotice(true);
    setTimeout(() => setBoostedNotice(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-xl space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Counsellor Boosting Engine
          </span>
          <h2 className="text-2xl font-extrabold">Boost Profile Visibility</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Boosted profiles gain 3.4x higher session booking conversions and appear in the Hero Carousel.
          </p>
        </div>

        <button 
          onClick={handleToggleBoost}
          className={`px-6 py-3 rounded-2xl font-extrabold text-xs shadow-xl flex items-center gap-2 transition-all cursor-pointer ${
            counsellor.isBoosted 
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-amber-500/30'
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
          {counsellor.isBoosted ? 'Spotlight Boost Active (Live on Hero)' : 'Activate 30-Day Boost (₹7,999)'}
        </button>
      </div>

      {boostedNotice && (
        <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>Boost status updated! Profile is now featured in top marketplace search priority & Hero Carousel.</span>
        </div>
      )}

      {/* Boost Impression Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Boost Status</span>
          <span className={`text-base font-extrabold flex items-center gap-1.5 mt-1 ${counsellor.isBoosted ? 'text-amber-400' : 'text-slate-400'}`}>
            <Zap className="w-4 h-4 fill-current" />
            {counsellor.isBoosted ? 'ACTIVE SPOTLIGHT BOOST (Gold Seal)' : 'Inactive'}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {counsellor.isBoosted ? `Active through: ${counsellor.boostExpiresAt || 'End of Month'}` : 'Feature at top of matchEd marketplace'}
          </span>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Boost Impressions</span>
          <span className="text-2xl font-extrabold text-white mt-1">{(counsellor.boostImpressions || 4200).toLocaleString()}</span>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +142% student views vs organic
          </span>
        </div>
      </div>

    </div>
  );
};
