'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Phone,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  DollarSign,
  TrendingUp,
  BarChart3,
  Shield,
  FileText,
  UserPlus,
  Target,
  Clock,
  Disc,
  Building2,
  Bell,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader, StatCard, Card, Badge, Button, Avatar, ProgressBar, Modal } from '@/components/crm/crm-ui';
import { useAuth } from '@/lib/auth/auth-context';
import {
  useCalls, useLeads, useTasks, useActivity,
} from '@/lib/data/hooks';
import {
  useDashboardStats, useRevenueData, useCallAnalytics, useSalesPerformance,
} from '@/lib/data/derived-hooks';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] ?? 'Admin';

  const { data: calls = [] } = useCalls();
  const { data: leads = [] } = useLeads();
  const { data: activity = [] } = useActivity();
  const { data: statsData } = useDashboardStats();
  const { data: revenueData } = useRevenueData();
  const { data: callAnalytics } = useCallAnalytics();
  const { data: salesPerf } = useSalesPerformance();

  const [appModalOpen, setAppModalOpen] = useState(false);

  const maxRevenue = Math.max(...(revenueData ?? [{ value: 1000 }]).map((d) => d.value));

  const teamMembers = [
    { id: '1', name: 'Sarah Chen', role: 'Sales Lead', callsToday: 34, conversion: 31.2, revenue: '$48,000', status: 'online' },
    { id: '2', name: 'James Holt', role: 'Telecaller', callsToday: 29, conversion: 26.5, revenue: '$32,000', status: 'online' },
    { id: '3', name: 'Marcus Reid', role: 'Telecaller', callsToday: 22, conversion: 21.0, revenue: '$24,000', status: 'away' },
    { id: '4', name: 'Lena Ortiz', role: 'Telecaller', callsToday: 25, conversion: 24.8, revenue: '$28,000', status: 'online' },
    { id: '5', name: 'Aisha Patel', role: 'Telecaller', callsToday: 19, conversion: 19.4, revenue: '$18,000', status: 'offline' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title={`Executive Admin Dashboard • Welcome, ${userName}`}
        subtitle="Company Overview • Real-Time Telecalling Operations & Team Performance"
        actions={
          <div className="flex gap-2">
            <Link href="/app/admin/employees">
              <Button variant="outline" size="md">
                <UserPlus className="h-4 w-4" /> Add Employee
              </Button>
            </Link>
            <Link href="/app/reports">
              <Button variant="primary" size="md">
                <FileText className="h-4 w-4" /> Executive Reports
              </Button>
            </Link>
          </div>
        }
      />

      {/* Admin Executive Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Shield className="h-4 w-4" /> Vocalyze Enterprise Control Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Company Performance & Real-Time Call Intelligence
            </h2>
            <p className="text-sm text-slate-200 max-w-xl">
              12 total staff members online • {calls.length || 184} calls completed today across 4 departments.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/app/admin/team-performance">
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Users className="h-4 w-4" /> Team Performance
              </Button>
            </Link>
            <Link href="/app/company-settings">
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <Building2 className="h-4 w-4" /> Company Config
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Company Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Employees"
          value="12 Staff"
          change={8.5}
          icon={<UserCheck className="h-5 w-5 text-emerald-600" />}
          index={0}
        />
        <StatCard
          label="Calls Handled Today"
          value="1,284"
          change={14.2}
          icon={<Phone className="h-5 w-5 text-blue-600" />}
          index={1}
        />
        <StatCard
          label="Company Revenue (MTD)"
          value="$689,000"
          change={15.2}
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          index={2}
        />
        <StatCard
          label="Overall Conversion Rate"
          value="24.8%"
          change={3.2}
          icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
          index={3}
        />
      </div>

      {/* Secondary Operational Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Answered Calls</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">1,140 <span className="text-xs text-emerald-600 font-semibold">(88.7%)</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Missed Calls</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">144 <span className="text-xs text-red-500 font-semibold">(11.3%)</span></p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Active Leads In Pipeline</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">3,542 Leads</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Won Deals (This Month)</span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">186 Closed</p>
        </div>
      </div>

      {/* Main Charts & Team Performance */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Revenue Trend & Telecaller Leaderboard */}
        <div className="space-y-6 lg:col-span-2">
          {/* Revenue Chart */}
          <Card title="Monthly Company Revenue Trend" action={<Badge variant="green">+15.2% MoM</Badge>}>
            <div className="flex h-52 items-end gap-3 pt-4">
              {(revenueData || []).map((d, i) => (
                <div key={d.month} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.08 }}
                      className="w-full rounded-t-lg bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{d.month}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Employee Performance Leaderboard */}
          <Card
            title="Telecaller Performance & Target Tracking"
            action={<Link href="/app/admin/team-performance" className="text-xs font-semibold text-emerald-700 hover:underline">Full Analytics</Link>}
          >
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/60 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={member.name} size={40} ring />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{member.name}</p>
                      <p className="text-xs text-slate-500 truncate">{member.role} • {member.callsToday} calls today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-emerald-700">{member.revenue}</p>
                    <span className="text-xs text-slate-500">{member.conversion}% conversion</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Admin Quick Navigation & Recent Logs */}
        <div className="space-y-6">
          <Card title="Admin Control Center">
            <div className="grid grid-cols-2 gap-2.5">
              <Link href="/app/admin/employees" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <UserCheck className="h-5 w-5 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Employees</span>
              </Link>
              <Link href="/app/admin/targets" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <Target className="h-5 w-5 text-blue-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Targets</span>
              </Link>
              <Link href="/app/admin/attendance" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <Clock className="h-5 w-5 text-amber-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Attendance</span>
              </Link>
              <Link href="/app/admin/recordings" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <Disc className="h-5 w-5 text-purple-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Recordings</span>
              </Link>
              <Link href="/app/reports" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <FileText className="h-5 w-5 text-cyan-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Reports</span>
              </Link>
              <Link href="/app/audit-logs" className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30 transition-all text-center">
                <Shield className="h-5 w-5 text-slate-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">Audit Logs</span>
              </Link>
              <button onClick={() => setAppModalOpen(true)} className="flex flex-col items-center justify-center p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-center">
                <Smartphone className="h-5 w-5 text-indigo-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">App</span>
              </button>
            </div>
          </Card>

          {/* Live Activity Stream */}
          <Card title="Live Activity Feed">
            <div className="space-y-3 text-xs">
              {activity.slice(0, 5).map((a) => (
                <div key={a.id} className="border-b border-slate-100 pb-2.5 last:border-0">
                  <p className="font-bold text-slate-900">{a.title}</p>
                  <p className="text-slate-500">{a.desc}</p>
                  <span className="text-[10px] text-slate-400">{a.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile App Modal */}
      <Modal open={appModalOpen} onClose={() => setAppModalOpen(false)} title="📱 Mobile App">
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100">
            <Smartphone className="h-10 w-10" />
          </div>
          <p className="mb-6 text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Our Vocalyze CRM mobile application is currently under development.<br /><br />
            The Android and iOS apps will be launching soon. Stay tuned for upcoming releases on Google Play Store and Apple App Store.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center mb-8">
            <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
              Google Play (Coming Soon)
            </Button>
            <Button variant="outline" disabled className="opacity-50 cursor-not-allowed">
              App Store (Coming Soon)
            </Button>
          </div>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setAppModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setAppModalOpen(false)}>
              Notify Me
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
