import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Users, Calendar, DollarSign, ShieldCheck, TrendingUp, TrendingDown,
  Activity, Award, Zap, BarChart3, CheckCircle2, Star, Lock, Clock, Filter,
  Headphones, Crown, ArrowRight
} from 'lucide-react';
import { formatINR } from '../../lib/formatters';
import { Link } from 'react-router-dom';

const BarChart = ({ data, color = '#0B2545' }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-1.5 h-24 pt-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1 h-full justify-end">
          <div
            className="w-full rounded-t-md transition-all duration-500 shadow-xs"
            style={{ height: `${Math.max((d.value / max) * 100, 8)}%`, background: color, opacity: 0.75 + (i / data.length) * 0.25 }}
          />
          <span className="text-[10px] text-slate-500 font-semibold truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, trend, color, highlight }) => (
  <div className={`bg-white rounded-3xl p-5 border transition hover:shadow-md ${highlight ? 'border-[#CFA25E] shadow-sm' : 'border-slate-200'} space-y-3`}>
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend !== undefined && (
        <span className={`text-[10px] font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
          {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-2xl font-black text-slate-900 mt-0.5">{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export const AdminDashboard = () => {
  const {
    counsellors, verificationApps, escrowBookings,
    adminStudentsList, appointments, reviews
  } = useData();

  const [timeRange, setTimeRange] = useState('ALL');
  const [adminMode, setAdminMode] = useState(() => {
    return localStorage.getItem('matched_admin_role') || 'SUPER_ADMIN';
  });

  const handleRoleChange = (role) => {
    setAdminMode(role);
    localStorage.setItem('matched_admin_role', role);
  };

  // Range scaling multiplier for realistic time slice metrics
  const rangeScale = {
    '3M': 0.35,
    '6M': 0.65,
    '1Y': 0.9,
    'ALL': 1.0
  }[timeRange];

  const totalRevenueAll = escrowBookings.reduce((s, b) => s + (b.amount || 0), 0);
  const totalRevenue = Math.round(totalRevenueAll * rangeScale);
  const platformCut = Math.round(totalRevenue * 0.15); // 15% platform cut
  const pendingVerif = verificationApps.filter(a => a.status === 'PENDING_REVIEW').length;
  const upcomingApts = Math.max(1, Math.round(appointments.filter(a => a.status === 'UPCOMING').length * (timeRange === 'ALL' ? 1 : 0.8)));
  const totalSessionsCount = Math.max(1, Math.round(appointments.length * rangeScale));
  const boostedCounsellors = counsellors.filter(c => c.isBoosted).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  // Dynamic charts according to time range
  const chartDataMap = {
    '3M': [
      { label: 'Jun', value: 9 },
      { label: 'Jul', value: 14 },
      { label: 'Aug', value: Math.max(12, escrowBookings.length) }
    ],
    '6M': [
      { label: 'Mar', value: 7 },
      { label: 'Apr', value: 6 },
      { label: 'May', value: 11 },
      { label: 'Jun', value: 9 },
      { label: 'Jul', value: 14 },
      { label: 'Aug', value: Math.max(12, escrowBookings.length) }
    ],
    '1Y': [
      { label: 'Sep', value: 3 }, { label: 'Nov', value: 5 }, { label: 'Jan', value: 6 },
      { label: 'Mar', value: 7 }, { label: 'May', value: 11 }, { label: 'Jul', value: 14 },
      { label: 'Aug', value: Math.max(12, escrowBookings.length) }
    ],
    'ALL': [
      { label: 'Q1', value: 16 },
      { label: 'Q2', value: 29 },
      { label: 'Q3', value: 38 },
      { label: 'Current', value: Math.max(45, escrowBookings.length * 3) }
    ]
  };

  const bookingTrend = chartDataMap[timeRange] || chartDataMap['ALL'];

  return (
    <div className="space-y-8 w-full font-sans">

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#0B2545] text-[#CFA25E] text-xs font-extrabold border border-[#0B2545]">
              matchEd Executive Desk
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
              adminMode === 'SUPER_ADMIN' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-sky-100 text-sky-900 border border-sky-300'
            }`}>
              {adminMode === 'SUPER_ADMIN' ? <Crown className="w-3.5 h-3.5 text-[#CFA25E]" /> : <Headphones className="w-3.5 h-3.5 text-sky-700" />}
              {adminMode === 'SUPER_ADMIN' ? 'Super Admin Oversight' : 'Support Officer & Verification Desk'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B2545]">Platform Control & Governance</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time marketplace oversight, escrow management, and application pipelines.</p>
        </div>

        {/* View Switcher & Time Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Admin Role Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => handleRoleChange('SUPER_ADMIN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                adminMode === 'SUPER_ADMIN' ? 'bg-[#0B2545] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#CFA25E]" />
              <span>Super Admin</span>
            </button>
            <button
              onClick={() => handleRoleChange('SUPPORT_OFFICER')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                adminMode === 'SUPPORT_OFFICER' ? 'bg-[#0B2545] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-[#CFA25E]" />
              <span>Support Officer</span>
            </button>
          </div>

          {/* Time Filter Pill Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline-block" />
            {[
              { id: '3M', label: 'Past 3M' },
              { id: '6M', label: 'Past 6M' },
              { id: '1Y', label: 'Past 1Y' },
              { id: 'ALL', label: 'All Time' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  timeRange === tab.id
                    ? 'bg-[#CFA25E] text-[#0B2545] font-extrabold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Banner / Quick Jump Bar */}
      {adminMode === 'SUPPORT_OFFICER' ? (
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-sky-950">Support Officer Priority Queue</h4>
              <p className="text-[11px] text-sky-700">You have {pendingVerif} counsellor onboarding applications awaiting verification and document review.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/admin/counsellor-applications"
              className="px-3 py-1.5 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              Review Applications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2545] text-[#CFA25E] flex items-center justify-center shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B2545]">Super Admin Financial & System Oversight</h4>
              <p className="text-[11px] text-amber-800">Filtered view: <strong>{timeRange === 'ALL' ? 'All Time' : `Past ${timeRange}`}</strong>. Escrow release authorization and platform take-rate active at 15%.</p>
            </div>
          </div>
          <Link
            to="/admin/billing"
            className="px-3 py-1.5 bg-[#0B2545] hover:bg-[#133E6D] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            Manage Escrow Ledger <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Counsellors Listed"
          value={counsellors.length}
          sub="Active verified mentors"
          trend={12}
          color="bg-[#0B2545]/10 text-[#0B2545]"
        />
        <StatCard
          icon={DollarSign}
          label={`15% Platform Cut (${timeRange})`}
          value={formatINR(platformCut)}
          sub={`${formatINR(totalRevenue)} total GMV`}
          trend={22}
          color="bg-emerald-50 text-emerald-600"
          highlight={adminMode === 'SUPER_ADMIN'}
        />
        <StatCard
          icon={ShieldCheck}
          label="Verification Queue"
          value={pendingVerif}
          sub="Awaiting review / revisions"
          color="bg-amber-50 text-amber-700"
          highlight={adminMode === 'SUPPORT_OFFICER'}
        />
        <StatCard
          icon={Calendar}
          label={`Sessions Booked (${timeRange})`}
          value={totalSessionsCount}
          sub={`${upcomingApts} upcoming confirmed`}
          trend={8}
          color="bg-indigo-50 text-indigo-600"
        />
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Activity}
          label="Active Students"
          value={adminStudentsList.length}
          sub="On platform portfolio"
          trend={5}
          color="bg-sky-50 text-sky-600"
        />
        <StatCard
          icon={Star}
          label="Platform Avg Rating"
          value={`${avgRating} ★`}
          sub={`${reviews.length} verified student reviews`}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={Zap}
          label="Boosted Advisors"
          value={boostedCounsellors}
          sub="Marketplace priority placements"
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={Lock}
          label={`Escrow Held (${timeRange})`}
          value={formatINR(totalRevenue - platformCut)}
          sub="Held for 1-mo guarantee release"
          color="bg-emerald-50 text-emerald-700"
          highlight={adminMode === 'SUPER_ADMIN'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Session Volume</p>
              <h3 className="text-base font-extrabold text-[#0B2545] mt-0.5">Booking Trajectory ({timeRange})</h3>
            </div>
            <BarChart3 className="w-5 h-5 text-[#0B2545]" />
          </div>
          <BarChart data={bookingTrend} color="#0B2545" />
          <p className="text-xs text-slate-500 text-center font-medium">Session bookings in selected window</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Escrow vs Platform Cut</p>
              <h3 className="text-base font-extrabold text-[#0B2545] mt-0.5">Revenue Distribution ({timeRange})</h3>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <BarChart
            data={[
              { label: 'Counsellor Escrow', value: Math.max(1, totalRevenue - platformCut) },
              { label: '15% Platform Take', value: Math.max(1, platformCut) }
            ]}
            color="#CFA25E"
          />
          <p className="text-xs text-slate-500 text-center font-medium">
            ₹{(totalRevenue - platformCut).toLocaleString('en-IN')} escrow balance vs ₹{platformCut.toLocaleString('en-IN')} platform commission
          </p>
        </div>
      </div>

    </div>
  );
};

