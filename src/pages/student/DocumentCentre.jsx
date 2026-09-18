import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FolderOpen, Upload, FileText, CheckCircle, AlertCircle, Eye, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';

export const DocumentCentre = () => {
  const { documents, addDocument, deleteDocument } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Academic Transcripts');
  const [uploadTitle, setUploadTitle] = useState('');
  const [fileName, setFileName] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [notice, setNotice] = useState('');

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    variant: 'danger',
    onConfirm: () => {}
  });

  const categories = [
    'Passport',
    'Academic Transcripts',
    'Mark Sheets',
    'Degree Certificates',
    'Resume / CV',
    'SOP',
    'LOR',
    'English Test Scores',
    'Standardised Test Scores',
    'Financial Documents',
    'Visa Documents',
    'Other'
  ];

  const showMsg = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 3000); };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    addDocument({
      category: selectedCategory,
      title: uploadTitle,
      fileName: fileName || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      fileSize: '1.8 MB',
      description: selectedCategory === 'Other' ? otherDescription : null
    });

    setUploadTitle('');
    setFileName('');
    setOtherDescription('');
    showMsg('Document uploaded for counsellor verification!');
  };

  const handleDeleteDoc = (doc) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Document',
      message: `Are you sure you want to permanently delete "${doc.title}"? Your counsellor will no longer have access to this file for admissions review.`,
      confirmText: 'Delete Document',
      variant: 'danger',
      onConfirm: () => {
        deleteDocument(doc.id);
        showMsg(`Document "${doc.title}" deleted.`);
      }
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#CFA25E]">Verified Records Repository</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">Document Centre</h1>
          <p className="text-xs text-slate-500">Upload academic transcripts, test proofs, and custom application materials for mentor review.</p>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-[#0B2545]" /> Upload Document for Admissions Review
        </h3>

        <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Document Category *</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Document Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. VJTI 6th Sem Marksheet"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">File Name (Mock upload)</label>
            <input
              type="text"
              placeholder="e.g. Marksheet_Sem6.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none"
            />
          </div>

          {/* Conditional Description for "Other" Category */}
          {selectedCategory === 'Other' && (
            <div className="sm:col-span-3 space-y-1 bg-amber-50/60 p-4 rounded-2xl border border-amber-200 animate-in fade-in">
              <label className="block font-bold uppercase text-amber-900 text-[11px] mb-1">
                Document Description & Explanation *
              </label>
              <textarea
                required
                rows={2}
                value={otherDescription}
                onChange={e => setOtherDescription(e.target.value)}
                placeholder="Explain what this custom document is (e.g. Patent publication, Patent grant certificate, Extra scholarship proof, Olympiad medal)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-amber-300 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#0B2545]"
              />
              <p className="text-[10px] text-amber-800">Please provide clear context so your assigned counsellor can review its relevance for admissions.</p>
            </div>
          )}

          <div className="sm:col-span-3 flex justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#CFA25E]" /> Upload Document
            </button>
          </div>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-[#CFA25E]" /> Uploaded Documents ({documents.length})
        </h3>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold text-[#0B2545] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    {doc.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate">{doc.title}</h4>
                </div>
                <p className="text-xs text-slate-500">{doc.fileName} • {doc.fileSize || '1.5 MB'} • Uploaded {doc.uploadedAt}</p>
                {doc.description && (
                  <p className="text-[11px] text-slate-700 bg-white p-2 rounded-xl border border-slate-200 mt-1">
                    <strong>Note:</strong> {doc.description}
                  </p>
                )}
                {doc.counsellorComment && (
                  <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200 italic mt-1 font-medium">
                    "Mentor Feedback: {doc.counsellorComment}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  doc.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : doc.status === 'Under Review'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}>
                  {doc.status}
                </span>

                <button
                  onClick={() => handleDeleteDoc(doc)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal for deletion */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        variant={confirmModal.variant}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(p => ({ ...p, isOpen: false }))}
      />
    </div>
  );
};
