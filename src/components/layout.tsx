import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { LoadingSpinner } from './ui/loading'
import { Navbar } from './layout/Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  )
}