import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Users, Calendar, DollarSign, ShieldCheck, TrendingUp, TrendingDown,
  Activity, Award, ArrowUpRight, Zap, BarChart3, PieChart, CheckCircle2
} from 'lucide-react';
import { formatINR } from '../../lib/formatters';

// ── Mini Bar Chart (CSS/SVG, no external deps) ─────────────────────────────
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

// ── Donut Ring (SVG) ────────────────────────────────────────────────────────
const DonutRing = ({ percentage, color, label }) => {
  const r = 28, circ = 2 * Math.PI * r;
  const dashArr = `${(percentage / 100) * circ} ${circ}`;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={dashArr} strokeLinecap="round"
          transform="rotate(-90 36 36)" style={{ transition: 'stroke-dasharray 0.8s ease' }} />
        <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">
          {percentage}%
        </text>
      </svg>
      <span className="text-[10px] text-slate-500 font-semibold text-center">{label}</span>
    </div>
  );
};

// ── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, trend, color }) => (
  <div className="card p-5 space-y-3 card-hover">
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
    adminStudentsList, appointments, documents, usersList, reviews
  } = useData();

  const totalRevenue = escrowBookings.reduce((s, b) => s + (b.amount || 0), 0);
  const platformCut = Math.round(totalRevenue * 0.15);
  const pendingVerif = verificationApps.filter(a => a.status === 'PENDING_REVIEW').length;
  const upcomingApts = appointments.filter(a => a.status === 'UPCOMING').length;
  const pendingDocs = documents.filter(d => d.status === 'Under Review').length;
  const boostedCounsellors = counsellors.filter(c => c.isBoosted).length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  const bookingTrend = [
    { label: 'Feb', value: 4 }, { label: 'Mar', value: 7 }, { label: 'Apr', value: 6 },
    { label: 'May', value: 11 }, { label: 'Jun', value: 9 }, { label: 'Jul', value: 14 },
    { label: 'Aug', value: escrowBookings.length }
  ];

  const revenueTrend = [
    { label: 'Feb', value: 18000 }, { label: 'Mar', value: 34000 }, { label: 'Apr', value: 27000 },
    { label: 'May', value: 52000 }, { label: 'Jun', value: 41000 }, { label: 'Jul', value: 67000 },
    { label: 'Aug', value: totalRevenue }
  ];

  const tierDist = [
    { label: 'Starter', count: counsellors.filter(c => c.subscriptionTier === 'STARTER').length, color: '#94a3b8' },
    { label: 'Growth', count: counsellors.filter(c => c.subscriptionTier === 'GROWTH').length, color: '#6366f1' },
    { label: 'Pro', count: counsellors.filter(c => c.subscriptionTier === 'PRO').length, color: '#f59e0b' },
    { label: 'Elite', count: counsellors.filter(c => c.subscriptionTier === 'ELITE').length, color: '#10b981' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <span className="badge badge-purple mb-2">Live Platform Metrics</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Executive Overview</h1>
        <p className="text-xs text-slate-500 mt-1">AspirantHQ Chandigarh HQ · Real-time marketplace analytics</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Verified Counsellors" value={counsellors.filter(c => c.isVerified).length} sub={`${counsellors.length} total on platform`} trend={12} color="bg-indigo-50 text-indigo-600" />
        <StatCard icon={DollarSign} label="Platform Revenue" value={formatINR(platformCut)} sub={`${formatINR(totalRevenue)} total GMV`} trend={22} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={ShieldCheck} label="Pending Verification" value={pendingVerif} sub="Applications to review" trend={pendingVerif > 3 ? -5 : 0} color="bg-amber-50 text-amber-600" />
        <StatCard icon={Calendar} label="Active Sessions" value={upcomingApts} sub={`${appointments.length} total booked`} trend={8} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Activity} label="Total Students" value={adminStudentsList.length} sub="On platform" trend={5} color="bg-sky-50 text-sky-600" />
        <StatCard icon={Award} label="Platform Avg Rating" value={avgRating} sub={`${reviews.length} verified reviews`} trend={3} color="bg-rose-50 text-rose-500" />
        <StatCard icon={Zap} label="Boosted Counsellors" value={boostedCounsellors} sub="Active marketplace boost" color="bg-amber-50 text-amber-600" />
        <StatCard icon={CheckCircle2} label="Docs Pending Review" value={pendingDocs} sub="Offer letters & certificates" color="bg-slate-100 text-slate-600" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Booking Volume Chart */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Session Bookings</p>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Monthly Volume</h3>
            </div>
            <BarChart3 className="w-5 h-5 text-indigo-400" />
          </div>
          <BarChart data={bookingTrend} color="#4f46e5" />
          <p className="text-xs text-slate-500 text-center">Last 7 months · Aug is current month</p>
        </div>

        {/* Revenue Chart */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">GMV Trend</p>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Gross Revenue (₹)</h3>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <BarChart data={revenueTrend.map(d => ({ ...d, value: d.value / 1000, label: d.label }))} color="#10b981" />
          <p className="text-xs text-slate-500 text-center">Values in thousands (₹K)</p>
        </div>
      </div>

      {/* Tier Distribution + Recent Subs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Tier Distribution */}
        <div className="card p-6 space-y-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Counsellor Tiers</p>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Subscription Distribution</h3>
          </div>
          <div className="flex items-center justify-around">
            {tierDist.map(t => (
              <DonutRing
                key={t.label}
                percentage={counsellors.length ? Math.round((t.count / counsellors.length) * 100) : 0}
                color={t.color}
                label={t.label}
              />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {tierDist.map(t => (
              <div key={t.label} className="text-center">
                <p className="text-base font-extrabold text-slate-900">{t.count}</p>
                <p className="text-[10px] text-slate-400">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Subscription Logs */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Recent Payments</p>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">Subscription Revenue</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {subscriptionLogs.slice(0, 5).map(log => (
              <div key={log.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">{log.counsellorName}</p>
                  <p className="text-[10px] text-slate-400">{log.tier} Plan · {log.billingDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-emerald-700">{formatINR(log.amount)}</span>
                  <span className="badge badge-emerald">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="card p-6 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-600" /> Platform Health Alerts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-4 rounded-2xl border ${pendingVerif > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <p className={`text-xs font-bold ${pendingVerif > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
              {pendingVerif > 0 ? `⚠ ${pendingVerif} counsellor applications pending` : '✓ No pending verifications'}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Go to Counsellor Verifications</p>
          </div>
          <div className={`p-4 rounded-2xl border ${pendingDocs > 0 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <p className={`text-xs font-bold ${pendingDocs > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
              {pendingDocs > 0 ? `⚠ ${pendingDocs} offer letter audits pending` : '✓ All documents reviewed'}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Go to Offer Letter Audits</p>
          </div>
          <div className="p-4 rounded-2xl border bg-indigo-50 border-indigo-200">
            <p className="text-xs font-bold text-indigo-800">{escrowBookings.filter(b => b.escrowStatus === 'HELD_IN_ESCROW').length} payments held in escrow</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Review in Escrow Ledger</p>
          </div>
        </div>
      </div>

    </div>
  );
};
