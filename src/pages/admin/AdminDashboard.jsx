import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Users, Calendar, DollarSign, ShieldCheck, TrendingUp, TrendingDown,
  Activity, Award, Zap, BarChart3, CheckCircle2, Star, Lock
} from 'lucide-react';
import { formatINR } from '../../lib/formatters';

const BarChart = ({ data, color = '#4f46e5' }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-1 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{ height: `${(d.value / max) * 100}%`, background: color, opacity: 0.7 + (i / data.length) * 0.3 }}
          />
          <span className="text-[9px] text-slate-400 font-semibold">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, trend, color }) => (
  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend !== undefined && (
        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${trend >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
          {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export const AdminDashboard = () => {
  const {
    counsellors, verificationApps, escrowBookings, subscriptionLogs,
    adminStudentsList, appointments, documents, reviews
  } = useData();

  const totalRevenue = escrowBookings.reduce((s, b) => s + (b.amount || 0), 0);
  const platformCut = Math.round(totalRevenue * 0.15); // 15% platform cut
  const pendingVerif = verificationApps.filter(a => a.status === 'PENDING_REVIEW').length;
  const upcomingApts = appointments.filter(a => a.status === 'UPCOMING').length;
  const boostedCounsellors = counsellors.filter(c => c.isBoosted).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  const bookingTrend = [
    { label: 'Feb', value: 4 }, { label: 'Mar', value: 7 }, { label: 'Apr', value: 6 },
    { label: 'May', value: 11 }, { label: 'Jun', value: 9 }, { label: 'Jul', value: 14 },
    { label: 'Aug', value: escrowBookings.length }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">

      {/* Header */}
      <div>
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 mb-2 inline-block">
          Platform Governance & Rating Controls
        </span>
        <h1 className="text-3xl font-black text-slate-900">Executive Control & Rating Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time marketplace analytics, escrow balances, and ratings.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Counsellors Listed" value={counsellors.length} sub="Active marketplace profiles" trend={12} color="bg-indigo-50 text-indigo-600" />
        <StatCard icon={DollarSign} label="15% Platform Cut" value={formatINR(platformCut)} sub={`${formatINR(totalRevenue)} total GMV`} trend={22} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={ShieldCheck} label="Verification Queue" value={pendingVerif} sub="Pending ID Front & Back audit" color="bg-amber-50 text-amber-600" />
        <StatCard icon={Calendar} label="Active Sessions" value={upcomingApts} sub={`${appointments.length} total booked`} trend={8} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Total Students" value={adminStudentsList.length} sub="On platform" trend={5} color="bg-sky-50 text-sky-600" />
        <StatCard icon={Star} label="Platform Avg Rating" value={`${avgRating} ★`} sub={`${reviews.length} verified reviews`} color="bg-amber-50 text-amber-600" />
        <StatCard icon={Zap} label="Boosted Advisors" value={boostedCounsellors} sub="Hero carousel placements" color="bg-amber-50 text-amber-600" />
        <StatCard icon={Lock} label="Escrow Holding" value={formatINR(totalRevenue - platformCut)} sub="Held for 2-wk trial release" color="bg-emerald-50 text-emerald-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Session Bookings</p>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Monthly Volume</h3>
            </div>
            <BarChart3 className="w-5 h-5 text-indigo-500" />
          </div>
          <BarChart data={bookingTrend} color="#4f46e5" />
          <p className="text-xs text-slate-500 text-center">Last 7 months session volume</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Escrow Ledger</p>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Gross Revenue (GMV)</h3>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <BarChart data={[{ label: 'Escrow', value: totalRevenue }, { label: 'Platform Cut', value: platformCut }]} color="#10b981" />
          <p className="text-xs text-slate-500 text-center">Platform 15% commission vs Escrow holding</p>
        </div>
      </div>

    </div>
  );
};
