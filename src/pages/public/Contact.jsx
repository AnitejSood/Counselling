import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Mail, Phone, MapPin, Calendar, Clock, Send, CheckCircle, Building2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact = () => {
  const { platformConfig } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', queryType: 'General Marketplace Inquiry', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B2545] bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
          matchEd Corporate Desk
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Contact Headquarters & Advisory Desk
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm">
          Have questions about advisor verification, escrow security, 1-month counsellor changes, or scholar doubt sessions? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-white rounded-3xl p-7 border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <Building2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Chandigarh Corporate Office</h3>
            </div>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-700/40">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <strong className="text-white block text-xs mb-0.5">Physical Headquarters Address:</strong>
                  <span>{platformConfig?.headquarters || "Plot 18, Commercial Hub, Sector 17-C, Chandigarh 160017, India"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-700/40">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <strong className="text-white block text-xs mb-0.5">Corporate & Support Email:</strong>
                  <span>{platformConfig?.contactEmail || "support@aspiranthq.com"}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">Founders: {platformConfig?.founderEmail || "founders@aspiranthq.com"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-700/40">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <strong className="text-white block text-xs mb-0.5">Helpline & Hotline Numbers:</strong>
                  <span>{platformConfig?.helplinePhone || "+91 172 456 7890"}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">Alternate: {platformConfig?.secondaryPhone || "+91 98888 77665"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-900/60 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-700/40">
                  <Clock className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <strong className="text-white block text-xs mb-0.5">Office Hours:</strong>
                  <span>Mon - Sat: 9:30 AM - 6:30 PM IST</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Link
                to="/explore"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
              >
                <ShieldCheck className="w-4 h-4" /> Browse Verified Marketplace
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Send Inquiry to Chandigarh HQ</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Inquiry Delivered!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out to AspirantHQ. Our Chandigarh team will review your inquiry and respond within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98200 11223"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Type</label>
                    <select
                      value={formData.queryType}
                      onChange={(e) => setFormData({...formData, queryType: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                    >
                      <option>General Marketplace Inquiry</option>
                      <option>Counsellor Verification & Listing</option>
                      <option>Escrow Payment Holding Policy</option>
                      <option>Institutional Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message or Requirement</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
                >
                  <Send className="w-4 h-4" /> Send Inquiry to Chandigarh HQ
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
