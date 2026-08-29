// Mock Data for AspirantHQ Counsellor Marketplace Platform (Chandigarh HQ)

export const PLATFORM_CONFIG = {
  companyName: "AspirantHQ Marketplace",
  tagline: "India's Leading Verified Career & Counsellor Marketplace Platform",
  headquarters: "Plot 18, Commercial Hub, Sector 17-C, Chandigarh 160017, India",
  contactEmail: "support@aspiranthq.com",
  founderEmail: "founders@aspiranthq.com",
  helplinePhone: "+91 172 456 7890",
  secondaryPhone: "+91 98888 77665",
  defaultCommissionRate: 0.10, // 10% default platform fee
  gstNumber: "04AAACA1234B1Z5"
};

export const MOCK_COUNSELLORS = [
  {
    id: "counsellor_01",
    fullName: "Arti Sood",
    title: "Independent Career Consultant & Education Strategist",
    credentials: "M.A. in Psychology, Certified Global Career Analyst (UCLA Extension), Member IECA & IAEVG",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    experienceYears: 14,
    verifiedPlacementsCount: 2800,
    scholarshipsSecured: "₹35+ Crore",
    rating: 4.9,
    reviewCount: 142,
    responseTime: "< 2 hours",
    pricePerSession: 25000,
    priceCategory: "₹25,000+",
    destinations: ["UK & Ireland", "United States", "Canada", "Australia"],
    track: "Study abroad admissions",
    tags: ["Ivy League Strategy", "SOP Master", "Top 50 UK", "STEM & Business"],
    isSponsored: false,
    isBoosted: true,
    boostExpiresAt: "2026-08-28",
    boostImpressions: 4820,
    subscriptionTier: "PRO",
    customCommissionRate: 0.08,
    boostTokens: 3,
    verificationStatus: "VERIFIED",
    badgeLabel: "Top Verified Strategist",
    bio: "14+ years of personalized study-abroad guidance. Specialty in US Ivy League applications, UK Russell Group, and Canadian universities.",
    qualifications: [
      "M.A. in Applied Psychology - Delhi University",
      "Global Career Counsellor Certification - UCLA Extension"
    ],
    specialisations: [
      "Study Abroad University Strategy",
      "University Shortlisting & Fit Scoring",
      "SOP & Personal Statement Mentorship"
    ],
    contact: {
      email: "arti.sood@careerguide.com",
      phone: "+91 98765 43210",
      office: "Connaught Place, New Delhi / Virtual Globally"
    },
    services: [
      { id: "srv_1", title: "Complete Study Abroad Package", price: 65000, desc: "End-to-end support for 8-10 universities including SOP review & visa prep." },
      { id: "srv_2", title: "1-on-1 University Strategy & Shortlist", price: 25000, desc: "60-min deep dive session + customized 10-university dream/target/safety matrix." }
    ]
  },
  {
    id: "counsellor_02",
    fullName: "Dr. Rajesh Sharma",
    title: "Senior Domestic Admissions Director & Entrance Exam Mentor",
    credentials: "Ph.D. in Education Policy (IIT Delhi), Former Admissions Advisory Board Member",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    experienceYears: 18,
    verifiedPlacementsCount: 4500,
    scholarshipsSecured: "₹18+ Crore",
    rating: 4.8,
    reviewCount: 210,
    responseTime: "< 4 hours",
    pricePerSession: 12000,
    priceCategory: "Under ₹15,000/session",
    destinations: ["Domestic — India"],
    track: "Domestic India admissions",
    tags: ["CUET Prep", "Ashoka & Krea Essays", "IIT/NIT Counselling"],
    isSponsored: false,
    isBoosted: false,
    boostExpiresAt: null,
    boostImpressions: 1200,
    subscriptionTier: "PRO",
    customCommissionRate: 0.08,
    boostTokens: 2,
    verificationStatus: "VERIFIED",
    badgeLabel: "Domestic Authority",
    bio: "18 years navigating Indian entrance ecosystems (CUET, IPMAT, JEE, CLAT, Liberal Arts).",
    qualifications: ["Ph.D. in Education Policy - IIT Delhi"],
    specialisations: ["CUET Preference Sheet Optimization", "Liberal Arts College Selection"],
    contact: {
      email: "rajesh.sharma@careerguide.com",
      phone: "+91 98111 22334",
      office: "South Extension, New Delhi / Online"
    },
    services: [
      { id: "srv_201", title: "CUET Preference Optimization", price: 12000, desc: "Complete preference sheet design for DU, BHU, and Central Universities." }
    ]
  }
];

