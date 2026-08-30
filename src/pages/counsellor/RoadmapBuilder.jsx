import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Compass, Plus, CheckCircle2, Save, Trash2, Edit3, Calendar, ArrowUp, ArrowDown, Move, Eye
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

const STATUS_OPTIONS = ['UPCOMING', 'IN_PROGRESS', 'COMPLETED'];

export const RoadmapBuilder = () => {
  const { 
    milestones, 
    addMilestone, 
    editMilestone, 
    updateMilestoneStatus, 
    deleteMilestone, 
    reorderMilestones,
    studentProfile 
  } = useData();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [savedNotice, setSavedNotice] = useState('');
  const [form, setForm] = useState({ title: '', dueDate: '', notes: '', tasks: '' });

  const showMsg = (msg) => { setSavedNotice(msg); setTimeout(() => setSavedNotice(''), 3000); };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;
    if (editingMilestoneId) {
      editMilestone(editingMilestoneId, {
        title: form.title,
        dueDate: form.dueDate,
        notes: form.notes,
        tasks: form.tasks ? form.tasks.split('\n').filter(Boolean) : []
      });
      setEditingMilestoneId(null);
      showMsg('Milestone updated in tabular roadmap!');
    } else {
      addMilestone({
        title: form.title,
        dueDate: form.dueDate,
        notes: form.notes,
        tasks: form.tasks ? form.tasks.split('\n').filter(Boolean) : []
      });
      showMsg('New milestone stage added!');
    }
    setForm({ title: '', dueDate: '', notes: '', tasks: '' });
    setShowAddForm(false);
  };

  const handleStartEdit = (m) => {
    setEditingMilestoneId(m.id);
    setForm({
      title: m.title,
      dueDate: m.dueDate || '',
      notes: m.notes || '',
      tasks: (m.tasks || []).join('\n')
    });
    setShowAddForm(true);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      reorderMilestones(index, index - 1);
      showMsg('Stage reordered!');
    }
  };

  const handleMoveDown = (index) => {
    if (index < milestones.length - 1) {
      reorderMilestones(index, index + 1);
      showMsg('Stage reordered!');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <PageHeader
        eyebrow="Tabular Roadmap Engine"
        title={`Student Roadmap Table — ${studentProfile?.personalInfo?.fullName || 'Rohan Mehta'}`}
        subtitle="Manage student journey milestones in a structured table. Reorder stages, edit milestones, or add new phases."
        action={
          <button onClick={() => { setEditingMilestoneId(null); setForm({ title: '', dueDate: '', notes: '', tasks: '' }); setShowAddForm(!showAddForm); }} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition">
            <Plus className="w-4 h-4" /> Add Roadmap Stage
          </button>
        }
      />

      {savedNotice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {savedNotice}
        </div>
      )}

      {/* Add / Edit Milestone Form */}
      {showAddForm && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">{editingMilestoneId ? 'Edit Milestone Stage' : 'New Roadmap Stage'}</h3>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Stage Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Upload Transcripts & SOP Draft"
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Sub-tasks (one per line)</label>
              <textarea
                rows={3}
                placeholder={"Upload 6th-semester transcript\nComplete SOP outline\nSchedule review call"}
                value={form.tasks}
                onChange={e => setForm(p => ({ ...p, tasks: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1">
                <Save className="w-4 h-4" /> Save Stage
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabular Roadmap View */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-4 w-12 text-center">Stage</th>
                <th className="py-4 px-4">Milestone Phase & Notes</th>
                <th className="py-4 px-4">Target Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Reorder</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {(milestones || []).map((m, idx) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Stage Number */}
                  <td className="py-4 px-4 text-center">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs mx-auto ${
                      m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      m.status === 'IN_PROGRESS' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {m.stageNumber || idx + 1}
                    </span>
                  </td>

                  {/* Title & Tasks */}
                  <td className="py-4 px-4">
                    <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
                    {m.notes && <p className="text-[11px] text-slate-500 mt-0.5">{m.notes}</p>}
                    {(m.tasks || []).length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {m.tasks.map((t, i) => (
                          <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">
                            • {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Target Date */}
                  <td className="py-4 px-4 font-semibold text-slate-700 whitespace-nowrap">
                    {m.dueDate || 'Flexible'}
                  </td>

                  {/* Status Picker */}
                  <td className="py-4 px-4">
                    <select
                      value={m.status}
                      onChange={e => { updateMilestoneStatus(m.id, e.target.value); showMsg('Milestone status updated!'); }}
                      className={`text-[11px] font-extrabold rounded-xl px-3 py-1.5 border focus:outline-none cursor-pointer ${
                        m.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                        m.status === 'IN_PROGRESS' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                  </td>

                  {/* Drag-and-Drop / Move Reorder Controls */}
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        title="Move Stage Up"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === milestones.length - 1}
                        title="Move Stage Down"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Edit & Delete Actions */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStartEdit(m)}
                        title="Edit Stage"
                        className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { deleteMilestone(m.id); showMsg('Stage deleted'); }}
                        title="Delete Stage"
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
