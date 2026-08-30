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
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const BookConsultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { counsellors, createEscrowBooking } = useData();
  const { isAuthenticated } = useAuth();

  const counsellorId = searchParams.get('counsellorId') || counsellors[0]?.id;
  const selectedCounsellor = counsellors.find(c => c.id === counsellorId) || counsellors[0];

  // Auth Guard: Redirect unauthenticated users to Login first
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/book?counsellorId=${counsellorId}`);
    }
  }, [isAuthenticated, navigate, counsellorId]);

  const [selectedService, setSelectedService] = useState(
    selectedCounsellor?.services?.[0] || { title: "Complete Mentorship Package", price: selectedCounsellor?.pricePerSession || 25000 }
  );
  const [selectedDate, setSelectedDate] = useState("2026-08-15");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  const availableSlots = selectedCounsellor?.availableSlots || ["10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate(`/login?redirect=/book?counsellorId=${counsellorId}`);
      return;
    }
    const newBooking = createEscrowBooking(
      selectedCounsellor.id,
      selectedService.title,
      selectedService.price,
      selectedDate,
      selectedSlot
    );
    setBookingRef(newBooking);
    setIsBooked(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Login Required to Book</h2>
          <p className="text-xs text-slate-600">Please sign in or create an account to book your session with {selectedCounsellor?.fullName}.</p>
          <Link
            to={`/login?redirect=/book?counsellorId=${counsellorId}`}
            className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            Sign In / Register to Book
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            🎉 First 1 Session 100% FREE · 14-Day (2 Weeks) 100% Money-Back Guarantee
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Book Mentorship Package</h1>
          <p className="text-slate-500 text-xs mt-1 max-w-xl mx-auto">
            Suggest a date & time slot for {selectedCounsellor?.fullName}. Booking goes directly to the counsellor for confirmation & Google Meet link.
          </p>
        </div>

        {isBooked ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Booking Confirmed & Escrow Initialized!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
              Your payment of <strong>₹{(selectedService.price).toLocaleString('en-IN')}</strong> is held safely in platform escrow. 
            </p>

            {/* Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-slate-900">{bookingRef?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Counsellor:</span>
                <span className="font-bold text-slate-900">{selectedCounsellor?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Package:</span>
                <span className="font-bold text-slate-900">{selectedService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First Session Date & Time:</span>
                <span className="font-bold text-indigo-700">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trial Refund Guarantee:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Active (2 Wks / 3 Sessions)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard/journey"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                Go to Student Portal & View Roadmap
              </Link>
              <Link 
                to="/explore"
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-6 rounded-xl transition-all"
              >
                Return to Marketplace Directory
              </Link>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Selected Counsellor Card Header */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <img src={selectedCounsellor?.photoUrl} alt={selectedCounsellor?.fullName} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedCounsellor?.fullName}</h3>
                  <p className="text-xs text-indigo-600 font-medium">{selectedCounsellor?.track}</p>
                  <span className="text-[11px] text-slate-500">{selectedCounsellor?.credentials}</span>
                </div>
              </div>

              {/* Step A: Select Service Package */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">1. Select Service Package</label>
                <div className="space-y-3">
                  {selectedCounsellor?.services?.map(srv => (
                    <div 
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedService.title === srv.title ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{srv.title}</h4>
                        <p className="text-xs text-slate-500">{srv.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-slate-900">₹{(srv.price).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step B: Date & Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">2. Choose Live Available Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Select Date</span>
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block mb-1">Available Slot</span>
                    <div className="grid grid-cols-3 gap-2">
                      {availableSlots.map(slot => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            selectedSlot === slot ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step C: Escrow & Guarantee Notice */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <p><strong>Platform Escrow & 2-Week Trial Guarantee:</strong> Your payment is held safely in escrow. You get 2 weeks and up to 3 sessions to evaluate your counsellor.</p>
                  <p className="text-[11px] text-emerald-700">After 2 weeks or 3 sessions, no refunds are issued and new counsellor changes require a separate booking.</p>
                </div>
              </div>

              {/* Payment Action */}
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-4 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Pay ₹{(selectedService.price).toLocaleString('en-IN')} (Escrow Protected)
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
