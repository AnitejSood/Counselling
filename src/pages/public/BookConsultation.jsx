import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Check, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const BookConsultation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { counsellors, createEscrowBooking } = useData();

  const counsellorId = searchParams.get('counsellorId') || counsellors[0].id;
  const selectedCounsellor = counsellors.find(c => c.id === counsellorId) || counsellors[0];

  const [selectedService, setSelectedService] = useState(selectedCounsellor.services[0] || { title: "1-on-1 Strategy Session", price: selectedCounsellor.pricePerSession });
  const [selectedDate, setSelectedDate] = useState("2026-08-10");
  const [selectedSlot, setSelectedSlot] = useState("11:00 AM");
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  const availableSlots = ["10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM"];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
            <Lock className="w-3.5 h-3.5 text-indigo-600" />
            Student Step 3: Secure Escrow Booking
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Book Mentorship Session</h1>
          <p className="text-slate-500 text-xs mt-1">
            Pick a time slot from {selectedCounsellor.fullName}'s live calendar. Payments are protected in escrow.
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
              Your payment of <strong>₹{selectedService.price.toLocaleString('en-IN')}</strong> is held securely in platform escrow. It will be released to {selectedCounsellor.fullName} after session completion.
            </p>

            {/* Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ID:</span>
                <span className="font-mono font-bold text-slate-900">{bookingRef?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Counsellor:</span>
                <span className="font-bold text-slate-900">{selectedCounsellor.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{selectedService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-bold text-indigo-700">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Escrow Protection:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> ACTIVE
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard/journey"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                Go to Student Portal & Complete Intake
              </Link>
              <Link 
                to="/explore"
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3 px-6 rounded-xl transition-all"
              >
                Return to Marketplace
              </Link>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <form onSubmit={handleBookingSubmit} className="space-y-8">
              
              {/* Selected Counsellor Card Header */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <img src={selectedCounsellor.photoUrl} alt={selectedCounsellor.fullName} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedCounsellor.fullName}</h3>
                  <p className="text-xs text-indigo-600 font-medium">{selectedCounsellor.track}</p>
                  <span className="text-[11px] text-slate-500">{selectedCounsellor.credentials}</span>
                </div>
              </div>

              {/* Step A: Select Service */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">1. Select Service Package</label>
                <div className="space-y-3">
                  {selectedCounsellor.services.map(srv => (
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
                        <span className="text-sm font-extrabold text-slate-900">₹{srv.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step B: Date & Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">2. Choose Live Date & Time Slot</label>
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

              {/* Step C: Escrow Policy Notice */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900">
                  <strong>Escrow Protection Policy:</strong> Payments are held safely in platform escrow until your session is complete. If a counsellor cancels or no-shows, your payment is auto-refunded instantly.
                </div>
              </div>

              {/* Payment Action */}
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-4 rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                Pay ₹{selectedService.price.toLocaleString('en-IN')} (Escrow Secured)
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
