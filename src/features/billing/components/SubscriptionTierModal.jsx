import React, { useState } from 'react';
import { X, Check, Zap, Crown, ShieldCheck, ArrowRight } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { SUBSCRIPTION_TIERS } from '../../../config/subscriptionTiers';

export const SubscriptionTierModal = ({ currentTier = "PRO", counsellorId = "counsellor_01", onClose }) => {
  const { upgradeCounsellorTier } = useData();
  const [selectedTier, setSelectedTier] = useState(currentTier);
  const [upgraded, setUpgraded] = useState(false);

  const handleUpgrade = (tierId) => {
    upgradeCounsellorTier(counsellorId, tierId);
    setSelectedTier(tierId);
    setUpgraded(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-4xl w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
            <Crown className="w-3.5 h-3.5 text-indigo-600" /> Marketplace Counsellor Subscriptions
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Choose Your Advisor Tier</h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto mt-1">
            Upgrade your tier to lower platform escrow commission fees, unlock Right-of-Reply, and get Gold Boosted top search ranking.
          </p>
        </div>

        {upgraded ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center text-emerald-900">
            <Check className="w-12 h-12 text-emerald-600 mx-auto mb-2 bg-emerald-100 p-2 rounded-full" />
            <h3 className="font-bold text-lg mb-1">Subscription Upgraded to {SUBSCRIPTION_TIERS[selectedTier]?.name}!</h3>
            <p className="text-xs text-slate-600">Your feature perks, lower escrow commission rate, and boost tokens are now active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Starter Tier */}
            <div className={`rounded-2xl p-6 border flex flex-col justify-between transition-all ${
              currentTier === 'STARTER' ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10' : 'border-slate-200 bg-white hover:border-slate-300'
            }`}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tier 1</span>
                <h3 className="font-bold text-slate-900 text-lg">{SUBSCRIPTION_TIERS.STARTER.name}</h3>
                <div className="my-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="text-xs font-semibold text-rose-600 mb-4 bg-rose-50 p-2 rounded-lg border border-rose-100">
                  15% Platform Escrow Fee
                </div>
                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  {SUBSCRIPTION_TIERS.STARTER.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentTier === 'STARTER' ? (
                <span className="w-full bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl text-center block">Current Plan</span>
              ) : (
                <button 
                  onClick={() => handleUpgrade('STARTER')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl"
                >
                  Downgrade to Free
                </button>
              )}
            </div>

            {/* Pro Tier */}
            <div className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${
              currentTier === 'PRO' ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/30' : 'border-indigo-200 bg-white hover:border-indigo-400'
            }`}>
              <span className="absolute -top-3 right-4 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full shadow">
                MOST POPULAR
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">Tier 2</span>
                <h3 className="font-bold text-slate-900 text-lg">{SUBSCRIPTION_TIERS.PRO.name}</h3>
                <div className="my-3">
                  <span className="text-3xl font-extrabold text-slate-900">₹4,999</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>
                <div className="text-xs font-semibold text-emerald-700 mb-4 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                  Reduced 8% Platform Escrow Fee
                </div>
                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  {SUBSCRIPTION_TIERS.PRO.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 mt-0.5" />
                      <span className="font-medium text-slate-800">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentTier === 'PRO' ? (
                <span className="w-full bg-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl text-center block shadow-md">Current Active Plan</span>
              ) : (
                <button 
                  onClick={() => handleUpgrade('PRO')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md"
                >
                  Upgrade to Pro
                </button>
              )}
            </div>

            {/* Elite Tier */}
            <div className={`rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${
              currentTier === 'ELITE' ? 'border-amber-400 bg-slate-950 text-white ring-2 ring-amber-400' : 'border-slate-800 bg-slate-900 text-white hover:border-amber-400'
            }`}>
              <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow flex items-center gap-1">
                <Zap className="w-3 h-3 fill-slate-950" /> FEATURED BOOST
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Tier 3</span>
                <h3 className="font-bold text-white text-lg">{SUBSCRIPTION_TIERS.ELITE.name}</h3>
                <div className="my-3">
                  <span className="text-3xl font-extrabold text-amber-400">₹14,999</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
                <div className="text-xs font-semibold text-emerald-300 mb-4 bg-emerald-950/80 p-2 rounded-lg border border-emerald-500/30">
                  Lowest 5% Platform Escrow Fee
                </div>
                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  {SUBSCRIPTION_TIERS.ELITE.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentTier === 'ELITE' ? (
                <span className="w-full bg-amber-500 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl text-center block shadow-lg">Active Elite Partner</span>
              ) : (
                <button 
                  onClick={() => handleUpgrade('ELITE')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs py-2.5 rounded-xl shadow-lg flex items-center justify-center gap-1"
                >
                  Upgrade to Elite <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
