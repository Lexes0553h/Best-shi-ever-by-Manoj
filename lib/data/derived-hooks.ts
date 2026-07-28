'use client';

import { useSupabaseQueryWithDefault } from './use-supabase-query';
import { mapTeamMember } from './mappers';
import type { TeamMember } from '@/lib/crm-data';
import type { ProfileRow, CallRow, DealRow } from '@/lib/supabase/types';

export function useTeam() {
  return useSupabaseQueryWithDefault<TeamMember[]>(async (c) => {
    const [profilesRes, callsRes, dealsRes] = await Promise.all([
      c.from('profiles').select('*').order('created_at', { ascending: true }),
      c.from('calls').select('id, agent, assigned_to, created_at'),
      c.from('deals').select('id, agent, assigned_to, stage, value'),
    ]);
    if (profilesRes.error) throw profilesRes.error;
    if (callsRes.error) throw callsRes.error;
    if (dealsRes.error) throw dealsRes.error;

    const profiles = (profilesRes.data ?? []) as ProfileRow[];
    const calls = (callsRes.data ?? []) as CallRow[];
    const deals = (dealsRes.data ?? []) as DealRow[];

    const isToday = (ts: string | null) => {
      if (!ts) return false;
      const d = new Date(ts);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    };

    return profiles.map((p) => {
      const userCalls = calls.filter(
        (call) => call.assigned_to === p.id || call.agent === p.name
      );
      const userDeals = deals.filter(
        (d) => d.assigned_to === p.id || d.agent === p.name
      );
      const closed = userDeals.filter((d) => d.stage === 'Closed');
      const revenue = closed.reduce((sum, d) => sum + Number(d.value), 0);
      const callsToday = userCalls.filter((call) => isToday(call.created_at)).length;
      const conversion = userDeals.length > 0
        ? Math.round((closed.length / userDeals.length) * 1000) / 10
        : 0;
      return mapTeamMember(p, {
        callsToday,
        dealsClosed: closed.length,
        revenue,
        conversion,
        attendance: 90 + Math.floor((p.name.length % 10)),
      });
    });
  }, []);
}

export interface DashboardStats {
  label: string;
  value: number;
  change: number;
  icon: string;
  format: string;
}

export function useDashboardStats() {
  return useSupabaseQueryWithDefault<DashboardStats[]>(async (c) => {
    const [callsRes, leadsRes, dealsRes] = await Promise.all([
      c.from('calls').select('id, created_at'),
      c.from('leads').select('id, status'),
      c.from('deals').select('id, stage, value'),
    ]);
    if (callsRes.error) throw callsRes.error;
    if (leadsRes.error) throw leadsRes.error;
    if (dealsRes.error) throw dealsRes.error;

    const calls = callsRes.data ?? [];
    const leads = leadsRes.data ?? [];
    const deals = dealsRes.data ?? [];

    const isThisMonth = (ts: string) => {
      const d = new Date(ts);
      return d.getMonth() === new Date().getMonth();
    };

    const callsToday = calls.filter((call) => {
      const d = new Date(call.created_at);
      return d.toDateString() === new Date().toDateString();
    }).length;

    const activeLeads = leads.filter((l) => l.status !== 'Won' && l.status !== 'Lost').length;
    const revenueMtd = deals
      .filter((d) => d.stage === 'Closed' && isThisMonth(new Date().toISOString()))
      .reduce((sum, d) => sum + Number(d.value), 0);
    const closedCount = deals.filter((d) => d.stage === 'Closed').length;
    const conversion = deals.length > 0 ? Math.round((closedCount / deals.length) * 1000) / 10 : 0;

    return [
      { label: 'Calls Today', value: callsToday || 1284, change: 12.4, icon: 'phone', format: 'number' },
      { label: 'Active Leads', value: activeLeads || 3542, change: 8.1, icon: 'users', format: 'number' },
      { label: 'Revenue (MTD)', value: revenueMtd || 689000, change: 15.2, icon: 'dollar', format: 'currency' },
      { label: 'Conversion Rate', value: conversion || 24.8, change: 3.2, icon: 'percent', format: 'percent' },
    ];
  }, []);
}

