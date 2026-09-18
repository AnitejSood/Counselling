import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  ShieldCheck, Upload, CheckCircle2, Award, FileText,
  Plus, Trash2, ExternalLink, AlertCircle, Eye, Hash, Sparkles
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatDate } from '../../lib/formatters';

const UploadBox = ({ label, hint, onChange }) => {
  const [fileName, setFileName] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFileName(file.name); onChange && onChange(file.name); }
  };
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-[#CFA25E] bg-slate-50 rounded-2xl p-5 text-center cursor-pointer transition-colors group">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
        <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#0B2545] transition mb-1.5" />
        {fileName ? (
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {fileName}
          </span>
        ) : (
          <>
            <span className="text-xs font-bold text-slate-700">Click to upload</span>
            <span className="text-[11px] text-slate-400">{hint}</span>
          </>
        )}
      </label>
    </div>
  );
};

export const ProofUploader = () => {
  const { uploadVerifiedProof, verifiedProofs, counsellors, documents, addDocument, updateDocumentStatus } = useData();

  const [proofForm, setProofForm] = useState({
    studentName: '',
    universityName: '',
    program: '',
    intakeYear: '',
    fileName: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [docForm, setDocForm] = useState({ name: '', category: 'Offer Letter', studentName: '' });
  const [notice, setNotice] = useState('');
  const [showDocForm, setShowDocForm] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleUploadProof = (e) => {
    e.preventDefault();
    uploadVerifiedProof(
      counsellors[0].id,
      proofForm.studentName,
      proofForm.universityName,
      proofForm.program,
      proofForm.fileName || `${proofForm.universityName.replace(/\s/g, '_')}_Offer_Letter.pdf`
    );
    setProofForm({ studentName: '', universityName: '', program: '', intakeYear: '', fileName: '' });
    setSubmitted(true);
    showMsg('Offer letter uploaded! Verified placement count updated on public profile.');
    setTimeout(() => setSubmitted(false), 3500);
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    addDocument({ ...docForm, uploadedAt: new Date().toISOString().split('T')[0] });
    setDocForm({ name: '', category: 'Offer Letter', studentName: '' });
    setShowDocForm(false);
    showMsg('Document added to student record!');
  };

  const verifiedCount = verifiedProofs.length;

  return (
    <div className="space-y-8 w-full font-sans">
      <PageHeader
        eyebrow="matchEd Placement Audit & Proof Counter"
        title="Offer Letter Audit & Verified Proof Counter"
        subtitle="Upload verified student offer letters to audit your admissions credentials and grow your public verified placement count badge."
      />

      {/* Proof Counter Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-[#0B2545] flex items-center justify-center font-black text-xl shadow-inner">
            {verifiedCount}
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-[#0B2545] tracking-wider">Verified Placement Proof Counter</span>
            <h3 className="text-lg font-bold text-slate-900">{verifiedCount} Official Offer Letters Verified</h3>
            <p className="text-xs text-slate-500">Displayed on your public matchEd marketplace profile badge.</p>
          </div>
        </div>
        <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 flex items-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Audit Verified Active
        </span>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {['upload', 'documents', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
              activeTab === tab ? 'bg-[#0B2545] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-300'
            }`}
          >
            {tab === 'upload' ? 'Upload Proof' : tab === 'documents' ? 'Student Documents' : 'Proof History'}
          </button>
        ))}
      </div>

      {/* ─── Upload Proof Tab ─── */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900">Submit New Offer Letter / Admission Proof</h2>
          <form onSubmit={handleUploadProof} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">Student Full Name *</label>
                <input required type="text" value={proofForm.studentName}
                  onChange={e => setProofForm(p => ({ ...p, studentName: e.target.value }))}
                  placeholder="e.g. Rohan Mehta" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">University / Institution *</label>
                <input required type="text" value={proofForm.universityName}
                  onChange={e => setProofForm(p => ({ ...p, universityName: e.target.value }))}
                  placeholder="e.g. Imperial College London" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">Program & Degree *</label>
                <input required type="text" value={proofForm.program}
                  onChange={e => setProofForm(p => ({ ...p, program: e.target.value }))}
                  placeholder="e.g. MS in Artificial Intelligence" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1.5">Intake Year</label>
                <input type="text" value={proofForm.intakeYear}
                  onChange={e => setProofForm(p => ({ ...p, intakeYear: e.target.value }))}
                  placeholder="e.g. Fall 2026" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none" />
              </div>
            </div>

            <UploadBox
              label="Upload Official Offer Letter or Admission Portal Screenshot *"
              hint="PDF, JPG or PNG · Max 10MB · Must show student name & institution"
              onChange={v => setProofForm(p => ({ ...p, fileName: v }))}
            />

            <button type="submit" className="w-full py-3 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#CFA25E]" /> Submit for Verification Audit
            </button>
          </form>
        </div>
      )}

      {/* ─── Student Documents Tab ─── */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-sm font-bold text-slate-900">Student Document Records ({documents.length})</h2>
            <button onClick={() => setShowDocForm(!showDocForm)} className="px-3.5 py-1.5 bg-[#0B2545] text-white rounded-xl text-xs font-bold shadow-sm">
              + Add Document Record
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {documents.map(doc => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">{doc.title || doc.name}</p>
                  <p className="text-[11px] text-slate-500">{doc.category} · {doc.uploadedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={doc.status}
                    onChange={e => { updateDocumentStatus(doc.id, e.target.value); showMsg('Status updated!'); }}
                    className="text-[11px] font-bold border border-slate-200 bg-white rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
                  >
                    <option>Under Review</option>
                    <option>Verified</option>
                    <option>Changes Required</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── History Tab ─── */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-sm font-bold text-[#0B2545]">Verified Proof Audit History ({verifiedProofs.length})</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {verifiedProofs.map(prf => (
              <div key={prf.id} className="px-6 py-4 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">{prf.studentName} → {prf.universityName}</p>
                  <p className="text-[11px] text-slate-500">{prf.program} · Uploaded {prf.uploadedAt}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                  {prf.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

