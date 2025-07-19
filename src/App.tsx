
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Appointments from './pages/Appointments';
import Insurance from './pages/Insurance';
import Hospitals from './pages/Hospitals';
import Labs from './pages/Labs';
import Pharmacy from './pages/Pharmacy';
import Telemedicine from './pages/Telemedicine';
import Resources from './pages/Resources';
import Records from './pages/Records';
import Emergency from './pages/Emergency';
import Diagnostics from './pages/Diagnostics';
import Pediatric from './pages/Pediatric';
import Premium from './pages/Premium';
import AdminDashboard from './pages/AdminDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import BrokerDashboard from './pages/BrokerDashboard';
import MLAnalyticsPage from './pages/MLAnalytics';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import OnboardingProtectedRoute from './components/OnboardingProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              
              {/* Main Dashboard Routes */}
              <Route path="/dashboard" element={
                <OnboardingProtectedRoute>
                  <Dashboard />
                </OnboardingProtectedRoute>
              } />
              
              {/* Service Routes */}
              <Route path="/appointments" element={
                <OnboardingProtectedRoute>
                  <Appointments />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/insurance" element={
                <OnboardingProtectedRoute>
                  <Insurance />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/hospitals" element={
                <OnboardingProtectedRoute>
                  <Hospitals />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/labs" element={
                <OnboardingProtectedRoute>
                  <Labs />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/pharmacy" element={
                <OnboardingProtectedRoute>
                  <Pharmacy />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/telemedicine" element={
                <OnboardingProtectedRoute>
                  <Telemedicine />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/resources" element={
                <OnboardingProtectedRoute>
                  <Resources />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/records" element={
                <OnboardingProtectedRoute>
                  <Records />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/emergency" element={
                <OnboardingProtectedRoute>
                  <Emergency />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/diagnostics" element={
                <OnboardingProtectedRoute>
                  <Diagnostics />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/pediatric" element={
                <OnboardingProtectedRoute>
                  <Pediatric />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/premium" element={
                <OnboardingProtectedRoute>
                  <Premium />
                </OnboardingProtectedRoute>
              } />
              
              {/* Role-Based Dashboard Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/hospital-dashboard" element={
                <ProtectedRoute>
                  <HospitalDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/broker-dashboard" element={
                <ProtectedRoute>
                  <BrokerDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/ml-analytics" element={
                <ProtectedRoute>
                  <MLAnalyticsPage />
                </ProtectedRoute>
              } />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
