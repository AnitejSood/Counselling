import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  ShieldCheck, Upload, CheckCircle2, Award, FileText,
  Plus, Trash2, ExternalLink, AlertCircle, Eye
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
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50 rounded-2xl p-5 text-center cursor-pointer transition-colors group">
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="hidden" />
        <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition mb-1.5" />
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

  const myDocs = documents; // All docs counsellor manages

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Placement Verification"
        title="Offer Letter Audit & Proof Centre"
        subtitle="Upload verified offer letters to grow your verified placement count. Manage all student documents."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Why This Matters */}
      <div className="card p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Why submit proof?</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Every verified placement proof increases your public <strong>"Verified Placements"</strong> badge count, 
            boosts your marketplace ranking, and builds student trust. Students can see verified outcomes on your profile — 
            this is your most powerful credibility signal.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['upload', 'documents', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-[11px] font-bold capitalize transition ${
              activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-emerald-300'
            }`}
          >
            {tab === 'upload' ? 'Upload Proof' : tab === 'documents' ? 'Student Documents' : 'Proof History'}
          </button>
        ))}
      </div>

      {/* ─── Upload Proof Tab ─── */}
      {activeTab === 'upload' && (
        <div className="card p-7 space-y-6">
          <h2 className="text-sm font-bold text-slate-900">Submit New Offer Letter / Admission Proof</h2>
          <form onSubmit={handleUploadProof} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Student Full Name *</label>
                <input required type="text" value={proofForm.studentName}
                  onChange={e => setProofForm(p => ({ ...p, studentName: e.target.value }))}
                  placeholder="e.g. Rohan Mehta" className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">University / Institution *</label>
                <input required type="text" value={proofForm.universityName}
                  onChange={e => setProofForm(p => ({ ...p, universityName: e.target.value }))}
                  placeholder="e.g. Imperial College London" className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Program & Degree *</label>
                <input required type="text" value={proofForm.program}
                  onChange={e => setProofForm(p => ({ ...p, program: e.target.value }))}
                  placeholder="e.g. MS in Artificial Intelligence" className="input" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Intake Year</label>
                <input type="text" value={proofForm.intakeYear}
                  onChange={e => setProofForm(p => ({ ...p, intakeYear: e.target.value }))}
                  placeholder="e.g. Fall 2026" className="input" />
              </div>
            </div>

            <UploadBox
              label="Upload Official Offer Letter or Admission Portal Screenshot *"
              hint="PDF, JPG or PNG · Max 10MB · Must show student name & institution"
              onChange={v => setProofForm(p => ({ ...p, fileName: v }))}
            />

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                Documents submitted here go to the <strong>AspirantHQ Verification Desk</strong> for audit within 24–48 hours.
                After verification, your public profile's "Verified Placements" count increases automatically.
              </p>
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center text-sm py-3">
              <ShieldCheck className="w-4 h-4" /> Submit for Verification Audit
            </button>
          </form>
        </div>
      )}

      {/* ─── Student Documents Tab ─── */}
      {activeTab === 'documents' && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Student Document Records ({myDocs.length})</h2>
            <button onClick={() => setShowDocForm(!showDocForm)} className="btn btn-secondary py-1.5 px-3 text-[11px]">
              <Plus className="w-3.5 h-3.5" /> Add Document Record
            </button>
          </div>

          {showDocForm && (
            <form onSubmit={handleAddDoc} className="border-b border-slate-200 p-5 bg-emerald-50/30 space-y-3 animate-slide-up">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Document Name *</label>
                  <input required type="text" value={docForm.name} onChange={e => setDocForm(p => ({ ...p, name: e.target.value }))} className="input" placeholder="e.g. B.Tech Transcript" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Category</label>
                  <select value={docForm.category} onChange={e => setDocForm(p => ({ ...p, category: e.target.value }))} className="input">
                    <option>Offer Letter</option>
                    <option>Academic Transcript</option>
                    <option>SOP Draft</option>
                    <option>LOR</option>
                    <option>Visa Documents</option>
                    <option>Scholarship Letter</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Student Name</label>
                  <input type="text" value={docForm.studentName} onChange={e => setDocForm(p => ({ ...p, studentName: e.target.value }))} className="input" placeholder="Student name" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowDocForm(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Record</button>
              </div>
            </form>
          )}

          <div className="divide-y divide-slate-100">
            {myDocs.length === 0 && (
              <EmptyState icon={FileText} title="No documents" message="Add student document records above." />
            )}
            {myDocs.map(doc => (
              <div key={doc.id} className="px-6 py-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">{doc.name}</p>
                  <p className="text-[11px] text-slate-500">{doc.category} · {doc.uploadedAt}</p>
                  {doc.counsellorComment && (
                    <p className="text-[11px] text-indigo-700 bg-indigo-50 rounded-lg px-2 py-1 mt-1">{doc.counsellorComment}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={doc.status}
                    onChange={e => { updateDocumentStatus(doc.id, e.target.value); showMsg('Status updated!'); }}
                    className="text-[11px] font-bold border border-slate-200 bg-white rounded-xl px-3 py-1.5 focus:outline-none"
                  >
                    <option>Under Review</option>
                    <option>Verified</option>
                    <option>Changes Required</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── History Tab ─── */}
      {activeTab === 'history' && (
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Verified Proof Audit History ({verifiedProofs.length})</h2>
          </div>
          {verifiedProofs.length === 0 ? (
            <EmptyState icon={ShieldCheck} title="No verified proofs yet" message="Submit your first offer letter above to start building your track record." />
          ) : (
            <div className="divide-y divide-slate-100">
              {verifiedProofs.map(prf => (
                <div key={prf.id} className="px-6 py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{prf.studentName} → {prf.universityName}</p>
                    <p className="text-[11px] text-slate-500">{prf.program} · Uploaded {prf.uploadedAt}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Verified by: {prf.verifiedBy}</p>
                  </div>
                  <span className="badge badge-emerald">
                    <ShieldCheck className="w-3 h-3" /> {prf.verificationStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