export const MOCK_USERS_LIST = [
  { id: "usr_101", name: "Rohan Mehta", email: "rohan.mehta@example.com", role: "STUDENT", status: "ACTIVE", joinedDate: "2026-05-10" },
  { id: "usr_102", name: "Simran Kaur", email: "simran.k@example.com", role: "STUDENT", status: "ACTIVE", joinedDate: "2026-06-01" },
  { id: "usr_201", name: "Arti Sood", email: "arti.sood@careerguide.com", role: "COUNSELLOR", status: "ACTIVE", joinedDate: "2026-01-15", tier: "PRO" },
  { id: "usr_401", name: "AspirantHQ Founders Desk", email: "founders@aspiranthq.com", role: "SUPER_ADMIN", status: "ACTIVE", joinedDate: "2026-01-01" }
];

export const MOCK_SUBSCRIPTION_LOGS = [
  { id: "sub_901", counsellorName: "Arti Sood", tier: "PRO", amount: 4999, billingDate: "2026-08-01", status: "PAID" }
];

export const MOCK_ESCROW_BOOKINGS = [
  {
    id: "bk_901",
    studentId: "std_101",
    studentName: "Rohan Mehta",
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    serviceTitle: "1-on-1 University Strategy & Shortlist",
    amount: 25000,
    escrowStatus: "HELD_IN_ESCROW",
    sessionDate: "2026-08-10",
    sessionTime: "11:00 AM",
    meetingLink: "https://meet.jit.si/AspirantHQ_Session_901",
    createdAt: "2026-08-04"
  }
];

export const MOCK_REVIEWS = [
  {
    id: "rev_1",
    counsellorId: "counsellor_01",
    studentName: "Aditya Sharma",
    track: "Study abroad admissions",
    rating: 5,
    date: "2026-07-12",
    tags: ["responsive", "SOP feedback quality"],
    content: "Arti ma'am helped me transform my SOP for Imperial College London.",
    outcomeVerified: true,
    outcomeText: "Admitted to Imperial College London (MS Computing)",
    counsellorReply: "Thank you Aditya!"
  }
];

export const MOCK_VERIFICATION_APPLICATIONS = [
  {
    id: "vapp_101",
    counsellorName: "Vikramaditya Roy",
    email: "vikram.roy@example.com",
    experienceYears: 7,
    specialtyTrack: "Sports quota admissions",
    credentials: "Certified Sports Administrator",
    claimedPlacements: 340,
    sampleWorkProvided: "SOP_SportsQuota_Sample.pdf",
    submittedAt: "2026-08-01",
    status: "PENDING_REVIEW",
    adminNotes: "Credentials verified."
  }
];

export const MOCK_PIPELINE_STUDENTS = [
  {
    id: "std_101",
    studentId: "std_101",
    fullName: "Rohan Mehta",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "+91 98200 11223",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    targetGoal: "MS in Computer Science / AI",
    targetTrack: "Study abroad admissions",
    targetIntake: "Fall 2027",
    targetDegree: "MS in Computer Science",
    targetCountries: "US, Canada, UK",
    currentStage: "Shortlist Finalized",
    deadlineUrgency: "High (Due in 6 days)",
    schoolsCount: 8,
    submittedCount: 2,
    admitsCount: 1,
    needsAttention: true,
    profileCompletion: 85,
    lastContact: "2026-08-04",
    applications: [
      { school: "Carnegie Mellon University", program: "MS in CS", deadline: "2026-08-12", status: "In Progress", fitScore: "Dream (92%)" },
      { school: "Imperial College London", program: "MS AI", deadline: "2026-07-30", status: "Admitted", fitScore: "Target (94%)", proofVerified: true }
    ]
  },
  {
    id: "std_102",
    studentId: "std_102",
    fullName: "Simran Kaur",
    name: "Simran Kaur",
    email: "simran.k@example.com",
    phone: "+91 98111 44556",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    targetGoal: "MBA / Business Analytics",
    targetTrack: "Study abroad admissions",
    targetIntake: "Fall 2027",
    targetDegree: "MBA",
    targetCountries: "UK, France",
    currentStage: "SOP Revision 2",
    deadlineUrgency: "Medium (Due in 14 days)",
    schoolsCount: 6,
    submittedCount: 1,
    admitsCount: 0,
    needsAttention: false,
    profileCompletion: 70,
    lastContact: "2026-08-02",
    applications: [
      { school: "London Business School", program: "MFA", deadline: "2026-08-25", status: "Under Review", fitScore: "Dream (88%)" }
    ]
  }
];

