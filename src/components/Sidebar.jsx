import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AVAILABLE_ROLES } from '../data/mockData';
import {
  LayoutDashboard,
  Users,
  Video,
  BarChart3,
  Package,
  AlertOctagon,
  HeartPulse,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Globe,
  Radio,
  ShieldCheck,
  Building2,
  Stethoscope,
  UserCheck,
  Sun,
  Moon,
  Compass,
  X
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const {
    currentUser,
    switchRole,
    language,
    setLanguage,
    toggleLanguage,
    t,
    theme,
    toggleTheme,
    getDashboardPath,
    referrals,
    inventory,
    logout,
    teleconsultCall,
    num
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const navigate = useNavigate();

  const criticalCount = referrals.filter(r => r.urgency === 'critical').length;
  const lowStockCount = inventory.filter(i => i.status === 'critical').length;

  const roleDashboard = {
    to: getDashboardPath(),
    label: currentUser.role === 'doctor'
      ? (language === 'mr' ? 'वैद्यकीय अधिकारी डॅशबोर्ड' : language === 'hi' ? 'चिकित्सक डैशबोर्ड' : 'Doctor Dashboard')
      : currentUser.role === 'supervisor'
      ? (language === 'mr' ? 'पर्यवेक्षक डॅशबोर्ड' : language === 'hi' ? 'पर्यवेक्षक डैशबोर्ड' : 'Supervisor Dashboard')
      : currentUser.role === 'patient'
      ? (language === 'mr' ? 'माझा रुग्ण डॅशबोर्ड' : language === 'hi' ? 'मेरा मरीज़ डैशबोर्ड' : 'Patient Health Portal')
      : (language === 'mr' ? 'आशा स्वयंसेविका स्टेशन' : language === 'hi' ? 'आशा कार्यकर्ता स्टेशन' : 'ASHA Field Station'),
    icon: currentUser.role === 'doctor' ? Stethoscope : currentUser.role === 'supervisor' ? Building2 : currentUser.role === 'patient' ? UserCheck : HeartPulse,
    badge: 'My Role'
  };

  const navItems = [
    roleDashboard,
    {
      to: '/dashboard/patient',
      label: t('patientDashboard'),
      icon: UserCheck,
      badge: language === 'mr' ? 'नागरिक' : language === 'hi' ? 'मरीज़' : 'Citizen',
      badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300'
    },
    {
      to: '/command-center',
      label: t('commandCenter'),
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/patients',
      label: t('patientRecords'),
      icon: Users,
      badge: `${num(6)} ${language === 'mr' ? 'सक्रिय' : language === 'hi' ? 'सक्रिय' : 'Active'}`
    },
    {
      to: '/teleconsult',
      label: t('teleconsultation'),
      icon: Video,
      badge: teleconsultCall.isActive ? (language === 'mr' ? 'थेट' : language === 'hi' ? 'लाइव' : 'LIVE') : null,
      pulse: teleconsultCall.isActive
    },
    {
      to: '/analytics',
      label: t('analytics'),
      icon: BarChart3,
      badge: null
    },
    {
      to: '/inventory',
      label: t('inventory'),
      icon: Package,
      badge: lowStockCount > 0 ? `${num(lowStockCount)} ${language === 'mr' ? 'कमी साठा' : language === 'hi' ? 'कम' : 'Low'}` : null,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
    },
    {
      to: '/emergency',
      label: t('emergency'),
      icon: AlertOctagon,
      badge: criticalCount > 0 ? `${num(criticalCount)} ${language === 'mr' ? 'तातडीचे' : language === 'hi' ? 'आपातकाल' : 'Urgent'}` : null,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold dark:bg-rose-950/70 dark:text-rose-300',
      pulse: criticalCount > 0
    },
    {
      to: '/asha',
      label: t('ashaField'),
      icon: HeartPulse,
      badge: 'Field'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-teal-700/20">
              <HeartPulse className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                  {language === 'mr' ? 'सेवासेतू' : language === 'hi' ? 'सेवासेतु' : 'SevaSetu'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 font-bold uppercase rounded bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                  NHM Ops
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[160px]">
                {language === 'mr' ? 'ग्रामीण आरोग्य संचालन' : language === 'hi' ? 'ग्रामीण स्वास्थ्य संचालन' : 'Rural Health Operations'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card with Persona Switcher */}
        <div className="p-3.5 mx-3 mt-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/90 dark:border-slate-700/80">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-600/30 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 truncate">
                  {currentUser.roleTitle}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                  <Building2 className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{currentUser.facility}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="p-1 rounded text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Switch Persona"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${roleMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Quick Role Switcher Dropdown */}
          {roleMenuOpen && (
            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700 text-xs">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Switch Operational Persona:
              </p>
              <div className="space-y-1">
                {AVAILABLE_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      switchRole(role.id);
                      setRoleMenuOpen(false);
                      navigate(getDashboardPath(role.id));
                    }}
                    className={`w-full text-left p-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      currentUser.role === role.id
                        ? 'bg-teal-700 text-white font-medium shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <div className="truncate">
                      <div className="font-semibold text-[11px]">
                        {language === 'mr' ? (role.titleMarathi || role.title) : language === 'hi' ? (role.titleHindi || role.title) : role.title}
                      </div>
                      <div className={`text-[10px] ${currentUser.role === role.id ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {language === 'mr' && role.nameMarathi ? role.nameMarathi : language === 'hi' && role.nameHindi ? role.nameHindi : role.name}
                      </div>
                    </div>
                    {currentUser.role === role.id && (
                      <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                        ACTIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Theme & Language & Network Status Bar */}
          <div className="mt-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5 bg-white dark:bg-slate-700 p-0.5 rounded border border-slate-200 dark:border-slate-600 text-[10px] font-bold">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-1.5 py-0.5 rounded transition-all ${language === 'en' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-teal-700'}`}
                  title="English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-1.5 py-0.5 rounded transition-all ${language === 'hi' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-teal-700'}`}
                  title="हिन्दी"
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLanguage('mr')}
                  className={`px-1.5 py-0.5 rounded transition-all ${language === 'mr' ? 'bg-teal-700 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-teal-700'}`}
                  title="मराठी"
                >
                  मराठी
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center p-1 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-amber-300 transition-colors"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>

            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded text-[10px] font-medium border border-emerald-200 dark:border-emerald-800">
              <Radio className="w-2.5 h-2.5 text-emerald-600" />
              <span>Online • Sync OK</span>
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm shadow-teal-700/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.pulse && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
                        )}
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Pinned Footer: Support, Helpline & Logout */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 space-y-2">
          <div className="p-2 bg-teal-50/60 dark:bg-teal-950/40 rounded-lg border border-teal-200/70 dark:border-teal-800/60 text-[11px] text-teal-900 dark:text-teal-200">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                Emergency Hotline
              </span>
              <span className="text-teal-800 dark:text-teal-300 font-mono">108 / 104</span>
            </div>
            <p className="text-[10px] text-teal-700/90 dark:text-teal-400/90 mt-0.5">
              Toll-free 24x7 Ambulance & Health Helpline
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <button
              onClick={() => {
                alert("SevaSetu System Settings:\n• REST API: http://localhost:5000\n• eSanjeevani Teleconsult Protocol v2.4\n• ABDM FHIR Core Integration Ready\n• Mode: " + theme.toUpperCase());
              }}
              className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-200 font-medium py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{t('settings')}</span>
            </button>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 font-medium py-1 px-2 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
