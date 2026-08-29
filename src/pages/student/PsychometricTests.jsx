import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Brain, Compass, Award, Target, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const PsychometricTests = () => {
  const { psychometricResults } = useData();

  const riasecCompleted = !!psychometricResults?.riasec;
  const bigFiveCompleted = !!psychometricResults?.bigFive;
  const workValuesCompleted = !!psychometricResults?.workValues;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
          Scientific Evaluation Suite
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Psychometric Career & Personality Assessments
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Take our 3 standardized psychometric assessments based on Holland Codes (RIASEC), the IPIP Big Five framework, and forced-choice Work Values to generate your career blueprint for Arti Sood.
        </p>
      </div>

      {/* 3 Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* TEST 1: RIASEC */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                <Compass className="w-6 h-6" />
              </div>
              {riasecCompleted && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Holland Codes</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">RIASEC Interest Inventory</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              48-item scientific questionnaire matching your occupational interests to O*NET career environments.
            </p>

            {riasecCompleted && (
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-xs space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Your Holland Code:</span>
                <p className="text-base font-extrabold text-blue-900">{psychometricResults.riasec.hollandCode}</p>
                <p className="text-[11px] text-slate-600">{psychometricResults.riasec.mappedCareer.title}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              to="/dashboard/assessments/riasec"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              <span>{riasecCompleted ? 'Retake / View Assessment' : 'Take RIASEC Test'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TEST 2: BIG FIVE */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-bold">
                <Brain className="w-6 h-6" />
              </div>
              {bigFiveCompleted && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">IPIP-NEO Framework</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Big Five Personality Test</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              20-item personality assessment measuring Openness, Conscientiousness, Extraversion, Agreeableness & Emotional Stability.
            </p>

            {bigFiveCompleted && (
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-xs space-y-1">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Top Trait:</span>
                <p className="text-sm font-extrabold text-purple-900">
                  {Object.entries(psychometricResults.bigFive.percentiles).sort((a,b)=>b[1]-a[1])[0][0]} ({Object.entries(psychometricResults.bigFive.percentiles).sort((a,b)=>b[1]-a[1])[0][1]}%)
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              to="/dashboard/assessments/big-five"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
            >
              <span>{bigFiveCompleted ? 'Retake / View Traits' : 'Take Personality Test'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TEST 3: WORK VALUES */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                <Target className="w-6 h-6" />
              </div>
              {workValuesCompleted && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Forced-Choice Matrix</span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">Work Values Assessment</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              20-item forced-choice ranking system identifying your top 5 non-negotiable career drivers and environment fit.
            </p>

            {workValuesCompleted && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Track Fit:</span>
                <p className="text-xs font-bold text-emerald-900">{psychometricResults.workValues.environmentalFit}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              to="/dashboard/assessments/work-values"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
            >
              <span>{workValuesCompleted ? 'Retake / View Values' : 'Take Work Values Test'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
