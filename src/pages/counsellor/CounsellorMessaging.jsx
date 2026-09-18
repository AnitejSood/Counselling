import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, Paperclip, FileText, CheckCheck, X, User } from 'lucide-react';
import { getInitials } from '../../lib/formatters';
import { EmptyState } from '../../components/ui/EmptyState';

export const CounsellorMessaging = () => {
  const { currentUser } = useAuth();
  const { 
    messages, 
    sendMessage, 
    activeStudent, 
    pipelineStudents, 
    activeStudentId, 
    switchActiveStudent 
  } = useData();

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
      'COUNSELLOR',
      currentUser?.fullName || 'Arti Sood',
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

  return (
    <div className="w-full flex flex-col h-[calc(100vh-8rem)] gap-0 font-sans">
      
      {/* Header with Active Student Switcher */}
      <div className="bg-white rounded-t-3xl border border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={activeStudent?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
              alt={activeStudent?.fullName || 'Student'}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">{activeStudent?.fullName || 'Rohan Mehta'}</h2>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                Active Student
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{activeStudent?.targetGoal} · {activeStudent?.targetCountries}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Chat With:</span>
          <select
            value={activeStudentId}
            onChange={(e) => switchActiveStudent(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
          >
            {(pipelineStudents || []).map(s => (
              <option key={s.studentId || s.id} value={s.studentId || s.id}>
                👤 {s.fullName || s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto bg-slate-50 border-x border-slate-200 px-5 py-5 space-y-4 min-h-0">
        {(!messages || messages.length === 0) ? (
          <EmptyState
            title="No messages yet"
            message={`Start a conversation with ${activeStudent?.fullName || 'your student'}.`}
          />
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderRole === 'COUNSELLOR';
            const msgText = msg.content || msg.text || '';

            return (
              <div key={msg.id} className={`flex gap-3 animate-in fade-in ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isMe ? (
                  <img
                    src={activeStudent?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
                    alt={msg.senderName}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-xs"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1 shadow-xs">
                    {getInitials(msg.senderName)}
                  </div>
                )}

                <div className={`max-w-sm group ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed font-medium shadow-xs space-y-1.5 ${
                    isMe
                      ? 'bg-[#0B2545] text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}>
                    {msgText && <p>{msgText}</p>}
                    {msg.fileAttachment && (
                      <div className={`p-2 rounded-xl border flex items-center gap-2 text-[11px] ${
                        isMe ? 'bg-[#133E68] border-slate-600 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}>
                        <FileText className="w-4 h-4 shrink-0 text-[#CFA25E]" />
                        <span className="font-semibold truncate">{msg.fileAttachment}</span>
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] text-slate-400 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#CFA25E]" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {/* Attachment Preview Banner */}
      {attachedFile && (
        <div className="bg-[#F0F4F8] px-6 py-2 border-x border-t border-slate-200 flex items-center justify-between text-xs text-[#0B2545] font-medium">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#CFA25E]" />
            <span>Attachment: <strong>{attachedFile.name}</strong></span>
          </div>
          <button onClick={() => setAttachedFile(null)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSend}
        className="bg-white rounded-b-3xl border border-t-0 border-slate-200 px-4 py-4 flex items-center gap-3 shadow-xs"
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
          title="Attach document or essay feedback"
          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          placeholder={`Message ${activeStudent?.fullName || 'student'}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!inputText.trim() && !attachedFile}
          className="p-3 rounded-xl bg-[#0B2545] hover:bg-[#133E68] disabled:opacity-40 disabled:cursor-not-allowed text-white transition shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

export default CounsellorMessaging;