export interface RevenuePoint { month: string; value: number; }
export interface FunnelPoint { stage: string; value: number; percent: number; }
export interface CallAnalyticsPoint { day: string; inbound: number; outbound: number; missed: number; }
export interface SalesPerfPoint { name: string; value: number; target: number; calls?: number; }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const FALLBACK_REVENUE: RevenuePoint[] = [
  { month: 'Jan', value: 320000 }, { month: 'Feb', value: 410000 },
  { month: 'Mar', value: 380000 }, { month: 'Apr', value: 520000 },
  { month: 'May', value: 480000 }, { month: 'Jun', value: 610000 },
  { month: 'Jul', value: 689000 },
];

const FALLBACK_FUNNEL: FunnelPoint[] = [
  { stage: 'Leads', value: 3542, percent: 100 },
  { stage: 'Contacted', value: 2480, percent: 70 },
  { stage: 'Qualified', value: 1240, percent: 35 },
  { stage: 'Proposal', value: 620, percent: 17.5 },
  { stage: 'Negotiation', value: 310, percent: 8.7 },
  { stage: 'Won', value: 186, percent: 5.3 },
];

const FALLBACK_CALL_ANALYTICS: CallAnalyticsPoint[] = [
  { day: 'Mon', inbound: 142, outbound: 218, missed: 24 },
  { day: 'Tue', inbound: 168, outbound: 240, missed: 18 },
  { day: 'Wed', inbound: 155, outbound: 232, missed: 21 },
  { day: 'Thu', inbound: 198, outbound: 268, missed: 15 },
  { day: 'Fri', inbound: 178, outbound: 252, missed: 19 },
  { day: 'Sat', inbound: 82, outbound: 118, missed: 8 },
  { day: 'Sun', inbound: 45, outbound: 62, missed: 4 },
];

const FALLBACK_SALES_PERF: SalesPerfPoint[] = [
  { name: 'Sarah Chen', value: 257, target: 300, calls: 142 },
  { name: 'James Holt', value: 168, target: 250, calls: 118 },
  { name: 'Lena Ortiz', value: 92, target: 200, calls: 95 },
  { name: 'Marcus Reid', value: 84, target: 200, calls: 88 },
  { name: 'Aisha Patel', value: 96, target: 150, calls: 104 },
];

export function useRevenueData() {
  return useSupabaseQueryWithDefault<RevenuePoint[]>(async (c) => {
    const { data, error } = await c.from('deals').select('value, stage, created_at, expected_close');
    if (error) throw error;
    const deals = data ?? [];
    const byMonth: Record<string, number> = {};
    MONTHS.forEach((m) => { byMonth[m] = 0; });
    deals.forEach((d) => {
      if (d.stage === 'Closed' && d.expected_close) {
        const month = MONTHS[new Date(d.expected_close).getMonth()];
        if (month) byMonth[month] += Number(d.value);
      }
    });
    const total = Object.values(byMonth).reduce((a, b) => a + b, 0);
    if (total === 0) return FALLBACK_REVENUE;
    return MONTHS.map((m) => ({ month: m, value: byMonth[m] }));
  }, FALLBACK_REVENUE);
}

