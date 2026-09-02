import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Ambulance,
  AlertTriangle,
  Package,
  Users,
  Activity,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Share2,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

export const SupervisorDashboard = () => {
  const {
    currentUser,
    facilities,
    referrals,
    inventory,
    ashaWorkers,
    notify,
    language
  } = useApp();

  const navigate = useNavigate();

  // Redistribution state
  const [redistributeModal, setRedistributeModal] = useState(false);
  const [sourceFac, setSourceFac] = useState("PHC Shirwal");
  const [targetFac, setTargetFac] = useState("Sub-Center Velhe");
  const [drugToTransfer, setDrugToTransfer] = useState("Oral Rehydration Salts (WHO formula) - 150 Sachets");

  const totalBeds = facilities.reduce((a, f) => a + f.bedsTotal, 0);
  const occupiedBeds = facilities.reduce((a, f) => a + f.bedsOccupied, 0);
  const overallBedPct = Math.round((occupiedBeds / totalBeds) * 100);

  const criticalShortages = inventory.filter(i => i.status === 'critical');
  const activeReferralsCount = referrals.filter(r => r.urgency === 'critical').length;

  const handleConfirmTransfer = (e) => {
    e.preventDefault();
    setRedistributeModal(false);
    notify("Emergency Stock Reallocated", `Authorized transfer of ${drugToTransfer} from ${sourceFac} to ${targetFac}. Delivery van dispatched.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Supervisor Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-white p-5 sm:p-6 rounded-2xl shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-blue-700/60 border border-blue-400/30">
                {language === 'mr' ? 'जिल्हा आरोग्य कार्यालय (DHO) • विभागीय नियंत्रण कक्ष' : language === 'hi' ? 'जिला स्वास्थ्य कार्यालय (DHO) • क्षेत्रीय नियंत्रण कक्ष' : 'District Health Office (DHO) • Cluster Command'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight mt-1">
              {language === 'mr' ? `स्वागत आहे, ${currentUser.name}` : language === 'hi' ? `स्वागत है, ${currentUser.name}` : `Welcome, ${currentUser.name}`}
            </h2>
            <p className="text-blue-200 text-xs mt-0.5">
              {language === 'mr' ? 'विभागीय आरोग्य पर्यवेक्षक • सातारा व पुणे ग्रामीण विभाग' : 'Regional Supervisor • Satara & Pune Rural Division • 6 Facilities, 4 ASHA Clusters'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setRedistributeModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{language === 'mr' ? 'औषध साठा पुनर्वितरण' : language === 'hi' ? 'दवा स्टॉक पुनर्वितरण' : 'Reallocate Medicine Stock'}</span>
          </button>

          <button
            onClick={() => navigate('/command-center')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-all"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{language === 'mr' ? 'विभागीय नकाशा' : language === 'hi' ? 'क्षेत्रीय मानचित्र' : 'Regional Map'}</span>
          </button>
        </div>
      </div>

      {/* 4 Supervisor Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cluster Bed Occupancy"
          value={`${occupiedBeds}/${totalBeds}`}
          subtitle={`${overallBedPct}% Cluster Utilization`}
          icon={Building2}
          trend="Satara DH: 204/250"
          trendType="neutral"
          variant="teal"
        />

        <StatCard
          title="Critical 108 Escalations"
          value={`${activeReferralsCount} In Transit`}
          subtitle="Golden-hour STEMI & High-Risk ANC"
          icon={Ambulance}
          trend="Avg Response: 14m"
          trendType="negative"
          variant="rose"
        />

        <StatCard
          title="Critical Stockouts"
          value={`${criticalShortages.length} Batches`}
          subtitle="ORS & Artesunate depleted at Velhe"
          icon={Package}
          trend="Immediate Indent Needed"
          trendType="negative"
          variant="amber"
        />

        <StatCard
          title="ASHA Field Doorstep Target"
          value="89.3%"
          subtitle="983/1,100 Households Covered"
          icon={Users}
          trend="+5.1% vs last month"
          trendType="positive"
          variant="blue"
        />
      </div>

      {/* Grid: Facility Capacity Grid + Stockout & Reallocation Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Facility Capacity Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Cluster Facility Capacity & Preparedness Matrix</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Live bed occupancy, doctor on duty, and oxygen cylinders ready
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">6 Centers</span>
          </div>

          <div className="space-y-3">
            {facilities.map((fac) => {
              const bedPct = Math.round((fac.bedsOccupied / fac.bedsTotal) * 100);
              return (
                <div
                  key={fac.id}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {fac.name}
                      </span>
                      <span className="text-slate-500">({fac.type})</span>
                      <Badge status={fac.status} label={fac.status.toUpperCase()} size="xs" />
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 mt-1">
                      Doctor on Duty: <span className="font-semibold text-slate-800 dark:text-slate-200">{fac.doctorOnDuty}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Oxygen: {fac.oxygenCylinders} Cylinders • Ambulances: {fac.ambulanceAvailable} Available
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {fac.bedsOccupied} / {fac.bedsTotal} Beds ({bedPct}%)
                    </div>
                    <div className="w-28 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className={`h-full ${bedPct > 90 ? 'bg-rose-500' : bedPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${bedPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold block mt-1">
                      {fac.medicineStockPct}% Drug Buffer
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Critical Stockout & Inter-Facility Redistribution Hub (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Critical Drug Stockouts in Cluster
                </h4>
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                Action Required
              </span>
            </div>

            <div className="space-y-2.5">
              {criticalShortages.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-rose-50/40 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 rounded-xl text-xs space-y-1.5"
                >
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>{item.name}</span>
                    <span className="text-rose-700 dark:text-rose-400">{item.currentStock} {item.unit} Left</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-[11px]">
                    Location: <span className="font-semibold text-slate-800 dark:text-slate-200">{item.facility}</span> • Reorder Threshold: {item.reorderLevel}
                  </div>
                  <button
                    onClick={() => {
                      setTargetFac(item.facility);
                      setDrugToTransfer(`${item.name} - 250 Units`);
                      setRedistributeModal(true);
                    }}
                    className="w-full mt-1 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-teal-800 dark:text-teal-400 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Authorize Transfer from PHC Shirwal</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ASHA Performance Leaderboard */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Cluster ASHA Mobilization Audit</span>
              </h4>
              <button
                onClick={() => navigate('/asha')}
                className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                All Cadres →
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {ashaWorkers.map((w) => (
                <div key={w.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{w.name}</div>
                    <div className="text-[10px] text-slate-500">{w.cluster}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">{w.visitTargetPct}%</span>
                    <span className="text-[10px] text-slate-500 block">{w.householdsVisitedMonth} visited</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inter-Facility Redistribution Modal */}
      {redistributeModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Authorize Inter-Facility Drug Transfer
                </h3>
              </div>
              <button onClick={() => setRedistributeModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Source Health Center (Surplus)</label>
                <select
                  value={sourceFac}
                  onChange={e => setSourceFac(e.target.value)}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option>PHC Shirwal (Surplus Stock)</option>
                  <option>District Hospital Satara Central Depot</option>
                  <option>CHC Khandala Surgical Store</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Destination Facility (Depleted)</label>
                <input
                  type="text"
                  value={targetFac}
                  readOnly
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Item & Quantity</label>
                <input
                  type="text"
                  value={drugToTransfer}
                  onChange={e => setDrugToTransfer(e.target.value)}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-[11px] text-blue-900 dark:text-blue-300">
                Digital transfer voucher will be countersigned and dispatched via the Satara Rural Feeder Vehicle.
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRedistributeModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorize & Dispatch Delivery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
