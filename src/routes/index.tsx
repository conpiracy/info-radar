import { lazy, Suspense, ComponentType } from 'react';
import { createBrowserRouter } from 'react-router'; // Ensure correct import path

const Layout = lazy(() => import('@/components/Layout'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NicheAnalysis = lazy(() => import('@/pages/NicheAnalysis'));
const Training = lazy(() => import('@/pages/Training'));
const Analytics = lazy(() => import('@/pages/Analytics'));

function withSuspense(Component: ComponentType) {
  return (props: any) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Layout),
    children: [
      {
        index: true,
        element: withSuspense(Dashboard),
      },
      {
        path: 'niche-analysis',
        element: withSuspense(NicheAnalysis),
      },
      {
        path: 'training',
        element: withSuspense(Training),
      },
      {
        path: 'analytics',
        element: withSuspense(Analytics),
      },
    ],
  },
]);