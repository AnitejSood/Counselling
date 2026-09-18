import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  ShieldCheck, CheckCircle2, XCircle, CreditCard, Mail, User, Lock, Award,
  FileText, Eye, Check, ExternalLink, Briefcase, DollarSign, Phone, MapPin,
  Sparkles, Edit3, AlertCircle, Send
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

export const VerificationAdmin = () => {
  const { verificationApps, updateVerificationStatus } = useData();
  const [notice, setNotice] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [revisionApp, setRevisionApp] = useState(null);
  const [revisionNotes, setRevisionNotes] = useState('');

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: '',
    variant: 'primary',
    onConfirm: () => {}
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 4000); };

  const handleApprovePrompt = (app) => {
    setConfirmModal({
      isOpen: true,
      title: `Approve Verification for ${app.counsellorName}?`,
      message: `This will mark their credentials and ID proofs as verified, add them to the marketplace, and dispatch account credentials.`,
      confirmLabel: 'Approve & Issue Badge',
      variant: 'primary',
      onConfirm: () => {
        updateVerificationStatus(app.id, 'VERIFIED', 'ID documents & offer letters verified cleanly.');
        showMsg(`Approved ${app.counsellorName}! Username: ${app.generatedUsername} & Password dispatched.`);
        setSelectedApp(null);
      }
    });
  };

  const handleRejectPrompt = (app) => {
    setConfirmModal({
      isOpen: true,
      title: `Reject Application for ${app.counsellorName}?`,
      message: `Are you sure you want to reject this counsellor's verification? They will not be listed on matchEd.`,
      confirmLabel: 'Reject Application',
      variant: 'destructive',
      onConfirm: () => {
        updateVerificationStatus(app.id, 'REJECTED', 'Documents incomplete or unreadable.');
        showMsg(`Rejected application for ${app.counsellorName}.`);
        setSelectedApp(null);
      }
    });
  };

  const handleSendRevision = () => {
    if (!revisionNotes.trim()) return;
    updateVerificationStatus(revisionApp.id, 'NEEDS_REVISION', revisionNotes.trim());
    showMsg(`Sent verification back to ${revisionApp.counsellorName} for revision.`);
    setRevisionApp(null);
    setRevisionNotes('');
    if (selectedApp?.id === revisionApp.id) {
      setSelectedApp(null);
    }
  };

  return (
    <div className="space-y-8 w-full font-sans">
      <PageHeader
        eyebrow="matchEd Identity & Document Audit"
        title="Counsellor ID Verification & Offer Letter Audit"
        subtitle="Inspect full onboarding application forms, government IDs (Front & Back), credentials, and degree proofs submitted by counsellors."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-6">
        {verificationApps.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center text-xs text-slate-500">
            No verification applications pending review.
          </div>
        ) : (
          verificationApps.map(app => (
            <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-[#0B2545] text-base">{app.counsellorName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      app.status === 'NEEDS_REVISION' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                      app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {app.status === 'NEEDS_REVISION' ? 'Needs Revision' : app.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{app.email} · {app.experienceYears} Years Exp · Submitted {app.submittedAt}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-[#0B2545] rounded-xl text-xs font-bold border border-amber-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#CFA25E]" /> Inspect Profile
                  </button>

                  <button
                    onClick={() => { setRevisionApp(app); setRevisionNotes(app.revisionNotes || ''); }}
                    className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-sky-600" /> Send for Revision
                  </button>

                  {app.status !== 'VERIFIED' && (
                    <button
                      onClick={() => handleApprovePrompt(app)}
                      className="px-4 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#CFA25E]" /> Approve & Issue Badge
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

              {/* Revision note banner */}
              {app.status === 'NEEDS_REVISION' && app.revisionNotes && (
                <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl text-xs text-sky-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <p><strong>Feedback Sent to Counsellor:</strong> "{app.revisionNotes}"</p>
                </div>
              )}

              {/* ID Front & Back Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Government ID (Front)</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#0B2545]" />
                    <span className="text-xs font-semibold text-slate-800">{app.govIdType || 'Aadhaar Card'} Front Picture</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Government ID (Back)</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#0B2545]" />
                    <span className="text-xs font-semibold text-slate-800">{app.govIdType || 'Aadhaar Card'} Back Picture</span>
                  </div>
                </div>
              </div>

              {/* Credentials & Account Details */}
              <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200/60 space-y-1 text-xs text-[#0B2545]">
                <p><strong>Specialization Tracks:</strong> {(app.tracks || ['Study abroad admissions']).join(', ')}</p>
                <p><strong>Credentials & Degrees:</strong> {app.credentials}</p>
                {app.generatedUsername && (
                  <p className="pt-1 text-slate-700"><strong>Generated Account:</strong> Username: <code className="bg-white px-2 py-0.5 rounded font-mono text-[#0B2545] font-bold border border-slate-200">{app.generatedUsername}</code> | Password: <code className="bg-white px-2 py-0.5 rounded font-mono text-[#0B2545] font-bold border border-slate-200">{app.generatedPassword}</code></p>
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
                <h3 className="text-lg font-bold text-[#0B2545]">Complete Onboarding Application Profile</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer">×</button>
            </div>

            {/* Profile Overview */}
            <div className="bg-[#0B2545] text-white p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#CFA25E] flex items-center justify-center text-[#0B2545] font-black text-lg">
                  {selectedApp.counsellorName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{selectedApp.counsellorName}</h4>
                  <p className="text-xs text-amber-200 font-semibold">{selectedApp.email} · {selectedApp.experienceYears} Years Experience</p>
                </div>
              </div>
            </div>

            {/* Application Form Details Breakdown */}
            <div className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Speciality</span>
                  <span className="font-bold text-slate-900">{selectedApp.specialtyTrack || 'Study Abroad Admissions'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Claimed Verified Placements</span>
                  <span className="font-bold text-slate-900">{selectedApp.claimedPlacements || 150}+ Students Placed</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Academic & Professional Qualifications</h5>
                <p className="leading-relaxed">{selectedApp.credentials}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Personal Bio & Guidance Philosophy</h5>
                <p className="leading-relaxed text-slate-600">
                  {selectedApp.bio || `${selectedApp.counsellorName} has over ${selectedApp.experienceYears} years of experience helping students secure admissions in top global universities across US, UK, Canada, and Australia.`}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px]">Verification Proofs & Work Samples</h5>
                <p className="text-slate-600">Sample SOP / Proof Document: <strong>{selectedApp.sampleWorkProvided || 'Offer_Letter_Imperial_Verification.pdf'}</strong></p>
                <div className="flex gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold text-[10px]">Aadhaar / ID Card Verified</span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold text-[10px]">Degree Certificate Attached</span>
                </div>
              </div>

              {selectedApp.revisionNotes && (
                <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-sky-900">
                  <p className="font-bold">Active Revision Note:</p>
                  <p className="italic mt-0.5">"{selectedApp.revisionNotes}"</p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center gap-2 pt-3 border-t border-slate-100 flex-wrap">
              <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold cursor-pointer">Close</button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setRevisionApp(selectedApp); setRevisionNotes(selectedApp.revisionNotes || ''); }}
                  className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 rounded-xl text-xs font-bold border border-sky-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 text-sky-600" /> Send for Revision
                </button>
                {selectedApp.status !== 'VERIFIED' && (
                  <button
                    onClick={() => handleApprovePrompt(selectedApp)}
                    className="px-5 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 text-[#CFA25E]" /> Approve Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVISION NOTES MODAL */}
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

            <p className="text-xs text-slate-600">
              Specify what corrections or additional proof documents are needed from this counsellor before verification can be granted.
            </p>

            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="e.g. Please re-upload a clearer image of your government ID back and provide your official Master's degree certificate."
              className="w-full p-3 text-xs rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 font-sans"
            />

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

      {/* CONFIRMATION MODAL */}
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


