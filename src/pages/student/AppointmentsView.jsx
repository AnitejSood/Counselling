import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Calendar, Clock, Video, ExternalLink,
  Plus, CheckCircle2, ShieldCheck, AlertTriangle, Sparkles, RefreshCw, FileText
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatDate } from '../../lib/formatters';

export const AppointmentsView = () => {
  const { appointments, cancelAppointment, rescheduleAppointment, studentConfirmProposedTime, escrowBookings } = useData();
  const [rescheduleModalApt, setRescheduleModalApt] = useState(null);
  const [newDate, setNewDate] = useState('2026-08-20');
  const [newTimeSlot, setNewTimeSlot] = useState('02:00 PM');
  const [notice, setNotice] = useState('');

  const upcoming = (appointments || []).filter(a => a.status === 'UPCOMING' || a.status === 'PENDING_APPROVAL' || a.status === 'TIME_SUGGESTED');
  const past = (appointments || []).filter(a => a.status !== 'UPCOMING' && a.status !== 'PENDING_APPROVAL' && a.status !== 'TIME_SUGGESTED');

  const activeBooking = escrowBookings?.[0] || { completedSessionsCount: 3, maxSessions: 5 };
  const completedCount = activeBooking.completedSessionsCount || 3;
  const maxCap = activeBooking.maxSessions || 5;
  const percent = Math.min(100, Math.round((completedCount / maxCap) * 100));

  // Check if session is under 24 hours away
  const isUnder24Hours = (aptDateStr) => {
    try {
      const aptTime = new Date(aptDateStr).getTime();
      const now = new Date().getTime();
      const diffHours = (aptTime - now) / (1000 * 60 * 60);
      return diffHours < 24 && diffHours > 0;
    } catch (e) {
      return false;
    }
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!rescheduleModalApt) return;
    rescheduleAppointment(rescheduleModalApt.id, newDate, newTimeSlot);
    setRescheduleModalApt(null);
    setNotice('Reschedule request sent to counsellor for approval!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleConfirmSlot = (aptId, chosenDate, chosenTime) => {
    studentConfirmProposedTime(aptId, chosenDate, chosenTime);
    setNotice(`Confirmed session slot on ${chosenDate} at ${chosenTime}!`);
    setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">

      <PageHeader
        eyebrow="Calendar & Session Schedule"
        title="My Appointments"
        subtitle="Manage live 1-on-1 sessions, meeting links, and session limits."
        action={
          <Link to="/book" className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition">
            <Plus className="w-4 h-4" /> Book Consultation
          </Link>
        }
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Package Session Limits & Progress Counter Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Package Session Counter</h3>
              <p className="text-xs text-slate-500">{activeBooking.serviceTitle || 'Comprehensive Admissions Package'}</p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            {completedCount} / {maxCap} Sessions Completed ({percent}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Guarantee Status Badge */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-emerald-950">🎉 1st Session Free + 14-Day 100% Money-Back Guarantee</h4>
            <p className="text-[11px] text-emerald-800">First consultation is 100% free with top verified counsellors. Full refund guarantee active for 14 days.</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-extrabold uppercase">
          Guarantee Active
        </span>
      </div>

      {/* Upcoming & Pending Sessions */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
          Upcoming & Pending Sessions ({upcoming.length})
        </h2>

        {upcoming.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
            <EmptyState
              icon={Calendar}
              title="No upcoming sessions"
              message="Book a new consultation with your assigned counsellor."
              action={
                <Link to="/book" className="px-4 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
                  Book a Session
                </Link>
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map(apt => {
              const lockedReschedule = isUnder24Hours(apt.date);

              // Render Alternative Times Pickers if counsellor proposed new slots
              if (apt.status === 'TIME_SUGGESTED') {
                return (
                  <div key={apt.id} className="bg-amber-50/80 rounded-3xl p-6 border-2 border-amber-300 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase">
                        Counsellor Proposed New Times
                      </span>
                      <span className="text-xs text-amber-900 font-bold">{apt.consultationType}</span>
                    </div>

                    <p className="text-xs text-amber-900 font-semibold">
                      Your counsellor was unavailable for the original slot and proposed the following alternative times. Please select one:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(apt.suggestedTimes || [
                        { date: '2026-08-15', timeSlot: '04:00 PM' },
                        { date: '2026-08-16', timeSlot: '11:00 AM' }
                      ]).map((slot, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-200 space-y-2 text-center shadow-xs">
                          <span className="text-xs font-black text-slate-900 block">{formatDate(slot.date)}</span>
                          <span className="text-xs font-bold text-indigo-600 block">{slot.timeSlot}</span>
                          <button
                            onClick={() => handleConfirmSlot(apt.id, slot.date, slot.timeSlot)}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Select Slot
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={apt.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                  
                  {/* Left info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                          {apt.consultationType}
                        </span>
                        <StatusBadge status={apt.status} dot />
                      </div>
                      <h3 className="text-base font-bold text-slate-900">
                        {formatDate(apt.date)} &nbsp;·&nbsp; {apt.timeSlot}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {apt.durationMinutes || 45} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="w-3.5 h-3.5" /> {apt.meetingMode || 'Online Video'}
                        </span>
                      </div>
                      {apt.studentNotes && (
                        <p className="mt-2 text-[11px] text-slate-600 italic bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                          Note: {apt.studentNotes}
                        </p>
                      )}

                      {/* Status indicator note */}
                      {apt.status === 'PENDING_APPROVAL' && (
                        <p className="mt-2 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5">
                          ⏳ Waiting for Counsellor Confirmation & Video Call Link.
                        </p>
                      )}

                      {/* 24-Hour Reschedule Warning Notice */}
                      {lockedReschedule && (
                        <div className="mt-2 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                          Rescheduling locked: Session is under 24 hours away.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {apt.meetingLink ? (
                      <a
                        href={apt.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Join Video Call
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                        Link Pending Confirmation
                      </span>
                    )}
                    
                    <button
                      onClick={() => setRescheduleModalApt(apt)}
                      disabled={lockedReschedule}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reschedule
                    </button>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Sessions */}
      {past.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Session History ({past.length})
          </h2>
          <div className="space-y-3">
            {past.map(apt => (
              <div key={apt.id} className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-75">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{apt.consultationType}</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {formatDate(apt.date)} at {apt.timeSlot}
                  </p>
                  <p className="text-xs text-slate-500">{apt.durationMinutes} mins · {apt.meetingMode}</p>
                </div>
                <StatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reschedule Modal */}
      {rescheduleModalApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-slate-900">Reschedule Session (&gt;24 Hours Prior)</h3>
            <p className="text-xs text-slate-500">Choose a new date and time slot for your appointment with {rescheduleModalApt.counsellorName || 'your counsellor'}.</p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">New Time Slot</label>
                <select
                  value={newTimeSlot}
                  onChange={e => setNewTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModalApt(null)}
                  className="flex-1 py-2.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-xl shadow-md"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
