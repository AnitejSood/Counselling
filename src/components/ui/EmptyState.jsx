import React from 'react';
import { InboxIcon } from 'lucide-react';

/**
 * EmptyState — Clean empty list state
 * Props:
 *   icon     {React.ComponentType} — Lucide icon component
 *   title    {string}
 *   message  {string}
 *   action   {React.ReactNode} — optional CTA element
 */
export const EmptyState = ({ icon: Icon = InboxIcon, title = 'Nothing here yet', message, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
    </div>
    <h3 className="text-base font-bold text-slate-700 mb-1">{title}</h3>
    {message && <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{message}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
