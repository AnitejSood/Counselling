import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Gift,
  Check
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const BookConsultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { counsellors, createEscrowBooking, createFreeDiscoveryBooking } = useData();
  const { isAuthenticated } = useAuth();

  const counsellorId = searchParams.get('counsellorId') || counsellors[0]?.id;
  const isFreeDiscoveryRequested = searchParams.get('type') === 'free';
  const selectedCounsellor = counsellors.find(c => c.id === counsellorId) || counsellors[0];

  // Auth Guard: Redirect unauthenticated users to Login first with return URL
  useEffect(() => {
    if (!isAuthenticated) {
      const returnUrl = `/book?counsellorId=${counsellorId}${isFreeDiscoveryRequested ? '&type=free' : ''}`;
      navigate(`/login?redirect=${encodeURIComponent(returnUrl)}`);
    }
  }, [isAuthenticated, navigate, counsellorId, isFreeDiscoveryRequested]);

  // Generate real upcoming dates for the next 14 days (excluding past dates)
  const upcomingDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // starting tomorrow
    return {
      iso: d.toISOString().split('T')[0],
      display: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const [isFreeDiscovery, setIsFreeDiscovery] = useState(isFreeDiscoveryRequested);
  const [selectedService, setSelectedService] = useState(
    selectedCounsellor?.services?.[0] || { title: "Complete Mentorship Package", price: selectedCounsellor?.pricePerSession || 25000 }
  );
  const [selectedDate, setSelectedDate] = useState(upcomingDates[0]?.iso || "2026-09-15");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  const availableSlots = selectedCounsellor?.availableSlots || ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      const returnUrl = `/book?counsellorId=${counsellorId}${isFreeDiscovery ? '&type=free' : ''}`;
      navigate(`/login?redirect=${encodeURIComponent(returnUrl)}`);
      return;
    }

    if (isFreeDiscovery) {
      const newBooking = createFreeDiscoveryBooking(
        selectedCounsellor.id,
        selectedDate,
        selectedSlot
      );
      setBookingRef(newBooking);
      setIsBooked(true);
    } else {
      const newBooking = createEscrowBooking(
        selectedCounsellor.id,
        selectedService.title,
        selectedService.price,
        selectedDate,
        selectedSlot
      );
      setBookingRef(newBooking);
      setIsBooked(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 bg-amber-50 text-[#0B2545] border border-amber-200 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-[#0B2545]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign In to Continue Booking</h2>
          <p className="text-xs text-slate-600">Please sign in or create an account to book your session with {selectedCounsellor?.fullName}.</p>
          <Link
            to={`/login?redirect=${encodeURIComponent(`/book?counsellorId=${counsellorId}`)}`}
            className="block w-full py-3 bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Sign In / Register to Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-amber-50 text-amber-900 border border-amber-300 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#CFA25E] animate-pulse" />
            <span>matchEd Guarantee · 1-Month Counsellor Switch Window · 100% Escrow Protected</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B2545]">Book with {selectedCounsellor?.fullName}</h1>
          <p className="text-slate-600 text-xs mt-1 max-w-xl mx-auto">
            Choose between a 100% Free 15-Min Discovery Session or the full comprehensive admissions mentorship package.
          </p>
        </div>

        {isBooked ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              {isFreeDiscovery ? 'Free Discovery Session Scheduled!' : 'Mentorship Package Confirmed & Escrow Initialized!'}
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
              {isFreeDiscovery ? (
                <span>Your 15-minute introductory video call slot has been reserved. Join the video room from your appointments tab.</span>
              ) : (
                <span>Your payment of <strong>₹{(selectedService.price).toLocaleString('en-IN')}</strong> is safely held in platform escrow under matchEd 1-Month Switch Guarantee.</span>
              )}
            </p>

            {/* Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2.5 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-slate-900">{bookingRef?.id || 'MED-BK-9281'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Counsellor:</span>
                <span className="font-bold text-slate-900">{selectedCounsellor?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Session Type:</span>
                <span className="font-bold text-indigo-900">
                  {isFreeDiscovery ? '15-Min Free Discovery Call (₹0)' : selectedService.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Date & Time:</span>
                <span className="font-bold text-emerald-700">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">1-Month Switch Guarantee:</span>
                <span className="font-bold text-amber-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Active (30 Days from start)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard/appointments"
                className="w-full sm:w-auto bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                View in My Appointments
              </Link>
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-6 rounded-xl transition-all"
              >
                Go to Student Dashboard
              </Link>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Selected Counsellor Card Header */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <img src={selectedCounsellor?.photoUrl} alt={selectedCounsellor?.fullName} className="w-14 h-14 rounded-xl object-cover border border-[#CFA25E]" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{selectedCounsellor?.fullName}</h3>
                    {selectedCounsellor?.hasBlueTick && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-300">
                        Blue Tick Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#0B2545] font-semibold">{selectedCounsellor?.track}</p>
                  <span className="text-[11px] text-slate-500">{selectedCounsellor?.credentials}</span>
                </div>
              </div>

              {/* Booking Mode Switcher: Free Discovery vs Full Package */}
              <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsFreeDiscovery(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFreeDiscovery 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Gift className="w-4 h-4" />
                  <span>15-Min Free Discovery (₹0)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFreeDiscovery(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !isFreeDiscovery 
                      ? 'bg-[#0B2545] text-white shadow-md' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#CFA25E]" />
                  <span>Full Mentorship Package</span>
                </button>
              </div>

              {/* Step A: Select Service Package (Only if not Free Discovery) */}
              {!isFreeDiscovery ? (
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">1. Select Mentorship Package</label>
                  <div className="space-y-3">
                    {selectedCounsellor?.services?.map(srv => (
                      <div 
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          selectedService.title === srv.title ? 'bg-amber-50/60 border-[#CFA25E] ring-2 ring-[#CFA25E]/30' : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                          <p className="text-xs text-slate-500">{srv.desc}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-[#0B2545]">₹{(srv.price).toLocaleString('en-IN')}</span>
                          <span className="block text-[10px] text-slate-500">Starting rate per package</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                  <Gift className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-xs">Free Discovery Session Active (100% Free)</h4>
                    <p className="text-[11px] text-emerald-800">
                      Get a 15-minute 1-on-1 strategy call with {selectedCounsellor?.fullName} to review your profile, clarify goals, and see if they are the perfect match. No credit card required.
                    </p>
                  </div>
                </div>
              )}

              {/* Step B: Date & Time Slot Selection (Live Available Next 14 Days) */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  2. Choose Live Available Date & Slot
                </label>
                <div className="space-y-4">
                  {/* Horizontal scrolling date chips */}
                  <div>
                    <span className="text-xs text-slate-500 block mb-2 font-medium">Select Upcoming Date (Next 14 Days)</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                      {upcomingDates.map(d => (
                        <button
                          type="button"
                          key={d.iso}
                          onClick={() => setSelectedDate(d.iso)}
                          className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedDate === d.iso
                              ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {d.display}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Available Live Slots */}
                  <div>
                    <span className="text-xs text-slate-500 block mb-2 font-medium">Available Time Slot for {selectedDate}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            selectedSlot === slot 
                              ? 'bg-[#CFA25E] text-[#0B2545] font-bold border-[#CFA25E] shadow-sm' 
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step C: 1-Month Switch Guarantee Notice */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 space-y-1">
                  <p><strong>matchEd 1-Month Switch Guarantee:</strong></p>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    From your onboarding date, you have <strong>up to 1 month (30 days)</strong> to change your counsellor up to 2-3 times. If switching to a same-priced counsellor: <strong>₹0 extra</strong>. If switching to a higher-priced counsellor: pay only the difference. If switching to a lower-priced counsellor: permitted with no refund.
                  </p>
                </div>
              </div>

              {/* Payment / Booking Action */}
              <button 
                type="submit"
                className="w-full bg-[#0B2545] hover:bg-slate-800 text-white font-bold text-sm py-4 rounded-2xl shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isFreeDiscovery ? (
                  <>
                    <Gift className="w-4 h-4 text-[#CFA25E]" />
                    <span>Confirm Free Discovery Session (₹0)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#CFA25E]" />
                    <span>Pay ₹{(selectedService.price).toLocaleString('en-IN')} (Escrow Protected)</span>
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
