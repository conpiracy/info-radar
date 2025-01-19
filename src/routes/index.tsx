import React, { Suspense, ComponentType, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router'; // Correct import path for react-router v7

const Layout = lazy(() => import('@/components/layout'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NicheAnalysis = lazy(() => import('@/pages/NicheAnalysis'));
const Training = lazy(() => import('@/pages/Training'));
const Analytics = lazy(() => import('@/pages/Analytics'));

function withSuspense<T extends object>(Component: ComponentType<T>): React.FC<T> {
  return (props: T) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(withSuspense(Layout)),
    children: [
      {
        index: true,
        element: React.createElement(withSuspense(Dashboard)),
      },
      {
        path: 'niche-analysis',
        element: React.createElement(withSuspense(NicheAnalysis)),
      },
      {
        path: 'training',
        element: React.createElement(withSuspense(Training)),
      },
      {
        path: 'analytics',
        element: React.createElement(withSuspense(Analytics)),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}