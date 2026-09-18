import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Award, CheckCircle2, BookOpen, Clock, ShieldCheck, Sparkles, ArrowRight, Play, Check } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const CounsellorCertification = () => {
  const { counsellorCourses, completeCounsellorCourse, counsellors } = useData();
  const counsellor = counsellors[0];
  const course = counsellorCourses?.[0];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [completedModules, setCompletedModules] = useState([0, 1, 2]);
  const [completedNotice, setCompletedNotice] = useState(false);

  const isCourseComplete = course?.status === 'COMPLETED' || completedModules.length === (course?.modules?.length || 5);

  const handleCompleteModule = (idx) => {
    if (!completedModules.includes(idx)) {
      const updated = [...completedModules, idx];
      setCompletedModules(updated);
      if (updated.length === (course?.modules?.length || 5)) {
        completeCounsellorCourse(course?.id || 'course_cert_01');
        setCompletedNotice(true);
      }
    }
  };

  const handleFinishCourse = () => {
    completeCounsellorCourse(course?.id || 'course_cert_01');
    setCompletedNotice(true);
  };

  return (
    <div className="space-y-8 w-full font-sans">
      <PageHeader
        eyebrow="Admissions Excellence & Credentials"
        title="matchEd Certified Counsellor Course & Blue Tick Accreditation"
        subtitle="Complete the self-paced masterclass on international admissions ethics, Common App evaluation, and transparent escrow standards to unlock your Verified Blue Tick Seal."
      />

      {completedNotice && (
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center justify-between gap-4 animate-in zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-7 h-7 text-white fill-emerald-500" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-emerald-950">🎉 Verified Blue Tick Accreditation Issued!</h4>
              <p className="text-xs text-emerald-800">Your profile badge is now updated across the public marketplace and student directory.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-full uppercase">
            Blue Tick Active
          </span>
        </div>
      )}

      {/* Course Overview Hero Banner */}
      <div className="bg-gradient-to-r from-[#07192F] to-[#0B2545] text-white rounded-3xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0]">
                Official Accreditation
              </span>
              {counsellor?.hasBlueTick && (
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Blue Tick Earned
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {course?.title || "matchEd Certified Global Admissions Strategist"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course?.desc || "Master international college guidance, Common App nuances, and escrow transparency."}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2 font-medium">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#CFA25E]" /> {course?.duration || "4 Hours"}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-[#CFA25E]" /> {course?.modulesCount || 5} Interactive Modules</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-[#CFA25E]" /> Earns Verified Blue Tick Badge</span>
            </div>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl border border-white/15 text-center min-w-[200px] shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[#CFA25E] text-[#0B2545] flex items-center justify-center mx-auto mb-2 font-black text-2xl shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">Accreditation Seal</span>
            <span className="text-xs font-black text-[#CFA25E] block mt-0.5">Verified Blue Tick</span>
          </div>
        </div>
      </div>

      {/* Modules List & Interactive Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module Nav Column */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 px-1">Curriculum Modules</h3>
          <div className="space-y-2">
            {(course?.modules || []).map((m, idx) => {
              const isDone = completedModules.includes(idx);
              const isActive = activeModuleIndex === idx;

              return (
                <div
                  key={m.id}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F0F4F8] border-[#0B2545] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <span className="text-[10px] font-black uppercase text-slate-400 block">Module {idx + 1}</span>
                    <h4 className={`text-xs font-bold truncate ${isActive ? 'text-[#0B2545]' : 'text-slate-800'}`}>
                      {m.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{m.duration}</span>
                  </div>

                  <div className="shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Module Content Area */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase text-[#CFA25E] tracking-wider block">
                Active Module {activeModuleIndex + 1} of {course?.modules?.length || 5}
              </span>
              <h3 className="text-xl font-extrabold text-[#0B2545] mt-1">
                {course?.modules?.[activeModuleIndex]?.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Duration: {course?.modules?.[activeModuleIndex]?.duration}</p>
            </div>

            {completedModules.includes(activeModuleIndex) ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Completed
              </span>
            ) : (
              <button
                onClick={() => handleCompleteModule(activeModuleIndex)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
              >
                Mark as Completed
              </button>
            )}
          </div>

          <div className="prose text-xs text-slate-700 leading-relaxed space-y-4">
            <p>
              In this module, counsellors are trained on matchEd’s verified admission principles. Counsellors must ensure 100% authenticity in student essays, transparent disclosure of college admission probabilities, and zero conflict-of-interest commissions from unaccredited private universities.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h5 className="font-extrabold text-[#0B2545] text-xs">Core Learning Checkpoints:</h5>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Holistic review breakdown: Academics (40%), Extracurriculars & Impact (30%), SOP/Essays (20%), Letters of Recommendation (10%).</li>
                <li>How to map student RIASEC Holland codes to realistic international university programs.</li>
                <li>Safe handling of student transcripts, escrow release milestones, and compliance guarantees.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveModuleIndex(Math.max(0, activeModuleIndex - 1))}
              disabled={activeModuleIndex === 0}
              className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-30 cursor-pointer"
            >
              Previous Module
            </button>

            {activeModuleIndex < (course?.modules?.length || 5) - 1 ? (
              <button
                onClick={() => {
                  handleCompleteModule(activeModuleIndex);
                  setActiveModuleIndex(activeModuleIndex + 1);
                }}
                className="px-5 py-2 bg-[#0B2545] hover:bg-[#133E68] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Next Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishCourse}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" /> Finish & Claim Blue Tick
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CounsellorCertification;
