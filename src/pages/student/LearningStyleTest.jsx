import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Brain, ArrowRight, CheckCircle2, ChevronLeft, Sparkles, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const LearningStyleTest = () => {
  const navigate = useNavigate();
  const { addNotification } = useData();

  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    { id: 1, text: "When learning a complex new subject, what helps you absorb information best?", options: [
      { key: "V", text: "Interactive diagrams, infographics, and mind maps" },
      { key: "A", text: "Listening to podcasts, lectures, and group debates" },
      { key: "R", text: "Reading textbook chapters and writing thorough summaries" },
      { key: "K", text: "Hands-on projects, lab exercises, and practical building" }
    ]},
    { id: 2, text: "When preparing for university admissions exams, your strategy is:", options: [
      { key: "V", text: "Color-coding flashcards and highlighting key charts" },
      { key: "A", text: "Explaining concepts out loud to study partners" },
      { key: "R", text: "Creating structured bullet-point revision notebooks" },
      { key: "K", text: "Solving timed practice tests and interactive simulations" }
    ]},
    { id: 3, text: "When receiving SOP feedback from your counsellor, you prefer:", options: [
      { key: "V", text: "Visual document layouts with highlighted track changes" },
      { key: "A", text: "A 1-on-1 audio call discussing narrative structure" },
      { key: "R", text: "Detailed written editorial notes in margin comments" },
      { key: "K", text: "Co-editing the draft together live in a working session" }
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
      'Learning Style Assessment Complete',
      'Your VARK learning style fit score has been calculated and shared with your counsellor.',
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
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Psychometric Assessment 4 of 5</span>
          <h1 className="text-2xl font-black text-slate-900">VARK Learning Style Assessment</h1>
        </div>
      </div>

      {isCompleted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Assessment Complete!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Your primary learning style is <strong>Visual & Kinesthetic (45% Visual, 35% Kinesthetic)</strong>.
          </p>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Visual Preference:</span>
              <span className="font-bold text-indigo-600">45% (High Diagram & Chart Fit)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Kinesthetic Preference:</span>
              <span className="font-bold text-emerald-600">35% (Hands-on Project Fit)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Counsellor Sync:</span>
              <span className="font-bold text-slate-900">Synced to Arti Sood's Dashboard</span>
            </div>
          </div>

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
                          selected ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold ring-2 ring-indigo-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {selected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
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
            Submit Learning Style Assessment
          </button>
        </form>
      )}
    </div>
  );
};
