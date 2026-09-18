// Mock Data for matchEd Counsellor Marketplace & Student Success Platform

export const PLATFORM_CONFIG = {
  companyName: "matchEd",
  tagline: "Precision Mentor Matching & Student Success Platform",
  headquarters: "Plot 18, Commercial Hub, Sector 17-C, Chandigarh 160017, India",
  contactEmail: "support@matched.com",
  founderEmail: "founders@matched.com",
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
  { id: "usr_401", name: "matchEd Executive Desk", email: "founders@matched.com", role: "SUPER_ADMIN", status: "ACTIVE", joinedDate: "2026-01-01" }
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
    serviceTitle: "Comprehensive End-to-End Admissions Package",
    amount: 65000,
    platformCut: 6500,
    counsellorPayout: 58500,
    escrowStatus: "RELEASE_REQUESTED",
    maxSessions: 5,
    completedSessionsCount: 3,
    requestNotes: "Completed Stage 1-3 milestones and 3 1-on-1 strategy sessions.",
    sessionDate: "2026-08-10",
    sessionTime: "11:00 AM",
    meetingLink: "https://meet.google.com/matched-1on1-meet",
    createdAt: "2026-08-04"
  },
  {
    id: "bk_902",
    studentId: "std_102",
    studentName: "Simran Kaur",
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    serviceTitle: "SOP & Essay Mentorship Package",
    amount: 15000,
    platformCut: 1500,
    counsellorPayout: 13500,
    escrowStatus: "HELD_IN_ESCROW",
    maxSessions: 3,
    completedSessionsCount: 1,
    requestNotes: null,
    sessionDate: "2026-08-15",
    sessionTime: "04:00 PM",
    meetingLink: "https://meet.google.com/matched-sop-review",
    createdAt: "2026-08-02"
  },
  {
    id: "bk_903",
    studentId: "std_103",
    studentName: "Ananya Sharma",
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    serviceTitle: "1-on-1 Hourly Strategy & Profile Audit",
    amount: 25000,
    platformCut: 2500,
    counsellorPayout: 22500,
    escrowStatus: "RELEASED_TO_COUNSELLOR",
    maxSessions: 4,
    completedSessionsCount: 4,
    requestNotes: "All 4 sessions delivered successfully.",
    sessionDate: "2026-07-28",
    sessionTime: "02:00 PM",
    meetingLink: "https://meet.google.com/matched-completed",
    createdAt: "2026-07-15"
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
    personalInfo: { fullName: "Rohan Mehta", phone: "+91 98200 11223", city: "Mumbai", state: "Maharashtra", nationality: "Indian" },
    academicBackground: { degreeName: "B.Tech Computer Engineering", institutionName: "IIT Bombay", graduationYear: "2026", gpaOrPercentage: "8.85 / 10.0" },
    interestsAndGoals: { preferredIntake: "Fall 2027", budgetRangeAnnual: "$45,000 - $60,000", preferredCountries: ["United States", "United Kingdom", "Canada"] },
    assignedTests: ['riasec', 'bigFive', 'learningStyle'],
    milestones: [
      { id: "m1_101", stageNumber: 1, title: "Initial Profile Assessment & Goal Alignment", status: "COMPLETED", dueDate: "2026-06-15", notes: "Review career interests & academic GPA.", tasks: ["Complete Intake Form", "Upload Class 10/12 Marksheets"] },
      { id: "m2_101", stageNumber: 2, title: "RIASEC & Psychometric Career Evaluation", status: "COMPLETED", dueDate: "2026-06-25", notes: "Complete RIASEC & Big Five personality tests.", tasks: ["Take RIASEC Quiz", "Review Holland Code IRC"] },
      { id: "m3_101", stageNumber: 3, title: "Target Country & Program Fit Scoring", status: "COMPLETED", dueDate: "2026-07-10", notes: "Analyze tuition budget & post-study work permits.", tasks: ["Select US/Canada/UK preference", "Set $50k budget ceiling"] },
      { id: "m4_101", stageNumber: 4, title: "Upload Academic Transcripts & SOP Draft 1", status: "IN_PROGRESS", dueDate: "2026-07-25", notes: "Counsellor Arti Sood requested 6th-sem transcript & SOP outline.", tasks: ["Upload B.Tech Semester 1-6 Transcripts", "Submit SOP Draft Outline for review", "Schedule 1-on-1 strategy call"] }
    ],
    applications: [
      { id: "app_101_1", universityName: "Carnegie Mellon University", courseName: "MS in Computer Science", country: "United States", applicationDeadline: "2026-08-12", status: "In Progress" },
      { id: "app_101_2", universityName: "Imperial College London", courseName: "MS in Artificial Intelligence", country: "United Kingdom", applicationDeadline: "2026-07-30", status: "Admitted" }
    ],
    recommendations: [
      { id: "rec_101_1", name: "Stanford University — M.S. Artificial Intelligence", category: "Dream School", description: "World-class NLP & computer vision research labs." },
      { id: "rec_101_2", name: "University of Toronto — M.Sc. Applied Computing", category: "Target School", description: "Top AI faculty with 3-year PGWP work visa." }
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
    personalInfo: { fullName: "Simran Kaur", phone: "+91 98111 44556", city: "Delhi", state: "Delhi NCR", nationality: "Indian" },
    academicBackground: { degreeName: "B.Com Honors (Finance)", institutionName: "Delhi University (SRCC)", graduationYear: "2025", gpaOrPercentage: "8.20 / 10.0" },
    interestsAndGoals: { preferredIntake: "Fall 2027", budgetRangeAnnual: "£35,000 - £50,000", preferredCountries: ["United Kingdom", "France"] },
    assignedTests: ['bigFive', 'workValues', 'eqLeadership'],
    milestones: [
      { id: "m1_102", stageNumber: 1, title: "GMAT Score Verification (720 Target)", status: "COMPLETED", dueDate: "2026-06-01", notes: "Official GMAT 720 score verified.", tasks: ["Submit GMAT Official Report", "Submit Work Resume"] },
      { id: "m2_102", stageNumber: 2, title: "LBS & INSEAD Leadership Essays", status: "IN_PROGRESS", dueDate: "2026-08-10", notes: "Draft short-term & long-term career goal essays.", tasks: ["Draft Essay 1: Global Leadership Journey", "Draft Essay 2: Career Impact"] }
    ],
    applications: [
      { id: "app_102_1", universityName: "London Business School", courseName: "Masters in Financial Analysis", country: "United Kingdom", applicationDeadline: "2026-08-25", status: "Under Review" }
    ],
    recommendations: [
      { id: "rec_102_1", name: "INSEAD — Master in Management", category: "Dream School", description: "Top global business school with dual Europe & Asia campus." },
      { id: "rec_102_2", name: "HEC Paris — MSc International Finance", category: "Target School", description: "#1 ranked finance master's program in Europe." }
    ]
  },
  {
    id: "std_103",
    studentId: "std_103",
    fullName: "Ananya Sharma",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98765 11223",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    targetGoal: "B.S. Data Science & FinTech",
    targetTrack: "Study abroad admissions",
    targetIntake: "Fall 2027",
    targetDegree: "Bachelor of Science",
    targetCountries: "US, Australia",
    currentStage: "Document Verification",
    deadlineUrgency: "High (Due in 3 days)",
    schoolsCount: 5,
    submittedCount: 3,
    admitsCount: 2,
    needsAttention: true,
    profileCompletion: 92,
    lastContact: "2026-08-05",
    personalInfo: { fullName: "Ananya Sharma", phone: "+91 98765 11223", city: "Bengaluru", state: "Karnataka", nationality: "Indian" },
    academicBackground: { degreeName: "Class 12 CBSE (PCM)", institutionName: "National Public School", graduationYear: "2026", gpaOrPercentage: "95.4%" },
    interestsAndGoals: { preferredIntake: "Fall 2027", budgetRangeAnnual: "$50,000 - $70,000", preferredCountries: ["United States", "Australia"] },
    assignedTests: ['riasec', 'learningStyle', 'workValues'],
    milestones: [
      { id: "m1_103", stageNumber: 1, title: "SAT Score & High School Transcript Verification", status: "COMPLETED", dueDate: "2026-05-20", notes: "1520 SAT Score verified.", tasks: ["Verify SAT report", "Upload 11th & 12th mid-term transcripts"] },
      { id: "m2_103", stageNumber: 2, title: "Common App Essay & Supplemental Submissions", status: "COMPLETED", dueDate: "2026-07-01", notes: "Main Common App essay approved by counsellor.", tasks: ["Finalize Common App Main Essay", "Submit UC Berkeley supplements"] }
    ],
    applications: [
      { id: "app_103_1", universityName: "UC Berkeley", courseName: "B.S. Data Science", country: "United States", applicationDeadline: "2026-11-30", status: "Submitted" },
      { id: "app_103_2", universityName: "University of Melbourne", courseName: "Bachelor of Computer Science", country: "Australia", applicationDeadline: "2026-08-01", status: "Admitted" }
    ],
    recommendations: [
      { id: "rec_103_1", name: "University of Sydney — B.S. Advanced Computing", category: "Safety School", description: "Direct admission with $10k Merit Scholarship." }
    ]
  },
  {
    id: "std_104",
    studentId: "std_104",
    fullName: "Aarav Patel",
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    phone: "+91 97234 88990",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    targetGoal: "M.S. Mechanical & Robotics",
    targetTrack: "Study abroad admissions",
    targetIntake: "Fall 2027",
    targetDegree: "M.Sc. Mechanical Engineering",
    targetCountries: "Germany, Netherlands",
    currentStage: "APS Certificate & University Shortlist",
    deadlineUrgency: "Low (Due in 30 days)",
    schoolsCount: 7,
    submittedCount: 0,
    admitsCount: 0,
    needsAttention: false,
    profileCompletion: 60,
    lastContact: "2026-08-01",
    personalInfo: { fullName: "Aarav Patel", phone: "+91 97234 88990", city: "Ahmedabad", state: "Gujarat", nationality: "Indian" },
    academicBackground: { degreeName: "B.E. Mechanical Engineering", institutionName: "Nirma University", graduationYear: "2026", gpaOrPercentage: "7.95 / 10.0" },
    interestsAndGoals: { preferredIntake: "Fall 2027", budgetRangeAnnual: "€10,000 - €20,000", preferredCountries: ["Germany", "Netherlands"] },
    assignedTests: ['riasec', 'bigFive', 'eqLeadership'],
    milestones: [
      { id: "m1_104", stageNumber: 1, title: "APS Certificate India Verification & German A2 Exam", status: "IN_PROGRESS", dueDate: "2026-09-15", notes: "Gather university module syllabus & transcripts.", tasks: ["Apply for APS India Verification", "Complete Goethe Institute A2 Exam"] }
    ],
    applications: [
      { id: "app_104_1", universityName: "TU Munich", courseName: "M.Sc. Robotics & Autonomous Systems", country: "Germany", applicationDeadline: "2026-09-30", status: "In Progress" }
    ],
    recommendations: [
      { id: "rec_104_1", name: "RWTH Aachen — M.Sc. Mechanical Engineering", category: "Dream School", description: "#1 ranked engineering university in Germany with zero tuition fees." },
      { id: "rec_104_2", name: "TU Delft — M.Sc. Robotics", category: "Target School", description: "Leading European polytechnic with strong industry ties." }
    ]
  }
];

