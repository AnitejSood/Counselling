import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Calendar, Video, Lock, Bell, Plus, CheckCircle2,
  Save, Clock, Link as LinkIcon, Settings, AlertCircle, Check, X, Send, Layers, Sparkles
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate, formatINR } from '../../lib/formatters';
import { EmptyState } from '../../components/ui/EmptyState';

export const CounsellorBookings = () => {
  const { 
    escrowBookings, 
    requestEscrowRelease, 
    appointments, 
    addAppointment, 
    approveBookingSession,
    proposeAlternativeTimes,
    addAppointmentNote,
    updateAppointmentMeetingLink,
    counsellorProfile,
    updateCounsellorAvailabilitySlots
  } = useData();

  const [notice, setNotice] = useState('');
  const [showAddApt, setShowAddApt] = useState(false);
  const [showSlotsManager, setShowSlotsManager] = useState(false);
  const [noteInputs, setNoteInputs] = useState({});
  const [meetingInputs, setMeetingInputs] = useState({});

  // Alternative times modal state
  const [proposeModalApt, setProposeModalApt] = useState(null);
  const [altSlot1, setAltSlot1] = useState({ date: '', timeSlot: '11:00 AM' });
  const [altSlot2, setAltSlot2] = useState({ date: '', timeSlot: '03:00 PM' });
  const [altSlot3, setAltSlot3] = useState({ date: '', timeSlot: '05:00 PM' });
  const [altNotes, setAltNotes] = useState('');

  // Escrow request modal state
  const [escrowModalBk, setEscrowModalBk] = useState(null);
  const [escrowReason, setEscrowReason] = useState('');

  const [slotsList, setSlotsList] = useState(
    counsellorProfile?.availableSlots || ['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']
  );
  const [newSlotInput, setNewSlotInput] = useState('');

  const [form, setForm] = useState({
    studentName: 'Rohan Mehta',
    consultationType: 'University Strategy Session',
    date: '2026-08-15',
    timeSlot: '11:00 AM',
    durationMinutes: 45,
    meetingMode: 'Online — Google Meet',
    meetingLink: '',
    studentNotes: ''
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAddApt = (e) => {
    e.preventDefault();
    addAppointment(form);
    setShowAddApt(false);
    showMsg('Session scheduled and visible to student!');
  };

  const handleApproveSession = (aptId) => {
    const meetLink = meetingInputs[aptId] || `https://meet.google.com/aspiranthq-${Date.now().toString().slice(-4)}`;
    approveBookingSession(aptId, meetLink, 'Counsellor approved requested session.');
    showMsg('Session approved & meeting link sent to student portal!');
  };

  const handleSendAlternativeTimes = (e) => {
    e.preventDefault();
    if (!proposeModalApt) return;
    const slots = [altSlot1, altSlot2, altSlot3].filter(s => s.date.trim() !== '');
    if (slots.length === 0) {
      alert('Please enter at least 1 alternative date and time slot.');
      return;
    }
    proposeAlternativeTimes(proposeModalApt.id, slots, altNotes);
    setProposeModalApt(null);
    showMsg('Alternative time slots sent to student!');
  };

  const handleRequestEscrowRelease = (e) => {
    e.preventDefault();
    if (!escrowModalBk) return;
    requestEscrowRelease(escrowModalBk.id, escrowReason);
    setEscrowModalBk(null);
    setEscrowReason('');
    showMsg('Escrow payout request submitted to Admin for approval!');
  };

  const handleSaveNote = (aptId) => {
    if (!noteInputs[aptId]?.trim()) return;
    addAppointmentNote(aptId, noteInputs[aptId]);
    setNoteInputs(p => ({ ...p, [aptId]: '' }));
    showMsg('Session note saved!');
  };

  const handleUpdateLink = (aptId) => {
    if (!meetingInputs[aptId]?.trim()) return;
    updateAppointmentMeetingLink(aptId, meetingInputs[aptId]);
    setMeetingInputs(p => ({ ...p, [aptId]: '' }));
    showMsg('Meeting link uploaded and sent to student portal!');
  };

  const handleAddSlot = () => {
    if (!newSlotInput.trim()) return;
    const updated = [...slotsList, newSlotInput.trim()];
    setSlotsList(updated);
    updateCounsellorAvailabilitySlots(counsellorProfile?.id || 'counsellor_01', updated);
    setNewSlotInput('');
    showMsg('Availability slot added!');
  };

  const handleRemoveSlot = (slotToRemove) => {
    const updated = slotsList.filter(s => s !== slotToRemove);
    setSlotsList(updated);
    updateCounsellorAvailabilitySlots(counsellorProfile?.id || 'counsellor_01', updated);
  };

  const pendingApprovals = appointments.filter(a => a.status === 'PENDING_APPROVAL');
  const upcomingSessions = appointments.filter(a => a.status === 'UPCOMING');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <PageHeader
        eyebrow="Session Management & Slots"
        title="Bookings & Availability"
        subtitle="Approve student session requests, suggest alternative time slots, upload meeting links, and request escrow payouts."
        action={
          <div className="flex gap-2">
            <button onClick={() => setShowSlotsManager(!showSlotsManager)} className="px-4 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer">
              <Settings className="w-4 h-4" /> Manage Availability Slots
            </button>
            <button onClick={() => setShowAddApt(!showAddApt)} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700 transition flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-4 h-4" /> Schedule Session
            </button>
          </div>
        }
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Available Slots Manager */}
      {showSlotsManager && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Manage Available Booking Slots</h3>
          <p className="text-xs text-slate-500">These slots are shown to students when they book a session on your profile.</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {slotsList.map(slot => (
              <span key={slot} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-2">
                {slot}
                <button onClick={() => handleRemoveSlot(slot)} className="text-emerald-500 hover:text-rose-600 font-bold">×</button>
              </span>
            ))}
          </div>

          <div className="flex gap-2 max-w-sm pt-2">
            <input
              type="text"
              placeholder="e.g. 05:30 PM"
              value={newSlotInput}
              onChange={e => setNewSlotInput(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none flex-1"
            />
            <button onClick={handleAddSlot} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer">
              Add Slot
            </button>
          </div>
        </div>
      )}

      {/* Add Session Form */}
      {showAddApt && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Schedule New Session</h3>
          <form onSubmit={handleAddApt} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Student Name</label>
                <input type="text" value={form.studentName} onChange={e => setForm(p => ({ ...p, studentName: e.target.value }))} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Session Type</label>
                <input type="text" value={form.consultationType} onChange={e => setForm(p => ({ ...p, consultationType: e.target.value }))} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Date *</label>
                <input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Time Slot</label>
                <input type="text" value={form.timeSlot} onChange={e => setForm(p => ({ ...p, timeSlot: e.target.value }))} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold" placeholder="11:00 AM" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Meeting Link (Zoom / Google Meet)</label>
                <input type="url" value={form.meetingLink} onChange={e => setForm(p => ({ ...p, meetingLink: e.target.value }))} className="w-full px-3.5 py-2 rounded-xl border border-slate-200" placeholder="https://meet.google.com/..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddApt(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Save Session</button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 1: Pending Session Approval Requests */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Pending Session Requests ({pendingApprovals.length})
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">Students suggested time slots awaiting your confirmation</span>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="bg-amber-50/50 rounded-3xl p-5 border border-amber-100 text-center">
            <p className="text-xs text-amber-800 font-medium">No pending session requests at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingApprovals.map(apt => (
              <div key={apt.id} className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl">
                  Awaiting Approval
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">{apt.consultationType}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{apt.studentName}</h3>
                    <p className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Student Suggested Slot: <strong className="text-slate-900">{formatDate(apt.date)} at {apt.timeSlot}</strong>
                    </p>
                    {apt.studentNotes && <p className="text-[11px] text-slate-600 italic mt-1.5">Note from Student: "{apt.studentNotes}"</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <button
                      onClick={() => handleApproveSession(apt.id)}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Approve Session
                    </button>
                    <button
                      onClick={() => {
                        setProposeModalApt(apt);
                        setAltSlot1({ date: apt.date, timeSlot: '04:00 PM' });
                        setAltSlot2({ date: '2026-08-16', timeSlot: '11:00 AM' });
                      }}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-amber-400" /> Propose Alternative Times
                    </button>
                  </div>
                </div>

                {/* Optional Meeting Link Input inline */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    placeholder="Provide Google Meet or Zoom link (Optional before approving)..."
                    value={meetingInputs[apt.id] || ''}
                    onChange={e => setMeetingInputs(p => ({ ...p, [apt.id]: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2: Upcoming Confirmed Sessions */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Confirmed Upcoming Sessions ({upcomingSessions.length})</h2>
        <div className="space-y-4">
          {upcomingSessions.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 text-center">
              <EmptyState icon={Calendar} title="No upcoming confirmed sessions" message="Schedule or approve session requests above." />
            </div>
          ) : (
            upcomingSessions.map(apt => (
              <div key={apt.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">{apt.consultationType}</span>
                      <StatusBadge status={apt.status} dot />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{apt.studentName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {formatDate(apt.date)} · {apt.timeSlot} · {apt.durationMinutes || 45} mins
                    </p>
                    {apt.studentNotes && <p className="text-[11px] text-slate-600 italic mt-1">Agenda: {apt.studentNotes}</p>}
                  </div>
                  {apt.meetingLink ? (
                    <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                      <Video className="w-4 h-4" /> Join Meeting
                    </a>
                  ) : (
                    <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-xl font-medium">Link Pending</span>
                  )}
                </div>

                {/* Update Meeting Link Row */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="url"
                    placeholder="Update Google Meet or Zoom link..."
                    value={meetingInputs[apt.id] || ''}
                    onChange={e => setMeetingInputs(p => ({ ...p, [apt.id]: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  />
                  <button onClick={() => handleUpdateLink(apt.id)} className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer">
                    Save Link
                  </button>
                </div>

                {/* Counsellor Note */}
                <div className="flex gap-2 border-t border-slate-100 pt-3">
                  <input
                    type="text"
                    placeholder="Add private session note (not visible to student)..."
                    value={noteInputs[apt.id] || ''}
                    onChange={e => setNoteInputs(p => ({ ...p, [apt.id]: e.target.value }))}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                  <button onClick={() => handleSaveNote(apt.id)} className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer">
                    <Save className="w-3.5 h-3.5 inline mr-1" /> Save Note
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 3: Escrow Payments & Request Release Workflow */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Escrow Payout Requests & Session Counters ({escrowBookings.length})
          </h2>
          <span className="text-[11px] text-slate-500 font-medium">Counsellors request release; Admin verifies & disburses funds</span>
        </div>

        <div className="space-y-4">
          {escrowBookings.map(bk => {
            const completedCount = bk.completedSessionsCount || 0;
            const maxCap = bk.maxSessions || 5;
            const percent = Math.min(100, Math.round((completedCount / maxCap) * 100));

            return (
              <div key={bk.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-base">{bk.studentName}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        bk.escrowStatus === 'RELEASED_TO_COUNSELLOR'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : bk.escrowStatus === 'RELEASE_REQUESTED'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                      }`}>
                        {bk.escrowStatus === 'RELEASE_REQUESTED' ? 'Release Pending Admin Approval' : bk.escrowStatus?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 font-semibold">{bk.serviceTitle}</p>
                    {bk.requestNotes && <p className="text-[11px] text-slate-600 italic mt-1">Counsellor Request Note: "{bk.requestNotes}"</p>}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-semibold block">Earnings Payout</span>
                      <span className="text-base font-extrabold text-slate-900">{formatINR(bk.counsellorPayout || bk.amount * 0.9)}</span>
                    </div>

                    {bk.escrowStatus === 'HELD_IN_ESCROW' && (
                      <button
                        onClick={() => setEscrowModalBk(bk)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" /> Request Escrow Release
                      </button>
                    )}

                    {bk.escrowStatus === 'RELEASE_REQUESTED' && (
                      <span className="px-3.5 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> Awaiting Admin Approval
                      </span>
                    )}

                    {bk.escrowStatus === 'RELEASED_TO_COUNSELLOR' && (
                      <span className="px-3.5 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Disbursed
                      </span>
                    )}
                  </div>
                </div>

                {/* Package Session Limit & Completed Sessions Tracker Bar */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" /> Package Session Tracker:
                    </span>
                    <span className="font-extrabold text-indigo-700">
                      {completedCount} / {maxCap} Sessions Completed ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL 1: Propose Alternative Times */}
      {proposeModalApt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Propose Alternative Time Slots</h3>
              </div>
              <button onClick={() => setProposeModalApt(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
            </div>

            <p className="text-xs text-slate-600">
              Propose multiple dates and times for <strong>{proposeModalApt.studentName}</strong>. The student will be notified and can pick their preferred option.
            </p>

            <form onSubmit={handleSendAlternativeTimes} className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 block">Option 1</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" required value={altSlot1.date} onChange={e => setAltSlot1(p => ({ ...p, date: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" />
                    <input type="text" value={altSlot1.timeSlot} onChange={e => setAltSlot1(p => ({ ...p, timeSlot: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" placeholder="Time Slot" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 block">Option 2</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={altSlot2.date} onChange={e => setAltSlot2(p => ({ ...p, date: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" />
                    <input type="text" value={altSlot2.timeSlot} onChange={e => setAltSlot2(p => ({ ...p, timeSlot: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" placeholder="Time Slot" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-indigo-600 block">Option 3 (Optional)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={altSlot3.date} onChange={e => setAltSlot3(p => ({ ...p, date: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" />
                    <input type="text" value={altSlot3.timeSlot} onChange={e => setAltSlot3(p => ({ ...p, timeSlot: e.target.value }))} className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold" placeholder="Time Slot" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Message / Note for Student</label>
                  <textarea
                    rows={2}
                    value={altNotes}
                    onChange={e => setAltNotes(e.target.value)}
                    placeholder="e.g. Unavailable on original date due to university seminar..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setProposeModalApt(null)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Send Options to Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Request Escrow Release */}
      {escrowModalBk && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Request Escrow Release</h3>
              </div>
              <button onClick={() => setEscrowModalBk(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">×</button>
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold">Student: {escrowModalBk.studentName}</p>
              <p>Package: {escrowModalBk.serviceTitle}</p>
              <p>Requested Amount: <strong>{formatINR(escrowModalBk.counsellorPayout || escrowModalBk.amount * 0.9)}</strong></p>
            </div>

            <form onSubmit={handleRequestEscrowRelease} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Deliverable Evidence / Completion Summary *</label>
                <textarea
                  required
                  rows={3}
                  value={escrowReason}
                  onChange={e => setEscrowReason(e.target.value)}
                  placeholder="e.g. Delivered 3 strategy calls and reviewed SOP outline for Stanford application."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEscrowModalBk(null)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer">Submit to Admin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
