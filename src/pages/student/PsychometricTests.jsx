import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Brain, Compass, Target, CheckCircle, ArrowRight, BookOpen, Award, Sparkles, UserCheck } from 'lucide-react';

export const PsychometricTests = () => {
  const { psychometricResults, assignedPsychometrics } = useData();

  const isAssigned = (testKey) => (assignedPsychometrics || []).includes(testKey);

  const testsList = [
    {
      key: 'riasec',
      title: 'RIASEC Interest Inventory',
      framework: 'Holland Codes',
      icon: Compass,
      color: 'indigo',
      path: '/dashboard/assessments/riasec',
      desc: '48-item questionnaire matching occupational interests to career environments.',
      completed: !!psychometricResults?.riasec
    },
    {
      key: 'bigFive',
      title: 'Big Five Personality Test',
      framework: 'IPIP-NEO Framework',
      icon: Brain,
      color: 'purple',
      path: '/dashboard/assessments/big-five',
      desc: '20-item personality assessment measuring Openness, Conscientiousness & Emotional Stability.',
      completed: !!psychometricResults?.bigFive
    },
    {
      key: 'workValues',
      title: 'Work Values Assessment',
      framework: 'Forced-Choice Matrix',
      icon: Target,
      color: 'emerald',
      path: '/dashboard/assessments/work-values',
      desc: 'Identifies non-negotiable career drivers and workplace environment preferences.',
      completed: !!psychometricResults?.workValues
    },
    {
      key: 'learningStyle',
      title: 'VARK Learning Style Test',
      framework: 'VARK Assessment',
      icon: BookOpen,
      color: 'sky',
      path: '/dashboard/assessments/learning-style',
      desc: 'Determines Visual, Auditory, Reading, or Kinesthetic learning preferences.',
      completed: true
    },
    {
      key: 'eqLeadership',
      title: 'EQ & Leadership Fit',
      framework: 'Emotional Intelligence',
      icon: Award,
      color: 'amber',
      path: '/dashboard/assessments/eq-leadership',
      desc: 'Evaluates stress resilience, team mentorship readiness, and emotional control.',
      completed: true
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#133E6D] to-[#0B2545] text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold border border-white/10">
            Scientific Evaluation Suite
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Counsellor Assigned 2/3 Tests
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Psychometric Career & Personality Suite (5 Standardized Tests)
        </h1>
        <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Your counsellor assigns 2 to 3 tests out of the 5 standardized psychometric frameworks to evaluate university program fit, personality traits, and career trajectory.
        </p>
      </div>

      {/* 5 Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testsList.map((test) => {
          const Icon = test.icon;
          const assigned = isAssigned(test.key);
          return (
            <div key={test.key} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0B2545] font-bold`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {assigned && (
                      <span className="px-2 py-0.5 rounded-full bg-[#0B2545]/10 text-[#0B2545] text-[9px] font-extrabold uppercase tracking-wider border border-[#0B2545]/20">
                        Assigned by Counsellor
                      </span>
                    )}
                    {test.completed && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Completed
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B2545]">{test.framework}</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">{test.title}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {test.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={test.path}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition"
                >
                  <span>{test.completed ? 'View Results / Retake' : 'Start Assessment'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CFA25E]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
