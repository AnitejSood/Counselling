import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const Footer = () => {
  const { platformConfig } = useData();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 to-amber-500 flex items-center justify-center text-white font-bold shadow-lg">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Aspirant<span className="text-indigo-400">HQ</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              India's premier marketplace for verified study abroad, domestic entrance, and athletic admissions counsellors. Operating transparently under platform escrow protection.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Escrow Held Payments • Verified Placements Only</span>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Marketplace Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore?track=Study+abroad+admissions" className="hover:text-indigo-400 transition">Study Abroad Admissions</Link></li>
              <li><Link to="/explore?track=Domestic+India+admissions" className="hover:text-indigo-400 transition">Domestic India Admissions</Link></li>
              <li><Link to="/explore?track=Sports+quota+admissions" className="hover:text-indigo-400 transition">Sports Quota Strategy</Link></li>
              <li><Link to="/explore?track=International+athletic+scholarships" className="hover:text-indigo-400 transition">Athletic Scholarships (NCAA)</Link></li>
              <li><Link to="/explore" className="hover:text-indigo-400 transition">Side-by-Side Advisor Compare</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Platform & Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/explore" className="hover:text-indigo-400 transition">Find a Advisor</Link></li>
              <li><Link to="/apply-counsellor" className="hover:text-indigo-400 transition">Apply as Independent Advisor</Link></li>
              <li><Link to="/resources" className="hover:text-indigo-400 transition">Knowledge Hub</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400 transition">Student Dashboard</Link></li>
              <li><Link to="/counsellor" className="hover:text-indigo-400 transition">Counsellor Storefront</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition">Corporate HQ Contact</Link></li>
            </ul>
          </div>

          {/* Corporate HQ Info */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">
              Corporate Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span>{platformConfig?.headquarters || "Plot 18, Commercial Hub, Sector 17-C, Chandigarh 160017, India"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${platformConfig?.contactEmail}`} className="hover:text-white transition">{platformConfig?.contactEmail || "support@aspiranthq.com"}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{platformConfig?.helplinePhone || "+91 172 456 7890"}</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/apply-counsellor"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
                >
                  Join as Advisor <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 {platformConfig?.companyName || "AspirantHQ Marketplace Technologies Pvt. Ltd."} All Rights Reserved. Chandigarh HQ, India.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Platform Escrow Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy & Verification Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
