import React, { useState } from 'react';
import {
  ShieldCheck, Upload, Send, CheckCircle2, Award, FileText,
  User, Mail, Phone, MapPin, Globe, Briefcase, BookOpen,
  CreditCard, Camera, AlertCircle, ChevronRight, ChevronLeft, Link as LinkIcon, Lock, Plus, Trash2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const STEPS = [
  { id: 1, label: 'Personal Details', icon: User },
  { id: 2, label: 'Tracks & Bio', icon: Briefcase },
  { id: 3, label: 'Links & Proofs', icon: BookOpen },
  { id: 4, label: 'Front & Back ID', icon: CreditCard },
];

const UploadBox = ({ label, hint, accept = '.pdf,.jpg,.jpeg,.png', icon: Icon = Upload, onChange }) => {
  const [fileName, setFileName] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) { 
      setFileName(file.name); 
      onChange && onChange(file.name); 
    }
  };
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#CFA25E] bg-slate-50 rounded-2xl p-5 text-center cursor-pointer transition-colors group">
        <input type="file" accept={accept} onChange={handleChange} className="hidden" />
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-[#CFA25E] transition mb-1.5" />
        {fileName ? (
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {fileName} (Ready for Audit)
          </span>
        ) : (
          <>
            <span className="text-xs font-bold text-slate-700">Click to upload</span>
            <span className="text-[11px] text-slate-400 mt-0.5">{hint}</span>
          </>
        )}
      </label>
    </div>
  );
};

