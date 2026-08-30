import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, CheckCircle2, XCircle, CreditCard, Mail, User, Lock, Award, FileText, Eye, Check, ExternalLink, Briefcase, DollarSign, Phone, MapPin, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const VerificationAdmin = () => {
  const { verificationApps, updateVerificationStatus } = useData();
  const [notice, setNotice] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleApprove = (app) => {
    updateVerificationStatus(app.id, 'VERIFIED', 'ID documents & offer letters verified cleanly.');
    showMsg(`Approved ${app.counsellorName}! Username: ${app.generatedUsername} & Password emailed to ${app.email}.`);
  };

  const handleReject = (app) => {
    updateVerificationStatus(app.id, 'REJECTED', 'Documents incomplete or unreadable.');
    showMsg(`Rejected application for ${app.counsellorName}.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <PageHeader
        eyebrow="Identity & Document Audit"
        title="Counsellor ID Verification & Offer Letter Audit"
        subtitle="Inspect full onboarding application forms, government IDs, credentials, and degree proofs submitted by counsellors."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
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
                    <h3 className="font-extrabold text-slate-900 text-base">{app.counsellorName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'REJECTED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {app.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{app.email} · {app.experienceYears} Years Exp · Submitted {app.submittedAt}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-indigo-600" /> View Complete Profile
                  </button>

                  {app.status === 'PENDING_REVIEW' && (
                    <>
                      <button
                        onClick={() => handleApprove(app)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve & Issue Badge
                      </button>
                      <button
                        onClick={() => handleReject(app)}
                        className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ID Front & Back Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Government ID (Front)</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-semibold text-slate-800">{app.govIdType || 'Aadhaar Card'} Front Picture</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Government ID (Back)</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-semibold text-slate-800">{app.govIdType || 'Aadhaar Card'} Back Picture</span>
                  </div>
                </div>
              </div>

              {/* Credentials & Account Details */}
              <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 space-y-1 text-xs text-indigo-900">
                <p><strong>Specialization Tracks:</strong> {(app.tracks || ['Study abroad admissions']).join(', ')}</p>
                <p><strong>Credentials & Degrees:</strong> {app.credentials}</p>
                {app.generatedUsername && (
                  <p className="pt-1 text-slate-700"><strong>Generated Account:</strong> Username: <code className="bg-white px-2 py-0.5 rounded font-mono text-indigo-600 font-bold">{app.generatedUsername}</code> | Password: <code className="bg-white px-2 py-0.5 rounded font-mono text-indigo-600 font-bold">{app.generatedPassword}</code></p>
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
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Complete Onboarding Application Profile</h3>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">×</button>
            </div>

            {/* Profile Overview */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedApp.counsellorName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-white">{selectedApp.counsellorName}</h4>
                  <p className="text-xs text-indigo-300 font-semibold">{selectedApp.email} · {selectedApp.experienceYears} Years Experience</p>
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
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 rounded-lg font-bold text-[10px]">Degree Certificate Attached</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => setSelectedApp(null)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">Close</button>
              {selectedApp.status === 'PENDING_REVIEW' && (
                <button
                  onClick={() => { handleApprove(selectedApp); setSelectedApp(null); }}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Approve Application
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
