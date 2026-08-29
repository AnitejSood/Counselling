import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Users, Search, AlertCircle, PlusCircle, ChevronRight } from 'lucide-react';

export const StudentsList = () => {
  const { adminStudentsList = [] } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = (adminStudentsList || []).filter(s => {
    const nameStr = (s.fullName || s.name || '').toLowerCase();
    const goalStr = (s.targetGoal || s.targetDegree || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return nameStr.includes(query) || goalStr.includes(query);
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Student CRM Directory</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Student Profiles ({adminStudentsList.length})</h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="space-y-3">
          {filtered.map((student) => (
            <div
              key={student.id || student.studentId}
              onClick={() => navigate(`/admin/students/${student.id || student.studentId}`)}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-purple-50/50 hover:border-purple-200 transition cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={student.avatarUrl || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"}
                  alt={student.fullName || student.name}
                  className="w-11 h-11 rounded-full object-cover border border-purple-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{student.fullName || student.name}</h3>
                    {student.needsAttention && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                        Attention Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">{student.targetGoal || student.targetDegree} • {student.targetCountries || 'US, UK'}</p>
                  <p className="text-[11px] text-slate-400">{student.email || 'student@example.com'} • {student.phone || '+91 98200 11223'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right text-xs">
                  <span className="font-bold text-purple-600 block">{student.profileCompletion || 85}% Profile</span>
                  <span className="text-slate-400 text-[10px]">Last Contact: {student.lastContact || 'Recent'}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
