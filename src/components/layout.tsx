import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { LoadingSpinner } from './ui/loading'

const Sidebar = lazy(() => import('./sidebar'))
const Header = lazy(() => import('./header'))

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1 flex flex-col">
        <Suspense fallback={<LoadingSpinner />}>
          <Header />
        </Suspense>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
