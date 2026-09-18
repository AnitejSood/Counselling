import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  User,
  Compass,
  Sparkles,
  FileCheck,
  FolderOpen,
  Calendar,
  MessageSquare,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  FileText,
  Bookmark,
  Brain,
  Award,
  Target
} from 'lucide-react';

export const StudentDetail = () => {
  const { studentId } = useParams();
  const {
    adminStudentsList,
    studentProfile,
    milestones,
    recommendations,
    shortlists,
    applications,
    documents,
    appointments,
    messages,
    psychometricResults,
    addRecommendation,
    reviewDocument,
    updateMilestone
  } = useData();

  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [internalNotesList, setInternalNotesList] = useState([
    { id: 1, date: '2026-06-18', text: 'Rohan has strong CGPA (8.85). Target GRE Quant score 168+ for top US admits.' },
    { id: 2, date: '2026-07-10', text: 'SOP draft v1 submitted. Needs structural work in paragraph 3.' }
  ]);

  // Form states for adding recommendation
  const [newRecName, setNewRecName] = useState('');
  const [newRecCategory, setNewRecCategory] = useState('Dream Target');
  const [newRecDesc, setNewRecDesc] = useState('');
  const [newRecWhy, setNewRecWhy] = useState('');
  const [recAddedSuccess, setRecAddedSuccess] = useState(false);

  const student = adminStudentsList.find(s => s.id === studentId) || adminStudentsList[0];

  const handleAddRec = (e) => {
    e.preventDefault();
    addRecommendation({
      studentId: student.id,
      type: 'UNIVERSITY',
      name: newRecName,
      category: newRecCategory,
      description: newRecDesc,
      whyIRecommendThis: newRecWhy,
      universityDetails: {
        country: 'United States',
        approxTuitionUSD: '$35,000 / yr',
        intake: 'Fall 2027',
        applicationDeadline: 'Dec 15, 2026'
      }
    });
    setNewRecName('');
    setNewRecDesc('');
    setNewRecWhy('');
    setRecAddedSuccess(true);
    setTimeout(() => setRecAddedSuccess(false), 3000);
  };

  const handleAddInternalNote = (e) => {
    e.preventDefault();
    if (!internalNoteInput.trim()) return;
    setInternalNotesList([...internalNotesList, {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      text: internalNoteInput
    }]);
    setInternalNoteInput('');
  };

  return (
    <div className="space-y-8 w-full">
      
      {/* Student 360 Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <img
            src={student.avatarUrl}
            alt={student.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{student.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                Student ID: {student.id}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">{student.targetGoal} • {student.targetCountries}</p>
            <p className="text-xs text-slate-400">{student.email} • {student.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('RECOMMEND_FORM')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
          >
            <Sparkles className="w-4 h-4" /> Add Recommendation
          </button>
          <button
            onClick={() => setActiveTab('MESSAGES')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
          >
            Message Student
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-2">
        {[
          { key: 'OVERVIEW', label: '360° Overview', icon: User },
          { key: 'PSYCHOMETRICS', label: 'Psychometric Report', icon: Brain },
          { key: 'PROFILE', label: 'Student Profile', icon: FileText },
          { key: 'JOURNEY', label: 'Journey Milestones', icon: Compass },
          { key: 'RECOMMENDATIONS', label: 'Recommendations', icon: Sparkles },
          { key: 'RECOMMEND_FORM', label: '+ Add Recommendation', icon: PlusCircle },
          { key: 'APPLICATIONS', label: 'Applications', icon: FileCheck },
          { key: 'DOCUMENTS', label: 'Documents Review', icon: FolderOpen },
          { key: 'NOTES', label: 'Internal Counsellor Notes', icon: Bookmark }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        
        {/* OVERVIEW */}
        {activeTab === 'OVERVIEW' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Student Executive Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Academic Standing</span>
                <p className="font-bold text-slate-900">{studentProfile.academicBackground.gpaOrPercentage}</p>
                <p className="text-slate-500">{studentProfile.academicBackground.institutionName}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                <span className="text-purple-600 font-bold uppercase text-[10px]">Holland Code (RIASEC)</span>
                <p className="font-extrabold text-purple-900 text-lg">{psychometricResults?.riasec?.hollandCode || 'IRC'}</p>
                <p className="text-slate-500 truncate">{psychometricResults?.riasec?.mappedCareer?.title}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">English Score</span>
                <p className="font-bold text-emerald-600">{studentProfile.testScores.englishTest.score}</p>
                <p className="text-slate-500">{studentProfile.testScores.englishTest.type}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Standardized Test</span>
                <p className="font-bold text-purple-600">{studentProfile.testScores.standardizedTest.score}</p>
                <p className="text-slate-500">{studentProfile.testScores.standardizedTest.type}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 space-y-1">
              <p className="font-bold text-amber-900 uppercase">Student's Direct Questions for Arti Sood:</p>
              <p className="italic">"{studentProfile.studentQuestions}"</p>
            </div>
          </div>
        )}

        {/* PSYCHOMETRIC REPORT FOR COUNSELLOR */}
        {activeTab === 'PSYCHOMETRICS' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Psychometric Evaluation Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* RIASEC Card */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                <span className="text-xs font-bold text-blue-700 uppercase">1. Holland Code Profile</span>
                <p className="text-3xl font-extrabold text-blue-900">{psychometricResults?.riasec?.hollandCode}</p>
                <p className="text-xs font-semibold text-slate-800">{psychometricResults?.riasec?.mappedCareer?.title}</p>
                <div className="text-[11px] text-slate-600 space-y-1 pt-2 border-t border-blue-200">
                  <p><strong>Top Careers:</strong> {psychometricResults?.riasec?.mappedCareer?.topCareers?.slice(0, 2).join(', ')}</p>
                  <p><strong>O*NET Code:</strong> {psychometricResults?.riasec?.mappedCareer?.onetCode}</p>
                </div>
              </div>

              {/* Big Five Card */}
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3">
                <span className="text-xs font-bold text-purple-700 uppercase">2. Big Five Personality Percentiles</span>
                <div className="space-y-1 text-xs">
                  {psychometricResults?.bigFive?.percentiles && Object.entries(psychometricResults.bigFive.percentiles).map(([trait, pct]) => (
                    <div key={trait} className="flex justify-between font-medium">
                      <span className="text-slate-700">{trait}:</span>
                      <span className="font-bold text-purple-800">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Values Card */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <span className="text-xs font-bold text-emerald-700 uppercase">3. Work Values Drivers</span>
                <p className="text-xs font-bold text-slate-900">{psychometricResults?.workValues?.environmentalFit}</p>
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase">Top Non-Negotiables:</span>
                  <ul className="space-y-0.5 text-slate-700">
                    {psychometricResults?.workValues?.top5Items?.map((v, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{v.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'PROFILE' && (
          <div className="space-y-4 text-xs text-slate-700">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Full Student Dossier</h3>
            <p><strong>Current Institution:</strong> {studentProfile.academicBackground.institutionName}</p>
            <p><strong>Degree:</strong> {studentProfile.academicBackground.degreeName}</p>
            <p><strong>CGPA:</strong> {studentProfile.academicBackground.gpaOrPercentage}</p>
            <p><strong>Class 10 / 12:</strong> 10th: {studentProfile.academicBackground.class10Percentage} | 12th: {studentProfile.academicBackground.class12Percentage}</p>
            <p><strong>Annual Budget:</strong> {studentProfile.interestsAndGoals.budgetRangeAnnual}</p>
            <p><strong>Funding Plan:</strong> {studentProfile.interestsAndGoals.fundingPlan}</p>
          </div>
        )}

        {/* JOURNEY MILESTONES */}
        {activeTab === 'JOURNEY' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Update Student Journey Milestones</h3>
            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-purple-600">Stage {m.stageNumber}: {m.title}</span>
                    <p className="text-slate-500">{m.notes}</p>
                  </div>
                  <select
                    value={m.status}
                    onChange={(e) => updateMilestone(m.id, { status: e.target.value })}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 font-bold"
                  >
                    <option value="COMPLETED">Completed</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="PENDING">Pending</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD RECOMMENDATION FORM */}
        {activeTab === 'RECOMMEND_FORM' && (
          <form onSubmit={handleAddRec} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Add New Recommendation for Student</h3>
            
            {recAddedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold">
                ✓ Recommendation successfully added to student portal!
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / Course / Career Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Carnegie Mellon University - MS in AI"
                value={newRecName}
                onChange={(e) => setNewRecName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={newRecCategory}
                onChange={(e) => setNewRecCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              >
                <option>Dream Target</option>
                <option>Target Option</option>
                <option>Safety Target</option>
                <option>Career Pathway</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description & Overview</label>
              <textarea
                rows={2}
                value={newRecDesc}
                onChange={(e) => setNewRecDesc(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Why I (Arti Sood) Recommend This</label>
              <textarea
                rows={2}
                required
                value={newRecWhy}
                onChange={(e) => setNewRecWhy(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md"
            >
              Publish Recommendation to Student
            </button>
          </form>
        )}

        {/* DOCUMENTS REVIEW */}
        {activeTab === 'DOCUMENTS' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Review Uploaded Student Documents</h3>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-purple-600">{doc.category}</span>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-slate-500">{doc.fileName} • Uploaded {doc.uploadedAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => reviewDocument(doc.id, 'Approved', 'Verified & Approved by Arti Sood.')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reviewDocument(doc.id, 'Changes Required', 'Changes required: Please re-upload with clear scan.')}
                        className="px-3 py-1 bg-rose-600 text-white rounded-lg font-bold text-xs"
                      >
                        Request Changes
                      </button>
                    </div>
                  </div>
                  {doc.counsellorComment && (
                    <p className="text-slate-600 italic">Current Feedback: "{doc.counsellorComment}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INTERNAL NOTES */}
        {activeTab === 'NOTES' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Private Internal Counsellor Notes (Only Visible to You)</h3>
            
            <form onSubmit={handleAddInternalNote} className="space-y-2">
              <textarea
                rows={2}
                placeholder="Add private note about student strategy..."
                value={internalNoteInput}
                onChange={(e) => setInternalNoteInput(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              ></textarea>
              <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs">
                Save Private Note
              </button>
            </form>

            <div className="space-y-2 pt-2">
              {internalNotesList.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-purple-700">{n.date}</span>
                  <p className="text-slate-800">{n.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
