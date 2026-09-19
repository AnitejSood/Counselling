import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, Paperclip, FileText, CheckCheck, X, Hash, Sparkles } from 'lucide-react';
import { getInitials } from '../../lib/formatters';
import { EmptyState } from '../../components/ui/EmptyState';

const MILESTONE_CHANNELS = [
  'All Messages',
  'Stage 1: Profile & Diagnostic',
  'Stage 4: SOP & Essays',
  'Stage 6: University Applications',
  'Stage 8: Visa & Pre-Departure',
  'General Discussion'
];

export const Messaging = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialChannelParam = searchParams.get('channel');

  const { currentUser } = useAuth();
  const { messages, sendMessage, counsellors, counsellorSwitchState } = useData();
  const [activeChannel, setActiveChannel] = useState(() => {
    if (initialChannelParam) {
      const match = MILESTONE_CHANNELS.find(c => c.toLowerCase().includes(initialChannelParam.toLowerCase()));
      return match || initialChannelParam;
    }
    return 'All Messages';
  });

  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);

  // Dynamically resolve assigned counsellor
  const assignedCounsellor = useMemo(() => {
    return counsellors?.find(c => c.id === counsellorSwitchState?.assignedCounsellorId) || counsellors?.[0] || {
      fullName: 'Arti Sood',
      title: 'Senior Education Strategist',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    };
  }, [counsellors, counsellorSwitchState]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;

    const channelPrefix = activeChannel !== 'All Messages' ? `[${activeChannel}] ` : '';
    sendMessage(
      'STUDENT',
      currentUser?.fullName || 'Rohan Mehta',
      `${channelPrefix}${inputText.trim()}`,
      attachedFile ? attachedFile.name : null
    );
    setInputText('');
    setAttachedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const filteredMessages = useMemo(() => {
    if (activeChannel === 'All Messages') return messages;
    return messages.filter(m => {
      const content = m.content || m.text || '';
      return content.toLowerCase().includes(activeChannel.toLowerCase().slice(0, 7)) ||
             content.toLowerCase().includes(activeChannel.toLowerCase());
    });
  }, [messages, activeChannel]);

  const unreadCount = messages.filter(m => m.senderRole === 'COUNSELLOR' && m.unread).length;

  return (
    <div className="w-full flex flex-col h-[calc(100vh-8rem)] gap-0 font-sans">

      {/* Chat Header with Dynamic Counsellor Details */}
      <div className="bg-white rounded-t-3xl border border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={assignedCounsellor.photoUrl}
              alt={assignedCounsellor.fullName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#CFA25E] shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">{assignedCounsellor.fullName}</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Assigned Mentor
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{assignedCounsellor.title || 'Career & Education Strategist'}</p>
          </div>
          {unreadCount > 0 && (
            <span className="ml-2 bg-[#0B2545] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Current Channel: <strong className="text-[#0B2545]">{activeChannel}</strong>
        </div>
      </div>

      {/* Milestone Scoped Channel Switcher (Spec Step 6) */}
      <div className="bg-slate-100 border-x border-slate-200 px-5 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
        <span className="text-[10px] uppercase tracking-wider text-slate-500 shrink-0 flex items-center gap-1">
          <Hash className="w-3 h-3 text-[#CFA25E]" /> Threads:
        </span>
        {MILESTONE_CHANNELS.map(ch => (
          <button
            key={ch}
            onClick={() => setActiveChannel(ch)}
            className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition cursor-pointer ${
              activeChannel === ch
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {ch}
          </button>
        ))}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 border-x border-slate-200 px-5 py-5 space-y-4 min-h-0">
        {filteredMessages.length === 0 && (
          <EmptyState
            title={`No messages in ${activeChannel}`}
            message={`Start discussing ${activeChannel} with ${assignedCounsellor.fullName}.`}
          />
        )}

        {filteredMessages.map((msg) => {
          const isMe = msg.senderRole === 'STUDENT';
          const msgText = msg.content || msg.text || '';

          return (
            <div key={msg.id} className={`flex gap-3 animate-in fade-in ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!isMe && (
                <img
                  src={assignedCounsellor.photoUrl}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-sm border border-[#CFA25E]"
                />
              )}
              {isMe && (
                <div className="w-8 h-8 rounded-full bg-[#0B2545] text-[#CFA25E] flex items-center justify-center text-[10px] font-bold shrink-0 mt-1 shadow-sm border border-[#CFA25E]/40">
                  {getInitials(msg.senderName)}
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-sm group ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium shadow-sm space-y-1.5 ${
                  isMe
                    ? 'bg-[#0B2545] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  {msgText && <p>{msgText}</p>}
                  {msg.fileAttachment && (
                    <div className={`p-2 rounded-xl border flex items-center gap-2 text-[11px] ${
                      isMe ? 'bg-white/10 border-white/20 text-amber-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}>
                      <FileText className="w-4 h-4 shrink-0 text-[#CFA25E]" />
                      <span className="font-semibold truncate">{msg.fileAttachment}</span>
                    </div>
                  )}
                </div>
                <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <CheckCheck className="w-3 h-3 text-[#CFA25E]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Attachment Preview Banner */}
      {attachedFile && (
        <div className="bg-amber-50 px-6 py-2 border-x border-t border-amber-200 flex items-center justify-between text-xs text-amber-950 font-medium">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Attachment: <strong>{attachedFile.name}</strong></span>
          </div>
          <button onClick={() => setAttachedFile(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="bg-white rounded-b-3xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-[#0B2545] transition cursor-pointer"
          title="Attach Draft Document"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={`Message ${assignedCounsellor.fullName} on #${activeChannel}...`}
          className="flex-1 py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#0B2545] font-medium"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !attachedFile}
          className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 disabled:opacity-40 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 text-[#CFA25E]" />
        </button>
      </form>

    </div>
  );
};
