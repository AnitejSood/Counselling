import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Compass,
  Globe,
  GraduationCap,
  CheckSquare,
  FileText,
  ShieldCheck,
  Calendar,
  CheckCircle,
  X
} from 'lucide-react';

export const Services = () => {
  const { services } = useData();
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'Globe': return Globe;
      case 'GraduationCap': return GraduationCap;
      case 'CheckSquare': return CheckSquare;
      case 'FileText': return FileText;
      case 'ShieldCheck': return ShieldCheck;
      default: return Compass;
    }
  };

  return (
    <div className="py-12 space-y-12 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Core Mentorship Offerings
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Essential Guidance Solutions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Every service is personally delivered by Arti Sood to ensure consistent quality, strategic depth, and objective advice.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => {
          const IconComp = getServiceIcon(srv.icon);
          return (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm card-hover-effect flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  {srv.popular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{srv.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">{srv.title}</h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{srv.tagline}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">What Is Included:</span>
                  <ul className="space-y-1 text-slate-600">
                    {srv.whatIsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => setSelectedServiceModal(srv)}
                  className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  Learn Process →
                </button>
                <Link
                  to="/book"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Discuss With Arti Sood
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 space-y-5 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{selectedServiceModal.category}</span>
              <h3 className="text-xl font-bold text-slate-900">{selectedServiceModal.title}</h3>
              <p className="text-slate-600">{selectedServiceModal.description}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-800">Process</p>
              <p className="text-slate-700 font-medium leading-relaxed">{selectedServiceModal.howItWorks}</p>
            </div>

            <div className="pt-2 flex gap-3">
              <Link
                to="/book"
                onClick={() => setSelectedServiceModal(null)}
                className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-center text-xs shadow-md hover:bg-blue-700 transition"
              >
                Discuss With Arti Sood
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
