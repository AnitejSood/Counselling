import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Users, Plus, CheckCircle2, Globe, GraduationCap, Calendar, ChevronDown, Trash2
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

const APP_STATUSES = ['In Progress', 'Documents Pending', 'Submitted', 'Under Review', 'Admitted', 'Waitlisted', 'Rejected'];

export const PipelineTracker = () => {
  const {
    applications, addApplication, updateApplicationStatus,
    recommendations, addRecommendation, removeRecommendation, studentProfile
  } = useData();

  const [notice, setNotice] = useState('');
  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddRec, setShowAddRec] = useState(false);
  const [appForm, setAppForm] = useState({ universityName: '', courseName: '', country: '', applicationDeadline: '', status: 'In Progress' });
  const [recForm, setRecForm] = useState({ name: '', category: 'Target School', description: '', country: '' });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAddApp = (e) => {
    e.preventDefault();
    addApplication(appForm);
    setAppForm({ universityName: '', courseName: '', country: '', applicationDeadline: '', status: 'In Progress' });
    setShowAddApp(false);
    showMsg('Application added to student tracker!');
  };

  const handleAddRec = (e) => {
    e.preventDefault();
    addRecommendation({ ...recForm, universityDetails: { country: recForm.country } });
    setRecForm({ name: '', category: 'Target School', description: '', country: '' });
    setShowAddRec(false);
    showMsg('University recommendation sent to student!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Application Pipeline"
        title={`Applications — ${studentProfile?.personalInfo?.fullName || 'Student'}`}
        subtitle="Track and manage the student's university applications and shortlist recommendations."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* ── Applications ── */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" /> University Applications ({applications.length})
          </h2>
          <button onClick={() => setShowAddApp(!showAddApp)} className="btn btn-primary py-1.5 px-3 text-[11px]">
            <Plus className="w-3.5 h-3.5" /> Add Application
          </button>
        </div>

        {showAddApp && (
          <form onSubmit={handleAddApp} className="border-b border-slate-200 p-5 bg-indigo-50/30 space-y-3 animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">University Name *</label>
                <input required type="text" value={appForm.universityName} onChange={e => setAppForm(p => ({ ...p, universityName: e.target.value }))} className="input" placeholder="e.g. MIT" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Program *</label>
                <input required type="text" value={appForm.courseName} onChange={e => setAppForm(p => ({ ...p, courseName: e.target.value }))} className="input" placeholder="e.g. MS Computer Science" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Country</label>
                <input type="text" value={appForm.country} onChange={e => setAppForm(p => ({ ...p, country: e.target.value }))} className="input" placeholder="e.g. United States" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Application Deadline</label>
                <input type="date" value={appForm.applicationDeadline} onChange={e => setAppForm(p => ({ ...p, applicationDeadline: e.target.value }))} className="input" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddApp(false)} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary">Add to Student Tracker</button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100">
          {applications.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-8">No applications yet. Add the first one above.</p>
          )}
          {applications.map(app => (
            <div key={app.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{app.universityName}</h3>
                <p className="text-[11px] text-slate-500">{app.courseName} · {app.country}</p>
                {app.applicationDeadline && (
                  <p className="text-[10px] text-rose-500 font-bold mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Deadline: {app.applicationDeadline}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={app.status}
                  onChange={e => { updateApplicationStatus(app.id, e.target.value); showMsg('Status updated!'); }}
                  className="text-[11px] font-bold border border-slate-200 bg-white rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                >
                  {APP_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600" /> University Recommendations ({recommendations.length})
          </h2>
          <button onClick={() => setShowAddRec(!showAddRec)} className="btn btn-secondary py-1.5 px-3 text-[11px]">
            <Plus className="w-3.5 h-3.5" /> Add Recommendation
          </button>
        </div>

        {showAddRec && (
          <form onSubmit={handleAddRec} className="border-b border-slate-200 p-5 bg-amber-50/30 space-y-3 animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">University & Program *</label>
                <input required type="text" value={recForm.name} onChange={e => setRecForm(p => ({ ...p, name: e.target.value }))} className="input" placeholder="e.g. MIT — MS Computer Science" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                <select value={recForm.category} onChange={e => setRecForm(p => ({ ...p, category: e.target.value }))} className="input">
                  <option>Dream School</option>
                  <option>Target School</option>
                  <option>Safety School</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Country</label>
                <input type="text" value={recForm.country} onChange={e => setRecForm(p => ({ ...p, country: e.target.value }))} className="input" placeholder="United States" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Why I Recommend This</label>
                <input type="text" value={recForm.description} onChange={e => setRecForm(p => ({ ...p, description: e.target.value }))} className="input" placeholder="Fits profile, strong CS dept..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddRec(false)} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary">Send to Student</button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100">
          {recommendations.map(rec => (
            <div key={rec.id} className="px-6 py-4 flex items-center justify-between gap-3">
              <div>
                <span className={`badge text-[9px] mr-2 ${rec.category === 'Dream School' ? 'badge-rose' : rec.category === 'Target School' ? 'badge-indigo' : 'badge-emerald'}`}>
                  {rec.category}
                </span>
                <span className="text-sm font-bold text-slate-900">{rec.name}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{rec.description}</p>
              </div>
              <button
                onClick={() => { removeRecommendation(rec.id); showMsg('Recommendation removed'); }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
