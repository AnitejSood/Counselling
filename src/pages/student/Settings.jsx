import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  User, Mail, Phone, Bell, Shield, Lock, Eye, EyeOff,
  Save, LogOut, AlertTriangle, ToggleLeft, ToggleRight, CheckCircle2
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

const Toggle = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {description && <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative flex items-center w-10 h-5.5 rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
        enabled ? 'bg-indigo-600' : 'bg-slate-200'
      }`}
      style={{ minWidth: '2.5rem', height: '1.375rem' }}
    >
      <span className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? 'translate-x-5' : 'translate-x-0.5'
      }`} />
    </button>
  </div>
);

const Section = ({ title, icon: Icon, children }) => (
  <div className="card overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
      <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

export const Settings = () => {
  const { currentUser, logout } = useAuth();
  const { studentProfile, updateStudentProfile, studentSettings, updateStudentSettings } = useData();

  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Local form state
  const [profileForm, setProfileForm] = useState({
    fullName: studentProfile?.personalInfo?.fullName || 'Rohan Mehta',
    phone: studentProfile?.personalInfo?.phone || '+91 98200 11223',
    city: studentProfile?.personalInfo?.city || 'Mumbai',
    state: studentProfile?.personalInfo?.state || 'Maharashtra',
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateStudentProfile({
      personalInfo: {
        ...studentProfile?.personalInfo,
        ...profileForm
      }
    });
    showSuccess('Account details updated successfully!');
  };

  const handleToggle = (key) => {
    updateStudentSettings({ [key]: !studentSettings?.[key] });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">

      <PageHeader
        eyebrow="Account"
        title="Student Account Settings"
        subtitle="Manage your personal details, notifications, security, and privacy."
      />

      {/* Success Banner */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {/* Account Info */}
      <Section title="Account Information" icon={User}>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                value={currentUser?.email || 'rohan.mehta@example.com'}
                disabled
                className="input opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">City</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={e => setProfileForm(p => ({ ...p, city: e.target.value }))}
                className="input"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button type="submit" className="btn btn-primary">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </Section>

      {/* Notification Preferences */}
      <Section title="Notification Preferences" icon={Bell}>
        <div className="space-y-0">
          <Toggle
            enabled={studentSettings?.emailNotifications ?? true}
            onChange={() => handleToggle('emailNotifications')}
            label="Email Notifications"
            description="Receive session reminders and document alerts via email."
          />
          <Toggle
            enabled={studentSettings?.whatsappAlerts ?? false}
            onChange={() => handleToggle('whatsappAlerts')}
            label="WhatsApp Alerts"
            description="Get instant WhatsApp messages for upcoming sessions."
          />
          <Toggle
            enabled={studentSettings?.sessionReminders ?? true}
            onChange={() => handleToggle('sessionReminders')}
            label="Session Reminders"
            description="Reminder notifications 1 hour before each consultation."
          />
          <Toggle
            enabled={studentSettings?.marketingEmails ?? false}
            onChange={() => handleToggle('marketingEmails')}
            label="Platform News & Updates"
            description="matchEd newsletters, counsellor spotlights, and admission tips."
          />
        </div>
      </Section>

      {/* Security */}
      <Section title="Security" icon={Shield}>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordForm.current}
                onChange={e => setPasswordForm(p => ({ ...p, current: e.target.value }))}
                placeholder="Enter current password"
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordForm.newPass}
                onChange={e => setPasswordForm(p => ({ ...p, newPass: e.target.value }))}
                placeholder="Min 8 characters"
                className="input"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordForm.confirm}
                onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
                placeholder="Repeat new password"
                className="input"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => showSuccess('Password updated! (Demo)')}
              className="btn btn-secondary"
            >
              <Lock className="w-4 h-4" /> Update Password
            </button>
          </div>

          <div className="divider my-2" />

          <Toggle
            enabled={studentSettings?.twoFactorEnabled ?? false}
            onChange={() => handleToggle('twoFactorEnabled')}
            label="Two-Factor Authentication"
            description="Add an extra layer of security via OTP on login."
          />
        </div>
      </Section>

      {/* Danger Zone */}
      <Section title="Account & Data" icon={AlertTriangle}>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-1">
            <p className="text-xs font-bold text-rose-700">Delete Account</p>
            <p className="text-[11px] text-rose-600">
              Permanently delete your matchEd account, profile, and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={() => alert('Account deletion request submitted. (Demo — not executed)')}
              className="btn btn-danger mt-2 text-[11px]"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Request Account Deletion
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={logout}
              className="btn btn-ghost w-full justify-center"
            >
              <LogOut className="w-4 h-4" /> Sign Out of matchEd
            </button>
          </div>
        </div>
      </Section>

    </div>
  );
};
