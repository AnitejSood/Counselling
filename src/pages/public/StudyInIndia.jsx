import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, CheckCircle, Award, BookOpen, ArrowRight } from 'lucide-react';

export const StudyInIndia = () => {
  const categories = [
    {
      title: "Premier Liberal Arts & Multi-Disciplinary Universities",
      institutions: "Ashoka University, Krea, Plaksha, Flame, Shiv Nadar, OP Jindal",
      focus: "Holistic essay-based application processes, aptitude tests (AAT, SAT, KAT), and personal interviews.",
      counsellingValue: "1-on-1 essay drafting, activity list optimization, and interview mock preparation."
    },
    {
      title: "Engineering & Technology Institutions",
      institutions: "IITs, NITs, BITS Pilani, IIITs, VIT, Manipal, Thapar",
      focus: "JEE Main & Advanced score strategy, BITSAT preference filling, and JAC/CSAB counselling rounds.",
      counsellingValue: "Branch vs College trade-off analysis and counseling preference order."
    },
    {
      title: "Management & Integrated BBA/IPM Programs",
      institutions: "IIM Indore/Rohtak (IPMAT), Shaheed Sukhdev (CUET), NMIMS (NPAT), Symbiosis (SET)",
      focus: "5-Year Integrated BBA+MBA programs and top DU college preference filling.",
      counsellingValue: "Exam timeline strategy and WAT/PI interview drills."
    },
    {
      title: "Law & Humanities Admissions",
      institutions: "NLUs (CLAT), Symbiosis Law (SLAT), St. Xavier's Mumbai, Delhi University (CUET)",
      focus: "Undergraduate entrance exam planning and central university seat allocation.",
      counsellingValue: "Strategic allocation of CUET college preferences."
    }
  ];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Indian Admissions Guidance
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Strategic Guidance for Top Indian Institutions
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          From CUET preference optimization to Ashoka essays and IPMAT interview drills, get expert guidance for admissions across top Indian universities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Key Target Institutions:</p>
            <p className="text-xs text-slate-800 font-semibold">{cat.institutions}</p>
            
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <p className="text-slate-600"><strong className="text-slate-900">Application Focus:</strong> {cat.focus}</p>
              <p className="text-slate-600"><strong className="text-blue-600">Counsellor Value:</strong> {cat.counsellingValue}</p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Indian Admissions Strategy
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
