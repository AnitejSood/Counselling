import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Settings, Save, CheckCircle2, Building2, DollarSign, Globe, Shield, Percent } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

const SettingRow = ({ label, name, value, onChange, type = 'text', prefix }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">{prefix}</span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 font-medium ${prefix ? 'pl-7' : ''}`}
      />
    </div>
  </div>
);

export const SettingsAdmin = () => {
  const { platformConfig, updatePlatformConfig } = useData();
  const [form, setForm] = useState({
    companyName: platformConfig?.companyName || 'matchEd Marketplace',
    tagline: platformConfig?.tagline || "India's Leading Verified Counsellor Marketplace",
    headquartersCity: platformConfig?.headquarters?.city || 'Chandigarh',
    headquartersAddress: platformConfig?.headquarters?.address || 'SCO 15-16, Sector 17C, Chandigarh',
    headquartersPhone: platformConfig?.headquarters?.phone || '+91 172 401 8800',
    headquartersEmail: platformConfig?.headquarters?.email || 'support@matchEd.in',
    defaultCommissionRate: platformConfig?.defaultCommissionRate || 15,
    escrowHoldDays: platformConfig?.escrowHoldDays || 30,
    maxBoostDays: platformConfig?.maxBoostDays || 30,
    minCounsellorRating: platformConfig?.minCounsellorRating || 3.5,
  });
  const [saved, setSaved] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const executeSave = () => {
    updatePlatformConfig({
      ...form,
      headquarters: {
        city: form.headquartersCity,
        address: form.headquartersAddress,
        phone: form.headquartersPhone,
        email: form.headquartersEmail,
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
        <div className="w-8 h-8 bg-[#0B2545]/10 border border-[#0B2545]/20 rounded-xl flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#0B2545]" />
        </div>
        <h2 className="text-sm font-bold text-[#0B2545]">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 font-sans animate-fade-in">
      <PageHeader
        eyebrow="matchEd System Governance"
        title="Platform & Financial Configuration"
        subtitle="Configure global platform commission rates, 30-day escrow holding guarantee rules, and official brand parameters."
      />

      {saved && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Platform configurations saved successfully!
        </div>
      )}

      <form onSubmit={handleSaveSubmit} className="space-y-6">

        {/* Brand */}
        <Section title="Brand Identity" icon={Building2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingRow label="Platform Name" name="companyName" value={form.companyName} onChange={handleChange} />
            <SettingRow label="Corporate Support Email" name="headquartersEmail" value={form.headquartersEmail} onChange={handleChange} />
          </div>
          <SettingRow label="Platform Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
        </Section>

        {/* Headquarters */}
        <Section title="Corporate Headquarters" icon={Globe}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingRow label="Headquarters City" name="headquartersCity" value={form.headquartersCity} onChange={handleChange} />
            <SettingRow label="Helpline Phone" name="headquartersPhone" value={form.headquartersPhone} onChange={handleChange} />
          </div>
          <SettingRow label="Registered Office Address" name="headquartersAddress" value={form.headquartersAddress} onChange={handleChange} />
        </Section>

        {/* Financial */}
        <Section title="Commission & Escrow Policy" icon={DollarSign}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SettingRow label="Default Commission Rate (%)" name="defaultCommissionRate" value={form.defaultCommissionRate} onChange={handleChange} type="number" />
            <SettingRow label="Escrow Guarantee Hold Period (days)" name="escrowHoldDays" value={form.escrowHoldDays} onChange={handleChange} type="number" />
            <SettingRow label="Max Boost Duration (days)" name="maxBoostDays" value={form.maxBoostDays} onChange={handleChange} type="number" />
            <SettingRow label="Min Rating Threshold to Stay Listed" name="minCounsellorRating" value={form.minCounsellorRating} onChange={handleChange} type="number" />
          </div>
        </Section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition"
          >
            <Save className="w-4 h-4 text-[#CFA25E]" /> Save System Configuration
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={executeSave}
        title="Save Platform Configuration Changes?"
        message="This will update the global take rate, escrow release policy, and contact details across matchEd."
        confirmLabel="Confirm & Apply Changes"
        variant="primary"
      />
    </div>
  );
};

