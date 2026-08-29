import React from 'react';

/**
 * PageHeader — Reusable branded page section header
 * Props:
 *   eyebrow  {string}  — small uppercase label above title
 *   title    {string}  — main page title (h1)
 *   subtitle {string}  — optional description below title
 *   action   {React.ReactNode} — optional right-side button/element
 *   className {string} — extra classes on wrapper
 */
export const PageHeader = ({ eyebrow, title, subtitle, action, className = '' }) => (
  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 ${className}`}>
    <div>
      {eyebrow && (
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-2">
          {eyebrow}
        </span>
      )}
      <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{title}</h1>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
