import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Scale, Star, ShieldCheck, Clock, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const CompareDrawer = () => {
  const { compareList, removeFromCompare, clearCompare } = useData();
  const [isOpen, setIsOpen] = useState(false);

  if (compareList.length === 0) return null;

  // Check if counsellors are from different tracks
  const tracks = [...new Set(compareList.map(c => c.track))];
  const hasTrackMismatch = tracks.length > 1;

  return (
    <>
      {/* Floating Bottom Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white rounded-2xl shadow-2xl px-6 py-3.5 border border-slate-700 flex items-center gap-6 max-w-4xl w-[90vw] animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3 border-r border-slate-700 pr-4">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Compare Counsellors</span>
            <span className="text-sm font-bold">{compareList.length} of 3 selected</span>
          </div>
        </div>

        {/* Selected Avatars */}
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {compareList.map(counsellor => (
            <div key={counsellor.id} className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <img src={counsellor.photoUrl} alt={counsellor.fullName} className="w-6 h-6 rounded-full object-cover" />
              <span className="font-medium truncate max-w-[100px]">{counsellor.fullName}</span>
              <button 
                onClick={() => removeFromCompare(counsellor.id)}
                className="text-slate-400 hover:text-white ml-1 p-0.5 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-slate-200 underline font-medium"
          >
            Clear
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            Compare Side-by-Side
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Side-by-Side Counsellor Comparison</h2>
                  <p className="text-xs text-slate-500">Compare verified track specializations, outcome records, and package rates</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Track Mismatch Warning Banner */}
            {hasTrackMismatch && (
              <div className="bg-amber-50 border-b border-amber-200 px-8 py-3 flex items-center gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Track Diversity Notice:</strong> You are comparing counsellors across different specialization tracks ({tracks.join(', ')}).
                </span>
              </div>
            )}

            {/* Comparison Table Body */}
            <div className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Metric Names Column */}
                <div className="hidden md:block space-y-6 pt-24 text-xs font-semibold text-slate-500">
                  <div className="h-10 flex items-center border-b border-slate-100">Verified Placements</div>
                  <div className="h-10 flex items-center border-b border-slate-100">Rating & Reviews</div>
                  <div className="h-10 flex items-center border-b border-slate-100">Starting Rate / Package</div>
                  <div className="h-10 flex items-center border-b border-slate-100">Specialty Track</div>
                  <div className="h-10 flex items-center border-b border-slate-100">Experience</div>
                  <div className="h-10 flex items-center border-b border-slate-100">Escrow Guarantee</div>
                  <div className="h-20 flex items-center border-b border-slate-100">Destinations Covered</div>
                  <div className="h-24 flex items-center">Key Specialization Tags</div>
                </div>

                {/* Counsellor Columns */}
                {compareList.map(counsellor => (
                  <div key={counsellor.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      {/* Top Info */}
                      <div className="text-center mb-6 border-b border-slate-200 pb-4">
                        <img src={counsellor.photoUrl} alt={counsellor.fullName} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-3 shadow-md ring-2 ring-white" />
                        <h3 className="font-bold text-slate-900 text-base">{counsellor.fullName}</h3>
                        <p className="text-xs text-indigo-600 font-medium mb-3">{counsellor.track}</p>
                        <Link 
                          to={`/book?counsellorId=${counsellor.id}`}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded-xl shadow-md transition-all"
                        >
                          Book Session
                        </Link>
                      </div>

                      {/* Values */}
                      <div className="space-y-6 text-xs text-slate-800">
                        <div className="h-10 flex items-center font-bold text-emerald-700 bg-emerald-50/80 px-3 rounded-lg border border-emerald-100">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
                          {counsellor.verifiedPlacementsCount}+ Verified Placements
                        </div>
                        <div className="h-10 flex items-center font-bold text-slate-900">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1.5" />
                          {counsellor.rating} <span className="text-slate-400 font-normal ml-1">({counsellor.reviewCount} reviews)</span>
                        </div>
                        <div className="h-10 flex items-center font-bold text-indigo-900">
                          Starting ₹{counsellor.pricePerSession ? (counsellor.pricePerSession).toLocaleString('en-IN') : '25,000'} / package
                        </div>
                        <div className="h-10 flex items-center text-slate-700 font-medium truncate">
                          {counsellor.track}
                        </div>
                        <div className="h-10 flex items-center text-slate-700">
                          {counsellor.experienceYears} Years Experience
                        </div>
                        <div className="h-10 flex items-center text-emerald-700 font-medium bg-emerald-50 px-2 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          2-Wk / 3-Session Guarantee
                        </div>
                        <div className="h-20 flex flex-wrap gap-1 items-center border-b border-slate-200/60">
                          {counsellor.destinations?.map((d, i) => (
                            <span key={i} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                              {d}
                            </span>
                          ))}
                        </div>
                        <div className="h-24 flex flex-wrap gap-1.5 items-start pt-2">
                          {counsellor.tags?.map((t, i) => (
                            <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
