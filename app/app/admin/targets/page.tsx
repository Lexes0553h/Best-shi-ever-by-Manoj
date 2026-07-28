'use client';

import { useState } from 'react';
import { Target, Award, Plus, CheckCircle2, Trophy, Users, DollarSign } from 'lucide-react';
import { PageHeader, Card, Badge, Button, Avatar, ProgressBar, Modal } from '@/components/crm/crm-ui';
import { toast } from '@/components/ui/toast';

export default function TargetsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [employee, setEmployee] = useState('James Holt');
  const [targetCalls, setTargetCalls] = useState('250');
  const [targetRevenue, setTargetRevenue] = useState('50000');

  const targetsList = [
    { name: 'Sarah Chen', role: 'Sales Lead', callTarget: 300, achievedCalls: 320, revenueTarget: 50000, achievedRevenue: 62000, pct: 124 },
    { name: 'James Holt', role: 'Telecaller', callTarget: 250, achievedCalls: 260, revenueTarget: 30000, achievedRevenue: 32000, pct: 106 },
    { name: 'Lena Ortiz', role: 'Telecaller', callTarget: 250, achievedCalls: 240, revenueTarget: 30000, achievedRevenue: 28000, pct: 93 },
    { name: 'Marcus Reid', role: 'Telecaller', callTarget: 200, achievedCalls: 180, revenueTarget: 25000, achievedRevenue: 22000, pct: 88 },
  ];

  const handleSetTarget = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    toast({ title: 'Target Set', description: `New targets set for ${employee}.` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Telecaller Targets & Bonus Quotas"
        subtitle="Admin Portal • Set Daily & Monthly Call Targets, Revenue Expectations & Rewards"
        actions={
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Assign New Target
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {targetsList.map((t) => (
          <Card key={t.name}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size={40} ring />
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Call Quota:</span>
                  <span className="font-bold text-slate-900">{t.achievedCalls} / {t.callTarget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Revenue Quota:</span>
                  <span className="font-bold text-slate-900">${t.achievedRevenue.toLocaleString()} / ${t.revenueTarget.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Achievement</span>
                  <span className="text-emerald-600">{t.pct}%</span>
                </div>
                <ProgressBar value={Math.min(t.pct, 100)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Set Telecaller Target">
        <form onSubmit={handleSetTarget} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Telecaller</label>
            <select
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="James Holt">James Holt</option>
              <option value="Lena Ortiz">Lena Ortiz</option>
              <option value="Marcus Reid">Marcus Reid</option>
              <option value="Aisha Patel">Aisha Patel</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Call Target</label>
            <input
              type="number"
              value={targetCalls}
              onChange={(e) => setTargetCalls(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Revenue Target ($)</label>
            <input
              type="number"
              value={targetRevenue}
              onChange={(e) => setTargetRevenue(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Target</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