const FormField = ({ label, required, children }) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
      {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

export const CounsellorApply = () => {
  const { submitVerificationApp } = useData();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const [availableTracksList, setAvailableTracksList] = useState([
    'Study abroad admissions (US, UK, Canada)',
    'Domestic India admissions (CUET, JEE, Liberal Arts)',
    'STEM & Ivy League Mentorship',
    'Sports quota & Athletic Scholarships',
    'MBA & Executive Education',
    'Medical & MBBS Abroad',
    'Undergraduate & High School Mentorship'
  ]);
  const [newTrackInput, setNewTrackInput] = useState('');

  const [form, setForm] = useState({
    // Step 1: Personal
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    photoFile: '',

    // Step 2: Tracks & Bio
    tracks: ['Study abroad admissions (US, UK, Canada)'],
    experienceYears: 5,
    claimedPlacements: 120,
    subscriptionTier: 'PRO', // FREE or PRO
    bio: '',

    // Step 3: Links & Credentials
    credentials: '',
    linkedinUrl: '',
    websiteUrl: '',
    publicationUrl: '',
    additionalLinks: [{ label: '', url: '' }],
    sampleFileName: '',

    // Step 4: Front & Back ID
    govIdType: 'Aadhaar Card',
    govIdNumber: '',
    frontIdUrl: '',
    backIdUrl: '',
    agreeTerms: false,
  });

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));
  const handleInput = e => set(e.target.name, e.target.value);

  const toggleTrack = (trackName) => {
    setForm(prev => {
      const exists = prev.tracks.includes(trackName);
      if (exists) {
        return { ...prev, tracks: prev.tracks.filter(t => t !== trackName) };
      } else {
        return { ...prev, tracks: [...prev.tracks, trackName] };
      }
    });
  };

  const handleAddCustomTrack = (e) => {
    e.preventDefault();
    if (!newTrackInput.trim()) return;
    const trimmed = newTrackInput.trim();
    if (!availableTracksList.includes(trimmed)) {
      setAvailableTracksList(prev => [...prev, trimmed]);
    }
    if (!form.tracks.includes(trimmed)) {
      setForm(prev => ({ ...prev, tracks: [...prev.tracks, trimmed] }));
    }
    setNewTrackInput('');
  };

  const handleAddLinkRow = () => {
    setForm(prev => ({
      ...prev,
      additionalLinks: [...prev.additionalLinks, { label: '', url: '' }]
    }));
  };

  const handleUpdateLinkRow = (index, field, value) => {
    setForm(prev => {
      const updated = [...prev.additionalLinks];
      updated[index][field] = value;
      return { ...prev, additionalLinks: updated };
    });
  };

  const handleRemoveLinkRow = (index) => {
    setForm(prev => ({
      ...prev,
      additionalLinks: prev.additionalLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const res = submitVerificationApp(form);
    setSubmittedData(res);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    const tempUsername = (form.email.split('@')[0] || 'counsellor') + '_matched';
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 font-sans">
        <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#0B2545] mb-2">Documents Uploaded & Application Submitted!</h2>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
            Our verification desk has received your Front ID, Back ID, custom tracks, and credentials.
          </p>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-left space-y-4 max-w-lg mx-auto mb-8">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 space-y-1">
                <strong>Temporary Portal Access Credentials:</strong>
                <p>Once verification is completed by our admin desk, your login credentials will be officially activated and dispatched to <strong>{form.email}</strong>:</p>
                <div className="bg-white/80 p-2.5 rounded-xl font-mono text-[11px] border border-amber-300 space-y-1 mt-1">
                  <div><strong>Username:</strong> {tempUsername}</div>
                  <div><strong>Temporary Password:</strong> •••••••• (Sent via encrypted email)</div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-bold text-slate-900">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Tracks:</span>
                <span className="font-bold text-[#0B2545] truncate max-w-[240px]">{form.tracks.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Front & Back ID Status:</span>
                <span className="font-bold text-emerald-700">✓ Uploaded for Audit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification SLA:</span>
                <span className="font-bold text-slate-900">Within 24 Hours</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CFA25E]" /> Verified matchEd Onboarding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545]">Apply to Join matchEd</h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
            Submit your Front & Back ID, custom tracks, and portfolio links. We verify credentials and issue portal credentials within 24 hours.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
          {STEPS.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <button
                  onClick={() => s.id < step && setStep(s.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all cursor-pointer ${
                    done ? 'bg-emerald-500 border-emerald-500 text-white' :
                    active ? 'bg-[#0B2545] border-[#CFA25E] text-white shadow-lg' :
                    'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </button>
                <span className={`text-[10px] font-bold whitespace-nowrap hidden sm:block ${active ? 'text-[#0B2545]' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm space-y-6">

          {/* ─── Step 1: Personal Details ─── */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Personal Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required>
                  <input type="text" name="fullName" required value={form.fullName} onChange={handleInput} placeholder="Dr. Vikramaditya Roy" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="Professional Email" required>
                  <input type="email" name="email" required value={form.email} onChange={handleInput} placeholder="vikram@careerguide.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="Mobile Number" required>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleInput} placeholder="+91 98200 00000" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="City & State">
                  <input type="text" name="city" value={form.city} onChange={handleInput} placeholder="New Delhi, Delhi" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
              </div>

              {/* Subscription Tier Choice */}
              <div className="pt-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">Select Counsellor Subscription Plan</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => set('subscriptionTier', 'FREE')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      form.subscriptionTier === 'FREE' ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Tier 1: Free Sign-Up</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">Public Directory Listing</h4>
                    <p className="text-xs text-slate-500 mt-1">Listed on search & explore directory. Portal tools and student intakes are locked.</p>
                  </div>

                  <div
                    onClick={() => set('subscriptionTier', 'PRO')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      form.subscriptionTier === 'PRO' ? 'bg-[#0B2545]/5 border-[#0B2545] ring-2 ring-[#0B2545]/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">Tier 2: Pro ($49/mo)</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">Full Portal & Intake Tools</h4>
                    <p className="text-xs text-slate-500 mt-1">Full portal access, tabular roadmap builder, intake reviewer, and test assignment.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── Step 2: Tracks & Bio (With Ability to Add Custom Tracks) ─── */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Specialization Tracks & Bio</h2>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Select Specialization Tracks ({form.tracks.length} Selected)
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  {availableTracksList.map(trackName => {
                    const isSelected = form.tracks.includes(trackName);
                    return (
                      <div
                        key={trackName}
                        onClick={() => toggleTrack(trackName)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs font-semibold ${
                          isSelected ? 'bg-amber-50 border-[#CFA25E] text-[#0B2545] font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{trackName}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#CFA25E] flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Add Custom Track Input Field */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1.5">Add Custom Mentorship Track:</span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTrackInput}
                      onChange={(e) => setNewTrackInput(e.target.value)}
                      placeholder="e.g. German DAAD Scholarships or Design & Architecture"
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTrack}
                      className="px-4 py-2 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Track
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Years of Experience" required>
                  <input type="number" name="experienceYears" min={1} value={form.experienceYears} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="Verified Placements Claimed">
                  <input type="number" name="claimedPlacements" min={0} value={form.claimedPlacements} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
              </div>

              <FormField label="Professional Bio (displayed on public profile)" required>
                <textarea rows={4} name="bio" value={form.bio} onChange={handleInput} placeholder="Describe your counselling approach, university specializations, and mentorship track..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545] resize-none" />
              </FormField>
            </div>
          )}

          {/* ─── Step 3: Links & Proofs (With Additional Links Repeater) ─── */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Additional Portfolio Links & Credentials</h2>

              <FormField label="Academic Credentials & Certifications" required>
                <textarea rows={2} name="credentials" value={form.credentials} onChange={handleInput} placeholder="e.g. M.A. in Psychology (DU), Certified Global Career Analyst (UCLA Extension)..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545] resize-none" />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="LinkedIn Profile URL">
                  <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleInput} placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="Website / Portfolio URL">
                  <input type="url" name="websiteUrl" value={form.websiteUrl} onChange={handleInput} placeholder="https://yourwebsite.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]" />
                </FormField>
                <FormField label="Publication / Article Link">
                  <input type="url" name="publicationUrl" value={form.publicationUrl} onChange={handleInput} placeholder="https://medium.com/..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]" />
                </FormField>
              </div>

              {/* Additional Portfolio Links Repeater */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                    Additional Links & Verification Proofs
                  </label>
                  <button
                    type="button"
                    onClick={handleAddLinkRow}
                    className="text-xs font-bold text-[#0B2545] hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Link
                  </button>
                </div>

                {form.additionalLinks.map((linkItem, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Link Label (e.g. Media Feature, YouTube)"
                      value={linkItem.label}
                      onChange={(e) => handleUpdateLinkRow(idx, 'label', e.target.value)}
                      className="w-1/3 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
                    />
                    <input
                      type="url"
                      placeholder="https://..."
                      value={linkItem.url}
                      onChange={(e) => handleUpdateLinkRow(idx, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
                    />
                    {form.additionalLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLinkRow(idx)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <UploadBox label="Sample Work (SOP Review / Shortlisting Sample)" hint="PDF Document · Max 10MB" accept=".pdf" icon={FileText} onChange={v => set('sampleFileName', v)} />
            </div>
          )}

          {/* ─── Step 4: Front & Back ID ─── */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Government ID Verification (Front & Back)</h2>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Both <strong>Front Picture</strong> and <strong>Back Picture</strong> of your Government ID (Aadhaar, Passport, PAN) are required for verification and escrow payout safety.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="ID Document Type" required>
                  <select name="govIdType" value={form.govIdType} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]">
                    <option>Aadhaar Card</option>
                    <option>Passport</option>
                    <option>PAN Card</option>
                    <option>Driving Licence</option>
                  </select>
                </FormField>
                <FormField label="ID Card Number" required>
                  <input type="text" name="govIdNumber" value={form.govIdNumber} onChange={handleInput} placeholder="XXXX-XXXX-XXXX" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0B2545]" />
                </FormField>
              </div>

              {/* Front ID and Back ID Picture Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <UploadBox label="Front Image of ID Picture" hint="JPG or PNG of Front side" accept=".jpg,.jpeg,.png,.pdf" icon={CreditCard} onChange={v => set('frontIdUrl', v)} />
                <UploadBox label="Back Image of ID Picture" hint="JPG or PNG of Back side" accept=".jpg,.jpeg,.png,.pdf" icon={CreditCard} onChange={v => set('backIdUrl', v)} />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer pt-3 border-t border-slate-100">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={e => set('agreeTerms', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#0B2545] cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I confirm that the submitted ID pictures and credentials are true and valid. Upon verification, matchEd will generate and email my login credentials.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 1}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-30 transition flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-slate-800 rounded-xl shadow-md transition flex items-center gap-1 cursor-pointer"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!form.agreeTerms}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Submit Application
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
