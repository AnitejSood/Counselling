import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, Phone, Video, MoreHorizontal, Check, CheckCheck } from 'lucide-react';
import { getInitials } from '../../lib/formatters';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';

const COUNSELLOR_INFO = {
  name: 'Arti Sood',
  title: 'Career Consultant & Education Strategist',
  photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  isOnline: true
};

export const Messaging = () => {
  const { currentUser } = useAuth();
  const { messages, sendMessage } = useData();
  const [inputText, setInputText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage('STUDENT', currentUser?.fullName || 'Rohan Mehta', inputText.trim());
    setInputText('');
  };

  const unreadCount = messages.filter(m => m.senderRole === 'COUNSELLOR' && m.unread).length;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] gap-0 animate-fade-in">

      {/* Chat Header */}
      <div className="bg-white rounded-t-3xl border border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={COUNSELLOR_INFO.photoUrl}
              alt={COUNSELLOR_INFO.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{COUNSELLOR_INFO.name}</h2>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
              Active now
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="ml-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unreadCount} unread
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition border border-slate-200">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition border border-slate-200">
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-slate-50 border-x border-slate-200 px-5 py-5 space-y-4 min-h-0">
        {messages.length === 0 && (
          <EmptyState
            title="No messages yet"
            message="Start a conversation with your counsellor."
          />
        )}

        {messages.map((msg) => {
          const isMe = msg.senderRole === 'STUDENT';
          const msgText = msg.content || msg.text || ''; // ← FIXED: handle both fields

          return (
            <div key={msg.id} className={`flex gap-3 animate-fade-in ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!isMe && (
                <img
                  src={COUNSELLOR_INFO.photoUrl}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-sm"
                />
              )}
              {isMe && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1 shadow-sm">
                  {getInitials(msg.senderName)}
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-sm group ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium shadow-sm ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}>
                  {msgText}
                </div>
                <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <CheckCheck className="w-3 h-3 text-indigo-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="bg-white rounded-b-3xl border border-t-0 border-slate-200 px-4 py-4 flex items-center gap-3 shadow-sm"
      >
        <input
          type="text"
          placeholder={`Message ${COUNSELLOR_INFO.name}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 input"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
