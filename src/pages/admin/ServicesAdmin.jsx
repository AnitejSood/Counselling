import React from 'react';
import { useData } from '../../context/DataContext';

export const ServicesAdmin = () => {
  const { services } = useData();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <span className="text-xs font-bold uppercase text-purple-600">Offerings Management</span>
      <h1 className="text-2xl font-extrabold text-slate-900">Services Catalog ({services.length} Active Services)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((srv) => (
          <div key={srv.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase text-purple-600">{srv.category}</span>
            <h3 className="font-bold text-slate-900 text-sm">{srv.title}</h3>
            <p className="text-slate-600">{srv.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
