import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from './ToastContainer';
import { useApp } from '../context/AppContext';

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useApp();

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard/doctor':
        return {
          title: language === 'hi' ? 'चिकित्सक दैनिक ओपीडी एवं परामर्श स्टेशन' : 'Doctor Clinical Station & Tele-OPD',
          subtitle: "PHC Shirwal Daily OPD Queue, eSanjeevani Teleconsultations & Vitals Critical Watch"
        };
      case '/dashboard/supervisor':
        return {
          title: language === 'hi' ? 'क्षेत्रीय स्वास्थ्य पर्यवेक्षक कमांड कक्ष' : 'Regional Supervisor Command & Logistics',
          subtitle: "District Health Office (DHO) Cluster Capacity, 108 Ambulances & Stock Redistribution"
        };
      case '/dashboard/asha':
        return {
          title: language === 'hi' ? 'आशा कार्यकर्ता ग्राम स्वास्थ्य स्टेशन' : 'ASHA Frontline Field Station',
          subtitle: "Doorstep Screening Itinerary, High-Risk Maternal ANC & Offline Tablet Queue"
        };
      case '/':
      case '/command-center':
        return {
          title: t('commandCenter'),
          subtitle: "Regional Health Operations, Facility Status & Real-time Grid Telemetry"
        };
      case '/patients':
        return {
          title: t('patientRecords'),
          subtitle: "ABHA Unified Health IDs, Longitudinal Diagnostics & Clinical Timelines"
        };
      case '/teleconsult':
        return {
          title: t('teleconsultation'),
          subtitle: "Adaptive Low-Bandwidth eSanjeevani Video Clinic & Live Clinical Triage"
        };
      case '/analytics':
        return {
          title: t('analytics'),
          subtitle: "Epidemiological Trends, Referral Outcomes & Resource Utilization Rates"
        };
      case '/inventory':
        return {
          title: t('inventory'),
          subtitle: "Essential Drugs List (EDL), Cold-Chain Monitoring & Stock Requisitions"
        };
      case '/emergency':
        return {
          title: t('emergency'),
          subtitle: "Dial 108 Emergency Queue, Golden-Hour Triage & Tertiary Facility Matcher"
        };
      case '/asha':
        return {
          title: t('ashaField'),
          subtitle: "Grassroots Healthcare Tracking, VHSND Outreach & Doorstep NCD Screenings"
        };
      default:
        return {
          title: "SevaSetu Rural Health",
          subtitle: "National Rural Healthcare Operations Platform"
        };
    }
  };

  const meta = getPageMeta();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors">
      {/* Persistent Left Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <Header
          onOpenMobileSidebar={() => setMobileOpen(true)}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
