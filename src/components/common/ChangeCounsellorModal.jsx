import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, X, Star, Clock, ArrowRight, DollarSign } from 'lucide-react';

export const ChangeCounsellorModal = ({ isOpen, onClose }) => {
  const { counsellors, counsellorSwitchState, changeCounsellor, escrowBookings } = useData();
  const [selectedCounsellorId, setSelectedCounsellorId] = useState(null);
  const [resultStatus, setResultStatus] = useState(null);

  if (!isOpen) return null;

  const currentCounsellor = counsellors.find(c => c.id === counsellorSwitchState.assignedCounsellorId) || counsellors[0];
  const otherCounsellors = counsellors.filter(c => c.id !== currentCounsellor.id);

  const completedSessionsCount = escrowBookings?.[0]?.completedSessionsCount || 3;
  const maxSessions = escrowBookings?.[0]?.maxSessions || 5;

  // 1-month window calculations
  const now = new Date().getTime();
  const onboardedTime = new Date(counsellorSwitchState.onboardedDate || '2026-08-20').getTime();
  const daysElapsed = Math.floor((now - onboardedTime) / (1000 * 60 * 60 * 24));
  const maxDays = 30;
  const daysRemaining = Math.max(0, maxDays - daysElapsed);
  const isWindowActive = daysElapsed <= maxDays && completedSessionsCount < maxSessions;
  const changesLeft = Math.max(0, (counsellorSwitchState.maxChanges || 3) - counsellorSwitchState.changesCount);

  const selectedCounsellor = counsellors.find(c => c.id === selectedCounsellorId);

  const currentPrice = currentCounsellor?.pricePerSession || 25000;
  const targetPrice = selectedCounsellor?.pricePerSession || 25000;
  const priceDiff = targetPrice - currentPrice;

  const handleConfirmSwitch = () => {
    if (!selectedCounsellorId) return;
    const res = changeCounsellor(selectedCounsellorId);
    setResultStatus(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FDF8EE] text-[#CFA25E] border border-[#EBD6B0]">
              matchEd 1-Month Switch Guarantee
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#0B2545]">Change Assigned Counsellor</h2>
          <p className="text-xs text-slate-500">
            Within your first 30 days of onboarding, switch mentors to ensure mutual fit with complete anti-scam safeguards.
          </p>
        </div>

        {/* Policy Status Banner */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
          isWindowActive && changesLeft > 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="space-y-0.5">
            <span className="font-extrabold block">
              {completedSessionsCount >= maxSessions
                ? '✕ Guarantee Concluded (Package Sessions Completed)'
                : isWindowActive
                ? `✓ 1-Month Guarantee Active (${daysRemaining} days left)`
                : '✕ 1-Month Evaluation Window Expired'}
            </span>
            <span className="text-[11px] opacity-80">
              Completed sessions: <strong>{completedSessionsCount} of {maxSessions}</strong> · Switches used: <strong>{counsellorSwitchState.changesCount} of {counsellorSwitchState.maxChanges}</strong>
            </span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-white font-black text-xs shadow-xs shrink-0">
            {changesLeft} Switches Remaining
          </div>
        </div>

        {/* Anti-Scam & Session Deduction Rules Info Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-[#CFA25E]" />
            <span>Anti-Scam Protection & Session Deduction Policy:</span>
          </div>
          <ul className="space-y-1 list-disc list-inside text-[11px] text-amber-900/90 leading-relaxed">
            <li><strong>Minimum 2 Sessions Required:</strong> To prevent platform abuse, students must complete at least 2 sessions with their current mentor before switching (You have completed: {completedSessionsCount} sessions).</li>
            <li><strong>Package Deduction:</strong> The {completedSessionsCount} already-completed sessions will be deducted from your new counsellor's package if the price is the same or lower.</li>
            <li><strong>Guarantee Cap:</strong> Guarantee is automatically disabled once all {maxSessions} package sessions are completed.</li>
          </ul>
        </div>

        {resultStatus?.error && (
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-xs font-bold flex items-start gap-2.5 animate-in shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-rose-900">Switch Denied by Platform Policy</p>
              <p className="text-[11px] text-rose-800 font-medium mt-0.5">{resultStatus.error}</p>
            </div>
          </div>
        )}

        {resultStatus?.success ? (
          /* Success Screen */
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">Counsellor Switched Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your primary mentor is now <strong>{resultStatus.newCounsellor?.fullName}</strong>. Your roadmap, documents, and past session history are safely ported.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500">New Counsellor:</span>
                <span className="font-bold text-slate-900">{resultStatus.newCounsellor?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pricing Policy Applied:</span>
                <span className="font-bold text-emerald-700">
                  {resultStatus.isSamePrice ? 'Same Price (₹0 Extra)' : resultStatus.isHigherPrice ? `₹${resultStatus.priceDiff.toLocaleString('en-IN')} Escrow Difference` : 'Lower Price (No refund per policy)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Remaining Changes:</span>
                <span className="font-bold text-slate-900">{resultStatus.remainingChanges} changes left</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0B2545] hover:bg-[#133E68] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          /* Selection Flow */
          <div className="space-y-5">
            
            {/* Current Counsellor Display */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={currentCounsellor?.photoUrl} alt={currentCounsellor?.fullName} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400">Current Assigned Mentor</span>
                  <h4 className="font-bold text-slate-900 text-sm">{currentCounsellor?.fullName}</h4>
                  <span className="text-xs text-indigo-600 font-semibold">Starting rate: ₹{currentPrice.toLocaleString('en-IN')} / package</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg uppercase">Active</span>
            </div>

            {/* List of Alternative Verified Counsellors */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-3">
                Select New Verified Counsellor to Match With:
              </label>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {otherCounsellors.map(c => {
                  const isSelected = selectedCounsellorId === c.id;
                  const cPrice = c.pricePerSession || 25000;
                  const diff = cPrice - currentPrice;

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCounsellorId(c.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#F0F4F8] border-[#0B2545] ring-2 ring-[#0B2545]/20 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={c.photoUrl} alt={c.fullName} className="w-11 h-11 rounded-xl object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h5 className="font-bold text-slate-900 text-xs">{c.fullName}</h5>
                            <span className="text-[10px] text-slate-400">({c.experienceYears} yrs exp)</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate max-w-xs">{c.track}</p>
                          <span className="text-[10px] font-bold text-emerald-700">{c.verifiedPlacementsCount}+ Placements</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-black text-slate-900 block">₹{cPrice.toLocaleString('en-IN')}</span>
                        {diff === 0 ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Same Price (₹0 Extra)
                          </span>
                        ) : diff > 0 ? (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            +₹{diff.toLocaleString('en-IN')} Difference
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            Lower Price (No refund)
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Differential Price Rule Breakdown Notice */}
            {selectedCounsellor && (
              <div className="bg-[#FDF8EE] border border-[#EBD6B0] p-4 rounded-2xl text-xs text-slate-800 space-y-1 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-[#0B2545]">
                  <DollarSign className="w-4 h-4 text-[#CFA25E]" />
                  <span>Transparent Price Difference Calculation:</span>
                </div>
                {priceDiff === 0 && (
                  <p className="text-[11px] text-emerald-800">
                    Both counsellors have the same starting package price (₹{currentPrice.toLocaleString('en-IN')}). Your switch will take effect immediately with <strong>₹0 extra charge</strong>.
                  </p>
                )}
                {priceDiff > 0 && (
                  <p className="text-[11px] text-amber-900">
                    {selectedCounsellor.fullName} has a package rate of ₹{targetPrice.toLocaleString('en-IN')}. You will be charged the difference of <strong>₹{priceDiff.toLocaleString('en-IN')}</strong>, protected in platform escrow.
                  </p>
                )}
                {priceDiff < 0 && (
                  <p className="text-[11px] text-slate-700">
                    {selectedCounsellor.fullName} has a lower package rate. Per matchEd policy, the switch is allowed without extra charge, but <strong>no refund is provided for the difference</strong>.
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedCounsellorId || !isWindowActive || changesLeft <= 0}
                onClick={handleConfirmSwitch}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#133E68] text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Confirm Counsellor Switch
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ChangeCounsellorModal;
