// Mock Data Layer for SevaSetu Healthcare Platform
// Designed for seamless migration to REST/GraphQL APIs

export const INITIAL_USER = {
  id: "usr_doc_01",
  name: "Dr. Ananya Kulkarni",
  nameHindi: "डॉ. अनन्या कुलकर्णी",
  nameMarathi: "डॉ. अनन्या कुलकर्णी",
  role: "doctor", // 'doctor' | 'supervisor' | 'asha'
  roleTitle: "Medical Officer (MBBS)",
  roleTitleHindi: "चिकित्सा अधिकारी (MBBS)",
  roleTitleMarathi: "वैद्यकीय अधिकारी (MBBS)",
  facility: "PHC Shirwal, Block Bhor",
  facilityHindi: "प्राथमिक स्वास्थ्य केंद्र शिरवल, भोर",
  facilityMarathi: "प्राथमिक आरोग्य केंद्र शिरवळ, भोर",
  district: "Pune Rural Division",
  districtHindi: "पुणे ग्रामीण संभाग",
  districtMarathi: "पुणे ग्रामीण विभाग",
  phone: "+91 98230 45120",
  email: "ananya.kulkarni@health.gov.in",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
  badge: "Primary Health Center In-charge"
};

export const AVAILABLE_ROLES = [
  {
    id: "doctor",
    title: "PHC Medical Officer",
    titleHindi: "प्राथमिक स्वास्थ्य केंद्र चिकित्सा अधिकारी",
    titleMarathi: "प्राथमिक आरोग्य केंद्र वैद्यकीय अधिकारी",
    name: "Dr. Ananya Kulkarni",
    nameHindi: "डॉ. अनन्या कुलकर्णी",
    nameMarathi: "डॉ. अनन्या कुलकर्णी",
    facility: "PHC Shirwal",
    facilityHindi: "प्राथमिक स्वास्थ्य केंद्र शिरवल",
    facilityMarathi: "प्राथमिक आरोग्य केंद्र शिरवळ",
    phone: "+91 98230 45120",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
    description: "Review consultations, diagnose patients, issue e-prescriptions, escalate critical cases"
  },
  {
    id: "supervisor",
    title: "Regional Health Supervisor",
    titleHindi: "क्षेत्रीय स्वास्थ्य पर्यवेक्षक / DHO",
    titleMarathi: "विभागीय आरोग्य पर्यवेक्षक / DHO",
    name: "Dr. Rajeshwar Sharma",
    nameHindi: "डॉ. राजेश्वर शर्मा",
    nameMarathi: "डॉ. राजेश्वर शर्मा",
    facility: "District Health Office, Satara",
    facilityHindi: "जिला स्वास्थ्य कार्यालय, सतारा",
    facilityMarathi: "जिल्हा आरोग्य कार्यालय, सातारा",
    phone: "+91 94220 88712",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
    description: "Monitor cluster metrics, track emergency referrals, reallocate medicine stocks, audit ASHA visits"
  },
  {
    id: "asha",
    title: "ASHA Field Worker",
    titleHindi: "आशा कार्यकर्ता (ग्राम स्वास्थ्य मित्र)",
    titleMarathi: "आशा स्वयंसेविका (ग्राम आरोग्य मित्र)",
    name: "Sunita Bai Kamble",
    nameHindi: "सुनीता बाई कांबले",
    nameMarathi: "सुनीता बाई कांबळे",
    facility: "Shirwal West Cluster (Sub-Center 2)",
    facilityHindi: "शिरवल पश्चिम क्लस्टर (उप-केंद्र २)",
    facilityMarathi: "शिरवळ पश्चिम विभाग (उप-केंद्र २)",
    phone: "+91 88055 91234",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    description: "Door-to-door screenings, maternal check-ins, record field vitals, schedule VHSND camps"
  },
  {
    id: "patient",
    title: "Patient & Citizen Portal",
    titleHindi: "रुग्ण एवं नागरिक पोर्टल (मरीज़)",
    titleMarathi: "रुग्ण व नागरिक आरोग्य पोर्टल",
    name: "Ramesh Shantaram Patil",
    nameHindi: "रमेश शांताराम पाटिल",
    nameMarathi: "रमेश शांताराम पाटील",
    facility: "Shirwal Gaon, Ward 3",
    facilityHindi: "शिरवल गाँव, वार्ड ३",
    facilityMarathi: "शिरवळ गाव, वॉर्ड ३",
    phone: "+91 97631 88402",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    description: "ABHA digital health card, view daily medicines schedule, check vitals, attend teleconsults, dial 108 SOS"
  }
];

