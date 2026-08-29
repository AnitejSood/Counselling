import React from 'react';
import { getStatusClass } from '../../lib/formatters';

/**
 * StatusBadge — Color-coded pill for status strings
 * Props:
 *   status  {string}  — status value (e.g. "UPCOMING", "Admitted")
 *   label   {string}  — optional override label (defaults to status)
 *   dot     {boolean} — show colored dot prefix
 */
export const StatusBadge = ({ status, label, dot = false }) => {
  const cls = getStatusClass(status);
  return (
    <span className={`badge ${cls}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      )}
      {label || status}
    </span>
  );
};
