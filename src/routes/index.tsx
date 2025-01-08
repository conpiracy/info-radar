import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { LoadingSpinner } from '@/components/ui/loading'
import { ErrorBoundary } from '@/components/error-boundary'

const Layout = lazy(() => import('@/components/layout'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const NicheAnalysis = lazy(() => import('@/pages/NicheAnalysis'))
const Training = lazy(() => import('@/pages/Training'))
const Analytics = lazy(() => import('@/pages/Analytics'))

const withSuspense = (Component: React.LazyExoticComponent<any>) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
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
])