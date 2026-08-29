import React, { useState } from 'react';
import { Save, CheckCircle2, ShieldCheck, DollarSign, Clock, Tag } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CounsellorProfileBuild = () => {
  const { counsellors } = useData();
  const counsellor = counsellors[0];

  const [bio, setBio] = useState(counsellor.bio);
  const [rate, setRate] = useState(counsellor.pricePerSession);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Counsellor Step 2</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Build Profile & Transparent Pricing</h1>
        </div>
        <button 
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Profile & Rates
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile updated! Existing active bookings will honor the price at the time of booking.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Public Bio & Philosophy</label>
          <textarea 
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Starting Rate per 45-Min Session (₹)</label>
            <input 
              type="number"
              value={rate}
              onChange={e => setRate(parseInt(e.target.value) || 0)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-bold focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Platform policy: No "contact for pricing" forms permitted.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Average Response Time Metric</label>
            <input 
              type="text"
              readOnly
              value={counsellor.responseTime}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 font-medium cursor-not-allowed"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Auto-calculated based on student chat response speeds.</span>
          </div>
        </div>
      </form>
    </div>
  );
};
