import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap, LogIn, User, Briefcase, ShieldCheck,
  Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import { MatchEdLogo } from '../../components/common/MatchEdLogo';

const DEMO_ACCOUNTS = [
  {
    role: 'STUDENT',
    label: 'Student',
    email: 'rohan.mehta@example.com',
    password: 'password123',
    redirect: '/dashboard',
    color: 'indigo',
    icon: User,
    description: 'View the student portal — profile, journey, applications',
    tag: 'Student Portal'
  },
  {
    role: 'COUNSELLOR',
    label: 'Counsellor',
    email: 'arti.sood@careerguide.com',
    password: 'password123',
    redirect: '/counsellor',
    color: 'emerald',
    icon: Briefcase,
    description: 'Manage student intake, milestones, and bookings',
    tag: 'Verified Advisor'
  },
  {
    role: 'ADMIN',
    label: 'Platform Admin',
    email: 'admin@matched.in',
    password: 'admin123',
    redirect: '/admin',
    color: 'purple',
    icon: ShieldCheck,
    description: 'Business operations, analytics, and platform control',
    tag: 'Executive Desk'
  }
];

const COLOR_MAP = {
  indigo: {
    active: 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200',
    hover: 'border-slate-200 hover:border-indigo-300 bg-white',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    icon: 'bg-indigo-100 text-indigo-600',
    ring: 'focus:ring-indigo-400',
  },
  emerald: {
    active: 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-200',
    hover: 'border-slate-200 hover:border-emerald-300 bg-white',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon: 'bg-emerald-100 text-emerald-600',
    ring: 'focus:ring-emerald-400',
  },
  purple: {
    active: 'bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-200',
    hover: 'border-slate-200 hover:border-purple-300 bg-white',
    btn: 'bg-purple-600 hover:bg-purple-700',
    badge: 'bg-purple-50 text-purple-700 border-purple-100',
    icon: 'bg-purple-100 text-purple-600',
    ring: 'focus:ring-purple-400',
  },
};

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [email, setEmail] = useState('rohan.mehta@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selected = DEMO_ACCOUNTS.find(a => a.role === selectedRole);
  const colors = COLOR_MAP[selected.color];

  const handleRoleSelect = (account) => {
    setSelectedRole(account.role);
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password, selectedRole);
      if (success) {
        navigate(selected.redirect);
      } else {
        setError('Invalid credentials. Use the demo accounts below.');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B2545] via-[#081B33] to-[#040D1A] flex items-center justify-center py-12 px-4 relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CFA25E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg relative z-10">

        {/* Brand */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="bg-white/90 px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md mb-3 inline-block">
            <MatchEdLogo size="lg" />
          </div>
          <p className="text-slate-300 text-sm font-medium">India's Verified Admissions & Mentorship Marketplace</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-xl font-extrabold text-white mb-1">Welcome back</h1>
          <p className="text-slate-400 text-xs mb-6">Select your role and sign in to continue</p>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {DEMO_ACCOUNTS.map(account => {
              const Icon = account.icon;
              const isActive = selectedRole === account.role;
              const c = COLOR_MAP[account.color];
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => handleRoleSelect(account)}
                  className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isActive ? c.active : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px] font-extrabold">{account.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role Description */}
          <div className={`rounded-xl px-4 py-3 border mb-6 flex items-center gap-3 ${colors.badge}`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider">{selected.tag}</p>
              <p className="text-[11px] mt-0.5">{selected.description}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${colors.ring} focus:border-transparent transition`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${colors.ring} focus:border-transparent transition pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm transition shadow-lg ${colors.btn} disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign in as {selected.label}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts Info */}
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">Demo Accounts (auto-filled)</p>
            <div className="space-y-2">
              {DEMO_ACCOUNTS.map(acc => {
                const c = COLOR_MAP[acc.color];
                return (
                  <button
                    key={acc.role}
                    onClick={() => handleRoleSelect(acc)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/5 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${c.icon}`}>
                        {React.createElement(acc.icon, { className: 'w-3.5 h-3.5' })}
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-slate-300">{acc.email}</p>
                        <p className="text-[10px] text-slate-500">{acc.role}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Register link */}
          <p className="text-center text-xs text-slate-500 mt-5">
            New student?{' '}
            <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
