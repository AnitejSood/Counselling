import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { WORK_VALUES_ITEMS } from '../../data/psychometricData';
import { psychometricScoringService } from '../../services/psychometricScoringService';
import { CalculationLoader } from '../../components/common/CalculationLoader';
import { Target, CheckCircle, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WorkValuesTest = () => {
  const { psychometricResults, savePsychometricResult } = useData();

  const [top5, setTop5] = useState(() => psychometricResults?.workValuesRawTop5 || []);
  const [bottom3, setBottom3] = useState(() => psychometricResults?.workValuesRawBottom3 || []);
  const [result, setResult] = useState(() => psychometricResults?.workValues || null);
  const [isCalculating, setIsCalculating] = useState(false);

  const toggleTop5 = (id) => {
    if (bottom3.includes(id)) setBottom3(bottom3.filter(i => i !== id));
    
    if (top5.includes(id)) {
      setTop5(top5.filter(i => i !== id));
    } else {
      if (top5.length < 5) {
        setTop5([...top5, id]);
      }
    }
  };

  const toggleBottom3 = (id) => {
    if (top5.includes(id)) setTop5(top5.filter(i => i !== id));

    if (bottom3.includes(id)) {
      setBottom3(bottom3.filter(i => i !== id));
    } else {
      if (bottom3.length < 3) {
        setBottom3([...bottom3, id]);
      }
    }
  };

  const handleAutoFillDemo = () => {
    setIsCalculating(true);
    const demoTop5 = ["wv_1", "wv_3", "wv_5", "wv_8", "wv_12"];
    const demoBottom3 = ["wv_18", "wv_19", "wv_20"];
    setTop5(demoTop5);
    setBottom3(demoBottom3);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateWorkValues(demoTop5, demoBottom3);
      setResult(computedResult);
      savePsychometricResult('workValues', computedResult, { top5: demoTop5, bottom3: demoBottom3 });
      setIsCalculating(false);
    }, 800);
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    let currentTop5 = [...top5];
    let currentBottom3 = [...bottom3];

    WORK_VALUES_ITEMS.forEach(item => {
      if (currentTop5.length < 5 && !currentTop5.includes(item.id) && !currentBottom3.includes(item.id)) {
        currentTop5.push(item.id);
      }
    });

    WORK_VALUES_ITEMS.forEach(item => {
      if (currentBottom3.length < 3 && !currentTop5.includes(item.id) && !currentBottom3.includes(item.id)) {
        currentBottom3.push(item.id);
      }
    });

    setTop5(currentTop5);
    setBottom3(currentBottom3);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateWorkValues(currentTop5, currentBottom3);
      setResult(computedResult);
      savePsychometricResult('workValues', computedResult, { top5: currentTop5, bottom3: currentBottom3 });
      setIsCalculating(false);
    }, 800);
  };

  const top5Items = Array.isArray(result?.top5Items) && result.top5Items.length > 0
    ? result.top5Items
    : WORK_VALUES_ITEMS.slice(0, 5);

  const bottom3Items = Array.isArray(result?.bottom3Items) && result.bottom3Items.length > 0
    ? result.bottom3Items
    : WORK_VALUES_ITEMS.slice(-3);

  const environmentalFit = result?.environmentalFit || "Autonomous & High-Impact Engineering Track";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {isCalculating && (
        <CalculationLoader
          message="Analyzing Forced-Choice Work Values Matrix..."
          subMessage="Determining top 5 non-negotiable drivers & career environment fit"
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Forced-Choice Ranking Matrix</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Work Values & Career Drivers Assessment</h1>
        </div>
        <div className="flex items-center gap-3">
          {!result && (
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 border border-amber-300 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Autofill Demo Values
            </button>
          )}
          <Link to="/dashboard/assessments" className="text-xs font-bold text-slate-500 hover:text-slate-900">
            ← Back to Hub
          </Link>
        </div>
      </div>

      {result ? (
        /* REPORT VIEW */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Work Values Profile Generated
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Your Core Career Drivers</h2>
            <p className="text-xs text-slate-500">Environmental Alignment: <strong className="text-emerald-700 font-bold">{environmentalFit}</strong></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top 5 Non-Negotiables */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200 space-y-3">
              <span className="text-xs font-extrabold uppercase text-emerald-800 tracking-wider block">
                Top 5 Absolute Non-Negotiable Drivers:
              </span>
              <div className="space-y-2">
                {top5Items.map((val, idx) => (
                  <div key={val.id || idx} className="p-3 rounded-xl bg-white border border-emerald-100 shadow-xs space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Rank #{idx + 1} • {val.category || 'Driver'}</span>
                    <h4 className="text-xs font-bold text-slate-900">{val.title}</h4>
                    <p className="text-[11px] text-slate-600">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 3 Least Important Factors */}
            <div className="bg-rose-50/70 p-6 rounded-2xl border border-rose-200 space-y-3">
              <span className="text-xs font-extrabold uppercase text-rose-800 tracking-wider block">
                Bottom 3 Least Important Factors:
              </span>
              <div className="space-y-2">
                {bottom3Items.map((val, idx) => (
                  <div key={val.id || idx} className="p-3 rounded-xl bg-white border border-rose-100 shadow-xs space-y-0.5 opacity-80">
                    <span className="text-[10px] font-bold text-rose-600 uppercase">Lowest Priority #{idx + 1}</span>
                    <h4 className="text-xs font-bold text-slate-900">{val.title}</h4>
                    <p className="text-[11px] text-slate-600">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              <RotateCcw className="w-4 h-4" /> Reset & Re-rank Values
            </button>
            <Link
              to="/dashboard/profile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700"
            >
              Complete Full Student Profile →
            </Link>
          </div>

        </div>
      ) : (
        /* MATRIX FORCED-CHOICE SELECTION VIEW */
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
          
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <strong>Forced-Choice Instructions:</strong> Select your Top 5 Non-Negotiables ({top5.length}/5) and Bottom 3 Factors ({bottom3.length}/3). Or click <strong>Autofill Demo Values</strong> on top.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WORK_VALUES_ITEMS.map((item) => {
              const isTop = top5.includes(item.id);
              const isBottom = bottom3.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all space-y-2 flex flex-col justify-between ${
                    isTop
                      ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                      : isBottom
                        ? 'bg-rose-50/80 border-rose-400 opacity-75'
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.category}</span>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-slate-600">{item.desc}</p>
                  </div>

                  <div className="pt-2 flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => toggleTop5(item.id)}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                        isTop ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {isTop ? '✓ Top 5 Chosen' : 'Select Top 5'}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleBottom3(item.id)}
                      className={`flex-1 py-1.5 rounded-lg font-bold transition ${
                        isBottom ? 'bg-rose-600 text-white' : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {isBottom ? '✓ Bottom 3' : 'Select Bottom 3'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition"
            >
              Generate Work Values Profile
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
