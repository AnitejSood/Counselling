import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  UserCheck, Save, CheckCircle2, AlertCircle, Edit3,
  GraduationCap, Target, Star, Globe, Send, BookOpen
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
            className="flex-1 input text-xs"
            autoFocus
          />
          <button onClick={handleSave} className="btn btn-primary py-1.5 px-3 text-[11px]">Save</button>
          <button onClick={() => setEditing(false)} className="btn btn-ghost py-1.5 px-3 text-[11px]">✕</button>
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
  const { studentProfile, updateStudentProfileField, sendMessage } = useData();
  const [requestNote, setRequestNote] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [notice, setNotice] = useState('');

  const showNotice = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!requestNote.trim()) return;
    sendMessage('COUNSELLOR', 'Arti Sood', requestNote);
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
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Student Intake"
        title="Review & Edit Student Profile"
        subtitle="As the assigned counsellor, you can directly update any field in the student profile. Changes reflect immediately in the student's dashboard."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Personal Info */}
      <div className="card overflow-hidden">
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
      <div className="card overflow-hidden">
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
          <Field label="Class 10 %" value={ab.class10Percentage} onSave={v => { updateStudentProfileField('academicBackground', 'class10Percentage', v); showNotice('Updated'); }} />
          <Field label="Class 12 %" value={ab.class12Percentage} onSave={v => { updateStudentProfileField('academicBackground', 'class12Percentage', v); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Goals & Targets */}
      <div className="card overflow-hidden">
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
          <Field label="Target Courses" value={(ig.preferredCourses || []).join(', ')} onSave={v => { updateStudentProfileField('interestsAndGoals', 'preferredCourses', v.split(',').map(s => s.trim())); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Test Scores */}
      <div className="card overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="w-8 h-8 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-900">Standardized Test Scores</h2>
        </div>
        <div className="px-6 py-4">
          <Field label="English Test" value={`${ts.englishTest?.type || ''} — ${ts.englishTest?.score || ''}`} onSave={v => { updateStudentProfileField('testScores', 'englishTestNote', v); showNotice('Updated'); }} />
          <Field label="GRE / SAT / GMAT" value={`${ts.standardizedTest?.type || ''} — ${ts.standardizedTest?.score || ''}`} onSave={v => { updateStudentProfileField('testScores', 'standardizedTestNote', v); showNotice('Updated'); }} />
        </div>
      </div>

      {/* Request Info / Send Message */}
      <div className="card p-6 space-y-4 bg-indigo-50/40 border-indigo-100">
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
              placeholder="e.g. Please upload 6th-semester marksheet before Aug 10 session..."
              value={requestNote}
              onChange={e => setRequestNote(e.target.value)}
              className="flex-1 input"
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};
