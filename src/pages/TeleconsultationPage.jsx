import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  PhoneCall,
  Signal,
  Wifi,
  Sparkles,
  HeartPulse,
  Pill,
  Building2,
  FileText,
  UserCheck,
  AlertTriangle,
  Send,
  Printer,
  CheckCircle2,
  ChevronRight,
  Globe,
  Settings,
  Maximize2
} from 'lucide-react';

export const TeleconsultationPage = () => {
  const {
    selectedPatient,
    currentUser,
    teleconsultCall,
    setTeleconsultCall,
    addClinicalNote,
    createEmergencyEscalation,
    notify,
    language,
    toggleLanguage,
    t
  } = useApp();

  const navigate = useNavigate();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [callActive, setCallActive] = useState(teleconsultCall.isActive);
  const [sideTab, setSideTab] = useState('overview');

  const [chiefComplaint, setChiefComplaint] = useState(
    "Patient reports 4 days of intermittent bilateral foot tingling, morning dizziness upon standing, and fasting blood sugar fluctuating above 210 mg/dL. Compliance with evening dose was irregular due to epigastric discomfort."
  );

  const [showRxModal, setShowRxModal] = useState(false);
  const [rxList, setRxList] = useState([
    { drug: "Tab. Metformin 1000mg SR", dosage: "1-0-1 (With Food)", duration: "30 Days", instructions: "Avoid skipping meals" },
    { drug: "Tab. Telmisartan 40mg", dosage: "1-0-0 (Morning Before Food)", duration: "30 Days", instructions: "Monitor BP weekly at ASHA kiosk" },
    { drug: "Tab. Methylcobalamin 1500mcg", dosage: "0-1-0 (After Lunch)", duration: "30 Days", instructions: "For peripheral neuropathy" }
  ]);
  const [newDrug, setNewDrug] = useState({ drug: "", dosage: "1-0-1", duration: "15 Days", instructions: "" });

  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralTarget, setReferralTarget] = useState("District Hospital Satara (Cardio/Diabetology)");
  const [referralReason, setReferralReason] = useState("Severe uncontrolled hyperglycemia with diabetic neuropathy and retinopathy suspicion.");

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleCall = () => {
    if (callActive) {
      setCallActive(false);
      setTeleconsultCall(prev => ({ ...prev, isActive: false }));
      notify("Consultation Concluded", "Session summary logged in ABHA record.", "info");
    } else {
      setCallActive(true);
      setTeleconsultCall(prev => ({ ...prev, isActive: true, durationSeconds: 0 }));
      notify("Consultation Started", "eSanjeevani encrypted video link connected with rural health post.", "success");
    }
  };

  const handleAddDrugToRx = () => {
    if (!newDrug.drug.trim()) return;
    setRxList([...rxList, newDrug]);
    setNewDrug({ drug: "", dosage: "1-0-1", duration: "15 Days", instructions: "" });
  };

  const handleSavePrescription = () => {
    addClinicalNote(selectedPatient.id, {
      type: "teleconsult",
      title: "Teleconsultation e-Prescription Issued",
      summary: `Chief Complaint: ${chiefComplaint}. Prescribed ${rxList.length} medications. Digital signature applied by ${currentUser.name}.`,
      tags: ["e-Prescription", "Tele-OPD"],
      prescription: rxList.map(r => ({ drug: r.drug, dosage: r.dosage, days: parseInt(r.duration) || 30 }))
    });
    setShowRxModal(false);
    notify("e-Prescription Generated & Digitally Signed", `Pushed to patient's ABHA account and SMS dispatch triggered to ${selectedPatient.phone}.`);
  };

  const handleConfirmReferral = () => {
    createEmergencyEscalation(selectedPatient, referralTarget, referralReason, "critical");
    setShowReferralModal(false);
    navigate('/emergency');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100">
                eSanjeevani Teleconsultation Desk
              </h2>
              {callActive ? (
                <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  LIVE: {formatTime(teleconsultCall.durationSeconds)}
                </span>
              ) : (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Call Idle
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assisted Rural Tele-OPD Session • Connected to Shirwal Sub-Center Kiosk
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
            isLowBandwidth
              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300'
              : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
          }`}>
            <Signal className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            <span>{isLowBandwidth ? 'Low-Bandwidth 2G Mode' : 'Bandwidth: Optimized (4G HD)'}</span>
          </div>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-xs"
            title="Toggle Language (EN / मराठी / हिन्दी)"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'mr' ? 'मराठी' : language === 'hi' ? 'हिन्दी' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Video Box */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="relative w-full h-[450px] sm:h-[500px] bg-slate-950 rounded-2xl overflow-hidden shadow-elevated border border-slate-800 flex items-center justify-center">
            {callActive ? (
              isVideoOff ? (
                <div className="text-center p-8 text-slate-400">
                  <VideoOff className="w-12 h-12 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-sm">Remote Camera Paused</p>
                  <p className="text-xs text-slate-500">Audio stream active via low-bitrate codec</p>
                </div>
              ) : (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=900"
                    alt={selectedPatient.name}
                    className={`w-full h-full object-cover ${isLowBandwidth ? 'filter blur-[0.5px] contrast-125' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

                  {/* Patient Info Overlay */}
                  <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-white flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <div className="font-heading font-bold text-xs">
                        {selectedPatient.name} ({selectedPatient.age}y)
                      </div>
                      <div className="text-[10px] text-slate-300">
                        Co-present: ASHA Sunita Kamble (Assisting)
                      </div>
                    </div>
                  </div>

                  {/* Vitals Telemetry HUD */}
                  <div className="absolute top-4 right-4 z-10 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700 text-white space-y-1 text-[11px] font-mono">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-400">BP Live:</span>
                      <span className="font-bold text-amber-400">{selectedPatient.latestVitals.bp}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-400">SpO2:</span>
                      <span className="font-bold text-emerald-400">{selectedPatient.latestVitals.spo2}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-400">Pulse:</span>
                      <span className="font-bold text-teal-300">{selectedPatient.latestVitals.pulse}</span>
                    </div>
                  </div>

                  {/* Self-View Thumbnail */}
                  <div className="absolute bottom-16 right-4 z-10 w-28 sm:w-36 h-20 sm:h-24 bg-slate-900 rounded-xl overflow-hidden border-2 border-teal-500 shadow-elevated">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-1.5 right-1.5 bg-black/70 px-1 py-0.5 rounded text-[9px] text-white truncate text-center">
                      {currentUser.name} (You)
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="text-center p-8 text-slate-400 space-y-3">
                <PhoneOff className="w-12 h-12 mx-auto text-slate-600" />
                <h3 className="font-heading font-bold text-slate-200 text-base">
                  Teleconsultation Session Inactive
                </h3>
                <button
                  onClick={handleToggleCall}
                  className="py-2.5 px-5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-md inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Start Tele-OPD Call</span>
                </button>
              </div>
            )}

            {/* Controls Dock */}
            {callActive && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 shadow-xl">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-xl transition-all ${
                    isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-2.5 rounded-xl transition-all ${
                    isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  title={isVideoOff ? "Start Video" : "Stop Video"}
                >
                  {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsLowBandwidth(!isLowBandwidth)}
                  className={`p-2.5 rounded-xl transition-all ${
                    isLowBandwidth ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                  title="2G Resilience Mode"
                >
                  <Signal className="w-4 h-4" />
                </button>

                <button
                  onClick={handleToggleCall}
                  className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md flex items-center gap-1.5 px-3 font-semibold text-xs"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Clinical Side Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-4 sm:p-5 flex flex-col justify-between h-auto lg:h-[570px] overflow-y-auto space-y-4">
          <div>
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                    {selectedPatient.name}
                  </h3>
                  <Badge status={selectedPatient.riskColor} label={selectedPatient.riskLevel.split(' ')[0]} size="xs" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  ABHA: {selectedPatient.abhaId}
                </div>
              </div>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-semibold text-slate-700 dark:text-slate-300">
                {selectedPatient.age}y / {selectedPatient.gender}
              </span>
            </div>

            <div className="flex border-b border-slate-200 dark:border-slate-800 mt-2.5 text-xs font-semibold">
              <button
                onClick={() => setSideTab('overview')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  sideTab === 'overview'
                    ? 'border-teal-700 text-teal-800 dark:text-teal-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSideTab('history')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  sideTab === 'history'
                    ? 'border-teal-700 text-teal-800 dark:text-teal-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                History ({selectedPatient.timeline.length})
              </button>
              <button
                onClick={() => setSideTab('prescriptions')}
                className={`py-2 px-3 border-b-2 transition-colors ${
                  sideTab === 'prescriptions'
                    ? 'border-teal-700 text-teal-800 dark:text-teal-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                Prescriptions ({rxList.length})
              </button>
            </div>

            {sideTab === 'overview' && (
              <div className="mt-3 space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">BP</span>
                    <span className="font-heading font-bold text-slate-900 dark:text-slate-100">{selectedPatient.latestVitals.bp}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">SpO2</span>
                    <span className="font-heading font-bold text-slate-900 dark:text-slate-100">{selectedPatient.latestVitals.spo2}</span>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block">Blood Sugar</span>
                    <span className="font-heading font-bold text-slate-900 dark:text-slate-100 truncate block">
                      {selectedPatient.latestVitals.bloodSugar.split(' ')[0]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] mb-1">
                    Chief Complaint & Doctor Notes:
                  </label>
                  <textarea
                    rows="3"
                    value={chiefComplaint}
                    onChange={e => setChiefComplaint(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-800/50"
                  />
                </div>
              </div>
            )}

            {sideTab === 'history' && (
              <div className="mt-3 space-y-2 max-h-56 overflow-y-auto text-xs">
                {selectedPatient.timeline.map((ev) => (
                  <div key={ev.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{ev.title}</span>
                      <span className="text-[10px] text-slate-400">{ev.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-1 text-[11px]">{ev.summary}</p>
                  </div>
                ))}
              </div>
            )}

            {sideTab === 'prescriptions' && (
              <div className="mt-3 space-y-2 max-h-56 overflow-y-auto text-xs">
                {rxList.map((rx, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{rx.drug}</div>
                      <div className="text-[10px] text-slate-500">{rx.dosage} • {rx.duration}</div>
                    </div>
                    <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold bg-white dark:bg-slate-800 px-2 py-0.5 rounded border dark:border-slate-700">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              onClick={() => setShowRxModal(true)}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Pill className="w-4 h-4" />
              <span>{t('generatePrescription')}</span>
            </button>

            <button
              onClick={() => setShowReferralModal(true)}
              className="w-full py-2 px-4 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{t('referHospital')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showRxModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-700 text-white font-serif font-bold text-sm">
                  ℞
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                    Electronic Prescription Generator (e-Rx)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Patient: {selectedPatient.name} • ABHA: {selectedPatient.abhaId}
                  </p>
                </div>
              </div>
              <button onClick={() => setShowRxModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto text-xs">
              {rxList.map((item, index) => (
                <div key={index} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{item.drug}</div>
                    <div className="text-slate-500 text-[11px]">{item.dosage} • {item.duration}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRxList(rxList.filter((_, i) => i !== index))}
                    className="text-rose-600 hover:text-rose-800 text-[11px] font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                Doctor: <span className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRxModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrescription}
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Issue & Sign e-Prescription</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReferralModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Emergency Referral Escalation
                </h3>
              </div>
              <button onClick={() => setShowReferralModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Tertiary Center</label>
                <select
                  value={referralTarget}
                  onChange={e => setReferralTarget(e.target.value)}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option>District Hospital Satara (ICU & Trauma)</option>
                  <option>CHC Khandala (Surgical Unit)</option>
                  <option>Bhor Sub-district Hospital</option>
                  <option>Sassoon General Hospital Pune</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Indication</label>
                <textarea
                  rows="3"
                  value={referralReason}
                  onChange={e => setReferralReason(e.target.value)}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowReferralModal(false)}
                className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReferral}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Confirm & Dispatch 108</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
