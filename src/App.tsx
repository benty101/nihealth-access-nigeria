
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
import Profile from './pages/Profile';
import BookAppointment from './pages/BookAppointment';
import BookLabTest from './pages/BookLabTest';
import Consultations from './pages/Consultations';
import MyOrders from './pages/MyOrders';
import NotFound from './pages/NotFound';

// AI Components
import { SimpleSymptomChecker } from './components/ai/SimpleSymptomChecker';
import { AIHealthChat } from './components/ai/AIHealthChat';
import { MedicalKnowledgeSearch } from './components/ai/MedicalKnowledgeSearch';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import OnboardingProtectedRoute from './components/OnboardingProtectedRoute';
import SiteMap from './components/navigation/SiteMap';
import PageLayout from './components/layout/PageLayout';
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
              <Route path="/sitemap" element={
                <PageLayout title="Site Map" showBreadcrumbs={false}>
                  <SiteMap />
                </PageLayout>
              } />
              
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
              
              {/* AI Features */}
              <Route path="/ai-assistant" element={
                <OnboardingProtectedRoute>
                  <PageLayout title="AI Health Assistant">
                    <SimpleSymptomChecker />
                  </PageLayout>
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/ai-chat" element={
                <OnboardingProtectedRoute>
                  <PageLayout title="AI Health Chat">
                    <AIHealthChat />
                  </PageLayout>
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/medical-search" element={
                <OnboardingProtectedRoute>
                  <PageLayout title="Medical Knowledge Search">
                    <MedicalKnowledgeSearch />
                  </PageLayout>
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/checkups" element={
                <OnboardingProtectedRoute>
                  <PageLayout title="Health Checkups">
                    <div className="max-w-4xl mx-auto p-6">
                      <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">Health Checkups</h1>
                        <p className="text-muted-foreground">Comprehensive health screening services coming soon.</p>
                      </div>
                    </div>
                  </PageLayout>
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/insights" element={
                <OnboardingProtectedRoute>
                  <PageLayout title="Health Insights">
                    <div className="max-w-4xl mx-auto p-6">
                      <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">Health Insights</h1>
                        <p className="text-muted-foreground">AI-powered health analytics coming soon.</p>
                      </div>
                    </div>
                  </PageLayout>
                </OnboardingProtectedRoute>
              } />
              
              {/* User Profile and Action Routes */}
              <Route path="/profile" element={
                <OnboardingProtectedRoute>
                  <Profile />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/book-appointment" element={
                <OnboardingProtectedRoute>
                  <BookAppointment />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/book-lab-test" element={
                <OnboardingProtectedRoute>
                  <BookLabTest />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/consultations" element={
                <OnboardingProtectedRoute>
                  <Consultations />
                </OnboardingProtectedRoute>
              } />
              
              <Route path="/my-orders" element={
                <OnboardingProtectedRoute>
                  <MyOrders />
                </OnboardingProtectedRoute>
              } />
              
              {/* Role-Based Dashboard Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/hospital" element={
                <ProtectedRoute>
                  <HospitalDashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/broker" element={
                <ProtectedRoute>
                  <BrokerDashboard />
                </ProtectedRoute>
              } />
              
              {/* Legacy routes for backward compatibility */}
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
              
              <Route path="/patient-portal" element={
                <ProtectedRoute>
                  <Dashboard />
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
