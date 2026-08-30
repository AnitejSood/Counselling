import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Users,
  Calendar,
  Clock,
  Lock,
  Compass,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  TrendingUp,
  Brain,
  Video,
  Layers,
  Sparkles,
  Check,
  UserCheck,
  Award,
  BookOpen
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { formatINR, formatDate } from '../../lib/formatters';

export const CounsellorOverview = () => {
  const navigate = useNavigate();
  const {
    counsellorProfile,
    pipelineStudents,
    activeStudentId,
    switchActiveStudent,
    appointments,
    escrowBookings,
    approveBookingSession
  } = useData();

  const [notice, setNotice] = useState('');
  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  // Generic Aggregate Metrics calculation
  const pendingApprovals = appointments.filter(a => a.status === 'PENDING_APPROVAL');
  const upcomingConfirmed = appointments.filter(a => a.status === 'UPCOMING');
  const completedSessions = appointments.filter(a => a.status === 'COMPLETED').length + 8; // aggregate completed
  const pendingEscrowRequests = escrowBookings.filter(b => b.escrowStatus === 'RELEASE_REQUESTED');
  const totalEarned = escrowBookings
    .filter(b => b.escrowStatus === 'RELEASED_TO_COUNSELLOR')
    .reduce((sum, b) => sum + (b.counsellorPayout || b.amount * 0.9), 0);

  // Map session counters for each student in pipeline
  const getStudentSessionStats = (studentName) => {
    const bk = escrowBookings.find(b => b.studentName?.toLowerCase() === studentName?.toLowerCase());
    if (bk) {
      return {
        completed: bk.completedSessionsCount || 0,
        total: bk.maxSessions || 5,
        serviceTitle: bk.serviceTitle
      };
    }
    // Default mock data mappings for students
    if (studentName?.includes('Rohan')) return { completed: 3, total: 5, serviceTitle: "Comprehensive Admissions Package" };
    if (studentName?.includes('Simran')) return { completed: 1, total: 3, serviceTitle: "SOP & Essay Mentorship" };
    if (studentName?.includes('Ananya')) return { completed: 4, total: 4, serviceTitle: "1-on-1 Hourly Strategy & Audit" };
    if (studentName?.includes('Aarav')) return { completed: 0, total: 2, serviceTitle: "German APS & Shortlist Audit" };
    return { completed: 1, total: 5, serviceTitle: "Admissions Guidance Package" };
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      
      {/* Page Header */}
      <PageHeader
        eyebrow="Counsellor Executive Workspace"
        title="Performance & Operations Overview"
        subtitle="Aggregate metrics across all assigned students, session delivery stats, pending booking approvals, and escrow payout status."
        action={
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/counsellor/bookings')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Session Bookings ({appointments.length})
            </button>
            <button
              onClick={() => navigate('/counsellor/pipeline')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-400" /> Pipeline ({pipelineStudents.length})
            </button>
          </div>
        }
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* GENERIC AGGREGATE STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Sessions Conducted */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-600">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Sessions Conducted</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{completedSessions}</p>
          <p className="text-[11px] text-emerald-700 font-medium">Completed 1-on-1 consultations</p>
        </div>

        {/* Metric 2: Pending Session Requests */}
        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Pending Booking Requests</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-950">{pendingApprovals.length}</p>
          <p className="text-[11px] text-amber-800 font-medium">Awaiting counsellor approval</p>
        </div>

        {/* Metric 3: Total Active Students */}
        <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-indigo-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Active Pipeline Students</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-black text-indigo-950">{pipelineStudents.length}</p>
          <p className="text-[11px] text-indigo-800 font-medium">Under active mentorship</p>
        </div>

        {/* Metric 4: Total Escrow Disbursed */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Escrow Payout Disbursed</span>
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white">{formatINR(totalEarned)}</p>
          <p className="text-[11px] text-slate-400 font-medium">{pendingEscrowRequests.length} payout request pending admin</p>
        </div>
      </div>

      {/* ASSIGNED STUDENTS ROSTER & INDIVIDUAL SESSION COUNTERS */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Assigned Students Directory & Session Counters ({pipelineStudents.length})
            </h2>
            <p className="text-xs text-slate-500">Track delivered vs total package sessions for each assigned student.</p>
          </div>

          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Active Context: {pipelineStudents.find(s => (s.studentId || s.id) === activeStudentId)?.fullName || 'Rohan Mehta'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pipelineStudents.map(std => {
            const isCurrentActive = (std.studentId || std.id) === activeStudentId;
            const stats = getStudentSessionStats(std.fullName || std.name);
            const percent = Math.min(100, Math.round((stats.completed / stats.total) * 100));

            return (
              <div
                key={std.studentId || std.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isCurrentActive
                    ? 'bg-gradient-to-br from-slate-900 to-indigo-950 text-white border-indigo-600 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={std.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                      alt={std.fullName || std.name}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-400 shrink-0"
                    />
                    <div>
                      <h3 className={`text-sm font-bold ${isCurrentActive ? 'text-white' : 'text-slate-900'}`}>
                        {std.fullName || std.name}
                      </h3>
                      <p className={`text-[11px] ${isCurrentActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {std.targetGoal || 'MS Computer Science'} · {std.targetIntake || 'Fall 2027'}
                      </p>
                    </div>
                  </div>

                  {isCurrentActive ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-slate-950">
                      Active Context
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        switchActiveStudent(std.studentId || std.id);
                        showMsg(`Active student switched to ${std.fullName || std.name}`);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white text-indigo-700 border border-slate-200 shadow-xs hover:bg-indigo-50 transition cursor-pointer"
                    >
                      Set Active
                    </button>
                  )}
                </div>

                {/* Session Counter Bar */}
                <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                  isCurrentActive ? 'bg-slate-900/80 border-indigo-800/80' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className={`font-semibold ${isCurrentActive ? 'text-indigo-200' : 'text-slate-600'}`}>
                      {stats.serviceTitle}:
                    </span>
                    <span className={`font-extrabold ${isCurrentActive ? 'text-emerald-400' : 'text-indigo-700'}`}>
                      {stats.completed} / {stats.total} Sessions Delivered ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isCurrentActive ? 'bg-emerald-400' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Footer links */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className={`text-[11px] ${isCurrentActive ? 'text-indigo-300' : 'text-slate-500'}`}>
                    Stage: <strong>{std.currentStage || 'Profile Review'}</strong>
                  </span>
                  <button
                    onClick={() => {
                      switchActiveStudent(std.studentId || std.id);
                      navigate('/counsellor/roadmap');
                    }}
                    className={`font-bold hover:underline text-[11px] cursor-pointer ${
                      isCurrentActive ? 'text-emerald-400' : 'text-indigo-600'
                    }`}
                  >
                    Open Roadmap →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TWO COLUMN OPERATIONAL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Pending Session Requests & Upcoming Confirmed Sessions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pending Approval Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Pending Session Booking Requests ({pendingApprovals.length})
              </h3>
              <Link to="/counsellor/bookings" className="text-xs font-bold text-indigo-600 hover:underline">
                View all bookings →
              </Link>
            </div>

            {pendingApprovals.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No pending session requests at the moment.</p>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map(apt => (
                  <div key={apt.id} className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                        {apt.consultationType}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{apt.studentName}</h4>
                      <p className="text-xs text-slate-600">Requested: {formatDate(apt.date)} at {apt.timeSlot}</p>
                      {apt.studentNotes && <p className="text-[11px] text-slate-500 italic mt-1 font-medium">"{apt.studentNotes}"</p>}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          approveBookingSession(apt.id, `https://meet.google.com/aspiranthq-${Date.now().toString().slice(-4)}`, 'Approved from Overview');
                          showMsg(`Approved session for ${apt.studentName}!`);
                        }}
                        className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-emerald-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => navigate('/counsellor/bookings')}
                        className="px-3.5 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-900 transition"
                      >
                        Propose Times
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upcoming Confirmed Sessions Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Confirmed Upcoming Sessions Across All Students ({upcomingConfirmed.length})
              </h3>
            </div>

            {upcomingConfirmed.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No upcoming confirmed sessions.</p>
            ) : (
              <div className="space-y-3">
                {upcomingConfirmed.map(apt => (
                  <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-sm">{apt.studentName}</span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">{apt.consultationType}</span>
                      </div>
                      <p className="text-xs text-slate-500">{formatDate(apt.date)} at {apt.timeSlot} · {apt.durationMinutes || 45} mins</p>
                    </div>
                    {apt.meetingLink ? (
                      <a href={apt.meetingLink} target="_blank" rel="noreferrer" className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 transition">
                        <Video className="w-3.5 h-3.5" /> Join Call
                      </a>
                    ) : (
                      <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">Link Pending</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Action Shortcuts & Verification Badge */}
        <div className="space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">Counsellor Quick Actions</h3>
            
            <button
              onClick={() => navigate('/counsellor/bookings')}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-indigo-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Schedule New Session</span>
              <Plus className="w-4 h-4 text-indigo-600" />
            </button>

            <button
              onClick={() => navigate('/counsellor/bookings')}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Manage Availability Slots</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              onClick={() => navigate('/counsellor/roadmap')}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-purple-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Assign Psychometric Tests</span>
              <Brain className="w-4 h-4 text-purple-600" />
            </button>

            <button
              onClick={() => navigate('/counsellor/proof')}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-sky-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Upload Student Admission Proof</span>
              <ShieldCheck className="w-4 h-4 text-sky-600" />
            </button>

            <button
              onClick={() => navigate('/counsellor/bookings')}
              className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-amber-700 transition flex items-center justify-between cursor-pointer"
            >
              <span>Request Escrow Payout Release</span>
              <Lock className="w-4 h-4 text-amber-600" />
            </button>
          </div>

          {/* Verification Badge & Compliance Status */}
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-xs font-bold text-emerald-950">Verification Status: Verified Strategist</h4>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Your degrees, experience certificates, and verified student offer letters are approved by AspirantHQ Compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
