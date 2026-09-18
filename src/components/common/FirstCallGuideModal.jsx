import React from 'react';
import { Video, CheckCircle2, FileText, HelpCircle, Compass, Sparkles, X } from 'lucide-react';

export const FirstCallGuideModal = ({ isOpen, onClose, counsellorName = 'Your Counsellor' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0]">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA25E] inline mr-1" /> Student Orientation Guide
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#0B2545]">First Call with {counsellorName}: How It Works</h2>
          <p className="text-xs text-slate-500">
            A step-by-step roadmap of what to prepare, what to expect, and questions to ask during your first 1-on-1 strategy call.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-4 text-xs">
          
          {/* Pillar 1: Pre-Call Prep */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-[#0B2545]">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>1. What to Prepare Before the Call (10 Mins)</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
              <li><strong>Academic marksheets:</strong> Have your semester marksheets or 10th/12th percentages handy.</li>
              <li><strong>Test status:</strong> Note down your current or target IELTS/TOEFL and GRE/GMAT scores.</li>
              <li><strong>Target intake & countries:</strong> Clarify whether you are aiming for Fall 2026, Spring 2027, etc.</li>
              <li><strong>Annual budget:</strong> Have a realistic family budget range in mind (e.g. ₹30L–₹50L/year).</li>
            </ul>
          </div>

          {/* Pillar 2: During the Call */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-emerald-950">
              <Video className="w-4 h-4 text-emerald-600" />
              <span>2. What Happens During the 45-Min Call</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
              <li><strong>Profile Audit (15 mins):</strong> Your counsellor breaks down your GPA, projects, and work experience to assess Ivy League, Russell Group, or target university viability.</li>
              <li><strong>Psychometric Trajectory (10 mins):</strong> Review of your Holland Codes (RIASEC) and learning style to narrow down degree specializations.</li>
              <li><strong>Strategy Alignment (15 mins):</strong> Outlining the target timeline for SOP drafts, LOR requests, and test deadlines.</li>
              <li><strong>Live Q&A (5 mins):</strong> Addressing your doubts and clearing misconceptions.</li>
            </ul>
          </div>

          {/* Pillar 3: Questions to Ask */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-amber-950">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>3. Smart Questions You Should Ask Your Counsellor</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-5 text-slate-700">
              <li><em>"Based on my GPA, what are 2 dream, 2 target, and 2 safety universities you recommend?"</em></li>
              <li><em>"What is the single biggest weakness in my profile right now, and how can we offset it in the SOP?"</em></li>
              <li><em>"What scholarships or research assistantships are realistic for my program?"</em></li>
            </ul>
          </div>

          {/* Pillar 4: Post-Call Roadmap */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-slate-900">
              <Compass className="w-4 h-4 text-[#CFA25E]" />
              <span>4. Next Steps After the Call</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Within 24–48 hours post-call, your counsellor will publish your customized <strong>Tabular Journey Roadmap</strong> and dispatch your first <strong>University Recommendations</strong> right into your matchEd portal.
            </p>
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0B2545] hover:bg-[#133E68] text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Got it, I'm Ready for My First Call!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstCallGuideModal;
