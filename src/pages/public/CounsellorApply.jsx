import React, { useState } from 'react';
import {
  ShieldCheck, Upload, Send, CheckCircle2, Award, FileText,
  User, Mail, Phone, MapPin, Globe, Briefcase, BookOpen,
  CreditCard, Camera, AlertCircle, ChevronRight, ChevronLeft, Link as LinkIcon, Lock
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
    if (file) { setFileName(file.name); onChange && onChange(file.name); }
  };
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">{label}</label>
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 rounded-2xl p-5 text-center cursor-pointer transition-colors group">
        <input type="file" accept={accept} onChange={handleChange} className="hidden" />
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition mb-1.5" />
        {fileName ? (
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {fileName}
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

  const availableTracksList = [
    'Study abroad admissions (US, UK, Canada)',
    'Domestic India admissions (CUET, JEE, Liberal Arts)',
    'STEM & Ivy League Mentorship',
    'Sports quota & Athletic Scholarships',
    'MBA & Executive Education',
    'Medical & MBBS Abroad',
    'Undergraduate & High School Mentorship'
  ];

  const [form, setForm] = useState({
    // Step 1 — Personal
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    photoFile: '',

    // Step 2 — Tracks & Bio
    tracks: ['Study abroad admissions (US, UK, Canada)'],
    experienceYears: 5,
    claimedPlacements: 120,
    subscriptionTier: 'PRO', // FREE or PRO
    bio: '',

    // Step 3 — Links & Credentials
    credentials: '',
    linkedinUrl: '',
    websiteUrl: '',
    publicationUrl: '',
    sampleFileName: '',

    // Step 4 — Front & Back ID
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

  const handleSubmit = () => {
    const res = submitVerificationApp(form);
    setSubmittedData(res);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4 font-sans">
        <div className="max-w-2xl mx-auto text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Documents Uploaded & Application Submitted!</h2>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
            Our verification desk has received your Front ID, Back ID, tracks, and credentials.
          </p>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg text-left space-y-4 max-w-lg mx-auto mb-8">
            <div className="bg-indigo-50/80 p-4 rounded-2xl border border-indigo-100 flex items-start gap-3">
              <Lock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-900">
                <strong>Portal Credentials Generation Notice:</strong> Once your documents are verified by our team, your login credentials will be activated and emailed to <strong>{form.email}</strong>.
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-bold text-slate-900">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Plan:</span>
                <span className="font-bold text-emerald-700">{form.subscriptionTier === 'FREE' ? 'Tier 1: Free Public Directory' : 'Tier 2: Pro Portal Access ($49/mo)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Front & Back ID Status:</span>
                <span className="font-bold text-emerald-700">Uploaded for Verification</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification SLA:</span>
                <span className="font-bold text-slate-900">Within 24–48 Hours</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition"
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Counsellor Onboarding
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Apply to Join AspirantHQ</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Submit your Front & Back ID, track specializations, and additional portfolio links to access the portal.
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                    done ? 'bg-emerald-500 border-emerald-500 text-white' :
                    active ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' :
                    'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </button>
                <span className={`text-[10px] font-bold whitespace-nowrap hidden sm:block ${active ? 'text-indigo-600' : done ? 'text-emerald-600' : 'text-slate-400'}`}>
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
                  <input type="text" name="fullName" required value={form.fullName} onChange={handleInput} placeholder="Dr. Vikramaditya Roy" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="Professional Email" required>
                  <input type="email" name="email" required value={form.email} onChange={handleInput} placeholder="vikram@careerguide.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="Mobile Number" required>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleInput} placeholder="+91 98200 00000" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="City & State">
                  <input type="text" name="city" value={form.city} onChange={handleInput} placeholder="New Delhi, Delhi" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
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
                      form.subscriptionTier === 'PRO' ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
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

          {/* ─── Step 2: Tracks & Bio ─── */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Specialization Tracks & Bio</h2>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">Select Specialization Tracks (Multi-Select)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableTracksList.map(trackName => {
                    const isSelected = form.tracks.includes(trackName);
                    return (
                      <div
                        key={trackName}
                        onClick={() => toggleTrack(trackName)}
                        className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between text-xs font-semibold ${
                          isSelected ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{trackName}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Years of Experience" required>
                  <input type="number" name="experienceYears" min={1} value={form.experienceYears} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="Verified Placements Claimed">
                  <input type="number" name="claimedPlacements" min={0} value={form.claimedPlacements} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
                </FormField>
              </div>

              <FormField label="Professional Bio (displayed on public profile)" required>
                <textarea rows={4} name="bio" value={form.bio} onChange={handleInput} placeholder="Describe your counselling approach, university specializations, and mentorship track..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
              </FormField>
            </div>
          )}

          {/* ─── Step 3: Links & Proofs ─── */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Additional Portfolio Links & Credentials</h2>

              <FormField label="Academic Credentials & Certifications" required>
                <textarea rows={2} name="credentials" value={form.credentials} onChange={handleInput} placeholder="e.g. M.A. in Psychology (DU), Certified Global Career Analyst (UCLA Extension)..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none" />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="LinkedIn Profile URL">
                  <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleInput} placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="Website / Portfolio URL">
                  <input type="url" name="websiteUrl" value={form.websiteUrl} onChange={handleInput} placeholder="https://yourwebsite.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500" />
                </FormField>
                <FormField label="Publication / Article Link">
                  <input type="url" name="publicationUrl" value={form.publicationUrl} onChange={handleInput} placeholder="https://medium.com/..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500" />
                </FormField>
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
                  <select name="govIdType" value={form.govIdType} onChange={handleInput} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500">
                    <option>Aadhaar Card</option>
                    <option>Passport</option>
                    <option>PAN Card</option>
                    <option>Driving Licence</option>
                  </select>
                </FormField>
                <FormField label="ID Card Number" required>
                  <input type="text" name="govIdNumber" value={form.govIdNumber} onChange={handleInput} placeholder="XXXX-XXXX-XXXX" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
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
                  className="mt-0.5 w-4 h-4 accent-indigo-600 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I confirm that the submitted ID pictures and credentials are true and valid. Upon verification, AspirantHQ will generate and email my login credentials.
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
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl disabled:opacity-30 transition flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition flex items-center gap-1"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!form.agreeTerms}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-2"
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
