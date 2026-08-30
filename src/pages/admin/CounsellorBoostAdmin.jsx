import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Zap, Crown, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const CounsellorBoostAdmin = () => {
  const { counsellors, toggleCounsellorBoost, upgradeCounsellorTier } = useData();
  const [notice, setNotice] = useState('');

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleToggleBoost = (counsellorId, name) => {
    toggleCounsellorBoost(counsellorId);
    showMsg(`Updated hero boost status for ${name}`);
  };

  const handleTierChange = (counsellorId, name, tier) => {
    upgradeCounsellorTier(counsellorId, tier);
    showMsg(`Updated subscription tier to ${tier} for ${name}`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <PageHeader
        eyebrow="Marketplace Promotion Control"
        title="Counsellor Boost & Subscription Tier Manager"
        subtitle="Select which counsellors are featured on the homepage hero boost carousel and assign subscription tiers."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Counsellors Tier & Boost Control Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-900">Platform Counsellors ({counsellors.length})</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {counsellors.map(c => (
            <div key={c.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={c.photoUrl} alt={c.fullName} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-base">{c.fullName}</h4>
                    {c.isBoosted && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-amber-500" /> Hero Boosted
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{c.title} · {c.track}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Subscription Tier Picker */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Plan Tier:</span>
                  <select
                    value={c.subscriptionTier || 'PRO'}
                    onChange={e => handleTierChange(c.id, c.fullName, e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="FREE">Tier 1: Free Listing</option>
                    <option value="PRO">Tier 2: Pro Access ($49/mo)</option>
                    <option value="PREMIUM_BOOST">Tier 3: Featured Boost ($99/mo)</option>
                  </select>
                </div>

                {/* Hero Boost Toggle Button */}
                <button
                  onClick={() => handleToggleBoost(c.id, c.fullName)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    c.isBoosted ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  {c.isBoosted ? 'Remove Boost' : 'Feature on Hero'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
