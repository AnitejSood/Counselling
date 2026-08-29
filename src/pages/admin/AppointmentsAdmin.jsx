import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Calendar, Video, Clock, Plus, Save, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatDate, formatINR } from '../../lib/formatters';

export const AppointmentsAdmin = () => {
  const { appointments, escrowBookings } = useData();
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? appointments : appointments.filter(a => a.status === filter);
  const upcoming = appointments.filter(a => a.status === 'UPCOMING').length;
  const completed = appointments.filter(a => a.status === 'COMPLETED').length;
  const totalValue = escrowBookings.reduce((s, b) => s + (b.amount || 0), 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Calendar Management"
        title="Appointments Ledger"
        subtitle="Full audit trail of all student consultation bookings across the platform."
      />

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Upcoming', value: upcoming, color: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
          { label: 'Completed', value: completed, color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
          { label: 'Total GMV', value: formatINR(totalValue), color: 'bg-amber-50 border-amber-100 text-amber-700' }
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border text-center ${s.color}`}>
            <p className="text-xl font-extrabold">{s.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['ALL', 'UPCOMING', 'COMPLETED', 'CANCELLED'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-[11px] font-bold transition ${
              filter === f ? 'bg-purple-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-purple-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Student', 'Session Type', 'Date & Time', 'Duration', 'Mode', 'Status', 'Action'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="py-10 text-center text-slate-400 text-xs">No appointments found.</td></tr>
            )}
            {filtered.map(apt => (
              <tr key={apt.id} className="hover:bg-slate-50 transition">
                <td className="px-5 py-3.5">
                  <span className="font-bold text-slate-900">{apt.studentName || 'Rohan Mehta'}</span>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{apt.consultationType}</td>
                <td className="px-5 py-3.5 text-slate-600">
                  {formatDate(apt.date)} · {apt.timeSlot}
                </td>
                <td className="px-5 py-3.5 text-slate-600">{apt.durationMinutes} mins</td>
                <td className="px-5 py-3.5 text-slate-600">{apt.meetingMode}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={apt.status} dot />
                </td>
                <td className="px-5 py-3.5">
                  {apt.meetingLink && apt.status === 'UPCOMING' && (
                    <a href={apt.meetingLink} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1 text-purple-600 font-bold hover:underline">
                      <Video className="w-3.5 h-3.5" /> Join
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
