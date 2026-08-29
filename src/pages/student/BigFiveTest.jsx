import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BIG_FIVE_QUESTIONS } from '../../data/psychometricData';
import { psychometricScoringService } from '../../services/psychometricScoringService';
import { CalculationLoader } from '../../components/common/CalculationLoader';
import { Brain, CheckCircle, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BigFiveTest = () => {
  const { psychometricResults, savePsychometricResult } = useData();

  const [answers, setAnswers] = useState(() => psychometricResults?.bigFiveRawAnswers || {});
  const [result, setResult] = useState(() => psychometricResults?.bigFive || null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleRatingChange = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleAutoFillDemo = () => {
    setIsCalculating(true);
    const demo = {};
    BIG_FIVE_QUESTIONS.forEach(q => {
      if (q.trait === 'Conscientiousness') demo[q.id] = q.isReverse ? 1 : 5;
      else if (q.trait === 'Openness') demo[q.id] = q.isReverse ? 2 : 5;
      else if (q.trait === 'EmotionalStability') demo[q.id] = q.isReverse ? 2 : 4;
      else demo[q.id] = Math.floor(Math.random() * 2) + 3;
    });
    setAnswers(demo);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateBigFive(demo);
      setResult(computedResult);
      savePsychometricResult('bigFive', computedResult, demo);
      setIsCalculating(false);
    }, 800);
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    const completeAnswers = { ...answers };
    BIG_FIVE_QUESTIONS.forEach(q => {
      if (!completeAnswers[q.id]) completeAnswers[q.id] = 3;
    });
    setAnswers(completeAnswers);

    setTimeout(() => {
      const computedResult = psychometricScoringService.calculateBigFive(completeAnswers);
      setResult(computedResult);
      savePsychometricResult('bigFive', computedResult, completeAnswers);
      setIsCalculating(false);
    }, 800);
  };

  const answeredCount = Object.keys(answers).length;

  const percentiles = result?.percentiles || { Extraversion: 55, Agreeableness: 65, Conscientiousness: 88, EmotionalStability: 75, Openness: 82 };
  const insights = Array.isArray(result?.insights) && result.insights.length > 0
    ? result.insights
    : [
        "High Conscientiousness: Exceptional detail & reliable technical execution.",
        "High Openness: Strong curiosity for innovation & AI strategy."
      ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {isCalculating && (
        <CalculationLoader
          message="Computing Big Five Personality Trait Percentiles..."
          subMessage="Evaluating Openness, Conscientiousness, Extraversion, Agreeableness & Emotional Stability"
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">IPIP-NEO Scientific Framework</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Big Five Personality Assessment (20 Items)</h1>
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
        /* REPORT VIEW */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8">
          
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Personality Profile Generated
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Five-Factor Trait Breakdown</h2>
            <p className="text-xs text-slate-500">Standardized percentile scores with automatic reverse-scoring formula</p>
          </div>

          {/* Bar Charts for 5 Traits */}
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {[
              { trait: 'Extraversion', label: 'Extraversion (Social Energy & Expressiveness)', color: 'bg-purple-600' },
              { trait: 'Agreeableness', label: 'Agreeableness (Empathy & Collaboration)', color: 'bg-emerald-600' },
              { trait: 'Conscientiousness', label: 'Conscientiousness (Structure, Detail & Discipline)', color: 'bg-blue-600' },
              { trait: 'EmotionalStability', label: 'Emotional Stability (Calmness & Stress Resilience)', color: 'bg-indigo-600' },
              { trait: 'Openness', label: 'Openness to Experience (Curiosity & Innovation)', color: 'bg-amber-500' }
            ].map((t) => {
              const pct = percentiles[t.trait] || 50;
              return (
                <div key={t.trait} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-800">{t.label}</span>
                    <span className="text-purple-600 font-extrabold">{pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${t.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Workplace & Environment Recommendations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" /> Career Environment Insights
            </h3>
            <div className="space-y-2">
              {insights.map((insight, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-slate-800 font-medium">
                  {insight}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              <RotateCcw className="w-4 h-4" /> Retake Personality Test
            </button>
            <Link
              to="/dashboard/assessments/work-values"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700"
            >
              Proceed to Work Values Assessment →
            </Link>
          </div>

        </div>
      ) : (
        /* QUESTIONNAIRE FORM VIEW */
        <form onSubmit={handleComplete} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
          
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-purple-900">
            <strong>Instructions:</strong> Rate how accurately each statement describes your typical behavior (1 = Strongly Disagree, 5 = Strongly Agree).
          </div>

          <div className="space-y-4">
            {BIG_FIVE_QUESTIONS.map((q, idx) => {
              const currentRating = answers[q.id] || 0;
              return (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs font-bold text-slate-900 flex-1">
                    <span className="text-purple-600 mr-2">{idx + 1}.</span>
                    "{q.text}"
                  </p>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleRatingChange(q.id, val)}
                        className={`w-8 h-8 rounded-xl font-bold text-xs transition ${
                          currentRating === val
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg transition"
            >
              Generate Big Five Personality Profile ({answeredCount}/20)
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
