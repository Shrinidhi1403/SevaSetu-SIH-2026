import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from './Badge';
import {
  Building2,
  Ambulance,
  PhoneCall,
  Activity,
  BedDouble,
  Wind,
  Layers,
  MapPin,
  Clock,
  ExternalLink,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InteractiveFacilityMap = ({
  height = "h-[440px]",
  interactive = true,
  onSelectFacility = null,
  showAmbulanceRoutes = true
}) => {
  const { facilities, referrals } = useApp();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [showModal, setShowModal] = useState(false);

  const filteredFacilities = facilities.filter(f => {
    if (filterStatus === 'all') return true;
    return f.status === filterStatus;
  });

  const activeAmbulances = referrals.filter(r => r.status.includes('Transit') || r.status.includes('Dispatched'));

  const handleFacilityClick = (fac) => {
    setSelectedFacility(fac);
    setShowModal(true);
    if (onSelectFacility) {
      onSelectFacility(fac);
    }
  };

  return (
    <div className={`relative w-full ${height} bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-card flex flex-col`}>
      {/* Map Top Bar Controls */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-200">
          <Layers className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-semibold text-slate-100">Pune-Satara Rural Health Corridor</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Live Grid View</span>
        </div>

        {/* Filter Pills */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-lg border border-slate-700 text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2 py-1 rounded transition-colors ${
              filterStatus === 'all'
                ? 'bg-teal-700 text-white font-medium'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All ({facilities.length})
          </button>
          <button
            onClick={() => setFilterStatus('optimal')}
            className={`px-2 py-1 rounded transition-colors ${
              filterStatus === 'optimal'
                ? 'bg-emerald-600 text-white font-medium'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Optimal
          </button>
          <button
            onClick={() => setFilterStatus('strained')}
            className={`px-2 py-1 rounded transition-colors ${
              filterStatus === 'strained'
                ? 'bg-amber-600 text-white font-medium'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Strained
          </button>
          <button
            onClick={() => setFilterStatus('critical')}
            className={`px-2 py-1 rounded transition-colors ${
              filterStatus === 'critical'
                ? 'bg-rose-600 text-white font-medium'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Critical
          </button>
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative flex-1 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* District terrain backdrop & grid texture */}
        <svg className="w-full h-full" viewBox="0 0 1000 650" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.4" strokeOpacity="0.5" />
            </pattern>
            <linearGradient id="corridorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F766E" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid pattern overlay */}
          <rect width="1000" height="650" fill="url(#grid)" />

          {/* Stylized Rural District Boundary contour (Pune/Satara foothills) */}
          <path
            d="M 120 150 Q 250 80 480 110 T 820 160 Q 920 280 880 480 T 640 580 Q 420 620 220 540 T 100 360 Z"
            fill="#0F172A"
            fillOpacity="0.7"
            stroke="#1E293B"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Highway & Referral Corridors (NH-48 & State Highways) */}
          <g stroke="#334155" strokeWidth="2" strokeDasharray="6 4" fill="none">
            {/* Velhe to Bhor */}
            <line x1="220" y1="440" x2="440" y2="140" />
            {/* Bhor to Shirwal */}
            <line x1="440" y1="140" x2="380" y2="280" />
            {/* Shirwal to Khandala */}
            <line x1="380" y1="280" x2="620" y2="210" />
            {/* Khandala to Satara District */}
            <line x1="620" y1="210" x2="740" y2="500" />
            {/* Kikvi to Shirwal */}
            <line x1="480" y1="390" x2="380" y2="280" />
            {/* Kikvi to Satara Express route */}
            <line x1="480" y1="390" x2="740" y2="500" stroke="#0F766E" strokeWidth="2.5" strokeDasharray="none" />
          </g>

          {/* Live active referral ambulance transit route glow */}
          {showAmbulanceRoutes && (
            <g>
              <path
                d="M 480 390 Q 610 430 740 500"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
              <path
                d="M 620 210 Q 690 340 740 500"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            </g>
          )}

          {/* Facilities SVG nodes */}
          {filteredFacilities.map((fac) => {
            const cx = fac.coordinates.x * 10;
            const cy = fac.coordinates.y * 6.5;
            const isSelected = selectedFacility?.id === fac.id;
            const statusColor =
              fac.status === 'optimal'
                ? '#10B981'
                : fac.status === 'strained'
                ? '#F59E0B'
                : '#EF4444';

            return (
              <g
                key={fac.id}
                onClick={() => handleFacilityClick(fac)}
                className="cursor-pointer group"
                transform={`translate(${cx}, ${cy})`}
              >
                {/* Outer pulsing ring for critical/selected */}
                {(fac.status === 'critical' || isSelected) && (
                  <circle
                    r="24"
                    fill={statusColor}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}
                {/* Secondary halo */}
                <circle
                  r={isSelected ? "18" : "14"}
                  fill="#0F172A"
                  stroke={statusColor}
                  strokeWidth={isSelected ? "3" : "2"}
                  filter="url(#glow)"
                />
                {/* Center dot */}
                <circle
                  r={isSelected ? "7" : "5"}
                  fill={statusColor}
                />

                {/* Facility Label */}
                <g transform="translate(18, 4)">
                  <rect
                    x="-4"
                    y="-14"
                    width={fac.name.length * 7.5 + 20}
                    height="20"
                    rx="4"
                    fill="#020617"
                    fillOpacity="0.85"
                    stroke="#334155"
                    strokeWidth="0.8"
                  />
                  <text
                    x="2"
                    y="0"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                  >
                    {fac.name}
                  </text>
                  <circle
                    cx={fac.name.length * 7.5 + 8}
                    cy="-4"
                    r="3.5"
                    fill={statusColor}
                  />
                </g>
              </g>
            );
          })}

          {/* Animated 108 Ambulance Markers on route */}
          {showAmbulanceRoutes && (
            <g transform="translate(610, 445)">
              <circle r="12" fill="#DC2626" fillOpacity="0.3" className="animate-ping" />
              <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="-6" y="4" fill="#FFFFFF" fontSize="10" fontWeight="bold">108</text>
            </g>
          )}
        </svg>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[11px] text-slate-300 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span>Optimal (&gt;85% Stock)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
            <span>Strained (60-85%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            <span>Critical (&lt;60%)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-600 inline-block"></span>
            <span>108 Ambulance en route</span>
          </div>
        </div>

        {/* Quick Facility Details Drawer / Modal */}
        {selectedFacility && showModal && (
          <div className="absolute top-3 right-3 bottom-3 w-72 sm:w-80 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-elevated border border-slate-200 z-30 flex flex-col justify-between animate-in slide-in-from-right-4 duration-200">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <Badge
                    status={selectedFacility.status}
                    label={selectedFacility.status.toUpperCase()}
                    size="xs"
                    pulse={selectedFacility.status === 'critical'}
                  />
                  <h4 className="font-heading font-bold text-slate-900 text-lg mt-1">
                    {selectedFacility.name}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedFacility.type} • {selectedFacility.block}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3.5 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <BedDouble className="w-3.5 h-3.5 text-slate-400" /> Bed Occupancy
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedFacility.bedsOccupied} / {selectedFacility.bedsTotal} beds (
                    {Math.round((selectedFacility.bedsOccupied / selectedFacility.bedsTotal) * 100)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Wind className="w-3.5 h-3.5 text-slate-400" /> Oxygen Reserves
                  </span>
                  <span className="font-semibold text-slate-800">
                    {selectedFacility.oxygenCylinders} Cylinders Ready
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Ambulance className="w-3.5 h-3.5 text-slate-400" /> Ambulances On-Site
                  </span>
                  <span className={`font-semibold ${selectedFacility.ambulanceAvailable > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {selectedFacility.ambulanceAvailable} Available
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Avg OPD Wait Time
                  </span>
                  <span className="font-semibold text-slate-800">{selectedFacility.avgWaitTimeMin} mins</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Activity className="w-3.5 h-3.5 text-slate-400" /> Essential Drugs
                  </span>
                  <span className="font-semibold text-slate-800">{selectedFacility.medicineStockPct}%</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 mt-2">
                  <div className="text-[11px] font-medium text-slate-500">Doctor on Duty:</div>
                  <div className="font-semibold text-slate-800">{selectedFacility.doctorOnDuty}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Network: {selectedFacility.networkBandwidth}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => {
                  navigate('/emergency');
                }}
                className="flex-1 text-xs py-2 px-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Ambulance className="w-3.5 h-3.5" />
                Refer Patient
              </button>
              <button
                onClick={() => {
                  navigate('/inventory');
                }}
                className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Stock
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
