import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Users, Plus, CheckCircle2, Globe, GraduationCap, Calendar, ChevronDown, Trash2, Send, Bookmark, CheckSquare, Clock
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

const APP_STATUSES = ['In Progress', 'Documents Pending', 'Submitted', 'Under Review', 'Admitted', 'Waitlisted', 'Rejected'];

export const PipelineTracker = () => {
  const {
    pipelineStudents,
    applications,
    addApplication,
    updateApplicationStatus,
    recommendations,
    sendUniversityRecommendation,
    shortlists,
    removeRecommendation
  } = useData();

  const [selectedStudentId, setSelectedStudentId] = useState(pipelineStudents[0]?.studentId || 'std_101');
  const [notice, setNotice] = useState('');
  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddRec, setShowAddRec] = useState(false);

  const [appForm, setAppForm] = useState({ universityName: '', courseName: '', country: '', applicationDeadline: '', status: 'In Progress' });
  const [recForm, setRecForm] = useState({ schoolName: '', program: '', category: 'Target School', description: '' });

  const activeStudent = pipelineStudents.find(s => s.studentId === selectedStudentId) || pipelineStudents[0];

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAddApp = (e) => {
    e.preventDefault();
    addApplication(appForm);
    setAppForm({ universityName: '', courseName: '', country: '', applicationDeadline: '', status: 'In Progress' });
    setShowAddApp(false);
    showMsg('Application added to student pipeline tracker!');
  };

  const handleAddRec = (e) => {
    e.preventDefault();
    if (!recForm.schoolName || !recForm.program) return;
    sendUniversityRecommendation(recForm.schoolName, recForm.program, recForm.category, recForm.description);
    setRecForm({ schoolName: '', program: '', category: 'Target School', description: '' });
    setShowAddRec(false);
    showMsg('University recommendation dispatched to student dashboard!');
  };

  // Metrics calculation
  const admittedCount = applications.filter(a => a.status === 'Admitted').length;
  const inProgressCount = applications.filter(a => a.status === 'In Progress' || a.status === 'Under Review').length;
  const submittedCount = applications.filter(a => a.status === 'Submitted').length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      {/* Top Header with Student Selection Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Student Application Pipeline
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Application & Shortlist Pipeline</h1>
        </div>

        {/* Top Right Student Selection Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium pl-2">Active Student:</span>
          <select
            value={selectedStudentId}
            onChange={e => setSelectedStudentId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            {pipelineStudents.map(s => (
              <option key={s.studentId} value={s.studentId}>{s.fullName} ({s.targetGoal})</option>
            ))}
          </select>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-400">Total Applications</span>
          <p className="text-2xl font-black text-slate-900">{applications.length}</p>
        </div>

        <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-emerald-700">Admitted / Offers</span>
          <p className="text-2xl font-black text-emerald-900">{admittedCount}</p>
        </div>

        <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-indigo-700">In Progress / Under Review</span>
          <p className="text-2xl font-black text-indigo-900">{inProgressCount}</p>
        </div>

        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-amber-700">Submitted</span>
          <p className="text-2xl font-black text-amber-900">{submittedCount}</p>
        </div>
      </div>

      {/* Student Shortlist & Send Recommendations */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-600" /> Student Shortlisted Options & Recommendation Dispatcher
          </h2>
          <button onClick={() => setShowAddRec(!showAddRec)} className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Send Recommendation
          </button>
        </div>

        {showAddRec && (
          <form onSubmit={handleAddRec} className="border-b border-slate-200 p-5 bg-indigo-50/40 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">University Name *</label>
                <input required type="text" value={recForm.schoolName} onChange={e => setRecForm(p => ({ ...p, schoolName: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="e.g. Imperial College London" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Program *</label>
                <input required type="text" value={recForm.program} onChange={e => setRecForm(p => ({ ...p, program: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="e.g. MS Artificial Intelligence" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Category Fit</label>
                <select value={recForm.category} onChange={e => setRecForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200">
                  <option value="Dream School">Dream School</option>
                  <option value="Target School">Target School</option>
                  <option value="Safety School">Safety School</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Counsellor Recommendation Reason</label>
                <input type="text" value={recForm.description} onChange={e => setRecForm(p => ({ ...p, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="Fits 8.85 CGPA & AI research background" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddRec(false)} className="px-4 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                <Send className="w-3.5 h-3.5" /> Dispatch Recommendation
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100">
          {recommendations.map(rec => (
            <div key={rec.id} className="px-6 py-4 flex items-center justify-between gap-3">
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${rec.category === 'Dream School' ? 'bg-rose-50 text-rose-700' : 'bg-indigo-50 text-indigo-700'}`}>
                  {rec.category}
                </span>
                <span className="text-sm font-bold text-slate-900">{rec.name}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">{rec.description}</p>
              </div>
              <button
                onClick={() => { removeRecommendation(rec.id); showMsg('Recommendation removed'); }}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Applications Pipeline List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" /> Active University Applications ({applications.length})
          </h2>
          <button onClick={() => setShowAddApp(!showAddApp)} className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-700 transition flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Application
          </button>
        </div>

        {showAddApp && (
          <form onSubmit={handleAddApp} className="border-b border-slate-200 p-5 bg-emerald-50/40 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">University Name *</label>
                <input required type="text" value={appForm.universityName} onChange={e => setAppForm(p => ({ ...p, universityName: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="e.g. Carnegie Mellon University" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Program *</label>
                <input required type="text" value={appForm.courseName} onChange={e => setAppForm(p => ({ ...p, courseName: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="e.g. MS Computer Science" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Country</label>
                <input type="text" value={appForm.country} onChange={e => setAppForm(p => ({ ...p, country: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" placeholder="United States" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Application Deadline</label>
                <input type="date" value={appForm.applicationDeadline} onChange={e => setAppForm(p => ({ ...p, applicationDeadline: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddApp(false)} className="px-4 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md">Add to Student Tracker</button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100">
          {applications.map(app => (
            <div key={app.id} className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{app.universityName}</h3>
                <p className="text-[11px] text-slate-500">{app.courseName} · {app.country}</p>
                {app.applicationDeadline && (
                  <p className="text-[10px] text-rose-600 font-bold mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Deadline: {app.applicationDeadline}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={app.status}
                  onChange={e => { updateApplicationStatus(app.id, e.target.value); showMsg('Application status updated!'); }}
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
    </div>
  );
};