export const INITIAL_STUDENTS_LIST_FOR_ADMIN = MOCK_PIPELINE_STUDENTS;

export const MOCK_VERIFIED_PROOFS = [
  {
    id: "prf_501",
    counsellorId: "counsellor_01",
    studentName: "Rohan Mehta",
    universityName: "Imperial College London",
    program: "MS AI",
    documentName: "Imperial_Offer_Letter_Rohan.pdf",
    uploadedAt: "2026-07-31",
    verificationStatus: "VERIFIED",
    verifiedBy: "AspirantHQ Verification Desk"
  }
];

export const MOCK_ROADMAP_TEMPLATES = [
  {
    id: "tpl_uk_ug",
    name: "UK Undergraduate Standard Timeline",
    track: "Study abroad admissions",
    milestones: [
      { title: "UCAS Account & Personal Statement Brainstorming", targetDays: 14 }
    ]
  }
];

export const INITIAL_MILESTONES = [
  { id: "m1", stageNumber: 1, title: "Initial Profile Assessment & Goal Alignment", status: "COMPLETED", dueDate: "2026-06-15", notes: "Review career interests & academic GPA.", tasks: ["Complete Intake Form", "Upload Class 10/12 Marksheets"] },
  { id: "m2", stageNumber: 2, title: "RIASEC & Psychometric Career Evaluation", status: "COMPLETED", dueDate: "2026-06-25", notes: "Complete RIASEC & Big Five personality tests.", tasks: ["Take RIASEC Quiz", "Review Holland Code IRC"] },
  { id: "m3", stageNumber: 3, title: "Target Country & Program Fit Scoring", status: "COMPLETED", dueDate: "2026-07-10", notes: "Analyze tuition budget & post-study work permits.", tasks: ["Select US/Canada/UK preference", "Set $50k budget ceiling"] },
  { id: "m4", stageNumber: 4, title: "Upload Academic Transcripts & SOP Draft 1", status: "IN_PROGRESS", dueDate: "2026-07-25", notes: "Counsellor Arti Sood requested 6th-sem transcript & SOP outline.", tasks: ["Upload B.Tech Semester 1-6 Transcripts", "Submit SOP Draft Outline for review", "Schedule 1-on-1 strategy call"] }
];

export const INITIAL_RESOURCES = [
  {
    id: "res_1",
    title: "How to Build a Winning SOP for Ivy League STEM Programs",
    summary: "Step-by-step framework for structuring narrative essays, highlighting research impact, and framing career goals.",
    category: "Study Abroad",
    readTime: "6 min read",
    author: "AspirantHQ Editorial Board",
    date: "2026-07-15",
    tags: ["SOP Mentorship", "US Admissions", "STEM Master's"],
    content: "Writing a compelling Statement of Purpose requires avoiding generic praise and focusing on concrete technical project outcomes."
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc_1",
    studentId: "std_101",
    category: "Academic Transcripts",
    title: "B.Tech Semester 1-6 Marksheets",
    fileName: "Rohan_Mehta_Transcripts.pdf",
    fileSize: "2.4 MB",
    uploadedAt: "2026-07-20",
    status: "Under Review",
    counsellorComment: "Uploaded by student."
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt_101",
    studentId: "std_101",
    studentName: "Rohan Mehta",
    consultationType: "1-on-1 University Strategy",
    date: "2026-08-10",
    timeSlot: "11:00 AM",
    durationMinutes: 45,
    status: "UPCOMING",
    meetingMode: "Google Meet Video Call",
    meetingLink: "https://meet.google.com/aspiranthq-1on1-meet",
    studentNotes: "Discussing Fall 2027 shortlisting."
  }
];

export const INITIAL_RECOMMENDATIONS = [
  { 
    id: "rec_1", 
    name: "Carnegie Mellon University - MS in CS", 
    category: "Dream School", 
    description: "Fits 8.85 CGPA & AI research background.",
    universityDetails: { country: "United States" }
  }
];

