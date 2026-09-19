import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { 
  Sparkles, Bookmark, ExternalLink, CheckCircle2, ArrowRight, Search, 
  Globe, Building2, ShieldCheck, Compass, Filter 
} from 'lucide-react';
import { EXTERNAL_DISCOVERY_RESOURCES } from '../../services/universityDataService';

export const Recommendations = () => {
  const { recommendations, addToShortlist, counsellors, counsellorSwitchState } = useData();
  const [activeTab, setActiveTab] = useState('COUNSELLOR'); // 'COUNSELLOR' | 'OFFICIAL_PORTALS'
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [notice, setNotice] = useState('');

  // Resolve active/assigned counsellor dynamically
  const assignedCounsellor = useMemo(() => {
    return counsellors.find(c => c.id === counsellorSwitchState?.assignedCounsellorId) || counsellors[0];
  }, [counsellors, counsellorSwitchState]);

  const counsellorName = assignedCounsellor?.fullName || 'Your Counsellor';

  const showMsg = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  const handleAddExternalToShortlist = (portal) => {
    addToShortlist({
      name: portal.name,
      country: portal.region,
      tuition: 'Program Specific',
      deadline: 'Official Central Portal',
      intake: 'Direct University Admissions',
      counsellorNotes: `Direct Official Portal: ${portal.description} (${portal.trustedBy})`
    });
    showMsg(`Added "${portal.name}" to your Shortlist Comparator!`);
  };

  const filteredPortals = useMemo(() => {
    return EXTERNAL_DISCOVERY_RESOURCES.filter(portal => {
      const matchesRegion = regionFilter === 'ALL' || portal.region.toLowerCase().includes(regionFilter.toLowerCase());
      const matchesSearch = !searchQuery || 
        portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [searchQuery, regionFilter]);

  return (
    <div className="space-y-8 w-full font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#CFA25E]">Personalised Admissions Guidance</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">Recommendations & Portals</h1>
          <p className="text-xs text-slate-500 mt-1">
            Curated 1-on-1 recommendations from {counsellorName} combined with verified central admissions portals.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-200/80 p-1.5 rounded-2xl shadow-inner text-xs font-bold">
          <button
            onClick={() => setActiveTab('COUNSELLOR')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'COUNSELLOR'
                ? 'bg-[#0B2545] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" />
            <span>Curated ({recommendations.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('OFFICIAL_PORTALS')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'OFFICIAL_PORTALS'
                ? 'bg-[#0B2545] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#CFA25E]" />
            <span>Official Portals ({EXTERNAL_DISCOVERY_RESOURCES.length})</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {notice}
        </div>
      )}

      {/* TAB 1: CURATED COUNSELLOR RECOMMENDATIONS */}
      {activeTab === 'COUNSELLOR' && (
        <div className="space-y-6">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#CFA25E] shrink-0" />
              <span>
                <strong>Verified Matchings:</strong> Hand-picked by {counsellorName} based on your psychometric profile, GRE/IELTS targets, and budget.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-full bg-[#0B2545]/10 text-[#0B2545] text-[10px] font-extrabold uppercase tracking-wider">
                      {rec.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{rec.universityDetails?.country || 'Global'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{rec.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{rec.description}</p>

                  {rec.universityDetails && (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Course</span>
                        <span className="font-bold text-slate-900 truncate block">{rec.universityDetails.course}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Tuition</span>
                        <span className="font-bold text-[#0B2545]">{rec.universityDetails.approxTuitionUSD}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Deadline</span>
                        <span className="font-bold text-rose-600">{rec.universityDetails.applicationDeadline}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Intake</span>
                        <span className="font-semibold text-slate-700">{rec.universityDetails.intake}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-1">
                    <p className="font-bold text-[#0B2545] uppercase text-[10px]">Why {counsellorName} Recommends This:</p>
                    <p className="italic text-slate-700">{rec.whyIRecommendThis || "Strategically matches your target intake timeline and academic credentials."}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => {
                      addToShortlist(rec);
                      showMsg(`Added "${rec.name}" to your Shortlist!`);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#CFA25E]" />
                    Add to Shortlist
                  </button>
                  {rec.usefulLink && (
                    <a
                      href={rec.usefulLink}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      title="Open University Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL UNIVERSITY & CENTRAL APPLICATION PORTALS */}
      {activeTab === 'OFFICIAL_PORTALS' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search official portals (e.g. UCAS, Common App, DAAD, CUET)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={regionFilter}
                onChange={e => setRegionFilter(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Destinations ({EXTERNAL_DISCOVERY_RESOURCES.length})</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany & Europe</option>
                <option value="India">India</option>
                <option value="Global">Global / Testing</option>
              </select>
            </div>
          </div>

          {/* Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPortals.map((portal) => (
              <div 
                key={portal.id} 
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {portal.badgeText}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{portal.region}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-5 h-5 text-[#0B2545] shrink-0" />
                    {portal.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{portal.description}</p>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[10px] block">Portal Authority</span>
                      <span className="font-bold text-slate-900">{portal.trustedBy}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 uppercase text-[10px] block mt-1">Classification</span>
                      <span className="text-slate-700">{portal.category}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => handleAddExternalToShortlist(portal)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-slate-600" />
                    Save Portal
                  </button>

                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-center"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#CFA25E]" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
