import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  MessageSquare, Plus, CheckCircle2, Clock, AlertCircle,
  ChevronDown, ChevronUp, Send, Tag, User, Briefcase, Search,
  Radio, Bell, Users, Globe, Sparkles, Check
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { formatRelativeTime } from '../../lib/formatters';

const MOCK_TICKETS = [
  {
    id: 'TKT-001',
    subject: 'Unable to access my student dashboard after login',
    category: 'Technical Issue',
    from: 'Rohan Mehta',
    fromRole: 'STUDENT',
    email: 'rohan.mehta@example.com',
    status: 'OPEN',
    priority: 'HIGH',
    createdAt: '2026-08-04T11:00:00Z',
    messages: [
      { sender: 'Rohan Mehta', role: 'STUDENT', text: 'Hi, after logging in I keep getting redirected to the home page instead of my dashboard. This has been happening since yesterday morning.', time: '2026-08-04T11:00:00Z' }
    ]
  },
  {
    id: 'TKT-002',
    subject: 'Escrow payout not received after session completion',
    category: 'Payment & Escrow',
    from: 'Arti Sood',
    fromRole: 'COUNSELLOR',
    email: 'arti.sood@careerguide.com',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    createdAt: '2026-08-03T14:30:00Z',
    messages: [
      { sender: 'Arti Sood', role: 'COUNSELLOR', text: 'The session with Rohan Mehta was completed on Aug 1st and the escrow is still showing as "Held". Please release the payment of ₹8,500.', time: '2026-08-03T14:30:00Z' },
      { sender: 'matchEd Support', role: 'ADMIN', text: 'Thank you for reaching out. We are reviewing your escrow booking ID BK-2340. Our finance team will process this within 24 hours.', time: '2026-08-03T16:00:00Z' }
    ]
  },
  {
    id: 'TKT-003',
    subject: 'Profile verification taking too long',
    category: 'Verification',
    from: 'Dr. Priya Sharma',
    fromRole: 'COUNSELLOR',
    email: 'priya.sharma@edupath.com',
    status: 'RESOLVED',
    priority: 'MEDIUM',
    createdAt: '2026-07-30T09:00:00Z',
    messages: [
      { sender: 'Dr. Priya Sharma', role: 'COUNSELLOR', text: 'I submitted my application 5 days ago. Still no update on verification status.', time: '2026-07-30T09:00:00Z' },
      { sender: 'matchEd Support', role: 'ADMIN', text: 'Apologies for the delay! Your application has been approved and your profile is now live on the marketplace.', time: '2026-07-31T10:00:00Z' }
    ]
  },
  {
    id: 'TKT-004',
    subject: 'How do I cancel and reschedule an appointment?',
    category: 'General Inquiry',
    from: 'Priya Desai',
    fromRole: 'STUDENT',
    email: 'priya.desai@gmail.com',
    status: 'OPEN',
    priority: 'LOW',
    createdAt: '2026-08-05T08:00:00Z',
    messages: [
      { sender: 'Priya Desai', role: 'STUDENT', text: 'I need to reschedule my session booked for Aug 8. How do I do this? Will I lose my payment?', time: '2026-08-05T08:00:00Z' }
    ]
  }
];

const STATUS_META = {
  OPEN: { label: 'Open', class: 'bg-amber-100 text-amber-800 border-amber-300', icon: Clock },
  IN_PROGRESS: { label: 'In Progress', class: 'bg-sky-100 text-sky-800 border-sky-300', icon: AlertCircle },
  RESOLVED: { label: 'Resolved', class: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: CheckCircle2 },
};

const PRIORITY_META = {
  HIGH: 'bg-rose-100 text-rose-800',
  MEDIUM: 'bg-amber-100 text-amber-800',
  LOW: 'bg-slate-100 text-slate-700'
};

const getInitials = (name) => name?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

