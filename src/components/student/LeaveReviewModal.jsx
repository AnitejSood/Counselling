import React, { useState } from 'react';
import { Star, X, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const LeaveReviewModal = ({ counsellorId, counsellorName, onClose }) => {
  const { addReview } = useData();

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState(["responsive", "SOP feedback quality"]);
  const [content, setContent] = useState('');
  const [outcomeText, setOutcomeText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableTags = ["responsive", "SOP feedback quality", "realistic expectations", "top university strategy", "fast turnarounds"];

  const toggleTag = (t) => {
    if (selectedTags.includes(t)) {
      setSelectedTags(prev => prev.filter(item => item !== t));
    } else {
      setSelectedTags(prev => [...prev, t]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(counsellorId, rating, selectedTags, content, outcomeText);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" /> Student Step 8: Verified Review
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-1">Review Your Experience with {counsellorName}</h2>
        <p className="text-xs text-slate-500 mb-6">
          Only platform-verified paid bookings can submit reviews to prevent fake rating manipulation.
        </p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center text-emerald-900">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-base mb-1">Review Submitted!</h3>
            <p className="text-xs text-slate-600">
              Thank you for contributing to our platform trust network. Your review and outcome seal are now live on {counsellorName}'s profile.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Overall Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-7 h-7 ${star <= rating ? 'fill-amber-400' : 'text-slate-200 fill-slate-100'}`} />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
              </div>
            </div>

            {/* Track Specific Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Track-Specific Performance Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedTags.includes(t) ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Content */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Detailed Review Feedback</label>
              <textarea 
                rows={3}
                required
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share how your session went, feedback quality, and counsellor responsiveness..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Optional Outcome Update */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Optional Outcome Update (Feeds into Verification Pipeline)</label>
              <input 
                type="text"
                value={outcomeText}
                onChange={e => setOutcomeText(e.target.value)}
                placeholder="e.g. Admitted to Purdue University with $24k Scholarship"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Publish Verified Review
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
