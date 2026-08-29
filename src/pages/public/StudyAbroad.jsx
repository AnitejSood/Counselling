import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Calendar, CheckCircle, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

export const StudyAbroad = () => {
  const countries = [
    {
      name: "United States",
      flag: "🇺🇸",
      highlights: "Top STEM OPT (3-Year Work Permit), GRA/TA funding, Flexible curriculum, Ivy League & Top 50 research universities.",
      popularPrograms: "MS CS / AI, MBA, Data Science, Mechanical, Biomedical",
      intakes: "Fall (Aug/Sep) & Spring (Jan)"
    },
    {
      name: "United Kingdom",
      flag: "🇬🇧",
      highlights: "1-Year Master's degrees, 2-Year Post-Study Graduate Visa (PSW), Russell Group Institutions.",
      popularPrograms: "MSc Finance, Business Analytics, Computer Science, Law",
      intakes: "September & January"
    },
    {
      name: "Canada",
      flag: "🇨🇦",
      highlights: "3-Year PGWP work permit, high quality of living, direct express entry PR pathway.",
      popularPrograms: "MSc CS, Engineering, Supply Chain, Data Analytics",
      intakes: "Fall (September) & Winter (January)"
    },
    {
      name: "Australia & New Zealand",
      flag: "🇦🇺",
      highlights: "2 to 4-Year Post-Study Work Rights, Group of Eight (Go8) universities, high starting salaries.",
      popularPrograms: "IT & Cybersecurity, Public Health, MBA, Engineering",
      intakes: "February & July"
    },
    {
      name: "Germany & Europe",
      flag: "🇩🇪",
      highlights: "Zero or low tuition at public universities, 18-month job seeker visa, English-taught programs.",
      popularPrograms: "Automotive Engineering, Applied Data Science, Physics",
      intakes: "Winter (October) & Summer (April)"
    },
    {
      name: "Singapore & Asia",
      flag: "🇸🇬",
      highlights: "Top 15 global universities (NUS, NTU), global financial & tech hub, close proximity to India.",
      popularPrograms: "Computer Science, AI, Financial Engineering, Management",
      intakes: "August & January"
    }
  ];

  return (
    <div className="py-12 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Global Higher Education Strategy
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Study Abroad Guidance Tailored to Your Profile
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Navigate international admissions, test prep, SOP crafting, tuition budgeting, and visa clearance with 1-on-1 expert counsel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {countries.map((c, i) => (
          <div key={i} className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm card-hover-effect space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.flag}</span>
                <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{c.highlights}</p>
              
              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Popular Degrees:</p>
                <p className="text-slate-800 font-semibold">{c.popularPrograms}</p>
              </div>

              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Primary Intakes:</p>
                <p className="text-blue-600 font-medium">{c.intakes}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/book"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition"
              >
                <Calendar className="w-3.5 h-3.5" /> Plan Your Strategy
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
