import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Training from './pages/Training';
import NicheAnalysis from './pages/NicheAnalysis';

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendered");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/training" element={<Training />} />
            <Route path="/niche-analysis" element={<NicheAnalysis />} />
            {/* Add other routes as needed */}
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;