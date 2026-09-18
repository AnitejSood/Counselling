import React from 'react';
import { MOCK_PARTNER_ADS } from '../../data/mockData';
import { Plane, BookOpen, Award, ExternalLink, Sparkles } from 'lucide-react';

export const PartnerAdsBanner = ({ category = null, compact = false }) => {
  const ads = category ? MOCK_PARTNER_ADS.filter(a => a.category.toLowerCase().includes(category.toLowerCase())) : MOCK_PARTNER_ADS;

  const getIcon = (cat) => {
    if (cat.includes('Travel')) return <Plane className="w-5 h-5 text-[#CFA25E]" />;
    if (cat.includes('IELTS')) return <BookOpen className="w-5 h-5 text-[#CFA25E]" />;
    return <Award className="w-5 h-5 text-[#CFA25E]" />;
  };

  if (compact) {
    const ad = ads[0] || MOCK_PARTNER_ADS[0];
    return (
      <div className="bg-gradient-to-r from-[#07192F] to-[#0B2545] text-white p-4 rounded-2xl border border-slate-700 shadow-sm flex items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-white/10 shrink-0">
            {getIcon(ad.category)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-[#CFA25E] tracking-wider">{ad.badge}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">{ad.discount}</span>
            </div>
            <h4 className="text-xs font-bold text-white">{ad.partnerName}</h4>
          </div>
        </div>
        <a
          href={ad.link}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 bg-[#CFA25E] hover:bg-[#B88B46] text-[#0B2545] font-black text-xs rounded-xl shadow-xs transition flex items-center gap-1 shrink-0"
        >
          {ad.ctaText} <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-[#0B2545] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" /> matchEd Verified Partner Opportunities
        </span>
        <span className="text-[11px] text-slate-400">Exclusive student rebates & allowances</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map(ad => (
          <div
            key={ad.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#0B2545]/5 text-[#0B2545] border border-[#0B2545]/15">
                  {ad.category}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {ad.discount}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 mt-1">{ad.partnerName}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{ad.tagline}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[10px] font-mono font-bold text-slate-500">
                Code: <strong className="text-[#0B2545] bg-slate-100 px-1.5 py-0.5 rounded">{ad.promoCode}</strong>
              </div>
              <a
                href={ad.link}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#133E68] text-white text-xs font-bold rounded-xl transition flex items-center gap-1 shadow-xs"
              >
                {ad.ctaText} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerAdsBanner;
