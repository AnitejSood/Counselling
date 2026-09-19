import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Users, Plus, CheckCircle2, Globe, GraduationCap, Calendar, ChevronDown, 
  Trash2, Send, Bookmark, CheckSquare, Clock, Sparkles, Bell, ArrowRight, ShieldCheck, Check
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

const APP_STATUSES = ['In Progress', 'Documents Pending', 'Submitted', 'Under Review', 'Admitted', 'Waitlisted', 'Rejected'];

export const PipelineTracker = () => {
  const {
    pipelineStudents,
    activeStudent,
    applications,
    addApplication,
    updateApplicationStatus,
    recommendations,
    sendUniversityRecommendation,
    shortlists,
    removeRecommendation,
    cohortBulkAction,
    switchActiveStudent,
    activeStudentId
  } = useData();

  const [viewMode, setViewMode] = useState('SINGLE'); // 'SINGLE' | 'COHORT'
  const [notice, setNotice] = useState('');
  const [showAddApp, setShowAddApp] = useState(false);
  const [showAddRec, setShowAddRec] = useState(false);
  const [selectedCohortStudents, setSelectedCohortStudents] = useState([]);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    variant: 'danger',
    onConfirm: () => {}
  });

  const [appForm, setAppForm] = useState({ universityName: '', courseName: '', country: '', applicationDeadline: '', status: 'In Progress' });
  const [recForm, setRecForm] = useState({ schoolName: '', program: '', category: 'Target School', description: '' });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3500); };

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

  const handleBulkReminder = () => {
    const res = cohortBulkAction('SEND_DEADLINE_REMINDER', selectedCohortStudents, {
      message: '⏰ Urgent Admissions Nudge: Several priority deadlines are closing within 7 days. Please check your tasks!'
    });
    if (res?.success) {
      showMsg(res.message);
    }
  };

  const handleBulkMilestoneComplete = () => {
    const res = cohortBulkAction('MARK_MILESTONE_COMPLETE', selectedCohortStudents, { stageIndex: 0 });
    if (res?.success) {
      showMsg(res.message);
    }
  };

  const toggleSelectAll = () => {
    if (selectedCohortStudents.length === pipelineStudents.length) {
      setSelectedCohortStudents([]);
    } else {
      setSelectedCohortStudents(pipelineStudents.map(s => s.studentId || s.id));
    }
  };

  const toggleSelectStudent = (id) => {
    if (selectedCohortStudents.includes(id)) {
      setSelectedCohortStudents(selectedCohortStudents.filter(sId => sId !== id));
    } else {
      setSelectedCohortStudents([...selectedCohortStudents, id]);
    }
  };

  // Metrics calculation
  const admittedCount = applications.filter(a => a.status === 'Admitted').length;
  const inProgressCount = applications.filter(a => a.status === 'In Progress' || a.status === 'Under Review').length;
  const submittedCount = applications.filter(a => a.status === 'Submitted').length;

  return (
    <div className="space-y-8 w-full font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Admissions Pipeline & Cohort Workspace
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Application & Shortlist Pipeline</h1>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-200/80 p-1.5 rounded-2xl shadow-inner text-xs font-bold">
            <button
              onClick={() => setViewMode('SINGLE')}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
                viewMode === 'SINGLE'
                  ? 'bg-[#0B2545] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Single Student Deep-Dive
            </button>
            <button
              onClick={() => setViewMode('COHORT')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'COHORT'
                  ? 'bg-[#0B2545] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#CFA25E]" />
              Cohort Matrix ({pipelineStudents.length})
            </button>
          </div>

          {/* Active Student Indicator (Single Mode) */}
          {viewMode === 'SINGLE' && (
            <div className="flex items-center gap-2.5 bg-slate-900 text-white px-3.5 py-2 rounded-2xl border border-[#CFA25E]/40 shadow-xs">
              <img
                src={activeStudent?.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                alt={activeStudent?.fullName || 'Student'}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#CFA25E]"
              />
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#CFA25E] font-bold block">Active:</span>
                <span className="text-xs font-bold text-white leading-tight block">{activeStudent?.fullName || 'Rohan Mehta'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* COHORT MATRIX & BULK ACTIONS VIEW (Spec Step 6) */}
      {viewMode === 'COHORT' ? (
        <div className="space-y-6">
          
          {/* Bulk Operations Action Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">
                Selected: <strong>{selectedCohortStudents.length}</strong> of {pipelineStudents.length} students
              </span>
              <button
                onClick={toggleSelectAll}
                className="text-xs text-[#0B2545] hover:underline font-extrabold cursor-pointer"
              >
                {selectedCohortStudents.length === pipelineStudents.length ? 'Deselect All' : 'Select All Cohort'}
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleBulkReminder}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 fill-slate-950" />
                Send 7-Day Deadline Nudge
              </button>

              <button
                onClick={handleBulkMilestoneComplete}
                className="px-4 py-2 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-[#CFA25E]" />
                Sign Off Stage 1 for Selected
              </button>
            </div>
          </div>

          {/* Cohort Matrix Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px] tracking-wider">
                    <th className="p-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCohortStudents.length === pipelineStudents.length && pipelineStudents.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded text-[#0B2545]"
                      />
                    </th>
                    <th className="p-4">Student & Target Goal</th>
                    <th className="p-4">Track & Countries</th>
                    <th className="p-4">Current Stage</th>
                    <th className="p-4">Urgent Deadline</th>
                    <th className="p-4">Applications</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pipelineStudents.map((s) => {
                    const sid = s.studentId || s.id;
                    const isSelected = selectedCohortStudents.includes(sid);
                    const isActive = sid === activeStudentId;

                    return (
                      <tr key={sid} className={`hover:bg-slate-50/80 transition ${isActive ? 'bg-amber-50/40' : ''}`}>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectStudent(sid)}
                            className="rounded text-[#0B2545]"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={s.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                              alt={s.fullName}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                            />
                            <div>
                              <span className="font-extrabold text-slate-900 block">{s.fullName || s.name}</span>
                              <span className="text-[11px] text-slate-500">{s.targetGoal || 'Undergraduate Track'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-800 block">{s.targetTrack || 'Study abroad admissions'}</span>
                          <span className="text-[11px] text-slate-500">{s.targetCountries || 'US, UK, Canada'}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 font-extrabold text-[10px] text-slate-700 uppercase">
                            {s.currentStage || 'Profile Review'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-100 font-bold text-rose-700 text-[11px] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {s.deadlineUrgency || 'Due in 14 days'}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-slate-800">
                          {s.schoolsCount || (s.applications?.length) || 0} Schools
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              switchActiveStudent(sid);
                              setViewMode('SINGLE');
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-[#0B2545] hover:text-white text-slate-800 font-bold text-xs rounded-xl transition inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        /* SINGLE STUDENT DEEP-DIVE VIEW */
        <div className="space-y-8">
          
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

            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-[#0B2545]">In Progress / Under Review</span>
              <p className="text-2xl font-black text-[#0B2545]">{inProgressCount}</p>
            </div>

            <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-amber-800">Submitted</span>
              <p className="text-2xl font-black text-amber-950">{submittedCount}</p>
            </div>
          </div>

          {/* Student Shortlist & Send Recommendations */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#CFA25E]" /> Student Shortlisted Options & Recommendation Dispatcher
              </h2>
              <button 
                onClick={() => setShowAddRec(!showAddRec)} 
                className="px-3.5 py-1.5 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#133E6D] transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#CFA25E]" /> Send Recommendation
              </button>
            </div>

            {showAddRec && (
              <form onSubmit={handleAddRec} className="border-b border-slate-200 p-5 bg-amber-50/30 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">University Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stanford University"
                      value={recForm.schoolName}
                      onChange={e => setRecForm({ ...recForm, schoolName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Program / Degree *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. M.S. in Computer Science"
                      value={recForm.program}
                      onChange={e => setRecForm({ ...recForm, program: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Fit Category</label>
                    <select
                      value={recForm.category}
                      onChange={e => setRecForm({ ...recForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    >
                      <option value="Dream School">Dream School</option>
                      <option value="Target School">Target School</option>
                      <option value="Safety School">Safety School</option>
                    </select>
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Counsellor Fit Justification</label>
                    <input
                      type="text"
                      placeholder="e.g. Strong faculty research alignment with applicant GPA..."
                      value={recForm.description}
                      onChange={e => setRecForm({ ...recForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddRec(false)} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-md">Dispatch to Student</button>
                </div>
              </form>
            )}

            <div className="p-6">
              {(recommendations || []).length === 0 ? (
                <p className="text-xs text-slate-400 italic">No recommendations dispatched yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {recommendations.map(r => (
                    <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#0B2545] bg-white px-2 py-0.5 rounded border border-slate-200">{r.category}</span>
                        <h4 className="font-bold text-slate-900 text-xs mt-1">{r.name}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{r.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Applications Management Grid */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-sm font-bold text-[#0B2545] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#CFA25E]" /> Tracked University Applications ({applications.length})
              </h2>
              <button 
                onClick={() => setShowAddApp(!showAddApp)} 
                className="px-3.5 py-1.5 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#133E6D] transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#CFA25E]" /> Add School
              </button>
            </div>

            {showAddApp && (
              <form onSubmit={handleAddApp} className="border-b border-slate-200 p-5 bg-slate-50/50 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">University *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. University of Oxford"
                      value={appForm.universityName}
                      onChange={e => setAppForm({ ...appForm, universityName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Course / Degree *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MSc Advanced Computer Science"
                      value={appForm.courseName}
                      onChange={e => setAppForm({ ...appForm, courseName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Country</label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom"
                      value={appForm.country}
                      onChange={e => setAppForm({ ...appForm, country: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Application Deadline</label>
                    <input
                      type="date"
                      value={appForm.applicationDeadline}
                      onChange={e => setAppForm({ ...appForm, applicationDeadline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block uppercase text-slate-500 font-bold mb-1">Status</label>
                    <select
                      value={appForm.status}
                      onChange={e => setAppForm({ ...appForm, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200"
                    >
                      {APP_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddApp(false)} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-md">Add Application</button>
                </div>
              </form>
            )}

            <div className="p-6 space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{app.universityName || app.school}</h4>
                      {app.country && <span className="text-[10px] text-slate-500">({app.country})</span>}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{app.courseName || app.program}</p>
                    <span className="text-[10px] text-slate-400">Deadline: {app.applicationDeadline || app.deadline || 'Rolling'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={app.status}
                      onChange={(e) => {
                        updateApplicationStatus(app.id, e.target.value);
                        showMsg(`Updated status to "${e.target.value}"`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      {APP_STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(p => ({ ...p, isOpen: false }))}
      />
    </div>
  );
};