export const FACILITIES = [
  {
    id: "FAC-01",
    name: "PHC Shirwal",
    type: "Primary Health Centre",
    block: "Bhor Sub-division",
    status: "optimal", // optimal | strained | critical
    bedsTotal: 16,
    bedsOccupied: 11,
    oxygenCylinders: 14,
    ambulanceAvailable: 1,
    doctorOnDuty: "Dr. Ananya Kulkarni",
    staffCount: 12,
    medicineStockPct: 92,
    avgWaitTimeMin: 18,
    todayOPD: 64,
    powerStatus: "Grid Active",
    networkBandwidth: "4G LTE (Good)",
    coordinates: { x: 38, y: 44 },
    latLng: [18.132, 73.982]
  },
  {
    id: "FAC-02",
    name: "CHC Khandala",
    type: "Community Health Centre",
    block: "Khandala Block",
    status: "strained",
    bedsTotal: 34,
    bedsOccupied: 31,
    oxygenCylinders: 8,
    ambulanceAvailable: 1,
    doctorOnDuty: "Dr. Vikram Deshmukh (Surgeon)",
    staffCount: 24,
    medicineStockPct: 74,
    avgWaitTimeMin: 42,
    todayOPD: 142,
    powerStatus: "Generator Backup",
    networkBandwidth: "3G (Moderate)",
    coordinates: { x: 62, y: 32 },
    latLng: [18.049, 74.026]
  },
  {
    id: "FAC-03",
    name: "Sub-Center Velhe",
    type: "Sub-Health Centre",
    block: "Velhe Hills",
    status: "critical",
    bedsTotal: 4,
    bedsOccupied: 4,
    oxygenCylinders: 1,
    ambulanceAvailable: 0,
    doctorOnDuty: "ANM Sangeeta Jadhav",
    staffCount: 3,
    medicineStockPct: 41,
    avgWaitTimeMin: 58,
    todayOPD: 28,
    powerStatus: "Solar / Low Battery",
    networkBandwidth: "2G Edge (Degraded)",
    coordinates: { x: 22, y: 68 },
    latLng: [18.298, 73.639]
  },
  {
    id: "FAC-04",
    name: "District Hospital Satara",
    type: "District Tertiary Hospital",
    block: "Satara HQ",
    status: "optimal",
    bedsTotal: 250,
    bedsOccupied: 204,
    oxygenCylinders: 95,
    ambulanceAvailable: 4,
    doctorOnDuty: "Dr. P. R. Joshi (Chief Medical Officer)",
    staffCount: 148,
    medicineStockPct: 96,
    avgWaitTimeMin: 24,
    todayOPD: 480,
    powerStatus: "Dual Grid + UPS",
    networkBandwidth: "Broadband Fiber (High)",
    coordinates: { x: 74, y: 78 },
    latLng: [17.680, 73.992]
  },
  {
    id: "FAC-05",
    name: "PHC Bhor",
    type: "Primary Health Centre",
    block: "Bhor Valley",
    status: "strained",
    bedsTotal: 20,
    bedsOccupied: 19,
    oxygenCylinders: 4,
    ambulanceAvailable: 0,
    doctorOnDuty: "Dr. Snehal More (General Med)",
    staffCount: 14,
    medicineStockPct: 62,
    avgWaitTimeMin: 35,
    todayOPD: 76,
    powerStatus: "Grid Active",
    networkBandwidth: "4G (Fair)",
    coordinates: { x: 44, y: 22 },
    latLng: [18.150, 73.840]
  },
  {
    id: "FAC-06",
    name: "Sub-Center Kikvi",
    type: "Sub-Health Centre",
    block: "Shirwal Cluster",
    status: "optimal",
    bedsTotal: 4,
    bedsOccupied: 2,
    oxygenCylinders: 2,
    ambulanceAvailable: 1,
    doctorOnDuty: "ASHA Sunita Kamble & MPW",
    staffCount: 4,
    medicineStockPct: 88,
    avgWaitTimeMin: 12,
    todayOPD: 19,
    powerStatus: "Grid Active",
    networkBandwidth: "4G (Good)",
    coordinates: { x: 48, y: 60 },
    latLng: [18.110, 73.960]
  }
];

