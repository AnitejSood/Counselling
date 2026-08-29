import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Star, ShieldCheck, DollarSign, MessageSquare, TrendingUp, Send, CheckCircle2, Zap, Crown, ArrowRight } from 'lucide-react';
import { BoostManager } from '../../features/counsellor/components/BoostManager';
import { SubscriptionTierModal } from '../../features/billing/components/SubscriptionTierModal';
import { SUBSCRIPTION_TIERS } from '../../config/subscriptionTiers';

export const CounsellorAnalytics = () => {
  const { counsellors, reviews, replyToReview, escrowBookings } = useData();
  const counsellor = counsellors[0];
  const counsellorReviews = reviews.filter(r => r.counsellorId === counsellor.id);

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);
  const [showTierModal, setShowTierModal] = useState(false);

  const currentTierConfig = SUBSCRIPTION_TIERS[counsellor.subscriptionTier] || SUBSCRIPTION_TIERS.PRO;

  const handleReplySubmit = (e, reviewId) => {
    e.preventDefault();
    replyToReview(reviewId, replyText);
    setActiveReplyId(null);
    setReplyText('');
    setReplySuccess(true);
    setTimeout(() => setReplySuccess(false), 3000);
  };

  const totalEarnings = escrowBookings.reduce((sum, b) => sum + b.amount, 0);
  const platformFeeAmount = totalEarnings * currentTierConfig.commissionRate;
  const netEarnings = totalEarnings - platformFeeAmount;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Counsellor Step 8</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Ratings, Right-of-Reply & Subscription Tier</h1>
        </div>

        {/* Tier Upgrade Button */}
        <button 
          onClick={() => setShowTierModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          Subscription: {currentTierConfig.name}
        </button>
      </div>

      {/* Subscription & Fee Breakdown Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-extrabold text-slate-900 text-base">Active Tier: {currentTierConfig.name}</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {(currentTierConfig.commissionRate * 100)}% Low Escrow Fee Rate
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Net Earnings after {(currentTierConfig.commissionRate * 100)}% platform commission: <strong>₹{netEarnings.toLocaleString('en-IN')}</strong> (Gross: ₹{totalEarnings.toLocaleString('en-IN')})
          </p>
        </div>

        <button 
          onClick={() => setShowTierModal(true)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl flex items-center gap-1"
        >
          Manage Tier & Perks <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Boosting Manager Widget */}
      <BoostManager counsellorId={counsellor.id} />

      {replySuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Right-of-Reply published! Your response is now publicly visible under the student's review.</span>
        </div>
      )}

      {/* Analytics Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Overall Rating</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900">{counsellor.rating}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs text-slate-500 font-medium">From {counsellor.reviewCount} verified reviews</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Verified Placements</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-700">{counsellor.verifiedPlacementsCount}+</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xs text-emerald-800 font-medium">Audited offer letters</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Gross Escrow Volume</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            ₹{totalEarnings.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 font-medium">Held & released post-session</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Conversion Rate</span>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">18.4%</div>
          <span className="text-xs text-slate-500 font-medium">Profile views → Bookings</span>
        </div>
      </div>

      {/* Reviews & Right-of-Reply Feed */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Student Reviews & Right-of-Reply Portal</h2>

        <div className="space-y-6">
          {counsellorReviews.map(rev => (
            <div key={rev.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{rev.studentName}</span>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-xs text-slate-700">{rev.content}</p>

              {/* Display existing reply or reply form */}
              {rev.counsellorReply ? (
                <div className="bg-white border-l-2 border-indigo-600 p-3 rounded-r-xl text-xs">
                  <span className="font-bold text-slate-900 block mb-1">Your Published Reply:</span>
                  <p className="text-slate-600">{rev.counsellorReply}</p>
                </div>
              ) : activeReplyId === rev.id ? (
                <form onSubmit={(e) => handleReplySubmit(e, rev.id)} className="space-y-2 pt-2">
                  <textarea 
                    rows={2}
                    required
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Write your professional right-of-reply response..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button"
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Publish Reply
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setActiveReplyId(rev.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Add Right-of-Reply
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Tier Upgrade Modal */}
      {showTierModal && (
        <SubscriptionTierModal 
          currentTier={counsellor.subscriptionTier}
          counsellorId={counsellor.id}
          onClose={() => setShowTierModal(false)}
        />
      )}
    </div>
  );
};
