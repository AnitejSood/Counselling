import React, { useState } from 'react';
import {
  MessageSquare, Plus, CheckCircle2, Clock, AlertCircle,
  ChevronDown, ChevronUp, Send, Tag, User, Briefcase, Search
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
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
      { sender: 'AspirantHQ Support', role: 'ADMIN', text: 'Thank you for reaching out. We are reviewing your escrow booking ID BK-2340. Our finance team will process this within 24 hours.', time: '2026-08-03T16:00:00Z' }
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
      { sender: 'AspirantHQ Support', role: 'ADMIN', text: 'Apologies for the delay! Your application has been approved and your profile is now live on the marketplace.', time: '2026-07-31T10:00:00Z' }
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
  OPEN: { label: 'Open', class: 'badge-amber', icon: Clock },
  IN_PROGRESS: { label: 'In Progress', class: 'badge-indigo', icon: AlertCircle },
  RESOLVED: { label: 'Resolved', class: 'badge-emerald', icon: CheckCircle2 },
};

const PRIORITY_META = {
  HIGH: 'badge-rose',
  MEDIUM: 'badge-amber',
  LOW: 'badge-slate'
};

const getInitials = (name) => name?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

export const MessagesAdmin = () => {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const updateStatus = (ticketId, status) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const sendReply = (ticketId) => {
    if (!reply.trim()) return;
    setTickets(prev => prev.map(t => t.id === ticketId ? {
      ...t,
      status: t.status === 'OPEN' ? 'IN_PROGRESS' : t.status,
      messages: [...t.messages, {
        sender: 'AspirantHQ Support',
        role: 'ADMIN',
        text: reply,
        time: new Date().toISOString()
      }]
    } : t));
    setReply('');
  };

  const filtered = tickets
    .filter(t => filter === 'ALL' || t.status === filter)
    .filter(t => !search || t.subject.toLowerCase().includes(search.toLowerCase()) || t.from.toLowerCase().includes(search.toLowerCase()));

  const open = tickets.filter(t => t.status === 'OPEN').length;
  const inProgress = tickets.filter(t => t.status === 'IN_PROGRESS').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="Community Support"
        title="Support Ticket Centre"
        subtitle="Manage support requests from students and counsellors. All tickets are tracked and responded to here."
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Open Tickets', value: open, color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'In Progress', value: inProgress, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
          { label: 'Total Tickets', value: tickets.length, color: 'bg-slate-50 border-slate-200 text-slate-700' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border text-center ${s.color}`}>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider mt-0.5 opacity-70">{s.label}</p>
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
                className="input pl-9"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-xl text-[10px] font-bold transition ${filter === f ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-purple-300'}`}>
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="card p-4">
                <EmptyState icon={MessageSquare} title="No tickets" message="No tickets match your filter." />
              </div>
            )}
            {filtered.map(ticket => {
              const statusM = STATUS_META[ticket.status];
              const isSelected = selected?.id === ticket.id;
              return (
                <button
                  key={ticket.id}
                  onClick={() => setSelected(ticket)}
                  className={`w-full text-left p-4 rounded-2xl border transition ${isSelected ? 'border-purple-400 bg-purple-50' : 'bg-white border-slate-200 hover:border-purple-200 hover:shadow-sm'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{ticket.subject}</span>
                    <span className={`badge ${statusM.class} shrink-0`}>{statusM.label}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${ticket.fromRole === 'COUNSELLOR' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {getInitials(ticket.from)}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{ticket.from}</span>
                    <span className={`badge ${PRIORITY_META[ticket.priority]} text-[9px]`}>{ticket.priority}</span>
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
            <div className="card h-full flex items-center justify-center p-12">
              <EmptyState icon={MessageSquare} title="Select a ticket" message="Click any ticket on the left to view the conversation thread." />
            </div>
          ) : (
            <div className="card overflow-hidden flex flex-col" style={{ maxHeight: '70vh' }}>
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 mb-0.5">{selected.id} · {selected.category}</p>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{selected.subject}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${selected.fromRole === 'COUNSELLOR' ? 'badge-emerald' : 'badge-indigo'}`}>
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
                        isAdmin ? 'bg-purple-600 text-white' :
                        msg.role === 'COUNSELLOR' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'
                      }`}>
                        {getInitials(msg.sender)}
                      </div>
                      <div className={`flex flex-col max-w-xs ${isAdmin ? 'items-end' : ''}`}>
                        <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                          isAdmin ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'
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
                  placeholder="Type your reply as AspirantHQ Support..."
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendReply(selected.id)}
                  className="flex-1 input"
                />
                <button
                  onClick={() => sendReply(selected.id)}
                  disabled={!reply.trim()}
                  className="btn btn-primary disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