export const PATIENTS = [
  {
    id: "PAT-001",
    abhaId: "14-8921-4432-9018",
    name: "Ramesh Shantaram Patil",
    nameHindi: "रमेश शांताराम पाटिल",
    nameMarathi: "रमेश शांताराम पाटील",
    age: 58,
    gender: "Male",
    bloodGroup: "O+",
    village: "Shirwal Gaon, Ward 3",
    villageMarathi: "शिरवळ गाव, वॉर्ड ३",
    villageHindi: "शिरवल गाँव, वार्ड ३",
    primaryPhc: "PHC Shirwal",
    phone: "+91 97631 88402",
    emergencyContact: "Mahesh Patil (Son) - +91 97631 88403",
    riskLevel: "High Priority Follow-up",
    riskColor: "strained",
    conditionTags: ["Type 2 Diabetes", "Essential Hypertension", "Mild Neuropathy"],
    assignedAsha: "Sunita Bai Kamble",
    latestVitals: {
      bp: "158/96 mmHg",
      bpStatus: "high",
      spo2: "97%",
      spo2Status: "normal",
      pulse: "84 bpm",
      pulseStatus: "normal",
      bloodSugar: "234 mg/dL (Random)",
      bloodSugarStatus: "high",
      temp: "98.4 °F",
      tempStatus: "normal",
      bmi: "27.4 (Overweight)",
      recordedAt: "Today, 09:45 AM by ASHA Sunita"
    },
    vitalsHistory: [
      { date: "Aug 28", bpSys: 158, bpDia: 96, sugar: 234, pulse: 84 },
      { date: "Aug 21", bpSys: 152, bpDia: 94, sugar: 218, pulse: 82 },
      { date: "Aug 14", bpSys: 164, bpDia: 100, sugar: 250, pulse: 90 },
      { date: "Aug 07", bpSys: 150, bpDia: 92, sugar: 210, pulse: 78 },
      { date: "Jul 30", bpSys: 146, bpDia: 90, sugar: 195, pulse: 76 }
    ],
    timeline: [
      {
        id: "EVT-101",
        type: "teleconsult",
        title: "Teleconsultation Review with Dr. Ananya",
        date: "28 Aug 2026, 11:30 AM",
        facility: "PHC Shirwal Tele-Desk",
        author: "Dr. Ananya Kulkarni",
        summary: "Patient reported tingling in lower extremities and occasional dizziness. Morning fasting sugar uncontrolled at 198 mg/dL. Adjusted Metformin to 1000mg BD, added Telmisartan 40mg.",
        tags: ["Teleconsult", "Rx Updated"],
        prescription: [
          { drug: "Tab. Metformin 1000mg", dosage: "1-0-1 After meals", days: 30 },
          { drug: "Tab. Telmisartan 40mg", dosage: "1-0-0 Morning before food", days: 30 },
          { drug: "Tab. Methylcobalamin 1500mcg", dosage: "0-1-0 After lunch", days: 30 }
        ]
      },
      {
        id: "EVT-102",
        type: "lab",
        title: "Microbiology & Biochemistry Panel",
        date: "25 Aug 2026, 08:30 AM",
        facility: "CHC Khandala Central Diagnostic Unit",
        author: "Lab Tech: S. Gaikwad",
        summary: "HbA1c: 8.8% (Target < 7.0%), Serum Creatinine: 1.1 mg/dL, Urine Microalbumin: Mild elevation (42 mg/L). LFT within acceptable limits.",
        tags: ["Lab Report", "HbA1c 8.8%"],
        reportUrl: "#lab-download-8921"
      },
      {
        id: "EVT-103",
        type: "asha_visit",
        title: "ASHA Doorstep Check-in & NCD Screening",
        date: "21 Aug 2026, 04:15 PM",
        facility: "Doorstep, Shirwal Ward 3",
        author: "ASHA Sunita Bai Kamble",
        summary: "Weekly home visit. Patient complained of blurred morning vision. Inspected feet for diabetic ulcers (none found, mild dry skin). Advised salt reduction and verified medicine compliance (skipping evening pills due to acidity).",
        tags: ["ASHA Visit", "NCD Follow-up"]
      },
      {
        id: "EVT-104",
        type: "referral",
        title: "Ophthalmology Diabetic Retinopathy Referral",
        date: "14 Aug 2026, 10:00 AM",
        facility: "Referred from PHC Shirwal to District Hospital Satara",
        author: "Dr. Ananya Kulkarni",
        summary: "Scheduled eye fundus examination due to 6-year history of diabetes and new onset blurring.",
        tags: ["Referral", "Ophthalmology"]
      }
    ],
    referrals: [
      {
        id: "REF-902",
        targetHospital: "District Hospital Satara (Ophthalmology OPD)",
        department: "Eye / Retinal Specialist",
        reason: "Diabetic Retinopathy Screening & Fundus Photography",
        status: "Appointment Confirmed (02 Sep 2026)",
        priority: "Routine"
      }
    ]
  },
  {
    id: "PAT-002",
    abhaId: "14-2209-7714-3891",
    name: "Sunita Laxman Jadhav",
    nameHindi: "सुनीता लक्ष्मण जाधव",
    nameMarathi: "सुनिता लक्ष्मण जाधव",
    age: 24,
    gender: "Female",
    bloodGroup: "B+",
    village: "Khandala Taluka, Vasti 4",
    villageMarathi: "खंडाळा तालुका, वस्ती ४",
    villageHindi: "खंडाला तालुका, बस्ती ४",
    primaryPhc: "CHC Khandala",
    phone: "+91 91588 33109",
    emergencyContact: "Laxman Jadhav (Husband) - +91 91588 33110",
    riskLevel: "High-Risk Maternal (ANC)",
    riskColor: "critical",
    conditionTags: ["Primi Gravida 34 Weeks", "Severe Anemia (Hb 7.4 g/dL)", "Gestational Hypertension"],
    assignedAsha: "Rekha Bhosale",
    latestVitals: {
      bp: "144/92 mmHg",
      bpStatus: "high",
      spo2: "96%",
      spo2Status: "normal",
      pulse: "92 bpm",
      pulseStatus: "high",
      bloodSugar: "98 mg/dL (Fasting)",
      bloodSugarStatus: "normal",
      temp: "98.6 °F",
      tempStatus: "normal",
      bmi: "22.1",
      recordedAt: "Today, 10:15 AM at CHC Khandala ANC"
    },
    vitalsHistory: [
      { date: "Aug 28", bpSys: 144, bpDia: 92, sugar: 98, pulse: 92 },
      { date: "Aug 20", bpSys: 140, bpDia: 90, sugar: 104, pulse: 88 },
      { date: "Aug 10", bpSys: 136, bpDia: 88, sugar: 94, pulse: 86 },
      { date: "Jul 28", bpSys: 130, bpDia: 84, sugar: 90, pulse: 80 }
    ],
    timeline: [
      {
        id: "EVT-201",
        type: "referral",
        title: "EMERGENCY ANC ESCALATION INITIATED",
        date: "28 Aug 2026, 10:30 AM",
        facility: "CHC Khandala -> District Hospital Satara (Labor Room/ICU)",
        author: "Dr. Vikram Deshmukh",
        summary: "34 weeks primigravida with severe pallor, pedal edema, Hb 7.4 g/dL, BP 144/92. High risk of pre-eclampsia and intrapartum hemorrhage. Recommending intravenous Iron Sucrose infusion and institutional delivery preparedness at Tertiary Center.",
        tags: ["Critical Escalation", "108 Dispatched"]
      },
      {
        id: "EVT-202",
        type: "lab",
        title: "ANC Complete Blood Count & Ferritin",
        date: "27 Aug 2026, 02:00 PM",
        facility: "CHC Khandala Lab",
        author: "Lab Tech: P. Kadam",
        summary: "Hemoglobin: 7.4 g/dL (Severe Microcytic Hypochromic Anemia), Platelets: 180,000 /mcL, Serum Ferritin: 9 ng/mL (Severely depleted).",
        tags: ["Lab Alert", "Hb 7.4 g/dL"]
      },
      {
        id: "EVT-203",
        type: "asha_visit",
        title: "Maternal Nutrition & IFA Pill Verification",
        date: "22 Aug 2026, 11:00 AM",
        facility: "Home Visit, Khandala Vasti 4",
        author: "ASHA Rekha Bhosale",
        summary: "Mother was experiencing dizziness upon standing. Noted poor tolerance of oral Iron-Folic Acid tablets due to nausea. Delivered nutritional supplements (chana, jaggery counseling) and reported case to MO.",
        tags: ["ASHA Field Log", "High Risk ANC"]
      }
    ],
    referrals: [
      {
        id: "REF-908",
        targetHospital: "District Hospital Satara (Obstetrics High-Risk Unit)",
        department: "Maternal Critical Care",
        reason: "Severe Anemia at 34wks + Gestational HTN for IV Iron & safe delivery",
        status: "Transit in Progress (Ambulance MH-12-EM-1081)",
        priority: "Critical"
      }
    ]
  },
  {
    id: "PAT-003",
    abhaId: "14-6632-1188-4420",
    name: "Aarav Sachin Shinde",
    nameHindi: "आरव सचिन शिंदे",
    nameMarathi: "आरव सचिन शिंदे",
    age: 3,
    gender: "Male",
    bloodGroup: "A+",
    village: "Velhe Hills, Wadi 2",
    villageMarathi: "वेल्हे टेकड्या, वाडी २",
    villageHindi: "वेल्हे हिल्स, वाडी २",
    primaryPhc: "Sub-Center Velhe",
    phone: "+91 84210 99411",
    emergencyContact: "Sachin Shinde (Father) - +91 84210 99411",
    riskLevel: "High Priority Pediatric",
    riskColor: "strained",
    conditionTags: ["SAM (Severe Acute Malnutrition)", "Recurrent Diarrhea", "Under-immunized"],
    assignedAsha: "Mangal Gawade",
    latestVitals: {
      bp: "90/60 mmHg",
      bpStatus: "normal",
      spo2: "95%",
      spo2Status: "normal",
      pulse: "118 bpm",
      pulseStatus: "high",
      bloodSugar: "78 mg/dL",
      bloodSugarStatus: "normal",
      temp: "101.2 °F",
      tempStatus: "high",
      bmi: "MUAC: 11.2 cm (Red Zone)",
      recordedAt: "Yesterday, 03:30 PM by ASHA Mangal"
    },
    vitalsHistory: [
      { date: "Aug 27", bpSys: 90, bpDia: 60, sugar: 78, pulse: 118 },
      { date: "Aug 18", bpSys: 88, bpDia: 58, sugar: 82, pulse: 110 },
      { date: "Aug 05", bpSys: 86, bpDia: 56, sugar: 85, pulse: 105 }
    ],
    timeline: [
      {
        id: "EVT-301",
        type: "teleconsult",
        title: "Pediatric Tele-Triage with Dr. Ananya",
        date: "27 Aug 2026, 04:00 PM",
        facility: "Sub-Center Velhe Tele-Kiosk",
        author: "Dr. Ananya Kulkarni",
        summary: "Child presents with MUAC 11.2 cm (SAM red zone), 101.2 F fever, loose watery stools for 2 days. Prescribed ORS + Zinc supplementation, Paracetamol drops 100mg SOS. Scheduled NRC (Nutrition Rehabilitation Center) admission.",
        tags: ["Pediatric", "Teleconsult"],
        prescription: [
          { drug: "Zinc Sulfate Dispersible 20mg", dosage: "1 tab daily in water", days: 14 },
          { drug: "WHO Oral Rehydration Salts (ORS)", dosage: "Sip after each loose stool", days: 5 },
          { drug: "Paracetamol Drops (100mg/ml)", dosage: "0.8 ml SOS for fever > 100 F", days: 3 }
        ]
      },
      {
        id: "EVT-302",
        type: "asha_visit",
        title: "MUAC Screening & Growth Charting",
        date: "24 Aug 2026, 10:30 AM",
        facility: "Anganwadi Center Velhe",
        author: "ASHA Mangal Gawade",
        summary: "Weighed 9.1 kg (weight-for-height < -3 Z-score). Checked for bilateral pitting edema (absent). Mother advised on calorie-dense khichdi and breastfeeding continuation.",
        tags: ["Anganwadi Visit", "SAM Red"]
      }
    ],
    referrals: [
      {
        id: "REF-912",
        targetHospital: "Bhor Sub-district NRC (Nutrition Center)",
        department: "Pediatrics & Malnutrition Care",
        reason: "SAM protocol admission & therapeutic feeding (F-75 / F-100)",
        status: "Bed Reserved - Admission Tomorrow",
        priority: "Urgent"
      }
    ]
  },
  {
    id: "PAT-004",
    abhaId: "14-3310-8843-2219",
    name: "Tukaram Kisan Shinde",
    nameHindi: "तुकाराम किसन शिंदे",
    nameMarathi: "तुकाराम किसन शिंदे",
    age: 72,
    gender: "Male",
    bloodGroup: "AB+",
    village: "Kikvi Vasti, Plot 12",
    villageMarathi: "किकवी वस्ती, प्लॉट १२",
    villageHindi: "किकवी बस्ती, प्लॉट १२",
    primaryPhc: "Sub-Center Kikvi",
    phone: "+91 98902 44102",
    emergencyContact: "Datta Shinde (Son) - +91 98902 44105",
    riskLevel: "CRITICAL RED - STEMI ALERT",
    riskColor: "critical",
    conditionTags: ["Suspected Acute Coronary Syndrome", "Severe Chest Pain", "Sweating & Dyspnea"],
    assignedAsha: "Deepa Salunkhe",
    latestVitals: {
      bp: "86/54 mmHg",
      bpStatus: "critical",
      spo2: "90%",
      spo2Status: "critical",
      pulse: "112 bpm (Thready)",
      pulseStatus: "critical",
      bloodSugar: "164 mg/dL",
      bloodSugarStatus: "normal",
      temp: "97.8 °F",
      tempStatus: "normal",
      bmi: "24.2",
      recordedAt: "Today, 11:10 AM at Sub-Center Kikvi"
    },
    vitalsHistory: [
      { date: "Aug 28", bpSys: 86, bpDia: 54, sugar: 164, pulse: 112 },
      { date: "Aug 15", bpSys: 138, bpDia: 88, sugar: 140, pulse: 74 }
    ],
    timeline: [
      {
        id: "EVT-401",
        type: "referral",
        title: "108 EMERGENCY ADVANCED LIFE SUPPORT DISPATCH",
        date: "28 Aug 2026, 11:15 AM",
        facility: "Sub-Center Kikvi -> District Hospital Satara ICCU",
        author: "Tele-Emergency MO Dr. Ananya",
        summary: "72yo male presented with severe retrosternal crushing chest pain radiating to left jaw, diaphoresis, hypotension (86/54). Rapid ECG shows ST elevation in V1-V4 (Anterior Wall MI). Administered Aspirin 325mg chewable + Clopidogrel 300mg stat. 108 ALS Ambulance dispatched with defibrillator.",
        tags: ["STEMI Code Red", "ALS Dispatch"]
      }
    ],
    referrals: [
      {
        id: "REF-999",
        targetHospital: "District Hospital Satara (Cath Lab / ICCU)",
        department: "Interventional Cardiology",
        reason: "Acute Anterior Wall STEMI - Primary PCI window",
        status: "Ambulance Dispatched (ETA 18 mins)",
        priority: "Critical"
      }
    ]
  },
  {
    id: "PAT-005",
    abhaId: "14-9912-3401-8822",
    name: "Parvati Devi More",
    nameHindi: "पार्वती देवी मोरे",
    nameMarathi: "पार्वतीदेवी मोरे",
    age: 64,
    gender: "Female",
    bloodGroup: "O-",
    village: "Bhor Valley, Khopadi",
    villageMarathi: "भोर व्हॅली, खोपडी",
    villageHindi: "भोर वैली, खोपड़ी",
    primaryPhc: "PHC Bhor",
    phone: "+91 94211 77209",
    emergencyContact: "Ankush More - +91 94211 77210",
    riskLevel: "Chronic NCD Management",
    riskColor: "optimal",
    conditionTags: ["Hypertension", "Osteoarthritis Bilateral Knee", "Stable CKD Stage 2"],
    assignedAsha: "Sunita Bai Kamble",
    latestVitals: {
      bp: "128/82 mmHg",
      bpStatus: "normal",
      spo2: "98%",
      spo2Status: "normal",
      pulse: "72 bpm",
      pulseStatus: "normal",
      bloodSugar: "112 mg/dL",
      bloodSugarStatus: "normal",
      temp: "98.2 °F",
      tempStatus: "normal",
      bmi: "26.0",
      recordedAt: "26 Aug 2026 by ASHA Sunita"
    },
    vitalsHistory: [
      { date: "Aug 26", bpSys: 128, bpDia: 82, sugar: 112, pulse: 72 },
      { date: "Aug 12", bpSys: 132, bpDia: 84, sugar: 118, pulse: 74 },
      { date: "Jul 29", bpSys: 134, bpDia: 86, sugar: 124, pulse: 76 }
    ],
    timeline: [
      {
        id: "EVT-501",
        type: "teleconsult",
        title: "Routine Hypertension & Pain Management Review",
        date: "26 Aug 2026, 03:00 PM",
        facility: "PHC Bhor Tele-desk",
        author: "Dr. Snehal More",
        summary: "BP well maintained on Amlodipine 5mg. Knee pain moderate with morning stiffness. Advised quadriceps strengthening exercises and Paracetamol SOS instead of NSAIDs to preserve renal function.",
        tags: ["Teleconsult", "NCD Stable"]
      }
    ],
    referrals: []
  },
  {
    id: "PAT-006",
    abhaId: "14-5544-1290-7761",
    name: "Meena Santosh Gaikwad",
    nameHindi: "मीना संतोष गायकवाड",
    nameMarathi: "मीना संतोष गायकवाड",
    age: 22,
    gender: "Female",
    bloodGroup: "A+",
    village: "Shirwal Gaon, Ward 1",
    villageMarathi: "शिरवळ गाव, वॉर्ड १",
    villageHindi: "शिरवल गाँव, वार्ड १",
    primaryPhc: "PHC Shirwal",
    phone: "+91 98500 12390",
    emergencyContact: "Santosh Gaikwad (Husband) - +91 98500 12391",
    riskLevel: "Postpartum Sepsis Watch",
    riskColor: "strained",
    conditionTags: ["Postpartum Day 12", "Fever Spikes (102°F)", "Episiotomy Wound Induration"],
    assignedAsha: "Sunita Bai Kamble",
    latestVitals: {
      bp: "112/74 mmHg",
      bpStatus: "normal",
      spo2: "97%",
      spo2Status: "normal",
      pulse: "98 bpm",
      pulseStatus: "high",
      bloodSugar: "92 mg/dL",
      bloodSugarStatus: "normal",
      temp: "102.1 °F",
      tempStatus: "high",
      bmi: "21.8",
      recordedAt: "Today, 08:30 AM by ASHA Sunita"
    },
    vitalsHistory: [
      { date: "Aug 28", bpSys: 112, bpDia: 74, sugar: 92, pulse: 98 },
      { date: "Aug 26", bpSys: 110, bpDia: 70, sugar: 95, pulse: 82 }
    ],
    timeline: [
      {
        id: "EVT-601",
        type: "asha_visit",
        title: "PNC (Post-Natal Care) Day 12 Visit",
        date: "28 Aug 2026, 08:30 AM",
        facility: "Home Visit, Shirwal Ward 1",
        author: "ASHA Sunita Bai Kamble",
        summary: "Mother shivering with high temperature 102.1 F. Checked breast engorgement (negative) and perineal site (erythema and local tenderness observed). Newborn feeding well and alert. Promptly escalated to MO for oral broad-spectrum antibiotic initiation.",
        tags: ["PNC Check", "Sepsis Watch"]
      }
    ],
    referrals: []
  }
];

