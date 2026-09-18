import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, DollarSign, CheckCircle2, ShieldCheck, RefreshCw, AlertCircle, Check, X, Layers } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { formatINR } from '../../lib/formatters';

export const EscrowBillingAdmin = () => {
  const { escrowBookings, releaseEscrowPayout, rejectEscrowRelease, refundEscrowBooking } = useData();
  const [notice, setNotice] = useState('');

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const totalGMV = escrowBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
  const platformCut = Math.round(totalGMV * 0.15); // 15% platform cut
  const escrowHolding = escrowBookings.filter(b => b.escrowStatus === 'HELD_IN_ESCROW' || b.escrowStatus === 'RELEASE_REQUESTED').reduce((sum, b) => sum + (b.amount || 0), 0);

  const pendingRequests = escrowBookings.filter(b => b.escrowStatus === 'RELEASE_REQUESTED');

  return (
    <div className="space-y-8 w-full font-sans">
      <PageHeader
        eyebrow="Escrow Ledger & Payments Governance"
        title="Escrow & Billing Payments Manager"
        subtitle="Audit student booking payments, review counsellor escrow release requests, track package session limits, and approve payouts."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Booking GMV</span>
          <p className="text-2xl font-black text-slate-900">{formatINR(totalGMV)}</p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-emerald-700">15% Platform Commission Cut</span>
          <p className="text-2xl font-black text-emerald-900">{formatINR(platformCut)}</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-indigo-700">Active Escrow Holding Balance</span>
          <p className="text-2xl font-black text-indigo-900">{formatINR(escrowHolding)}</p>
        </div>
      </div>

      {/* PENDING ESCROW RELEASE REQUESTS AUDIT */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          Pending Escrow Payout Requests ({pendingRequests.length})
        </h3>

        {pendingRequests.length === 0 ? (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
            No counsellor payout requests pending approval.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map(bk => {
              const cut = Math.round(bk.amount * 0.15);
              const payout = bk.amount - cut;
              const completedCount = bk.completedSessionsCount || 0;
              const maxCap = bk.maxSessions || 5;

              return (
                <div key={bk.id} className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{bk.counsellorName}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 uppercase">
                        Release Requested
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Student: <strong>{bk.studentName}</strong> · Package: {bk.serviceTitle}</p>
                    <p className="text-xs text-indigo-600 font-semibold">
                      Session Progress: {completedCount} / {maxCap} Sessions Completed ({Math.round((completedCount / maxCap) * 100)}%)
                    </p>
                    {bk.requestNotes && (
                      <p className="text-[11px] text-slate-600 italic bg-amber-50 p-2 rounded-xl border border-amber-100 mt-1">
                        Completion Evidence: "{bk.requestNotes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-bold block">Payout Amount</span>
                      <span className="text-base font-black text-slate-900">{formatINR(payout)}</span>
                    </div>

                    <button
                      onClick={() => { releaseEscrowPayout(bk.id); showMsg(`Approved payout of ${formatINR(payout)} to ${bk.counsellorName}!`); }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Approve Release
                    </button>
                    <button
                      onClick={() => { rejectEscrowRelease(bk.id, 'Insufficient session delivery evidence'); showMsg(`Declined release request.`); }}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Escrow Transactions Ledger Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-900">Student Booking Escrow Ledger</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-4">Booking ID & Date</th>
                <th className="py-4 px-4">Student Name</th>
                <th className="py-4 px-4">Counsellor</th>
                <th className="py-4 px-4">Session Counter</th>
                <th className="py-4 px-4">Package Amount</th>
                <th className="py-4 px-4">Counsellor Payout</th>
                <th className="py-4 px-4">Escrow Status</th>
                <th className="py-4 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {escrowBookings.map(bk => {
                const cut = Math.round(bk.amount * 0.15);
                const payout = bk.amount - cut;
                const completedCount = bk.completedSessionsCount || 0;
                const maxCap = bk.maxSessions || 5;

                return (
                  <tr key={bk.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-slate-900 block">{bk.id}</span>
                      <span className="text-[10px] text-slate-400">{bk.createdAt}</span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">{bk.studentName}</td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{bk.counsellorName}</td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {completedCount} / {maxCap} Done
                      </span>
                    </td>
                    <td className="py-4 px-4 font-extrabold text-slate-900">{formatINR(bk.amount)}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{formatINR(payout)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        bk.escrowStatus === 'RELEASED_TO_COUNSELLOR' ? 'bg-emerald-100 text-emerald-800' :
                        bk.escrowStatus === 'RELEASE_REQUESTED' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        bk.escrowStatus === 'REFUNDED_TO_STUDENT' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {bk.escrowStatus?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      {bk.escrowStatus === 'RELEASE_REQUESTED' ? (
                        <button
                          onClick={() => { releaseEscrowPayout(bk.id); showMsg(`Approved payout of ${formatINR(payout)} to ${bk.counsellorName}!`); }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold shadow-sm cursor-pointer"
                        >
                          Approve Release
                        </button>
                      ) : bk.escrowStatus === 'HELD_IN_ESCROW' ? (
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => { releaseEscrowPayout(bk.id); showMsg(`Payout of ${formatINR(payout)} released to ${bk.counsellorName}!`); }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold shadow-sm cursor-pointer"
                          >
                            Release
                          </button>
                          <button
                            onClick={() => { refundEscrowBooking(bk.id); showMsg(`Refunded ${formatINR(bk.amount)} to student ${bk.studentName}.`); }}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-[11px] font-bold cursor-pointer"
                          >
                            Refund
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
