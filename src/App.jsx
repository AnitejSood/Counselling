import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StudentLayout } from './components/layout/StudentLayout';
import { CounsellorLayout } from './components/layout/CounsellorLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Marketplace Pages
import { Home } from './pages/public/Home';
import { Explore } from './pages/public/Explore';
import { CounsellorProfile } from './pages/public/CounsellorProfile';
import { BookConsultation } from './pages/public/BookConsultation';
import { CounsellorApply } from './pages/public/CounsellorApply';
import { Resources } from './pages/public/Resources';
import { Contact } from './pages/public/Contact';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy';
import { TermsOfService } from './pages/public/TermsOfService';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Student Pages
import { DashboardOverview } from './pages/student/DashboardOverview';
import { ProfileEdit } from './pages/student/ProfileEdit';
import { PsychometricTests } from './pages/student/PsychometricTests';
import { RIASECTest } from './pages/student/RIASECTest';
import { BigFiveTest } from './pages/student/BigFiveTest';
import { WorkValuesTest } from './pages/student/WorkValuesTest';
import { LearningStyleTest } from './pages/student/LearningStyleTest';
import { EQTest } from './pages/student/EQTest';
import { MyJourney } from './pages/student/MyJourney';
import { Recommendations } from './pages/student/Recommendations';
import { Shortlist } from './pages/student/Shortlist';
import { ApplicationTracker } from './pages/student/ApplicationTracker';
import { DocumentCentre } from './pages/student/DocumentCentre';
import { AppointmentsView } from './pages/student/AppointmentsView';
import { Messaging } from './pages/student/Messaging';
import { Notifications } from './pages/student/Notifications';
import { Settings } from './pages/student/Settings';

// Counsellor Pages
import { CounsellorOverview } from './pages/counsellor/CounsellorOverview';
import { CounsellorProfileBuild } from './pages/counsellor/CounsellorProfileBuild';
import { CounsellorBookings } from './pages/counsellor/CounsellorBookings';
import { CounsellorMessaging } from './pages/counsellor/CounsellorMessaging';
import { CounsellorCertification } from './pages/counsellor/CounsellorCertification';
import { IntakeReviewer } from './pages/counsellor/IntakeReviewer';
import { RoadmapBuilder } from './pages/counsellor/RoadmapBuilder';
import { PipelineTracker } from './pages/counsellor/PipelineTracker';
import { ProofUploader } from './pages/counsellor/ProofUploader';
import { CounsellorAnalytics } from './pages/counsellor/CounsellorAnalytics';
import { CounsellorSettings } from './pages/counsellor/CounsellorSettings';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PlatformRatingAdmin } from './pages/admin/PlatformRatingAdmin';
import { StudentsList } from './pages/admin/StudentsList';
import { StudentDetail } from './pages/admin/StudentDetail';
import { AppointmentsAdmin } from './pages/admin/AppointmentsAdmin';
import { DocumentsAdmin } from './pages/admin/DocumentsAdmin';
import { MessagesAdmin } from './pages/admin/MessagesAdmin';
import { SettingsAdmin } from './pages/admin/SettingsAdmin';
import { VerificationAdmin } from './pages/admin/VerificationAdmin';
import { EscrowBillingAdmin } from './pages/admin/EscrowBillingAdmin';
import { CounsellorBoostAdmin } from './pages/admin/CounsellorBoostAdmin';
import { CounsellorDetailAdmin } from './pages/admin/CounsellorDetailAdmin';
import { CounsellorOnboardingAdmin } from './pages/admin/CounsellorOnboardingAdmin';

// Public Wrapper
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col justify-between bg-slate-50">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Protected Student Route
const ProtectedStudentRoute = ({ children }) => {
  return <StudentLayout>{children}</StudentLayout>;
};

// Protected Counsellor Route
const ProtectedCounsellorRoute = ({ children }) => {
  return <CounsellorLayout>{children}</CounsellorLayout>;
};

