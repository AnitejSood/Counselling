import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Compass, Plus, CheckCircle2, Save, Trash2, Edit3, Calendar, Flag, ChevronDown
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';

const STATUS_OPTIONS = ['UPCOMING', 'IN_PROGRESS', 'COMPLETED'];
const STATUS_COLORS = {
  COMPLETED: 'bg-emerald-100 border-emerald-200',
  IN_PROGRESS: 'bg-indigo-50 border-indigo-200',
  UPCOMING: 'bg-slate-50 border-slate-200'
};

export const RoadmapBuilder = () => {
  const { milestones, addMilestone, updateMilestoneStatus, deleteMilestone, studentProfile } = useData();

  const [showAddForm, setShowAddForm] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');
  const [form, setForm] = useState({ title: '', dueDate: '', notes: '', tasks: '' });

  const showMsg = (msg) => { setSavedNotice(msg); setTimeout(() => setSavedNotice(''), 3000); };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title) return;
    addMilestone({
      title: form.title,
      dueDate: form.dueDate,
      notes: form.notes,
      tasks: form.tasks ? form.tasks.split('\n').filter(Boolean) : []
    });
    setForm({ title: '', dueDate: '', notes: '', tasks: '' });
    setShowAddForm(false);
    showMsg('Milestone added and visible to student!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Student Roadmap"
        title={`Journey Milestones — ${studentProfile?.personalInfo?.fullName || 'Student'}`}
        subtitle="Add, update, or remove milestones. Changes are instantly reflected in the student's Journey page."
        action={
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn btn-primary">
            <Plus className="w-4 h-4" /> Add Milestone
          </button>
        }
      />

      {savedNotice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> {savedNotice}
        </div>
      )}

      {/* Add Milestone Form */}
      {showAddForm && (
        <div className="card p-6 space-y-4 border-indigo-200 bg-indigo-50/30 animate-slide-up">
          <h3 className="text-sm font-bold text-slate-900">New Milestone</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Milestone Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Upload SOP Draft for Review"
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Counsellor Notes</label>
              <input
                type="text"
                placeholder="Brief note visible to student..."
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Sub-tasks (one per line)</label>
              <textarea
                rows={3}
                placeholder={"Upload 6th-semester transcript\nComplete SOP outline (500 words)\nSchedule review call"}
                value={form.tasks}
                onChange={e => setForm(p => ({ ...p, tasks: e.target.value }))}
                className="input resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-primary">
                <Save className="w-4 h-4" /> Publish to Student
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Milestone List */}
      <div className="space-y-3">
        {(milestones || []).map((m, idx) => (
          <div
            key={m.id}
            className={`card p-5 border transition-all ${STATUS_COLORS[m.status] || 'bg-white border-slate-200'}`}
          >
            <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                  m.status === 'COMPLETED' ? 'bg-emerald-500 text-white' :
                  m.status === 'IN_PROGRESS' ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {m.status === 'COMPLETED' ? '✓' : idx + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                  {m.notes && <p className="text-xs text-slate-500 mt-0.5">{m.notes}</p>}
                  {m.dueDate && (
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Due: {m.dueDate}
                    </p>
                  )}
                  {(m.tasks || []).length > 0 && (
                    <div className="mt-2 space-y-1">
                      {m.tasks.map((t, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />{t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Delete */}
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={m.status}
                  onChange={e => { updateMilestoneStatus(m.id, e.target.value); showMsg('Milestone updated!'); }}
                  className="text-[11px] font-bold border border-slate-200 bg-white rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer text-slate-700"
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
                <button
                  onClick={() => { deleteMilestone(m.id); showMsg('Milestone removed'); }}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
