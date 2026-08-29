import React from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Compass, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export const ServicesView = () => {
  const { counsellors } = useData();

  // Aggregate all marketplace services across verified counsellors
  const marketplaceServices = (counsellors || []).flatMap(c => 
    (c.services || []).map(srv => ({
      ...srv,
      counsellorId: c.id,
      counsellorName: c.fullName,
      counsellorPhoto: c.photoUrl,
      track: c.track,
      rating: c.rating
    }))
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
          AspirantHQ Mentorship Packages
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">Marketplace Counselling Services</h1>
        <p className="text-xs text-slate-500 mt-1">Browse fixed-rate consultation packages offered by verified marketplace advisors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceServices.map((srv) => (
          <div key={`${srv.counsellorId}_${srv.id}`} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:border-indigo-300 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <img src={srv.counsellorPhoto} alt={srv.counsellorName} className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-50" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{srv.counsellorName}</span>
                  <span className="text-[10px] text-indigo-600 font-medium block">{srv.track}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider">Package Rate</span>
                <span className="text-lg font-extrabold text-slate-900">₹{srv.price.toLocaleString('en-IN')}</span>
              </div>

              <Link
                to={`/book?counsellorId=${srv.counsellorId}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
              >
                <Calendar className="w-4 h-4" /> Book Session with {srv.counsellorName.split(' ')[0]} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
