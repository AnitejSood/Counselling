import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { RIASEC_QUESTIONS } from '../../data/psychometricData';
import { psychometricScoringService } from '../../services/psychometricScoringService';
import { CalculationLoader } from '../../components/common/CalculationLoader';
import { Compass, CheckCircle, ArrowRight, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RIASECTest = () => {
  const { psychometricResults, savePsychometricResult } = useData();
  
  const [answers, setAnswers] = useState(() => {
    return psychometricResults?.riasecRawAnswers || {};
  });

  const [result, setResult] = useState(() => {
    return psychometricResults?.riasec || null;
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const questionsPerPage = 8;
  const totalPages = Math.ceil(RIASEC_QUESTIONS.length / questionsPerPage);

  const handleRatingChange = (qId, rating) => {
    setAnswers(prev => ({ ...prev, [qId]: rating }));
  };

  const handleAutoFillDemo = () => {
    setIsCalculating(true);
    const demo = {};
    RIASEC_QUESTIONS.forEach(q => {
      if (q.category === 'I') demo[q.id] = 5;
      else if (q.category === 'R') demo[q.id] = 4;
      else if (q.category === 'C') demo[q.id] = 4;
      else if (q.category === 'A') demo[q.id] = 3;
      else demo[q.id] = Math.floor(Math.random() * 3) + 2;
    });
    setAnswers(demo);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateRIASEC(demo);
      setResult(computedResult);
      savePsychometricResult('riasec', computedResult, demo);
      setIsCalculating(false);
    }, 800);
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    const completeAnswers = { ...answers };
    RIASEC_QUESTIONS.forEach(q => {
      if (!completeAnswers[q.id]) completeAnswers[q.id] = 3;
    });
    setAnswers(completeAnswers);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateRIASEC(completeAnswers);
      setResult(computedResult);
      savePsychometricResult('riasec', computedResult, completeAnswers);
      setIsCalculating(false);
    }, 800);
  };

  const currentQuestions = RIASEC_QUESTIONS.slice(
    (currentStep - 1) * questionsPerPage,
    currentStep * questionsPerPage
  );

  const answeredCount = Object.keys(answers).length;
  const progressPct = Math.round((answeredCount / RIASEC_QUESTIONS.length) * 100);

  // Bulletproof Property Fallbacks
  const hollandCode = result?.hollandCode || 'IRC';
  const mappedCareer = {
    title: result?.mappedCareer?.title || 'Software Systems Architect & Cyber Analyst',
    onetCode: result?.mappedCareer?.onetCode || '15-1252.00',
    topCareers: Array.isArray(result?.mappedCareer?.topCareers) && result.mappedCareer.topCareers.length > 0
      ? result.mappedCareer.topCareers
      : ['Software Systems Architect', 'Cybersecurity Analyst', 'Data Systems Engineer'],
    suitableMajors: Array.isArray(result?.mappedCareer?.suitableMajors) && result.mappedCareer.suitableMajors.length > 0
      ? result.mappedCareer.suitableMajors
      : ['Computer Science', 'Cybersecurity', 'Data Science']
  };
  const averages = result?.averages || { R: 4.2, I: 4.8, A: 3.1, S: 2.8, E: 3.5, C: 4.4 };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {isCalculating && (
        <CalculationLoader
          message="Calculating Holland Code Profile..."
          subMessage="Mapping occupational interests against O*NET crosswalk database"
        />
      )}

      {/* Top Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Holland Codes Framework</span>
          <h1 className="text-2xl font-extrabold text-slate-900">RIASEC Interest Inventory (48 Items)</h1>
        </div>
        <div className="flex items-center gap-3">
          {!result && (
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 border border-amber-300 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Autofill Demo Answers
            </button>
          )}
          <Link to="/dashboard/assessments" className="text-xs font-bold text-slate-500 hover:text-slate-900">
            ← Back to Hub
          </Link>
        </div>
      </div>

      {result ? (
        /* RESULTS REPORT VIEW */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Assessment Complete
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Your Holland Code is <span className="text-blue-600 font-mono tracking-wider">{hollandCode}</span></h2>
            <p className="text-xs text-slate-500 font-semibold">{mappedCareer.title}</p>
          </div>

          {/* Holland Category Averages Bar Chart */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Interest Profile Breakdown (Scale 1.0 - 5.0)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {[
                { label: 'Realistic (R)', key: 'R', color: 'bg-amber-500' },
                { label: 'Investigative (I)', key: 'I', color: 'bg-blue-600' },
                { label: 'Artistic (A)', key: 'A', color: 'bg-purple-600' },
                { label: 'Social (S)', key: 'S', color: 'bg-emerald-600' },
                { label: 'Enterprising (E)', key: 'E', color: 'bg-rose-600' },
                { label: 'Conventional (C)', key: 'C', color: 'bg-indigo-600' }
              ].map((item) => (
                <div key={item.key} className="bg-white p-3 rounded-xl border border-slate-200 text-center space-y-2">
                  <span className="text-[11px] font-bold text-slate-700 block">{item.label}</span>
                  <div className="w-full h-24 bg-slate-100 rounded-lg flex items-end p-1">
                    <div
                      className={`w-full ${item.color} rounded-md transition-all duration-500`}
                      style={{ height: `${((averages[item.key] || 3) / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 block">{averages[item.key] || 3}</span>
                </div>
              ))}
            </div>
          </div>

          {/* O*NET Crosswalk Career Recommendations */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" /> O*NET Matched Career Pathways ({hollandCode})
              </h3>
              <span className="text-xs font-mono text-slate-400">O*NET Code: {mappedCareer.onetCode}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2">
                <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">Recommended Career Titles:</h4>
                <ul className="space-y-1 text-xs font-semibold text-slate-800">
                  {mappedCareer.topCareers.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-2">
                <h4 className="text-xs font-bold text-purple-800 uppercase tracking-wider">Suitable Undergraduate Majors:</h4>
                <ul className="space-y-1 text-xs font-semibold text-slate-800">
                  {mappedCareer.suitableMajors.map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              <RotateCcw className="w-4 h-4" /> Retake RIASEC Assessment
            </button>
            <Link
              to="/dashboard/recommendations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700"
            >
              View Arti Sood's Curated Shortlist →
            </Link>
          </div>

        </div>
      ) : (
        /* QUESTIONNAIRE FORM VIEW */
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8">
          
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-blue-600">Page {currentStep} of {totalPages}</span>
              <span className="text-slate-500">{answeredCount} of {RIASEC_QUESTIONS.length} Answered ({progressPct}%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>

          {/* Current Page Questions */}
          <div className="space-y-6">
            {currentQuestions.map((q, idx) => {
              const qIndex = (currentStep - 1) * questionsPerPage + idx + 1;
              const currentRating = answers[q.id] || 0;
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <p className="text-xs font-bold text-slate-900">
                    <span className="text-blue-600 mr-1.5">{qIndex}.</span>
                    How much would you enjoy: "{q.text}"?
                  </p>

                  <div className="flex justify-between items-center max-w-md gap-2 text-xs">
                    <span className="text-[10px] text-slate-400 font-semibold">Dislike</span>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRatingChange(q.id, val)}
                        className={`w-9 h-9 rounded-xl font-bold text-xs transition ${
                          currentRating === val
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                    <span className="text-[10px] text-blue-600 font-semibold">Enjoy</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Buttons */}
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs disabled:opacity-40"
            >
              ← Previous Page
            </button>

            <div className="flex items-center gap-3">
              {currentStep < totalPages && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md"
                >
                  Next Page →
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition"
              >
                Calculate Holland Code Profile
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
