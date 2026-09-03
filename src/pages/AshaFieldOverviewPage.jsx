import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import {
  HeartPulse,
  Users,
  Home,
  Baby,
  AlertTriangle,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Radio,
  BatteryCharging,
  Smartphone,
  Plus,
  RefreshCw,
  ExternalLink,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AshaFieldOverviewPage = () => {
  const {
    ashaWorkers,
    fieldUploads,
    outreachEvents,
    patients,
    updatePatientVitals,
    logAshaVisit,
    notify,
    currentUser,
    language,
    t
  } = useApp();

  const [showLogVisitModal, setShowLogVisitModal] = useState(false);
  const [visitForm, setVisitForm] = useState({
    patientName: "Meena Santosh Gaikwad",
    cluster: "Shirwal West",
    vitalsSummary: "BP: 120/80 mmHg, Pulse: 78 bpm, Hb: 11.2 g/dL"
  });

  const activeAshasCount = ashaWorkers.length;
  const totalHouseholdsVisited = ashaWorkers.reduce((acc, a) => acc + a.householdsVisitedMonth, 0);
  const avgImmunization = Math.round(
    ashaWorkers.reduce((acc, a) => acc + a.immunizationTargetPct, 0) / ashaWorkers.length
  );
  const criticalAlertsCount = 4;

  const handleCreateVisit = (e) => {
    e.preventDefault();
    if (!visitForm.patientName) return;

    const matchedPatient = patients?.find(p =>
      p.name.toLowerCase().includes(visitForm.patientName.toLowerCase()) ||
      visitForm.patientName.toLowerCase().includes(p.name.toLowerCase())
    );
    const targetPatientId = matchedPatient ? matchedPatient.id : "PAT-001";

    const vitalsData = {
      patientName: visitForm.patientName,
      patientId: targetPatientId,
      bp: "120/80",
      sugar: "115",
      bloodSugar: "115",
      pulse: "78",
      temp: "98.6",
      spo2: "98%",
      notes: visitForm.vitalsSummary,
      triagePriority: "Routine",
      category: "Doorstep Field Screening",
      recordedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by ASHA Sunita`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      localStorage.setItem('sih_demo_patient_vitals', JSON.stringify(vitalsData));
    } catch (err) {
      console.error('Failed to save doorstep vitals to localStorage:', err);
    }

    if (updatePatientVitals) {
      updatePatientVitals(targetPatientId, {
        bp: "120/80 mmHg",
        bloodSugar: "115 mg/dL",
        pulse: "78 bpm",
        temp: "98.6 °F"
      });
    }

    logAshaVisit(visitForm.patientName, visitForm.cluster, visitForm.vitalsSummary);
    notify("Offline Sync", "Data saved locally for offline sync", "success");

    setShowLogVisitModal(false);
    setVisitForm({
      patientName: "",
      cluster: "Shirwal West",
      vitalsSummary: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Grassroots Health Cadre Operations • National Rural Health Mission
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {language === 'mr' ? 'आशा स्वयंसेविका नेटवर्क व घरोघरी आरोग्य देखरेख' : language === 'hi' ? 'आशा कार्यकर्ता नेटवर्क एवं घर-घर निगरानी' : 'ASHA Field Network & Doorstep Surveillance'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time synchronization of doorstep NCD screening, maternal PNC check-ins, and immunization drives.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              notify("ASHA Sync Cycle Complete", "4 pending offline mobile records synced from Velhe Hills cluster.");
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'फील्ड सिंक' : language === 'hi' ? 'फील्ड सिंक' : 'Force Field Sync'}</span>
          </button>

          <button
            onClick={() => setShowLogVisitModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'mr' ? 'आरोग्य भेट नोंदवा' : language === 'hi' ? 'भेंट दर्ज करें' : 'Log Check-in'}</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active ASHAs in Field"
          value={`${activeAshasCount} Active`}
          subtitle="4 Clusters • 100% Mobile Geotagged"
          icon={Users}
          trend="All devices synced < 1 hr"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title="Households Visited (MTD)"
          value={`${totalHouseholdsVisited} Homes`}
          subtitle="Target: 1,100 households / month"
          icon={Home}
          trend="89.3% Monthly Target"
          trendType="positive"
          variant="blue"
        />

        <StatCard
          title="Immunization Target %"
          value={`${avgImmunization}%`}
          subtitle="Infant 0-2 yrs Pentavalent / MR"
          icon={Baby}
          trend="+4.2% vs last quarter"
          trendType="positive"
          variant="amber"
        />

        <StatCard
          title="Critical Field Alerts"
          value={`${criticalAlertsCount} Alerts`}
          subtitle="Severe Anemia & Malnutrition Red"
          icon={AlertTriangle}
          trend="Doctor follow-up active"
          trendType="negative"
          variant="rose"
        />
      </div>

      {/* Grid: Directory + Outreach */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                Active ASHA Cadre Directory ({ashaWorkers.length} Mobilizers)
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Tablet App Synced</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {ashaWorkers.map((worker) => (
              <div key={worker.id} className="p-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={worker.avatar}
                      alt={worker.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-600/20 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">
                          {worker.name}
                        </span>
                        <Badge
                          status={worker.status === 'online' ? 'optimal' : 'strained'}
                          label={worker.status === 'online' ? 'Active Sync' : 'Offline Queue'}
                          size="xs"
                        />
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="font-medium text-teal-800 dark:text-teal-400">{worker.cluster}</span>
                        <span>•</span>
                        <span>{worker.phc}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {worker.phone} • {worker.deviceModel}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {worker.householdsVisitedMonth} / {worker.householdsAssigned}
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                      {worker.visitTargetPct}% Target
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-end gap-1">
                      <BatteryCharging className="w-3 h-3 text-emerald-600" />
                      <span>{worker.battery}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-teal-700 h-full rounded-full"
                    style={{ width: `${worker.visitTargetPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                Village Outreach Camps
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">VHSND & Polio</span>
          </div>

          <div className="space-y-3">
            {outreachEvents.map((evt) => (
              <div key={evt.id} className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs leading-snug">
                    {evt.title}
                  </span>
                  <Badge status="optimal" label={evt.status} size="xs" />
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-3">
                  <span className="font-semibold text-teal-800 dark:text-teal-400">{evt.date}</span>
                  <span>{evt.time}</span>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Location:</span> {evt.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Field Uploads */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
              Recent Field Uploads & Telemetry
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Doorstep vitals & verified screening photos</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fieldUploads.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-slate-50/70 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between text-xs space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.patientName}</span>
                  <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                </div>
                <div className="text-[11px] text-teal-800 dark:text-teal-400 font-semibold mt-0.5">
                  {item.type}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-medium bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  {item.vitalsSummary}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span className="font-medium">{item.ashaName}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showLogVisitModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Log ASHA Doorstep Field Screening
                </h3>
              </div>
              <button onClick={() => setShowLogVisitModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Beneficiary Name</label>
                <input
                  type="text"
                  value={visitForm.patientName}
                  onChange={e => setVisitForm({ ...visitForm, patientName: e.target.value })}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Vitals Logged</label>
                <textarea
                  rows="3"
                  value={visitForm.vitalsSummary}
                  onChange={e => setVisitForm({ ...visitForm, vitalsSummary: e.target.value })}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowLogVisitModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Upload Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
