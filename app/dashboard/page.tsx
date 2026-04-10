'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, Home, Briefcase, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'

// Mock data
const dashboardStats = [
  { label: 'Total Properties', value: 2847, icon: Home, color: 'bg-blue-100 text-blue-600' },
  { label: 'Total Users', value: 5234, icon: Users, color: 'bg-green-100 text-keja-green' },
  { label: 'Verified Agents', value: 456, icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
  { label: 'Monthly Revenue', value: 'KES 4.2M', icon: TrendingUp, color: 'bg-yellow-100 text-yellow-600' },
]

const monthlyData = [
  { month: 'Jan', properties: 120, inquiries: 245, revenue: 450 },
  { month: 'Feb', properties: 145, inquiries: 289, revenue: 520 },
  { month: 'Mar', properties: 180, inquiries: 312, revenue: 580 },
  { month: 'Apr', properties: 210, inquiries: 356, revenue: 650 },
  { month: 'May', properties: 195, inquiries: 334, revenue: 620 },
  { month: 'Jun', properties: 230, inquiries: 398, revenue: 720 },
]

const pendingVerifications = [
  { id: 1, name: 'Prime Estates Agency', type: 'Agency', date: '2 days ago' },
  { id: 2, name: 'Sarah Mutiami', type: 'Agent', date: '5 days ago' },
  { id: 3, name: 'Luxury Properties Ltd', type: 'Agency', date: '1 week ago' },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-keja-gray">
      {/* Header */}
      <div className="bg-keja-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-green-100">Welcome back! Here&apos;s your platform overview.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-keja-text">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Properties & Inquiries */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Properties & Inquiries</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="properties" stroke="#10B981" />
                <Line type="monotone" dataKey="inquiries" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Monthly Revenue (KES)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Verifications & Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Verifications */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-bold">Pending Verifications</h3>
            </div>
            <div className="space-y-4">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-3 border-b border-keja-border last:border-0">
                  <div>
                    <p className="font-semibold text-keja-text">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.type} • {item.date}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="btn-secondary text-sm px-3 py-1">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="#" className="btn-primary w-full text-center text-sm">
                Add Property
              </Link>
              <Link href="#" className="btn-primary w-full text-center text-sm">
                Approve Agents
              </Link>
              <Link href="#" className="btn-secondary w-full text-center text-sm">
                View Reports
              </Link>
              <Link href="#" className="btn-secondary w-full text-center text-sm">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
