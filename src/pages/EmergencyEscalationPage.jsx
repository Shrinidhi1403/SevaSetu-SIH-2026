import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import {
  AlertTriangle,
  Ambulance,
  PhoneCall,
  MapPin,
  Clock,
  ShieldAlert,
  Building2,
  CheckCircle2,
  Navigation,
  HeartPulse,
  Activity,
  Radio,
  FileText,
  User,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const EmergencyEscalationPage = () => {
  const {
    referrals,
    dispatchAmbulance,
    notify,
    facilities,
    currentUser,
    t
  } = useApp();

  const [selectedReferralId, setSelectedReferralId] = useState(referrals[0]?.id || "REF-2026-881");
  const [showContactModal, setShowContactModal] = useState(false);
  const [dispatchNotes, setDispatchNotes] = useState("ALS unit informed: High-flow oxygen 4L/min active, IV Access 18G secured.");

  const selectedReferral = referrals.find(r => r.id === selectedReferralId) || referrals[0];

  const handleDispatch = () => {
    dispatchAmbulance(selectedReferral.id, dispatchNotes);
  };

  const handleCallFacility = () => {
    setShowContactModal(true);
  };

  const facilityMatches = [
    {
      name: "District Hospital Satara (Tertiary Center)",
      distanceKm: 24,
      etaMin: 18,
      icuBedsAvailable: 4,
      specialists: "Interventional Cardiologist, OB/GYN, Anesthetist",
      bloodUnitsAvailable: "O+ (14 units), B+ (8 units)",
      matchScore: "98% Optimal Match",
      isRecommended: true
    },
    {
      name: "CHC Khandala (Secondary Care Center)",
      distanceKm: 18,
      etaMin: 22,
      icuBedsAvailable: 1,
      specialists: "General Surgeon, Medical Officer",
      bloodUnitsAvailable: "Limited Storage",
      matchScore: "76% Partial Match",
      isRecommended: false
    },
    {
      name: "Sassoon General Hospital Pune (Level 1 Apex)",
      distanceKm: 54,
      etaMin: 48,
      icuBedsAvailable: 12,
      specialists: "All Super-specialties, Cardiothoracic, ECMO",
      bloodUnitsAvailable: "Apex Blood Bank",
      matchScore: "84% Distance Strained",
      isRecommended: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-4 sm:p-5 rounded-xl shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-600 text-white shadow-md">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/60 px-2 py-0.5 rounded">
                National 108 Emergency Medical Response System (MEMS)
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-rose-950 dark:text-rose-100 mt-1">
              Critical Emergency Escalation & Tele-Triage Desk
            </h2>
            <p className="text-xs text-rose-800 dark:text-rose-300 mt-0.5">
              Golden-hour acute stroke, STEMI, and obstetric emergency dispatch with live telemetry link.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:108"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Dial 108 Dispatch HQ</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Active Queue + Referral Note */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col h-[740px]">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Active Critical Queue ({referrals.length})</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Clinical triage priority</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-2 divide-y divide-slate-100 dark:divide-slate-800">
            {referrals.map((ref) => {
              const isSelected = selectedReferral?.id === ref.id;
              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedReferralId(ref.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-rose-50/80 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 dark:text-slate-100">
                        {ref.patientName}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
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

                  <div className="mt-2 text-xs text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-200/60 dark:border-slate-700 font-medium">
                    {ref.fromFacility} → <span className="font-bold text-slate-900 dark:text-slate-100">{ref.toFacility}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {ref.clinicalSummary}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-1.5">
                    <span className="flex items-center gap-1 font-semibold text-rose-700 dark:text-rose-400">
                      <Ambulance className="w-3 h-3" />
                      {ref.status}
                    </span>
                    <span>ETA: {ref.etaMinutes}m</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Referral Note Detail & Facility Matcher (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {selectedReferral && (
            <>
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">
                        {selectedReferral.patientName}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        ({selectedReferral.patientAge}y, {selectedReferral.patientGender})
                      </span>
                      <Badge status={selectedReferral.urgency} label={selectedReferral.urgencyLabel} size="xs" pulse />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      ABHA ID: {selectedReferral.abhaId} • Referral ID: {selectedReferral.id}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCallFacility}
                      className="py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                      <span>{t('contactFacility')}</span>
                    </button>

                    <button
                      onClick={handleDispatch}
                      className="py-2 px-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Ambulance className="w-3.5 h-3.5" />
                      <span>{t('confirmDispatch')}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-rose-50/40 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs space-y-2">
                  <div className="font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400" />
                    <span>Emergency Tele-Triage Evaluation:</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {selectedReferral.clinicalSummary}
                  </p>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-4 pt-1">
                    <span>Origin: <strong>{selectedReferral.fromFacility}</strong></span>
                    <span>Target: <strong>{selectedReferral.toFacility}</strong></span>
                    <span>Specialty: <strong>{selectedReferral.specialty}</strong></span>
                  </div>
                </div>
              </div>

              {/* Facility Matcher Panel */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                      AI Facility Matcher & Capacity Audit
                    </h4>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Ranked by Golden-Hour Proximity</span>
                </div>

                <div className="space-y-2.5">
                  {facilityMatches.map((fac, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all text-xs ${
                        fac.isRecommended
                          ? 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 ring-1 ring-teal-500/20'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            <span>{fac.name}</span>
                            {fac.isRecommended && (
                              <span className="text-[10px] font-bold bg-teal-700 text-white px-2 py-0.5 rounded uppercase">
                                Recommended Match
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                            Available: <span className="font-medium">{fac.specialists}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">
                            ETA {fac.etaMin} mins
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            {fac.distanceKm} km transit
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          ✓ {fac.icuBedsAvailable} Ventilated ICU Beds Vacant
                        </span>
                        <span>Blood: {fac.bloodUnitsAvailable}</span>
                        <span className="font-bold text-teal-800 dark:text-teal-300">{fac.matchScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Ambulance-Tracking Map Placeholder */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-elevated p-5 text-white space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Ambulance className="w-5 h-5 text-rose-500 animate-pulse" />
                    <div>
                      <h4 className="font-heading font-bold text-sm text-slate-100">
                        Live 108 Ambulance Telemetry: {selectedReferral.ambulanceId}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        GPS Sat-Nav & In-transit Vitals Streaming
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-2.5 py-1 rounded-lg">
                    ETA {selectedReferral.etaMinutes} Mins
                  </span>
                </div>

                <div className="relative w-full h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 800 200">
                    <defs>
                      <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0F766E" />
                        <stop offset="65%" stopColor="#EF4444" />
                        <stop offset="100%" stopColor="#3B82F6" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 60 100 Q 250 40 450 120 T 740 100"
                      fill="none"
                      stroke="#1E293B"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 60 100 Q 250 40 450 120 T 740 100"
                      fill="none"
                      stroke="url(#routeGrad)"
                      strokeWidth="4"
                      strokeDasharray="8 6"
                      className="animate-pulse"
                    />

                    <circle cx="60" cy="100" r="10" fill="#0F766E" />
                    <circle cx="60" cy="100" r="4" fill="#FFFFFF" />
                    <text x="60" y="130" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="600">
                      {selectedReferral.fromFacility}
                    </text>

                    <g transform="translate(450, 120)">
                      <circle r="18" fill="#EF4444" fillOpacity="0.3" className="animate-ping" />
                      <rect x="-14" y="-12" width="28" height="24" rx="6" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
                      <text x="0" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">108</text>
                      <text x="0" y="-18" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle">68 km/h</text>
                    </g>

                    <circle cx="740" cy="100" r="10" fill="#3B82F6" />
                    <circle cx="740" cy="100" r="4" fill="#FFFFFF" />
                    <text x="740" y="130" fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="600">
                      {selectedReferral.toFacility}
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Transit SpO2</span>
                    <span className="font-bold text-rose-400 text-sm">91% (O2 4L Nasal)</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Heart Rate</span>
                    <span className="font-bold text-amber-400 text-sm">108 bpm Thready</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Paramedic in Transit</span>
                    <span className="font-bold text-slate-200 text-sm">S. Mane (ALS EMT)</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Paramedic Comm</span>
                    <span className="font-bold text-teal-400 text-sm">+91 99221 44550</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Contact Receiving Facility Hotline
                </h3>
              </div>
              <button onClick={() => setShowContactModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border dark:border-slate-700 space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-100">{selectedReferral.toFacility}</div>
                <div className="text-slate-600 dark:text-slate-300">Emergency & Trauma Department Desk</div>
                <div className="font-mono text-teal-800 dark:text-teal-400 font-bold text-sm">+91 2162 234108 / Extension 102</div>
              </div>

              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 rounded-lg text-[11px]">
                ✓ Trauma resuscitation bay alerted. Blood units reserved under ABHA ID: {selectedReferral.abhaId}.
              </div>
            </div>

            <div className="pt-3 border-t dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold text-xs"
              >
                Close Hotline Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
