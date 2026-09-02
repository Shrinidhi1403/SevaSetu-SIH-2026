import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  AlertTriangle,
  Video,
  Globe,
  Radio,
  X,
  PhoneCall,
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';

export const Header = ({ onOpenMobileSidebar, title, subtitle }) => {
  const {
    currentUser,
    switchRole,
    language,
    setLanguage,
    toggleLanguage,
    theme,
    toggleTheme,
    getDashboardPath,
    systemAlerts,
    referrals,
    teleconsultCall,
    patients,
    setSelectedPatientId,
    num,
    locName,
    locVillage
  } = useApp();

  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  const criticalReferrals = referrals.filter(r => r.urgency === 'critical');

  const filteredPatients = searchQuery.trim()
    ? patients.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.abhaId.includes(searchQuery) ||
        p.village.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSwitchPersona = (roleId) => {
    switchRole(roleId);
    navigate(getDashboardPath(roleId));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              <span>{title}</span>
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center: Quick Search Trigger */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <div
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xs shadow-xs transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="truncate">Search patient by ABHA ID, name, or village...</span>
            <kbd className="ml-auto text-[10px] bg-slate-200/80 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono">
              /
            </kbd>
          </div>
        </div>

        {/* Right: Quick Role Pills, Teleconsult button, Emergency Alert, Theme, Notifications */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Persona Switcher Chips */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px]">
            <button
              onClick={() => handleSwitchPersona('doctor')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentUser.role === 'doctor'
                  ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {language === 'mr' ? 'वैद्यकीय अधिकारी' : language === 'hi' ? 'चिकित्सक' : 'Doctor'}
            </button>
            <button
              onClick={() => handleSwitchPersona('supervisor')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentUser.role === 'supervisor'
                  ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {language === 'mr' ? 'पर्यवेक्षक' : language === 'hi' ? 'पर्यवेक्षक' : 'Supervisor'}
            </button>
            <button
              onClick={() => handleSwitchPersona('asha')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentUser.role === 'asha'
                  ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {language === 'mr' ? 'आशा स्वयंसेविका' : language === 'hi' ? 'आशा' : 'ASHA Worker'}
            </button>
            <button
              onClick={() => handleSwitchPersona('patient')}
              className={`px-2 py-1 rounded font-medium transition-all ${
                currentUser.role === 'patient'
                  ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {language === 'mr' ? 'रुग्ण / नागरिक' : language === 'hi' ? 'मरीज़ / नागरिक' : 'Patient'}
            </button>
          </div>

          {/* Dedicated 3-Way Multilingual Selector in Header */}
          <div className="flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px]">
            <Globe className="w-3.5 h-3.5 text-teal-600 ml-1 mr-0.5 shrink-0 hidden sm:inline" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded font-bold transition-all text-[10px] ${
                language === 'en'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 rounded font-bold transition-all text-[10px] ${
                language === 'hi'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title="हिन्दी"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-1.5 py-0.5 rounded font-bold transition-all text-[10px] ${
                language === 'mr'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title="मराठी"
            >
              मराठी
            </button>
          </div>

          {/* Active Teleconsult Button */}
          {teleconsultCall.isActive && (
            <button
              onClick={() => navigate('/teleconsult')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold hover:bg-teal-100 transition-colors animate-pulse"
            >
              <Video className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span>Call Live</span>
            </button>
          )}

          {/* Emergency Escalation Button */}
          {criticalReferrals.length > 0 && (
            <button
              onClick={() => navigate('/emergency')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-bounce" />
              <span>
                {num(criticalReferrals.length)} {language === 'mr' ? '१०८ तातडीचे' : language === 'hi' ? '108 आपातकालीन' : 'Critical 108'}
              </span>
            </button>
          )}

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* System Alerts Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="System Alerts"
            >
              <Bell className="w-4 h-4" />
              {systemAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {showAlertsDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-elevated border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="font-heading font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Active System Alerts ({systemAlerts.length})
                  </div>
                  <button
                    onClick={() => setShowAlertsDropdown(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                  {systemAlerts.map(alert => (
                    <div key={alert.id} className="py-2.5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${
                          alert.severity === 'critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                        }`}>
                          {alert.facility}
                        </span>
                        <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                      </div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">{alert.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{alert.description}</p>
                      <button
                        onClick={() => {
                          alert(`Action Triggered: ${alert.action}`);
                          setShowAlertsDropdown(false);
                        }}
                        className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 hover:underline pt-0.5"
                      >
                        Action: {alert.action} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Patient Search Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-50 flex items-start justify-center pt-20 px-4 backdrop-blur-xs"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Type ABHA ID, patient name (e.g. Ramesh, Sunita), or village..."
                className="w-full text-sm outline-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 max-h-96 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Search by Ayushman Bharat Health Account (ABHA ID), phone number, or symptoms.
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No matching patients found in Pune-Satara rural division.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredPatients.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedPatientId(p.id);
                        setShowSearchModal(false);
                        navigate('/patients');
                      }}
                      className="p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{locName(p)}</span>
                          <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
                            ABHA: {num(p.abhaId)}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {num(p.age)} {language === 'mr' ? 'वर्षे' : language === 'hi' ? 'वर्ष' : 'yrs'} • {locVillage(p)} • {locName(p.primaryPhc)}
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                        View Chart →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
