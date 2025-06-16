
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import OnboardingProtectedRoute from "@/components/OnboardingProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import BrokerDashboard from "./pages/BrokerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import Onboarding from "./pages/Onboarding";
import Appointments from "./pages/Appointments";
import Records from "./pages/Records";
import Insurance from "./pages/Insurance";
import Hospitals from "./pages/Hospitals";
import Resources from "./pages/Resources";
import Telemedicine from "./pages/Telemedicine";
import Emergency from "./pages/Emergency";
import Diagnostics from "./pages/Diagnostics";
import Labs from "./pages/Labs";
import Pharmacy from "./pages/Pharmacy";
import Premium from "./pages/Premium";
import Pediatric from "./pages/Pediatric";
import NotFound from "./pages/NotFound";
import UserProfile from "./components/UserProfile";

const App = () => {
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <OnboardingProtectedRoute>
                  <Dashboard />
                </OnboardingProtectedRoute>
              } />
              <Route path="/broker" element={
                <OnboardingProtectedRoute>
                  <BrokerDashboard />
                </OnboardingProtectedRoute>
              } />
              <Route path="/admin" element={
                <OnboardingProtectedRoute>
                  <AdminDashboard />
                </OnboardingProtectedRoute>
              } />
              <Route path="/hospital" element={
                <OnboardingProtectedRoute>
                  <HospitalDashboard />
                </OnboardingProtectedRoute>
              } />
              <Route path="/profile" element={
                <OnboardingProtectedRoute>
                  <UserProfile />
                </OnboardingProtectedRoute>
              } />
              <Route path="/appointments" element={
                <OnboardingProtectedRoute>
                  <Appointments />
                </OnboardingProtectedRoute>
              } />
              <Route path="/records" element={
                <OnboardingProtectedRoute>
                  <Records />
                </OnboardingProtectedRoute>
              } />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/pediatric" element={
                <OnboardingProtectedRoute>
                  <Pediatric />
                </OnboardingProtectedRoute>
              } />
              <Route path="/telemedicine" element={
                <OnboardingProtectedRoute>
                  <Telemedicine />
                </OnboardingProtectedRoute>
              } />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/diagnostics" element={
                <OnboardingProtectedRoute>
                  <Diagnostics />
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
              <Route path="/premium" element={
                <OnboardingProtectedRoute>
                  <Premium />
                </OnboardingProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
