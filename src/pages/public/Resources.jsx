import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { FileText, Clock, ArrowRight, X, PlusCircle, Link as LinkIcon, Sparkles } from 'lucide-react';

export const Resources = () => {
  const { resources, addCounsellorBlog } = useData();
  const { isCounsellor, currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [addBlogModalOpen, setAddBlogModalOpen] = useState(false);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogCategory, setBlogCategory] = useState('Study Abroad');
  const [blogExternalUrl, setBlogExternalUrl] = useState('');

  const categories = ['ALL', 'Career Guidance', 'Study Abroad', 'Study in India', 'University Applications', 'Visa Guidance'];

  const filtered = selectedCategory === 'ALL'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const handleAddBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogTitle || !blogSummary) return;
    addCounsellorBlog({
      title: blogTitle,
      summary: blogSummary,
      category: blogCategory,
      authorName: currentUser?.fullName || 'Verified Counsellor',
      externalUrl: blogExternalUrl || null
    });
    setAddBlogModalOpen(false);
    setBlogTitle('');
    setBlogSummary('');
    setBlogExternalUrl('');
  };

  return (
    <div className="py-12 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
          AspirantHQ Knowledge & Blog Hub
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Expert Articles & Counsellor Insights
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Read actionable insights and research articles written personally by verified counsellors.
        </p>

        {/* Counsellor Blog Link Publisher Button */}
        {isCounsellor && (
          <div className="pt-2">
            <button
              onClick={() => setAddBlogModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md inline-flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              Link / Publish Counsellor Article
            </button>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
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
          <div key={res.id} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                  {res.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" /> {res.readTime || '5 min read'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{res.summary}</p>

              {res.tags && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {res.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">By {res.author} • {res.date}</span>
              {res.externalUrl ? (
                <a
                  href={res.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Visit Article <LinkIcon className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={() => setActiveArticleModal(res)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
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
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{activeArticleModal.category}</span>
              <h3 className="text-2xl font-bold text-slate-900">{activeArticleModal.title}</h3>
              <p className="text-xs text-slate-400">By {activeArticleModal.author} • Published {activeArticleModal.date}</p>
            </div>

            <div className="prose text-xs text-slate-700 leading-relaxed space-y-3 border-t border-slate-100 pt-4">
              <p>{activeArticleModal.content}</p>
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

      {/* Counsellor Add Blog Modal */}
      {addBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setAddBlogModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Publish / Link Counsellor Article</h3>
            </div>

            <form onSubmit={handleAddBlogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={e => setBlogTitle(e.target.value)}
                  placeholder="e.g. Navigating US Ivy League SOP Requirements"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={blogCategory}
                  onChange={e => setBlogCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="University Applications">University Applications</option>
                  <option value="Visa Guidance">Visa Guidance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">External Article / Blog Link (Optional)</label>
                <input
                  type="url"
                  value={blogExternalUrl}
                  onChange={e => setBlogExternalUrl(e.target.value)}
                  placeholder="https://medium.com/@arti.sood/sop-guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Summary / Excerpt</label>
                <textarea
                  rows={3}
                  required
                  value={blogSummary}
                  onChange={e => setBlogSummary(e.target.value)}
                  placeholder="Brief summary of the article..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddBlogModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
