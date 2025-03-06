'use client'

import ProtectedRoute from '@/components/protected-route'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* Add dashboard content here */}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
