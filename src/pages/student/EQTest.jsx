import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, ArrowRight, CheckCircle2, ChevronLeft, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const EQTest = () => {
  const navigate = useNavigate();
  const { addNotification } = useData();

  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    { id: 1, text: "When facing a tight university application deadline under pressure, you:", options: [
      { key: "1", text: "Break the tasks into prioritized steps and execute calmly" },
      { key: "2", text: "Seek immediate reassurance from peers and family" },
      { key: "3", text: "Feel overwhelmed and delay work until the last hour" }
    ]},
    { id: 2, text: "In group project mentorship or leadership scenarios, your focus is:", options: [
      { key: "1", text: "Active listening, conflict resolution, and delegating strengths" },
      { key: "2", text: "Taking complete individual control over all project deliverables" },
      { key: "3", text: "Following instructions without offering team direction" }
    ]}
  ];

  const handleSelect = (qId, optionKey) => {
    setAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCompleted(true);
    addNotification(
      'ASSESSMENT',
      'EQ & Leadership Fit Complete',
      'Your Emotional Intelligence score (84/100) has been added to your profile.',
      '/dashboard/assessments'
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/assessments" className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Psychometric Assessment 5 of 5</span>
          <h1 className="text-2xl font-black text-slate-900">EQ & Leadership Readiness Fit</h1>
        </div>
      </div>

      {isCompleted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center mx-auto border border-purple-200">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">EQ Evaluation Complete!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your Emotional Intelligence & Leadership Readiness score is <strong>84 / 100 (High Readiness)</strong>.
          </p>

          <Link
            to="/dashboard/assessments"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Back to All Assessments <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">{q.id}. {q.text}</h4>
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.key;
                    return (
                      <div
                        key={opt.key}
                        onClick={() => handleSelect(q.id, opt.key)}
                        className={`p-3.5 rounded-2xl border cursor-pointer text-xs font-medium transition flex items-center justify-between ${
                          selected ? 'bg-purple-50 border-purple-500 text-purple-900 font-bold ring-2 ring-purple-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={Object.keys(answers).length < questions.length}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg transition"
          >
            Submit EQ Assessment
          </button>
        </form>
      )}
    </div>
  );
};