export const LIVE_REFERRALS = [
  {
    id: "REF-2026-881",
    patientName: "Tukaram Kisan Shinde",
    patientAge: 72,
    patientGender: "Male",
    abhaId: "14-3310-8843-2219",
    fromFacility: "Sub-Center Kikvi",
    toFacility: "District Hospital Satara",
    urgency: "critical", // critical | strained | optimal
    urgencyLabel: "CRITICAL STEMI",
    specialty: "Interventional Cardiology / Cath Lab",
    timeElapsed: "14 mins ago",
    distanceKm: 24,
    etaMinutes: 18,
    ambulanceId: "MH-12-EM-1081 (ALS)",
    paramedicContact: "+91 99221 44550",
    status: "In Transit",
    clinicalSummary: "Acute ST elevation myocardial infarction, hypotension 86/54, ongoing oxygen via nasal cannula."
  },
  {
    id: "REF-2026-882",
    patientName: "Sunita Laxman Jadhav",
    patientAge: 24,
    patientGender: "Female",
    abhaId: "14-2209-7714-3891",
    fromFacility: "CHC Khandala",
    toFacility: "District Hospital Satara",
    urgency: "critical",
    urgencyLabel: "HIGH RISK MATERNAL",
    specialty: "Obstetrics ICU & Neonatal Unit",
    timeElapsed: "32 mins ago",
    distanceKm: 31,
    etaMinutes: 28,
    ambulanceId: "MH-14-EM-1022 (BLS)",
    paramedicContact: "+91 98810 66231",
    status: "In Transit",
    clinicalSummary: "34wks ANC with severe anemia (Hb 7.4), gestational hypertension (144/92), fetal heart rate 142 bpm."
  },
  {
    id: "REF-2026-883",
    patientName: "Aarav Sachin Shinde",
    patientAge: 3,
    patientGender: "Male",
    abhaId: "14-6632-1188-4420",
    fromFacility: "Sub-Center Velhe",
    toFacility: "PHC Bhor NRC",
    urgency: "strained",
    urgencyLabel: "PEDIATRIC NRC",
    specialty: "Nutrition Rehabilitation Unit",
    timeElapsed: "1 hour ago",
    distanceKm: 18,
    etaMinutes: 45,
    ambulanceId: "102 Janani Shishu Express",
    paramedicContact: "+91 97654 33211",
    status: "Bed Assigned - Scheduled Transport",
    clinicalSummary: "Grade 3 Severe Acute Malnutrition (MUAC 11.2cm) with dehydration recovery."
  },
  {
    id: "REF-2026-884",
    patientName: "Ganesh Baburao Pawar",
    patientAge: 45,
    patientGender: "Male",
    abhaId: "14-1188-7744-9933",
    fromFacility: "Sub-Center Velhe",
    toFacility: "PHC Shirwal",
    urgency: "strained",
    urgencyLabel: "INFECTIOUS DISEASE",
    specialty: "General Medicine / Blood Transfusion",
    timeElapsed: "2 hours ago",
    distanceKm: 16,
    etaMinutes: 30,
    ambulanceId: "Facility Feeder 108",
    paramedicContact: "+91 98229 11094",
    status: "Awaiting Arrival",
    clinicalSummary: "Falciparum malaria with low platelets (48,000/mcL). Requires IV Artesunate & monitoring."
  },
  {
    id: "REF-2026-885",
    patientName: "Ramesh Shantaram Patil",
    patientAge: 58,
    patientGender: "Male",
    abhaId: "14-8921-4432-9018",
    fromFacility: "PHC Shirwal",
    toFacility: "District Hospital Satara",
    urgency: "optimal",
    urgencyLabel: "ELECTIVE OPD",
    specialty: "Ophthalmology / Retinal Clinic",
    timeElapsed: "3 days ago",
    distanceKm: 42,
    etaMinutes: 0,
    ambulanceId: "Patient Public Transport",
    paramedicContact: "N/A",
    status: "Appointment Confirmed",
    clinicalSummary: "Diabetic Retinopathy annual fundus screening slot booked."
  }
];