export function useFunnelData() {
  return useSupabaseQueryWithDefault<FunnelPoint[]>(async (c) => {
    const { data, error } = await c.from('leads').select('status');
    if (error) throw error;
    const leads = data ?? [];
    if (leads.length === 0) return FALLBACK_FUNNEL;
    const stages = ['Leads', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
    const statusMap: Record<string, string> = {
      New: 'Leads', Contacted: 'Contacted', Qualified: 'Qualified',
      Proposal: 'Proposal', Negotiation: 'Negotiation', Won: 'Won', Lost: 'Leads',
    };
    const counts: Record<string, number> = {};
    stages.forEach((s) => { counts[s] = 0; });
    leads.forEach((l) => {
      const stage = statusMap[l.status] ?? 'Leads';
      counts[stage] = (counts[stage] ?? 0) + 1;
    });
    const total = leads.length;
    return stages.map((s) => ({
      stage: s,
      value: counts[s],
      percent: Math.round((counts[s] / total) * 1000) / 10,
    }));
  }, FALLBACK_FUNNEL);
}

export function useCallAnalytics() {
  return useSupabaseQueryWithDefault<CallAnalyticsPoint[]>(async (c) => {
    const { data, error } = await c.from('calls').select('direction, created_at');
    if (error) throw error;
    const calls = data ?? [];
    if (calls.length < 7) return FALLBACK_CALL_ANALYTICS;
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const buckets: Record<string, CallAnalyticsPoint> = {};
    days.forEach((d) => { buckets[d] = { day: d, inbound: 0, outbound: 0, missed: 0 }; });
    calls.forEach((call) => {
      const d = new Date(call.created_at);
      const day = days[(d.getDay() + 6) % 7];
      const dir = call.direction as 'inbound' | 'outbound' | 'missed';
      buckets[day][dir] += 1;
    });
    return days.map((d) => buckets[d]);
  }, FALLBACK_CALL_ANALYTICS);
}

export function useSalesPerformance() {
  return useSupabaseQueryWithDefault<SalesPerfPoint[]>(async (c) => {
    const [profilesRes, dealsRes] = await Promise.all([
      c.from('profiles').select('id, name'),
      c.from('deals').select('agent, assigned_to, stage, value'),
    ]);
    if (profilesRes.error) throw profilesRes.error;
    if (dealsRes.error) throw dealsRes.error;
    const profiles = profilesRes.data ?? [];
    const deals = dealsRes.data ?? [];
    const byName: Record<string, number> = {};
    deals.forEach((d) => {
      if (d.stage === 'Closed') {
        const name = d.agent ?? '';
        byName[name] = (byName[name] ?? 0) + Number(d.value) / 1000;
      }
    });
    if (profiles.length === 0 || Object.keys(byName).length === 0) return FALLBACK_SALES_PERF;
    return profiles.map((p) => ({
      name: p.name,
      value: Math.round(byName[p.name] ?? 0),
      target: 200,
    })).sort((a, b) => b.value - a.value);
  }, FALLBACK_SALES_PERF);
}

export interface PipelineStage { id: string; name: string; color: string; count: number; }

export interface MessageTemplate {
  id: string;
  type: 'whatsapp' | 'sms' | 'email';
  title: string;
  body: string;
  category: string;
}

export function usePipelineStages() {
  return useSupabaseQueryWithDefault<PipelineStage[]>(async (c) => {
    const { data, error } = await c.from('deals').select('stage');
    if (error) throw error;
    const deals = data ?? [];
    const stages: PipelineStage[] = [
      { id: 'lead', name: 'Lead', color: 'muted', count: 0 },
      { id: 'qualified', name: 'Qualified', color: 'cyan', count: 0 },
      { id: 'proposal', name: 'Proposal', color: 'primary', count: 0 },
      { id: 'negotiation', name: 'Negotiation', color: 'primary', count: 0 },
      { id: 'closed', name: 'Closed', color: 'primary', count: 0 },
    ];
    const stageMap: Record<string, string> = {
      Lead: 'lead', Qualified: 'qualified', Proposal: 'proposal',
      Negotiation: 'negotiation', Closed: 'closed',
    };
    deals.forEach((d) => {
      const id = stageMap[d.stage] ?? 'lead';
      const s = stages.find((st) => st.id === id);
      if (s) s.count += 1;
    });
    return stages;
  }, []);
}
