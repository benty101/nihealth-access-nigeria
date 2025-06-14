
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/contexts/AuthContext";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Hospitals from "./pages/Hospitals";
import Insurance from "./pages/Insurance";
import Appointments from "./pages/Appointments";
import Labs from "./pages/Labs";
import Pharmacy from "./pages/Pharmacy";
import Records from "./pages/Records";
import Resources from "./pages/Resources";
import Premium from "./pages/Premium";
import Onboarding from "./pages/Onboarding";
import Telemedicine from "./pages/Telemedicine";
import Emergency from "./pages/Emergency";
import Diagnostics from "./pages/Diagnostics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showPWABanner, setShowPWABanner] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="meddypal-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/appointments" element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                } />
                <Route path="/labs" element={<Labs />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/records" element={
                  <ProtectedRoute>
                    <Records />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={<Resources />} />
                <Route path="/premium" element={
                  <ProtectedRoute>
                    <Premium />
                  </ProtectedRoute>
                } />
                <Route path="/telemedicine" element={
                  <ProtectedRoute>
                    <Telemedicine />
                  </ProtectedRoute>
                } />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/diagnostics" element={<Diagnostics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {showPWABanner && (
                <PWAInstallBanner onDismiss={() => setShowPWABanner(false)} />
              )}
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
