import React from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, Bookmark, ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';

export const Recommendations = () => {
  const { recommendations, addToShortlist } = useData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Personalised Mentorship</span>
          <h1 className="text-2xl font-extrabold text-slate-900">My Recommendations</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recommendations.map((rec) => (
          <div key={rec.id} className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                  {rec.category}
                </span>
                <span className="text-xs font-semibold text-slate-500">{rec.universityDetails?.country || 'Global'}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{rec.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>

              {rec.universityDetails && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Course</span>
                    <span className="font-bold text-slate-900">{rec.universityDetails.course}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Tuition</span>
                    <span className="font-bold text-blue-600">{rec.universityDetails.approxTuitionUSD}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Deadline</span>
                    <span className="font-bold text-rose-600">{rec.universityDetails.applicationDeadline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Intake</span>
                    <span className="font-semibold text-slate-700">{rec.universityDetails.intake}</span>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs space-y-1">
                <p className="font-bold text-blue-800 uppercase text-[10px]">Why Arti Sood Recommends This:</p>
                <p className="italic text-slate-700">{rec.whyIRecommendThis}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => addToShortlist(rec)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Add to My Shortlist
              </button>
              {rec.usefulLink && (
                <a
                  href={rec.usefulLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
