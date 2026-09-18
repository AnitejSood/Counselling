import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Bell, CheckCheck, ExternalLink, Sparkles, Calendar, FileText, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const NotificationBellPopup = ({ theme = 'light' }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userRole = currentUser?.role || 'STUDENT';

  // Filter notifications relevant to current user's role or targeted specifically to them
  const relevantNotifs = (notifications || []).filter(n => {
    if (!n.recipientRole || n.recipientRole === 'ALL') return true;
    return n.recipientRole === userRole;
  });

  const unreadNotifs = relevantNotifs.filter(n => !n.read);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    setIsOpen(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'APPOINTMENT':
        return <Calendar className="w-4 h-4 text-indigo-500" />;
      case 'ASSESSMENT':
        return <Sparkles className="w-4 h-4 text-purple-500" />;
      case 'DOCUMENT':
        return <FileText className="w-4 h-4 text-sky-500" />;
      case 'ESCROW':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-amber-500" />;
    }
  };

  const buttonThemeClasses = theme === 'dark'
    ? 'text-slate-200 hover:text-white hover:bg-slate-800'
    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-xl relative transition-all duration-200 cursor-pointer ${buttonThemeClasses}`}
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotifs.length > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-white font-extrabold text-[9px] shadow-sm animate-pulse">
            {unreadNotifs.length > 9 ? '9+' : unreadNotifs.length}
          </span>
        )}
      </button>

      {/* Pop-up Dropdown Window */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in zoom-in-95 duration-150 font-sans">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-xs">Notifications</span>
              {unreadNotifs.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0B2545] text-white">
                  {unreadNotifs.length} new
                </span>
              )}
            </div>

            {unreadNotifs.length > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-[#0B2545] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {(!relevantNotifs || relevantNotifs.length === 0) ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No notifications for your account.
              </div>
            ) : (
              relevantNotifs.slice(0, 8).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-slate-50 ${
                    !notif.read ? 'bg-[#F0F4F8]/80' : 'bg-white'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs shrink-0 mt-0.5">
                    {getNotifIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className={`text-xs truncate ${!notif.read ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'}`}>
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#CFA25E] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[10px] text-slate-400 font-medium">matchEd Real-time Notification Engine</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationBellPopup;
