import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useData } from '../../../context/DataContext';

export const HeroBoostCarousel = () => {
  const { counsellors } = useData();

  // Filter boosted or sponsored counsellors
  const boostedCounsellors = counsellors.filter(c => c.isBoosted || c.subscriptionTier === 'ELITE');

  if (boostedCounsellors.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          Featured Boosted Partners
        </span>
        <span className="text-xs text-slate-400 font-medium">Top Priority Verified Matchings</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {boostedCounsellors.slice(0, 2).map(counsellor => (
          <div 
            key={counsellor.id}
            className="bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all"
          >
            {/* Top Right Gold Tag */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" />
              BOOSTED TOP MATCH
            </div>

            <div className="flex items-start gap-4">
              <img 
                src={counsellor.photoUrl} 
                alt={counsellor.fullName} 
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-amber-400/60 shadow-xl group-hover:scale-105 transition-transform" 
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">{counsellor.fullName}</h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                </div>
                <p className="text-xs text-indigo-300 font-semibold mb-2">{counsellor.title}</p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mb-3">
                  <span className="flex items-center gap-1 font-bold text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {counsellor.rating}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{counsellor.verifiedPlacementsCount}+ Placements</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 my-3 italic">"{counsellor.bio}"</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Fixed Rate</span>
                <span className="text-base font-extrabold text-white">₹{counsellor.pricePerSession.toLocaleString('en-IN')}</span>
                <span className="text-[11px] text-slate-400"> / session</span>
              </div>

              <div className="flex items-center gap-2">
                <Link 
                  to={`/counsellor-profile/${counsellor.id}`}
                  className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
                >
                  View Storefront
                </Link>
                <Link 
                  to={`/book?counsellorId=${counsellor.id}`}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg flex items-center gap-1 transition-all"
                >
                  Book Priority Slot <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};
