import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  ShieldCheck, CheckCircle2, XCircle, CreditCard, Mail, User, Lock, Award,
  FileText, Eye, Check, ExternalLink, Briefcase, DollarSign, Phone, MapPin,
  Sparkles, AlertCircle, Edit3, MessageSquare, Search, RefreshCw, Send
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

export const CounsellorOnboardingAdmin = () => {
  const { verificationApps, updateVerificationStatus } = useData();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Revision modal state
  const [revisionApp, setRevisionApp] = useState(null);
  const [revisionNotes, setRevisionNotes] = useState('');

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: '',
    variant: 'primary',
    onConfirm: () => {}
  });

  const showMsg = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleApprovePrompt = (app) => {
    setConfirmModal({
      isOpen: true,
      title: `Approve & Publish ${app.counsellorName}?`,
      message: `This will approve the onboarding application, create their live mentor profile, issue their verified badge, and dispatch login credentials (${app.generatedUsername || 'auto-generated'}).`,
      confirmLabel: 'Approve & Issue Access',
      variant: 'primary',
      onConfirm: () => {
        updateVerificationStatus(app.id, 'VERIFIED', 'ID documents & degree proofs verified cleanly.');
        showMsg(`Approved ${app.counsellorName}! Username & Password dispatched.`);
        setSelectedApp(null);
      }
    });
  };

  const handleRejectPrompt = (app) => {
    setConfirmModal({
      isOpen: true,
      title: `Reject Application from ${app.counsellorName}?`,
      message: `Are you sure you want to reject this counsellor application? The applicant will be marked as rejected.`,
      confirmLabel: 'Reject Application',
      variant: 'destructive',
      onConfirm: () => {
        updateVerificationStatus(app.id, 'REJECTED', 'Documents incomplete or unverifiable.');
        showMsg(`Rejected application for ${app.counsellorName}.`);
        setSelectedApp(null);
      }
    });
  };

  const handleOpenRevisionModal = (app) => {
    setRevisionApp(app);
    setRevisionNotes(app.revisionNotes || '');
  };

  const handleSendRevision = () => {
    if (!revisionNotes.trim()) return;
    updateVerificationStatus(revisionApp.id, 'NEEDS_REVISION', revisionNotes.trim());
    showMsg(`Application sent back to ${revisionApp.counsellorName} for revision with feedback notes.`);
    setRevisionApp(null);
    setRevisionNotes('');
    if (selectedApp?.id === revisionApp.id) {
      setSelectedApp(null);
    }
  };

  const filteredApps = (verificationApps || [])
    .filter(a => filter === 'ALL' || a.status === filter)
    .filter(a => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        a.counsellorName?.toLowerCase().includes(q) ||
        a.email?.toLowerCase().includes(q) ||
        a.specialtyTrack?.toLowerCase().includes(q) ||
        a.credentials?.toLowerCase().includes(q)
      );
    });

  const pendingCount = verificationApps.filter(a => a.status === 'PENDING_REVIEW').length;
  const revisionCount = verificationApps.filter(a => a.status === 'NEEDS_REVISION').length;
  const verifiedCount = verificationApps.filter(a => a.status === 'VERIFIED').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <PageHeader
        eyebrow="matchEd Counsellor Intake Desk"
        title="Counsellor Onboarding & Verification Applications"
        subtitle="Review onboarding dossiers, verify government IDs (front & back), evaluate academic credentials, and issue live credentials or request revisions."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Applications</p>
          <p className="text-2xl font-black text-[#0B2545] mt-0.5">{verificationApps.length}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Pending Audit</p>
          <p className="text-2xl font-black text-amber-900 mt-0.5">{pendingCount}</p>
        </div>
        <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-sky-800">In Revision</p>
          <p className="text-2xl font-black text-sky-900 mt-0.5">{revisionCount}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Live Mentors</p>
          <p className="text-2xl font-black text-emerald-900 mt-0.5">{verifiedCount}</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applicants by name, email, credentials, or track..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'ALL', label: 'All Applications' },
            { id: 'PENDING_REVIEW', label: `Pending (${pendingCount})` },
            { id: 'NEEDS_REVISION', label: `Needs Revision (${revisionCount})` },
            { id: 'VERIFIED', label: 'Verified' },
            { id: 'REJECTED', label: 'Rejected' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#0B2545] text-[#CFA25E] shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No applications match your filter.</p>
            <p className="text-xs text-slate-400">Try changing your search term or switching status tabs.</p>
          </div>
        ) : (
          filteredApps.map(app => (
            <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 transition hover:border-slate-300">
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2545] text-[#CFA25E] font-black text-base flex items-center justify-center ring-2 ring-[#CFA25E]/30 shrink-0">
                    {app.counsellorName?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-[#0B2545] text-base">{app.counsellorName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        app.status === 'NEEDS_REVISION' ? 'bg-sky-100 text-sky-800 border border-sky-300' :
                        app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {app.status === 'NEEDS_REVISION' ? 'Needs Revision' : app.status?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {app.email} · {app.experienceYears || 5} Years Experience · Submitted {app.submittedAt || 'Recent'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-[#0B2545] rounded-xl text-xs font-bold border border-amber-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#CFA25E]" /> Inspect Dossier
                  </button>

                  <button
                    onClick={() => handleOpenRevisionModal(app)}
                    className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-sky-600" /> Send for Revision
                  </button>

                  {app.status !== 'VERIFIED' && (
                    <button
                      onClick={() => handleApprovePrompt(app)}
                      className="px-4 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#CFA25E]" /> Approve
                    </button>
                  )}

                  {app.status !== 'REJECTED' && (
                    <button
                      onClick={() => handleRejectPrompt(app)}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>

              {/* Revision Notice Banner if in NEEDS_REVISION */}
              {app.status === 'NEEDS_REVISION' && app.revisionNotes && (
                <div className="bg-sky-50 border border-sky-200 p-3.5 rounded-2xl text-xs text-sky-900 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Sent Back for Revision with Notes:</p>
                    <p className="text-sky-800 mt-0.5 italic leading-relaxed">"{app.revisionNotes}"</p>
                  </div>
                </div>
              )}

              {/* ID Front & Back Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#0B2545]" />
                    <span className="text-xs font-bold text-slate-800">{app.govIdType || 'Government ID'} (Front)</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Uploaded
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#0B2545]" />
                    <span className="text-xs font-bold text-slate-800">{app.govIdType || 'Government ID'} (Back)</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Uploaded
                  </span>
                </div>
              </div>

              {/* Credentials & Generated Login */}
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60 space-y-1.5 text-xs text-[#0B2545]">
                <p><strong>Primary Track & Specialities:</strong> {(app.tracks || [app.specialtyTrack || 'Study Abroad Admissions']).join(', ')}</p>
                <p><strong>Qualifications & Degrees:</strong> {app.credentials || 'Certified Career Strategist'}</p>
                {app.generatedUsername && (
                  <div className="pt-2 border-t border-amber-200/60 flex items-center gap-3 flex-wrap">
                    <span className="text-slate-600 font-bold">Auto-Provisioned Portal Account:</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono text-[#0B2545] font-extrabold text-[11px]">
                      User: {app.generatedUsername}
                    </span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-mono text-[#0B2545] font-extrabold text-[11px]">
                      Pass: {app.generatedPassword || '••••••••'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* FULL ONBOARDING PROFILE INSPECTION MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#0B2545]" />
                <h3 className="text-lg font-bold text-[#0B2545]">Counsellor Onboarding Application Dossier</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer">×</button>
            </div>

            {/* Profile Header */}
            <div className="bg-[#0B2545] text-white p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#CFA25E] flex items-center justify-center text-[#0B2545] font-black text-lg">
                  {selectedApp.counsellorName?.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{selectedApp.counsellorName}</h4>
                  <p className="text-xs text-amber-200 font-semibold">{selectedApp.email} · {selectedApp.experienceYears || 5} Years Experience</p>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Speciality</span>
                  <span className="font-bold text-slate-900">{selectedApp.specialtyTrack || 'Study Abroad Admissions'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Claimed Placements</span>
                  <span className="font-bold text-slate-900">{selectedApp.claimedPlacements || 150}+ Verified Placements</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Academic & Professional Qualifications</h5>
                <p className="leading-relaxed font-medium text-slate-800">{selectedApp.credentials}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Mentorship Philosophy & Bio</h5>
                <p className="leading-relaxed text-slate-600">
                  {selectedApp.bio || `${selectedApp.counsellorName} is an accomplished admissions strategist helping students secure admits into Ivy League, Russell Group, and top Tier-1 institutions globally.`}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Government ID & Proof Status</h5>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <p className="text-[10px] font-bold text-slate-400">ID FRONT</p>
                    <p className="font-bold text-emerald-700 mt-0.5">Verified Clear</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-center">
                    <p className="text-[10px] font-bold text-slate-400">ID BACK</p>
                    <p className="font-bold text-emerald-700 mt-0.5">Verified Clear</p>
                  </div>
                </div>
              </div>

              {selectedApp.revisionNotes && (
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1 text-sky-900">
                  <p className="font-bold text-xs">Current Revision Request:</p>
                  <p className="text-xs italic">"{selectedApp.revisionNotes}"</p>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-between items-center gap-2 pt-3 border-t border-slate-100 flex-wrap">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer text-slate-700"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { handleOpenRevisionModal(selectedApp); }}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-sky-600" /> Request Revision
                </button>

                {selectedApp.status !== 'VERIFIED' && (
                  <button
                    onClick={() => handleApprovePrompt(selectedApp)}
                    className="px-5 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-[#CFA25E]" /> Approve Dossier
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEND BACK FOR REVISION FEEDBACK MODAL */}
      {revisionApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-[#0B2545]">Request Revisions from {revisionApp.counsellorName}</h3>
              </div>
              <button onClick={() => setRevisionApp(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer">×</button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Specify what needs to be corrected or re-uploaded by the applicant (e.g., higher resolution ID back image, additional proof of certified track experience, or academic transcripts).
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Revision Instructions & Feedback Notes</label>
              <textarea
                rows={4}
                value={revisionNotes}
                onChange={(e) => setRevisionNotes(e.target.value)}
                placeholder="e.g. Please re-upload a clearer image of your government ID back showing your registered address, and attach your Master's degree transcript."
                className="w-full p-3 text-xs rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRevisionApp(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRevision}
                disabled={!revisionNotes.trim()}
                className="px-5 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-[#CFA25E]" /> Send Revision Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION POPUP MODAL */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        variant={confirmModal.variant}
      />
    </div>
  );
};
