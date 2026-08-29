import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Bell, MessageSquare, Calendar, FolderOpen,
  Award, Megaphone, CheckCheck, ChevronRight
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatRelativeTime } from '../../lib/formatters';

const TYPE_META = {
  MESSAGE:   { icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
  APPOINTMENT: { icon: Calendar,   color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
  DOCUMENT:  { icon: FolderOpen,   color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-100' },
  ADMISSION: { icon: Award,        color: 'text-rose-500',   bg: 'bg-rose-50 border-rose-100' },
  PLATFORM:  { icon: Megaphone,    color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
};

const NotifItem = ({ notif, onRead }) => {
  const meta = TYPE_META[notif.type] || TYPE_META.PLATFORM;
  const Icon = meta.icon;

  return (
    <Link
      to={notif.link || '#'}
      onClick={() => !notif.read && onRead(notif.id)}
      className={`group flex items-start gap-4 p-4 rounded-2xl border transition hover:shadow-sm ${
        notif.read
          ? 'bg-white border-slate-200 opacity-70 hover:opacity-100'
          : 'bg-indigo-50/40 border-indigo-100 hover:border-indigo-200'
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${meta.bg}`}>
        <Icon className={`w-4.5 h-4.5 ${meta.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-xs font-bold leading-snug ${notif.read ? 'text-slate-600' : 'text-slate-900'}`}>
            {notif.title}
          </p>
          <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0 mt-0.5">
            {formatRelativeTime(notif.createdAt)}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
          {notif.message}
        </p>
      </div>

      {/* Unread dot / arrow */}
      <div className="flex items-center gap-1 shrink-0 mt-1">
        {!notif.read && (
          <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition" />
      </div>
    </Link>
  );
};

export const Notifications = () => {
  const { notifications = [], markNotificationRead, markAllNotificationsRead } = useData();

  const unread = notifications.filter(n => !n.read);
  const todayStr = new Date().toISOString().slice(0, 10);
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

  const todayItems  = notifications.filter(n => n.createdAt?.startsWith(todayStr));
  const weekItems   = notifications.filter(n => !n.createdAt?.startsWith(todayStr) && n.createdAt > weekAgo);
  const olderItems  = notifications.filter(n => n.createdAt <= weekAgo);

  const Section = ({ label, items }) => {
    if (!items.length) return null;
    return (
      <section className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">{label}</h3>
        {items.map(n => (
          <NotifItem key={n.id} notif={n} onRead={markNotificationRead} />
        ))}
      </section>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <PageHeader
        eyebrow="Activity Feed"
        title="Notifications"
        subtitle={unread.length > 0 ? `${unread.length} unread notification${unread.length > 1 ? 's' : ''}` : 'All caught up!'}
        action={
          unread.length > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="btn btn-ghost text-xs"
            >
              <CheckCheck className="w-4 h-4" /> Mark all read
            </button>
          )
        }
      />

      {notifications.length === 0 ? (
        <div className="card p-6">
          <EmptyState
            icon={Bell}
            title="No notifications yet"
            message="We'll notify you when there's activity on your account or messages from your counsellor."
          />
        </div>
      ) : (
        <div className="space-y-6">
          <Section label="Today" items={todayItems} />
          <Section label="This Week" items={weekItems} />
          <Section label="Earlier" items={olderItems} />
        </div>
      )}
    </div>
  );
};
