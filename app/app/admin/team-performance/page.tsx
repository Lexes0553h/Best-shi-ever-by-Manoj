'use client';

import { useState } from 'react';
import { Users, BarChart3, TrendingUp, Award, Phone, CheckCircle2, DollarSign, Target } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, Button, Avatar, ProgressBar } from '@/components/crm/crm-ui';

export default function TeamPerformancePage() {
  const teamData = [
    { name: 'Sarah Chen', role: 'Sales Lead', calls: 142, connected: 118, deals: 12, revenue: '$48,000', conversion: 31.2, targetPct: 120 },
    { name: 'James Holt', role: 'Telecaller', calls: 128, connected: 98, deals: 9, revenue: '$32,000', conversion: 26.5, targetPct: 105 },
    { name: 'Lena Ortiz', role: 'Telecaller', calls: 115, connected: 88, deals: 8, revenue: '$28,000', conversion: 24.8, targetPct: 98 },
    { name: 'Marcus Reid', role: 'Telecaller', calls: 102, connected: 76, deals: 7, revenue: '$24,000', conversion: 21.0, targetPct: 88 },
    { name: 'Aisha Patel', role: 'Telecaller', calls: 94, connected: 68, deals: 5, revenue: '$18,000', conversion: 19.4, targetPct: 75 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Performance & Telecaller Ranking"
        subtitle="Admin Analytics • Individual Conversion Rates, Call Volume & Revenue Achievements"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Team Calls" value="581" change={12.4} icon={<Phone className="h-5 w-5 text-emerald-600" />} index={0} />
        <StatCard label="Total Connected" value="448" change={10.1} icon={<CheckCircle2 className="h-5 w-5 text-blue-600" />} index={1} />
        <StatCard label="Deals Closed" value="41" change={18.2} icon={<Award className="h-5 w-5 text-amber-600" />} index={2} />
        <StatCard label="Total Team Revenue" value="$150,000" change={15.0} icon={<DollarSign className="h-5 w-5 text-emerald-600" />} index={3} />
      </div>

      <Card title="Telecaller Performance Rankings">
        <div className="space-y-4">
          {teamData.map((member, index) => (
            <div key={member.name} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-emerald-200 transition-colors shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-700">
                  #{index + 1}
                </span>
                <Avatar name={member.name} size={42} ring />
                <div>
                  <p className="font-bold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role} • {member.calls} calls made</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center md:text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Connected</span>
                  <p className="text-sm font-bold text-slate-800">{member.connected} calls</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Conversion</span>
                  <p className="text-sm font-bold text-emerald-600">{member.conversion}%</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">Revenue</span>
                  <p className="text-sm font-bold text-slate-900">{member.revenue}</p>
                </div>
              </div>

              <div className="w-full md:w-36">
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span>Quota</span>
                  <span className="text-emerald-700">{member.targetPct}%</span>
                </div>
                <ProgressBar value={Math.min(member.targetPct, 100)} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