export const SYSTEM_ALERTS = [
  {
    id: "ALT-01",
    type: "inventory",
    severity: "critical", // critical | warning | info
    facility: "Sub-Center Velhe",
    title: "Critical Stockout: Oral Rehydration Salts & Paracetamol Drops",
    description: "Stock down to zero units amid seasonal pediatric diarrhea spike in Ward 2.",
    action: "Authorize Emergency Redistribution from PHC Shirwal",
    timestamp: "24 mins ago"
  },
  {
    id: "ALT-02",
    type: "telemetry",
    severity: "warning",
    facility: "Sub-Center Velhe",
    title: "Solar Inverter Battery at 18%",
    description: "Grid power disconnected since 06:00 AM due to fallen transmission branch.",
    action: "Contact MSEB Bhor Feeder Division",
    timestamp: "45 mins ago"
  },
  {
    id: "ALT-03",
    type: "maternal",
    severity: "critical",
    facility: "CHC Khandala Block",
    title: "3 Unscreened High-Risk Pregnancies overdue > 7 days",
    description: "Khandala Vasti ASHA cluster reports 3 missed 3rd-trimester hemoglobin tests.",
    action: "Trigger Priority Outreach Task to ASHA Rekha",
    timestamp: "1 hour ago"
  },
  {
    id: "ALT-04",
    type: "network",
    severity: "warning",
    facility: "PHC Bhor",
    title: "Cellular Bandwidth Throttled (2G Mode Fallback)",
    description: "Teleconsultations running on Audio-Only low bitrate fallback mode.",
    action: "Switch to Store-and-Forward sync",
    timestamp: "2 hours ago"
  },
  {
    id: "ALT-05",
    type: "equipment",
    severity: "info",
    facility: "PHC Shirwal",
    title: "Monthly Auto-Calibration Due: Digital ECG Machine",
    description: "Model BPL Cardiart 6108T requires scheduled calibration verify.",
    action: "Run System Diagnostic Check",
    timestamp: "4 hours ago"
  }
];