export const MessagesAdmin = () => {
  const { broadcastNotification, notifications } = useData();

  const [activeTab, setActiveTab] = useState('TICKETS'); // 'TICKETS' | 'BROADCAST'
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  // Broadcast state
  const [broadcastForm, setBroadcastForm] = useState({
    targetRole: 'ALL_STUDENTS',
    title: '',
    message: '',
    type: 'ANNOUNCEMENT'
  });
  const [broadcastNotice, setBroadcastNotice] = useState('');

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: '',
    variant: 'primary',
    onConfirm: () => {}
  });

  const updateStatus = (ticketId, status) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const sendReply = (ticketId) => {
    if (!reply.trim()) return;
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t,
      status: t.status === 'OPEN' ? 'IN_PROGRESS' : t.status,
      messages: [...t.messages, {
        sender: 'matchEd Support',
        role: 'ADMIN',
        text: reply,
        time: new Date().toISOString()
      }]
    } : t));
    setReply('');
  };

  const handleBroadcastPrompt = (e) => {
    e.preventDefault();
    if (!broadcastForm.title.trim() || !broadcastForm.message.trim()) return;

    const audienceLabel =
      broadcastForm.targetRole === 'ALL_STUDENTS' ? 'All Registered Students' :
      broadcastForm.targetRole === 'ALL_COUNSELLORS' ? 'All Verified Counsellors' : 'All matchEd Users (Students & Mentors)';

    setConfirmModal({
      isOpen: true,
      title: `Dispatch Broadcast Announcement?`,
      message: `You are about to dispatch "${broadcastForm.title}" to ${audienceLabel}. This will appear immediately in their portal notifications.`,
      confirmLabel: 'Dispatch Announcement',
      variant: 'primary',
      onConfirm: () => {
        broadcastNotification({
          targetRole: broadcastForm.targetRole,
          title: broadcastForm.title.trim(),
          message: broadcastForm.message.trim(),
          type: broadcastForm.type
        });
        setBroadcastNotice(`Broadcast "${broadcastForm.title}" dispatched successfully to ${audienceLabel}!`);
        setTimeout(() => setBroadcastNotice(''), 4000);
        setBroadcastForm({
          targetRole: 'ALL_STUDENTS',
          title: '',
          message: '',
          type: 'ANNOUNCEMENT'
        });
      }
    });
  };

  const filtered = tickets
    .filter(t => filter === 'ALL' || t.status === filter)
    .filter(t => !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.from.toLowerCase().includes(search.toLowerCase()));

  const open = tickets.filter(t => t.status === 'OPEN').length;
  const inProgress = tickets.filter(t => t.status === 'IN_PROGRESS').length;

  return (
    <div className="w-full space-y-6 font-sans animate-fade-in">
      <PageHeader
        eyebrow="matchEd Operations & Comms"
        title="Support & Broadcast Communications"
        subtitle="Manage student and counsellor support tickets, or dispatch platform-wide announcements to all students and mentors."
      />

      {/* Main Top Tab Switcher */}
      <div className="flex items-center gap-2 bg-slate-200/70 p-1.5 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('TICKETS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'TICKETS'
              ? 'bg-[#0B2545] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#CFA25E]" />
          <span>Support Tickets ({tickets.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('BROADCAST')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === 'BROADCAST'
              ? 'bg-[#0B2545] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Radio className="w-4 h-4 text-[#CFA25E]" />
          <span>Broadcast Dispatcher</span>
        </button>
      </div>

      {activeTab === 'BROADCAST' ? (
        /* BROADCAST NOTIFICATIONS DISPATCHER */
        <div className="space-y-6">
          {broadcastNotice && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{broadcastNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-5 h-5 text-[#0B2545]" />
                  <h3 className="text-base font-extrabold text-[#0B2545]">Dispatch Live Broadcast Announcement</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Broadcasts appear on the user's notification bell and top banner across their portal session.
                </p>
              </div>

              <form onSubmit={handleBroadcastPrompt} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Target Audience</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ALL_STUDENTS', label: 'All Students', icon: Users },
                      { id: 'ALL_COUNSELLORS', label: 'All Counsellors', icon: Briefcase },
                      { id: 'ALL', label: 'Entire Platform', icon: Globe },
                    ].map(aud => {
                      const Icon = aud.icon;
                      const isSelected = broadcastForm.targetRole === aud.id;
                      return (
                        <button
                          type="button"
                          key={aud.id}
                          onClick={() => setBroadcastForm(f => ({ ...f, targetRole: aud.id }))}
                          className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                            isSelected
                              ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-xs'
                              : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#CFA25E]' : 'text-slate-400'}`} />
                          <span>{aud.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Announcement Title / Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fall 2027 Harvard & Ivy League Regular Decision Deadlines Announced"
                    value={broadcastForm.title}
                    onChange={e => setBroadcastForm(f => ({ ...f, title: e.target.value }))}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Notification Body & Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Draft the complete announcement details, instructions, or links..."
                    value={broadcastForm.message}
                    onChange={e => setBroadcastForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 font-medium leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Notification type: System Announcement</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition"
                  >
                    <Send className="w-4 h-4 text-[#CFA25E]" />
                    <span>Send Announcement</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Notifications Feed */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Live Dispatched Feed</h4>
                <Bell className="w-4 h-4 text-slate-400" />
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {(notifications || []).slice(0, 8).map(n => (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0B2545]/10 text-[#0B2545]">
                        {n.targetRole || 'ALL'}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.timestamp || 'Recent'}</span>
                    </div>
                    <p className="text-xs font-extrabold text-[#0B2545]">{n.title}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SUPPORT TICKETS */
        <>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Open Tickets', value: open, color: 'bg-amber-50 border-amber-200 text-amber-800' },
              { label: 'In Progress', value: inProgress, color: 'bg-sky-50 border-sky-200 text-sky-800' },
              { label: 'Total Tickets', value: tickets.length, color: 'bg-slate-50 border-slate-200 text-slate-800' },
            ].map(s => (
              <div key={s.label} className={`p-4 rounded-2xl border text-center ${s.color}`}>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider mt-0.5 opacity-75">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* Ticket List */}
            <div className="lg:col-span-2 space-y-3">
              {/* Search + Filter */}
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-xl text-[10px] font-bold transition cursor-pointer ${filter === f ? 'bg-[#0B2545] text-[#CFA25E]' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                      {f.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="space-y-2">
                {filtered.length === 0 && (
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                    No tickets match your filter.
                  </div>
                )}
                {filtered.map(ticket => {
                  const statusM = STATUS_META[ticket.status] || STATUS_META.OPEN;
                  const isSelected = selected?.id === ticket.id;
                  return (
                    <button
                      key={ticket.id}
                      onClick={() => setSelected(ticket)}
                      className={`w-full text-left p-4 rounded-2xl border transition cursor-pointer ${isSelected ? 'border-[#0B2545] bg-amber-50/40 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{ticket.subject}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 border ${statusM.class}`}>{statusM.label}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${ticket.fromRole === 'COUNSELLOR' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {getInitials(ticket.from)}
                        </div>
                        <span className="text-[11px] text-slate-600 font-medium">{ticket.from}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${PRIORITY_META[ticket.priority]}`}>{ticket.priority}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{ticket.id} · {formatRelativeTime(ticket.createdAt)}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thread View */}
            <div className="lg:col-span-3">
              {!selected ? (
                <div className="bg-white rounded-3xl border border-slate-200 h-full flex flex-col items-center justify-center p-12 text-center text-slate-400 space-y-2 min-h-[300px]">
                  <MessageSquare className="w-8 h-8 text-slate-300" />
                  <p className="text-xs font-bold">Select a ticket from the left to view the thread.</p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col shadow-xs" style={{ maxHeight: '70vh' }}>
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 mb-0.5">{selected.id} · {selected.category}</p>
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">{selected.subject}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${selected.fromRole === 'COUNSELLOR' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-100 text-indigo-800'}`}>
                            {selected.fromRole === 'COUNSELLOR' ? <Briefcase className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            {selected.from}
                          </span>
                          <span className="text-[10px] text-slate-400">{selected.email}</span>
                        </div>
                      </div>
                      <select
                        value={selected.status}
                        onChange={e => { updateStatus(selected.id, e.target.value); setSelected(t => ({ ...t, status: e.target.value })); }}
                        className="text-[11px] font-bold border border-slate-200 bg-white rounded-xl px-3 py-1.5 focus:outline-none shrink-0"
                      >
                        <option value="OPEN">Open</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
                    {selected.messages.map((msg, i) => {
                      const isAdmin = msg.role === 'ADMIN';
                      return (
                        <div key={i} className={`flex gap-3 ${isAdmin ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold shrink-0 ${
                            isAdmin ? 'bg-[#0B2545] text-[#CFA25E]' :
                            msg.role === 'COUNSELLOR' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
                          }`}>
                            {getInitials(msg.sender)}
                          </div>
                          <div className={`flex flex-col max-w-xs ${isAdmin ? 'items-end' : ''}`}>
                            <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                              isAdmin ? 'bg-[#0B2545] text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'
                            }`}>
                              {msg.text}
                            </div>
                            <span className="text-[10px] text-slate-400 mt-1">{formatRelativeTime(msg.time)} · {msg.sender}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply */}
                  <div className="border-t border-slate-100 p-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your reply as matchEd Support..."
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendReply(selected.id)}
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                    />
                    <button
                      onClick={() => sendReply(selected.id)}
                      disabled={!reply.trim()}
                      className="px-4 py-2 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5 text-[#CFA25E]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmLabel={confirmModal.confirmLabel}
        variant={confirmModal.variant}
      />
    </div>
  );
};

