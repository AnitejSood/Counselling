import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  User, GraduationCap, Briefcase, Target, Award, Save, CheckCircle2, 
  Plus, Trash2, Edit3, Image, Sparkles, FolderGit2, Compass, Check
} from 'lucide-react';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

const DEFAULT_AVATARS = [
  { id: 'av_1', label: 'Male Scholar', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
  { id: 'av_2', label: 'Female Scholar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { id: 'av_3', label: 'Tech Fellow', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { id: 'av_4', label: 'Business Fellow', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  { id: 'av_5', label: 'Creative Fellow', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' }
];

export const ProfileEdit = () => {
  const { studentProfile, updateStudentProfile } = useData();
  const [activeTab, setActiveTab] = useState('PERSONAL');
  const [formData, setFormData] = useState(() => ({
    ...studentProfile,
    avatarUrl: studentProfile?.avatarUrl || DEFAULT_AVATARS[0].url,
    experience: {
      internships: studentProfile?.experience?.internships || [
        { id: 'int_1', role: 'Machine Learning Research Intern', company: 'TCS Research Labs', duration: 'May 2025 - Jul 2025', highlights: 'Implemented transformer models for multilingual summarization, boosting benchmark accuracy by 14%.' },
        { id: 'int_2', role: 'Software Engineering Intern', company: 'Zomato HQ', duration: 'Dec 2024 - Jan 2025', highlights: 'Built microservice endpoints handling 20,000 requests/sec with Redis caching.' }
      ],
      extracurriculars: studentProfile?.experience?.extracurriculars || [
        { id: 'ec_1', title: 'President, ACM Student Chapter', organization: 'VJTI Mumbai', role: 'Student Head', description: 'Organized national-level hackathons with 1,200+ participants and raised ₹4 Lakhs in sponsorship.' },
        { id: 'ec_2', title: 'Core Volunteer & Tech Lead', organization: 'Rotaract Club', role: 'Lead Volunteer', description: 'Conducted weekly Python coding workshops for underprivileged school students.' }
      ],
      projects: studentProfile?.experience?.projects || [
        { id: 'prj_1', title: 'Decentralized Identity Verification on Polygon', domain: 'Blockchain & Cryptography', outcome: 'Presented at IEEE TechSym 2025; published preprint with 90+ GitHub stars.' },
        { id: 'prj_2', title: 'Autonomous Drone Navigation using Computer Vision', domain: 'Robotics & Edge AI', outcome: 'Won 1st prize at Smart India Hackathon.' }
      ]
    }
  }));

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Forms for adding new items in Work & Activities
  const [showAddInternship, setShowAddInternship] = useState(false);
  const [newInternship, setNewInternship] = useState({ role: '', company: '', duration: '', highlights: '' });

  const [showAddEC, setShowAddEC] = useState(false);
  const [newEC, setNewEC] = useState({ title: '', organization: '', role: '', description: '' });

  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', domain: '', outcome: '' });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    variant: 'danger',
    onConfirm: () => {}
  });

  const handleSave = (e) => {
    if (e) e.preventDefault();
    updateStudentProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Add Handlers
  const handleAddInternship = (e) => {
    e.preventDefault();
    if (!newInternship.role || !newInternship.company) return;
    const item = { id: `int_${Date.now()}`, ...newInternship };
    setFormData(p => ({
      ...p,
      experience: {
        ...p.experience,
        internships: [item, ...(p.experience.internships || [])]
      }
    }));
    setNewInternship({ role: '', company: '', duration: '', highlights: '' });
    setShowAddInternship(false);
  };

  const handleAddEC = (e) => {
    e.preventDefault();
    if (!newEC.title || !newEC.organization) return;
    const item = { id: `ec_${Date.now()}`, ...newEC };
    setFormData(p => ({
      ...p,
      experience: {
        ...p.experience,
        extracurriculars: [item, ...(p.experience.extracurriculars || [])]
      }
    }));
    setNewEC({ title: '', organization: '', role: '', description: '' });
    setShowAddEC(false);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const item = { id: `prj_${Date.now()}`, ...newProject };
    setFormData(p => ({
      ...p,
      experience: {
        ...p.experience,
        projects: [item, ...(p.experience.projects || [])]
      }
    }));
    setNewProject({ title: '', domain: '', outcome: '' });
    setShowAddProject(false);
  };

  // Delete Confirmations
  const confirmDelete = (type, id, name) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete ${name}`,
      message: `Are you sure you want to remove "${name}" from your portfolio?`,
      confirmText: 'Delete Item',
      variant: 'danger',
      onConfirm: () => {
        setFormData(p => ({
          ...p,
          experience: {
            ...p.experience,
            [type]: p.experience[type].filter(item => item.id !== id)
          }
        }));
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#CFA25E]">Portfolio & Resume Dossier</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">Student Profile & Experience</h1>
          <p className="text-xs text-slate-500">Provide thorough academic and extracurricular evidence to maximize Ivy & Top 20 admit chances.</p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition cursor-pointer"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#CFA25E]" /> Save Profile
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully! Your assigned counsellor can now review your updated portfolio.</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 pb-2">
        {[
          { key: 'PERSONAL', label: 'Personal & Avatar', icon: User },
          { key: 'ACADEMIC', label: 'Academic & Marks', icon: GraduationCap },
          { key: 'EXPERIENCE', label: 'Work & Activities', icon: Briefcase },
          { key: 'GOALS', label: 'Interests & Budget', icon: Target },
          { key: 'TESTS', label: 'Test Scores', icon: Award }
        ].map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#0B2545] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#CFA25E]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* ─── TAB 1: PERSONAL & AVATAR ─── */}
        {activeTab === 'PERSONAL' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 pb-2 border-b border-slate-100">
                Avatar & Profile Photo
              </h3>
              <p className="text-xs text-slate-500 mt-1">Select a preset student avatar placeholder or provide your own custom photo link.</p>
            </div>

            {/* Avatar Selector */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative">
                  <img
                    src={formData.avatarUrl}
                    alt="Active Avatar"
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-[#CFA25E] shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-[#0B2545] text-white text-[9px] font-bold rounded-full">
                    Active
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-xs font-bold text-slate-700 block">Choose from Default Student Avatars:</span>
                  <div className="flex flex-wrap gap-2.5">
                    {DEFAULT_AVATARS.map(av => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, avatarUrl: av.url }))}
                        className={`p-1 rounded-xl border transition-all cursor-pointer ${
                          formData.avatarUrl === av.url ? 'ring-2 ring-[#0B2545] border-[#CFA25E] bg-amber-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                        title={av.label}
                      >
                        <img src={av.url} alt={av.label} className="w-10 h-10 rounded-lg object-cover" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Or Paste Custom Image URL:</label>
                    <input
                      type="url"
                      value={formData.avatarUrl}
                      onChange={e => setFormData(p => ({ ...p, avatarUrl: e.target.value }))}
                      className="w-full px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-base font-extrabold text-slate-900 pb-2 border-b border-slate-100">Personal Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.fullName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.personalInfo.gender}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, gender: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-Binary / Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={formData.personalInfo.nationality}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, nationality: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value }
                    })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: ACADEMIC & MARKS ─── */}
        {activeTab === 'ACADEMIC' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">Academic Credentials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Highest Qualification / Degree</label>
                <input
                  type="text"
                  value={formData.academicBackground.degreeName}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, degreeName: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. B.Tech in Computer Engineering"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institution / University Name</label>
                <input
                  type="text"
                  value={formData.academicBackground.institutionName}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, institutionName: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. VJTI Mumbai"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cumulative CGPA / GPA / %</label>
                <input
                  type="text"
                  value={formData.academicBackground.gpaOrPercentage}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, gpaOrPercentage: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. 8.85 / 10.0"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Graduation Year</label>
                <input
                  type="text"
                  value={formData.academicBackground.graduationYear || '2026'}
                  onChange={(e) => setFormData({
                    ...formData,
                    academicBackground: { ...formData.academicBackground, graduationYear: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. 2026"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: WORK & ACTIVITIES (EXTENSIVE REPAIR) ─── */}
        {activeTab === 'EXPERIENCE' && (
          <div className="space-y-8 text-xs">
            {/* Section 1: Internships & Work Experience */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#0B2545]" /> Internships & Professional Experience ({(formData.experience.internships || []).length})
                  </h3>
                  <p className="text-xs text-slate-500">Corporate internships, startup roles, and industrial training.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddInternship(!showAddInternship)}
                  className="px-3 py-1.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#CFA25E]" /> Add Internship
                </button>
              </div>

              {showAddInternship && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                  <span className="font-extrabold text-slate-900 block text-xs">Add New Internship:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Role (e.g. Software Engineer Intern)"
                      value={newInternship.role}
                      onChange={e => setNewInternship(p => ({ ...p, role: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Company (e.g. Microsoft)"
                      value={newInternship.company}
                      onChange={e => setNewInternship(p => ({ ...p, company: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. Jun 2025 - Aug 2025)"
                      value={newInternship.duration}
                      onChange={e => setNewInternship(p => ({ ...p, duration: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <div className="sm:col-span-3">
                      <textarea
                        rows={2}
                        placeholder="Key responsibilities, technologies used, and measurable business impact..."
                        value={newInternship.highlights}
                        onChange={e => setNewInternship(p => ({ ...p, highlights: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddInternship(false)} className="px-3 py-1.5 bg-slate-200 rounded-xl font-bold">Cancel</button>
                    <button type="button" onClick={handleAddInternship} className="px-4 py-1.5 bg-[#0B2545] text-white rounded-xl font-bold shadow-xs">Save Internship</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {(formData.experience.internships || []).map((intern) => (
                  <div key={intern.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm">{intern.role}</h4>
                        <span className="text-slate-400">at</span>
                        <span className="font-bold text-[#0B2545]">{intern.company}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold">{intern.duration}</p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{intern.highlights}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => confirmDelete('internships', intern.id, `${intern.role} at ${intern.company}`)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Extracurricular Activities & Leadership */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" /> Extracurriculars & Leadership Roles ({(formData.experience.extracurriculars || []).length})
                  </h3>
                  <p className="text-xs text-slate-500">Student clubs, volunteering initiatives, hackathons, and sports.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddEC(!showAddEC)}
                  className="px-3 py-1.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#CFA25E]" /> Add Extracurricular
                </button>
              </div>

              {showAddEC && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                  <span className="font-extrabold text-slate-900 block text-xs">Add New Activity / Role:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Activity / Role Title (e.g. Club President)"
                      value={newEC.title}
                      onChange={e => setNewEC(p => ({ ...p, title: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Organization (e.g. ACM VJTI)"
                      value={newEC.organization}
                      onChange={e => setNewEC(p => ({ ...p, organization: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Role Level (e.g. Core Lead / Captain)"
                      value={newEC.role}
                      onChange={e => setNewEC(p => ({ ...p, role: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <div className="sm:col-span-3">
                      <textarea
                        rows={2}
                        placeholder="Key milestones, team size led, events organized..."
                        value={newEC.description}
                        onChange={e => setNewEC(p => ({ ...p, description: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddEC(false)} className="px-3 py-1.5 bg-slate-200 rounded-xl font-bold">Cancel</button>
                    <button type="button" onClick={handleAddEC} className="px-4 py-1.5 bg-[#0B2545] text-white rounded-xl font-bold shadow-xs">Save Activity</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {(formData.experience.extracurriculars || []).map((ec) => (
                  <div key={ec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm">{ec.title}</h4>
                        <span className="text-slate-400">·</span>
                        <span className="font-bold text-indigo-700">{ec.organization}</span>
                        {ec.role && <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-50 text-indigo-800">{ec.role}</span>}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{ec.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => confirmDelete('extracurriculars', ec.id, ec.title)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Academic & Research Projects */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-emerald-600" /> Academic & Research Projects ({(formData.experience.projects || []).length})
                  </h3>
                  <p className="text-xs text-slate-500">Capstone projects, published papers, and open-source contributions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-3 py-1.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#CFA25E]" /> Add Project
                </button>
              </div>

              {showAddProject && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in">
                  <span className="font-extrabold text-slate-900 block text-xs">Add New Project / Paper:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Project Title (e.g. Distributed Consensus on Solana)"
                      value={newProject.title}
                      onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Tech Stack / Domain (e.g. Rust, PyTorch, Edge AI)"
                      value={newProject.domain}
                      onChange={e => setNewProject(p => ({ ...p, domain: e.target.value }))}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                    <div className="sm:col-span-2">
                      <textarea
                        rows={2}
                        placeholder="Key findings, conference acceptance, GitHub link or benchmark results..."
                        value={newProject.outcome}
                        onChange={e => setNewProject(p => ({ ...p, outcome: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddProject(false)} className="px-3 py-1.5 bg-slate-200 rounded-xl font-bold">Cancel</button>
                    <button type="button" onClick={handleAddProject} className="px-4 py-1.5 bg-[#0B2545] text-white rounded-xl font-bold shadow-xs">Save Project</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {(formData.experience.projects || []).map((prj) => (
                  <div key={prj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm">{prj.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {prj.domain}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">{prj.outcome}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => confirmDelete('projects', prj.id, prj.title)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: TARGET GOALS & BUDGET ─── */}
        {activeTab === 'GOALS' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">Target Goals & Budget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Intake</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.preferredIntake}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, preferredIntake: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. Fall 2027"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Major / Field of Study</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.targetMajor}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, targetMajor: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. MS in Artificial Intelligence / Data Systems"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Study Destinations</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.targetCountries}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, targetCountries: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. US, UK, Canada, Germany"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Approximate Annual Budget (INR / USD)</label>
                <input
                  type="text"
                  value={formData.interestsAndGoals.budgetRange}
                  onChange={(e) => setFormData({
                    ...formData,
                    interestsAndGoals: { ...formData.interestsAndGoals, budgetRange: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. ₹35 - 45 Lakhs / year"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: TEST SCORES ─── */}
        {activeTab === 'TESTS' && (
          <div className="space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-2">Standardized Test Scores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">GRE / GMAT Score</label>
                <input
                  type="text"
                  value={formData.testScores.gre || '328 (Q168, V160, AWA 4.5)'}
                  onChange={(e) => setFormData({
                    ...formData,
                    testScores: { ...formData.testScores, gre: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">TOEFL / IELTS Score</label>
                <input
                  type="text"
                  value={formData.testScores.toefl || '112 (R29, L29, S26, W28)'}
                  onChange={(e) => setFormData({
                    ...formData,
                    testScores: { ...formData.testScores, toefl: e.target.value }
                  })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#CFA25E]" /> Save Profile Changes
          </button>
        </div>
      </form>

      {/* Confirmation Modal for item removal */}
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