export const INITIAL_SHORTLISTS = [
  { id: "sl_1", university: "Carnegie Mellon University", program: "MS in CS", category: "Dream" }
];

export const INITIAL_APPLICATIONS = [
  { id: "app_1", universityName: "Imperial College London", courseName: "MS AI", country: "UK", status: "Admitted", applicationDeadline: "2026-07-30" }
];

export const INITIAL_MESSAGES = [
  { id: "msg_1", senderName: "Arti Sood", senderRole: "COUNSELLOR", content: "Hi Rohan! I reviewed your 6th-semester marksheet. Please upload your SOP outline before our call.", timestamp: "2026-08-04 10:30 AM", unread: true }
];

export const INITIAL_STUDENT_USER = {
  id: "std_101",
  email: "rohan.mehta@example.com",
  role: "STUDENT",
  fullName: "Rohan Mehta",
  phone: "+91 98200 11223",
  avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
  createdAt: "2026-05-10",
  profileCompletion: 90,
  assignedCounsellorId: "counsellor_01",
  assignedCounsellorName: "Arti Sood",
  targetGoal: {
    degree: "MS in Computer Science / AI",
    targetIntake: "Fall 2027",
    targetCountries: ["United States", "Canada", "UK & Ireland"],
    budgetAnnualUSD: "$45,000 - $55,000"
  }
};

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif_1",
    type: "MESSAGE",
    title: "New message from Arti Sood",
    message: "Hi Rohan! I reviewed your 6th-semester marksheet. Please upload your SOP outline before our call on Aug 10.",
    link: "/dashboard/messages",
    read: false,
    createdAt: "2026-08-04T10:30:00Z"
  },
  {
    id: "notif_2",
    type: "APPOINTMENT",
    title: "Upcoming consultation on Aug 10",
    message: "Your 1-on-1 University Strategy session with Arti Sood is confirmed for Aug 10, 2026 at 11:00 AM.",
    link: "/dashboard/appointments",
    read: false,
    createdAt: "2026-08-04T09:00:00Z"
  },
  {
    id: "notif_3",
    type: "DOCUMENT",
    title: "Document review completed",
    message: "Your B.Tech Semester 1-6 Marksheets have been reviewed. Status: Under Review — counsellor feedback pending.",
    link: "/dashboard/documents",
    read: true,
    createdAt: "2026-08-03T14:00:00Z"
  },
  {
    id: "notif_4",
    type: "ADMISSION",
    title: "🎉 Admission confirmed — Imperial College London",
    message: "Your offer letter for MS AI at Imperial College London has been verified by AspirantHQ. Congratulations!",
    link: "/dashboard/applications",
    read: true,
    createdAt: "2026-07-31T12:00:00Z"
  },
  {
    id: "notif_5",
    type: "PLATFORM",
    title: "AspirantHQ platform update",
    message: "We've launched Psychometric Assessments (RIASEC + Big Five) to help personalise your counsellor match. Try it now!",
    link: "/dashboard/assessments",
    read: true,
    createdAt: "2026-07-28T08:00:00Z"
  }
];

export const INITIAL_STUDENT_PROFILE = {
  personalInfo: {
    fullName: "Rohan Mehta",
    dateOfBirth: "2004-09-14",
    gender: "Male",
    nationality: "Indian",
    city: "Mumbai",
    state: "Maharashtra",
    address: "B-402 Horizon Towers, Bandra West, Mumbai 400050"
  },
  academicBackground: {
    currentEducationLevel: "Undergraduate Final Year",
    degreeName: "B.Tech in Computer Engineering",
    institutionName: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    graduationYear: "2026",
    gpaOrPercentage: "8.85 / 10.0 CGPA",
    class10Percentage: "95.4%",
    class12Percentage: "93.8%"
  },
  interestsAndGoals: {
    careerInterests: ["Artificial Intelligence", "Machine Learning Systems"],
    preferredFields: ["Computer Science", "Data Science"],
    preferredCourses: ["MS in Computer Science"],
    preferredCountries: ["United States", "Canada", "UK & Ireland"],
    preferredIntake: "Fall 2027",
    budgetRangeAnnual: "$45,000 - $60,000 USD"
  },
  testScores: {
    englishTest: { type: "IELTS Academic", status: "Completed", score: "8.0 Overall" },
    standardizedTest: { type: "GRE General Test", status: "Scheduled", score: "Target: 325+" }
  }
};
