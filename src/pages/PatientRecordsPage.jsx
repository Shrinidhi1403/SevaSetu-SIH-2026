import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Plus,
  Video,
  HeartPulse,
  Activity,
  Calendar,
  FileText,
  UserCheck,
  Building2,
  Phone,
  AlertTriangle,
  Pill,
  Droplets,
  Stethoscope,
  TrendingUp,
  Clock,
  ChevronRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export const PatientRecordsPage = () => {
  const {
    patients,
    selectedPatientId,
    setSelectedPatientId,
    selectedPatient,
    updatePatientVitals,
    addClinicalNote,
    currentUser,
    notify,
    t
  } = useApp();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("timeline");

  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [vitalsForm, setVitalsForm] = useState({
    bp: "130/85",
    spo2: "98%",
    pulse: "78",
    bloodSugar: "130",
    temp: "98.6 °F",
    bmi: "24.5"
  });

  const [noteForm, setNoteForm] = useState({
    title: "Routine Health & Medication Review",
    summary: "",
    tags: "Routine Follow-up, Medication Adjusted",
    drugName: "Tab. Metformin 500mg",
    drugDosage: "1-0-1 after food",
    drugDays: 30
  });

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abhaId.includes(searchQuery) ||
      p.village.toLowerCase().includes(searchQuery.toLowerCase());

    if (riskFilter === 'all') return matchesSearch;
    if (riskFilter === 'critical') return matchesSearch && p.riskColor === 'critical';
    if (riskFilter === 'strained') return matchesSearch && p.riskColor === 'strained';
    if (riskFilter === 'optimal') return matchesSearch && p.riskColor === 'optimal';
    return matchesSearch;
  });

  const handleSaveVitals = (e) => {
    e.preventDefault();
    updatePatientVitals(selectedPatient.id, vitalsForm);
    setShowVitalsModal(false);
  };

  const handleSaveNote = (e) => {
    e.preventDefault();
    addClinicalNote(selectedPatient.id, {
      type: "teleconsult",
      title: noteForm.title,
      summary: noteForm.summary || "Clinical examination documented. Vitals reviewed and therapy plan adjusted.",
      tags: noteForm.tags.split(',').map(s => s.trim()),
      prescription: noteForm.drugName ? [
        { drug: noteForm.drugName, dosage: noteForm.drugDosage, days: noteForm.drugDays }
      ] : null
    });
    setShowNoteModal(false);
    setNoteForm({
      title: "Routine Health & Medication Review",
      summary: "",
      tags: "Routine Follow-up",
      drugName: "",
      drugDosage: "",
      drugDays: 30
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient Cohort (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft flex flex-col h-[740px]">
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Patient Cohort ({filteredPatients.length})</span>
              </h3>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                Pune-Satara Rural
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search ABHA ID, name, village..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-0.5">
              <button
                onClick={() => setRiskFilter('all')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  riskFilter === 'all' ? 'bg-teal-700 text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Patients
              </button>
              <button
                onClick={() => setRiskFilter('critical')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  riskFilter === 'critical' ? 'bg-rose-600 text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setRiskFilter('strained')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  riskFilter === 'strained' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                High Priority
              </button>
              <button
                onClick={() => setRiskFilter('optimal')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  riskFilter === 'optimal' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Stable
              </button>
            </div>
          </div>

          {/* Patient Scroll List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-2 space-y-1.5">
            {filteredPatients.map(p => {
              const isSelected = selectedPatient?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/80 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 ring-1 ring-teal-500/20 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <div className="font-heading font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <span>{p.name}</span>
                        <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                          ({p.age}y, {p.gender})
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        ABHA: {p.abhaId}
                      </div>
                    </div>
                    <Badge
                      status={p.riskColor}
                      label={p.riskLevel.split(' ')[0]}
                      size="xs"
                      pulse={p.riskColor === 'critical'}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.conditionTags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-1.5">
                    <span>{p.village}</span>
                    <span className="text-teal-700 dark:text-teal-400 font-semibold">{p.primaryPhc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Patient Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedPatient ? (
            <>
              {/* Header Card */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {selectedPatient.name}
                      </h2>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        Blood: {selectedPatient.bloodGroup}
                      </span>
                      <Badge
                        status={selectedPatient.riskColor}
                        label={selectedPatient.riskLevel}
                        size="xs"
                        pulse={selectedPatient.riskColor === 'critical'}
                      />
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">
                        ABHA: {selectedPatient.abhaId}
                      </span>
                      <span>•</span>
                      <span>{selectedPatient.age} Years, {selectedPatient.gender}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {selectedPatient.primaryPhc} ({selectedPatient.village})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        ASHA: {selectedPatient.assignedAsha}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {selectedPatient.conditionTags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200/80 dark:border-teal-800 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate('/teleconsult')}
                      className="w-full py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Teleconsult</span>
                    </button>

                    <button
                      onClick={() => setShowVitalsModal(true)}
                      className="w-full py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <HeartPulse className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                      <span>Log Vitals</span>
                    </button>

                    <button
                      onClick={() => setShowNoteModal(true)}
                      className="w-full py-1.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                      <span>Add Note</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Latest Vitals Card Grid */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">
                      {t('vitalsTitle')}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {selectedPatient.latestVitals.recordedAt}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">Blood Pressure</div>
                    <div className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPatient.latestVitals.bp}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Target &lt;130/80</div>
                  </div>

                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">SpO2 Oxygen</div>
                    <div className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPatient.latestVitals.spo2}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Room Air</div>
                  </div>

                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">Heart Rate</div>
                    <div className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPatient.latestVitals.pulse}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Radial Pulse</div>
                  </div>

                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">Blood Sugar</div>
                    <div className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5 truncate">
                      {selectedPatient.latestVitals.bloodSugar}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Glucometer</div>
                  </div>

                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">Temperature</div>
                    <div className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPatient.latestVitals.temp}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Digital Oral</div>
                  </div>

                  <div className="p-2.5 rounded-lg border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">Growth / BMI</div>
                    <div className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5 truncate">
                      {selectedPatient.latestVitals.bmi}
                    </div>
                    <div className="text-[9px] font-medium text-slate-500">Anthropometry</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
                <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('timeline')}
                    className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-colors ${
                      activeTab === 'timeline'
                        ? 'border-teal-700 text-teal-900 dark:text-teal-300 bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    <span>Longitudinal Timeline ({selectedPatient.timeline.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('diagnostics')}
                    className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-colors ${
                      activeTab === 'diagnostics'
                        ? 'border-teal-700 text-teal-900 dark:text-teal-300 bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Pill className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    <span>Diagnostics & Active Rx</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('referrals')}
                    className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-colors ${
                      activeTab === 'referrals'
                        ? 'border-teal-700 text-teal-900 dark:text-teal-300 bg-white dark:bg-slate-900'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    <span>Referrals ({selectedPatient.referrals?.length || 0})</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5">
                  {activeTab === 'timeline' && (
                    <div className="space-y-4">
                      {selectedPatient.timeline.map((event) => (
                        <div
                          key={event.id}
                          className="p-4 rounded-xl border bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-xs text-teal-700 dark:text-teal-400">
                                <Stethoscope className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                                  {event.type.toUpperCase()}
                                </span>
                                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100">
                                  {event.title}
                                </h4>
                              </div>
                            </div>
                            <div className="text-right text-xs">
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{event.date}</span>
                              <div className="text-[10px] text-slate-500">{event.facility}</div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 bg-white/70 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                            {event.summary}
                          </p>

                          {event.prescription && (
                            <div className="mt-2.5 p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/90 dark:border-slate-700">
                              <div className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase mb-1.5 flex items-center gap-1">
                                <Pill className="w-3 h-3 text-teal-600" />
                                <span>Prescription Form (Rx):</span>
                              </div>
                              <div className="space-y-1">
                                {event.prescription.map((rx, rIdx) => (
                                  <div key={rIdx} className="text-xs flex items-center justify-between text-slate-800 dark:text-slate-200">
                                    <span className="font-semibold">{rx.drug}</span>
                                    <span className="text-slate-500">{rx.dosage} • {rx.days} days</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'diagnostics' && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Pharmacotherapy & Lab Registry</h4>
                      <p className="text-slate-600 dark:text-slate-400">Regular oral hypoglycemic and antihypertensive drugs verified by PHC Shirwal.</p>
                    </div>
                  )}

                  {activeTab === 'referrals' && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Tertiary Hospital Links</h4>
                      <p className="text-slate-600 dark:text-slate-400">Status synced with District Hospital Satara tertiary referral desk.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400">
              Select a patient from the list.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showVitalsModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                Log Field Vitals for {selectedPatient.name}
              </h3>
              <button onClick={() => setShowVitalsModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVitals} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Blood Pressure</label>
                  <input
                    type="text"
                    value={vitalsForm.bp}
                    onChange={e => setVitalsForm({ ...vitalsForm, bp: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Pulse (bpm)</label>
                  <input
                    type="text"
                    value={vitalsForm.pulse}
                    onChange={e => setVitalsForm({ ...vitalsForm, pulse: e.target.value })}
                    className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowVitalsModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNoteModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                Append Clinical Note
              </h3>
              <button onClick={() => setShowNoteModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Encounter Title</label>
                <input
                  type="text"
                  value={noteForm.title}
                  onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Assessment & Notes</label>
                <textarea
                  rows="3"
                  value={noteForm.summary}
                  onChange={e => setNoteForm({ ...noteForm, summary: e.target.value })}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
