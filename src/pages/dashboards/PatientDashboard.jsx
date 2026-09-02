import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  Activity,
  Calendar,
  Clock,
  Pill,
  Video,
  AlertTriangle,
  PhoneCall,
  UserCheck,
  CheckCircle2,
  Circle,
  FileText,
  MapPin,
  Building2,
  ShieldCheck,
  Download,
  Share2,
  Volume2,
  VolumeX,
  Plus,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  X,
  Check,
  Sparkles,
  QrCode,
  Printer,
  Ambulance,
  Phone
} from 'lucide-react';

export const PatientDashboard = () => {
  const {
    currentUser,
    patients,
    selectedPatientId,
    setSelectedPatientId,
    selectedPatient,
    language,
    setLanguage,
    t,
    num,
    locName,
    locVillage,
    takenPills,
    togglePillTaken,
    updatePatientVitals,
    dispatchAmbulance,
    createEmergencyEscalation,
    notify,
    teleconsultCall
  } = useApp();

  const navigate = useNavigate();

  // Active patient object
  const patient = patients.find(p => p.id === selectedPatientId) || selectedPatient || patients[0];

  // Local interactive modals
  const [showAbhaModal, setShowAbhaModal] = useState(false);
  const [showLogVitalsModal, setShowLogVitalsModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [showAshaVisitModal, setShowAshaVisitModal] = useState(false);
  const [showBookAppointmentModal, setShowBookAppointmentModal] = useState(false);

  // Audio Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Form states
  const [vitalsForm, setVitalsForm] = useState({
    sys: "130",
    dia: "84",
    sugar: "140",
    pulse: "78",
    spo2: "98",
    notes: ""
  });

  const [appointmentForm, setAppointmentForm] = useState({
    doctor: "Dr. Ananya Kulkarni (PHC Shirwal)",
    date: "Tomorrow, 10:30 AM",
    reason: "Routine Follow-up & Prescription Refill"
  });

  const [ashaVisitReason, setAshaVisitReason] = useState("Home BP & Sugar check-up");

  // Multilingual display name helpers
  const getPatientDisplayName = (p) => {
    return locName(p);
  };

  const getPatientDisplayVillage = (p) => {
    return locVillage(p);
  };

  // Plain-language health assessment & recommendations
  const getHealthAssessment = () => {
    const isCritical = patient.riskColor === 'critical';
    const isStrained = patient.riskColor === 'strained';

    if (language === 'mr') {
      if (isCritical) {
        return {
          status: "अति-तातडीचे (लक्ष देणे आवश्यक)",
          badgeVariant: "critical",
          message: "आपल्या ताज्या तपासणीमध्ये काही लक्षणे गंभीर आढळली आहेत. त्वरित प्राथमिक आरोग्य केंद्र किंवा १०८ रुग्णवाहिकेचा सल्ला घ्या.",
          tip: "डॉक्टरांनी सांगितलेली औषधे ताबडतोब घ्या आणि शांत बसा."
        };
      }
      if (isStrained) {
        return {
          status: "काळजी घ्या (नियमित तपासणी आवश्यक)",
          badgeVariant: "strained",
          message: "रक्तातील साखर किंवा रक्तदाब नेहमीपेक्षा किंचित वाढलेला आहे. नियमित औषधे सुरू ठेवा व आहाराची पथ्ये पाळा.",
          tip: "गोड पदार्थ आणि अतिरिक्त मीठ टाळा. सकाळ-संध्याकाळ हलके चालणे ठेवा."
        };
      }
      return {
        status: "उत्तम व स्थिर आरोग्य",
        badgeVariant: "optimal",
        message: "आपले सर्व शारीरिक संकेत (वाइटल्स) सामान्य कक्षेत आहेत. नियमित औषधे आणि पथ्ये सुरू ठेवा.",
        tip: "दररोज भरपूर पाणी प्या, ताजी फळे व पालेभाज्यांचा आहारात समावेश करा."
      };
    }

    if (language === 'hi') {
      if (isCritical) {
        return {
          status: "अति-गंभीर (तत्काल ध्यान दें)",
          badgeVariant: "critical",
          message: "आपकी ताज़ा जांच में कुछ संकेत सामान्य से अधिक हैं। तुरंत डॉक्टर से परामर्श लें या १०८ एम्बुलेंस सहायता लें।",
          tip: "डॉक्टर द्वारा सुझाई गई आपातकालीन दवा तुरंत लें और आराम करें।"
        };
      }
      if (isStrained) {
        return {
          status: "विशेष सावधानी बरतें",
          badgeVariant: "strained",
          message: "रक्त शर्करा अथवा रक्तचाप थोड़ा बढ़ा हुआ है। समय पर दवा लें और नमक-मीठे का परहेज़ रखें।",
          tip: "दवाएं समय पर लें और तली-भुनी चीज़ों से परहेज़ करें।"
        };
      }
      return {
        status: "उत्कृष्ट एवं स्थिर स्वास्थ्य",
        badgeVariant: "optimal",
        message: "आपकी सभी स्वास्थ्य रिपोर्ट एवं वाइटल्स सामान्य और सुरक्षित सीमा में हैं।",
        tip: "स्वच्छ जल पिएं और रोज़ाना सुबह की सैर अवश्य करें।"
      };
    }

    // English
    if (isCritical) {
      return {
        status: "High Attention Needed",
        badgeVariant: "critical",
        message: "Your recent health telemetry indicates high risk. Please contact your PHC doctor or emergency support immediately.",
        tip: "Rest quietly and do not skip prescribed medication doses."
      };
    }
    if (isStrained) {
      return {
        status: "Moderate Follow-up Required",
        badgeVariant: "strained",
        message: "Vitals indicate elevated sugar or blood pressure. Maintain prescribed diet and take doses on time.",
        tip: "Reduce dietary sodium and processed sugars. Take light morning walks."
      };
    }
    return {
      status: "Stable & Healthy",
      badgeVariant: "optimal",
      message: "All vital signs are within normal clinical ranges. Keep up the good work and medication adherence.",
      tip: "Drink clean boiled water, eat green leafy vegetables, and stay hydrated."
    };
  };

  const healthAssessment = getHealthAssessment();

  // Voice Assistant: Read Out Loud
  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      notify("Voice Assistance", "Speech synthesis is not supported on this browser.", "info");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const patientName = getPatientDisplayName(patient);
    let speechText = "";

    if (language === 'mr') {
      speechText = `नमस्कार ${patientName}. आपली आरोग्य स्थिती: ${healthAssessment.status}. ${healthAssessment.message}. आपले औषध वेळापत्रक आणि पुढील तपासणी तारीख डॅशबोर्डवर उपलब्ध आहे.`;
    } else if (language === 'hi') {
      speechText = `नमस्ते ${patientName}. आपकी स्वास्थ्य स्थिति: ${healthAssessment.status}. ${healthAssessment.message}. अपनी दवाएं समय पर अवश्य लें.`;
    } else {
      speechText = `Hello ${patientName}. Your overall health status is: ${healthAssessment.status}. ${healthAssessment.message}. Please check your daily pill reminders below.`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Submit vitals logged by patient/family
  const handleSaveVitals = (e) => {
    e.preventDefault();
    updatePatientVitals(patient.id, {
      bp: `${vitalsForm.sys}/${vitalsForm.dia} mmHg`,
      bpStatus: parseInt(vitalsForm.sys) > 140 ? 'high' : 'normal',
      bloodSugar: `${vitalsForm.sugar} mg/dL`,
      bloodSugarStatus: parseInt(vitalsForm.sugar) > 180 ? 'high' : 'normal',
      pulse: `${vitalsForm.pulse} bpm`,
      spo2: `${vitalsForm.spo2}%`,
      temp: "98.6 °F"
    });
    setShowLogVitalsModal(false);
    notify(
      language === 'mr' ? "आरोग्य तपासणी नोंदवली" : language === 'hi' ? "स्वास्थ्य माप सुरक्षित" : "Vitals Recorded",
      language === 'mr' ? `नवीन रक्तदाब व साखर नोंद डॉ. अनन्या यांना पाठवण्यात आली.` : "New vitals transmitted to PHC Medical Officer."
    );
  };

  // Trigger 108 SOS
  const handleConfirmEmergencySos = () => {
    createEmergencyEscalation(
      patient,
      "District Hospital Satara (ICU & Trauma Unit)",
      "Patient activated 108 SOS from SevaSetu Citizen Dashboard due to acute distress.",
      "critical"
    );
    setShowSosModal(true);
  };

  // Submit ASHA visit request
  const handleRequestAshaVisit = (e) => {
    e.preventDefault();
    setShowAshaVisitModal(false);
    notify(
      language === 'mr' ? "आशा भेट विनंती पाठवली" : language === 'hi' ? "आशा भेंट अनुरोध भेजा" : "ASHA Visit Requested",
      language === 'mr'
        ? `आशा स्वयंसेविका ${patient.assignedAsha} यांना आपल्या घरी भेटीची सूचना पाठवण्यात आली आहे.`
        : `Home visit notification sent to ASHA worker ${patient.assignedAsha}.`,
      "info"
    );
  };

  // Submit book appointment
  const handleBookAppointment = (e) => {
    e.preventDefault();
    setShowBookAppointmentModal(false);
    notify(
      language === 'mr' ? "टेलिपरामर्श वेळ निश्चित" : language === 'hi' ? "अपॉइंटमेंट सुरक्षित" : "Consultation Booked",
      language === 'mr'
        ? `डॉ. अनन्या यांच्यासोबत उद्या १०:३० वाजता व्हिडिओ तपासणी निश्चित केली आहे.`
        : `Tele-consultation confirmed with Dr. Ananya Kulkarni for tomorrow 10:30 AM.`
    );
  };

  // Determine active medicines from patient timeline or defaults
  const currentPrescriptionEvent = patient.timeline?.find(evt => evt.prescription && evt.prescription.length > 0);
  const medications = currentPrescriptionEvent?.prescription || [
    { drug: "Tab. Metformin 1000mg", dosage: "1-0-1 After meals", days: 30, meal: "afterFood", timeOfDay: "morning" },
    { drug: "Tab. Telmisartan 40mg", dosage: "1-0-0 Morning before food", days: 30, meal: "beforeFood", timeOfDay: "morning" },
    { drug: "Tab. Methylcobalamin 1500mcg", dosage: "0-1-0 After lunch", days: 30, meal: "afterFood", timeOfDay: "afternoon" },
    { drug: "Tab. Atorvastatin 10mg", dosage: "0-0-1 Night after dinner", days: 30, meal: "afterFood", timeOfDay: "night" }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Top Bar: Citizen Welcome & Patient Switcher (For Demo/Evaluator) */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-elevated flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <HeartPulse className="w-80 h-80 -mr-16 -mb-20 text-white" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/10 ring-4 ring-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg overflow-hidden">
              <img
                src={patient.gender === 'Female' ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                alt={patient.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-teal-600/70 border border-teal-400/40 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                <span>{t('portalSubtitle')}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 font-mono border border-emerald-400/30">
                ABHA: {num(patient.abhaId)}
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight mt-1.5 flex items-center gap-2.5">
              <span>{t('patientWelcome')}, {getPatientDisplayName(patient)}</span>
            </h2>

            <p className="text-teal-100 text-xs sm:text-sm mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>📍 {getPatientDisplayVillage(patient)}</span>
              <span>•</span>
              <span>🏥 {locName(patient.primaryPhc)}</span>
              <span>•</span>
              <span>🩸 {t('bloodGroup')}: <strong className="font-bold text-white">{num(patient.bloodGroup)}</strong></span>
              <span>•</span>
              <span>🎂 {num(patient.age)} {t('years')}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: Voice Assistance, Digital ABHA Card, 108 SOS */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Read Aloud Voice Button */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
              isSpeaking
                ? 'bg-amber-400 text-slate-900 animate-pulse ring-2 ring-amber-300'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            }`}
            title="Read health status in your language"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-teal-200" />}
            <span>{isSpeaking ? t('stopReading') : t('readToMe')}</span>
          </button>

          {/* View Digital ABHA Card */}
          <button
            onClick={() => setShowAbhaModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs shadow-md transition-all"
          >
            <QrCode className="w-4 h-4 text-teal-700" />
            <span>{language === 'mr' ? 'माझे आभा कार्ड' : language === 'hi' ? 'मेरा आभा कार्ड' : 'Digital ABHA Card'}</span>
          </button>

          {/* Quick SOS Trigger */}
          <button
            onClick={handleConfirmEmergencySos}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg transition-all animate-bounce"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{language === 'mr' ? '१०८ आपत्कालीन SOS' : language === 'hi' ? '१०८ आपातकाल SOS' : 'Emergency 108 SOS'}</span>
          </button>
        </div>
      </div>

      {/* Patient Switcher Toolbar for Testing / Prototype Demonstration */}
      <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {t('switchPatientProfile')}:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {patients.map(p => {
            const isSelected = p.id === patient.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{getPatientDisplayName(p)}</span>
                <span className="ml-1.5 text-[10px] opacity-75 font-mono">
                  ({num(p.age)} {language === 'mr' ? 'वर्षे' : language === 'hi' ? 'वर्ष' : 'y'})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Simplified Health Status Banner (Very Easy to Understand UX) */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
        healthAssessment.badgeVariant === 'critical'
          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
          : healthAssessment.badgeVariant === 'strained'
          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
          : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`p-3 rounded-xl shrink-0 ${
            healthAssessment.badgeVariant === 'critical'
              ? 'bg-rose-600 text-white'
              : healthAssessment.badgeVariant === 'strained'
              ? 'bg-amber-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}>
            <Activity className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {t('overallHealthStatus')}
              </span>
              <Badge
                status={healthAssessment.badgeVariant}
                label={healthAssessment.status}
                size="sm"
                pulse={healthAssessment.badgeVariant === 'critical'}
              />
            </div>

            <p className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-1">
              {healthAssessment.message}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
              <span>💡</span>
              <span><strong>{t('healthEducationTips')}:</strong> {healthAssessment.tip}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={() => setShowLogVitalsModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-teal-800 dark:text-teal-300 border border-slate-200 dark:border-slate-700 hover:bg-teal-50 font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-teal-600" />
            <span>{t('logVitals')}</span>
          </button>

          <button
            onClick={() => setShowPrescriptionModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('viewPrescription')}</span>
          </button>
        </div>
      </div>

      {/* 3. Four Core Vital Signs Cards (Large, Accessible, Intuitive UX) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <span>{t('vitalSigns')}</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {t('lastChecked')}: {patient.latestVitals?.recordedAt || "Today 09:45 AM"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Blood Pressure Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{t('bloodPressure')}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                patient.latestVitals.bpStatus === 'critical' || patient.latestVitals.bpStatus === 'high'
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
              }`}>
                {patient.latestVitals.bpStatus === 'high' ? t('statusElevated') : t('statusNormal')}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                {num(patient.latestVitals.bp)}
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>{language === 'mr' ? `प्रमाण: ${num("120/80")} mmHg` : language === 'hi' ? `मानक: ${num("120/80")} mmHg` : 'Standard: 120/80 mmHg'}</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">Arm Cuff</span>
            </div>
          </div>

          {/* Blood Sugar Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{t('bloodSugar')}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                patient.latestVitals.bloodSugarStatus === 'high'
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
              }`}>
                {patient.latestVitals.bloodSugarStatus === 'high' ? t('statusElevated') : t('statusNormal')}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                {num(patient.latestVitals.bloodSugar)}
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>{language === 'mr' ? `लक्ष्य: ${num("70-140")} mg/dL` : language === 'hi' ? `लक्ष्य: ${num("70-140")} mg/dL` : 'Target: 70-140 mg/dL'}</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">Glucometer</span>
            </div>
          </div>

          {/* Pulse Rate Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{t('pulseRate')}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {t('statusNormal')}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                {num(patient.latestVitals.pulse)}
              </span>
              <Activity className="w-5 h-5 text-rose-500 animate-pulse inline-block" />
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>{language === 'mr' ? `सामान्य: ${num("60-100")} bpm` : language === 'hi' ? `सामान्य: ${num("60-100")} bpm` : 'Normal: 60-100 bpm'}</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">Regular</span>
            </div>
          </div>

          {/* Oxygen Level (SpO2) Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold">{t('oxygenLevel')}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {num(patient.latestVitals.spo2)} {t('statusSafe')}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100">
                {num(patient.latestVitals.spo2)}
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>{language === 'mr' ? `सुरक्षित मर्यादा: > ${num("95")}%` : language === 'hi' ? `सुरक्षित सीमा: > ${num("95")}%` : 'Safe Threshold: > 95%'}</span>
              <span className="font-semibold text-teal-700 dark:text-teal-400">Pulse Oximeter</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Grid: Medication Routine (Left) & Tele-OPD + ASHA Network (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Medication Routine (7 Columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                  <span>{t('medicationSchedule')}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'mr' ? 'रोजच्या गोळ्या वेळेवर घ्या व येथे घेतल्यानंतर खूण करा' : 'Tap checkbox when you take your daily tablet dose'}
                </p>
              </div>

              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>{t('viewPrescription')}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Medications */}
            <div className="mt-4 space-y-3">
              {medications.map((med, idx) => {
                const pillKey = `${patient.id}-${idx}`;
                const isTaken = !!takenPills[pillKey];

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isTaken
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-50/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2.5 rounded-xl shrink-0 ${isTaken ? 'bg-emerald-600 text-white' : 'bg-teal-700 text-white'}`}>
                        <Pill className="w-5 h-5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-heading font-bold text-sm truncate ${isTaken ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}`}>
                            {med.drug}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                            {med.dosage}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>⏱️ {med.dosage.includes('1-0-1') ? t('morningDose') + ' & ' + t('nightDose') : med.dosage.includes('1-0-0') ? t('morningDose') : t('nightDose')}</span>
                          <span>•</span>
                          <span>🍽️ {med.dosage.includes('After') ? t('afterFood') : t('beforeFood')}</span>
                          <span>•</span>
                          <span className="text-amber-700 dark:text-amber-400 font-medium">📦 18 {t('stockDaysLeft')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Taken Toggle */}
                    <button
                      onClick={() => togglePillTaken(pillKey)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all shadow-xs ${
                        isTaken
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-teal-600'
                      }`}
                    >
                      {isTaken ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{t('taken')}</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-slate-400" />
                          <span>{t('markAsTaken')}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-teal-50/70 dark:bg-teal-950/40 rounded-xl border border-teal-200/80 dark:border-teal-800/60 flex items-center justify-between text-xs text-teal-900 dark:text-teal-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
              <span>
                {language === 'mr'
                  ? 'औषध साठा संपण्याआधी ३ दिवस आपल्या आशा ताईंना किंवा प्राथमिक आरोग्य केंद्राला कळवा.'
                  : 'Free refills are supplied at PHC Shirwal under NHM Essential Drug Programme.'}
              </span>
            </div>
            <button
              onClick={() => navigate('/inventory')}
              className="font-bold underline shrink-0 hover:text-teal-950"
            >
              Check Stock →
            </button>
          </div>
        </div>

        {/* Right: Live Tele-OPD + Assigned ASHA Worker & PHC Card (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Doctor Consultation & Tele-OPD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {t('upcomingConsultations')}
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                eSanjeevani Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                alt="Dr. Ananya"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-teal-600/30 shrink-0"
              />
              <div>
                <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {locName("Dr. Ananya Kulkarni")} (MBBS)
                </h5>
                <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium">
                  {t('doctorOnDuty')} • {locName(patient.primaryPhc)}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {language === 'mr' ? `पुढील वेळ: आज सकाळी ${num("11:30")}` : language === 'hi' ? `अगला स्लॉट: आज सुबह ${num("11:30")}` : 'Next slot: Today 11:30 AM (or Walk-in Tele-Desk)'}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => navigate('/teleconsult')}
                className="flex-1 py-2.5 px-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5 animate-pulse" />
                <span>{language === 'mr' ? 'व्हिडिओ तपासणी जोडा' : language === 'hi' ? 'वीडियो परामर्श शुरू करें' : 'Join Video Call'}</span>
              </button>

              <button
                onClick={() => setShowBookAppointmentModal(true)}
                className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
              >
                {t('bookAppointment')}
              </button>
            </div>
          </div>

          {/* Card 2: My ASHA Grassroots Worker */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {t('myAshaWorker')}
                </h4>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                {language === 'mr' ? 'नियुक्त ग्राम आरोग्य मित्र' : language === 'hi' ? 'नियुक्त स्वास्थ्य मित्र' : 'Ward Assigned'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Sunita Kamble"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/30 shrink-0"
              />
              <div className="min-w-0">
                <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">
                  {locName(patient.assignedAsha)}
                </h5>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate">
                  {language === 'mr' ? 'आशा स्वयंसेविका (शिरवळ विभाग)' : language === 'hi' ? 'आशा कार्यकर्ता (शिरवल क्षेत्र)' : 'ASHA Field Mobilizer (Shirwal)'}
                </p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                  📞 {num("+91 88055 91234")}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href="tel:+918805591234"
                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('callNow')}</span>
              </a>

              <button
                onClick={() => setShowAshaVisitModal(true)}
                className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors"
              >
                {t('requestVisit')}
              </button>
            </div>
          </div>

          {/* Card 3: My Primary Health Centre (PHC) Info */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-700" />
                <span className="font-heading font-bold text-slate-900 dark:text-slate-100">
                  {locName(patient.primaryPhc)}
                </span>
              </div>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded">
                {num("3.2")} {language === 'mr' ? 'किमी अंतरावर' : language === 'hi' ? 'किमी दूर' : 'km away'}
              </span>
            </div>

            <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span>{t('openHours')}</span>
                <span className="font-semibold text-emerald-600">{language === 'mr' ? 'आज सुरू आहे' : language === 'hi' ? 'आज खुला है' : 'Open Today'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'mr' ? 'खाटा उपलब्धता' : language === 'hi' ? 'बिस्तर उपलब्धता' : 'Inpatient Beds Available'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{num(5)} / {num(16)} {language === 'mr' ? 'खाटा शिल्लक' : language === 'hi' ? 'बिस्तर शेष' : 'Beds Free'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'mr' ? '१०८ रुग्णवाहिका' : language === 'hi' ? '108 एम्बुलेंस' : '108 Ambulance Station'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{num(1)} {language === 'mr' ? 'सज्ज' : language === 'hi' ? 'उपलब्ध' : 'Vehicle Standby'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-teal-700 dark:text-teal-400 font-bold">
              <button
                onClick={() => navigate('/command-center')}
                className="hover:underline flex items-center gap-1"
              >
                <span>{language === 'mr' ? 'विभागीय आरोग्य नकाशा पहा' : language === 'hi' ? 'क्षेत्रीय मानचित्र देखें' : 'View Regional Health Map'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <a
                href="tel:104"
                className="bg-teal-50 dark:bg-teal-950 px-2 py-1 rounded text-[11px] hover:bg-teal-100"
              >
                {language === 'mr' ? `हेल्पलाइन: ${num(104)}` : language === 'hi' ? `हेल्पलाइन: ${num(104)}` : 'Helpline: 104'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Diagnostic Lab Reports Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 sm:p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              <span>{t('labReports')}</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified clinical pathology reports synchronized via ABDM Health Information Exchange (HIE-CM)
            </p>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
            Digital Lab Slip
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">HbA1c Glycated Hemoglobin</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                8.8% (Elevated)
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">Date: 25 Aug 2026 • CHC Khandala Central Diagnostic Unit</p>
            <p className="text-slate-700 dark:text-slate-300">Doctor Advice: Target &lt; 7.0%. Adjusted daily Metformin dose.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">Serum Creatinine & Kidney Panel</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                1.1 mg/dL (Normal)
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">Date: 25 Aug 2026 • CHC Khandala Lab Tech Gaikwad</p>
            <p className="text-slate-700 dark:text-slate-300">Renal function optimal. Continue adequate water intake.</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">Diabetic Retinal Fundus Exam</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                Appointment Scheduled
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">Target: District Hospital Satara Eye OPD</p>
            <p className="text-slate-700 dark:text-slate-300">Slot booked for 02 Sep 2026 at 10:00 AM.</p>
          </div>
        </div>
      </div>

      {/* MODAL 1: Digital ABHA Card Modal with QR Code */}
      {showAbhaModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowAbhaModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Card Top Banner */}
            <div className="bg-gradient-to-r from-teal-800 to-emerald-800 p-5 text-white relative">
              <button
                onClick={() => setShowAbhaModal(false)}
                className="absolute top-4 right-4 text-teal-200 hover:text-white p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-teal-200" />
                <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
                  National Health Authority (NHA) • ABHA Card
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl tracking-tight">
                Ayushman Bharat Health Account
              </h3>
              <p className="text-xs text-teal-100 mt-0.5">
                Government of India • Ministry of Health & Family Welfare
              </p>
            </div>

            {/* Card Content Body */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <img
                  src={patient.gender === 'Female' ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                  alt={patient.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-teal-600 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100 truncate">
                    {getPatientDisplayName(patient)}
                  </h4>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    ABHA: <strong>{num(patient.abhaId)}</strong>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'mr' ? (patient.gender === 'Female' ? 'स्त्री' : 'पुरुष') : language === 'hi' ? (patient.gender === 'Female' ? 'महिला' : 'पुरुष') : patient.gender} • {num(patient.age)} {t('years')} • {t('bloodGroup')}: {num(patient.bloodGroup)}
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-lg p-2 flex items-center justify-center">
                  <QrCode className="w-28 h-28 text-slate-800 dark:text-slate-100" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 mt-2">
                  {language === 'mr' ? 'प्राथमिक आरोग्य केंद्र किंवा जिल्हा रुग्णालय सातारा येथे स्कॅन करा' : language === 'hi' ? 'प्राथमिक स्वास्थ्य केंद्र या जिला अस्पताल सतारा में स्कैन करें' : 'Scan at PHC or District Hospital Satara'}
                </span>
              </div>

              <div className="text-xs text-slate-500 space-y-1">
                <div>{t('village')}: {getPatientDisplayVillage(patient)}</div>
                <div>{t('emergencyContact')}: {num(patient.emergencyContact)}</div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('downloadCard')}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(patient.abhaId);
                    notify("ABHA ID Copied", `${patient.abhaId} copied to clipboard`);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                >
                  Copy ID
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Log Today's Vitals Modal */}
      {showLogVitalsModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowLogVitalsModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-700" />
                <span>{t('logVitalsModalTitle')}</span>
              </h3>
              <button onClick={() => setShowLogVitalsModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVitals} className="p-5 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('systolicBp')}
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.sys}
                    onChange={e => setVitalsForm({ ...vitalsForm, sys: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold"
                    placeholder="130"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('diastolicBp')}
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.dia}
                    onChange={e => setVitalsForm({ ...vitalsForm, dia: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold"
                    placeholder="84"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('fastingSugar')}
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.sugar}
                    onChange={e => setVitalsForm({ ...vitalsForm, sugar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold"
                    placeholder="140"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('pulseBpm')}
                  </label>
                  <input
                    type="number"
                    value={vitalsForm.pulse}
                    onChange={e => setVitalsForm({ ...vitalsForm, pulse: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-bold"
                    placeholder="78"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Symptoms or Comments
                </label>
                <textarea
                  value={vitalsForm.notes}
                  onChange={e => setVitalsForm({ ...vitalsForm, notes: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                  placeholder={t('notesPlaceholder')}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogVitalsModal(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm"
                >
                  {t('submitVitals')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Official Doctor e-Prescription (PDF/Print View) */}
      {showPrescriptionModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowPrescriptionModal(false)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header with National Health Mission Seal */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-teal-50/60 dark:bg-teal-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center text-white font-bold text-xs">
                  Rx
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-base text-teal-900 dark:text-teal-100">
                    {t('officialPrescription')}
                  </h4>
                  <p className="text-xs text-teal-700 dark:text-teal-300">
                    Primary Health Centre Shirwal • Block Bhor, District Satara
                  </p>
                </div>
              </div>
              <button onClick={() => setShowPrescriptionModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Patient Details</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                    {getPatientDisplayName(patient)}
                  </div>
                  <div className="text-slate-500 font-mono">ABHA: {patient.abhaId}</div>
                  <div className="text-slate-500">{patient.age} yrs • {patient.gender} • {patient.bloodGroup}</div>
                </div>

                <div>
                  <div className="text-slate-400 text-[10px] uppercase">Prescribing Physician</div>
                  <div className="font-bold text-teal-800 dark:text-teal-300 text-sm mt-0.5">
                    Dr. Ananya Kulkarni
                  </div>
                  <div className="text-slate-500">Medical Officer (MBBS) - Reg: MMC-2021-0491</div>
                  <div className="text-slate-500">Facility: PHC Shirwal Tele-Desk</div>
                </div>
              </div>

              {/* Medication Table */}
              <div>
                <div className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-2">
                  Prescribed Pharmaceutical Regimen
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  {medications.map((m, i) => (
                    <div key={i} className="p-3 bg-white dark:bg-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{m.drug}</div>
                        <div className="text-slate-500 text-[11px]">{m.dosage}</div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-teal-700 dark:text-teal-400">Qty: {m.days * 2} Tabs</span>
                        <div className="text-[10px] text-slate-400">Duration: {m.days} days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-bold">Clinical Instructions & Diet:</div>
                <div>• Continue daily morning fasting sugar monitoring with ASHA worker.</div>
                <div>• In case of dizziness, take light lemon water and contact PHC Shirwal.</div>
              </div>

              {/* Digital Sign Stamp */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Digitally Countersigned via ABDM e-Sign</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print e-Prescription</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: 108 Emergency SOS Active Modal */}
      {showSosModal && (
        <div
          className="fixed inset-0 bg-slate-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowSosModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border-2 border-rose-500 overflow-hidden animate-in zoom-in-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-rose-700 to-red-800 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white animate-bounce">
                  <Ambulance className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-lg">
                    {t('ambulanceDispatchedTitle')}
                  </h4>
                  <p className="text-xs text-rose-100">
                    National Emergency Medical Services (108 ALS)
                  </p>
                </div>
              </div>
              <button onClick={() => setShowSosModal(false)} className="text-rose-200 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-rose-700">{t('ambulanceEta')}</div>
                  <div className="font-heading font-extrabold text-2xl text-rose-900 dark:text-rose-200">
                    {num(14)} {language === 'mr' ? 'मिनिटे' : language === 'hi' ? 'मिनट' : 'Minutes'}
                  </div>
                  <div className="text-slate-500 mt-0.5">Route: {locVillage("Shirwal")} → {getPatientDisplayVillage(patient)}</div>
                </div>
                <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping inline-block" />
              </div>

              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t('ambulanceVehicle')}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{num("MH-12-EM-1081")} ({language === 'mr' ? 'अत्याधुनिक ALS' : language === 'hi' ? 'उन्नत ALS' : 'ALS Active'})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{t('paramedicName')}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{language === 'mr' ? 'एस. देशपांडे' : language === 'hi' ? 'एस. देशपांडे' : 'S. Deshpande'} ({num("+91 99221 44550")})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'mr' ? 'संदर्भ रुग्णालय' : language === 'hi' ? 'गंतव्य अस्पताल' : 'Destination Hospital'}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{locName("District Hospital Satara")} ICCU</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[11px] text-slate-600 dark:text-slate-300">
                {language === 'mr'
                  ? `वैद्यकीय अधिकारी ${locName("Dr. Ananya Kulkarni")} आणि आशा स्वयंसेविका ${locName(patient.assignedAsha)} यांना आपत्कालीन सूचना पाठवण्यात आली आहे. ऑक्सिजन व ईसीजी थेट लिंक सक्रिय आहे.`
                  : language === 'hi'
                  ? `चिकित्सा अधिकारी ${locName("Dr. Ananya Kulkarni")} और आशा कार्यकर्ता ${locName(patient.assignedAsha)} को आपातकालीन सूचना भेजी गई है। ऑक्सीजन और ईसीजी लाइव लिंक सक्रिय है।`
                  : `Alert dispatched to PHC Medical Officer ${locName("Dr. Ananya Kulkarni")} and ASHA Worker ${locName(patient.assignedAsha)}. Telemetry oxygen & ECG stream active.`}
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href="tel:108"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'mr' ? '१०८ नियंत्रण कक्षास कॉल करा' : language === 'hi' ? '108 नियंत्रण कक्ष को कॉल करें' : 'Call 108 Dispatcher'}</span>
                </a>

                <button
                  onClick={() => setShowSosModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 dark:text-slate-300 font-bold text-xs"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: Request ASHA Doorstep Visit Modal */}
      {showAshaVisitModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowAshaVisitModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('requestVisit')}</span>
              </h4>
              <button onClick={() => setShowAshaVisitModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestAshaVisit} className="p-5 space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300">
                Your designated ASHA worker is <strong>{patient.assignedAsha}</strong>. Select the primary reason for requesting a doorstep home visit:
              </p>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason for Visit</label>
                <select
                  value={ashaVisitReason}
                  onChange={e => setAshaVisitReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs"
                >
                  <option value="Home BP & Sugar check-up">Home BP & Blood Sugar check-up</option>
                  <option value="Medicine refill delivery">Monthly Medication Refill Delivery</option>
                  <option value="Maternal ANC check-up">Maternal ANC Check-in & IFA Tablets</option>
                  <option value="Child nutrition check">Child Growth Monitoring & MUAC tape</option>
                  <option value="Fever or illness follow-up">Seasonal Fever or Weakness check</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAshaVisitModal(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: Book Teleconsultation Modal */}
      {showBookAppointmentModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowBookAppointmentModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>{t('bookAppointment')}</span>
              </h4>
              <button onClick={() => setShowBookAppointmentModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookAppointment} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor / Medical Officer</label>
                <input
                  type="text"
                  readOnly
                  value={appointmentForm.doctor}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Slot</label>
                <select
                  value={appointmentForm.date}
                  onChange={e => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                >
                  <option value="Today, 03:00 PM">Today, 03:00 PM (Afternoon OPD)</option>
                  <option value="Tomorrow, 10:30 AM">Tomorrow, 10:30 AM (Morning OPD)</option>
                  <option value="Thursday, 11:00 AM">Thursday, 11:00 AM</option>
                  <option value="Friday, 02:30 PM">Friday, 02:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Reason / Symptoms</label>
                <input
                  type="text"
                  value={appointmentForm.reason}
                  onChange={e => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  placeholder="e.g. Sugar review, joint pain..."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookAppointmentModal(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-xs"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
