import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { PatientRecordsPage } from './pages/PatientRecordsPage';
import { TeleconsultationPage } from './pages/TeleconsultationPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { InventoryPage } from './pages/InventoryPage';
import { EmergencyEscalationPage } from './pages/EmergencyEscalationPage';
import { AshaFieldOverviewPage } from './pages/AshaFieldOverviewPage';

// Persona Dashboards
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { SupervisorDashboard } from './pages/dashboards/SupervisorDashboard';
import { AshaDashboard } from './pages/dashboards/AshaDashboard';

// Route Guard
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Dynamic Home Redirect based on user's role
const DynamicHomeRedirect = () => {
  const { getDashboardPath } = useApp();
  return <Navigate to={getDashboardPath()} replace />;
};

export const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login & Onboarding */}
          <Route path="/login" element={<LoginPage />} />

          {/* Internal Authenticated Pages with persistent sidebar */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Index dynamically routes to Doctor / Supervisor / ASHA dashboard */}
            <Route index element={<DynamicHomeRedirect />} />

            {/* Persona Dashboards */}
            <Route path="dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="dashboard/supervisor" element={<SupervisorDashboard />} />
            <Route path="dashboard/asha" element={<AshaDashboard />} />

            {/* Core Modules */}
            <Route path="command-center" element={<CommandCenterPage />} />
            <Route path="patients" element={<PatientRecordsPage />} />
            <Route path="teleconsult" element={<TeleconsultationPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="emergency" element={<EmergencyEscalationPage />} />
            <Route path="asha" element={<AshaFieldOverviewPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<DynamicHomeRedirect />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
