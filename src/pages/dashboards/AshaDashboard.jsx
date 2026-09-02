import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Home,
  Baby,
  Users,
  CheckCircle2,
  Clock,
  PhoneCall,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Plus,
  Radio,
  BatteryCharging,
  Smartphone,
  ChevronRight,
  Sparkles,
  Camera
} from 'lucide-react';

export const AshaDashboard = () => {
  const {
    currentUser,
    patients,
    setSelectedPatientId,
    logAshaVisit,
    notify
  } = useApp();

  const navigate = useNavigate();

  // Offline queue state
  const [offlineRecordsCount, setOfflineRecordsCount] = useState(2);
  const [isSyncing, setIsSyncing] = useState(false);

  // Doorstep visit modal
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [visitNotes, setVisitNotes] = useState("");
  const [vitalsInput, setVitalsInput] = useState({
    bp: "120/80",
    sugar: "115",
    pulse: "76",
    temp: "98.6"
  });

  const todayTasks = [
    {
      id: "TSK-01",
      time: "09:45 AM",
      beneficiary: "Ramesh Shantaram Patil",
      village: "Shirwal Gaon, Ward 3",
      category: "NCD Diabetes Screening",
      badge: "strained",
      priority: "High Priority",
      notes: "Check morning fasting sugar and inspect feet for ulcers."
    },
    {
      id: "TSK-02",
      time: "11:30 AM",
      beneficiary: "Meena Santosh Gaikwad",
      village: "Shirwal Gaon, Ward 1",
      category: "Post-Natal Care (PNC Day 12)",
      badge: "critical",
      priority: "Sepsis Watch",
      notes: "Mother had 102°F fever spike yesterday. Inspect perineal wound and breast engorgement."
    },
    {
      id: "TSK-03",
      time: "02:15 PM",
      beneficiary: "Aarav Sachin Shinde",
      village: "Velhe Hills, Wadi 2",
      category: "Pediatric SAM Nutrition Follow-up",
      badge: "critical",
      priority: "SAM Red Zone",
      notes: "Measure MUAC tape reading and supply WHO ORS sachets."
    },
    {
      id: "TSK-04",
      time: "04:00 PM",
      beneficiary: "Parvati Devi More",
      village: "Khopadi Vasti",
      category: "Hypertension Routine Dispensation",
      badge: "optimal",
      priority: "Routine",
      notes: "Deliver 30-day blister pack of Tab. Amlodipine 5mg."
    }
  ];

  const handleSyncOfflineQueue = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setOfflineRecordsCount(0);
      notify("ASHA Mobile Sync Complete", "2 cached doorstep visits synchronized with SevaSetu cloud registry.", "success");
    }, 1000);
  };

  const handleOpenVisitModal = (task) => {
    setSelectedTask(task);
    setShowVisitModal(true);
  };

  const handleSubmitVisit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      logAshaVisit(
        selectedTask.beneficiary,
        "Shirwal West (Cluster 4)",
        `BP: ${vitalsInput.bp} mmHg, Sugar: ${vitalsInput.sugar} mg/dL, Temp: ${vitalsInput.temp} °F. ${visitNotes}`
      );
      setShowVisitModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ASHA Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-emerald-700/70 border border-emerald-400/30">
                Grassroots Frontline Health Mobilizer
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Namaste, {currentUser.name}
            </h2>
            <p className="text-emerald-100 text-xs mt-0.5">
              Cluster: {currentUser.facility} • 284 Households Assigned • Field Day Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Offline Sync Button */}
          <button
            onClick={handleSyncOfflineQueue}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
              offlineRecordsCount > 0
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing
                ? "Syncing Cloud..."
                : offlineRecordsCount > 0
                ? `Sync Offline Queue (${offlineRecordsCount})`
                : "All Records Synced ✓"}
            </span>
          </button>

          {/* SOS Doctor Call */}
          <a
            href="tel:9823045120"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>SOS Doctor Call</span>
          </a>
        </div>
      </div>

      {/* 4 ASHA Frontline KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Doorstep Route"
          value="4 Homes"
          subtitle="2 Critical • 1 Maternal • 1 NCD"
          icon={Home}
          trend="2 Completed"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title="Monthly Visit Target"
          value="248 / 284"
          subtitle="87.3% Coverage this month"
          icon={Users}
          trend="+12 homes this week"
          trendType="positive"
          variant="blue"
        />

        <StatCard
          title="Mothers Under Watch"
          value="6 High-Risk"
          subtitle="Severe anemia & pre-eclampsia watch"
          icon={Baby}
          trend="All registered in ABHA"
          trendType="neutral"
          variant="rose"
        />

        <StatCard
          title="Tablet Battery & Network"
          value="88% • 4G LTE"
          subtitle="Govt Allotted Samsung Galaxy M14"
          icon={Smartphone}
          trend="Signal Strong"
          trendType="positive"
          variant="amber"
        />
      </div>

      {/* Grid: Today's Field Route Task List & High-Risk Beneficiary Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Itinerary (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Home className="w-4 h-4 text-emerald-600" />
                <span>Today's Doorstep Screening Itinerary</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Prioritized route for village home visits, medicine delivery, and vitals recording
              </p>
            </div>

            <button
              onClick={() => handleOpenVisitModal(todayTasks[0])}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Visit</span>
            </button>
          </div>

          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
                      {task.time}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {task.beneficiary}
                    </span>
                    <Badge status={task.badge} label={task.priority} size="xs" />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-1">
                    {task.category} • <span className="font-medium text-slate-700 dark:text-slate-300">{task.village}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    📋 Task: {task.notes}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenVisitModal(task)}
                    className="py-1.5 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>Record Vitals</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: High-Risk Watchlist & VHSND Schedule (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-rose-600" />
                <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  High-Risk Mothers (ANC / PNC)
                </h4>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                Weekly Surveillance
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-rose-50/40 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>Sunita Laxman Jadhav (24y)</span>
                  <span className="text-rose-700 dark:text-rose-400">34 Wks Gestation</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Severe Anemia (Hb 7.4 g/dL). 108 ALS Ambulance dispatched to Satara District Hospital.
                </p>
              </div>

              <div className="p-3 bg-amber-50/40 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl space-y-1">
                <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                  <span>Meena Santosh Gaikwad (22y)</span>
                  <span className="text-amber-700 dark:text-amber-400">PNC Day 12</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Episiotomy wound check. Doctor prescribed oral Cefixime 200mg BD.
                </p>
              </div>
            </div>
          </div>

          {/* Next VHSND Camp Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Next VHSND Village Camp
                </h4>
              </div>
              <span className="text-xs font-bold text-teal-800 dark:text-teal-400">30 Aug 2026</span>
            </div>

            <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold">Shirwal Anganwadi #3 (09:00 AM)</div>
              <div className="text-[11px] text-slate-500">
                Target: 35 ANC mothers + 48 infants for Pentavalent-3 & MR-1 vaccines
              </div>
            </div>

            <button
              onClick={() => navigate('/asha')}
              className="w-full mt-2 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold text-center transition-colors"
            >
              Open Full Outreach Calendar →
            </button>
          </div>
        </div>
      </div>

      {/* Record Doorstep Vitals Modal */}
      {showVisitModal && selectedTask && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Log Doorstep Vitals: {selectedTask.beneficiary}
                </h3>
              </div>
              <button onClick={() => setShowVisitModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitVisit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Blood Pressure (mmHg)</label>
                  <input
                    type="text"
                    value={vitalsInput.bp}
                    onChange={e => setVitalsInput({ ...vitalsInput, bp: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="120/80"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="text"
                    value={vitalsInput.sugar}
                    onChange={e => setVitalsInput({ ...vitalsInput, sugar: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="110"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Pulse (bpm)</label>
                  <input
                    type="text"
                    value={vitalsInput.pulse}
                    onChange={e => setVitalsInput({ ...vitalsInput, pulse: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="78"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Temperature (°F)</label>
                  <input
                    type="text"
                    value={vitalsInput.temp}
                    onChange={e => setVitalsInput({ ...vitalsInput, temp: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    placeholder="98.6"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">ASHA Observations & Notes</label>
                <textarea
                  rows="3"
                  value={visitNotes}
                  onChange={e => setVisitNotes(e.target.value)}
                  placeholder="Patient compliance verified, salt restriction advised, wound healing cleanly..."
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowVisitModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Doorstep Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
