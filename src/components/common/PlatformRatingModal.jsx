import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Star, CheckCircle2, X, Sparkles, MessageSquare } from 'lucide-react';

export const PlatformRatingModal = ({ isOpen, onClose, userRole = 'STUDENT', userName = 'Student' }) => {
  const { submitPlatformRating } = useData();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitPlatformRating) {
      submitPlatformRating(rating, feedback, userRole);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-in zoom-in-95 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Thank you for rating matchEd!</h3>
            <p className="text-xs text-slate-500">Your feedback helps us maintain transparency and precision matching.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#CFA25E]">
                <Sparkles className="w-3.5 h-3.5" /> Platform Feedback
              </div>
              <h3 className="text-xl font-extrabold text-[#0B2545]">Rate Your matchEd Experience</h3>
              <p className="text-xs text-slate-500">How would you rate the platform matching, verification, and escrow experience?</p>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 py-3 bg-slate-50 rounded-2xl border border-slate-100">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110 cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-[#CFA25E] fill-[#CFA25E]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Your Feedback & Suggestions</label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts on counsellor matching, booking flow, or milestone tracking..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545] resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#133E68] text-white shadow-md transition cursor-pointer"
              >
                Submit Rating
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlatformRatingModal;
