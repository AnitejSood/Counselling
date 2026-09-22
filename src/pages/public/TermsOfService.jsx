import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ShieldCheck, RefreshCw, BookOpen } from 'lucide-react';

/**
 * Terms of Service — marketplace agreement for matchEd users.
 */
export const TermsOfService = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      body: 'By creating an account, browsing mentors, booking sessions, or applying as a counsellor or scholar on matchEd, you agree to these Terms of Service and our Privacy Policy. If you do not agree, do not use the platform.',
    },
    {
      title: '2. Marketplace Role',
      body: 'matchEd is a precision mentor-matching marketplace. We connect students with verified counsellors and top scholars. We do not guarantee university admission, scholarships, or visa outcomes. Mentors provide guidance; final applications and decisions remain yours.',
    },
    {
      title: '3. Verification & Audit Standards',
      body: 'Listed mentors undergo government ID checks and academic / offer-letter audits. Listings may be suspended or removed for failed audits, plagiarism, ghostwriting, ratings below platform thresholds, or policy breaches. Public badges reflect verification status, not a warranty of results.',
    },
    {
      title: '4. Milestone Escrow Releases',
      body: 'Package fees are held in matchEd escrow and released as agreed milestones (e.g. shortlist, SOP draft, submission) are delivered and confirmed. Mentors may request payout after verified session milestones. Students must not circumvent escrow with off-platform payments for booked packages.',
    },
    {
      title: '5. 1-Month Switch Guarantee',
      body: 'Within 30 days of package start, students may request a counsellor switch subject to anti-scam rules (including completing at least two sessions with the current mentor). Same or lower fee swaps incur no extra charge with proportional credit for completed work; higher-tier mentors require paying only the net difference. Escrow release to mentors follows clearance of the guarantee window where applicable.',
    },
    {
      title: '6. Academic Honesty',
      body: 'Ghostwriting of SOPs, essays, or recommendation letters for submission as the student’s own work is prohibited. Mentors may critique, edit guidance, and coach,  not author deceptive submissions. Violations may result in delisting, escrow holds, and account termination.',
    },
    {
      title: '7. Bookings, Cancellations & Conduct',
      body: 'Users must provide accurate information, attend scheduled sessions or cancel in good faith, and communicate respectfully. Harassment, fraud, spam, or misuse of messaging may lead to suspension. Discovery calls and free first-call rules follow the policies shown at booking time.',
    },
    {
      title: '8. Fees, Refunds & Disputes',
      body: 'Platform commission and mentor fees are disclosed before payment. Refunds and switches follow escrow and guarantee rules. Disputes should first be raised via in-platform support. Unresolved disputes are subject to the jurisdiction of courts in Chandigarh, India, unless mandatory law provides otherwise.',
    },
    {
      title: '9. Limitation of Liability',
      body: 'To the fullest extent permitted by law, matchEd is not liable for mentor advice outcomes, third-party university decisions, or indirect damages. Our aggregate liability for platform claims related to a booking is limited to fees paid to matchEd for that booking.',
    },
    {
      title: '10. Changes',
      body: 'We may update these Terms; material changes will be reflected on this page with an updated date. Continued use after changes constitutes acceptance. For questions: support@matched.company.',
    },
  ];

  return (
    <div className="py-12 space-y-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B2545]">Terms of Service</h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          User agreement covering audits, milestone escrow, the 30-day switch guarantee, academic honesty, and dispute jurisdiction.
          Last updated: March 2026.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 text-[11px] font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-[#CFA25E]" /> Escrow milestones
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <RefreshCw className="w-3.5 h-3.5 text-[#CFA25E]" /> 30-day switch
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <BookOpen className="w-3.5 h-3.5 text-[#CFA25E]" /> Academic honesty
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
          <Scale className="w-3.5 h-3.5 text-[#CFA25E]" /> Chandigarh jurisdiction
        </span>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">{s.title}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
          </section>
        ))}

        <p className="text-xs text-slate-500 text-center pt-4">
          Related:{' '}
          <Link to="/privacy" className="text-[#0B2545] font-semibold underline underline-offset-2">Privacy Policy</Link>
          {' · '}
          <Link to="/contact" className="text-[#0B2545] font-semibold underline underline-offset-2">Contact</Link>
        </p>
      </div>
    </div>
  );
};
