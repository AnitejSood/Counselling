import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { 
  Compass, CheckCircle2, Clock, AlertCircle, Calendar, Sparkles, 
  FileText, History, Upload, MessageSquare, ChevronDown, ChevronUp, Check, ShieldCheck
} from 'lucide-react';

export const MyJourney = () => {
  const { 
    milestones, 
    studentProfile, 
    roadmapChangelog, 
    addDocument, 
    counsellors, 
    counsellorSwitchState 
  } = useData();

  const [showChangelog, setShowChangelog] = useState(false);
  const [uploadModalMilestone, setUploadModalMilestone] = useState(null);
  const [uploadDocTitle, setUploadDocTitle] = useState('');
  const [uploadDocFileName, setUploadDocFileName] = useState('');
  const [notice, setNotice] = useState('');

  const assignedCounsellor = counsellors?.find(c => c.id === counsellorSwitchState?.assignedCounsellorId) || counsellors?.[0];
  const counsellorName = assignedCounsellor?.fullName || 'Assigned Counsellor';

  const showMsg = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleMilestoneFileUpload = (e) => {
    e.preventDefault();
    if (!uploadDocTitle.trim() || !uploadModalMilestone) return;

    addDocument({
      category: 'SOP',
      title: `${uploadModalMilestone.title}: ${uploadDocTitle}`,
      fileName: uploadDocFileName || `${uploadDocTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '2.1 MB',
      description: `Uploaded directly against Milestone Stage ${uploadModalMilestone.stageNumber} for ${counsellorName}'s review.`
    });

    setUploadModalMilestone(null);
    setUploadDocTitle('');
    setUploadDocFileName('');
    showMsg(`Uploaded draft for Stage ${uploadModalMilestone.stageNumber}! Visible in Document Centre.`);
  };

  return (
    <div className="space-y-8 w-full font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#133E6D] to-[#0B2545] text-white rounded-3xl p-8 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#CFA25E]/20 text-[#CFA25E] text-xs font-bold border border-[#CFA25E]/30">
            Signature Feature • Shared Journey Tracker
          </span>
          <span className="text-xs text-slate-300">
            Admissions Mentor: <strong>{counsellorName}</strong>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold">My Education & Admission Roadmap</h1>
        
        {/* Goal Card */}
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFA25E]">YOUR TARGET GOAL</span>
            <p className="text-base sm:text-lg font-bold text-white">
              {studentProfile.interestsAndGoals?.preferredCourses?.[0] || 'MS in Computer Science'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TARGET INTAKE</span>
            <p className="text-sm font-bold text-blue-300">
              {studentProfile.interestsAndGoals?.preferredIntake || 'Fall 2027'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TARGET DESTINATIONS</span>
            <p className="text-sm font-bold text-white">United States, United Kingdom, Canada</p>
          </div>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* ROADMAP REVISION HISTORY / CHANGELOG (Spec Step 5) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Roadmap Revision History & Changelog</h3>
              <p className="text-xs text-slate-500">Transparent versioning of all timeline and school calibrations</p>
            </div>
          </div>

          <button
            onClick={() => setShowChangelog(!showChangelog)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{showChangelog ? 'Hide Revision Log' : `View Revisions (${(roadmapChangelog || []).length})`}</span>
            {showChangelog ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showChangelog && (
          <div className="pt-2 border-t border-slate-100 space-y-3 animate-in fade-in">
            {(roadmapChangelog || []).map((log) => (
              <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#0B2545]">{log.counsellorName}</span>
                  <span className="text-slate-400">{log.date}</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{log.summary}</p>
                {log.affectedStages && log.affectedStages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {log.affectedStages.map((stage, sIdx) => (
                      <span key={sIdx} className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-[10px] text-slate-600 font-semibold">
                        • {stage}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MILESTONES VERTICAL TIMELINE WITH DIRECT ATTACHMENTS (Spec Step 6) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-8">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Milestone Stages ({milestones.length} Stages)
            </h2>
            <p className="text-xs text-slate-500">Co-managed roadmap with {counsellorName}. Attach drafts directly to any stage.</p>
          </div>
        </div>

        <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {milestones.map((m) => {
            const isCompleted = m.status === 'COMPLETED';
            const isInProgress = m.status === 'IN_PROGRESS';

            return (
              <div key={m.id} className="relative flex items-start gap-4">
                
                {/* Status Dot Icon */}
                <div className={`
                  absolute -left-[35px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition
                  ${isCompleted ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' : isInProgress ? 'bg-[#0B2545] text-white ring-4 ring-blue-50 animate-pulse' : 'bg-slate-100 text-slate-400 border border-slate-300'}
                `}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : m.stageNumber}
                </div>

                <div className={`
                  flex-1 p-5 rounded-2xl border transition-all space-y-3
                  ${isInProgress
                    ? 'bg-blue-50/70 border-blue-500 shadow-md'
                    : isCompleted
                      ? 'bg-slate-50/70 border-slate-200'
                      : 'bg-white border-slate-200 opacity-70'
                  }
                `}>
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Stage {m.stageNumber}</span>
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : isInProgress ? 'bg-[#0B2545] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isCompleted ? '✓ Completed' : isInProgress ? 'In Progress' : 'Pending'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{m.notes}</p>

                  {/* Tasks & Deliverables */}
                  {m.tasks && m.tasks.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tasks & Deliverables:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {m.tasks.map((task, i) => (
                          <div key={i} className="flex items-center gap-2 text-slate-700">
                            <span className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : isInProgress ? 'bg-[#0B2545]' : 'bg-slate-300'}`}></span>
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-200/60 gap-2">
                    <div className="text-[11px] text-slate-500 font-medium">
                      {isCompleted ? `Completed on: ${m.completedDate || 'Earlier in program'}` : `Target Due Date: ${m.dueDate}`}
                    </div>

                    {/* Milestone Actions (Spec Step 6: Direct Upload & Scoped Chat) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setUploadModalMilestone(m)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B2545] border border-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#CFA25E]" />
                        Attach Draft / Transcript
                      </button>

                      <Link
                        to={`/dashboard/messages?channel=${encodeURIComponent(m.title)}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                        Discuss Stage
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* MILESTONE FILE UPLOAD MODAL */}
      {uploadModalMilestone && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Attach Draft to Stage {uploadModalMilestone.stageNumber}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{uploadModalMilestone.title}</p>

            <form onSubmit={handleMilestoneFileUpload} className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Document Label / Purpose *</label>
                <input
                  type="text"
                  required
                  value={uploadDocTitle}
                  onChange={e => setUploadDocTitle(e.target.value)}
                  placeholder="e.g. GRE Score Card or SOP Outline v1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">File Name *</label>
                <input
                  type="text"
                  required
                  value={uploadDocFileName}
                  onChange={e => setUploadDocFileName(e.target.value)}
                  placeholder="e.g. Rohan_Mehta_GRE_Official.pdf"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setUploadModalMilestone(null)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer"
                >
                  Upload Attachment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
