import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertTriangle, FileText, Compass, Check } from 'lucide-react';

export const ApplicationTracker = () => {
  const { pipelineStudents, verifiedProofs } = useData();

  // Find student applications from pipeline dataset or default
  const student = pipelineStudents[0];
  const [flagDiscrepancyModal, setFlagDiscrepancyModal] = useState(null);
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545]">Student Portal</span>
          <h1 className="text-2xl font-extrabold text-[#0B2545]">Application & Offer Tracker</h1>
        </div>
        <span className="text-xs font-bold bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#CFA25E]" />
          Verified Single Source of Truth
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
                  app.status === 'Admitted' ? 'bg-emerald-600 text-white' : app.status === 'Submitted' ? 'bg-[#0B2545] text-white' : 'bg-slate-800 text-slate-100'
                }`}>
                  {app.status}
                </span>
                <span className="text-xs text-rose-600 font-bold">Deadline: {app.deadline}</span>
              </div>
            </div>

            {/* Discrepancy Flagging Tool from User Flow Spec */}
            <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <span className="text-slate-600">Need to update status or report a discrepancy with counsellor record?</span>
              <button 
                onClick={() => setFlagDiscrepancyModal(app.school)}
                className="text-[#0B2545] hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
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
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setFlagSubmitted(true)}
                    className="px-4 py-2 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Submit Flag
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
