import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { User, GraduationCap, Briefcase, Target, Award, Save, CheckCircle } from 'lucide-react';

export const ProfileEdit = () => {
  const { studentProfile, updateStudentProfile } = useData();
  const [activeTab, setActiveTab] = useState('PERSONAL');
  const [formData, setFormData] = useState(studentProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Student Profile Builder</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Personal & Academic Portfolio</h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully! Arti Sood will review your updated details.</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-2">
        {[
          { key: 'PERSONAL', label: 'Personal Information', icon: User },
          { key: 'ACADEMIC', label: 'Academic & Marks', icon: GraduationCap },
          { key: 'EXPERIENCE', label: 'Work & Activities', icon: Briefcase },
          { key: 'GOALS', label: 'Interests & Budget', icon: Target },
          { key: 'TESTS', label: 'Test Scores', icon: Award }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <TabIcon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        
        {/* PERSONAL */}
        {activeTab === 'PERSONAL' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, gender: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-Binary / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.personalInfo.nationality}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, nationality: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
              <textarea
                rows={2}
                value={formData.personalInfo.address}
                onChange={(e) => setFormData({
                  ...formData,
                  personalInfo: { ...formData.personalInfo, address: e.target.value }
                })}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              ></textarea>
            </div>
          </div>
        )}

        {/* ACADEMIC */}
        {activeTab === 'ACADEMIC' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Academic History</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Education Level</label>
                <input
                  type="text"
                  value={formData.academicBackground.currentEducationLevel}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, currentEducationLevel: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree & Major</label>
                <input
                  type="text"
                  value={formData.academicBackground.degreeName}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, degreeName: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">College / School Name</label>
                <input
                  type="text"
                  value={formData.academicBackground.institutionName}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, institutionName: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Cumulative GPA / CGPA / %</label>
                <input
                  type="text"
                  value={formData.academicBackground.gpaOrPercentage}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, gpaOrPercentage: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Internships & Extracurriculars</h3>
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Key Internships or Projects</label>
              {formData.experience.internships.map((intern, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{intern.role} - {intern.company}</p>
                  <p className="text-slate-500">{intern.duration}</p>
                  <p className="text-slate-700">{intern.highlights}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOALS */}
        {activeTab === 'GOALS' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Target Goals & Budget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Intake</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.preferredIntake}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, preferredIntake: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Annual Budget Range</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.budgetRangeAnnual}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, budgetRangeAnnual: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Questions for Arti Sood</label>
              <textarea
                rows={3}
                value={formData.studentQuestions}
                onChange={(e) => setFormData({
                  ...formData,
                  studentQuestions: e.target.value
                })}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
              ></textarea>
            </div>
          </div>
        )}

        {/* TESTS */}
        {activeTab === 'TESTS' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">English & Standardized Test Scores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-600">English Language Test</span>
                <p className="text-sm font-bold text-slate-900">{formData.testScores.englishTest.type}</p>
                <p className="text-xs text-slate-600">Score: {formData.testScores.englishTest.score}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-blue-600">Standardized Test</span>
                <p className="text-sm font-bold text-slate-900">{formData.testScores.standardizedTest.type}</p>
                <p className="text-xs text-slate-600">{formData.testScores.standardizedTest.score}</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition"
          >
            Save Complete Profile
          </button>
        </div>

      </form>

    </div>
  );
};
