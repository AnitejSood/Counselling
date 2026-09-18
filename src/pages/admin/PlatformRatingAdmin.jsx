import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Star, MessageSquare, Sparkles, CheckCircle2, User } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';

export const PlatformRatingAdmin = () => {
  const { platformRatings } = useData();

  const ratingsList = (platformRatings && platformRatings.length > 0) ? platformRatings : [
    { id: 'pr_1', rating: 5, feedback: 'The verified offer letter transparency is outstanding. Found the perfect counselor for Imperial College.', userRole: 'STUDENT', userName: 'Rohan Mehta', createdAt: '2026-08-10' },
    { id: 'pr_2', rating: 5, feedback: 'Escrow holding provides peace of mind. Both student and advisor know funds are safe.', userRole: 'COUNSELLOR', userName: 'Arti Sood', createdAt: '2026-08-14' },
    { id: 'pr_3', rating: 4, feedback: 'Great platform! The 1-month switch guarantee gives tremendous confidence when starting out.', userRole: 'STUDENT', userName: 'Simran Kaur', createdAt: '2026-08-18' }
  ];

  const averageRating = (ratingsList.reduce((sum, r) => sum + r.rating, 0) / ratingsList.length).toFixed(1);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      <PageHeader
        eyebrow="Marketplace Quality & Feedback"
        title="Platform Ratings & User Reviews"
        subtitle="Track overall platform satisfaction, student Net Promoter Scores (NPS), and feedback on escrow, matching, and portal tools."
      />

      {/* Aggregate Score Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="text-4xl font-black text-[#0B2545] flex items-center gap-2">
            <span>{averageRating}</span>
            <Star className="w-8 h-8 fill-[#CFA25E] text-[#CFA25E]" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Overall matchEd Platform Rating</h3>
            <p className="text-xs text-slate-500">Based on {ratingsList.length} verified student and counsellor reviews</p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full font-bold text-xs border border-emerald-200">
            96% Positive CSAT
          </span>
        </div>
      </div>

      {/* Feed of Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Recent User Feedback</h4>
          <span className="text-xs text-slate-500">{ratingsList.length} reviews</span>
        </div>

        {ratingsList.map(item => (
          <div key={item.id} className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-xs">{item.userName}</span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  item.userRole === 'STUDENT' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {item.userRole}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{item.createdAt}</span>
            </div>

            <div className="flex items-center gap-1 text-[#CFA25E]">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#CFA25E]" />
              ))}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{item.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformRatingAdmin;
