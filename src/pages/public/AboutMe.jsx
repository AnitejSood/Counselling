import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Calendar, Award, GraduationCap, CheckCircle, HeartHandshake } from 'lucide-react';

export const AboutMe = () => {
  const { counsellorProfile } = useData();

  return (
    <div className="py-12 space-y-12 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Meet Your Mentor
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Direct 1-on-1 Guidance With Arti Sood
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Learn about Arti Sood's background, qualifications, academic philosophy, and commitment to student success.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Photo & Quick Contact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={counsellorProfile.photoUrl}
              alt="Arti Sood"
              className="w-full h-[400px] object-cover object-top"
            />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Direct Contact & Office</h3>
            <p className="text-slate-600">Email: {counsellorProfile.contact.email}</p>
            <p className="text-slate-600">Phone: {counsellorProfile.contact.phone}</p>
            <p className="text-slate-600">Office: {counsellorProfile.contact.office}</p>
            <Link
              to="/book"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              <Calendar className="w-4 h-4" /> Book Consultation
            </Link>
          </div>
        </div>

        {/* Story & Credentials */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-2xl font-extrabold text-slate-900">Arti Sood</h2>
            <p className="text-xs font-bold text-blue-600">{counsellorProfile.title}</p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{counsellorProfile.bio}</p>
          </div>

          <div className="bg-blue-900 text-white rounded-3xl p-6 shadow-lg space-y-2">
            <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-blue-400" />
              <span>Mentorship Philosophy</span>
            </div>
            <p className="text-sm font-semibold italic text-blue-50">
              "{counsellorProfile.philosophy}"
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Areas of Specialisation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
              {counsellorProfile.specialisations.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
