'use client';

import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { PageHeader, Card, StatCard, Badge, ProgressBar } from '@/components/crm/crm-ui';

export default function CallsAnalyticsPage() {
  const hourlyData = [
    { hour: '9 AM', calls: 120 },
    { hour: '10 AM', calls: 240 },
    { hour: '11 AM', calls: 310 },
    { hour: '12 PM', calls: 180 },
    { hour: '1 PM', calls: 140 },
    { hour: '2 PM', calls: 290 },
    { hour: '3 PM', calls: 330 },
    { hour: '4 PM', calls: 210 },
    { hour: '5 PM', calls: 150 },
  ];

  const maxCalls = Math.max(...hourlyData.map((d) => d.calls));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calls Analytics & Peak Hour Intelligence"
        subtitle="Telephony Metrics • Inbound, Outbound, Missed Calls & Disposition Breakdown"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Dialed" value="1,840" change={12.4} icon={<PhoneOutgoing className="h-5 w-5 text-blue-600" />} index={0} />
        <StatCard label="Inbound Calls" value="420" change={8.1} icon={<PhoneIncoming className="h-5 w-5 text-emerald-600" />} index={1} />
        <StatCard label="Missed Rate" value="6.4%" change={-2.1} icon={<PhoneMissed className="h-5 w-5 text-red-500" />} index={2} />
        <StatCard label="Avg Duration" value="4m 12s" change={5.0} icon={<Clock className="h-5 w-5 text-purple-600" />} index={3} />
      </div>

      <Card title="Hourly Call Distribution (Peak Hours)">
        <div className="flex h-56 items-end gap-3 pt-6">
          {hourlyData.map((d) => (
            <div key={d.hour} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full flex-1 items-end">
                <div
                  style={{ height: `${(d.calls / maxCalls) * 100}%` }}
                  className="w-full rounded-t-lg bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs"
                />
              </div>
              <span className="text-xs font-bold text-slate-600">{d.hour}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
