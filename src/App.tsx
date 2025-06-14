
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/records" element={<Records />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