export const INVENTORY_ITEMS = [
  {
    id: "MED-101",
    name: "Metformin Hydrochloride 500mg",
    category: "Chronic NCD / Diabetes",
    type: "Tablets",
    facility: "PHC Shirwal",
    batchNo: "MF-2026-081",
    currentStock: 4200,
    reorderLevel: 1500,
    unit: "tablets",
    expiryDate: "12/2027",
    status: "optimal",
    supplier: "Haffkine Bio-Pharma Corp",
    monthlyConsumption: 1250
  },
  {
    id: "MED-102",
    name: "Oral Rehydration Salts (WHO formula)",
    category: "Essential Child Health",
    type: "Sachets",
    facility: "Sub-Center Velhe",
    batchNo: "ORS-2026-302",
    currentStock: 12,
    reorderLevel: 250,
    unit: "sachets",
    expiryDate: "03/2027",
    status: "critical",
    supplier: "Jan Aushadhi Kendra Pune",
    monthlyConsumption: 320
  },
  {
    id: "MED-103",
    name: "Iron & Folic Acid (IFA) Tablets (100mg)",
    category: "Maternal Health (ANC)",
    type: "Tablets",
    facility: "CHC Khandala",
    batchNo: "IFA-2025-991",
    currentStock: 680,
    reorderLevel: 1200,
    unit: "tablets",
    expiryDate: "10/2026",
    status: "strained",
    supplier: "National Health Mission Supply",
    monthlyConsumption: 950
  },
  {
    id: "MED-104",
    name: "Amoxicillin Clavulanate 625mg",
    category: "Antibiotics",
    type: "Tablets",
    facility: "PHC Shirwal",
    batchNo: "AC-2026-118",
    currentStock: 1450,
    reorderLevel: 800,
    unit: "tablets",
    expiryDate: "08/2027",
    status: "optimal",
    supplier: "Cipla Medpro India",
    monthlyConsumption: 410
  },
  {
    id: "MED-105",
    name: "Inj. Oxytocin 10 IU/ml",
    category: "Emergency Obstetric Care",
    type: "Ampoules",
    facility: "CHC Khandala",
    batchNo: "OXY-2026-441",
    currentStock: 45,
    reorderLevel: 100,
    unit: "ampoules (Cold Chain 2-8°C)",
    expiryDate: "01/2027",
    status: "strained",
    supplier: "Serum Institute of India",
    monthlyConsumption: 65
  },
  {
    id: "MED-106",
    name: "Inj. Artesunate 60mg",
    category: "Vector-Borne / Malaria",
    type: "Vials",
    facility: "Sub-Center Velhe",
    batchNo: "ART-2026-720",
    currentStock: 4,
    reorderLevel: 25,
    unit: "vials",
    expiryDate: "11/2026",
    status: "critical",
    supplier: "National Vector Borne Disease Control",
    monthlyConsumption: 18
  },
  {
    id: "MED-107",
    name: "Telmisartan 40mg",
    category: "Chronic NCD / Hypertension",
    type: "Tablets",
    facility: "PHC Bhor",
    batchNo: "TEL-2026-552",
    currentStock: 2800,
    reorderLevel: 1000,
    unit: "tablets",
    expiryDate: "05/2028",
    status: "optimal",
    supplier: "Sun Pharma Distributors",
    monthlyConsumption: 820
  },
  {
    id: "MED-108",
    name: "Zinc Sulfate Dispersible 20mg",
    category: "Essential Child Health",
    type: "Tablets",
    facility: "Sub-Center Velhe",
    batchNo: "ZN-2026-210",
    currentStock: 30,
    reorderLevel: 300,
    unit: "tablets",
    expiryDate: "09/2026",
    status: "critical",
    supplier: "Jan Aushadhi Kendra Pune",
    monthlyConsumption: 240
  },
  {
    id: "MED-109",
    name: "Normal Saline (0.9% NaCl) 500ml IV",
    category: "Critical Fluids & Electrolytes",
    type: "IV Infusion",
    facility: "District Hospital Satara",
    batchNo: "NS-2026-890",
    currentStock: 1250,
    reorderLevel: 400,
    unit: "bottles",
    expiryDate: "04/2028",
    status: "optimal",
    supplier: "Ahlcon Parenterals",
    monthlyConsumption: 380
  },
  {
    id: "MED-110",
    name: "Paracetamol Suspension 120mg/5ml",
    category: "Essential Child Health",
    type: "Bottles",
    facility: "PHC Shirwal",
    batchNo: "PCM-2026-904",
    currentStock: 185,
    reorderLevel: 80,
    unit: "60ml bottles",
    expiryDate: "11/2027",
    status: "optimal",
    supplier: "Haffkine Bio-Pharma Corp",
    monthlyConsumption: 62
  }
];

