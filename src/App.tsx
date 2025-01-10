import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Card } from './components/Card';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <RouterProvider router={router} />
        <div>
          <Card 
            id="card1"
            title="Card 1"
            content={<p>Card 1 content</p>}
          />
          <Card 
            id="card2"
            title="Card 2"
            content={<p>Card 2 content</p>}
          />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;