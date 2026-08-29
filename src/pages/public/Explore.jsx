import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, RefreshCw, Send, AlertCircle, Sparkles, Scale } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CounsellorCard } from '../../components/common/CounsellorCard';
import { CompareDrawer } from '../../components/common/CompareDrawer';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { counsellors } = useData();

  // Filters State
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [track, setTrack] = useState(searchParams.get('track') || '');
  const [budget, setBudget] = useState(searchParams.get('budget') || '');
  const [sortBy, setSortBy] = useState('bestMatch'); // bestMatch, mostReviewed, priceLowHigh, fastestResponse

  // Request Specialist Lead Form State (for zero results)
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', trackNeeded: track || 'Sports quota', notes: '' });

  // Filtering Logic
  const filteredCounsellors = useMemo(() => {
    let list = counsellors.filter(c => {
      if (destination && !c.destinations.includes(destination)) return false;
      if (track && c.track !== track) return false;
      if (budget && c.priceCategory !== budget) return false;
      return true;
    });

    // Sorting Logic
    if (sortBy === 'bestMatch') {
      list.sort((a, b) => (b.verifiedPlacementsCount * b.rating) - (a.verifiedPlacementsCount * a.rating));
    } else if (sortBy === 'mostReviewed') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'priceLowHigh') {
      list.sort((a, b) => a.pricePerSession - b.pricePerSession);
    } else if (sortBy === 'fastestResponse') {
      list.sort((a, b) => parseInt(a.responseTime) - parseInt(b.responseTime));
    }

    return list;
  }, [counsellors, destination, track, budget, sortBy]);

  const handleResetFilters = () => {
    setDestination('');
    setTrack('');
    setBudget('');
    setSortBy('bestMatch');
    setSearchParams({});
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" /> Discover & Compare Mentors
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Find Your Counsellor</h1>
          <p className="text-slate-500 text-sm mt-1">
            Filter by target country, admissions track, or budget. Check "Compare" on up to 3 cards for a side-by-side breakdown.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Destination Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Destinations</option>
                <option value="UK & Ireland">UK & Ireland</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Domestic — India">Domestic — India</option>
              </select>
            </div>

            {/* Track Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Track / Specialty</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">All Tracks</option>
                <option value="Study abroad admissions">Study abroad admissions</option>
                <option value="Domestic India admissions">Domestic India admissions</option>
                <option value="Sports quota admissions">Sports quota admissions</option>
                <option value="International athletic scholarships">International athletic scholarships</option>
              </select>
            </div>

            {/* Budget Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Budget Range</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Any Budget</option>
                <option value="Under ₹15,000/session">Under ₹15,000 / session</option>
                <option value="₹15,000–25,000">₹15,000–25,000 / session</option>
                <option value="₹25,000+">₹25,000+ / session</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Sort Results</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="bestMatch">Best Match (Verified Score)</option>
                <option value="mostReviewed">Most Reviewed</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="fastestResponse">Fastest Response Time</option>
              </select>
            </div>

          </div>

          {/* Active Filter Pills & Reset */}
          {(destination || track || budget) && (
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Active Filters:</span>
                {destination && <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-lg font-medium">Dest: {destination}</span>}
                {track && <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-lg font-medium">Track: {track}</span>}
                {budget && <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-lg font-medium">Budget: {budget}</span>}
              </div>
              <button 
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}

        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing <strong>{filteredCounsellors.length}</strong> verified counsellors</span>
          <span>Sorted by: {sortBy === 'bestMatch' ? 'Best Match' : sortBy}</span>
        </div>

        {/* Results Grid */}
        {filteredCounsellors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCounsellors.map(counsellor => (
              <CounsellorCard key={counsellor.id} counsellor={counsellor} />
            ))}
          </div>
        ) : (
          /* Edge Case handling from user flow spec: 0 Results Fallback & Lead Capture */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">No exact match for your specific filters</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              We couldn't find a counsellor matching "{destination || 'Any destination'}" + "{track || 'Any track'}". Don't worry! We broaden matches automatically or custom-recruit a specialist for your exact needs.
            </p>

            <button 
              onClick={handleResetFilters}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-5 py-2.5 rounded-xl mb-8 transition-colors"
            >
              Broaden Search Criteria
            </button>

            {/* Request a Specialist Lead Form */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 text-left">
              <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-600" />
                Request a Specialist Counsellor
              </h4>
              <p className="text-xs text-slate-600 mb-4">
                Leave your requirements and our platform team will match you with an audited specialist within 24 hours.
              </p>

              {leadSubmitted ? (
                <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-semibold text-center">
                  ✓ Request submitted! Our matching team will contact you shortly with curated specialist profiles.
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Your Full Name"
                      required
                      value={leadForm.name}
                      onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      required
                      value={leadForm.email}
                      onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <textarea 
                    rows={2}
                    placeholder="Tell us what you're looking for (e.g. Sports Quota in Australia)..."
                    value={leadForm.notes}
                    onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all"
                  >
                    Submit Specialist Request
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

      {/* Floating Side-by-Side Compare Drawer */}
      <CompareDrawer />
    </div>
  );
};
