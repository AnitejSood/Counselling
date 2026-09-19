import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  ShieldCheck, ExternalLink, Calendar, CheckCircle2, AlertTriangle, FileText, 
  Compass, Check, Plane, Home, CreditCard, HeartPulse, Plus, CheckSquare, Square,
  Trash2, Sparkles, Building2, ArrowRight, X, Phone, MessageSquare
} from 'lucide-react';

const VETTED_PARTNERS = [
  {
    id: 'partner_visa',
    category: 'Student Visa Filing & Immigration',
    partnerName: 'GlobalVisa Concierge Network',
    badge: 'Official Visa Partner',
    perk: '15% Off Legal Filing & Document Audit',
    description: 'Specialized visa consultants providing DS-160/CAS verification, VFS biometric assistance, and mock embassy interview prep.',
    cta: 'Connect with Visa Partner',
    icon: ShieldCheck,
    tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
  },
  {
    id: 'partner_finance',
    category: 'Education Loans & Solvency Proof',
    partnerName: 'HDFC Credila & Prodigy Finance',
    badge: 'Preferred Lending Partner',
    perk: 'Pre-Approved Solvency Proof in 48h',
    description: 'Collateral-free international education loans with rapid sanction letters accepted by US, UK, Canada & EU embassies.',
    cta: 'Check Loan Eligibility',
    icon: CreditCard,
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
  },
  {
    id: 'partner_housing',
    category: 'Student Accommodation & Dorms',
    partnerName: 'AmberStudent Global Living',
    badge: 'Housing Partner',
    perk: 'Zero Booking Fee + £100 Cashback',
    description: '100% verified student apartments, en-suites, and campus flats within walking distance of top universities worldwide.',
    cta: 'Explore Student Housing',
    icon: Home,
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
  },
  {
    id: 'partner_forex',
    category: 'Forex & Tuition Fee Remittance',
    partnerName: 'Flywire & Wise Education',
    badge: 'Forex Partner',
    perk: 'Zero Margin Exchange Rates',
    description: 'Direct university wire transfers with instant payment receipts accepted directly by university finance bursars.',
    cta: 'Compare Forex Rates',
    icon: Compass,
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
  },
  {
    id: 'partner_travel',
    category: 'Student Flights & Extra Baggage',
    partnerName: 'StudentFly Global Travel Agency',
    badge: 'Official Travel Partner',
    perk: '+10kg Baggage Allowance + ₹12,000 Off',
    description: 'Exclusive student airline tariffs with flexible date change options and dedicated international baggage allowances.',
    cta: 'Claim Flight Voucher',
    icon: Plane,
    tagColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  }
];

