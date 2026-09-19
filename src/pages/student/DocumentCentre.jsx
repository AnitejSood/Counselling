import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  FolderOpen, Upload, FileText, CheckCircle, AlertCircle, Eye, Trash2, 
  ShieldCheck, CheckCircle2, Sparkles, Send, Clock, BookOpen, ChevronRight, PenTool, Award
} from 'lucide-react';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

export const DocumentCentre = () => {
  const { documents, addDocument, deleteDocument, sopCycles, submitSopDraft, counsellors, counsellorSwitchState } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Academic Transcripts');
  const [uploadTitle, setUploadTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [notice, setNotice] = useState('');

  // SOP submission form state
  const [sopDraftModalOpen, setSopDraftModalOpen] = useState(false);
  const [sopVersionNum, setSopVersionNum] = useState('v2.1');
  const [sopStageChoice, setSopStageChoice] = useState('STRUCTURAL_REVIEW');
  const [sopFileName, setSopFileName] = useState('');
  const [sopStudentNotes, setSopStudentNotes] = useState('');

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    variant: 'danger',
    onConfirm: () => {}
  });

  const assignedCounsellor = counsellors?.find(c => c.id === counsellorSwitchState?.assignedCounsellorId) || counsellors?.[0];
  const counsellorName = assignedCounsellor?.fullName || 'Assigned Counsellor';

  const categories = [
    'Passport',
    'Academic Transcripts',
    'Mark Sheets',
    'Degree Certificates',
    'Resume / CV',
    'SOP',
    'LOR',
    'English Test Scores',
    'Standardised Test Scores',
    'Financial Documents',
    'Visa Documents',
    'Other'
  ];

  const sopStages = [
    { key: 'STORY_MINING', label: '1. Story-Mining', desc: 'Narrative ideation, leadership hooks & research focus' },
    { key: 'STRUCTURAL_REVIEW', label: '2. Structural Review', desc: 'Paragraph architecture, faculty papers & flow' },
    { key: 'LINE_EDIT', label: '3. Line Edit', desc: 'Stylistic polish, syntax precision & word count' },
    { key: 'APPROVED_FINAL', label: '4. Final Signoff', desc: 'Verified ready for university portal upload' }
  ];

  const currentSop = sopCycles?.[0] || {
    id: 'sop_101',
    title: 'Master of Science in Computer Science SOP',
    currentStage: 'STRUCTURAL_REVIEW',
    versions: []
  };

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    addDocument({
      category: selectedCategory,
      title: uploadTitle,
      fileName: fileName || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '1.8 MB',
      description: selectedCategory === 'Other' ? otherDescription : null
    });

    setUploadTitle('');
    setFileName('');
    setOtherDescription('');
    showMsg('Document uploaded for counsellor verification!');
  };

  const handleSopSubmit = (e) => {
    e.preventDefault();
    submitSopDraft(currentSop.id, {
      version: sopVersionNum,
      stage: sopStageChoice,
      fileName: sopFileName || `SOP_${sopVersionNum}_Draft.docx`,
      studentNotes: sopStudentNotes
    });
    setSopDraftModalOpen(false);
    setSopStudentNotes('');
    setSopFileName('');
    showMsg(`Submitted SOP ${sopVersionNum} for ${counsellorName}'s critique!`);
  };

  const handleDeleteDoc = (doc) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Document',
      message: `Are you sure you want to permanently delete "${doc.title}"? Your counsellor will no longer have access to this file for admissions review.`,
      confirmText: 'Delete Document',
      variant: 'danger',
      onConfirm: () => {
        deleteDocument(doc.id);
        showMsg(`Document "${doc.title}" deleted.`);
      }
    });
  };

  const getStageIndex = (stageKey) => {
    return sopStages.findIndex(s => s.key === stageKey);
  };

  const currentStageIdx = getStageIndex(currentSop.currentStage);

  return (
    <div className="space-y-8 w-full font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#CFA25E]">Verified Records & Editorial Hub</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">Document Centre & SOP Mentorship</h1>
          <p className="text-xs text-slate-500">Track 3-stage iterative SOP version reviews and manage official verified documents.</p>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* FEATURE 1: 3-STAGE SOP MENTORSHIP & VERSION CYCLE (Spec Step 6) */}
      <div className="bg-gradient-to-br from-[#0B2545] via-[#133E6D] to-[#0B2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#CFA25E]/20 text-[#CFA25E] text-xs font-bold border border-[#CFA25E]/30 inline-flex items-center gap-1.5 mb-2">
              <PenTool className="w-3.5 h-3.5" /> Bespoke SOP Editorial Suite • 4-Stage Mentorship
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold">{currentSop.title}</h2>
            <p className="text-xs text-slate-300">
              Assigned Mentor: <strong>{counsellorName}</strong> • Target Schools: Carnegie Mellon, Imperial, Toronto
            </p>
          </div>

          <button
            onClick={() => setSopDraftModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#CFA25E] hover:bg-amber-400 text-[#0B2545] font-extrabold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Upload className="w-4 h-4" />
            Upload New SOP Version
          </button>
        </div>

        {/* 4-Stage Visual Progress Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sopStages.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={stage.key}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-white/15 border-[#CFA25E] ring-2 ring-[#CFA25E]/50 shadow-lg'
                    : isCompleted
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-white/5 border-white/10 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-extrabold ${isCurrent ? 'text-[#CFA25E]' : isCompleted ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {stage.label}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-[#CFA25E] animate-ping" />
                  ) : null}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">{stage.desc}</p>
                {isCurrent && (
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider bg-[#CFA25E] text-[#0B2545] px-2 py-0.5 rounded-md">
                    Active Editorial Review
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* SOP Version History & Critique Log */}
        <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#CFA25E]" /> SOP Revision History & Feedback Log ({(currentSop.versions || []).length} drafts)
            </h3>
          </div>

          <div className="space-y-3">
            {(currentSop.versions || []).map((ver, vIdx) => (
              <div key={vIdx} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#CFA25E] text-[#0B2545] text-xs font-extrabold">
                      {ver.version}
                    </span>
                    <span className="text-xs font-bold text-white">{ver.fileName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({ver.stage})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">{ver.submittedAt}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ver.status === 'APPROVED' ? 'bg-emerald-500 text-white' : ver.status === 'REVIEWED' ? 'bg-indigo-500 text-white' : 'bg-amber-500 text-slate-950'
                    }`}>
                      {ver.status}
                    </span>
                  </div>
                </div>

                {ver.studentNotes && (
                  <p className="text-[11px] text-slate-300 bg-white/5 p-2 rounded-xl border border-white/5">
                    <strong className="text-slate-200">Your Submission Note:</strong> {ver.studentNotes}
                  </p>
                )}

                {ver.counsellorFeedback && (
                  <div className="text-xs text-amber-200 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#CFA25E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#CFA25E] block text-[11px] uppercase tracking-wider">{counsellorName}'s Critique:</strong>
                      <p className="italic font-medium text-[11px] mt-0.5 text-amber-100">{ver.counsellorFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FEATURE 2: GENERAL VERIFIED APPLICATION DOCUMENTS */}
      <div className="space-y-6">
        
        {/* Upload Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#0B2545]" /> Upload Document for Admissions Review
          </h3>

          <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-slate-500 mb-1">Document Category *</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-500 mb-1">Document Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. VJTI 6th Sem Marksheet"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-slate-500 mb-1">File Name (Mock upload)</label>
              <input
                type="text"
                placeholder="e.g. Marksheet_Sem6.pdf"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
              />
            </div>

            {selectedCategory === 'Other' && (
              <div className="sm:col-span-3 space-y-1 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 animate-in fade-in">
                <label className="block font-bold uppercase text-amber-900 text-[11px] mb-1">
                  Document Description & Explanation *
                </label>
                <textarea
                  required
                  rows={2}
                  value={otherDescription}
                  onChange={e => setOtherDescription(e.target.value)}
                  placeholder="Explain what this custom document is (e.g. Patent publication, Patent grant certificate, Extra scholarship proof, Olympiad medal)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
                <p className="text-[10px] text-amber-800">Please provide clear context so your assigned counsellor can review its relevance for admissions.</p>
              </div>
            )}

            <div className="sm:col-span-3 flex justify-end pt-2 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#CFA25E]" /> Upload Document
              </button>
            </div>
          </form>
        </div>

        {/* Document List */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#CFA25E]" /> Uploaded Verified Documents ({documents.length})
          </h3>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-slate-300 transition-all">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold text-[#0B2545] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">{doc.fileName} • {doc.fileSize || '1.5 MB'} • Uploaded {doc.uploadedAt}</p>
                  {doc.description && (
                    <p className="text-[11px] text-slate-700 bg-white p-2 rounded-xl border border-slate-200 mt-1">
                      <strong>Note:</strong> {doc.description}
                    </p>
                  )}
                  {doc.counsellorComment && (
                    <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200 italic mt-1 font-medium">
                      "Mentor Feedback: {doc.counsellorComment}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    doc.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : doc.status === 'Under Review'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {doc.status}
                  </span>

                  <button
                    onClick={() => handleDeleteDoc(doc)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SOP DRAFT SUBMISSION MODAL */}
      {sopDraftModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Upload New SOP Draft Version</h3>
                <p className="text-xs text-slate-500">Submits draft for {counsellorName}'s structural and line critique</p>
              </div>
              <button onClick={() => setSopDraftModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSopSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Version Identifier *</label>
                <input
                  type="text"
                  required
                  value={sopVersionNum}
                  onChange={e => setSopVersionNum(e.target.value)}
                  placeholder="e.g. v2.1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Target Editorial Stage *</label>
                <select
                  value={sopStageChoice}
                  onChange={e => setSopStageChoice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="STORY_MINING">1. Story-Mining (Core narrative & hooks)</option>
                  <option value="STRUCTURAL_REVIEW">2. Structural Review (Paragraph flow & logic)</option>
                  <option value="LINE_EDIT">3. Line Edit (Syntax, style & polish)</option>
                  <option value="APPROVED_FINAL">4. Final Signoff (Submission ready)</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">File Name (Word / Google Doc export) *</label>
                <input
                  type="text"
                  required
                  value={sopFileName}
                  onChange={e => setSopFileName(e.target.value)}
                  placeholder="e.g. Rohan_Mehta_SOP_v2_1_Revised.docx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Notes for Mentor (What changed?)</label>
                <textarea
                  rows={3}
                  value={sopStudentNotes}
                  onChange={e => setSopStudentNotes(e.target.value)}
                  placeholder="e.g. Addressed previous feedback on paragraph 3; tightened word count from 1,100 to 920 words..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSopDraftModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer"
                >
                  Submit for Critique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(p => ({ ...p, isOpen: false }))}
      />
    </div>
  );
};
