import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ChangeCounsellorModal } from '../../components/common/ChangeCounsellorModal';
import { FirstCallGuideModal } from '../../components/common/FirstCallGuideModal';
import {
  Sparkles,
  Calendar,
  Compass,
  FileCheck,
  FolderOpen,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Brain,
  Award,
  ShieldCheck,
  Video,
  GraduationCap,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export const DashboardOverview = () => {
  const { currentUser } = useAuth();
  const {
    studentProfile = {},
    milestones = [],
    recommendations = [],
    shortlists = [],
    applications = [],
    documents = [],
    appointments = [],
    messages = [],
    psychometricResults = {},
    counsellorSwitchState = {},
    counsellors = [],
    peerMentors = []
  } = useData();

  const [changeCounsellorOpen, setChangeCounsellorOpen] = useState(false);
  const [firstCallGuideOpen, setFirstCallGuideOpen] = useState(false);

  const studentName = currentUser?.fullName || "Rohan Mehta";
  const nextAppt = (appointments || []).find(a => a.status === 'UPCOMING') || appointments[0];
  const activeMilestone = (milestones || []).find(m => m.status === 'IN_PROGRESS') || milestones[0] || {
    stageNumber: 4,
    title: "Upload Academic Transcripts & SOP Draft 1",
    notes: "Upload your transcripts and initial SOP outline.",
    dueDate: "2026-07-25",
    tasks: ["Upload B.Tech Semester 1-6 Transcripts", "Submit SOP Draft Outline", "Schedule 1-on-1 strategy call"]
  };

  const currentCounsellor = counsellors.find(c => c.id === counsellorSwitchState?.currentCounsellorId) || counsellors[0];

  // 1-month switch calculation
  const onboardedTime = new Date(counsellorSwitchState?.onboardedDate || '2026-09-01').getTime();
  const now = new Date().getTime();
  const daysElapsed = Math.floor((now - onboardedTime) / (1000 * 3600 * 24));
  const daysRemaining = Math.max(0, 30 - daysElapsed);
  const isSwitchEligible = daysRemaining > 0 && (counsellorSwitchState?.changeCount || 0) < 3;

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] via-[#133E6D] to-[#0B2545] text-white rounded-3xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFA25E]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-bold border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" />
              <span>matchEd Verified Student Workspace</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {studentName}! 👋
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm">
              Target Goal: <strong className="text-white">{studentProfile?.interestsAndGoals?.preferredCourses?.[0] || 'MS Computer Science'}</strong> ({studentProfile?.interestsAndGoals?.preferredIntake || 'Fall 2027'})
            </p>
          </div>

          {/* Profile Completion Ring Widget */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" className="text-white/20" fill="transparent" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" className="text-[#CFA25E]" fill="transparent" strokeDasharray="150" strokeDashoffset="22" strokeLinecap="round" />
              </svg>
              <span className="absolute text-xs font-extrabold text-white">85%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Profile Strength</p>
              <p className="text-[11px] text-slate-300">Academic & test scores recorded</p>
              <Link to="/dashboard/profile" className="text-[11px] font-bold text-amber-300 hover:underline">
                Update Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 1-MONTH COUNSELLOR SWITCH GUARANTEE STATUS BANNER */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-[#0B2545] border border-amber-500/30 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#CFA25E] text-[#0B2545] flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold text-amber-300 tracking-wider">matchEd 1-Month Switch Guarantee:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                {daysRemaining} Days Left
              </span>
            </div>
            <p className="text-xs text-slate-200">
              Current Mentor: <strong>{currentCounsellor?.fullName}</strong> (₹{currentCounsellor?.pricePerSession?.toLocaleString('en-IN')}) · Switches Used: {counsellorSwitchState?.changeCount || 0}/3
            </p>
            <p className="text-[11px] text-slate-400">
              Change to any same-priced mentor for <strong>₹0 extra</strong>. If higher, pay difference; if lower, permitted with no refund.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setFirstCallGuideOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-amber-200 border border-amber-300/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" /> First Call Guide
          </button>
          <button
            onClick={() => setChangeCounsellorOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#CFA25E] hover:bg-amber-400 text-[#0B2545] font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Switch Mentor (₹0)
          </button>
        </div>
      </div>

      {/* PROMINENT NEXT ACTION CARD */}
      <div className="bg-gradient-to-r from-[#0B2545] to-slate-900 text-white rounded-3xl p-7 border border-white/10 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#CFA25E]" /> WHAT SHOULD I DO NEXT?
          </span>
          <span className="text-xs bg-white/10 text-amber-100 px-3 py-1 rounded-full border border-white/10 font-mono">
            Target Due: {activeMilestone?.dueDate || '2026-07-25'}
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">
            {activeMilestone?.title || 'Upload Academic Transcripts & SOP Outline'}
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            {activeMilestone?.notes || 'Your counsellor has requested your academic marksheets and initial SOP outline.'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/dashboard/documents"
            className="px-5 py-2.5 rounded-xl bg-[#CFA25E] text-[#0B2545] font-extrabold text-xs shadow-md hover:bg-amber-400 transition"
          >
            Upload Transcript File
          </Link>
          <Link
            to="/dashboard/messages"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition"
          >
            Ask Your Advisor a Question
          </Link>
        </div>
      </div>

      {/* PSYCHOMETRIC EVALUATION BANNER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#0B2545] shrink-0">
            <Brain className="w-6 h-6 text-[#0B2545]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">5-Part Psychometric Matrix Active</span>
            <h3 className="text-base font-bold text-slate-900">
              Holland Code: <span className="text-[#0B2545] font-mono font-extrabold">{psychometricResults?.riasec?.hollandCode || 'IRC'}</span>
            </h3>
            <p className="text-xs text-slate-500">Evaluated on RIASEC, Big Five, Work Values, VARK Learning Style, and EQ Leadership.</p>
          </div>
        </div>

        <Link
          to="/dashboard/assessments"
          className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md shrink-0 transition"
        >
          View 5 Tests & Results →
        </Link>
      </div>

      {/* 2 COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Active Milestone Card */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#0B2545]" /> Current Journey Milestone
              </h3>
              <Link to="/dashboard/journey" className="text-xs font-bold text-[#0B2545] hover:underline">
                View Full Timeline →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B2545]">
                  Stage {activeMilestone?.stageNumber || 4} of 10 • In Progress
                </span>
                <h4 className="text-lg font-bold text-slate-900">{activeMilestone?.title}</h4>
                <p className="text-xs text-slate-600">{activeMilestone?.notes}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold shrink-0">
                Target: {activeMilestone?.dueDate}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase">Pending Milestone Tasks:</p>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                {(activeMilestone?.tasks || []).map((task, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <input type="checkbox" className="rounded text-[#0B2545]" defaultChecked={i === 0} />
                    <span className={i === 0 ? 'line-through text-slate-400' : ''}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Counsellor Recommendations Snippet */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#CFA25E]" /> Recommended Universities
              </h3>
              <Link to="/dashboard/recommendations" className="text-xs font-bold text-[#0B2545] hover:underline">
                View All ({recommendations.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(recommendations || []).slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B2545]">{rec.category}</span>
                    <h4 className="text-sm font-bold text-slate-900">{rec.name}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{rec.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-xs flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{rec.universityDetails?.country || 'US'}</span>
                    <Link to="/dashboard/recommendations" className="text-[#0B2545] font-bold hover:underline">
                      Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Applications */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0B2545]" /> Active Applications Tracker
              </h3>
              <Link to="/dashboard/applications" className="text-xs font-bold text-[#0B2545] hover:underline">
                View Applications ({applications.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {(applications || []).map((app) => (
                <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{app.universityName}</h4>
                    <p className="text-xs text-slate-500">{app.courseName} • {app.country}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                      {app.status}
                    </span>
                    <span className="text-xs text-rose-600 font-bold">Deadline: {app.applicationDeadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 4 Cols */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Next Appointment Widget */}
          {nextAppt && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0B2545]" /> Upcoming Consultation
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B2545]">{nextAppt.consultationType}</span>
                <p className="text-sm font-extrabold text-slate-900">{nextAppt.date} at {nextAppt.timeSlot}</p>
                <p className="text-xs text-slate-600">{nextAppt.meetingMode}</p>

                <a 
                  href={nextAppt.meetingLink || "https://meet.google.com/xyz-match-ed"}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full py-2.5 text-center rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow flex items-center justify-center gap-2 transition"
                >
                  <Video className="w-3.5 h-3.5 text-[#CFA25E]" />
                  <span>Join Video Meeting</span>
                </a>
              </div>
            </div>
          )}

          {/* Quick Doubt Solving Scholar Add-ons Section */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#0B2545] font-bold text-sm">
              <GraduationCap className="w-4 h-4 text-[#CFA25E]" />
              <span>Top Scholar Doubt Solving</span>
            </div>
            <p className="text-xs text-slate-500">
              Need quick admissions clarity? Book an individual 20-min session with Oxford, Harvard & Stanford students (from ₹999).
            </p>
            <Link
              to="/explore"
              className="block w-full py-2 text-center rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition"
            >
              Explore Scholar Add-ons →
            </Link>
          </div>

          {/* Documents Status */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-[#0B2545]" /> Documents Audit Status
            </h3>

            <div className="space-y-2.5">
              {(documents || []).map(doc => (
                <div key={doc.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{doc.title}</span>
                    <span className="text-[10px] text-slate-400">{doc.category}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Change Counsellor Modal */}
      <ChangeCounsellorModal
        isOpen={changeCounsellorOpen}
        onClose={() => setChangeCounsellorOpen(false)}
      />

      {/* First Call Orientation Guide Modal */}
      <FirstCallGuideModal
        isOpen={firstCallGuideOpen}
        onClose={() => setFirstCallGuideOpen(false)}
      />

    </div>
  );
};
