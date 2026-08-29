import React from 'react';
import { useData } from '../../context/DataContext';

export const ContentAdmin = () => {
  const { resources } = useData();
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <span className="text-xs font-bold uppercase text-purple-600">Content Management</span>
      <h1 className="text-2xl font-extrabold text-slate-900">Resource Articles & Guides ({resources.length})</h1>
      <div className="space-y-3">
        {resources.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1 text-xs">
            <span className="font-bold text-purple-600">{r.category}</span>
            <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
            <p className="text-slate-500">By {r.author} • {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
