import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Calendar, Clock, Video, MapPin, ExternalLink,
  Plus, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatDate } from '../../lib/formatters';

export const AppointmentsView = () => {
  const { appointments, cancelAppointment } = useData();

  const upcoming = (appointments || []).filter(a => a.status === 'UPCOMING');
  const past = (appointments || []).filter(a => a.status !== 'UPCOMING');

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">

      <PageHeader
        eyebrow="Calendar & Sessions"
        title="My Appointments"
        subtitle="Manage your upcoming consultation sessions with your advisor."
        action={
          <Link to="/book" className="btn btn-primary">
            <Plus className="w-4 h-4" /> Book Consultation
          </Link>
        }
      />

      {/* Upcoming */}
      <section>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Upcoming Sessions ({upcoming.length})
        </h2>

        {upcoming.length === 0 ? (
          <div className="card p-6">
            <EmptyState
              icon={Calendar}
              title="No upcoming sessions"
              message="Book a new consultation with your assigned counsellor."
              action={
                <Link to="/book" className="btn btn-primary">
                  Book a Session
                </Link>
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map(apt => (
              <div key={apt.id} className="card card-hover p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                
                {/* Left info */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-indigo-600" />
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
                        <Clock className="w-3.5 h-3.5" /> {apt.durationMinutes} mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" /> {apt.meetingMode}
                      </span>
                    </div>
                    {apt.studentNotes && (
                      <p className="mt-2 text-[11px] text-slate-600 italic bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                        {apt.studentNotes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {apt.meetingLink && (
                    <a
                      href={apt.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Join Meeting
                    </a>
                  )}
                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
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
              <div key={apt.id} className="card p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 opacity-70">
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
    </div>
  );
};
