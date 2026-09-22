import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  Clock, 
  ArrowRight, 
  X, 
  PlusCircle, 
  Link as LinkIcon, 
  Sparkles, 
  Search, 
  BookOpen, 
  User, 
  Tag, 
  Calendar,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { MatchEdLogo } from '../../components/common/MatchEdLogo';

export const Resources = () => {
  const { resources, addCounsellorBlog } = useData();
  const { isCounsellor, currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleModal, setActiveArticleModal] = useState(null);
  const [addBlogModalOpen, setAddBlogModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogCategory, setBlogCategory] = useState('Study Abroad');
  const [blogExternalUrl, setBlogExternalUrl] = useState('');

  const categories = [
    'ALL', 
    'Study Abroad', 
    'University Applications', 
    'Career Guidance', 
    'Visa Guidance', 
    'Study in India'
  ];

  const filtered = useMemo(() => {
    return resources.filter((res) => {
      const matchCategory = selectedCategory === 'ALL' || res.category === selectedCategory;
      const matchSearch = !searchQuery.trim() || 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (res.tags && res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

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

  const handleShareArticle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="py-10 sm:py-14 space-y-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" />
          <span>matchEd Knowledge Hub</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
          Admissions Guides & Mentor Insights
        </h1>
        
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Practical strategies, essay breakdowns, and visa walkthroughs written directly by verified counsellors and top university scholars.
        </p>

        {/* Counsellor Blog Link Publisher Button */}
        {isCounsellor && (
          <div className="pt-2">
            <button
              onClick={() => setAddBlogModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm inline-flex items-center gap-2 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Publish or Link an Article
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B2545] focus:bg-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                {cat === 'ALL' ? 'All Guides' : cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Compact, Well-Proportioned 3-Column Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No guides found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or switching to another category.
          </p>
          <button
            onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((res) => (
            <div 
              key={res.id} 
              className="bg-white rounded-xl p-3.5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group gap-3"
            >
              <div className="space-y-2">
                
                {/* Meta Top: Category Pill + Reading Time */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-[#FDF8EE] text-[#0B2545] font-bold text-[10px] border border-[#EBD6B0]">
                    {res.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 text-[10px] font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{res.readTime || '5 min read'}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0B2545] transition-colors leading-snug line-clamp-2">
                  {res.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {res.summary}
                </p>

                {/* Topic Tags */}
                {res.tags && res.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {res.tags.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Author & Action Footer */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#0B2545]/10 text-[#0B2545] flex items-center justify-center text-[9px] font-bold shrink-0">
                    {res.author ? res.author.charAt(0) : 'M'}
                  </div>
                  <div className="truncate">
                    <p className="text-[10px] font-bold text-slate-800 truncate">{res.author}</p>
                    <p className="text-[9px] text-slate-400 truncate">{res.date}</p>
                  </div>
                </div>

                {res.externalUrl ? (
                  <a
                    href={res.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B2545] hover:text-[#133E68] shrink-0"
                  >
                    <span>View Link</span>
                    <LinkIcon className="w-3 h-3 text-[#CFA25E]" />
                  </a>
                ) : (
                  <button
                    onClick={() => setActiveArticleModal(res)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B2545] hover:text-[#133E68] cursor-pointer shrink-0"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA25E] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Clean Article Detail Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95">
            
            <button
              onClick={() => setActiveArticleModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-3 pr-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0]">
                {activeArticleModal.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] leading-snug">
                {activeArticleModal.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">By {activeArticleModal.author}</span>
                <span>•</span>
                <span>Published on {activeArticleModal.date}</span>
                <span>•</span>
                <span>{activeArticleModal.readTime || '5 min read'}</span>
              </div>
            </div>

            {/* Content body */}
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4 border-t border-slate-100 pt-5">
              <p className="font-medium text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {activeArticleModal.summary}
              </p>

              <div className="space-y-3 pt-2">
                <p>
                  {activeArticleModal.content || "Admissions committees evaluate candidate applications across multiple dimensions: rigorous academic credentials, personal statements that clearly articulate unique perspectives, and recommendation letters that validate real-world impact. When preparing your portfolio, prioritize specificity over generic achievements."}
                </p>
                <p>
                  Focus on presenting concrete outcomes: research projects, leadership initiatives, and targeted electives that align with your intended major. For tailored feedback on your drafts and university shortlist, connect directly with our verified counsellors on matchEd.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={handleShareArticle}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
              </button>

              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-6 py-2 rounded-xl bg-[#0B2545] hover:bg-[#133E68] text-white font-bold text-xs transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Counsellor Publish Article Modal */}
      {addBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 relative shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <button
              onClick={() => setAddBlogModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#CFA25E]" />
              <h3 className="text-lg font-black text-[#0B2545]">Publish Mentor Article or Guide</h3>
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={blogCategory}
                  onChange={e => setBlogCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
                >
                  <option value="Study Abroad">Study Abroad</option>
                  <option value="University Applications">University Applications</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Visa Guidance">Visa Guidance</option>
                  <option value="Study in India">Study in India</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">External Article Link (Optional)</label>
                <input
                  type="url"
                  value={blogExternalUrl}
                  onChange={e => setBlogExternalUrl(e.target.value)}
                  placeholder="https://medium.com/@arti.sood/sop-guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545]"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B2545] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAddBlogModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#0B2545] hover:bg-[#133E68] text-white shadow-md transition cursor-pointer"
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

export default Resources;
