import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  UserCheck, Save, CheckCircle2, Edit3,
  GraduationCap, Target, Send, BookOpen, Brain, Sparkles, X
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

const Field = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value || '');

  const handleSave = () => {
    onSave(val);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 gap-4">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 min-w-[140px]">{label}</span>
      {editing ? (
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={val}
            onChange={e => setVal(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            autoFocus
          />
          <button onClick={handleSave} className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold">Save</button>
          <button onClick={() => setEditing(false)} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-xs">✕</button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1 justify-end">
          <span className="text-xs font-semibold text-slate-800 text-right">{value || <span className="text-slate-400 italic">Not set</span>}</span>
          <button onClick={() => setEditing(true)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export const IntakeReviewer = () => {
  const { currentUser } = useAuth();
  const { studentProfile, updateStudentProfileField, sendMessage, assignedPsychometrics, assignPsychometricTests } = useData();
  const [requestNote, setRequestNote] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [notice, setNotice] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [selectedTests, setSelectedTests] = useState(assignedPsychometrics || ['riasec', 'bigFive', 'learningStyle']);

  const allAvailableTests = [
    { key: 'riasec', name: 'RIASEC Career Interest Inventory' },
    { key: 'bigFive', name: 'Big Five Personality Assessment' },
    { key: 'workValues', name: 'Work Values Fit Matrix' },
    { key: 'learningStyle', name: 'VARK Learning Style Test' },
    { key: 'eqLeadership', name: 'EQ & Leadership Readiness Fit' }
  ];

  const toggleTestChoice = (key) => {
    if (selectedTests.includes(key)) {
      if (selectedTests.length > 1) {
        setSelectedTests(selectedTests.filter(t => t !== key));
      }
    } else {
      if (selectedTests.length < 3) {
        setSelectedTests([...selectedTests, key]);
      }
    }
  };

  const handleSaveAssignedTests = () => {
    assignPsychometricTests(selectedTests);
    setAssignModalOpen(false);
    showNotice('Assigned 2 to 3 psychometric tests to student dashboard!');
  };

  const showNotice = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!requestNote.trim()) return;
    sendMessage('COUNSELLOR', currentUser?.fullName || 'Assigned Counsellor', requestNote);
    setRequestSent(true);
    setRequestNote('');
    setTimeout(() => setRequestSent(false), 3000);
    showNotice('Request sent to student dashboard!');
  };

  const pi = studentProfile?.personalInfo || {};
  const ab = studentProfile?.academicBackground || {};
  const ig = studentProfile?.interestsAndGoals || {};
  const ts = studentProfile?.testScores || {};

  return (
    <div className="space-y-8 w-full font-sans">
      <PageHeader
        eyebrow="Student Intake & Diagnostics"
        title="Review Student Profile & Assign Tests"
        subtitle="Directly edit student records and assign 2 to 3 psychometric assessments to guide university fit."
        action={
          <button
            onClick={() => setAssignModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition"
          >
            <Brain className="w-4 h-4" /> Assign Psychometric Tests (2/3)
          </button>
        }
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Currently Assigned Tests Widget */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">Assigned Psychometrics</span>
          <h4 className="text-sm font-bold text-slate-900">Active Student Tests ({assignedPsychometrics.length} Assigned)</h4>
        </div>
        <div className="flex items-center gap-2">
          {assignedPsychometrics.map(key => (
            <span key={key} className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-100">
              {allAvailableTests.find(t => t.key === key)?.name || key}
            </span>
          ))}
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
            <UserCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Personal Information</h2>
        </div>
        <div className="px-6 py-4">
          <Field label="Full Name" value={pi.fullName} onSave={v => { updateStudentProfileField('personalInfo', 'fullName', v); showNotice('Name updated'); }} />
          <Field label="Phone" value={pi.phone} onSave={v => { updateStudentProfileField('personalInfo', 'phone', v); showNotice('Phone updated'); }} />
          <Field label="City" value={pi.city} onSave={v => { updateStudentProfileField('personalInfo', 'city', v); showNotice('City updated'); }} />
          <Field label="State" value={pi.state} onSave={v => { updateStudentProfileField('personalInfo', 'state', v); showNotice('State updated'); }} />
          <Field label="Nationality" value={pi.nationality} onSave={v => { updateStudentProfileField('personalInfo', 'nationality', v); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Academic Background */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-8 h-8 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Academic Background</h2>
        </div>
        <div className="px-6 py-4">
          <Field label="Degree Name" value={ab.degreeName} onSave={v => { updateStudentProfileField('academicBackground', 'degreeName', v); showNotice('Updated'); }} />
          <Field label="Institution" value={ab.institutionName} onSave={v => { updateStudentProfileField('academicBackground', 'institutionName', v); showNotice('Updated'); }} />
          <Field label="Graduation Year" value={ab.graduationYear} onSave={v => { updateStudentProfileField('academicBackground', 'graduationYear', v); showNotice('Updated'); }} />
          <Field label="GPA / CGPA" value={ab.gpaOrPercentage} onSave={v => { updateStudentProfileField('academicBackground', 'gpaOrPercentage', v); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Goals & Targets */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-8 h-8 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Target Goals & Preferences</h2>
        </div>
        <div className="px-6 py-4">
          <Field label="Preferred Intake" value={ig.preferredIntake} onSave={v => { updateStudentProfileField('interestsAndGoals', 'preferredIntake', v); showNotice('Updated'); }} />
          <Field label="Annual Budget" value={ig.budgetRangeAnnual} onSave={v => { updateStudentProfileField('interestsAndGoals', 'budgetRangeAnnual', v); showNotice('Updated'); }} />
          <Field label="Target Countries" value={(ig.preferredCountries || []).join(', ')} onSave={v => { updateStudentProfileField('interestsAndGoals', 'preferredCountries', v.split(',').map(s => s.trim())); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Request Info / Send Message */}
      <div className="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Send className="w-4 h-4 text-indigo-600" /> Request Additional Information from Student
        </h3>
        {requestSent ? (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" /> Message sent to student's inbox.
          </div>
        ) : (
          <form onSubmit={handleSendRequest} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Please upload 6th-semester marksheet before Aug 15 session..."
              value={requestNote}
              onChange={e => setRequestNote(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md">Send</button>
          </form>
        )}
      </div>

      {/* Assign Psychometric Tests Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Assign Psychometric Tests (Select 2 to 3)</h3>
              </div>
              <button onClick={() => setAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">Choose 2 or 3 specific tests out of the 5 available psychometric evaluations for {pi.fullName || 'student'}.</p>

            <div className="space-y-2 pt-1">
              {allAvailableTests.map((t) => {
                const checked = selectedTests.includes(t.key);
                return (
                  <div
                    key={t.key}
                    onClick={() => toggleTestChoice(t.key)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-semibold transition ${
                      checked ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{t.name}</span>
                    {checked && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAssignModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAssignedTests}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
              >
                Assign Selected Tests ({selectedTests.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
