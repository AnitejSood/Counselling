import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FolderOpen, Upload, FileText, CheckCircle, AlertCircle, Eye, Trash2 } from 'lucide-react';

export const DocumentCentre = () => {
  const { documents, uploadDocument } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Academic Transcripts');
  const [uploadTitle, setUploadTitle] = useState('');
  const [fileName, setFileName] = useState('');

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

  const handleUpload = (e) => {
    e.preventDefault();
    uploadDocument(selectedCategory, uploadTitle, fileName || 'Uploaded_Document.pdf');
    setUploadTitle('');
    setFileName('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Document Management</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Document Centre</h1>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" /> Upload New Document for Review
        </h3>

        <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Document Title</label>
            <input
              type="text"
              required
              placeholder="e.g. VJTI 6th Sem Marksheet"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">File Name</label>
            <input
              type="text"
              placeholder="e.g. Marksheet_Sem6.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              Upload Document Now
            </button>
          </div>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Uploaded Documents ({documents.length})</h3>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">{doc.category}</span>
                  <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                </div>
                <p className="text-xs text-slate-500">{doc.fileName} • {doc.fileSize} • Uploaded {doc.uploadedAt}</p>
                {doc.counsellorComment && (
                  <p className="text-xs text-slate-700 italic">"Arti Sood Feedback: {doc.counsellorComment}"</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  doc.status === 'Approved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : doc.status === 'Under Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
