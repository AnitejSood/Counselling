import React from 'react';
import { useData } from '../../context/DataContext';
import { Compass, CheckCircle2, Clock, AlertCircle, Calendar, Sparkles, FileText } from 'lucide-react';

export const MyJourney = () => {
  const { milestones, studentProfile } = useData();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-3">
        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
          Signature Feature • Journey Tracker
        </span>
        <h1 className="text-3xl font-extrabold">My Education & Admission Journey</h1>
        
        {/* Goal Card */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">YOUR GOAL</span>
            <p className="text-lg font-bold text-white">
              {studentProfile.interestsAndGoals?.preferredCourses?.[0] || 'MS Computer Science'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TARGET INTAKE</span>
            <p className="text-sm font-bold text-blue-300">
              {studentProfile.interestsAndGoals?.preferredIntake || 'Fall 2027'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">DESTINATIONS</span>
            <p className="text-sm font-bold text-white">US, Canada, Singapore</p>
          </div>
        </div>
      </div>

      {/* Milestones Vertical Timeline */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-8">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          Milestone Timeline Roadmap (10 Stages)
        </h2>

        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {milestones.map((m) => {
            const isCompleted = m.status === 'COMPLETED';
            const isInProgress = m.status === 'IN_PROGRESS';

            return (
              <div key={m.id} className="relative flex items-start gap-4">
                
                {/* Status Dot Icon */}
                <div className={`
                  absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition
                  ${isCompleted ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' : isInProgress ? 'bg-blue-600 text-white ring-4 ring-blue-50 animate-pulse' : 'bg-slate-100 text-slate-400 border border-slate-300'}
                `}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : m.stageNumber}
                </div>

                <div className={`
                  flex-1 p-5 rounded-2xl border transition-all space-y-3
                  ${isInProgress
                    ? 'bg-blue-50/70 border-blue-500 shadow-md'
                    : isCompleted
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-white border-slate-200 opacity-60'
                  }
                `}>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stage {m.stageNumber}</span>
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isCompleted ? '✓ Completed' : isInProgress ? 'In Progress' : 'Pending'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{m.notes}</p>

                  {/* Tasks */}
                  {m.tasks && m.tasks.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tasks & Deliverables:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {m.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-700">
                            <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400 font-medium">
                    {isCompleted ? `Completed on: ${m.completedDate}` : `Target Due Date: ${m.dueDate}`}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