// Protected Admin Route
const ProtectedAdminRoute = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            {/* Public Marketplace Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/explore" element={<PublicLayout><Explore /></PublicLayout>} />
            <Route path="/counsellor-profile/:id" element={<PublicLayout><CounsellorProfile /></PublicLayout>} />
            <Route path="/book" element={<PublicLayout><BookConsultation /></PublicLayout>} />
            <Route path="/apply-counsellor" element={<PublicLayout><CounsellorApply /></PublicLayout>} />
            <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
            <Route path="/terms" element={<PublicLayout><TermsOfService /></PublicLayout>} />

            {/* Auth Routes */}
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

            {/* Student Protected Routes */}
            <Route path="/dashboard" element={<ProtectedStudentRoute><DashboardOverview /></ProtectedStudentRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedStudentRoute><ProfileEdit /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments" element={<ProtectedStudentRoute><PsychometricTests /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments/riasec" element={<ProtectedStudentRoute><RIASECTest /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments/big-five" element={<ProtectedStudentRoute><BigFiveTest /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments/work-values" element={<ProtectedStudentRoute><WorkValuesTest /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments/learning-style" element={<ProtectedStudentRoute><LearningStyleTest /></ProtectedStudentRoute>} />
            <Route path="/dashboard/assessments/eq-leadership" element={<ProtectedStudentRoute><EQTest /></ProtectedStudentRoute>} />
            <Route path="/dashboard/journey" element={<ProtectedStudentRoute><MyJourney /></ProtectedStudentRoute>} />
            <Route path="/dashboard/recommendations" element={<ProtectedStudentRoute><Recommendations /></ProtectedStudentRoute>} />
            <Route path="/dashboard/explore" element={<ProtectedStudentRoute><Explore /></ProtectedStudentRoute>} />
            <Route path="/dashboard/shortlist" element={<ProtectedStudentRoute><Shortlist /></ProtectedStudentRoute>} />
            <Route path="/dashboard/applications" element={<ProtectedStudentRoute><ApplicationTracker /></ProtectedStudentRoute>} />
            <Route path="/dashboard/documents" element={<ProtectedStudentRoute><DocumentCentre /></ProtectedStudentRoute>} />
            <Route path="/dashboard/appointments" element={<ProtectedStudentRoute><AppointmentsView /></ProtectedStudentRoute>} />
            <Route path="/dashboard/messages" element={<ProtectedStudentRoute><Messaging /></ProtectedStudentRoute>} />
            <Route path="/dashboard/notifications" element={<ProtectedStudentRoute><Notifications /></ProtectedStudentRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedStudentRoute><Settings /></ProtectedStudentRoute>} />

            {/* Counsellor Protected Routes */}
            <Route path="/counsellor" element={<ProtectedCounsellorRoute><CounsellorOverview /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/profile" element={<ProtectedCounsellorRoute><CounsellorProfileBuild /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/bookings" element={<ProtectedCounsellorRoute><CounsellorBookings /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/messages" element={<ProtectedCounsellorRoute><CounsellorMessaging /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/certifications" element={<ProtectedCounsellorRoute><CounsellorCertification /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/intake" element={<ProtectedCounsellorRoute><IntakeReviewer /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/roadmap" element={<ProtectedCounsellorRoute><RoadmapBuilder /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/pipeline" element={<ProtectedCounsellorRoute><PipelineTracker /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/proof" element={<ProtectedCounsellorRoute><ProofUploader /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/analytics" element={<ProtectedCounsellorRoute><CounsellorAnalytics /></ProtectedCounsellorRoute>} />
            <Route path="/counsellor/settings" element={<ProtectedCounsellorRoute><CounsellorSettings /></ProtectedCounsellorRoute>} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/ratings" element={<ProtectedAdminRoute><PlatformRatingAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/counsellor-applications" element={<ProtectedAdminRoute><CounsellorOnboardingAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/students" element={<ProtectedAdminRoute><StudentsList /></ProtectedAdminRoute>} />
            <Route path="/admin/students/:studentId" element={<ProtectedAdminRoute><StudentDetail /></ProtectedAdminRoute>} />
            <Route path="/admin/verifications" element={<ProtectedAdminRoute><VerificationAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/billing" element={<ProtectedAdminRoute><EscrowBillingAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/boosts" element={<ProtectedAdminRoute><CounsellorBoostAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/counsellors/:counsellorId" element={<ProtectedAdminRoute><CounsellorDetailAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/appointments" element={<ProtectedAdminRoute><AppointmentsAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/messages" element={<ProtectedAdminRoute><MessagesAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/documents" element={<ProtectedAdminRoute><DocumentsAdmin /></ProtectedAdminRoute>} />
            <Route path="/admin/settings" element={<ProtectedAdminRoute><SettingsAdmin /></ProtectedAdminRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
