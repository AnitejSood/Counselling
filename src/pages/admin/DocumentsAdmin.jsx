import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FolderOpen, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { EmptyState } from '../../components/ui/EmptyState';

const STATUS_OPTIONS = ['Under Review', 'Verified', 'Changes Required', 'Rejected'];

export const DocumentsAdmin = () => {
  const { documents, updateDocumentStatus, verifiedProofs } = useData();
  const [selected, setSelected] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [notice, setNotice] = useState('');

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleAction = (docId, status) => {
    updateDocumentStatus(docId, status, commentInput);
    setSelected(null);
    setCommentInput('');
    showMsg(`Document marked as "${status}"`);
  };

  const pending = documents.filter(d => d.status === 'Under Review').length;
  const verified = documents.filter(d => d.status === 'Verified').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in">
      <PageHeader
        eyebrow="Document Audit"
        title="Offer Letter & Document Audits"
        subtitle="Review uploaded student documents, verify offer letters, and flag issues."
      />

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" /> {notice}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: pending, color: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'Verified', value: verified, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Verified Proofs', value: verifiedProofs.length, color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
        ].map(s => (
          <div key={s.label} className={`p-4 rounded-2xl border text-center ${s.color}`}>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map(doc => (
          <div key={doc.id} className={`card p-5 space-y-3 transition ${selected === doc.id ? 'ring-2 ring-purple-400' : ''}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{doc.name}</p>
                <p className="text-[11px] text-slate-500">{doc.category} · Uploaded {doc.uploadedAt}</p>
                {doc.counsellorComment && (
                  <p className="text-[11px] text-indigo-700 bg-indigo-50 rounded-lg px-2 py-1 mt-1">
                    Note: {doc.counsellorComment}
                  </p>
                )}
              </div>
              <StatusBadge status={doc.status} />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setSelected(selected === doc.id ? null : doc.id)} className="btn btn-ghost text-[11px] flex-1">
                <Eye className="w-3.5 h-3.5" /> {selected === doc.id ? 'Close' : 'Review'}
              </button>
              <button onClick={() => handleAction(doc.id, 'Verified')} className="btn btn-secondary py-1.5 px-3 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verify
              </button>
              <button onClick={() => handleAction(doc.id, 'Changes Required')} className="btn btn-danger py-1.5 px-3 text-[11px]">
                <XCircle className="w-3.5 h-3.5" /> Flag
              </button>
            </div>

            {selected === doc.id && (
              <div className="border-t border-slate-100 pt-3 space-y-2 animate-slide-up">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Admin Comment</label>
                <input
                  type="text"
                  placeholder="e.g. Signature page missing, please re-upload..."
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  className="input text-[11px]"
                />
                <div className="flex gap-2">
                  {STATUS_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => handleAction(doc.id, s)}
                      className="btn btn-ghost text-[10px] py-1 px-2.5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Verified Proofs */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Verified Placement Proofs ({verifiedProofs.length})</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {verifiedProofs.map(prf => (
            <div key={prf.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{prf.studentName} → {prf.universityName}</p>
                <p className="text-[11px] text-slate-500">{prf.program} · Uploaded {prf.uploadedAt}</p>
              </div>
              <span className="badge badge-emerald">{prf.verificationStatus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
