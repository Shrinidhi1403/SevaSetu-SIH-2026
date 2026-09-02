import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import {
  PATIENT_VOLUME_TRENDS,
  MATERNAL_HEALTH_METRICS
} from '../data/mockData';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import {
  BarChart3,
  Video,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Heart,
  Baby,
  Activity,
  FileSpreadsheet,
  Download,
  Building2,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { facilities, referrals, notify, theme } = useApp();
  const [timeRange, setTimeRange] = useState('8months');

  const criticalEscalations = referrals.filter(r => r.urgency === 'critical').length;
  const activeTeleconsults = 38;
  const referralCompletionRate = 94.2;
  const avgWaitTimeMinutes = 24;

  const handleExportCSV = () => {
    notify("Export Initiated", "Monthly Regional Health MIS Report (HMIS v3.2) downloaded.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Epidemiological Surveillance & Health System Analytics
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            District Healthcare Performance & Utilization
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            HMIS Indicators, Teleconsultation Uptake, and Maternal-Infant Survival Matrices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex">
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-2.5 py-1 rounded transition-colors ${
                timeRange === '30days' ? 'bg-white dark:bg-slate-700 font-bold text-teal-800 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('8months')}
              className={`px-2.5 py-1 rounded transition-colors ${
                timeRange === '8months' ? 'bg-white dark:bg-slate-700 font-bold text-teal-800 dark:text-teal-300 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              2026 YTD
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export HMIS</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Teleconsultations"
          value={`${activeTeleconsults} Today`}
          subtitle="eSanjeevani Tele-OPD sessions"
          icon={Video}
          trend="+18% vs last month"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title="Emergency Escalations"
          value={`${criticalEscalations} Critical`}
          subtitle="STEMI, Trauma & High-Risk ANC"
          icon={AlertTriangle}
          trend="100% ALS Dispatched < 5m"
          trendType="neutral"
          variant="rose"
        />

        <StatCard
          title="Referral Completion %"
          value={`${referralCompletionRate}%`}
          subtitle="Tertiary arrival & counter-signed"
          icon={CheckCircle2}
          trend="+3.4% adherence"
          trendType="positive"
          variant="blue"
        />

        <StatCard
          title="Avg OPD Wait Time"
          value={`${avgWaitTimeMinutes} mins`}
          subtitle="Cluster benchmark target: 30m"
          icon={Clock}
          trend="-8 mins reduction"
          trendType="positive"
          variant="amber"
        />
      </div>

      {/* Chart: Patient Volume vs Referrals */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span>Patient Footfall vs Teleconsultations & Tertiary Referrals</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Demonstrates growth of rural tele-OPD triage preventing unnecessary tertiary hops.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-teal-700 inline-block" />
              <span>Total Footfall</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" />
              <span>Teleconsults</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-500 inline-block" />
              <span>108 Referrals</span>
            </span>
          </div>
        </div>

        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PATIENT_VOLUME_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFootfall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorTele" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorRef" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#E2E8F0'} />
              <XAxis dataKey="month" tick={{ fill: theme === 'dark' ? '#94A3B8' : '#64748B', fontSize: 12 }} axisLine={{ stroke: theme === 'dark' ? '#475569' : '#CBD5E1' }} />
              <YAxis tick={{ fill: theme === 'dark' ? '#94A3B8' : '#64748B', fontSize: 12 }} axisLine={{ stroke: theme === 'dark' ? '#475569' : '#CBD5E1' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="footfall" name="OPD Footfall" stroke="#0F766E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorFootfall)" />
              <Area type="monotone" dataKey="teleconsults" name="Teleconsultations" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorTele)" />
              <Area type="monotone" dataKey="referrals" name="Tertiary Referrals" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRef)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maternal Health Alerts Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-100 dark:fill-rose-950" />
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
              Maternal & Child Health Watchlist (RMNCH+A)
            </h3>
          </div>
          <Badge status="critical" label="High Priority Cluster Action" size="xs" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">High-Risk Pregnancies</span>
              <Baby className="w-4 h-4 text-rose-600" />
            </div>
            <div className="font-heading text-2xl font-bold text-rose-900 dark:text-rose-100">
              {MATERNAL_HEALTH_METRICS.highRiskFollowUps} Mothers
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-400">
              Severe anemia (Hb &lt; 8), eclampsia risks, or twin gestations.
            </p>
          </div>

          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">Severe Anemia Surveillance</span>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-heading text-2xl font-bold text-amber-900 dark:text-amber-100">
              {MATERNAL_HEALTH_METRICS.anemiaCasesUnderWatch} Cases
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Scheduled for doorstep IV Iron Sucrose at CHC Khandala.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Full Child Immunization</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-heading text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              {MATERNAL_HEALTH_METRICS.immunizationTargetPct}%
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
              Pentavalent & MR-1 coverage on track across 14 rural Anganwadis.
            </p>
          </div>

          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">Pending 3rd Trimester Tests</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-heading text-2xl font-bold text-blue-900 dark:text-blue-100">
              {MATERNAL_HEALTH_METRICS.pendingThirdTrimesterScreenings} Overdue
            </div>
            <p className="text-[11px] text-blue-700 dark:text-blue-400">
              Triggered automated SMS alerts to assigned cluster ASHAs.
            </p>
          </div>
        </div>
      </div>

      {/* Resource Utilization Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Facility Operational Resource Utilization Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live capacity tracking of doctors, diagnostics, bed occupancy, and drug reserves.
            </p>
          </div>
          <span className="text-xs text-slate-500">Auto-updated via District MIS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Facility Name & Type</th>
                <th className="py-3 px-4">Specialist / Medical Officer</th>
                <th className="py-3 px-4">Bed Occupancy</th>
                <th className="py-3 px-4">Diagnostic Status</th>
                <th className="py-3 px-4">Essential Drug Stock</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {facilities.map((fac) => {
                const bedPct = Math.round((fac.bedsOccupied / fac.bedsTotal) * 100);
                return (
                  <tr key={fac.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{fac.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{fac.type} • {fac.block}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{fac.doctorOnDuty}</div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">On Duty • OPD Active</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{fac.bedsOccupied}/{fac.bedsTotal}</span>
                        <span className="text-[10px] text-slate-500">({bedPct}%)</span>
                      </div>
                      <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            bedPct > 90 ? 'bg-rose-500' : bedPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${bedPct}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          fac.id === 'FAC-03' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`} />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {fac.id === 'FAC-03' ? 'Omron BP Calibration Due' : 'ECG, Gluco & O2 Online'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{fac.medicineStockPct}%</span>
                        <Badge
                          status={fac.medicineStockPct > 85 ? 'optimal' : fac.medicineStockPct > 60 ? 'strained' : 'critical'}
                          label={fac.medicineStockPct > 85 ? 'Adequate' : fac.medicineStockPct > 60 ? 'Strained' : 'Depleted'}
                          size="xs"
                        />
                      </div>
                      <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            fac.medicineStockPct < 60 ? 'bg-rose-500' : fac.medicineStockPct < 85 ? 'bg-amber-500' : 'bg-teal-600'
                          }`}
                          style={{ width: `${fac.medicineStockPct}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => notify("Facility Audit", `Requested priority logistics review for ${fac.name}.`)}
                        className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
                      >
                        Audit Facility <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
