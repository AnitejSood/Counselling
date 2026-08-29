import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Sparkles, PlusCircle } from 'lucide-react';

export const RecommendationsAdmin = () => {
  const { recommendations, addRecommendation } = useData();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Dream Target');
  const [why, setWhy] = useState('');
  const [added, setAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addRecommendation({
      studentId: 'std_101',
      type: 'UNIVERSITY',
      name,
      category,
      whyIRecommendThis: why,
      universityDetails: {
        country: 'United States',
        approxTuitionUSD: '$36,000 / yr',
        intake: 'Fall 2027',
        applicationDeadline: 'Dec 15, 2026'
      }
    });
    setName('');
    setWhy('');
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Recommendations Hub</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Counsellor Recommendations</h1>
        </div>
      </div>

      {added && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold">
          ✓ Recommendation created and pushed to student portal!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Compose Recommendation for Rohan Mehta</h3>
        
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">University / Program Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Purdue University - MS in Computer Science"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          >
            <option>Dream Target</option>
            <option>Target Option</option>
            <option>Safety Target</option>
            <option>Career Pathway</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Why I (Arti Sood) Recommend This</label>
          <textarea
            rows={3}
            required
            placeholder="Provide metric rationale based on student's profile..."
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
        >
          Publish Recommendation
        </button>
      </form>
    </div>
  );
};
