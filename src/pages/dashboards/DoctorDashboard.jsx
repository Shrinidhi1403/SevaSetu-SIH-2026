import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Video,
  Clock,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Pill,
  HeartPulse,
  Activity,
  Calendar,
  Building2,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export const DoctorDashboard = () => {
  const {
    currentUser,
    patients,
    setSelectedPatientId,
    teleconsultCall,
    notify,
    t
  } = useApp();

  const navigate = useNavigate();

  // Doctor's OPD triage queue
  const [opdFilter, setOpdFilter] = useState('all');

  const todayAppointments = [
    {
      time: "11:30 AM",
      patient: patients[0], // Ramesh Patil
      reason: "Diabetes Follow-up (HbA1c 8.8%)",
      type: "e-Teleconsult",
      status: "In Progress",
      priority: "urgent"
    },
    {
      time: "12:15 PM",
      patient: patients[1], // Sunita Jadhav
      reason: "Severe Anemia at 34wks + HTN Triage",
      type: "Emergency Escalation",
      status: "In Transit 108",
      priority: "critical"
    },
    {
      time: "02:00 PM",
      patient: patients[2], // Aarav Shinde
      reason: "Pediatric SAM Nutrition & ORS Review",
      type: "Tele-Kiosk Follow-up",
      status: "Scheduled",
      priority: "urgent"
    },
    {
      time: "03:00 PM",
      patient: patients[4], // Parvati Devi
      reason: "Chronic Knee Pain & Hypertension",
      type: "Tele-OPD",
      status: "Scheduled",
      priority: "normal"
    }
  ];

  // Critical vitals alerts
  const vitalsAlerts = [
    {
      patient: "Ramesh Shantaram Patil",
      alert: "Random Blood Sugar 234 mg/dL",
      recorded: "Today 09:45 AM by ASHA Sunita",
      action: "Adjust Metformin & Diet Chart"
    },
    {
      patient: "Sunita Laxman Jadhav",
      alert: "Hemoglobin 7.4 g/dL (Severe Pallor)",
      recorded: "Today 10:15 AM at ANC Clinic",
      action: "IV Iron Sucrose & 108 Transport"
    },
    {
      patient: "Tukaram Kisan Shinde",
      alert: "ECG Anterior ST Elevation (STEMI)",
      recorded: "Today 11:10 AM Kikvi Center",
      action: "Cath Lab Satara DH Dispatched"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-teal-600/60 border border-teal-400/30">
                Primary Health Centre • Clinical Station
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mt-1">
              Welcome, {currentUser.name}
            </h2>
            <p className="text-teal-100 text-xs mt-0.5">
              {currentUser.roleTitle} • {currentUser.facility} • Daily OPD Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/teleconsult')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-teal-800 font-bold text-xs shadow-md hover:bg-teal-50 transition-all"
          >
            <Video className="w-4 h-4 text-teal-700 animate-pulse" />
            <span>Join Live Tele-OPD</span>
          </button>

          <button
            onClick={() => navigate('/emergency')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Emergency Escalations</span>
          </button>
        </div>
      </div>

      {/* 4 Doctor Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's OPD Consults"
          value="42 Patients"
          subtitle="28 Physical OPD • 14 Tele-OPD"
          icon={Users}
          trend="+6 over target"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title="Critical Cases Triaged"
          value="3 Urgent"
          subtitle="1 STEMI, 1 SAM, 1 High-risk ANC"
          icon={AlertTriangle}
          trend="All 3 Stabilized"
          trendType="negative"
          variant="rose"
        />

        <StatCard
          title="e-Prescriptions Issued"
          value="36 Digitized"
          subtitle="ABDM FHIR compliant"
          icon={Pill}
          trend="100% Counter-signed"
          trendType="positive"
          variant="blue"
        />

        <StatCard
          title="Avg Triage Duration"
          value="8.4 mins"
          subtitle="Guideline: 7-10 mins/consult"
          icon={Clock}
          trend="Optimal Flow"
          trendType="positive"
          variant="amber"
        />
      </div>

      {/* Main Grid: Tele-OPD Queue & Vitals Critical Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Teleconsultation & OPD Queue (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col justify-between">
          <div>
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  <span>Today's Consultation Line-up</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Scheduled tele-OPD slots from rural sub-centers and walk-in clinical triage
                </p>
              </div>

              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
                4 Sessions
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 p-2">
              {todayAppointments.map((apt, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="font-mono font-bold text-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 text-center shrink-0">
                      {apt.time}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {apt.patient.name}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          ({apt.patient.age}y, {apt.patient.gender})
                        </span>
                        <Badge
                          status={apt.priority === 'critical' ? 'critical' : apt.priority === 'urgent' ? 'strained' : 'optimal'}
                          label={apt.status}
                          size="xs"
                          pulse={apt.status.includes('Progress')}
                        />
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                        Indication: <span className="font-semibold text-slate-800 dark:text-slate-200">{apt.reason}</span>
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        ABHA: {apt.patient.abhaId} • Sub-center: {apt.patient.primaryPhc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedPatientId(apt.patient.id);
                        navigate('/patients');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-medium"
                    >
                      View Chart
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPatientId(apt.patient.id);
                        navigate('/teleconsult');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center gap-1.5 shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 rounded-b-xl flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Next OPD Slot: 03:00 PM (Parvati Devi More)</span>
            <button
              onClick={() => navigate('/patients')}
              className="text-teal-700 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
            >
              Open Full Patient Registry <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Critical Vitals Telemetry Watchlist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Critical Vitals Alert Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Field Vitals Critical Alerts
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded">
                Immediate Action
              </span>
            </div>

            <div className="space-y-2.5">
              {vitalsAlerts.map((va, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-rose-50/40 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{va.patient}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{va.recorded}</span>
                  </div>
                  <div className="font-semibold text-rose-700 dark:text-rose-400">
                    ⚠️ {va.alert}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between pt-1">
                    <span>Protocol: {va.action}</span>
                    <button
                      onClick={() => navigate('/emergency')}
                      className="text-teal-700 dark:text-teal-400 font-bold hover:underline"
                    >
                      Triage →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Diagnostic Scratchpad */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-teal-700" />
              <span>Quick Tele-Prescription & Drug Indent</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need immediate antibiotic, IV fluid, or antihypertensive supply from central warehouse?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/inventory')}
                className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg text-xs transition-colors"
              >
                Inspect Drug Stock
              </button>
              <button
                onClick={() => navigate('/teleconsult')}
                className="flex-1 py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg text-xs transition-colors"
              >
                Issue Digital e-Rx
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
