import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PitchDeck from "./pages/PitchDeck";
import Consultancy from "./pages/Consultancy";

// Heavy (d3 + world-atlas) — kept out of the main bundle.
const TheGroundBeneathUs = lazy(() => import("./pages/TheGroundBeneathUs"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0f0d" }} />}>
                <TheGroundBeneathUs />
              </Suspense>
            }
          />
          <Route path="/solutions" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pitch-deck" element={<PitchDeck />} />
          <Route path="/consultancy" element={<Consultancy />} />
          {/* Keep old URL as redirect */}
          <Route
            path="/the-ground-beneath-us"
            element={
              <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0a0f0d" }} />}>
                <TheGroundBeneathUs />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
