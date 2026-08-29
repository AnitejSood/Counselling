import React, { useState } from 'react';
import {
  ShieldCheck, Upload, Send, CheckCircle2, Award, FileText,
  User, Mail, Phone, MapPin, Globe, Briefcase, BookOpen,
  CreditCard, Camera, AlertCircle, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const STEPS = [
  { id: 1, label: 'Personal Details', icon: User },
  { id: 2, label: 'Professional Info', icon: Briefcase },
  { id: 3, label: 'Credentials & Proof', icon: BookOpen },
  { id: 4, label: 'ID Verification', icon: CreditCard },
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
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 rounded-2xl p-6 text-center cursor-pointer transition-colors group">
        <input type="file" accept={accept} onChange={handleChange} className="hidden" />
        <Icon className="w-7 h-7 text-slate-400 group-hover:text-indigo-500 transition mb-2" />
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

  const [form, setForm] = useState({
    // Step 1 — Personal
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    linkedinUrl: '',
    photoFile: '',

    // Step 2 — Professional
    track: 'Study abroad admissions',
    experienceYears: 5,
    claimedPlacements: 0,
    currentOrganization: '',
    jobTitle: '',
    bio: '',
    languages: '',
    timezone: 'IST (UTC+5:30)',

    // Step 3 — Credentials
    credentials: '',
    certifications: '',
    sampleFileName: '',
    degreeFile: '',
    references: '',

    // Step 4 — ID Verification
    govIdType: 'Aadhaar Card',
    govIdNumber: '',
    govIdFile: '',
    panNumber: '',
    panFile: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankIFSC: '',
    agreeTerms: false,
  });

  const set = (field, value) => setForm(p => ({ ...p, [field]: value }));
  const handleInput = e => set(e.target.name, e.target.value);

  const handleSubmit = () => {
    submitVerificationApp(form);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Application Submitted!</h2>
          <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto">
            Our verification team will review your credentials, ID documents, and past work samples within 24–48 hours.
            You'll receive an email update at <strong>{form.email}</strong>.
          </p>
          <div className="card p-6 text-left space-y-3 max-w-md mx-auto">
            <p className="text-sm font-bold text-slate-900">What happens next?</p>
            {[
              'Admin reviews your ID and credentials',
              'Audit team verifies 3 placement proofs',
              'You get onboarded with a Verified badge',
              'Your profile goes live on the marketplace'
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Counsellor Application
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Join the AspirantHQ Marketplace</h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">
            Complete all 4 sections. All documents are reviewed by our verification team before your profile goes live.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
          {STEPS.map((s, i) => {
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

        {/* Card */}
        <div className="card p-7 sm:p-10 space-y-6">

          {/* ─── Step 1: Personal Details ─── */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Personal Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required>
                  <input type="text" name="fullName" required value={form.fullName} onChange={handleInput} placeholder="Dr. Vikramaditya Roy" className="input" />
                </FormField>
                <FormField label="Professional Email" required>
                  <input type="email" name="email" required value={form.email} onChange={handleInput} placeholder="vikram@careerguide.com" className="input" />
                </FormField>
                <FormField label="Mobile Number" required>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleInput} placeholder="+91 98200 00000" className="input" />
                </FormField>
                <FormField label="City">
                  <input type="text" name="city" value={form.city} onChange={handleInput} placeholder="New Delhi" className="input" />
                </FormField>
                <FormField label="State">
                  <input type="text" name="state" value={form.state} onChange={handleInput} placeholder="Delhi" className="input" />
                </FormField>
                <FormField label="Pincode">
                  <input type="text" name="pincode" value={form.pincode} onChange={handleInput} placeholder="110001" className="input" />
                </FormField>
                <FormField label="LinkedIn Profile URL">
                  <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleInput} placeholder="https://linkedin.com/in/yourprofile" className="input" />
                </FormField>
              </div>
              <UploadBox label="Profile Photo" hint="JPG or PNG, min 400×400px" accept=".jpg,.jpeg,.png" icon={Camera} onChange={v => set('photoFile', v)} />
            </div>
          )}

          {/* ─── Step 2: Professional Info ─── */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Professional Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Primary Specialty Track" required>
                  <select name="track" value={form.track} onChange={handleInput} className="input">
                    <option>Study abroad admissions</option>
                    <option>Domestic India admissions</option>
                    <option>Sports quota admissions</option>
                    <option>International athletic scholarships</option>
                    <option>MBA & Executive Education</option>
                    <option>Medical & MBBS Abroad</option>
                    <option>Scholarship Consulting</option>
                  </select>
                </FormField>
                <FormField label="Years of Experience" required>
                  <input type="number" name="experienceYears" min={1} value={form.experienceYears} onChange={handleInput} className="input" />
                </FormField>
                <FormField label="Current Organization / Practice">
                  <input type="text" name="currentOrganization" value={form.currentOrganization} onChange={handleInput} placeholder="e.g. Career Compass LLP" className="input" />
                </FormField>
                <FormField label="Job Title / Designation">
                  <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleInput} placeholder="e.g. Senior Education Consultant" className="input" />
                </FormField>
                <FormField label="Verified Placements Claimed">
                  <input type="number" name="claimedPlacements" min={0} value={form.claimedPlacements} onChange={handleInput} className="input" />
                </FormField>
                <FormField label="Languages Spoken">
                  <input type="text" name="languages" value={form.languages} onChange={handleInput} placeholder="e.g. English, Hindi, Punjabi" className="input" />
                </FormField>
              </div>
              <FormField label="Professional Bio (displayed on public profile)" required>
                <textarea rows={4} name="bio" value={form.bio} onChange={handleInput} placeholder="Describe your expertise, approach, and what sets your counselling apart..." className="input resize-none" />
              </FormField>
            </div>
          )}

          {/* ─── Step 3: Credentials & Proof ─── */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Credentials & Sample Work</h2>
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Verification Standard
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We verify your academic credentials, professional certifications, and audit a sample of your past work (SOP annotations, shortlist strategies). All documents are kept confidential.
                </p>
              </div>

              <FormField label="Degrees & Academic Qualifications" required>
                <textarea rows={2} name="credentials" value={form.credentials} onChange={handleInput}
                  placeholder="e.g. M.A. Applied Psychology (DU), Certified Global Career Analyst (UCLA Extension)..." className="input resize-none" />
              </FormField>
              <FormField label="Professional Certifications (if any)">
                <textarea rows={2} name="certifications" value={form.certifications} onChange={handleInput}
                  placeholder="e.g. IECA Provisional Member, AIRC Member, NACAC..." className="input resize-none" />
              </FormField>
              <FormField label="Professional References (Name, Organization, Contact)">
                <textarea rows={2} name="references" value={form.references} onChange={handleInput}
                  placeholder="e.g. Dr. Suresh Patel, AIIMS, +91 98200 00000" className="input resize-none" />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UploadBox label="Degree Certificate(s)" hint="PDF, JPG or PNG · Max 10MB" accept=".pdf,.jpg,.jpeg,.png" icon={FileText} onChange={v => set('degreeFile', v)} />
                <UploadBox label="Sample Past Work (SOP Review / Shortlist)" hint="PDF document · Max 10MB" accept=".pdf" icon={Upload} onChange={v => set('sampleFileName', v)} />
              </div>
            </div>
          )}

          {/* ─── Step 4: ID Verification ─── */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">Identity & Banking Details</h2>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Government ID and banking details are required for KYC verification and platform escrow payout processing. All data is encrypted and stored securely. We comply with RBI and DPDP Act guidelines.
                </p>
              </div>

              {/* Government ID */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Government ID (KYC)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="ID Type" required>
                    <select name="govIdType" value={form.govIdType} onChange={handleInput} className="input">
                      <option>Aadhaar Card</option>
                      <option>PAN Card</option>
                      <option>Passport</option>
                      <option>Driving Licence</option>
                      <option>Voter ID</option>
                    </select>
                  </FormField>
                  <FormField label="ID Number" required>
                    <input type="text" name="govIdNumber" value={form.govIdNumber} onChange={handleInput}
                      placeholder="XXXX XXXX XXXX" className="input" />
                  </FormField>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <UploadBox label="Upload Gov. ID (Front)" hint="JPG, PNG or PDF" accept=".jpg,.jpeg,.png,.pdf" icon={CreditCard} onChange={v => set('govIdFile', v)} />
                  <div className="space-y-4">
                    <FormField label="PAN Number">
                      <input type="text" name="panNumber" value={form.panNumber} onChange={handleInput}
                        placeholder="ABCDE1234F" className="input" />
                    </FormField>
                    <UploadBox label="Upload PAN Card" hint="JPG, PNG or PDF" accept=".jpg,.jpeg,.png,.pdf" icon={CreditCard} onChange={v => set('panFile', v)} />
                  </div>
                </div>
              </div>

              {/* Banking */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Bank Account (for escrow payouts)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormField label="Account Holder Name" required>
                    <input type="text" name="bankAccountName" value={form.bankAccountName} onChange={handleInput}
                      placeholder="Full legal name" className="input" />
                  </FormField>
                  <FormField label="Account Number" required>
                    <input type="text" name="bankAccountNumber" value={form.bankAccountNumber} onChange={handleInput}
                      placeholder="XXXXXXXXXXXXXXXX" className="input" />
                  </FormField>
                  <FormField label="IFSC Code" required>
                    <input type="text" name="bankIFSC" value={form.bankIFSC} onChange={handleInput}
                      placeholder="HDFC0001234" className="input" />
                  </FormField>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={e => set('agreeTerms', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-indigo-600 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I confirm that all information provided is accurate and complete. I agree to AspirantHQ's{' '}
                  <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Counsellor Terms of Service</span>,{' '}
                  <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Privacy Policy</span>, and{' '}
                  <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Marketplace Code of Conduct</span>.
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
              className="btn btn-ghost disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="btn btn-primary"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!form.agreeTerms}
                className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Submit Application
              </button>
            )}
          </div>
        </div>

        {/* Trust footer */}
        <div className="flex items-center justify-center gap-6 mt-8 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> KYC Verified</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Escrow Protected</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> DPDP Act Compliant</span>
        </div>
      </div>
    </div>
  );
};
