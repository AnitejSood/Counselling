import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { MatchEdLogo } from '../common/MatchEdLogo';
import { PlatformRatingModal } from '../common/PlatformRatingModal';

export const Footer = () => {
  const { platformConfig } = useData();
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  return (
    <footer className="bg-[#07192F] text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MatchEdLogo size="md" theme="light" />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Precision mentor matching for global admissions. Verified counsellors, top-tier university scholars, transparent platform escrow holding, and our 1-month flexible match guarantee.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#CFA25E] bg-[#CFA25E]/10 border border-[#CFA25E]/30 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-[#CFA25E] shrink-0" />
              <span>Escrow Held Payments · 1st Free Discovery Call · 1-Month Switch Window</span>
            </div>

            <button
              onClick={() => setRatingModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-[#CFA25E] fill-[#CFA25E]" />
              Rate matchEd Platform
            </button>
          </div>

          {/* Marketplace Tracks */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Marketplace Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore?track=Study+abroad+admissions" className="hover:text-[#CFA25E] transition">Study Abroad Admissions</Link></li>
              <li><Link to="/explore?tab=scholars" className="hover:text-[#CFA25E] transition text-white font-semibold">Top Scholars & Quick Doubts</Link></li>
              <li><Link to="/explore?track=Domestic+India+admissions" className="hover:text-[#CFA25E] transition">Domestic India Admissions</Link></li>
              <li><Link to="/explore?track=Sports+quota+admissions" className="hover:text-[#CFA25E] transition">Sports Quota Admissions</Link></li>
              <li><Link to="/explore?track=International+athletic+scholarships" className="hover:text-[#CFA25E] transition">Athletic Scholarships (NCAA)</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Platform & Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore" className="hover:text-[#CFA25E] transition">Browse Verified Mentors</Link></li>
              <li><Link to="/apply-counsellor" className="hover:text-[#CFA25E] transition">Apply as Counsellor</Link></li>
              <li><Link to="/resources" className="hover:text-[#CFA25E] transition">Knowledge & Blog Hub</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#CFA25E] transition">Student Portal</Link></li>
              <li><Link to="/counsellor" className="hover:text-[#CFA25E] transition">Counsellor Portal</Link></li>
              <li><Link to="/contact" className="hover:text-[#CFA25E] transition">Support & Contact</Link></li>
            </ul>
          </div>

          {/* Corporate HQ Info */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#CFA25E] mt-0.5 shrink-0" />
                <span>{platformConfig?.headquarters || "Plot 18, Commercial Hub, Sector 17-C, Chandigarh 160017, India"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#CFA25E] shrink-0" />
                <a href={`mailto:${platformConfig?.contactEmail}`} className="hover:text-white transition">{platformConfig?.contactEmail || "support@matched.com"}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#CFA25E] shrink-0" />
                <span>{platformConfig?.helplinePhone || "+91 172 456 7890"}</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/apply-counsellor"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#CFA25E] hover:bg-[#B88B46] text-[#0B2545] font-extrabold text-xs transition shadow-md"
                >
                  Join as Advisor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 {platformConfig?.companyName || "matchEd Platform Technologies Pvt. Ltd."} All Rights Reserved. Chandigarh HQ, India.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Escrow & 1-Month Switch Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Verification & Placement Audits</span>
          </div>
        </div>
      </div>

      <PlatformRatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        userRole="PUBLIC"
      />
    </footer>
  );
};

export default Footer;
