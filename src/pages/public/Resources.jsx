import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FileText, Search, Clock, Tag, BookOpen, ArrowRight, X } from 'lucide-react';

export const Resources = () => {
  const { resources } = useData();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticleModal, setActiveArticleModal] = useState(null);

  const categories = ['ALL', 'Career Guidance', 'Study Abroad', 'Study in India', 'University Applications', 'Visa Guidance'];

  const filtered = selectedCategory === 'ALL'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Knowledge & Mentorship Hub
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Expert Articles, Guides & Checklists
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Read actionable insights written personally by Arti Sood to help you navigate admissions and career planning.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                  {res.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> {res.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.summary}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {res.tags.map((t, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">By {res.author} • {res.date}</span>
              <button
                onClick={() => setActiveArticleModal(res)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activeArticleModal.category}</span>
              <h3 className="text-2xl font-bold text-slate-900">{activeArticleModal.title}</h3>
              <p className="text-xs text-slate-400">By {activeArticleModal.author} • Published {activeArticleModal.date}</p>
            </div>

            <div className="prose text-xs text-slate-700 leading-relaxed space-y-3 border-t border-slate-100 pt-4">
              <p>{activeArticleModal.content}</p>
              <p>Key Takeaway: Early preparation and continuous feedback from your dedicated counsellor yields the highest university scholarship and admit conversion rates.</p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
