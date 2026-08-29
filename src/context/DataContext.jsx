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
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { SUBSCRIPTION_TIERS } from '../config/subscriptionTiers';

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

  // Mutable student data
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [shortlists, setShortlists] = useState(INITIAL_SHORTLISTS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [resources] = useState(INITIAL_RESOURCES);
  const [adminStudentsList] = useState(INITIAL_STUDENTS_LIST_FOR_ADMIN);

  // Student account settings state (saved to localStorage)
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
  }, [platformConfig, counsellors, reviews, verificationApps, escrowBookings, pipelineStudents, verifiedProofs, usersList, subscriptionLogs, studentProfile, studentSettings]);

  // ─── Commission Controller ───────────────────────────────
  const updateCounsellorCommission = (counsellorId, customRate) => {
    setCounsellors(prev => prev.map(c => c.id === counsellorId ? { ...c, customCommissionRate: parseFloat(customRate) } : c));
  };

  // ─── Escrow Release / Refund ─────────────────────────────
  const releaseEscrowPayout = (bookingId) => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'RELEASED_TO_COUNSELLOR' } : b));
  };

  const refundEscrowBooking = (bookingId) => {
    setEscrowBookings(prev => prev.map(b => b.id === bookingId ? { ...b, escrowStatus: 'REFUNDED_TO_STUDENT' } : b));
  };

  // ─── Platform Config ─────────────────────────────────────
  const updatePlatformConfig = (updatedFields) => {
    setPlatformConfig(prev => ({ ...prev, ...updatedFields }));
  };

  // ─── Boosting ────────────────────────────────────────────
  const toggleCounsellorBoost = (counsellorId) => {
    setCounsellors(prev => prev.map(c => {
      if (c.id === counsellorId) {
        const newBoost = !c.isBoosted;
        return {
          ...c,
          isBoosted: newBoost,
          boostExpiresAt: newBoost ? '2026-09-15' : null,
          boostImpressions: newBoost ? (c.boostImpressions || 0) + 500 : c.boostImpressions
        };
      }
      return c;
    }));
  };

  // ─── Subscription Tier Upgrade ───────────────────────────
  const upgradeCounsellorTier = (counsellorId, newTierId) => {
    const tierConfig = SUBSCRIPTION_TIERS[newTierId];
    if (!tierConfig) return;
    setCounsellors(prev => prev.map(c => {
      if (c.id === counsellorId) {
        return {
          ...c,
          subscriptionTier: newTierId,
          customCommissionRate: tierConfig.commissionRate,
          isBoosted: newTierId === 'ELITE' ? true : c.isBoosted,
          boostTokens: (c.boostTokens || 0) + tierConfig.boostTokensIncluded
        };
      }
      return c;
    }));
    const newLog = {
      id: `sub_${Date.now()}`,
      counsellorName: counsellors.find(c => c.id === counsellorId)?.fullName || 'Counsellor',
      tier: newTierId,
      amount: tierConfig.priceMonthly,
      billingDate: new Date().toISOString().split('T')[0],
      status: 'PAID'
    };
    setSubscriptionLogs(prev => [newLog, ...prev]);
  };

  // ─── RBAC ────────────────────────────────────────────────
  const updateUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u));
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

  // ─── Escrow Booking ──────────────────────────────────────
  const createEscrowBooking = (counsellorId, serviceTitle, amount, date, timeSlot) => {
    const counsellor = counsellors.find(c => c.id === counsellorId);
    const newBooking = {
      id: `bk_${Date.now()}`,
      studentId: 'std_101',
      studentName: studentProfile.personalInfo?.fullName || 'Rohan Mehta',
      counsellorId,
      counsellorName: counsellor?.fullName || 'Counsellor',
      serviceTitle,
      amount,
      escrowStatus: 'HELD_IN_ESCROW',
      sessionDate: date,
      sessionTime: timeSlot,
      meetingLink: `https://meet.jit.si/AspirantHQ_Session_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEscrowBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // ─── COUNSELLOR: Student Data Mutations ──────────────────

  // Milestone management by counsellor
  const updateMilestoneStatus = (milestoneId, newStatus) => {
    setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, status: newStatus } : m));
  };

  const addMilestone = (milestone) => {
    setMilestones(prev => [...prev, {
      id: `m_${Date.now()}`,
      stageNumber: prev.length + 1,
      status: 'UPCOMING',
      ...milestone
    }]);
  };

  const deleteMilestone = (milestoneId) => {
    setMilestones(prev => prev.filter(m => m.id !== milestoneId));
  };

  // Document management by counsellor
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

  // Application management by counsellor
  const addApplication = (app) => {
    setApplications(prev => [{
      id: `app_${Date.now()}`,
      ...app
    }, ...prev]);
  };

  const updateApplicationStatus = (appId, status) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
  };

  // Appointment note by counsellor
  const addAppointmentNote = (appointmentId, note) => {
    setAppointments(prev => prev.map(a => a.id === appointmentId
      ? { ...a, counsellorNotes: note }
      : a
    ));
  };

  const addAppointment = (appointment) => {
    setAppointments(prev => [{
      id: `apt_${Date.now()}`,
      status: 'UPCOMING',
      ...appointment
    }, ...prev]);
  };

  // Student profile field update by counsellor
  const updateStudentProfileField = (section, field, value) => {
    setStudentProfile(prev => ({
      ...prev,
      [section]: { ...(prev[section] || {}), [field]: value }
    }));
  };

  // Recommendation by counsellor
  const removeRecommendation = (recId) => {
    setRecommendations(prev => prev.filter(r => r.id !== recId));
  };

  // ─── FIXED: cancelAppointment ────────────────────────────
  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(a =>
      a.id === appointmentId ? { ...a, status: 'CANCELLED' } : a
    ));
  };

  // ─── Reviews ─────────────────────────────────────────────
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

  // ─── Verification ─────────────────────────────────────────
  const submitVerificationApp = (appData) => {
    const newApp = {
      id: `vapp_${Date.now()}`,
      counsellorName: appData.fullName,
      email: appData.email,
      experienceYears: appData.experienceYears,
      specialtyTrack: appData.track,
      credentials: appData.credentials,
      claimedPlacements: appData.claimedPlacements,
      sampleWorkProvided: appData.sampleFileName || 'Sample_SOP_Evaluation.pdf',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'PENDING_REVIEW',
      adminNotes: 'Application received. Under platform review.'
    };
    setVerificationApps(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateVerificationStatus = (appId, status, adminNotes) => {
    setVerificationApps(prev => prev.map(a => a.id === appId ? { ...a, status, adminNotes } : a));
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
    setCounsellors(prev => prev.map(c => c.id === counsellorId ? { ...c, verifiedPlacementsCount: c.verifiedPlacementsCount + 1 } : c));
  };

  // ─── Pipeline ─────────────────────────────────────────────
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

  // ─── Student Profile ──────────────────────────────────────
  const updateStudentProfile = (updatedData) => {
    setStudentProfile(prev => ({ ...prev, ...updatedData }));
  };

  const updateStudentSettings = (updatedSettings) => {
    setStudentSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  // ─── FIXED: sendMessage (uses content field, not text) ───
  const sendMessage = (senderRole, senderName, content) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderRole,
      senderName,
      content,                // ← FIXED: was "text", now "content"
      timestamp: new Date().toLocaleString('en-IN', {
        hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric'
      }),
      unread: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // ─── Notifications ────────────────────────────────────────
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

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

  // ─── Recommendations ─────────────────────────────────────
  const addRecommendation = (rec) => {
    setRecommendations(prev => [{
      id: `rec_${Date.now()}`,
      ...rec
    }, ...prev]);
  };

  return (
    <DataContext.Provider value={{
      // Platform
      platformConfig,
      updatePlatformConfig,

      // Counsellors
      counsellors,
      counsellorProfile: counsellors[0],
      updateCounsellorCommission,
      toggleCounsellorBoost,
      upgradeCounsellorTier,

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

      // Verification
      verificationApps,
      submitVerificationApp,
      updateVerificationStatus,

      // Escrow
      escrowBookings,
      createEscrowBooking,
      releaseEscrowPayout,
      refundEscrowBooking,

      // Pipeline
      pipelineStudents,
      updateStudentPipelineStage,

      // Verified Proofs
      verifiedProofs,
      uploadVerifiedProof,

      // Users (RBAC)
      usersList,
      updateUserRole,
      toggleUserStatus,

      // Subscriptions
      subscriptionLogs,

      // Student Data
      studentProfile,
      updateStudentProfile,
      studentSettings,
      updateStudentSettings,
      milestones,
      documents,
      appointments,
      cancelAppointment,       // ← FIXED: was missing
      recommendations,
      addRecommendation,
      shortlists,
      applications,
      messages,
      sendMessage,             // ← FIXED: uses content field
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      addNotification,
      resources,
      adminStudentsList,

      // Counsellor-side student mutations
      updateMilestoneStatus,
      addMilestone,
      deleteMilestone,
      updateDocumentStatus,
      addDocument,
      addApplication,
      updateApplicationStatus,
      addAppointmentNote,
      addAppointment,
      updateStudentProfileField,
      removeRecommendation,

      // Static
      psychometricResults: DEFAULT_PSYCHOMETRICS,
      roadmapTemplates: MOCK_ROADMAP_TEMPLATES
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
