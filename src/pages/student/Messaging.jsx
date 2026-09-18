import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, Paperclip, FileText, CheckCheck, X } from 'lucide-react';
import { getInitials } from '../../lib/formatters';
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
  const [attachedFile, setAttachedFile] = useState(null);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedFile) return;
    sendMessage(
      'STUDENT',
      currentUser?.fullName || 'Rohan Mehta',
      inputText.trim(),
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

  const unreadCount = messages.filter(m => m.senderRole === 'COUNSELLOR' && m.unread).length;

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)] gap-0 font-sans">

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
          const msgText = msg.content || msg.text || '';

          return (
            <div key={msg.id} className={`flex gap-3 animate-in fade-in ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!isMe && (
                <img
                  src={COUNSELLOR_INFO.photoUrl}
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
            <FileText className="w-4 h-4 text-[#CFA25E]" />
            <span>Attachment: <strong>{attachedFile.name}</strong></span>
          </div>
          <button onClick={() => setAttachedFile(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="bg-white rounded-b-3xl border border-t-0 border-slate-200 px-4 py-4 flex items-center gap-3 shadow-sm"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Attach document or transcript"
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={`Message ${COUNSELLOR_INFO.name}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputText.trim() && !attachedFile}
          className="p-3 rounded-xl bg-[#0B2545] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white transition shadow-sm cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#CFA25E]" />
        </button>
      </form>
    </div>
  );
};