export const ApplicationTracker = () => {
  const { 
    pipelineStudents, 
    activeStudent, 
    postAdmitTasks, 
    togglePostAdmitTask, 
    addPostAdmitTask, 
    deletePostAdmitTask,
    addNotification 
  } = useData();

  // Dynamically resolve student
  const student = (activeStudent && !activeStudent.isAllAggregate) ? activeStudent : (pipelineStudents?.[0] || {});
  const applications = student.applications || [];

  const [flagDiscrepancyModal, setFlagDiscrepancyModal] = useState(null);
  const [flagText, setFlagText] = useState('');
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  // New post-admit task modal state
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Visa');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  // Partner referral modal state
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partnerPhone, setPartnerPhone] = useState(student.phone || '');
  const [partnerNote, setPartnerNote] = useState('');
  const [referralSuccess, setReferralSuccess] = useState(false);

  // Admitted applications check
  const admittedApps = applications.filter(a => a.status === 'Admitted');
  const hasAdmits = admittedApps.length > 0;
  const admittedSchoolName = admittedApps.map(a => a.school || a.universityName).join(', ') || 'Imperial College London';

  // Post-admit progress calculation
  const completedTasksCount = (postAdmitTasks || []).filter(t => t.completed).length;
  const totalTasksCount = (postAdmitTasks || []).length;
  const progressPercent = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  const handleFlagSubmit = (e) => {
    e.preventDefault();
    if (!flagText.trim()) return;

    addNotification(
      'DISCREPANCY',
      `Application Status Discrepancy Flagged: ${flagDiscrepancyModal}`,
      `Student ${student.fullName || 'Student'} flagged status update for ${flagDiscrepancyModal}: "${flagText}"`,
      '/counsellor/pipeline',
      'COUNSELLOR'
    );

    setFlagSubmitted(true);
    setTimeout(() => {
      setFlagDiscrepancyModal(null);
      setFlagSubmitted(false);
      setFlagText('');
    }, 2500);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addPostAdmitTask({
      school: admittedSchoolName,
      title: newTaskTitle,
      category: newTaskCategory,
      dueDate: newTaskDueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    setNewTaskTitle('');
    setAddTaskModalOpen(false);
  };

  const handlePartnerReferralSubmit = (e) => {
    e.preventDefault();
    if (!selectedPartner) return;

    addNotification(
      'PARTNER_REFERRAL',
      `Partner Referral Request: ${selectedPartner.partnerName}`,
      `Referral requested for ${selectedPartner.category}. Our partner coordinator will connect with you at ${partnerPhone || 'your registered contact'}.`,
      '/dashboard/applications',
      'STUDENT'
    );

    setReferralSuccess(true);
    setTimeout(() => {
      setReferralSuccess(false);
      setSelectedPartner(null);
      setPartnerNote('');
    }, 2500);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Visa': return <ShieldCheck className="w-4 h-4 text-sky-400" />;
      case 'Accommodation': return <Home className="w-4 h-4 text-amber-400" />;
      case 'Finance': return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'Health': return <HeartPulse className="w-4 h-4 text-rose-400" />;
      default: return <Plane className="w-4 h-4 text-[#CFA25E]" />;
    }
  };

  return (
    <div className="space-y-8 w-full font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#CFA25E]">Admissions Central Hub</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">Application & Offer Tracker</h1>
          <p className="text-xs text-slate-500">Single source of truth on all submitted decisions, verified admits, and personal post-admit steps.</p>
        </div>
        <span className="text-xs font-bold bg-amber-50 text-amber-900 px-3.5 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#CFA25E]" />
          Verified Single Source of Truth
        </span>
      </div>

      {/* FEATURE 1: STUDENT SELF-MANAGED POST-ADMIT CHECKLIST */}
      {hasAdmits && (
        <div className="bg-gradient-to-br from-[#0B2545] via-[#133E6D] to-[#0B2545] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 inline-flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" /> Student Self-Managed Checklist
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold">
                Admit Confirmed: {admittedSchoolName} 🎉
              </h2>
              <p className="text-xs text-slate-300">
                Track your personal to-do list after receiving an offer letter. Add, customize, and check off your personal milestones.
              </p>
            </div>

            <button
              onClick={() => setAddTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#CFA25E] hover:bg-amber-400 text-[#0B2545] font-extrabold text-xs shadow-lg transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add My Personal Task
            </button>
          </div>

          {/* Platform Scope & Disclaimer Banner */}
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-4 flex items-start gap-3 text-amber-100 text-xs">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-300 block">Platform Scope & Transparency Notice</span>
              <p className="text-slate-300 leading-relaxed">
                matchEd and its counsellors specialize strictly in university admissions strategy and do not provide direct visa filing, legal immigration paperwork, or travel handling. Use this checklist to organize your personal to-dos, or connect with our vetted partner companies below for specialized visa filing, education loans, forex, and housing.
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Personal Pre-Departure Readiness</span>
              <span className="text-[#CFA25E]">{completedTasksCount} of {totalTasksCount} completed ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-[#CFA25E] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Interactive Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(postAdmitTasks || []).map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 select-none group ${
                  task.completed
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                <div 
                  onClick={() => togglePostAdmitTask(task.id)}
                  className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                >
                  <button type="button" className="mt-0.5 shrink-0">
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 group-hover:text-white transition" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="p-1 rounded-lg bg-white/10 shrink-0">
                        {getCategoryIcon(task.category)}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-300">
                        {task.category}
                      </span>
                    </div>
                    <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Due: {task.dueDate}</p>
                  </div>
                </div>

                {/* Delete Task Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePostAdmitTask(task.id);
                  }}
                  title="Remove this task"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0 opacity-80 hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* FEATURE 2: VETTED PARTNER SERVICES & REFERRALS */}
      {hasAdmits && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs font-bold text-[#CFA25E] uppercase tracking-wider">Trusted Ecosystem</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#0B2545]" /> Vetted Partner Services & Exclusive Perks
              </h2>
              <p className="text-xs text-slate-500">
                matchEd focuses 100% on admissions strategy. For visa filing, education loans, accommodation, and travel, connect directly with our certified partners.
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-full text-xs font-extrabold">
              5 Verified Partners
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VETTED_PARTNERS.map((partner) => {
              const Icon = partner.icon;
              return (
                <div 
                  key={partner.id}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
                        {partner.category}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B2545]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{partner.partnerName}</h3>
                      <p className="text-xs font-bold text-amber-700 mt-0.5">{partner.perk}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPartner(partner);
                      setReferralSuccess(false);
                    }}
                    className="w-full py-2.5 px-3.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{partner.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA25E]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FEATURE 3: APPLICATIONS STATUS GRID */}
      <div className="space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#0B2545]" /> University Applications & Live Portal Status ({applications.length})
        </h2>

        <div className="space-y-4">
          {applications.map((app, idx) => {
            const schoolName = app.school || app.universityName;
            const programName = app.program || app.courseName;

            return (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-xl font-bold text-slate-900">{schoolName}</h3>
                      {app.status === 'Admitted' && (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Verified Offer Letter
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-semibold mt-1">{programName} • {app.country || 'Target Country'} • {app.fitScore || 'Target Fit'}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold shadow-xs ${
                      app.status === 'Admitted' 
                        ? 'bg-emerald-600 text-white' 
                        : app.status === 'Submitted' 
                          ? 'bg-[#0B2545] text-white' 
                          : 'bg-amber-500 text-slate-950 font-black'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                      Deadline: {app.deadline || app.applicationDeadline}
                    </span>
                  </div>
                </div>

                {/* Discrepancy Flagging Tool */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs gap-2">
                  <span className="text-slate-600 font-medium">
                    Received an update from the university portal? Keep your counsellor synced.
                  </span>
                  <button 
                    onClick={() => {
                      setFlagDiscrepancyModal(schoolName);
                      setFlagSubmitted(false);
                      setFlagText('');
                    }}
                    className="text-[#0B2545] hover:text-indigo-800 font-extrabold flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Report Portal Update / Discrepancy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DISCREPANCY / STATUS UPDATE MODAL */}
      {flagDiscrepancyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Report Status Update — {flagDiscrepancyModal}
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              If your application status differs from your counsellor's records or an offer letter was issued, alert your mentor immediately.
            </p>

            {flagSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p>Status notification dispatched to counsellor dashboard!</p>
              </div>
            ) : (
              <form onSubmit={handleFlagSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Update Details *</label>
                  <textarea 
                    rows={3} 
                    required
                    value={flagText}
                    onChange={e => setFlagText(e.target.value)}
                    placeholder="e.g. Received official interview invite today for March 15th, or admitted with $20,000 scholarship..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                  />
                </div>
                <div className="flex justify-end gap-2.5">
                  <button 
                    type="button"
                    onClick={() => setFlagDiscrepancyModal(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition"
                  >
                    Notify Counsellor
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD PERSONAL TASK MODAL */}
      {addTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-extrabold text-slate-900 text-base mb-1">Add Personal Milestone / Task</h3>
            <p className="text-xs text-slate-500 mb-4">Add your own custom milestone for post-admit logistics and preparation.</p>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs font-semibold">
              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Submit Forex tuition remittance form, pack documents..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Category *</label>
                <select
                  value={newTaskCategory}
                  onChange={e => setNewTaskCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="Visa">Visa & Biometrics</option>
                  <option value="Finance">Finance & Bank Solvency</option>
                  <option value="Accommodation">Accommodation & Housing</option>
                  <option value="Health">Health & Immunizations</option>
                  <option value="Pre-Departure">Travel & Packing</option>
                </select>
              </div>

              <div>
                <label className="block uppercase text-slate-500 text-[10px] mb-1">Target Due Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={e => setNewTaskDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setAddTaskModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PARTNER REFERRAL MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {selectedPartner.badge}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg mt-2">
                  Connect with {selectedPartner.partnerName}
                </h3>
                <p className="text-xs text-slate-500">{selectedPartner.category}</p>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>matchEd Student Perk: {selectedPartner.perk}</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Admitted University: <span className="font-bold text-slate-800">{admittedSchoolName}</span>
              </p>
            </div>

            {referralSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl text-xs font-bold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-extrabold text-emerald-950">Referral Request Received!</h4>
                <p className="text-[11px] text-emerald-800 font-medium">
                  A certified advisor from {selectedPartner.partnerName} will contact you within 24 hours with your exclusive matchEd perk code.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartnerReferralSubmit} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block uppercase text-slate-500 text-[10px] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    disabled
                    value={student.fullName || 'Rohan Mehta'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block uppercase text-slate-500 text-[10px] mb-1">Phone / WhatsApp for Partner Callback *</label>
                  <input
                    type="tel"
                    required
                    value={partnerPhone}
                    onChange={e => setPartnerPhone(e.target.value)}
                    placeholder="+91 98200 11223"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-slate-500 text-[10px] mb-1">Specific Requirements or Target Dates</label>
                  <textarea
                    rows={2}
                    value={partnerNote}
                    onChange={e => setPartnerNote(e.target.value)}
                    placeholder="e.g. Need F1/CAS visa appointment by May, or looking for 1BHK private dorm near campus..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPartner(null)}
                    className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Request Callback</span>
                    <ArrowRight className="w-4 h-4 text-[#CFA25E]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
