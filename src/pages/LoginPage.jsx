import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AVAILABLE_ROLES } from '../data/mockData';
import {
  HeartPulse,
  Phone,
  ShieldCheck,
  Globe,
  ArrowRight,
  Stethoscope,
  Building2,
  Users,
  CheckCircle2,
  Lock,
  Sun,
  Moon
} from 'lucide-react';

export const LoginPage = () => {
  const { login, language, toggleLanguage, theme, toggleTheme, getDashboardPath, t } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('doctor');
  const [phoneNumber, setPhoneNumber] = useState('98230 45120');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setOtp('734912'); // autofill realistic simulated OTP
    }, 500);
  };

  const handleVerifyLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(selectedRole, `+91 ${phoneNumber}`, otp);
      navigate(getDashboardPath(selectedRole));
    }, 500);
  };

  const handleQuickDemoLogin = (roleId) => {
    const roleObj = AVAILABLE_ROLES.find(r => r.id === roleId);
    if (roleObj) {
      login(roleId, roleObj.phone, '734912');
      navigate(getDashboardPath(roleId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-teal-50/40 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col justify-between transition-colors">
      {/* Top Navbar */}
      <nav className="px-6 py-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-md">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {language === 'hi' ? 'सेवासेतु' : 'SevaSetu'}
            </span>
            <span className="ml-2 text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-800">
              ABHA & NHM Rural Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs transition-colors"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <span>{language === 'en' ? 'हिन्दी में बदलें' : 'English'}</span>
          </button>
        </div>
      </nav>

      {/* Main Login Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-elevated overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-slate-900 p-6 sm:p-8 text-white relative">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-600/50 border border-teal-400/30 text-[11px] font-medium tracking-wide mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-200" />
                <span>Ayushman Bharat Digital Mission (ABDM) Compliant</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                {language === 'hi' ? 'ग्रामीण स्वास्थ्य सेवा लॉगिन' : 'Rural Health Operations Portal'}
              </h2>
              <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-md">
                Secure Unified Authentication for PHC Doctors, Regional Supervisors, and ASHA Field Workers across District Clusters.
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <HeartPulse className="w-64 h-64 -mr-16 -mb-16" />
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                {language === 'hi' ? '१. अपनी भूमिका चुनें (Role Selector)' : '1. Select Operational Role'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {AVAILABLE_ROLES.map((role) => {
                  const isSelected = selectedRole === role.id;
                  const icons = {
                    doctor: Stethoscope,
                    supervisor: Building2,
                    asha: Users
                  };
                  const Icon = icons[role.id] || Stethoscope;

                  return (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-150 relative ${
                        isSelected
                          ? 'border-teal-700 bg-teal-50/50 dark:bg-teal-950/40 ring-2 ring-teal-600/20 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />}
                      </div>
                      <div className="font-heading font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight">
                        {language === 'hi' ? role.titleHindi : role.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {role.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phone + OTP Form */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                {language === 'hi' ? '२. मोबाइल नंबर एवं OTP सत्यापन' : '2. Mobile Number & OTP Verification'}
              </label>

              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 dark:text-slate-400 font-semibold text-xs border-r pr-2 my-2 border-slate-200 dark:border-slate-700">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="98230 45120"
                        maxLength="14"
                        className="w-full pl-16 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono"
                        required
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      ABHA-linked SIM card will receive an instant 6-digit one-time passcode.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin">⏳</span>
                    ) : (
                      <>
                        <span>Send Verification OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyLogin} className="space-y-4">
                  <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-2.5 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <span>OTP sent to +91 {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-teal-700 dark:text-teal-400 font-bold underline text-[11px]"
                    >
                      Change Number
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Enter 6-Digit OTP (Pre-filled for Sandbox)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="734912"
                        maxLength="6"
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600 tracking-widest font-mono text-center font-bold"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    {loading ? "Verifying Credentials..." : "Verify & Launch Role Dashboard"}
                  </button>
                </form>
              )}
            </div>

            {/* 1-Click Fast Sandbox Access for Evaluators */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center mb-2.5">
                ⚡ Instant Evaluator Access (1-Click Persona Launch)
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('doctor')}
                  className="p-2 text-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <div className="font-bold text-teal-800 dark:text-teal-400 text-[11px]">Dr. Ananya</div>
                  <div className="text-[10px] text-slate-500">Doctor Dashboard</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('supervisor')}
                  className="p-2 text-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <div className="font-bold text-teal-800 dark:text-teal-400 text-[11px]">Dr. Sharma</div>
                  <div className="text-[10px] text-slate-500">Supervisor Command</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('asha')}
                  className="p-2 text-center rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-600 hover:bg-teal-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <div className="font-bold text-teal-800 dark:text-teal-400 text-[11px]">Sunita Kamble</div>
                  <div className="text-[10px] text-slate-500">ASHA Station</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70">
        <p>SevaSetu Rural Health Grid • National Health Mission (NHM) • Government of India</p>
      </footer>
    </div>
  );
};
