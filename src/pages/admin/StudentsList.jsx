import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Users, Search, Plus, Trash2, ChevronRight, CheckCircle2, UserPlus, Eye, Shield } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const StudentsList = () => {
  const { usersList, addUser, deleteUser, addAdminStudent, deleteAdminStudent, pipelineStudents, counsellors } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', role: 'STUDENT', targetGoal: 'MS Computer Science', targetCountries: 'United States' });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addUser({
      name: form.name,
      fullName: form.name,
      email: form.email,
      role: form.role
    });
    if (form.role === 'STUDENT') {
      addAdminStudent({
        fullName: form.name,
        email: form.email,
        targetGoal: form.targetGoal,
        targetCountries: form.targetCountries
      });
    }
    setShowAddModal(false);
    setForm({ name: '', email: '', role: 'STUDENT', targetGoal: 'MS Computer Science', targetCountries: 'United States' });
    showMsg(`Added new ${form.role.toLowerCase()} account for ${form.name}!`);
  };

  const handleDelete = (userId, name, role) => {
    deleteUser(userId);
    if (role === 'STUDENT') {
      deleteAdminStudent(userId);
    }
    showMsg(`Deleted user account: ${name}`);
  };

  const filteredUsers = (usersList || []).filter(u => {
    const nameStr = (u.name || u.fullName || '').toLowerCase();
    const emailStr = (u.email || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return nameStr.includes(query) || emailStr.includes(query);
  });

  return (
    <div className="space-y-8 w-full font-sans">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B2545] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            User Account Governance
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Platform Users & CRM ({usersList.length})</h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search students & counsellors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0B2545]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 shrink-0 transition"
          >
            <UserPlus className="w-4 h-4 text-[#CFA25E]" /> Add User Account
          </button>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 max-w-lg">
          <h3 className="text-sm font-bold text-slate-900">Add New User Account (Student or Counsellor)</h3>
          <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Account Role</label>
              <select
                value={form.role}
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              >
                <option value="STUDENT">Student Account</option>
                <option value="COUNSELLOR">Counsellor Account</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Simran Kaur"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. simran@example.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            {form.role === 'STUDENT' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Target Degree</label>
                  <input
                    type="text"
                    placeholder="MS Computer Science"
                    value={form.targetGoal}
                    onChange={e => setForm(p => ({ ...p, targetGoal: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Target Countries</label>
                  <input
                    type="text"
                    placeholder="US, UK, Canada"
                    value={form.targetCountries}
                    onChange={e => setForm(p => ({ ...p, targetCountries: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
              <button type="submit" className="px-5 py-2 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-md">Create Account</button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="divide-y divide-slate-100">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${
                  user.role === 'STUDENT' ? 'bg-amber-50 text-[#0B2545] border border-amber-200' : 'bg-slate-100 text-[#0B2545] border border-slate-200'
                }`}>
                  {user.role === 'STUDENT' ? 'STD' : 'CNS'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{user.name || user.fullName}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      user.role === 'STUDENT' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-[#0B2545]'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{user.email} · Joined {user.joinedDate || '2026-06-01'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user.role === 'COUNSELLOR' && (
                  <Link
                    to={`/admin/counsellors/${user.id || 'counsellor_01'}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> Profile Audit
                  </Link>
                )}

                <button
                  onClick={() => handleDelete(user.id, user.name || user.fullName, user.role)}
                  title="Delete user account"
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