export const EQUIPMENT_ITEMS = [
  {
    id: "EQ-01",
    name: "BPL 12-Channel ECG Machine",
    facility: "PHC Shirwal",
    serialNo: "BPL-ECG-2023-882",
    status: "Active & Calibrated",
    badge: "optimal",
    batteryHealth: "94%",
    lastServiced: "12 Jul 2026",
    nextDue: "12 Jan 2027"
  },
  {
    id: "EQ-02",
    name: "Radiant Baby Warmer (Neonatal)",
    facility: "CHC Khandala",
    serialNo: "RBW-2022-104",
    status: "Active - Dual Probe",
    badge: "optimal",
    batteryHealth: "100% (AC)",
    lastServiced: "04 Aug 2026",
    nextDue: "04 Feb 2027"
  },
  {
    id: "EQ-03",
    name: "Digital Omron BP Monitor (Heavy Duty)",
    facility: "Sub-Center Velhe",
    serialNo: "OMR-BP-901",
    status: "Needs Calibration (Cuff Leak)",
    badge: "critical",
    batteryHealth: "42%",
    lastServiced: "15 Jan 2026",
    nextDue: "Overdue by 45 days"
  },
  {
    id: "EQ-04",
    name: "Fingertip Pulse Oximeter x4",
    facility: "Sub-Center Kikvi",
    serialNo: "OXI-KIK-01..04",
    status: "3 Active / 1 Battery Issue",
    badge: "strained",
    batteryHealth: "Replace AAA Cells",
    lastServiced: "01 Jun 2026",
    nextDue: "01 Dec 2026"
  },
  {
    id: "EQ-05",
    name: "Solar Powered Vaccine Refrigerator (ILR)",
    facility: "PHC Bhor",
    serialNo: "Dometic-TCX-40",
    status: "Active (Constant 3.8°C)",
    badge: "optimal",
    batteryHealth: "Solar Array 98%",
    lastServiced: "20 Aug 2026",
    nextDue: "20 Feb 2027"
  },
  {
    id: "EQ-06",
    name: "Portable Ultrasound Scanner (Sonosite)",
    facility: "District Hospital Satara (Mobile Outreach)",
    serialNo: "SONO-TITAN-11",
    status: "Active - Scheduled for Bhor Camp",
    badge: "optimal",
    batteryHealth: "88%",
    lastServiced: "10 Aug 2026",
    nextDue: "10 Nov 2026"
  }
];

export const ASHA_WORKERS = [
  {
    id: "ASHA-01",
    name: "Sunita Bai Kamble",
    nameHindi: "सुनीता बाई कांबळे",
    cluster: "Shirwal West (Cluster 4)",
    phc: "PHC Shirwal",
    phone: "+91 88055 91234",
    status: "online", // online | sync_pending | offline
    lastActive: "Active now (Syncing vitals)",
    battery: "88%",
    deviceModel: "Samsung Galaxy M14 (Govt Allotted)",
    householdsAssigned: 284,
    householdsVisitedMonth: 248,
    visitTargetPct: 87,
    immunizationTargetPct: 94,
    ncdScreeningsMonth: 82,
    highRiskCasesUnderWatch: 6,
    pendingUploads: 0,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "ASHA-02",
    name: "Rekha Bhosale",
    nameHindi: "रेखा भोसले",
    cluster: "Khandala Vasti (Cluster 2)",
    phc: "CHC Khandala",
    phone: "+91 94033 11820",
    status: "online",
    lastActive: "14 mins ago",
    battery: "65%",
    deviceModel: "Redmi 12C (Govt Allotted)",
    householdsAssigned: 310,
    householdsVisitedMonth: 288,
    visitTargetPct: 93,
    immunizationTargetPct: 91,
    ncdScreeningsMonth: 95,
    highRiskCasesUnderWatch: 9,
    pendingUploads: 2,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "ASHA-03",
    name: "Mangal Gawade",
    nameHindi: "मंगल गावडे",
    cluster: "Velhe Hills (Cluster 7)",
    phc: "Sub-Center Velhe",
    phone: "+91 96890 55432",
    status: "sync_pending",
    lastActive: "Offline queue: 4 records stored",
    battery: "34%",
    deviceModel: "Lava Yuva 3 (Govt Allotted)",
    householdsAssigned: 240,
    householdsVisitedMonth: 195,
    visitTargetPct: 81,
    immunizationTargetPct: 78,
    ncdScreeningsMonth: 54,
    highRiskCasesUnderWatch: 4,
    pendingUploads: 4,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "ASHA-04",
    name: "Deepa Salunkhe",
    nameHindi: "दीपा साळुंखे",
    cluster: "Kikvi Rural (Cluster 1)",
    phc: "Sub-Center Kikvi",
    phone: "+91 91580 44299",
    status: "online",
    lastActive: "4 mins ago",
    battery: "92%",
    deviceModel: "Samsung Galaxy M14",
    householdsAssigned: 260,
    householdsVisitedMonth: 252,
    visitTargetPct: 97,
    immunizationTargetPct: 98,
    ncdScreeningsMonth: 104,
    highRiskCasesUnderWatch: 3,
    pendingUploads: 0,
    avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=200"
  }
];

