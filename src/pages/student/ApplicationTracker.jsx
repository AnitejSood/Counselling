import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertTriangle, FileText, Compass, Check } from 'lucide-react';

export const ApplicationTracker = () => {
  const { pipelineStudents, verifiedProofs } = useData();

  // Find student applications from pipeline dataset or default
  const student = pipelineStudents[0];
  const [flagDiscrepancyModal, setFlagDiscrepancyModal] = useState(null);
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  const visaChecklist = [
    { id: "v1", title: "Official Admission Offer & Acceptance Letter", done: true },
    { id: "v2", title: "CAS / I-20 Form Issued by University", done: true },
    { id: "v3", title: "Proof of Financial Solvency (Bank Statement / Education Loan)", done: true },
    { id: "v4", title: "Medical Certificate & Biometrics Appointment", done: false },
    { id: "v5", title: "Visa Interview Drill with Counsellor", done: false },
    { id: "v6", title: "Student Housing & Pre-Departure Flight Booking", done: false }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Student Step 7</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Application & Offer Tracker</h1>
        </div>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Single Source of Truth
        </span>
      </div>

      {/* Applications Cards */}
      <div className="space-y-6">
        {student.applications.map((app, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{app.school}</h3>
                  {app.proofVerified && (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Offer Seal
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">{app.program} • {app.fitScore}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${
                  app.status === 'Admitted' ? 'bg-emerald-600 text-white' : app.status === 'Submitted' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-100'
                }`}>
                  {app.status}
                </span>
                <span className="text-xs text-rose-600 font-bold">Deadline: {app.deadline}</span>
              </div>
            </div>

            {/* Discrepancy Flagging Tool from User Flow Spec */}
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-600">Need to update status or report a discrepancy with counsellor record?</span>
              <button 
                onClick={() => setFlagDiscrepancyModal(app.school)}
                className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Flag Status Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Flag Discrepancy Modal */}
      {flagDiscrepancyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">Flag Status Discrepancy — {flagDiscrepancyModal}</h3>
            <p className="text-xs text-slate-600 mb-4">
              If your application status differs from your counsellor's record, send a resolution flag directly to the platform thread.
            </p>

            {flagSubmitted ? (
              <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl text-xs font-bold text-center">
                ✓ Discrepancy flag sent! Counsellor notified to sync records.
              </div>
            ) : (
              <div className="space-y-3">
                <textarea 
                  rows={3} 
                  placeholder="Describe status update (e.g. Received official interview invite today)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setFlagDiscrepancyModal(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setFlagSubmitted(true)}
                    className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Submit Flag
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post-Admit Visa & Pre-Departure Checklist */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Post-Admit Visa & Pre-Departure Checklist</h2>
            <p className="text-xs text-slate-500">Track your essential visa documents and orientation steps</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            3 of 6 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visaChecklist.map(item => (
            <div key={item.id} className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium ${
              item.done ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                  item.done ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                }`}>
                  {item.done && <Check className="w-3.5 h-3.5" />}
                </div>
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
