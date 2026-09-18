import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Settings, User, ShieldCheck, CreditCard, Bell, Lock, CheckCircle2,
  Save, Globe, Phone, Mail, Award, Sparkles, Building, Key, Eye, EyeOff
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { formatINR } from '../../lib/formatters';

export const CounsellorSettings = () => {
  const {
    counsellors,
    counsellorProfile,
    updateCounsellorProfile,
    counsellorSettings,
    updateCounsellorSettings,
    counsellorPayoutAccount,
    updateCounsellorPayoutAccount
  } = useData();

  const counsellor = counsellors.find(c => c.id === counsellorProfile?.id) || counsellors[0];

  const [activeTab, setActiveTab] = useState('PUBLIC_PROFILE'); // 'PUBLIC_PROFILE' | 'NOTIFICATIONS' | 'SECURITY' | 'PAYOUT_ESCROW'
  const [notice, setNotice] = useState('');

  // 1. Homepage & Public Directory Fields
  const [profileForm, setProfileForm] = useState({
    fullName: counsellor?.fullName || 'Arti Sood',
    title: counsellor?.title || 'Senior Ivy League Admissions Strategist',
    photoUrl: counsellor?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    bio: counsellor?.bio || 'Over 12 years helping Indian students crack top 20 global universities with comprehensive mentoring.',
    credentials: counsellor?.credentials || 'Ex-Columbia Admissions Reader, M.Ed Harvard',
    experienceYears: counsellor?.experienceYears || 12,
    verifiedPlacementsCount: counsellor?.verifiedPlacementsCount || 420,
    scholarshipsSecured: counsellor?.scholarshipsSecured || '₹14+ Crore',
    pricePerSession: counsellor?.pricePerSession || 25000,
    priceCategory: counsellor?.priceCategory || 'Starting ₹25,000 / package',
    destinations: (counsellor?.destinations || ['United States', 'United Kingdom', 'Canada']).join(', '),
    track: counsellor?.track || 'Study abroad admissions',
    phone: counsellor?.contact?.phone || '+91 98765 43210',
    email: counsellor?.contact?.email || 'arti.sood@aspiranthq.com',
    office: counsellor?.contact?.office || 'Virtual Global Desk'
  });

  // 2. Notification Preferences (Ported from Student Settings)
  const [notifications, setNotifications] = useState({
    emailNotifications: counsellorSettings?.emailNotifications ?? true,
    whatsappAlerts: counsellorSettings?.whatsappAlerts ?? true,
    sessionReminders: counsellorSettings?.sessionReminders ?? true,
    bookingAlerts: counsellorSettings?.bookingAlerts ?? true,
    escrowPayoutAlerts: counsellorSettings?.escrowPayoutAlerts ?? true
  });

  // 3. Security & Visibility (Ported from Student Settings)
  const [security, setSecurity] = useState({
    twoFactorEnabled: counsellorSettings?.twoFactorEnabled ?? true,
    publicProfileVisible: counsellorSettings?.publicProfileVisible ?? true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // 4. Dedicated Escrow Payout Account
  const [payout, setPayout] = useState({
    accountHolderName: counsellorPayoutAccount?.accountHolderName || 'Arti Sood',
    bankName: counsellorPayoutAccount?.bankName || 'HDFC Bank Ltd.',
    accountNumber: counsellorPayoutAccount?.accountNumber || '50100482910481',
    ifscCode: counsellorPayoutAccount?.ifscCode || 'HDFC0001824',
    upiId: counsellorPayoutAccount?.upiId || 'artisood@okhdfcbank'
  });

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3500); };

  const handleSavePublicProfile = (e) => {
    e.preventDefault();
    const destArray = profileForm.destinations.split(',').map(s => s.trim()).filter(Boolean);
    updateCounsellorProfile(counsellor.id, {
      fullName: profileForm.fullName,
      title: profileForm.title,
      photoUrl: profileForm.photoUrl,
      bio: profileForm.bio,
      credentials: profileForm.credentials,
      experienceYears: parseInt(profileForm.experienceYears) || 1,
      verifiedPlacementsCount: parseInt(profileForm.verifiedPlacementsCount) || 10,
      scholarshipsSecured: profileForm.scholarshipsSecured,
      pricePerSession: parseInt(profileForm.pricePerSession) || 5000,
      priceCategory: profileForm.priceCategory,
      destinations: destArray,
      track: profileForm.track,
      tags: destArray.concat([profileForm.track]),
      contact: {
        email: profileForm.email,
        phone: profileForm.phone,
        office: profileForm.office
      }
    });
    showMsg('Public profile & homepage card information updated successfully!');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    updateCounsellorSettings(notifications);
    showMsg('Notification preferences updated!');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (security.newPassword && security.newPassword !== security.confirmPassword) {
      alert('New password and confirmation password do not match.');
      return;
    }
    updateCounsellorSettings({
      twoFactorEnabled: security.twoFactorEnabled,
      publicProfileVisible: security.publicProfileVisible
    });
    setSecurity(p => ({ ...p, currentPassword: '', newPassword: '', confirmPassword: '' }));
    showMsg('Security and authentication preferences saved!');
  };

  const handleSavePayout = (e) => {
    e.preventDefault();
    updateCounsellorPayoutAccount(payout);
    showMsg('Dedicated Escrow payout account details saved!');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      <PageHeader
        eyebrow="Admissions Strategist Portal"
        title="Portal & Public Profile Settings"
        subtitle="Customize everything shown about you on the matchEd homepage, configure notification triggers, security controls, and escrow payout banking."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
        {[
          { id: 'PUBLIC_PROFILE', label: 'Homepage & Public Profile', icon: User },
          { id: 'NOTIFICATIONS', label: 'Notification Channels', icon: Bell },
          { id: 'SECURITY', label: 'Security & 2FA', icon: Lock },
          { id: 'PAYOUT_ESCROW', label: 'Escrow Payout Account', icon: CreditCard }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition cursor-pointer ${
                isActive
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Public Profile & Homepage Information */}
      {activeTab === 'PUBLIC_PROFILE' && (
        <form onSubmit={handleSavePublicProfile} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0B2545]" /> Public Homepage Profile Information
                </h2>
                <p className="text-xs text-slate-500">Edit how your profile card, bio, credentials, and rates appear on the homepage and explore directory.</p>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full">
                Public Directory Live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={profileForm.fullName}
                  onChange={e => setProfileForm(p => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Professional Title *</label>
                <input
                  type="text"
                  required
                  value={profileForm.title}
                  onChange={e => setProfileForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
                  placeholder="e.g. Senior Ivy League Admissions Strategist"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase text-slate-500 mb-1">Avatar / Profile Photo URL</label>
                <div className="flex items-center gap-3">
                  <img
                    src={profileForm.photoUrl}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#CFA25E] shrink-0"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"; }}
                  />
                  <input
                    type="url"
                    value={profileForm.photoUrl}
                    onChange={e => setProfileForm(p => ({ ...p, photoUrl: e.target.value }))}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase text-slate-500 mb-1">Bio / Admissions Philosophy *</label>
                <textarea
                  rows={3}
                  required
                  value={profileForm.bio}
                  onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none"
                  placeholder="Describe your mentoring methodology and track record..."
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Credentials & Degrees</label>
                <input
                  type="text"
                  value={profileForm.credentials}
                  onChange={e => setProfileForm(p => ({ ...p, credentials: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. Ex-Columbia Reader, M.Ed Harvard"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Primary Track</label>
                <select
                  value={profileForm.track}
                  onChange={e => setProfileForm(p => ({ ...p, track: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="Study abroad admissions">Study Abroad Admissions</option>
                  <option value="Ivy League & Undergrad">Ivy League & Top 20 Undergrad</option>
                  <option value="STEM & MS Computer Science">STEM & MS Computer Science</option>
                  <option value="MBA & Business Strategy">MBA & Top Business Schools</option>
                  <option value="Scholarship Maximization">Scholarship Maximization</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={profileForm.experienceYears}
                  onChange={e => setProfileForm(p => ({ ...p, experienceYears: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Verified Placements Count</label>
                <input
                  type="number"
                  value={profileForm.verifiedPlacementsCount}
                  onChange={e => setProfileForm(p => ({ ...p, verifiedPlacementsCount: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Scholarships Secured</label>
                <input
                  type="text"
                  value={profileForm.scholarshipsSecured}
                  onChange={e => setProfileForm(p => ({ ...p, scholarshipsSecured: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. ₹14+ Crore"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Starting Price per Package (₹)</label>
                <input
                  type="number"
                  value={profileForm.pricePerSession}
                  onChange={e => setProfileForm(p => ({
                    ...p,
                    pricePerSession: e.target.value,
                    priceCategory: `Starting ₹${parseInt(e.target.value || 0).toLocaleString('en-IN')} / package`
                  }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase text-slate-500 mb-1">Target Destinations (Comma separated)</label>
                <input
                  type="text"
                  value={profileForm.destinations}
                  onChange={e => setProfileForm(p => ({ ...p, destinations: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  placeholder="United States, United Kingdom, Canada, Singapore"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Public Office / Desk Location</label>
                <input
                  type="text"
                  value={profileForm.office}
                  onChange={e => setProfileForm(p => ({ ...p, office: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  placeholder="Virtual Global Desk or Mumbai"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Direct Contact Phone</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#CFA25E]" /> Save Homepage Profile Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: Notification Preferences (Ported from Student Settings) */}
      {activeTab === 'NOTIFICATIONS' && (
        <form onSubmit={handleSaveNotifications} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-600" /> Counsellor Notification Channels
              </h2>
              <p className="text-xs text-slate-500">Configure how and when you receive instant alerts about bookings, payments, and student queries.</p>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { id: 'emailNotifications', label: 'Email Consultation Notifications', desc: 'Receive instant emails when a student requests or books a session.' },
                { id: 'whatsappAlerts', label: 'WhatsApp Instant Alerts', desc: 'Get SMS / WhatsApp reminders 30 minutes before your scheduled video call.' },
                { id: 'sessionReminders', label: 'Session Delivery Reminders', desc: 'Automated alerts for pending milestone reviews and SOP audits.' },
                { id: 'bookingAlerts', label: 'Direct Booking Alerts', desc: 'Notify immediately when new students enrol in your admissions packages.' },
                { id: 'escrowPayoutAlerts', label: 'Escrow Payout Clearance Updates', desc: 'Get notified when Admin audits and disburses funds to your bank account.' }
              ].map(pref => (
                <div key={pref.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">{pref.label}</span>
                    <p className="text-slate-500">{pref.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[pref.id]}
                      onChange={e => setNotifications(p => ({ ...p, [pref.id]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B2545]"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#CFA25E]" /> Save Notification Preferences
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: Security & Visibility (Ported from Student Settings) */}
      {activeTab === 'SECURITY' && (
        <form onSubmit={handleSaveSecurity} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" /> Account Security & Privacy
              </h2>
              <p className="text-xs text-slate-500">Enable two-factor authentication, control public discovery visibility, or change your password.</p>
            </div>

            {/* Toggles */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Two-Factor Authentication (2FA)</span>
                  <p className="text-slate-500">Require an OTP verification code sent to your registered mobile number during sign in.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.twoFactorEnabled}
                    onChange={e => setSecurity(p => ({ ...p, twoFactorEnabled: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block">Public Directory Visibility</span>
                  <p className="text-slate-500">When enabled, students can find and book you via matchEd search. Turn off to pause new incoming inquiries.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.publicProfileVisible}
                    onChange={e => setSecurity(p => ({ ...p, publicProfileVisible: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B2545]"></div>
                </label>
              </div>
            </div>

            {/* Password Change */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Change Password</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">Current Password</label>
                  <input
                    type="password"
                    value={security.currentPassword}
                    onChange={e => setSecurity(p => ({ ...p, currentPassword: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">New Password</label>
                  <input
                    type="password"
                    value={security.newPassword}
                    onChange={e => setSecurity(p => ({ ...p, newPassword: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 uppercase text-[10px] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={security.confirmPassword}
                    onChange={e => setSecurity(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#CFA25E]" /> Save Security Settings
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: Dedicated Escrow Bank Details */}
      {activeTab === 'PAYOUT_ESCROW' && (
        <form onSubmit={handleSavePayout} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" /> Dedicated Escrow Payout Bank Account
              </h2>
              <p className="text-xs text-slate-500">Ensure this information matches your official PAN and tax ID for seamless clearing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Account Holder Full Name *</label>
                <input
                  type="text"
                  required
                  value={payout.accountHolderName}
                  onChange={e => setPayout(p => ({ ...p, accountHolderName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  value={payout.bankName}
                  onChange={e => setPayout(p => ({ ...p, bankName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Bank Account Number *</label>
                <input
                  type="text"
                  required
                  value={payout.accountNumber}
                  onChange={e => setPayout(p => ({ ...p, accountNumber: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Bank IFSC Code *</label>
                <input
                  type="text"
                  required
                  value={payout.ifscCode}
                  onChange={e => setPayout(p => ({ ...p, ifscCode: e.target.value.toUpperCase() }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-semibold focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold uppercase text-slate-500 mb-1">UPI ID (Optional for fast clearing)</label>
                <input
                  type="text"
                  value={payout.upiId}
                  onChange={e => setPayout(p => ({ ...p, upiId: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                  placeholder="e.g. name@okhdfcbank"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#CFA25E]" /> Save Payout Account
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
