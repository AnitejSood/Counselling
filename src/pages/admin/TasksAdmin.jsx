import React from 'react';
import { CheckSquare } from 'lucide-react';

export const TasksAdmin = () => (
  <div className="space-y-6 max-w-5xl mx-auto">
    <span className="text-xs font-bold uppercase text-purple-600">Task Management</span>
    <h1 className="text-2xl font-extrabold text-slate-900">Counsellor Action Tasks</h1>
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
        <input type="checkbox" defaultChecked />
        <span className="line-through text-slate-400">Review Rohan Mehta's SOP draft v1</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-900">
        <input type="checkbox" />
        <span>Prepare UIUC vs UW-Madison comparison matrix prior to July 28 session</span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-900">
        <input type="checkbox" />
        <span>Verify Ananya Deshmukh's UCAS Personal Statement before August deadline</span>
      </div>
    </div>
  </div>
);