export const RECENT_FIELD_UPLOADS = [
  {
    id: "UPL-881",
    ashaName: "Sunita Bai Kamble",
    cluster: "Shirwal West",
    patientName: "Ramesh Shantaram Patil",
    type: "NCD Vitals Log",
    timestamp: "Today, 09:45 AM",
    vitalsSummary: "BP: 158/96 mmHg, Sugar: 234 mg/dL",
    syncStatus: "Synced via 4G",
    verified: true,
    photoUrl: null
  },
  {
    id: "UPL-882",
    ashaName: "Sunita Bai Kamble",
    cluster: "Shirwal West",
    patientName: "Meena Santosh Gaikwad",
    type: "PNC Sepsis Alert",
    timestamp: "Today, 08:30 AM",
    vitalsSummary: "Temp: 102.1 °F, Pulse: 98 bpm",
    syncStatus: "Synced via 4G",
    verified: true,
    photoUrl: null
  },
  {
    id: "UPL-883",
    ashaName: "Mangal Gawade",
    cluster: "Velhe Hills",
    patientName: "Aarav Sachin Shinde",
    type: "Child Nutrition & MUAC Photo",
    timestamp: "Yesterday, 03:30 PM",
    vitalsSummary: "MUAC: 11.2 cm (Red), Temp: 101.2 °F",
    syncStatus: "Cached Offline -> Auto-synced",
    verified: true,
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "UPL-884",
    ashaName: "Deepa Salunkhe",
    cluster: "Kikvi Rural",
    patientName: "Tukaram Kisan Shinde",
    type: "Chest Pain Rapid Triage",
    timestamp: "Today, 11:10 AM",
    vitalsSummary: "BP: 86/54, Pulse: 112 bpm, SpO2: 90%",
    syncStatus: "Priority Satellite/4G",
    verified: true,
    photoUrl: null
  }
];

export const UPCOMING_OUTREACH = [
  {
    id: "OUT-01",
    title: "VHSND (Village Health, Sanitation & Nutrition Day)",
    date: "30 Aug 2026",
    time: "09:00 AM - 02:00 PM",
    location: "Shirwal Anganwadi #3",
    facilitator: "ASHA Sunita & ANM Jadhav",
    targetBeneficiaries: "35 ANC mothers + 48 Infants (0-2 yrs)",
    activities: ["Hemoglobin test", "Pentavalent-3 & MR-1 vaccines", "Take Home Rations distribution"],
    status: "Confirmed"
  },
  {
    id: "OUT-02",
    title: "Intensified Pulse Polio Drive (IPPI)",
    date: "04 Sep 2026",
    time: "08:00 AM - 05:00 PM",
    location: "Khandala Bus Depot & Sub-centers",
    facilitator: "Cluster ASHAs + Volunteers",
    targetBeneficiaries: "450 Children (<5 yrs)",
    activities: ["Bivalent Oral Polio Vaccine (bOPV)", "Finger marking", "Missed child tracking"],
    status: "Vaccine Cold Chain Ready"
  },
  {
    id: "OUT-03",
    title: "Mobile NCD & Eye Cataract Camp",
    date: "08 Sep 2026",
    time: "10:00 AM - 04:00 PM",
    location: "Velhe Community Hall",
    facilitator: "District Hospital Satara Mobile Van",
    targetBeneficiaries: "120 Senior Citizens (60+ yrs)",
    activities: ["Diabetic Retinopathy", "Vision acuity", "Random Blood Glucose"],
    status: "Permits Approved"
  }
];

// Time-Series Analytics Data for Recharts
export const PATIENT_VOLUME_TRENDS = [
  { month: "Jan", footfall: 1420, teleconsults: 410, referrals: 92, maternalVisits: 380 },
  { month: "Feb", footfall: 1580, teleconsults: 460, referrals: 104, maternalVisits: 410 },
  { month: "Mar", footfall: 1740, teleconsults: 520, referrals: 118, maternalVisits: 440 },
  { month: "Apr", footfall: 1690, teleconsults: 590, referrals: 112, maternalVisits: 430 },
  { month: "May", footfall: 1910, teleconsults: 680, referrals: 145, maternalVisits: 480 },
  { month: "Jun", footfall: 2150, teleconsults: 790, referrals: 178, maternalVisits: 520 },
  { month: "Jul", footfall: 2420, teleconsults: 910, referrals: 210, maternalVisits: 590 },
  { month: "Aug (MTD)", footfall: 2680, teleconsults: 1040, referrals: 235, maternalVisits: 630 }
];

export const DEPLETION_TRENDS = [
  { drug: "Metformin 500", consumption: 1250, stock: 4200, safeLevel: 1500 },
  { drug: "IFA Tablets", consumption: 950, stock: 680, safeLevel: 1200 },
  { drug: "Amoxicillin 625", consumption: 410, stock: 1450, safeLevel: 800 },
  { drug: "WHO ORS", consumption: 320, stock: 12, safeLevel: 250 },
  { drug: "Telmisartan 40", consumption: 820, stock: 2800, safeLevel: 1000 },
  { drug: "Oxytocin 10IU", consumption: 65, stock: 45, safeLevel: 100 },
  { drug: "Inj. Artesunate", consumption: 18, stock: 4, safeLevel: 25 }
];

export const MATERNAL_HEALTH_METRICS = {
  highRiskFollowUps: 24,
  anemiaCasesUnderWatch: 18,
  immunizationTargetPct: 92.4,
  institutionalDeliveriesPct: 98.2,
  pendingThirdTrimesterScreenings: 7,
  ashaDoorstepCompletionPct: 89.6
};

export const TELEMEDICINE_STATS = {
  activeSessions: 3,
  completedToday: 38,
  avgSessionDurationMin: 9.4,
  prescriptionsGeneratedToday: 34,
  bandwidthStatus: "Adaptive 2G/3G Resilience Online",
  lowBandwidthFallbackActive: false
};
