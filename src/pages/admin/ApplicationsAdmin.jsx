import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FileCheck, PlusCircle } from 'lucide-react';

export const ApplicationsAdmin = () => {
  const { applications, createApplication, updateApplicationStatus } = useData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [uniName, setUniName] = useState('');
  const [course, setCourse] = useState('');
  const [country, setCountry] = useState('United States');
  const [deadline, setDeadline] = useState('2026-12-15');

  const handleCreate = (e) => {
    e.preventDefault();
    createApplication({
      universityName: uniName,
      courseName: course,
      country,
      deadline
    });
    setUniName('');
    setCourse('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Global Applications</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Student University Applications ({applications.length})</h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Create New Application Tracker
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">{app.country}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{app.universityName}</h3>
                <p className="text-xs text-slate-500">{app.courseName} • Intake: {app.intake}</p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-bold text-xs"
                >
                  <option>Considering</option>
                  <option>Shortlisted</option>
                  <option>Preparing Documents</option>
                  <option>Ready to Apply</option>
                  <option>Submitted</option>
                  <option>Under Review</option>
                  <option>Conditional Offer</option>
                  <option>Offer Received</option>
                  <option>Rejected</option>
                  <option>Accepted</option>
                  <option>Withdrawn</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-white rounded-3xl p-8 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Create Application Tracker</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University Name</label>
              <input
                type="text"
                required
                placeholder="e.g. University of Toronto"
                value={uniName}
                onChange={(e) => setUniName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Course Name</label>
              <input
                type="text"
                required
                placeholder="e.g. MSc in Computer Science"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Create Tracker
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
