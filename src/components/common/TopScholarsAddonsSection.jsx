import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Star, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  MessageCircleQuestion,
  FileCheck,
  Building,
  UserCheck,
  X,
  Zap,
  Tag,
  Filter
} from 'lucide-react';
import { formatINR } from '../../lib/formatters';

export const TopScholarsAddonsSection = () => {
  const { peerMentors, addonServices, bookAddonService } = useData();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedUniversity, setSelectedUniversity] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [bookingModalData, setBookingModalData] = useState(null); // { mentor, service }
  const [selectedDate, setSelectedDate] = useState('2026-08-16');
  const [selectedSlot, setSelectedSlot] = useState('04:00 PM');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  // Available service categories for filter
  const categories = ['ALL', 'Quick Doubt Solving', 'Document Review', 'Interview Drill', 'Campus & Budget'];

  // Universities for filter
  const universities = ['ALL', 'Stanford University', 'University of Oxford', 'Imperial College London', 'Harvard University'];

  const filteredMentors = peerMentors.filter(mentor => {
    const matchUni = selectedUniversity === 'ALL' || mentor.university === selectedUniversity;
    if (!matchUni) return false;

    if (selectedCategory === 'ALL') return true;
    // Check if mentor offers a service with this category
    const mentorServices = addonServices.filter(s => mentor.servicesOffered?.includes(s.id));
    return mentorServices.some(s => s.category === selectedCategory);
  });

  const handleOpenBooking = (mentor, service) => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/explore?tab=scholars');
      return;
    }
    setBookingModalData({ mentor, service });
  };

  const handleConfirmAddonBooking = (e) => {
    e.preventDefault();
    if (!bookingModalData) return;
    bookAddonService(
      bookingModalData.mentor.id,
      bookingModalData.service.id,
      selectedDate,
      selectedSlot
    );
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingModalData(null);
    }, 2200);
  };

  return (
    <section className="space-y-8 font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA25E]" /> Top Scholar Mentorship & Quick Doubt Solving
          </div>
          <h2 className="text-3xl font-black text-[#0B2545] tracking-tight">
            Connect Directly With Current Oxford, Stanford & Harvard Admits
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-1">
            Book focused, individual add-on services starting at ₹799. Each scholar offers dedicated services including quick doubt solving, live SOP roasts, and mock interviews. There are no locked packages: choose only the specific guidance you need.
          </p>
        </div>
      </div>

      {/* Unified Filters: Category & University Filters */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#CFA25E]" /> Service Type:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Add-On Services' : cat}
              </button>
            ))}
          </div>

          {/* University Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">University:</span>
            <select
              value={selectedUniversity}
              onChange={e => setSelectedUniversity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {universities.map(u => (
                <option key={u} value={u}>{u === 'ALL' ? 'All Top Universities' : u}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─── UNIFIED SCHOLARS & MULTI-SERVICES GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in">
        {filteredMentors.map((mentor) => {
          // Get all services offered by this specific mentor
          const mentorServices = addonServices.filter(s => (mentor.servicesOffered || []).includes(s.id));

          return (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 hover:border-slate-300 transition-all flex flex-col gap-3 group"
            >
              <div className="space-y-2.5">
                {/* Scholar Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={mentor.photoUrl}
                      alt={mentor.fullName}
                      className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm truncate">{mentor.fullName}</h3>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FDF8EE] text-[#0B2545] border border-[#EBD6B0]">
                          {mentor.badge}
                        </span>
                      </div>
                      <p className="text-[11px] font-bold text-[#0B2545] truncate">{mentor.university}</p>
                      <p className="text-[10px] text-slate-500 truncate">{mentor.degree} · {mentor.year}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="flex items-center gap-0.5 font-bold text-slate-900 text-[11px] justify-end">
                      <Star className="w-3 h-3 fill-[#CFA25E] text-[#CFA25E]" />
                      {mentor.rating}
                      <span className="text-slate-400 font-normal">({mentor.sessionsCount})</span>
                    </span>
                  </div>
                </div>

                {/* Scholar Bio — one line */}
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {mentor.bio}
                </p>

                {/* MULTIPLE SERVICES OFFERED SECTION */}
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B2545] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#CFA25E] fill-[#CFA25E]" />
                    Add-ons ({mentorServices.length})
                  </span>

                  <div className="space-y-1.5">
                    {mentorServices.map(srv => {
                      const isHighlighted = selectedCategory !== 'ALL' && srv.category === selectedCategory;
                      return (
                        <div
                          key={srv.id}
                          className={`px-2.5 py-2 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                            isHighlighted
                              ? 'bg-amber-50/60 border-amber-300'
                              : 'bg-slate-50/80 hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-slate-900 text-[11px] truncate">{srv.title}</span>
                              <span className="text-[9px] font-medium text-slate-500">{srv.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-slate-900 text-xs">{formatINR(srv.price)}</span>
                            <button
                              onClick={() => handleOpenBooking(mentor, srv)}
                              className="px-2.5 py-1 rounded-lg bg-[#0B2545] hover:bg-slate-800 text-white text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>Book</span>
                              <ArrowRight className="w-2.5 h-2.5 text-[#CFA25E]" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Escrow protected
                </span>
                <span className="font-semibold text-[#0B2545]">No subscription</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── BOOKING MODAL FOR SPECIFIC SCHOLAR & SERVICE ─── */}
      {bookingModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-100 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#FDF8EE] text-[#0B2545] rounded-xl border border-[#EBD6B0]">
                  <Sparkles className="w-5 h-5 text-[#CFA25E]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Book Individual Scholar Add-On</h3>
                  <p className="text-xs text-slate-500">Standalone service with {bookingModalData.mentor.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setBookingModalData(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            {bookedSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Add-On Session Confirmed!</h4>
                <p className="text-xs text-slate-600">
                  Your session request with <strong>{bookingModalData.mentor.fullName}</strong> ({bookingModalData.mentor.university}) has been booked. Meeting details have been dispatched to your Appointments tab.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmAddonBooking} className="space-y-4 text-xs">
                {/* Selected Service Card */}
                <div className="p-4 bg-gradient-to-br from-[#0B2545] to-slate-900 text-white rounded-2xl space-y-2 border border-[#CFA25E]/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#CFA25E] tracking-wider block">Selected Service:</span>
                      <h4 className="font-extrabold text-white text-sm mt-0.5">{bookingModalData.service.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-1">Duration: {bookingModalData.service.duration}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-white">{formatINR(bookingModalData.service.price)}</span>
                      <span className="text-[9px] text-[#CFA25E] block font-bold">One-Time Fee</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-[#CFA25E]" />
                    <span>Mentor: <strong>{bookingModalData.mentor.fullName}</strong> ({bookingModalData.mentor.university})</span>
                  </div>
                </div>

                {/* Date and Slot Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-500 mb-1">Time Slot *</label>
                    <select
                      value={selectedSlot}
                      onChange={e => setSelectedSlot(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="11:00 AM">11:00 AM IST</option>
                      <option value="02:30 PM">02:30 PM IST</option>
                      <option value="04:00 PM">04:00 PM IST</option>
                      <option value="06:30 PM">06:30 PM IST</option>
                      <option value="08:00 PM">08:00 PM IST</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  💡 <strong>Escrow Guarantee:</strong> Fee is held in matchEd escrow and only disbursed to the scholar after the session is successfully conducted.
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBookingModalData(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0B2545] hover:bg-slate-800 text-white rounded-xl font-bold shadow-md cursor-pointer transition"
                  >
                    Confirm & Book ({formatINR(bookingModalData.service.price)})
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
