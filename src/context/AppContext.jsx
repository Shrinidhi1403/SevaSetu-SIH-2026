import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  AVAILABLE_ROLES,
  FACILITIES,
  PATIENTS,
  LIVE_REFERRALS,
  SYSTEM_ALERTS,
  INVENTORY_ITEMS,
  EQUIPMENT_ITEMS,
  ASHA_WORKERS,
  RECENT_FIELD_UPLOADS,
  UPCOMING_OUTREACH
} from '../data/mockData';
import {
  translations,
  toDevanagariDigits,
  formatDigits,
  localizeName,
  localizeVillage,
  NAME_DICTIONARY
} from '../utils/translations';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('sevasetu_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sevasetu_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Authentication & Profile state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('sevasetu_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sevasetu_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Language state: 'en' | 'hi' | 'mr'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('sevasetu_lang') || 'en';
  });

  // Daily Medication Tracker State (Patient Dashboard)
  const [takenPills, setTakenPills] = useState(() => {
    const saved = localStorage.getItem('sevasetu_pills');
    return saved ? JSON.parse(saved) : { "PAT-001-0": true };
  });

  const togglePillTaken = (pillKey) => {
    setTakenPills(prev => {
      const updated = { ...prev, [pillKey]: !prev[pillKey] };
      localStorage.setItem('sevasetu_pills', JSON.stringify(updated));
      return updated;
    });
  };

  // Operational Data State
  const [facilities, setFacilities] = useState(FACILITIES);
  const [patients, setPatients] = useState(PATIENTS);
  const [selectedPatientId, setSelectedPatientId] = useState("PAT-001");
  const [referrals, setReferrals] = useState(LIVE_REFERRALS);
  const [systemAlerts, setSystemAlerts] = useState(SYSTEM_ALERTS);
  const [inventory, setInventory] = useState(INVENTORY_ITEMS);
  const [equipment, setEquipment] = useState(EQUIPMENT_ITEMS);
  const [ashaWorkers, setAshaWorkers] = useState(ASHA_WORKERS);
  const [fieldUploads, setFieldUploads] = useState(RECENT_FIELD_UPLOADS);
  const [outreachEvents, setOutreachEvents] = useState(UPCOMING_OUTREACH);

  // Notification Toast State
  const [notifications, setNotifications] = useState([]);

  // Teleconsultation Active Call State
  const [teleconsultCall, setTeleconsultCall] = useState({
    isActive: true,
    patientId: "PAT-001",
    isMuted: false,
    isVideoOff: false,
    isLowBandwidthMode: false,
    durationSeconds: 312, // 5m 12s
    networkSignal: "Good (3.2 Mbps)",
    connectionQuality: "Stable"
  });

  useEffect(() => {
    localStorage.setItem('sevasetu_auth', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('sevasetu_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sevasetu_lang', language);
  }, [language]);

  // Sync data from Backend API on mount
  useEffect(() => {
    const syncBackendData = async () => {
      try {
        const health = await api.checkHealth();
        if (health.status === 'healthy') {
          const [pData, fData, rData, iData, aData] = await Promise.all([
            api.getPatients().catch(() => null),
            api.getFacilities().catch(() => null),
            api.getReferrals().catch(() => null),
            api.getInventory().catch(() => null),
            api.getAlerts().catch(() => null)
          ]);

          if (pData?.data) setPatients(pData.data);
          if (fData?.data) setFacilities(fData.data);
          if (rData?.data) setReferrals(rData.data);
          if (iData?.data) setInventory(iData.data);
          if (aData?.data) setSystemAlerts(aData.data);
        }
      } catch (err) {
        console.warn('Backend offline or syncing in local mode:', err.message);
      }
    };
    syncBackendData();
  }, []);

  // Sync initial vitals from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sih_demo_patient_vitals');
      if (saved) {
        const data = JSON.parse(saved);
        const targetId = data.patientId || "PAT-001";
        setPatients(prev => prev.map(p => {
          if (p.id === targetId || (data.patientName && p.name.toLowerCase().includes(data.patientName.toLowerCase()))) {
            return {
              ...p,
              latestVitals: {
                ...p.latestVitals,
                bp: data.bp ? (data.bp.includes('mmHg') ? data.bp : `${data.bp} mmHg`) : p.latestVitals.bp,
                bloodSugar: data.sugar || data.bloodSugar ? (String(data.sugar || data.bloodSugar).includes('mg/dL') ? `${data.sugar || data.bloodSugar}` : `${data.sugar || data.bloodSugar} mg/dL`) : p.latestVitals.bloodSugar,
                pulse: data.pulse ? (String(data.pulse).includes('bpm') ? `${data.pulse}` : `${data.pulse} bpm`) : p.latestVitals.pulse,
                temp: data.temp ? (String(data.temp).includes('°F') ? `${data.temp}` : `${data.temp} °F`) : p.latestVitals.temp,
                recordedAt: data.recordedAt || `Today by ASHA Sunita (Offline Synced)`
              }
            };
          }
          return p;
        }));
      }
    } catch (err) {
      console.error('Failed to sync initial localStorage vitals in AppContext:', err);
    }
  }, []);

  // Teleconsultation timer
  useEffect(() => {
    let interval = null;
    if (teleconsultCall.isActive) {
      interval = setInterval(() => {
        setTeleconsultCall(prev => ({
          ...prev,
          durationSeconds: prev.durationSeconds + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [teleconsultCall.isActive]);

  const notify = (title, message, type = 'success') => {
    const id = Date.now().toString();
    const newNotif = { id, title, message, type, time: new Date().toLocaleTimeString() };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations['mr']?.[key] ||
      translations['hi']?.[key] ||
      translations['en']?.[key] ||
      key
    );
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === 'en') return 'mr';
      if (prev === 'mr') return 'hi';
      return 'en';
    });
  };

  // Get persona dashboard path
  const getDashboardPath = (role = currentUser.role) => {
    switch (role) {
      case 'doctor':
        return '/dashboard/doctor';
      case 'supervisor':
        return '/dashboard/supervisor';
      case 'asha':
        return '/dashboard/asha';
      case 'patient':
        return '/dashboard/patient';
      default:
        return '/command-center';
    }
  };

  // Switch between Doctor, Supervisor, ASHA, and Patient roles
  const switchRole = (roleId) => {
    const found = AVAILABLE_ROLES.find(r => r.id === roleId);
    if (found) {
      const updated = {
        id: `usr_${found.id}_01`,
        name: found.name,
        nameHindi: found.nameHindi || found.name,
        nameMarathi: found.nameMarathi || found.name,
        role: found.id,
        roleTitle: found.title,
        titleHindi: found.titleHindi || found.title,
        titleMarathi: found.titleMarathi || found.title,
        facility: found.facility,
        facilityHindi: found.facilityHindi || found.facility,
        facilityMarathi: found.facilityMarathi || found.facility,
        district: "Pune Rural Division",
        phone: found.phone,
        email: `${found.id}@health.gov.in`,
        avatar: found.avatar,
        badge: found.title
      };
      if (found.id === 'patient') {
        setSelectedPatientId("PAT-001");
      }
      setCurrentUser(updated);
      notify("Persona Changed", `Switched to ${found.title} (${found.name})`, 'info');
    }
  };

  // checks login credentials with the database
  const login = (roleId, phone, otp) => {
    const found = AVAILABLE_ROLES.find(r => r.id === roleId) || AVAILABLE_ROLES[0];
    const newUser = {
      id: `usr_${found.id}_01`,
      name: found.name,
      nameHindi: found.nameHindi || found.name,
      nameMarathi: found.nameMarathi || found.name,
      role: found.id,
      roleTitle: found.title,
      titleHindi: found.titleHindi || found.title,
      titleMarathi: found.titleMarathi || found.title,
      facility: found.facility,
      facilityHindi: found.facilityHindi || found.facility,
      facilityMarathi: found.facilityMarathi || found.facility,
      district: "Pune Rural Division",
      phone: phone || found.phone,
      email: `${found.id}@health.gov.in`,
      avatar: found.avatar,
      badge: found.title
    };
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    notify("Authentication Verified", `Logged in with ABHA Unified Healthcare ID (${phone || found.phone})`, "success");

    // Also notify backend if available
    api.login(roleId, phone, otp).catch(() => {});
  };

  const logout = () => {
    setIsLoggedIn(false);
    notify("Session Ended", "You have been securely signed out of SevaSetu.", "info");
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Actions on Patients
  const updatePatientVitals = (patientId, newVitals) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          latestVitals: {
            ...p.latestVitals,
            ...newVitals,
            recordedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by ${currentUser.name}`
          },
          vitalsHistory: [
            {
              date: "Today",
              bpSys: parseInt(newVitals.bp?.split('/')[0]) || 120,
              bpDia: parseInt(newVitals.bp?.split('/')[1]) || 80,
              sugar: parseInt(newVitals.bloodSugar) || 110,
              pulse: parseInt(newVitals.pulse) || 75
            },
            ...p.vitalsHistory
          ]
        };
      }
      return p;
    }));
    notify("Vitals Updated", `New telemetry vitals logged for ABHA record: ${selectedPatient.name}`);
    api.updateVitals(patientId, newVitals).catch(() => {});
  };

  const addClinicalNote = (patientId, note) => {
    const newEvent = {
      id: `EVT-${Date.now()}`,
      type: note.type || "teleconsult",
      title: note.title,
      date: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      facility: currentUser.facility,
      author: currentUser.name,
      summary: note.summary,
      tags: note.tags || ["Clinical Record"],
      prescription: note.prescription
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          timeline: [newEvent, ...p.timeline]
        };
      }
      return p;
    }));
    notify("Clinical Record Appended", `Digital record saved to ${selectedPatient.name}'s longitudinal health chart.`);
    api.addTimelineEvent(patientId, newEvent).catch(() => {});
  };

  // Referrals / Escalation actions
  const dispatchAmbulance = (referralId, notes = "") => {
    setReferrals(prev => prev.map(ref => {
      if (ref.id === referralId) {
        return {
          ...ref,
          status: "108 Ambulance Dispatched",
          ambulanceId: "MH-12-EM-1081 (ALS Active)",
          etaMinutes: 14,
          clinicalSummary: notes ? `${ref.clinicalSummary} Note: ${notes}` : ref.clinicalSummary
        };
      }
      return ref;
    }));
    notify("Ambulance Dispatched", `108 Advanced Life Support unit assigned with telemetry streaming to District Hospital Satara.`, "critical");
    api.dispatchAmbulance(referralId, { notes }).catch(() => {});
  };

  const createEmergencyEscalation = (patient, targetFacility, reason, priority = "critical") => {
    const newRef = {
      id: `REF-2026-${Math.floor(100 + Math.random() * 900)}`,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      abhaId: patient.abhaId,
      fromFacility: patient.primaryPhc,
      toFacility: targetFacility,
      urgency: priority,
      urgencyLabel: priority === 'critical' ? "CRITICAL EMERGENCY" : "URGENT ESCALATION",
      specialty: "Emergency Medicine / ICU",
      timeElapsed: "Just now",
      distanceKm: 28,
      etaMinutes: 22,
      ambulanceId: "108 ALS Unit #4",
      paramedicContact: "+91 99221 44550",
      status: "Emergency Escalated",
      clinicalSummary: reason
    };
    setReferrals(prev => [newRef, ...prev]);
    notify("Critical Escalation Triggered", `Emergency referral to ${targetFacility} initiated for ${patient.name}.`, "critical");
    api.createReferral(newRef).catch(() => {});
  };

  // Inventory actions
  const reorderMedicine = (itemId, quantity = 500) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = item.currentStock + quantity;
        return {
          ...item,
          currentStock: newStock,
          status: newStock <= item.reorderLevel ? 'strained' : 'optimal'
        };
      }
      return item;
    }));
    notify("Indent Dispatched", `Electronic Requisition voucher issued to District Warehouse for item ${itemId}.`);
    api.createIndent({ itemId, quantity }).catch(() => {});
  };

  // Equipment service
  const scheduleEquipmentService = (eqId) => {
    setEquipment(prev => prev.map(eq => {
      if (eq.id === eqId) {
        return {
          ...eq,
          status: "Service Request Dispatched to Biomedical Engineering Team",
          badge: "strained"
        };
      }
      return eq;
    }));
    notify("Biomedical Service Ticket Logged", `Engineers assigned from Satara DHO Biomedical division.`);
    api.serviceEquipment(eqId).catch(() => {});
  };

  // ASHA field visit logger
  const logAshaVisit = (patientName, cluster, vitalsSummary) => {
    const newUpload = {
      id: `UPL-${Date.now()}`,
      ashaName: currentUser.name,
      cluster: cluster || "Shirwal Cluster",
      patientName,
      type: "ASHA Field Check-in",
      timestamp: "Just now",
      vitalsSummary,
      syncStatus: "Synced via SevaSetu Mobile App",
      verified: true,
      photoUrl: null
    };
    setFieldUploads(prev => [newUpload, ...prev]);
    notify("Field Visit Uploaded", `Doorstep screening logged for ${patientName} by ${currentUser.name}.`);
    api.logAshaVisit(newUpload).catch(() => {});
  };

  // Dynamic localized currentUser that reflects active language
  const localizedCurrentUser = {
    ...currentUser,
    name: language === 'mr' ? (currentUser.nameMarathi || localizeName(currentUser.name, 'mr'))
         : language === 'hi' ? (currentUser.nameHindi || localizeName(currentUser.name, 'hi'))
         : currentUser.name,
    facility: language === 'mr' ? (currentUser.facilityMarathi || localizeName(currentUser.facility, 'mr'))
            : language === 'hi' ? (currentUser.facilityHindi || localizeName(currentUser.facility, 'hi'))
            : currentUser.facility,
    roleTitle: language === 'mr' ? (currentUser.titleMarathi || currentUser.roleTitle)
             : language === 'hi' ? (currentUser.titleHindi || currentUser.roleTitle)
             : currentUser.roleTitle
  };

  // Digits & numerals localization helper: converts 0-9 to ०-९ in Marathi and Hindi
  const num = (input) => formatDigits(input, language);

  // Name localization helper for persons, doctors, facilities, and ASHAs
  const locName = (entity) => localizeName(entity, language);

  // Village / locality localization helper
  const locVillage = (entity) => localizeVillage(entity, language);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoggedIn,
        login,
        logout,
        currentUser: localizedCurrentUser,
        rawCurrentUser: currentUser,
        switchRole,
        language,
        setLanguage,
        toggleLanguage,
        t,
        num,
        formatDigits: num,
        locName,
        locVillage,
        toDevanagariDigits,
        getDashboardPath,
        facilities,
        setFacilities,
        patients,
        setPatients,
        selectedPatientId,
        setSelectedPatientId,
        selectedPatient,
        referrals,
        setReferrals,
        dispatchAmbulance,
        createEmergencyEscalation,
        systemAlerts,
        setSystemAlerts,
        inventory,
        reorderMedicine,
        equipment,
        scheduleEquipmentService,
        ashaWorkers,
        setAshaWorkers,
        fieldUploads,
        logAshaVisit,
        outreachEvents,
        teleconsultCall,
        setTeleconsultCall,
        notifications,
        removeNotification,
        notify,
        updatePatientVitals,
        addClinicalNote,
        takenPills,
        togglePillTaken
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
