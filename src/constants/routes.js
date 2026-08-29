/**
 * constants/routes.js
 * Single source of truth for all route paths.
 * Prevents magic string typos across Link/navigate calls.
 */

export const ROUTES = {
  // Public
  HOME: '/',
  EXPLORE: '/explore',
  COUNSELLOR_PROFILE: (id) => `/counsellor-profile/${id}`,
  BOOK: '/book',
  APPLY_COUNSELLOR: '/apply-counsellor',
  RESOURCES: '/resources',
  CONTACT: '/contact',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Student Portal
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_ASSESSMENTS: '/dashboard/assessments',
  DASHBOARD_ASSESSMENTS_RIASEC: '/dashboard/assessments/riasec',
  DASHBOARD_ASSESSMENTS_BIG5: '/dashboard/assessments/big-five',
  DASHBOARD_ASSESSMENTS_VALUES: '/dashboard/assessments/work-values',
  DASHBOARD_JOURNEY: '/dashboard/journey',
  DASHBOARD_RECOMMENDATIONS: '/dashboard/recommendations',
  DASHBOARD_EXPLORE: '/dashboard/explore',
  DASHBOARD_SHORTLIST: '/dashboard/shortlist',
  DASHBOARD_APPLICATIONS: '/dashboard/applications',
  DASHBOARD_DOCUMENTS: '/dashboard/documents',
  DASHBOARD_APPOINTMENTS: '/dashboard/appointments',
  DASHBOARD_MESSAGES: '/dashboard/messages',
  DASHBOARD_SERVICES: '/dashboard/services',
  DASHBOARD_NOTIFICATIONS: '/dashboard/notifications',
  DASHBOARD_SETTINGS: '/dashboard/settings',

  // Counsellor Portal
  COUNSELLOR: '/counsellor',
  COUNSELLOR_PROFILE_BUILD: '/counsellor/profile',
  COUNSELLOR_BOOKINGS: '/counsellor/bookings',
  COUNSELLOR_INTAKE: '/counsellor/intake',
  COUNSELLOR_ROADMAP: '/counsellor/roadmap',
  COUNSELLOR_PIPELINE: '/counsellor/pipeline',
  COUNSELLOR_PROOF: '/counsellor/proof',
  COUNSELLOR_ANALYTICS: '/counsellor/analytics',

  // Admin
  ADMIN: '/admin',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_STUDENT_DETAIL: (id) => `/admin/students/${id}`,
  ADMIN_APPOINTMENTS: '/admin/appointments',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_DOCUMENTS: '/admin/documents',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_TASKS: '/admin/tasks',
};
