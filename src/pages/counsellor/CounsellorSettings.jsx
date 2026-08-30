import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Settings, User, ShieldCheck, CreditCard, Bell, Lock, CheckCircle2, Save } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const CounsellorSettings = () => {
  const { counsellorProfile, upgradeCounsellorTier } = useData();
  const { currentUser } = useAuth();

  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({
    fullName: counsellorProfile?.fullName || 'Arti Sood',
    email: counsellorProfile?.contact?.email || 'arti.sood@careerguide.com',
    phone: counsellorProfile?.contact?.phone || '+91 98765 43210',
    startingPrice: counsellorProfile?.pricePerSession || 25000,
    emailAlerts: true,
    whatsappAlerts: true,
    bankAccountName: 'Arti Sood',
    bankAccountNumber: '9182374612',
    bankIFSC: 'HDFC0001234'
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleSave = (e) => {
    e.preventDefault();
    showMsg('Counsellor portal settings saved successfully!');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      <PageHeader
        eyebrow="Portal Preferences"
        title="Counsellor Settings"
        subtitle="Manage your profile information, subscription plan, availability defaults, and payout bank details."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" /> Account & Profile Info
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Mobile Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Starting Rate per Package (₹)</label>
              <input
                type="number"
                value={form.startingPrice}
                onChange={e => setForm(p => ({ ...p, startingPrice: parseInt(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bank & Payout Settings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-indigo-600" /> Bank Payout Details (Escrow Release)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Account Holder Name</label>
              <input
                type="text"
                value={form.bankAccountName}
                onChange={e => setForm(p => ({ ...p, bankAccountName: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Account Number</label>
              <input
                type="text"
                value={form.bankAccountNumber}
                onChange={e => setForm(p => ({ ...p, bankAccountNumber: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">IFSC Code</label>
              <input
                type="text"
                value={form.bankIFSC}
                onChange={e => setForm(p => ({ ...p, bankIFSC: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save All Preferences
        </button>
      </form>
    </div>
  );
};
