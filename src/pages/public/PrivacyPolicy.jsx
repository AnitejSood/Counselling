import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, Mail } from 'lucide-react';

/**
 * Privacy Policy — data protection for students, counsellors, and scholars on matchEd.
 */
export const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      body: 'We collect account details (name, email, phone), academic profile information, documents you upload (transcripts, SOPs, resume, offer letters), booking and messaging history, and payment metadata needed to operate escrow. We do not store full card numbers on matchEd servers, payments are processed through our payment partners.',
    },
    {
      title: '2. Academic Document Confidentiality',
      body: 'Transcripts, test scores, personal statements, and recommendation materials are treated as confidential. They are visible only to you, your matched counsellor or scholar (when shared for a booking), and authorised matchEd compliance staff for verification or dispute resolution. We do not sell academic documents to third parties.',
    },
    {
      title: '3. Offer Letter & Verification Audits',
      body: 'When counsellors or scholars submit degrees, offer letters, or government ID for marketplace verification, those materials are used solely for audit and listing integrity. Access is limited to the compliance desk. Verified status may be shown publicly; underlying documents are not.',
    },
    {
      title: '4. Escrow & Transaction Security',
      body: 'Package fees held in matchEd escrow are recorded with transaction IDs, milestone status, and release history. Financial details are shared only with you, the relevant mentor, payment processors, and (when required) regulators or courts. Escrow data is retained as needed for accounting, refunds, and the 30-day switch guarantee.',
    },
    {
      title: '5. How We Use Your Data',
      body: 'We use your information to match mentors, schedule sessions, deliver messaging and notifications, process escrow releases and switches, improve marketplace quality, prevent fraud, and respond to support requests. Aggregated, non-identifying analytics may be used to improve the product.',
    },
    {
      title: '6. Sharing & Processors',
      body: 'We share data with mentors you book, payment and communication providers acting on our instructions, and authorities when legally required. We do not sell personal data for advertising. Mentors may only use student materials for the engagement you authorised.',
    },
    {
      title: '7. Retention & Your Rights',
      body: 'You may request access, correction, or deletion of your account data via support, subject to legal retention (e.g. payment records, dispute evidence). You can update profile fields in Settings and revoke document sharing by removing files or ending an engagement where applicable.',
    },
    {
      title: '8. Grievance Redressal',
      body: 'For privacy concerns or data requests, contact support@matched.company. Founders may be reached at founders@matched.company. We aim to acknowledge privacy grievances within 72 hours and resolve them promptly under applicable Indian IT and data protection norms.',
    },
  ];

  return (
    <div className="py-12 space-y-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B2545]">Privacy Policy</h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          How matchEd protects academic documents, offer-letter audits, escrow transactions, and your account data.
          Last updated: March 2026.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-[11px] font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <Lock className="w-3.5 h-3.5 text-[#CFA25E]" /> Document confidentiality
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-[#CFA25E]" /> Escrow security
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <FileText className="w-3.5 h-3.5 text-[#CFA25E]" /> Audit privacy
        </span>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">{s.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
          </section>
        ))}

        <div className="mt-8 p-5 rounded-2xl bg-[#0B2545] text-white flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#CFA25E] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Questions about your data?</p>
              <p className="text-xs text-slate-300 mt-0.5">Email support@matched.company or visit Contact.</p>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-4 py-2 rounded-xl bg-[#CFA25E] text-[#0B2545] text-xs font-bold hover:bg-[#b8904e] transition text-center"
          >
            Contact support
          </Link>
        </div>

        <p className="text-xs text-slate-500 text-center pt-2">
          Also see our <Link to="/terms" className="text-[#0B2545] font-semibold underline underline-offset-2">Terms of Service</Link>.
        </p>
      </div>
    </div>
  );
};
