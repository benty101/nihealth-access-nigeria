
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import NotFound from "./pages/NotFound";
import UserProfile from "./components/UserProfile";

const queryClient = new QueryClient();

const App = () => (
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
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/broker" element={
              <ProtectedRoute>
                <BrokerDashboard />
              </ProtectedRoute>
            } />
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
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/records" element={
              <ProtectedRoute>
                <Records />
              </ProtectedRoute>
            } />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/telemedicine" element={
              <ProtectedRoute>
                <Telemedicine />
              </ProtectedRoute>
            } />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/diagnostics" element={
              <ProtectedRoute>
                <Diagnostics />
              </ProtectedRoute>
            } />
            <Route path="/labs" element={
              <ProtectedRoute>
                <Labs />
              </ProtectedRoute>
            } />
            <Route path="/pharmacy" element={
              <ProtectedRoute>
                <Pharmacy />
              </ProtectedRoute>
            } />
            <Route path="/premium" element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
