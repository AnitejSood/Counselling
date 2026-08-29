import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Calendar, Video, Lock, Bell, Plus, CheckCircle2,
  MessageSquare, Save, FileText, Clock
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { formatDate, formatINR } from '../../lib/formatters';
import { EmptyState } from '../../components/ui/EmptyState';

export const CounsellorBookings = () => {
  const { escrowBookings, releaseEscrowPayout, appointments, addAppointment, addAppointmentNote } = useData();

  const [notice, setNotice] = useState('');
  const [showAddApt, setShowAddApt] = useState(false);
  const [noteInputs, setNoteInputs] = useState({});
  const [form, setForm] = useState({
    studentName: 'Rohan Mehta',
    consultationType: 'University Strategy Session',
    date: '',
    timeSlot: '11:00 AM',
    durationMinutes: 60,
    meetingMode: 'Online — Google Meet',
    meetingLink: '',
    studentNotes: ''
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAddApt = (e) => {
    e.preventDefault();
    addAppointment(form);
    setShowAddApt(false);
    setForm({ studentName: 'Rohan Mehta', consultationType: 'University Strategy Session', date: '', timeSlot: '11:00 AM', durationMinutes: 60, meetingMode: 'Online — Google Meet', meetingLink: '', studentNotes: '' });
    showMsg('Session scheduled and visible to student!');
  };

  const handleSaveNote = (aptId) => {
    if (!noteInputs[aptId]?.trim()) return;
    addAppointmentNote(aptId, noteInputs[aptId]);
    setNoteInputs(p => ({ ...p, [aptId]: '' }));
    showMsg('Session note saved!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Session Management"
        title="Bookings & Calendar"
        subtitle="Schedule sessions, join meetings, release escrow, and add session notes."
        action={
          <button onClick={() => setShowAddApt(!showAddApt)} className="btn btn-primary">
            <Plus className="w-4 h-4" /> Schedule Session
          </button>
        }
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Add Session Form */}
      {showAddApt && (
        <div className="card p-6 space-y-4 border-indigo-200 bg-indigo-50/30 animate-slide-up">
          <h3 className="text-sm font-bold text-slate-900">Schedule New Session</h3>
          <form onSubmit={handleAddApt} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Student Name</label>
                <input type="text" value={form.studentName} onChange={e => setForm(p => ({ ...p, studentName: e.target.value }))} className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Session Type</label>
                <input type="text" value={form.consultationType} onChange={e => setForm(p => ({ ...p, consultationType: e.target.value }))} className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Date *</label>
                <input required type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Time Slot</label>
                <input type="text" value={form.timeSlot} onChange={e => setForm(p => ({ ...p, timeSlot: e.target.value }))} className="input" placeholder="11:00 AM" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Duration (mins)</label>
                <input type="number" value={form.durationMinutes} onChange={e => setForm(p => ({ ...p, durationMinutes: parseInt(e.target.value) }))} className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Meeting Mode</label>
                <input type="text" value={form.meetingMode} onChange={e => setForm(p => ({ ...p, meetingMode: e.target.value }))} className="input" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Meeting Link</label>
                <input type="url" value={form.meetingLink} onChange={e => setForm(p => ({ ...p, meetingLink: e.target.value }))} className="input" placeholder="https://meet.google.com/..." />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Session Agenda / Notes for Student</label>
                <input type="text" value={form.studentNotes} onChange={e => setForm(p => ({ ...p, studentNotes: e.target.value }))} className="input" placeholder="Agenda: SOP review + university list finalization" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddApt(false)} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary"><Save className="w-4 h-4" /> Save Session</button>
            </div>
          </form>
        </div>
      )}

      {/* Upcoming Sessions */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Upcoming Sessions ({appointments.filter(a => a.status === 'UPCOMING').length})</h2>
        <div className="space-y-4">
          {appointments.filter(a => a.status === 'UPCOMING').length === 0 && (
            <div className="card p-4">
              <EmptyState icon={Calendar} title="No upcoming sessions" message="Schedule a session above." />
            </div>
          )}
          {appointments.filter(a => a.status === 'UPCOMING').map(apt => (
            <div key={apt.id} className="card p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge badge-indigo">{apt.consultationType}</span>
                    <StatusBadge status={apt.status} dot />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{apt.studentName}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                    <Clock className="w-3.5 h-3.5" /> {formatDate(apt.date)} · {apt.timeSlot} · {apt.durationMinutes} mins
                  </p>
                  {apt.studentNotes && <p className="text-[11px] text-slate-600 italic mt-1">Agenda: {apt.studentNotes}</p>}
                  {apt.counsellorNotes && <p className="text-[11px] text-indigo-700 bg-indigo-50 rounded-lg px-3 py-1.5 mt-1 font-semibold">📌 Note: {apt.counsellorNotes}</p>}
                </div>
                {apt.meetingLink && (
                  <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="btn btn-primary shrink-0">
                    <Video className="w-4 h-4" /> Join Meeting
                  </a>
                )}
              </div>
              {/* Counsellor Note */}
              <div className="flex gap-2 border-t border-slate-100 pt-3">
                <input
                  type="text"
                  placeholder="Add private session note (not visible to student)..."
                  value={noteInputs[apt.id] || ''}
                  onChange={e => setNoteInputs(p => ({ ...p, [apt.id]: e.target.value }))}
                  className="flex-1 input text-[11px]"
                />
                <button onClick={() => handleSaveNote(apt.id)} className="btn btn-secondary py-1.5 px-3 text-[11px]">
                  <Save className="w-3.5 h-3.5" /> Save Note
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Escrow Bookings */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Escrow Payments ({escrowBookings.length})</h2>
        <div className="space-y-4">
          {escrowBookings.map(bk => (
            <div key={bk.id} className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900">{bk.studentName}</span>
                  <span className={`badge ${bk.escrowStatus === 'RELEASED_TO_COUNSELLOR' ? 'badge-emerald' : bk.escrowStatus === 'REFUNDED_TO_STUDENT' ? 'badge-rose' : 'badge-amber'}`}>
                    {bk.escrowStatus?.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-indigo-600 font-semibold">{bk.serviceTitle}</p>
                <p className="text-xs text-slate-500">{bk.sessionDate} · {bk.sessionTime}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base font-extrabold text-slate-900">{formatINR(bk.amount)}</span>
                {bk.escrowStatus === 'HELD_IN_ESCROW' && (
                  <button
                    onClick={() => { releaseEscrowPayout(bk.id); showMsg('Payout released!'); }}
                    className="btn btn-primary"
                  >
                    Release Payout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
