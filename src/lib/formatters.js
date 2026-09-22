/**
 * lib/formatters.js
 * Pure utility functions for formatting values consistently across the app
 */

/**
 * Format a number as Indian Rupee currency
 * @param {number} amount
 * @returns {string} e.g. "₹25,000"
 */
export const formatINR = (amount) => {
  if (amount == null) return '₹0';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};

/**
 * Format a date string to a readable format
 * @param {string} dateStr - ISO or YYYY-MM-DD string
 * @returns {string} e.g. "Aug 10, 2026"
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a date as relative time (e.g. "2 hours ago")
 * @param {string|Date} timestamp
 * @returns {string}
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;

  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1)  return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24)  return `${diffHr}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(timestamp);
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text to max length with ellipsis
 */
export const truncate = (str, maxLen = 80) => {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trim() + '…';
};

/**
 * Get initials from a full name (up to 2 chars)
 * @param {string} name
 * @returns {string} e.g. "RM"
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
};

/**
 * Returns a CSS class string for a status value
 */
export const getStatusClass = (status) => {
  const map = {
    UPCOMING: 'badge-emerald',
    COMPLETED: 'badge-slate',
    CANCELLED: 'badge-rose',
    IN_PROGRESS: 'badge-indigo',
    PENDING: 'badge-amber',
    PENDING_REVIEW: 'badge-amber',
    VERIFIED: 'badge-emerald',
    APPROVED_FULL: 'badge-emerald',
    'Under Review': 'badge-amber',
    'Changes Required': 'badge-rose',
    'Admitted': 'badge-emerald',
    'In Progress': 'badge-indigo',
    'Submitted': 'badge-purple',
  };
  return map[status] || 'badge-slate';
};
