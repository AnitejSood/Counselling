import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PLATFORM_CONFIG,
  MOCK_COUNSELLORS,
  MOCK_REVIEWS,
  MOCK_VERIFICATION_APPLICATIONS,
  MOCK_ESCROW_BOOKINGS,
  MOCK_PIPELINE_STUDENTS,
  MOCK_VERIFIED_PROOFS,
  MOCK_ROADMAP_TEMPLATES,
  MOCK_USERS_LIST,
  MOCK_SUBSCRIPTION_LOGS,
  INITIAL_STUDENT_PROFILE,
  INITIAL_RESOURCES,
  INITIAL_DOCUMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_SHORTLISTS,
  INITIAL_APPLICATIONS,
  INITIAL_MESSAGES,
  INITIAL_MILESTONES,
  INITIAL_STUDENTS_LIST_FOR_ADMIN,
  INITIAL_NOTIFICATIONS,
  INITIAL_COUNSELLOR_SERVICES
} from '../data/mockData';
import { COUNSELLOR_SUBSCRIPTION_TIERS, PLATFORM_COMMISSION, STUDENT_GUARANTEE_POLICY } from '../config/subscriptionConfig';

const DEFAULT_PSYCHOMETRICS = {
  riasec: {
    hollandCode: 'IRC',
    mappedCareer: {
      title: 'Software Systems Architect & Cyber Analyst',
      topCareers: ['Software Systems Architect', 'Cybersecurity Analyst', 'Data Systems Engineer']
    }
  },
  workValues: {
    environmentalFit: 'Autonomous & Engineering Track'
  },
  bigFive: {
    openness: 88,
    conscientiousness: 82,
    extraversion: 65,
    agreeableness: 78,
    neuroticism: 32
  },
  learningStyle: {
    primary: 'Visual & Kinesthetic',
    styleScore: { visual: 45, kinesthetic: 35, auditory: 20 }
  },
  eqLeadership: {
    score: 84,
    level: 'High Emotional Intelligence & Team Mentorship'
  }
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [platformConfig, setPlatformConfig] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_platform_config');
    return saved ? JSON.parse(saved) : PLATFORM_CONFIG;
  });

  const [counsellors, setCounsellors] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_counsellors');
    return saved ? JSON.parse(saved) : MOCK_COUNSELLORS;
  });

  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_reviews');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  const [verificationApps, setVerificationApps] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_verification_apps');
    return saved ? JSON.parse(saved) : MOCK_VERIFICATION_APPLICATIONS;
  });

  const [escrowBookings, setEscrowBookings] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_escrow_bookings');
    return saved ? JSON.parse(saved) : MOCK_ESCROW_BOOKINGS;
  });

  const [pipelineStudents, setPipelineStudents] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_pipeline_students');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const existingIds = new Set(parsed.map(s => s.studentId || s.id));
        const missing = MOCK_PIPELINE_STUDENTS.filter(s => !existingIds.has(s.studentId || s.id));
        return [...parsed, ...missing];
      } catch (e) {}
    }
    return MOCK_PIPELINE_STUDENTS;
  });

  const [adminStudentsList, setAdminStudentsList] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_admin_students');
    return saved ? JSON.parse(saved) : MOCK_PIPELINE_STUDENTS;
  });

  const [verifiedProofs, setVerifiedProofs] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_verified_proofs');
    return saved ? JSON.parse(saved) : MOCK_VERIFIED_PROOFS;
  });

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_users_list');
    return saved ? JSON.parse(saved) : MOCK_USERS_LIST;
  });

  const [subscriptionLogs, setSubscriptionLogs] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_subscription_logs');
    return saved ? JSON.parse(saved) : MOCK_SUBSCRIPTION_LOGS;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_student_profile');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  // Counsellor Services & Packages State
  const [counsellorServices, setCounsellorServices] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_counsellor_services');
    return saved ? JSON.parse(saved) : INITIAL_COUNSELLOR_SERVICES;
  });

  // Active Student Selection for Counsellor Portal Adaptation
  const [activeStudentId, setActiveStudentId] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_active_student_id');
    return saved ? JSON.parse(saved) : 'std_101';
  });

  const switchActiveStudent = (id) => {
    setActiveStudentId(id);
    localStorage.setItem('aspiranthq_active_student_id', JSON.stringify(id));
  };

  const addCounsellorService = (serviceData) => {
    const newSrv = {
      id: `srv_${Date.now()}`,
      ...serviceData
    };
    const updated = [...counsellorServices, newSrv];
    setCounsellorServices(updated);
    localStorage.setItem('aspiranthq_counsellor_services', JSON.stringify(updated));
  };

  const updateCounsellorService = (id, updatedFields) => {
    const updated = counsellorServices.map(s => s.id === id ? { ...s, ...updatedFields } : s);
    setCounsellorServices(updated);
    localStorage.setItem('aspiranthq_counsellor_services', JSON.stringify(updated));
  };

  const deleteCounsellorService = (id) => {
    const updated = counsellorServices.filter(s => s.id !== id);
    setCounsellorServices(updated);
    localStorage.setItem('aspiranthq_counsellor_services', JSON.stringify(updated));
  };

  // Psychometric Assigned Tests (Counsellor assigns 2 or 3 of 5 tests)
  const [assignedPsychometrics, setAssignedPsychometrics] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_assigned_psychometrics');
    return saved ? JSON.parse(saved) : ['riasec', 'bigFive', 'learningStyle'];
  });

  // Support Tickets State
  const [supportTickets, setSupportTickets] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_support_tickets');
    return saved ? JSON.parse(saved) : [
      { id: 'ticket_101', userRole: 'STUDENT', userName: 'Rohan Mehta', userEmail: 'rohan.mehta@example.com', subject: 'Document review timeline', message: 'How long does SOP verification take?', status: 'OPEN', createdAt: '2026-08-25' }
    ];
  });

  // Counsellor Blog Posts linked to Resources
  const [counsellorBlogs, setCounsellorBlogs] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_counsellor_blogs');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  // Mutable student data
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [shortlists, setShortlists] = useState(INITIAL_SHORTLISTS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Active student object derived from pipelineStudents
  const activeStudent = pipelineStudents.find(s => (s.studentId || s.id) === activeStudentId) || pipelineStudents[0];

  // Derived current student profile for Counsellor view
  const currentStudentProfile = activeStudent?.personalInfo ? {
    personalInfo: activeStudent.personalInfo,
    academicBackground: activeStudent.academicBackground || {},
    interestsAndGoals: activeStudent.interestsAndGoals || {},
    testScores: activeStudent.testScores || {}
  } : studentProfile;

  // Student account settings state
  const [studentSettings, setStudentSettings] = useState(() => {
    const saved = localStorage.getItem('aspiranthq_student_settings');
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      whatsappAlerts: false,
      sessionReminders: true,
      marketingEmails: false,
      twoFactorEnabled: false
    };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('aspiranthq_platform_config', JSON.stringify(platformConfig));
    localStorage.setItem('aspiranthq_counsellors', JSON.stringify(counsellors));
    localStorage.setItem('aspiranthq_reviews', JSON.stringify(reviews));
    localStorage.setItem('aspiranthq_verification_apps', JSON.stringify(verificationApps));
    localStorage.setItem('aspiranthq_escrow_bookings', JSON.stringify(escrowBookings));
    localStorage.setItem('aspiranthq_pipeline_students', JSON.stringify(pipelineStudents));
    localStorage.setItem('aspiranthq_verified_proofs', JSON.stringify(verifiedProofs));
    localStorage.setItem('aspiranthq_users_list', JSON.stringify(usersList));
    localStorage.setItem('aspiranthq_subscription_logs', JSON.stringify(subscriptionLogs));
    localStorage.setItem('aspiranthq_student_profile', JSON.stringify(studentProfile));
    localStorage.setItem('aspiranthq_student_settings', JSON.stringify(studentSettings));
    localStorage.setItem('aspiranthq_assigned_psychometrics', JSON.stringify(assignedPsychometrics));
    localStorage.setItem('aspiranthq_support_tickets', JSON.stringify(supportTickets));
    localStorage.setItem('aspiranthq_counsellor_blogs', JSON.stringify(counsellorBlogs));
  }, [platformConfig, counsellors, reviews, verificationApps, escrowBookings, pipelineStudents, verifiedProofs, usersList, subscriptionLogs, studentProfile, studentSettings, assignedPsychometrics, supportTickets, counsellorBlogs]);

  // Check if counsellor has portal access (Tier 2 PRO or Tier 3 PREMIUM_BOOST)
  const hasPortalAccess = (counsellorOrId) => {
    let counsellorObj = counsellorOrId;
    if (typeof counsellorOrId === 'string') {
      counsellorObj = counsellors.find(c => c.id === counsellorOrId || c.contact?.email === counsellorOrId);
    }
    const tier = counsellorObj?.subscriptionTier || 'FREE';
    return tier === 'PRO' || tier === 'PREMIUM_BOOST' || COUNSELLOR_SUBSCRIPTION_TIERS[tier]?.hasPortalAccess === true;
  };

  // ─── Commission & Escrow Controllers ─────────────────────
  const updateCounsellorCommission = (counsellorId, customRate) => {
    setCounsellors(prev => prev.map(c => c.id === counsellorId ? { ...c, customCommissionRate: parseFloat(customRate) } : c));
  };

  // Counsellor can only REQUEST escrow release; Admin must approve
  const requestEscrowRelease = (bookingId, notes = '') => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'RELEASE_REQUESTED', requestNotes: notes } : b));
    addNotification(
      'ESCROW',
      'Escrow Release Requested',
      `A counsellor requested payout release for booking ${bookingId}. Admin verification required.`,
      '/admin/escrow',
      'ADMIN'
    );
  };

  const releaseEscrowPayout = (bookingId) => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'RELEASED_TO_COUNSELLOR' } : b));
    addNotification(
      'ESCROW',
      'Escrow Funds Released',
      `Admin approved payout for booking ${bookingId}. Funds transferred to counsellor balance.`,
      '/counsellor/bookings',
      'COUNSELLOR'
    );
  };

  const rejectEscrowRelease = (bookingId, reason = '') => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'HELD_IN_ESCROW', adminRejectNotes: reason } : b));
    addNotification(
      'ESCROW',
      'Escrow Release Request Declined',
      `Admin declined payout release for booking ${bookingId}. Reason: ${reason || 'Additional evidence needed'}`,
      '/counsellor/bookings',
      'COUNSELLOR'
    );
  };

  const refundEscrowBooking = (bookingId) => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'REFUNDED_TO_STUDENT' } : b));
  };

  // ─── Platform Config ─────────────────────────────────────
  const updatePlatformConfig = (updatedFields) => {
    setPlatformConfig(prev => ({ ...prev, ...updatedFields }));
  };

  // ─── Boosting & Subscription ─────────────────────────────
  const toggleCounsellorBoost = (counsellorId) => {
    setCounsellors(prev => prev.map(c => {
      if (c.id === counsellorId) {
        const newBoost = !c.isBoosted;
        return {
          ...c,
          isBoosted: newBoost,
          subscriptionTier: newBoost ? 'PREMIUM_BOOST' : c.subscriptionTier,
          boostExpiresAt: newBoost ? '2026-09-30' : null,
          boostImpressions: newBoost ? (c.boostImpressions || 0) + 500 : c.boostImpressions
        };
      }
      return c;
    }));
  };

  const upgradeCounsellorTier = (counsellorId, newTierId) => {
    const tierConfig = COUNSELLOR_SUBSCRIPTION_TIERS[newTierId];
    if (!tierConfig) return;
    setCounsellors(prev => prev.map(c => {
      if (c.id === counsellorId || c.contact?.email === counsellorId) {
        return {
          ...c,
          subscriptionTier: newTierId,
          isBoosted: newTierId === 'PREMIUM_BOOST' ? true : c.isBoosted
        };
      }
      return c;
    }));
    const newLog = {
      id: `sub_${Date.now()}`,
      counsellorName: counsellors.find(c => c.id === counsellorId)?.fullName || 'Counsellor',
      tier: newTierId,
      amount: tierConfig.priceINR || 3999,
      billingDate: new Date().toISOString().split('T')[0],
      status: 'PAID'
    };
    setSubscriptionLogs(prev => [newLog, ...prev]);
  };

  // ─── User Management (Admin) ─────────────────────────────
  const updateUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u));
  };

  const addUser = (userData) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      ...userData
    };
    setUsersList(prev => [newUser, ...prev]);
  };

  const deleteUser = (userId) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
  };

  // ─── Compare Drawer ──────────────────────────────────────
  const addToCompare = (counsellor) => {
    if (compareList.some(c => c.id === counsellor.id)) {
      setCompareList(prev => prev.filter(c => c.id !== counsellor.id));
    } else if (compareList.length < 3) {
      setCompareList(prev => [...prev, counsellor]);
    }
  };
  const removeFromCompare = (counsellorId) => setCompareList(prev => prev.filter(c => c.id !== counsellorId));
  const clearCompare = () => setCompareList([]);

  // ─── Escrow Booking Creation ─────────────────────────────
  const createEscrowBooking = (counsellorId, serviceTitle, amount, date, timeSlot) => {
    const counsellor = counsellors.find(c => c.id === counsellorId);
    const platformCut = Math.round(amount * (PLATFORM_COMMISSION.percentage / 100));
    const counsellorPayout = amount - platformCut;
    const newBooking = {
      id: `bk_${Date.now()}`,
      studentId: 'std_101',
      studentName: studentProfile.personalInfo?.fullName || 'Rohan Mehta',
      counsellorId,
      counsellorName: counsellor?.fullName || 'Counsellor',
      serviceTitle,
      amount,
      platformCut,
      counsellorPayout,
      escrowStatus: 'HELD_IN_ESCROW',
      completedSessionsCount: 0,
      sessionDate: date,
      sessionTime: timeSlot,
      trialGuaranteeEndDate: new Date(Date.now() + STUDENT_GUARANTEE_POLICY.maxRefundDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      meetingLink: `https://meet.google.com/aspiranthq-session-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEscrowBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // ─── COUNSELLOR: Psychometric Test Assignment ────────────
  const assignPsychometricTests = (testKeysArray) => {
    setAssignedPsychometrics(testKeysArray);
    setPipelineStudents(prev => prev.map(s => (s.studentId || s.id) === activeStudentId ? { ...s, assignedTests: testKeysArray } : s));
    addNotification(
      'ASSESSMENT',
      'New Psychometric Assessments Assigned',
      `Your counsellor assigned ${testKeysArray.length} tests to guide your target country & program fit.`,
      '/dashboard/assessments'
    );
  };

  // ─── COUNSELLOR: Roadmap Milestones Mutations ─────────────
  const updateMilestoneStatus = (milestoneId, newStatus) => {
    setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, status: newStatus } : m));
    setPipelineStudents(prev => prev.map(s => {
      if ((s.studentId || s.id) === activeStudentId) {
        const curM = s.milestones || milestones;
        return { ...s, milestones: curM.map(m => m.id === milestoneId ? { ...m, status: newStatus } : m) };
      }
      return s;
    }));
  };

  const addMilestone = (milestone) => {
    const newM = {
      id: `m_${Date.now()}`,
      stageNumber: (activeStudent?.milestones?.length || milestones.length) + 1,
      status: 'UPCOMING',
      ...milestone
    };
    setMilestones(prev => [...prev, newM]);
    setPipelineStudents(prev => prev.map(s => {
      if ((s.studentId || s.id) === activeStudentId) {
        const curM = s.milestones || milestones;
        return { ...s, milestones: [...curM, newM] };
      }
      return s;
    }));
  };

  const editMilestone = (milestoneId, updatedData) => {
    setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, ...updatedData } : m));
    setPipelineStudents(prev => prev.map(s => {
      if ((s.studentId || s.id) === activeStudentId) {
        const curM = s.milestones || milestones;
        return { ...s, milestones: curM.map(m => m.id === milestoneId ? { ...m, ...updatedData } : m) };
      }
      return s;
    }));
  };

  const deleteMilestone = (milestoneId) => {
    setMilestones(prev => prev.filter(m => m.id !== milestoneId));
    setPipelineStudents(prev => prev.map(s => {
      if ((s.studentId || s.id) === activeStudentId) {
        const curM = s.milestones || milestones;
        return { ...s, milestones: curM.filter(m => m.id !== milestoneId) };
      }
      return s;
    }));
  };

  const reorderMilestones = (startIndex, endIndex) => {
    setPipelineStudents(prev => prev.map(s => {
      if ((s.studentId || s.id) === activeStudentId) {
        const result = Array.from(s.milestones || milestones);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        const updatedM = result.map((item, index) => ({ ...item, stageNumber: index + 1 }));
        setMilestones(updatedM);
        return { ...s, milestones: updatedM };
      }
      return s;
    }));
  };

  // ─── COUNSELLOR: Recommendations Dispatch ───────────────
  const sendUniversityRecommendation = (schoolName, program, category, description) => {
    const newRec = {
      id: `rec_${Date.now()}`,
      name: `${schoolName} - ${program}`,
      category: category || 'Recommended by Counsellor',
      description: description || 'Selected by your counsellor based on your academic GPA & psychometric fit.',
      universityDetails: { country: 'Global' }
    };
    setRecommendations(prev => [newRec, ...prev]);
    const newShortlist = {
      id: `sl_${Date.now()}`,
      university: schoolName,
      program,
      category: category || 'Recommended'
    };
    setShortlists(prev => [newShortlist, ...prev]);
    addNotification(
      'RECOMMENDATION',
      `New University Recommendation: ${schoolName}`,
      `Your counsellor recommended ${schoolName} for ${program}. View it in your shortlist.`,
      '/dashboard/recommendations'
    );
  };

  // ─── COUNSELLOR: Availability Slots & Meeting Link ────────
  const updateCounsellorAvailabilitySlots = (counsellorId, slotsArray) => {
    setCounsellors(prev => prev.map(c => c.id === counsellorId ? { ...c, availableSlots: slotsArray } : c));
  };

  const updateAppointmentMeetingLink = (appointmentId, meetingLink) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, meetingLink } : a));
  };

  // ─── Documents Management ─────────────────────────────────
  const updateDocumentStatus = (docId, status, comment) => {
    setDocuments(prev => prev.map(d => d.id === docId
      ? { ...d, status, counsellorComment: comment || d.counsellorComment }
      : d
    ));
  };

  const addDocument = (doc) => {
    setDocuments(prev => [{
      id: `doc_${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      ...doc
    }, ...prev]);
  };

  // ─── Applications Management ──────────────────────────────
  const addApplication = (app) => {
    setApplications(prev => [{
      id: `app_${Date.now()}`,
      ...app
    }, ...prev]);
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  // ─── Appointments Management & Rescheduling Workflow ────────
  const addAppointmentNote = (appointmentId, note) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId
      ? { ...a, counsellorNotes: note }
      : a
    ));
  };

  const addAppointment = (appointment) => {
    const newApt = {
      id: `apt_${Date.now()}`,
      status: appointment.status || 'PENDING_APPROVAL',
      meetingMode: 'Video Call',
      meetingLink: null,
      ...appointment
    };
    setAppointments(prev => [newApt, ...prev]);
    addNotification(
      'APPOINTMENT',
      'New Session Booking Requested',
      `Student ${appointment.studentName || 'Student'} requested a session on ${appointment.date} at ${appointment.timeSlot}.`,
      '/counsellor/bookings',
      'COUNSELLOR'
    );
    return newApt;
  };

  const approveBookingSession = (appointmentId, meetingLink, counsellorNotes) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          status: 'UPCOMING',
          meetingLink: meetingLink || `https://meet.google.com/aspiranthq-session-${Date.now().toString().slice(-4)}`,
          counsellorNotes: counsellorNotes || 'Session confirmed by counsellor.',
          meetingMode: 'Google Meet Video Call'
        };
      }
      return a;
    }));
    addNotification(
      'APPOINTMENT',
      'Session Booking Approved! 🎉',
      `Your counsellor approved your session! Meeting link attached.`,
      '/dashboard/appointments',
      'STUDENT'
    );
  };

  const proposeAlternativeTimes = (appointmentId, suggestedTimesArray, counsellorNotes) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          status: 'TIME_SUGGESTED',
          suggestedTimes: suggestedTimesArray,
          counsellorNotes: counsellorNotes || 'Counsellor proposed new available times.'
        };
      }
      return a;
    }));
    addNotification(
      'APPOINTMENT',
      'New Time Slots Proposed by Counsellor',
      `Your counsellor proposed ${suggestedTimesArray.length} alternative times. Select one to confirm your session!`,
      '/dashboard/appointments',
      'STUDENT'
    );
  };

  const studentConfirmProposedTime = (appointmentId, chosenDate, chosenTimeSlot) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return {
          ...a,
          date: chosenDate,
          timeSlot: chosenTimeSlot,
          status: 'UPCOMING',
          meetingLink: a.meetingLink || `https://meet.google.com/aspiranthq-session-${Date.now().toString().slice(-4)}`
        };
      }
      return a;
    }));
    addNotification(
      'APPOINTMENT',
      'Time Slot Confirmed by Student',
      `Student confirmed slot: ${chosenDate} at ${chosenTimeSlot}.`,
      '/counsellor/bookings',
      'COUNSELLOR'
    );
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(a =>
      a.id === appointmentId ? { ...a, status: 'CANCELLED' } : a
    ));
  };

  const rescheduleAppointment = (appointmentId, newDate, newTimeSlot) => {
    setAppointments(prev => prev.map(a =>
      a.id === appointmentId ? { ...a, date: newDate, timeSlot: newTimeSlot, status: 'PENDING_APPROVAL' } : a
    ));
  };

  // ─── Reviews & Verification ────────────────────────────────
  const addReview = (counsellorId, rating, tags, content, outcomeText) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      counsellorId,
      studentName: studentProfile.personalInfo?.fullName || 'Verified Student',
      track: 'Study abroad admissions',
      rating,
      date: new Date().toISOString().split('T')[0],
      tags,
      content,
      outcomeVerified: !!outcomeText,
      outcomeText: outcomeText || null,
      counsellorReply: null
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const replyToReview = (reviewId, replyText) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, counsellorReply: replyText } : r));
  };

  const submitVerificationApp = (appData) => {
    const generatedUsername = `counsellor_${Date.now().toString().slice(-4)}`;
    const generatedPassword = `Pass@${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      id: `vapp_${Date.now()}`,
      counsellorName: appData.fullName,
      email: appData.email,
      experienceYears: appData.experienceYears || 5,
      tracks: appData.tracks || ['Study abroad admissions'],
      credentials: appData.credentials || 'Certified Career Analyst',
      credentialsLinks: appData.credentialsLinks || [],
      frontIdUrl: appData.frontIdUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
      backIdUrl: appData.backIdUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
      claimedPlacements: appData.claimedPlacements || 150,
      subscriptionTier: appData.subscriptionTier || 'FREE',
      generatedUsername,
      generatedPassword,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'PENDING_REVIEW',
      adminNotes: 'Application & ID documents received. Under verification review.'
    };
    setVerificationApps(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateVerificationStatus = (appId, status, adminNotes) => {
    setVerificationApps(prev => prev.map(a => {
      if (a.id === appId) {
        if (status === 'VERIFIED') {
          // Auto add counsellor to active counsellors list if approved
          const newCounsellor = {
            id: `counsellor_${Date.now()}`,
            fullName: a.counsellorName,
            title: a.specialtyTrack || 'Certified Career Strategist',
            credentials: a.credentials,
            photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
            experienceYears: a.experienceYears || 5,
            verifiedPlacementsCount: a.claimedPlacements || 100,
            scholarshipsSecured: '₹5+ Crore',
            rating: 5.0,
            reviewCount: 1,
            responseTime: '< 2 hours',
            pricePerSession: 25000,
            priceCategory: 'Starting ₹25,000 / package',
            destinations: ['UK & Ireland', 'United States', 'Canada'],
            track: a.tracks?.[0] || 'Study abroad admissions',
            tags: a.tracks || ['Admissions'],
            isSponsored: false,
            isBoosted: false,
            subscriptionTier: a.subscriptionTier || 'PRO',
            verificationStatus: 'VERIFIED',
            badgeLabel: 'Verified Counsellor',
            bio: `${a.counsellorName} is a verified AspirantHQ counsellor with ${a.experienceYears} years of admissions mentorship.`,
            contact: { email: a.email, phone: '+91 98000 00000', office: 'Virtual Desk' },
            services: [
              { id: `srv_${Date.now()}`, title: 'Complete Admissions Package', price: 25000, desc: 'End-to-end strategy, shortlisting & SOP mentorship.' }
            ]
          };
          setCounsellors(cList => [newCounsellor, ...cList]);
        }
        return { ...a, status, adminNotes };
      }
      return a;
    }));
  };

  const uploadVerifiedProof = (counsellorId, studentName, universityName, program, fileName) => {
    const newProof = {
      id: `prf_${Date.now()}`,
      counsellorId,
      studentName,
      universityName,
      program,
      documentName: fileName || 'Offer_Letter_Proof.pdf',
      uploadedAt: new Date().toISOString().split('T')[0],
      verificationStatus: 'VERIFIED',
      verifiedBy: 'AspirantHQ Verification Desk'
    };
    setVerifiedProofs(prev => [newProof, ...prev]);
    setCounsellors(prev => prev.map(c => c.id === counsellorId ? { ...c, verifiedPlacementsCount: (c.verifiedPlacementsCount || 0) + 1 } : c));
  };

  // ─── Pipeline Updates ──────────────────────────────────────
  const updateStudentPipelineStage = (studentId, schoolName, newStatus) => {
    setPipelineStudents(prev => prev.map(std => {
      if (std.studentId === studentId) {
        return {
          ...std,
          applications: std.applications.map(app => app.school === schoolName ? { ...app, status: newStatus } : app)
        };
      }
      return std;
    }));
  };

  // ─── Support Ticketing ─────────────────────────────────────
  const submitSupportTicket = (userRole, userName, userEmail, subject, message) => {
    const newTicket = {
      id: `ticket_${Date.now()}`,
      userRole,
      userName,
      userEmail,
      subject,
      message,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  // ─── Blog Publications ────────────────────────────────────
  const addCounsellorBlog = (blogData) => {
    const newBlog = {
      id: `blog_${Date.now()}`,
      title: blogData.title,
      summary: blogData.summary,
      category: blogData.category || 'Study Abroad Strategy',
      readTime: '5 min read',
      author: blogData.authorName || 'Verified Counsellor',
      date: new Date().toISOString().split('T')[0],
      tags: blogData.tags || ['Guidance', 'Admissions'],
      content: blogData.content || blogData.summary,
      externalUrl: blogData.externalUrl || null
    };
    setCounsellorBlogs(prev => [newBlog, ...prev]);
  };

  // ─── Student Profile & Messaging ─────────────────────────
  const updateStudentProfile = (updatedData) => setStudentProfile(prev => ({ ...prev, ...updatedData }));
  const updateStudentSettings = (updatedSettings) => setStudentSettings(prev => ({ ...prev, ...updatedSettings }));

  const sendMessage = (senderRole, senderName, content, fileAttachment = null) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderRole,
      senderName,
      content,
      fileAttachment,
      timestamp: new Date().toLocaleString('en-IN', {
        hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric'
      }),
      unread: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const markNotificationRead = (notifId) => setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const addNotification = (type, title, message, link) => {
    setNotifications(prev => [{
      id: `notif_${Date.now()}`,
      type,
      title,
      message,
      link,
      read: false,
      createdAt: new Date().toISOString()
    }, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      // Platform & Config
      platformConfig,
      updatePlatformConfig,

      // Counsellors, Subscriptions & Services
      counsellors,
      counsellorProfile: counsellors[0],
      counsellorServices,
      addCounsellorService,
      updateCounsellorService,
      deleteCounsellorService,
      hasPortalAccess,
      updateCounsellorCommission,
      toggleCounsellorBoost,
      upgradeCounsellorTier,
      updateCounsellorAvailabilitySlots,

      // Active Student Selector for Counsellor Portal Adaptation
      activeStudentId,
      switchActiveStudent,
      activeStudent,
      allStudentsList: pipelineStudents,

      // Compare
      compareList,
      isCompareOpen,
      setIsCompareOpen,
      addToCompare,
      removeFromCompare,
      clearCompare,

      // Reviews
      reviews,
      addReview,
      replyToReview,

      // Verification & Applications
      verificationApps,
      submitVerificationApp,
      updateVerificationStatus,

      // Escrow & Bookings
      escrowBookings,
      createEscrowBooking,
      requestEscrowRelease,
      releaseEscrowPayout,
      rejectEscrowRelease,
      refundEscrowBooking,

      // Pipeline
      pipelineStudents,
      updateStudentPipelineStage,
      sendUniversityRecommendation,

      // Verified Proofs
      verifiedProofs,
      uploadVerifiedProof,

      // User Management (Admin RBAC)
      usersList,
      updateUserRole,
      toggleUserStatus,
      addUser,
      deleteUser,

      // Subscriptions
      subscriptionLogs,

      // Support & Blogs
      supportTickets,
      submitSupportTicket,
      counsellorBlogs,
      addCounsellorBlog,

      // Student Data (Dynamically adapts to active student when in Counsellor Portal)
      studentProfile: currentStudentProfile,
      updateStudentProfile,
      studentSettings,
      updateStudentSettings,
      assignedPsychometrics: activeStudent?.assignedTests || assignedPsychometrics,
      assignPsychometricTests,
      milestones: activeStudent?.milestones || milestones,
      documents,
      appointments,
      approveBookingSession,
      proposeAlternativeTimes,
      studentConfirmProposedTime,
      cancelAppointment,
      rescheduleAppointment,
      updateAppointmentMeetingLink,
      recommendations: activeStudent?.recommendations || recommendations,
      shortlists,
      applications: activeStudent?.applications || applications,
      messages,
      sendMessage,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      addNotification,
      resources: counsellorBlogs,
      adminStudentsList,

      // Counsellor Mutations
      updateMilestoneStatus,
      addMilestone,
      editMilestone,
      deleteMilestone,
      reorderMilestones,
      updateDocumentStatus,
      addDocument,
      addApplication,
      updateApplicationStatus,
      addAppointmentNote,
      addAppointment,

      // Static Data
      psychometricResults: DEFAULT_PSYCHOMETRICS,
      roadmapTemplates: MOCK_ROADMAP_TEMPLATES
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