export const INITIAL_COUNSELLOR_SERVICES = [
  {
    id: "srv_01",
    title: "Comprehensive End-to-End Admissions Package",
    description: "Complete 6-month guidance covering profile building, university shortlisting, 12 strategy calls, SOP/LOR drafting, and visa support.",
    price: 45000,
    duration: "6 Months",
    maxSessions: 12,
    track: "Study abroad admissions",
    features: [
      "12 One-on-One Strategy Sessions",
      "Unlimited SOP & Essay Revisions",
      "8 University Application Shortlists",
      "LOR & Resume Proofreading",
      "Visa & Mock Interview Prep"
    ]
  },
  {
    id: "srv_02",
    title: "SOP & Essay Mentorship Package",
    description: "Dedicated essay strategy focused on personal statements, supplemental essays, and storytelling for top-tier universities.",
    price: 15000,
    duration: "1 Month",
    maxSessions: 3,
    track: "Study abroad admissions",
    features: [
      "3 Iterations of Main SOP / Personal Statement",
      "Brainstorming Session for Supplemental Essays",
      "Plagiarism & Grammar Audit",
      "Final Polish by Ivy League Editor"
    ]
  },
  {
    id: "srv_03",
    title: "1-on-1 Hourly Strategy & Profile Audit",
    description: "Single intensive 45-minute consultation to evaluate your GPA, test scores, target fit, and application strategy.",
    price: 3500,
    duration: "45 Minutes",
    maxSessions: 1,
    track: "Study abroad admissions",
    features: [
      "Live Profile Evaluation & Gap Analysis",
      "Target University Level Recommendation (Dream/Target/Safety)",
      "Action Plan PDF Provided Post-Call"
    ]
  },
  {
    id: "srv_04",
    title: "University Shortlist & Scholarship Audit",
    description: "Personalized audit of 8 target universities matching your academic profile, budget, post-study work visa goals, and scholarship options.",
    price: 8000,
    duration: "2 Weeks",
    maxSessions: 2,
    track: "Study abroad admissions",
    features: [
      "Customized 8 University Fit Matrix",
      "Scholarship & Assistantship Eligibility Report",
      "Post-Study Work Permit Country Comparison"
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
    verifiedBy: "matchEd Verification Desk"
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
    author: "matchEd Editorial Board",
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
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    consultationType: "1-on-1 University Strategy",
    date: "2026-08-10",
    timeSlot: "11:00 AM",
    durationMinutes: 45,
    status: "UPCOMING",
    meetingMode: "Google Meet Video Call",
    meetingLink: "https://meet.google.com/matched-1on1-meet",
    studentNotes: "Discussing Fall 2027 shortlisting.",
    counsellorNotes: "Meeting link generated."
  },
  {
    id: "apt_102",
    studentId: "std_102",
    studentName: "Simran Kaur",
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    consultationType: "SOP & Essay Mentorship",
    date: "2026-08-12",
    timeSlot: "03:00 PM",
    durationMinutes: 45,
    status: "PENDING_APPROVAL",
    suggestedDate: "2026-08-12",
    suggestedTimeSlot: "03:00 PM",
    meetingMode: "Video Call (Pending Link)",
    meetingLink: null,
    studentNotes: "Looking to get feedback on LBS Leadership Essay draft.",
    counsellorNotes: null
  },
  {
    id: "apt_103",
    studentId: "std_104",
    studentName: "Aarav Patel",
    counsellorId: "counsellor_01",
    counsellorName: "Arti Sood",
    consultationType: "German APS & TU Shortlisting Call",
    date: "2026-08-14",
    timeSlot: "05:00 PM",
    durationMinutes: 45,
    status: "TIME_SUGGESTED",
    meetingMode: "Video Call",
    meetingLink: null,
    suggestedTimes: [
      { date: "2026-08-15", timeSlot: "04:00 PM" },
      { date: "2026-08-16", timeSlot: "11:00 AM" },
      { date: "2026-08-17", timeSlot: "06:00 PM" }
    ],
    studentNotes: "APS document validation questions.",
    counsellorNotes: "Counsellor was unavailable on initial time, proposed 3 alternative slots."
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
    message: "Your offer letter for MS AI at Imperial College London has been verified by matchEd. Congratulations!",
    link: "/dashboard/applications",
    read: true,
    createdAt: "2026-07-31T12:00:00Z"
  },
  {
    id: "notif_5",
    type: "PLATFORM",
    title: "matchEd platform update",
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

// ─── TOP UNIVERSITY STUDENT MENTORS ("Peer Match") ──────────
export const MOCK_PEER_MENTORS = [
  {
    id: "peer_101",
    fullName: "Aarav Singhania",
    university: "Stanford University",
    degree: "M.S. in Computer Science (AI Track)",
    year: "Class of 2026",
    admitYear: "Fall 2024",
    undergradCollege: "IIT Bombay (Computer Science)",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    rating: 4.95,
    sessionsCount: 68,
    badge: "Stanford Scholar",
    bio: "Current Stanford MS CS student. Received admits to Stanford, CMU, and Berkeley. Specialized in technical SOP crafting, research profile positioning, and navigating Silicon Valley internships.",
    hourlyRate: 1499,
    servicesOffered: ["srv_addon_1", "srv_addon_2", "srv_addon_4"]
  },
  {
    id: "peer_102",
    fullName: "Meera Krishnan",
    university: "University of Oxford",
    degree: "M.Sc. in Social Data Science",
    year: "Class of 2025",
    admitYear: "Fall 2024",
    undergradCollege: "Lady Shri Ram College, DU",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    rating: 5.0,
    sessionsCount: 92,
    badge: "Rhodes Finalist",
    bio: "Oxford postgraduate scholar. Cracked full Commonwealth funding and Chevening finalist. Guidance on UK Russell Group personal statements, Oxford college selection, and humanities/data conversion.",
    hourlyRate: 1299,
    servicesOffered: ["srv_addon_1", "srv_addon_2", "srv_addon_3"]
  },
  {
    id: "peer_103",
    fullName: "Kabir Sengupta",
    university: "Imperial College London",
    degree: "M.Eng. Computing & Artificial Intelligence",
    year: "Class of 2026",
    admitYear: "Fall 2023",
    undergradCollege: "BITS Pilani",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    rating: 4.9,
    sessionsCount: 54,
    badge: "Imperial Scholar",
    bio: "Navigated Imperial's rigorous computing admissions & interview drill. Special focus on UK Graduate Route PSW visa realities, London cost of living, and hackathon profile building.",
    hourlyRate: 999,
    servicesOffered: ["srv_addon_1", "srv_addon_3", "srv_addon_5"]
  },
  {
    id: "peer_104",
    fullName: "Sanya Oberoi",
    university: "Harvard University",
    degree: "Master in Public Policy (MPP)",
    year: "Class of 2025",
    admitYear: "Fall 2023",
    undergradCollege: "St. Stephen's College, Delhi",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    rating: 4.98,
    sessionsCount: 110,
    badge: "Harvard Kennedy Fellow",
    bio: "Harvard Kennedy School fellow. Admitted with 70% tuition scholarship. Expert in policy SOPs, diversity essays, and scholarship interview preparation.",
    hourlyRate: 1799,
    servicesOffered: ["srv_addon_1", "srv_addon_2", "srv_addon_4"]
  }
];

// ─── INDIVIDUAL ADD-ON & QUICK DOUBT SOLVING SERVICES ───────
export const MOCK_ADDON_SERVICES = [
  {
    id: "srv_addon_1",
    title: "20-Min Quick Doubt Solving & University Reality Check",
    price: 999,
    duration: "20 Mins",
    category: "Quick Doubt Solving",
    desc: "Have specific questions about course rigor, GPA cutoffs, professors, or part-time campus jobs? Ask a current student studying there directly.",
    highlights: ["1-on-1 Google Meet Call", "Direct Answers & Insider Secrets", "Session Notes Shared"]
  },
  {
    id: "srv_addon_2",
    title: "SOP / Personal Statement Peer Roast & Line-by-Line Critique",
    price: 1499,
    duration: "Written Review + 15-Min Call",
    category: "Document Review",
    desc: "A top admit who cracked the same program reviews your essay draft with brutal honesty, fixing clichés and sharpening your narrative hook.",
    highlights: ["Line-by-Line Google Docs Comments", "Flow & Impact Optimization", "Post-Review 15-Min Strategy Call"]
  },
  {
    id: "srv_addon_3",
    title: "Campus Life, Housing & Scholarship Insider Q&A",
    price: 799,
    duration: "20 Mins",
    category: "Campus & Budget",
    desc: "Real breakdown of dorm costs, off-campus flats, safe neighborhoods, grocery budgets, and hidden university bursaries.",
    highlights: ["City-Specific Cost Matrix", "Housing Recommendations", "Living Expense Cheat Sheet"]
  },
  {
    id: "srv_addon_4",
    title: "1-on-1 Mock Admissions & Scholarship Interview Drill",
    price: 1999,
    duration: "40 Mins",
    category: "Interview Drill",
    desc: "Simulate a live interview with authentic questions asked by Oxford, Harvard, or Imperial admissions committees. Comprehensive feedback rubric provided.",
    highlights: ["Rigorous 30-Min Drill", "10-Min Live Feedback & Body Language Audit", "Written Evaluation Rubric"]
  },
  {
    id: "srv_addon_5",
    title: "Resume & Academic Portfolio Polish",
    price: 1199,
    duration: "Written Polish + Action Plan",
    category: "Resume & Portfolio",
    desc: "Convert your academic CV into the strict 1-page international Ivy / Russell Group format highlighting research, publications, and impact.",
    highlights: ["ATS-Compliant LaTeX/Word Template", "Impact Metric Rewording", "Turnaround in 48 Hours"]
  }
];

// ─── PARTNER ADVERTISEMENTS (Travel, IELTS, TOEFL) ──────────
export const MOCK_PARTNER_ADS = [
  {
    id: "ad_travel_01",
    category: "Student Travel & Flights",
    partnerName: "StudentFly Global Travel Agency",
    tagline: "Extra 10kg Student Baggage Allowance + 15% Off International Flights",
    promoCode: "MATCHEDFLY",
    discount: "Up to ₹12,000 Off",
    ctaText: "Claim Flight Voucher",
    link: "https://www.studentuniverse.com",
    badge: "Official Student Travel Partner"
  },
  {
    id: "ad_ielts_02",
    category: "IELTS Prep Partner",
    partnerName: "IELTS Masterclass by IDP Certified Trainers",
    tagline: "Crack 8.0+ Band with 20 Full-Length Mock Tests & Live Speaking Drills",
    promoCode: "MATCHED8BAND",
    discount: "Flat 40% Scholarship",
    ctaText: "Start Free IELTS Diagnostic",
    link: "https://www.ielts.org",
    badge: "Official Test Prep Partner"
  },
  {
    id: "ad_toefl_03",
    category: "TOEFL / GRE Partner",
    partnerName: "ETS TOEFL iBT Official Prep Voucher",
    tagline: "Save ₹3,000 on Official ETS Registration + Free Official Guide eBook",
    promoCode: "MATCHEDTOEFL",
    discount: "₹3,000 Test Rebate",
    ctaText: "Redeem Voucher",
    link: "https://www.ets.org/toefl",
    badge: "ETS Authorized Discount"
  }
];

// ─── COUNSELLOR CERTIFICATION COURSES (Blue Tick Verification) ─
export const MOCK_COUNSELLOR_COURSES = [
  {
    id: "course_cert_01",
    title: "matchEd Certified Global Admissions Strategist (Level 1)",
    duration: "4 Hours Self-Paced",
    modulesCount: 5,
    badgeEarned: "Verified Blue Tick",
    desc: "Comprehensive masterclass on ethical counselling, US Common App nuances, UCAS Personal Statement guidelines, and transparent escrow compliance.",
    modules: [
      { id: "m1", title: "Global Admissions Ethics & Transparency Standards", duration: "45 mins" },
      { id: "m2", title: "US Holistic Review: Ivy League & Top 50 Matrix", duration: "60 mins" },
      { id: "m3", title: "UK UCAS & Russell Group Personal Statement Framework", duration: "45 mins" },
      { id: "m4", title: "Psychometric Evaluation Mappings (RIASEC & Big Five)", duration: "45 mins" },
      { id: "m5", title: "matchEd Escrow, Milestone Compliance & Code of Conduct", duration: "45 mins" }
    ],
    status: "AVAILABLE"
  }
];

