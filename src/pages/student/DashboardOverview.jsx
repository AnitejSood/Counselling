import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
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
  Award
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
    psychometricResults = {}
  } = useData();

  const studentName = currentUser?.fullName || "Rohan Mehta";
  const nextAppt = (appointments || []).find(a => a.status === 'UPCOMING') || appointments[0];
  const activeMilestone = (milestones || []).find(m => m.status === 'IN_PROGRESS') || milestones[0] || {
    stageNumber: 4,
    title: "Upload Academic Transcripts & SOP Draft 1",
    notes: "Upload your transcripts and initial SOP outline.",
    dueDate: "2026-07-25",
    tasks: ["Upload B.Tech Semester 1-6 Transcripts", "Submit SOP Draft Outline", "Schedule 1-on-1 strategy call"]
  };

  const pendingDocs = (documents || []).filter(d => d.status === 'Under Review' || d.status === 'Changes Required');
  const unreadCount = (messages || []).filter(m => m.senderRole === 'COUNSELLOR' && m.unread).length;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              AspirantHQ Verified Student Portal
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {studentName}! 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Target Goal: <strong className="text-white">{studentProfile?.interestsAndGoals?.preferredCourses?.[0] || 'MS Computer Science'}</strong> ({studentProfile?.interestsAndGoals?.preferredIntake || 'Fall 2027'})
            </p>
          </div>

          {/* Profile Completion Ring Widget */}
          <div className="flex items-center gap-4 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" className="text-slate-700" fill="transparent" />
                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" className="text-indigo-500" fill="transparent" strokeDasharray="150" strokeDashoffset="22" strokeLinecap="round" />
              </svg>
              <span className="absolute text-xs font-extrabold text-white">85%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Profile Strength</p>
              <p className="text-[11px] text-slate-400">Academic & test scores recorded</p>
              <Link to="/dashboard/profile" className="text-[11px] font-bold text-indigo-400 hover:underline">
                Update Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT NEXT ACTION CARD */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-7 border border-indigo-700/50 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> WHAT SHOULD I DO NEXT?
          </span>
          <span className="text-xs bg-indigo-950/80 text-indigo-200 px-3 py-1 rounded-full border border-indigo-700 font-mono">
            Target Due: {activeMilestone?.dueDate || '2026-07-25'}
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">
            {activeMilestone?.title || 'Upload Academic Transcripts & SOP Outline'}
          </h2>
          <p className="text-xs text-indigo-100 leading-relaxed">
            {activeMilestone?.notes || 'Your counsellor has requested your academic marksheets and initial SOP outline.'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            to="/dashboard/documents"
            className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-indigo-50 transition"
          >
            Upload Transcript File
          </Link>
          <Link
            to="/dashboard/messages"
            className="px-5 py-2.5 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white font-semibold text-xs border border-indigo-600 transition"
          >
            Ask Your Advisor a Question
          </Link>
        </div>
      </div>

      {/* PSYCHOMETRIC EVALUATION BANNER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Psychometric Profile Active</span>
            <h3 className="text-base font-bold text-slate-900">
              Holland Code: <span className="text-purple-700 font-mono">{psychometricResults?.riasec?.hollandCode || 'IRC'}</span>
            </h3>
            <p className="text-xs text-slate-500">Evaluated on RIASEC, IPIP Big Five, and Work Values forced-choice matrix.</p>
          </div>
        </div>

        <Link
          to="/dashboard/assessments"
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shrink-0 transition"
        >
          View Full Evaluation →
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
                <Compass className="w-5 h-5 text-indigo-600" /> Current Journey Milestone
              </h3>
              <Link to="/dashboard/journey" className="text-xs font-bold text-indigo-600 hover:underline">
                View Full Timeline →
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
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
                    <input type="checkbox" className="rounded text-indigo-600" defaultChecked={i === 0} />
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
                <Sparkles className="w-5 h-5 text-indigo-600" /> Recommended Universities
              </h3>
              <Link to="/dashboard/recommendations" className="text-xs font-bold text-indigo-600 hover:underline">
                View All ({recommendations.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(recommendations || []).slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{rec.category}</span>
                    <h4 className="text-sm font-bold text-slate-900">{rec.name}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{rec.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-xs flex justify-between items-center">
                    <span className="text-slate-500 font-medium">{rec.universityDetails?.country || 'US'}</span>
                    <Link to="/dashboard/recommendations" className="text-indigo-600 font-bold hover:underline">
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
                <FileCheck className="w-5 h-5 text-indigo-600" /> Active Applications Tracker
              </h3>
              <Link to="/dashboard/applications" className="text-xs font-bold text-indigo-600 hover:underline">
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
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
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
                <Calendar className="w-4 h-4 text-indigo-600" /> Upcoming Consultation
              </h3>

              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">{nextAppt.consultationType}</span>
                <p className="text-sm font-extrabold text-slate-900">{nextAppt.date} at {nextAppt.timeSlot}</p>
                <p className="text-xs text-slate-600">{nextAppt.meetingMode}</p>

                <a 
                  href={nextAppt.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block w-full py-2 text-center rounded-xl bg-indigo-600 text-white font-bold text-xs shadow"
                >
                  Join Meeting Room
                </a>
              </div>
            </div>
          )}

          {/* Documents Status */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-indigo-600" /> Documents Audit Status
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

    </div>
  );
};
