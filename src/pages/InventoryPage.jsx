import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { DEPLETION_TRENDS } from '../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  Package,
  AlertTriangle,
  Clock,
  FileCheck,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Wrench,
  CheckCircle2,
  Building2,
  TrendingDown,
  Pill,
  ArrowUpDown
} from 'lucide-react';

export const InventoryPage = () => {
  const {
    inventory,
    reorderMedicine,
    equipment,
    scheduleEquipmentService,
    facilities,
    notify,
    theme,
    language,
    t
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState("all");

  const [showIndentModal, setShowIndentModal] = useState(false);
  const [indentItem, setIndentItem] = useState(null);
  const [indentQuantity, setIndentQuantity] = useState(500);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesFacility =
      selectedFacility === 'all' || item.facility === selectedFacility;

    return matchesSearch && matchesCategory && matchesFacility;
  });

  const totalItems = inventory.length;
  const criticalLowCount = inventory.filter(i => i.status === 'critical').length;
  const expiringSoonCount = inventory.filter(i => i.status === 'strained').length;
  const pendingRequisitions = 3;

  const handleOpenIndent = (item) => {
    setIndentItem(item);
    setIndentQuantity(item.reorderLevel * 2 || 500);
    setShowIndentModal(true);
  };

  const handleConfirmIndent = (e) => {
    e.preventDefault();
    if (indentItem) {
      reorderMedicine(indentItem.id, parseInt(indentQuantity) || 500);
      setShowIndentModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              National Essential Drugs List (EDL) & Medical Logistics Grid
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {language === 'mr' ? 'जिल्हा औषध साठा व वैद्यकीय उपकरण नोंदवही' : language === 'hi' ? 'जिला दवा भंडार एवं चिकित्सा उपकरण रजिस्ट्री' : 'District Medical Inventory & Equipment Registry'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time stock buffer telemetry, cold chain monitoring, and automated DVDMS indenting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              notify("Cold Chain Synced", "All 6 solar vaccine refrigerators (ILR) reporting within 2-8°C optimal range.");
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'कोल्ड चेन सिंक' : language === 'hi' ? 'कोल्ड चेन सिंक' : 'Sync Cold Chain'}</span>
          </button>

          <button
            onClick={() => {
              handleOpenIndent(inventory[1]);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'mr' ? 'नवीन मागणी (Indent)' : language === 'hi' ? 'नया इंडेंट बनाएँ' : 'Create Indent'}</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Items Tracked"
          value={`${totalItems} Drugs/Kits`}
          subtitle="NHM Essential Medicines List"
          icon={Package}
          trend="100% Batch Tracked"
          trendType="positive"
          variant="teal"
        />

        <StatCard
          title="Critical Low Stock"
          value={`${criticalLowCount} Items`}
          subtitle="Buffer below 20% threshold"
          icon={AlertTriangle}
          trend="Velhe PHC: ORS & Artesunate"
          trendType="negative"
          variant="rose"
        />

        <StatCard
          title="Expiring Soon (&lt; 90 Days)"
          value={`${expiringSoonCount} Batches`}
          subtitle="First-Expiry-First-Out (FEFO)"
          icon={Clock}
          trend="IFA tablets expiring Oct 2026"
          trendType="neutral"
          variant="amber"
        />

        <StatCard
          title="Pending Requisitions"
          value={`${pendingRequisitions} Indents`}
          subtitle="Awaiting District Warehouse dispatch"
          icon={FileCheck}
          trend="Avg dispatch ETA: 24 hrs"
          trendType="positive"
          variant="blue"
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by drug name, batch number, or therapeutic class..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value="all">All Categories</option>
              <option value="antibiotic">Antibiotics</option>
              <option value="child">Essential Child Health</option>
              <option value="maternal">Maternal Health (ANC / Oxytocin)</option>
              <option value="chronic">Chronic NCD / Diabetes / HTN</option>
              <option value="fluid">Critical Fluids & IV</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedFacility}
              onChange={e => setSelectedFacility(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none"
            >
              <option value="all">All Health Facilities</option>
              {facilities.map(f => (
                <option key={f.id} value={f.name}>{f.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
              Medicine Stock Reserves ({filteredInventory.length} Items Listed)
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            FEFO (First-Expiry, First-Out) Priority
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Medicine & Therapeutic Class</th>
                <th className="py-3 px-4">Facility / Center</th>
                <th className="py-3 px-4">Batch & Expiry</th>
                <th className="py-3 px-4">Stock Level (Buffer Bar)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Indent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInventory.map((item) => {
                const stockRatio = Math.min(100, Math.round((item.currentStock / item.reorderLevel) * 50));
                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{item.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{item.category} • {item.type}</div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {item.facility}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                      <div>Batch: {item.batchNo}</div>
                      <div className={`font-medium ${item.status === 'strained' ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500'}`}>
                        Exp: {item.expiryDate}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {item.currentStock.toLocaleString()} {item.unit}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          (Safe &gt; {item.reorderLevel})
                        </span>
                      </div>
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div
                          className={`h-full ${
                            item.status === 'critical'
                              ? 'bg-rose-600'
                              : item.status === 'strained'
                              ? 'bg-amber-500'
                              : 'bg-emerald-600'
                          }`}
                          style={{ width: `${Math.max(8, stockRatio)}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        status={item.status}
                        label={
                          item.status === 'optimal'
                            ? 'Optimal'
                            : item.status === 'strained'
                            ? 'Low / Near Expiry'
                            : 'Critical Stockout'
                        }
                        size="xs"
                        pulse={item.status === 'critical'}
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleOpenIndent(item)}
                        className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-colors ${
                          item.status === 'critical'
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        Reorder
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Equipment + Depletion Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                Biomedical Equipment Registry
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">Calibration & Service</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {equipment.map((eq) => (
              <div
                key={eq.id}
                className="p-3 bg-slate-50/70 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>{eq.name}</span>
                    <Badge status={eq.badge} label={eq.badge === 'optimal' ? 'Active' : 'Maintenance'} size="xs" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {eq.facility} • S/N: <span className="font-mono">{eq.serialNo}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                    Status: <span className="font-semibold text-slate-800 dark:text-slate-200">{eq.status}</span>
                  </div>
                </div>

                {eq.badge !== 'optimal' && (
                  <button
                    onClick={() => scheduleEquipmentService(eq.id)}
                    className="py-1 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-[11px] shrink-0 shadow-xs"
                  >
                    Service
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>Monthly Depletion vs Safe Threshold</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Identifies items requiring replenishment.
              </p>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">Aug 2026</span>
          </div>

          <div className="w-full h-72 pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPLETION_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="drug" tick={{ fill: theme === 'dark' ? '#94A3B8' : '#64748B', fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={40} />
                <YAxis tick={{ fill: theme === 'dark' ? '#94A3B8' : '#64748B', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.5rem',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="stock" name="Current Stock" fill="#0F766E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="safeLevel" name="Safe Reorder Level" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Indent Modal */}
      {showIndentModal && indentItem && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-base">
                  Issue Digital Requisition Voucher
                </h3>
              </div>
              <button onClick={() => setShowIndentModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmIndent} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{indentItem.name}</div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                  Destination: <span className="font-semibold text-slate-800 dark:text-slate-200">{indentItem.facility}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  Requested Quantity ({indentItem.unit})
                </label>
                <input
                  type="number"
                  value={indentQuantity}
                  onChange={e => setIndentQuantity(e.target.value)}
                  className="w-full p-2 border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold"
                  min="50"
                  required
                />
              </div>

              <div className="pt-3 border-t dark:border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowIndentModal(false)}
                  className="px-3 py-1.5 rounded-lg border dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorize Indent</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
