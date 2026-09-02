import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { InteractiveFacilityMap } from '../components/InteractiveFacilityMap';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  AlertTriangle,
  Clock,
  Pill,
  ArrowRight,
  Ambulance,
  PhoneCall,
  Activity,
  CheckCircle2,
  WifiOff,
  BatteryWarning,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const CommandCenterPage = () => {
  const {
    facilities,
    referrals,
    systemAlerts,
    setSystemAlerts,
    dispatchAmbulance,
    notify,
    t,
    language
  } = useApp();

  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeTab, setActiveTab] = useState('all_referrals');

  // Stats calculation
  const totalFacilities = facilities.length;
  const criticalCount = referrals.filter(r => r.urgency === 'critical').length;
  const avgWaitTime = Math.round(
    facilities.reduce((acc, f) => acc + f.avgWaitTimeMin, 0) / facilities.length
  );
  const avgMedicinePct = Math.round(
    facilities.reduce((acc, f) => acc + f.medicineStockPct, 0) / facilities.length
  );

  const handleResolveAlert = (alertId) => {
    setSystemAlerts(prev => prev.filter(a => a.id !== alertId));
    notify("Alert Acknowledged", "Field operations team notified for resolution.");
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome / Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Regional Health Operations Grid • Pune-Satara Cluster
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {language === 'hi' ? 'क्षेत्रीय स्वास्थ्य नियंत्रण कक्ष' : 'Regional Command & Control Center'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time telemetry across 6 PHCs/CHCs, 14 ASHA sub-clusters, and 108 Emergency ambulance fleet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              notify("Telemetry Synced", "Grid data refreshed from state health servers.");
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Live Telemetry</span>
          </button>

          <button
            onClick={() => navigate('/emergency')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
          >
            <Ambulance className="w-4 h-4" />
            <span>108 Emergency Queue</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('activeFacilities')}
          value={`${totalFacilities} Active`}
          subtitle="4 Optimal • 1 Strained • 1 Critical"
          icon={Building2}
          trend="+1 Sub-center Online"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title={t('criticalEscalations')}
          value={criticalCount}
          subtitle="STEMI & High-Risk Maternal in transit"
          icon={AlertTriangle}
          trend="2 Under Active ALS Transit"
          trendType="negative"
          variant="rose"
        />

        <StatCard
          title={t('avgWaitTime')}
          value={`${avgWaitTime} mins`}
          subtitle="Target < 30 mins across OPDs"
          icon={Clock}
          trend="-6 mins vs yesterday"
          trendType="positive"
          variant="amber"
        />

        <StatCard
          title={t('medicineAvailability')}
          value={`${avgMedicinePct}%`}
          subtitle="Essential Drug List (EDL) quota"
          icon={Pill}
          trend="Critical low at Velhe PHC"
          trendType="neutral"
          variant="blue"
        />
      </div>

      {/* Main Grid: Facility Status Map + Live Referrals Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Interactive Facility Status Map */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100">
                Facility Status & Ambulance Tracking Map
              </h3>
              <span className="text-[11px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                Live SVG Telemetry
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Click marker for bed/oxygen stats</span>
          </div>

          <InteractiveFacilityMap
            height="h-[460px]"
            onSelectFacility={(fac) => setSelectedFacility(fac)}
          />

          {/* Quick Facility Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            {facilities.slice(0, 3).map(fac => (
              <div
                key={fac.id}
                onClick={() => setSelectedFacility(fac)}
                className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-600 dark:hover:border-teal-500 cursor-pointer shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{fac.name}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    fac.status === 'optimal' ? 'bg-emerald-500' : fac.status === 'strained' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
                  <span>Beds: {fac.bedsOccupied}/{fac.bedsTotal}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{fac.medicineStockPct}% Stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: Live Referrals Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col h-[525px] overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Ambulance className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Live Referrals & Ambulances
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Urgent & pending transfers with source → destination route
              </p>
            </div>

            <button
              onClick={() => navigate('/emergency')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300 flex items-center gap-0.5"
            >
              View Full Queue <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Referral Items List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-2 sm:p-3 space-y-2">
            {referrals.map((ref) => (
              <div
                key={ref.id}
                className={`p-3 rounded-xl border transition-all ${
                  ref.urgency === 'critical'
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                    : ref.urgency === 'strained'
                    ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-slate-900 dark:text-slate-100">
                        {ref.patientName}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        ({ref.patientAge}y, {ref.patientGender})
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      ABHA: {ref.abhaId}
                    </div>
                  </div>

                  <Badge
                    status={ref.urgency}
                    label={ref.urgencyLabel}
                    size="xs"
                    pulse={ref.urgency === 'critical'}
                  />
                </div>

                {/* Facility Route */}
                <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200/80 dark:border-slate-700">
                  <span className="truncate text-slate-600 dark:text-slate-400">{ref.fromFacility}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="truncate font-semibold text-slate-900 dark:text-slate-100">{ref.toFacility}</span>
                </div>

                <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Diagnosis:</span> {ref.clinicalSummary}
                </div>

                {/* Ambulance Status & ETA */}
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Ambulance className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>{ref.ambulanceId}</span>
                  </div>

                  {ref.etaMinutes > 0 ? (
                    <span className="font-bold text-rose-700 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-950/70 px-2 py-0.5 rounded text-[10px]">
                      ETA: {ref.etaMinutes} mins ({ref.distanceKm} km)
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded text-[10px]">
                      {ref.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Alerts & Operational Disruptions Panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              System Alerts & Field Bottlenecks
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
              {systemAlerts.length} Active
            </span>
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Automated notifications from IoT sensors, cold chains, and grid monitors
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {systemAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                alert.severity === 'critical'
                  ? 'bg-rose-50/40 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                  : 'bg-amber-50/40 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{alert.facility}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
                </div>
                <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 leading-tight">
                  {alert.title}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  {alert.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-teal-800 dark:text-teal-400 truncate">
                  ⚡ {alert.action}
                </span>
                <button
                  onClick={() => handleResolveAlert(alert.id)}
                  className="px-2 py-1 text-[10px] font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
