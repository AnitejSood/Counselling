import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ShieldCheck, User, Mail, Phone, MapPin, Award, FileText, CheckCircle2, ChevronLeft, CreditCard } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const CounsellorDetailAdmin = () => {
  const { counsellors, verifiedProofs, escrowBookings } = useData();
  const { counsellorId } = useParams();

  const counsellor = counsellors.find(c => c.id === counsellorId) || counsellors[0];
  const proofs = verifiedProofs.filter(p => p.counsellorId === counsellor.id);
  const bookings = escrowBookings.filter(b => b.counsellorId === counsellor.id);

  return (
    <div className="space-y-8 w-full font-sans">
      <div className="flex items-center gap-3">
        <Link to="/admin/students" className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Internal Team Background Desk</span>
          <h1 className="text-2xl font-black text-slate-900">{counsellor.fullName}: Deep-Dive Background View</h1>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={counsellor.photoUrl} alt={counsellor.fullName} className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-slate-900 text-lg">{counsellor.fullName}</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                {counsellor.verificationStatus}
              </span>
            </div>
            <p className="text-xs text-indigo-600 font-semibold">{counsellor.title}</p>
            <p className="text-xs text-slate-500">{counsellor.contact?.email} · {counsellor.contact?.phone}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right text-xs space-y-1">
          <span className="text-slate-400 block font-bold uppercase text-[10px]">Active Subscription</span>
          <p className="font-extrabold text-slate-900 text-sm">{counsellor.subscriptionTier || 'PRO'}</p>
          <span className="text-emerald-700 font-bold block">{counsellor.verifiedPlacementsCount}+ Placements</span>
        </div>
      </div>

      {/* Internal Verification Audit Details */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Internal Compliance & Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Academic Credentials</span>
            <p className="font-semibold text-slate-800">{counsellor.credentials}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Specialization Track</span>
            <p className="font-semibold text-indigo-700">{counsellor.track}</p>
          </div>
        </div>
      </div>

      {/* Verified Offer Letters History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-sm font-bold text-slate-900">Submitted Offer Letter Proofs ({proofs.length})</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {proofs.map(p => (
            <div key={p.id} className="px-6 py-4 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{p.studentName} → {p.universityName}</p>
                <p className="text-[11px] text-slate-500">{p.program} · Uploaded {p.uploadedAt}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {p.verificationStatus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
