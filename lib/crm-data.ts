// Centralized demo data for the CRM application. All mock — no backend.

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  tags: string[];
  agent: string;
  avatar: string;
  value: number;
  source: string;
  lastContact: string;
  createdAt: string;
  notes: string;
  role?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  avatar: string;
  tags: string[];
  lastSeen: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  website: string;
  employees: number;
  revenue: string;
  location: string;
  deals: number;
  dealValue: number;
  status: 'Active' | 'Prospect' | 'Churned';
}

export interface Call {
  id: string;
  contact: string;
  company: string;
  agent: string;
  direction: 'inbound' | 'outbound' | 'missed';
  duration: string;
  time: string;
  date: string;
  disposition: string;
  recording: boolean;
  notes: string;
  phone?: string;
  status?: string;
  muted?: boolean;
  speaker?: boolean;
  recordingUrl?: string;
  transferredTo?: string;
  followUp?: boolean;
  followUpDate?: string;
  isFavorite?: boolean;
  contactPhone?: string;
  summary?: string;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  value: number;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed';
  probability: number;
  agent: string;
  expectedClose: string;
  phone?: string;
  email?: string;
  tags?: string[];
  priority?: string;
  notes?: string;
  nextActivity?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Backlog' | 'In Progress' | 'Review' | 'Done';
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  callsToday: number;
  dealsClosed: number;
  revenue: number;
  conversion: number;
  attendance: number;
}

export interface Notification {
  id: string;
  type: 'call' | 'lead' | 'deal' | 'task' | 'message' | 'system';
  title: string;
  description: string;
  time: string;
  read: boolean;
  link?: string;
  priority?: 'low' | 'normal' | 'high';
}

const AVATARS = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
];

export const CURRENT_USER = {
  name: 'Sarah Chen',
  role: 'VP Sales',
  email: 'sarah.chen@vocalyze.io',
  avatar: AVATARS[0],
};

export const LEADS: Lead[] = [];
export const CONTACTS: Contact[] = [];
export const COMPANIES: Company[] = [];
export const CALLS: Call[] = [];
export const DEALS: Deal[] = [];
export const TASKS: Task[] = [];
export const TEAM: TeamMember[] = [];
export const NOTIFICATIONS: Notification[] = [];
export const WHATSAPP_CONVERSATIONS: any[] = [];
export const WHATSAPP_MESSAGES: any[] = [];
export const SMS_CONVERSATIONS: any[] = [];
export const EMAILS: any[] = [];
export const CALENDAR_EVENTS: any[] = [];
export const AI_SUGGESTIONS: any[] = [];
export const AI_CHAT: any[] = [];
export const ACTIVITY_TIMELINE: any[] = [];

export const DASHBOARD_STATS = [
  { label: 'Calls Today', value: 1284, change: 12.4, icon: 'phone', format: 'number' },
  { label: 'Active Leads', value: 3542, change: 8.1, icon: 'users', format: 'number' },
  { label: 'Revenue (MTD)', value: 689000, change: 15.2, icon: 'dollar', format: 'currency' },
  { label: 'Conversion Rate', value: 24.8, change: 3.2, icon: 'percent', format: 'percent' },
];

export const PIPELINE_STAGES = [
  { id: 'lead', name: 'Lead', color: 'muted', count: 4 },
  { id: 'qualified', name: 'Qualified', color: 'cyan', count: 3 },
  { id: 'proposal', name: 'Proposal', color: 'primary', count: 2 },
  { id: 'negotiation', name: 'Negotiation', color: 'primary', count: 1 },
  { id: 'closed', name: 'Closed', color: 'primary', count: 1 },
];

export const REVENUE_DATA = [
  { month: 'Jan', value: 320000 },
  { month: 'Feb', value: 410000 },
  { month: 'Mar', value: 380000 },
  { month: 'Apr', value: 520000 },
  { month: 'May', value: 480000 },
  { month: 'Jun', value: 610000 },
  { month: 'Jul', value: 689000 },
];

export const CALL_ANALYTICS = [
  { day: 'Mon', inbound: 142, outbound: 218, missed: 24 },
  { day: 'Tue', inbound: 168, outbound: 240, missed: 18 },
  { day: 'Wed', inbound: 155, outbound: 232, missed: 21 },
  { day: 'Thu', inbound: 198, outbound: 268, missed: 15 },
  { day: 'Fri', inbound: 178, outbound: 252, missed: 19 },
  { day: 'Sat', inbound: 82, outbound: 118, missed: 8 },
  { day: 'Sun', inbound: 45, outbound: 62, missed: 4 },
];

export const FUNNEL_DATA = [
  { stage: 'Leads', value: 3542, percent: 100 },
  { stage: 'Contacted', value: 2480, percent: 70 },
  { stage: 'Qualified', value: 1240, percent: 35 },
  { stage: 'Proposal', value: 620, percent: 17.5 },
  { stage: 'Negotiation', value: 310, percent: 8.7 },
  { stage: 'Won', value: 186, percent: 5.3 },
];

export const HEATMAP_DATA = Array.from({ length: 7 }, () =>
  Array.from({ length: 24 }, () => Math.floor(Math.random() * 5))
);

export const SALES_PERFORMANCE = [
  { name: 'Sarah Chen', value: 257, target: 300 },
  { name: 'James Holt', value: 168, target: 250 },
  { name: 'Lena Ortiz', value: 92, target: 200 },
  { name: 'Marcus Reid', value: 84, target: 200 },
  { name: 'Aisha Patel', value: 96, target: 150 },
];

export const INVOICES = [
  { id: 'INV-2026-074', date: 'Jul 24, 2026', amount: 4800, status: 'Paid', plan: 'Growth — 25 seats' },
  { id: 'INV-2026-068', date: 'Jun 24, 2026', amount: 4800, status: 'Paid', plan: 'Growth — 25 seats' },
  { id: 'INV-2026-061', date: 'May 24, 2026', amount: 4200, status: 'Paid', plan: 'Growth — 22 seats' },
  { id: 'INV-2026-053', date: 'Apr 24, 2026', amount: 4200, status: 'Paid', plan: 'Growth — 22 seats' },
  { id: 'INV-2026-047', date: 'Mar 24, 2026', amount: 3600, status: 'Paid', plan: 'Starter — 18 seats' },
];

export const DOCUMENTS = [
  { id: 'D-01', name: 'Acme Corp — Master Agreement.pdf', type: 'pdf', size: '2.4 MB', folder: 'Contracts', modified: '2h ago' },
  { id: 'D-02', name: 'Lumen Health — HIPAA Addendum.pdf', type: 'pdf', size: '1.8 MB', folder: 'Contracts', modified: '1d ago' },
  { id: 'D-03', name: 'Q3 Sales Forecast.xlsx', type: 'sheet', size: '420 KB', folder: 'Reports', modified: '3h ago' },
  { id: 'D-04', name: 'Vertex.io — Proposal v3.docx', type: 'doc', size: '880 KB', folder: 'Proposals', modified: '5h ago' },
  { id: 'D-05', name: 'Onboarding Guide.pdf', type: 'pdf', size: '3.2 MB', folder: 'Templates', modified: '1w ago' },
  { id: 'D-06', name: 'Pricing Sheet — Enterprise.xlsx', type: 'sheet', size: '180 KB', folder: 'Templates', modified: '1w ago' },
  { id: 'D-07', name: 'Northwind — SOW.pdf', type: 'pdf', size: '1.2 MB', folder: 'Contracts', modified: '2d ago' },
  { id: 'D-08', name: 'Team Performance — July.xlsx', type: 'sheet', size: '340 KB', folder: 'Reports', modified: '4h ago' },
];

export const DOCUMENT_FOLDERS = ['Contracts', 'Proposals', 'Reports', 'Templates', 'Marketing', 'Legal'];

export const FAQ_SUPPORT = [
  { q: 'How do I port my existing phone number?', a: 'Go to Settings → Phone Numbers → Port Number. Enter your current carrier details and we handle the rest. Porting typically takes 3-5 business days.' },
  { q: 'Can I customize the dispositions after a call?', a: 'Yes. Navigate to Settings → Call Settings → Dispositions. You can add, edit, or reorder dispositions anytime. Changes apply instantly across your team.' },
  { q: 'How does the AI follow-up work?', a: 'After each recorded call, our AI transcribes the conversation, identifies action items, and drafts a follow-up email or SMS you can review and send with one click.' },
  { q: 'What happens when I hit my call limit?', a: 'You\'ll get a notification at 80% and 100% usage. You can upgrade your plan instantly in Billing, or enable overage billing to keep calling without interruption.' },
  { q: 'How do I add team members?', a: 'Go to Team → Invite Member. Enter their email and assign a role. They\'ll get an invite link valid for 7 days.' },
];

export const PLANS = [
  { name: 'Starter', price: 29, period: '/seat/mo', seats: 'Up to 10 seats', features: ['Lead management', 'Call recording', 'Basic analytics', 'Email support'], current: false, popular: false },
  { name: 'Growth', price: 79, period: '/seat/mo', seats: 'Up to 100 seats', features: ['Everything in Starter', 'AI follow-ups', 'WhatsApp + SMS', 'Advanced analytics', 'Priority support'], current: true, popular: true },
  { name: 'Enterprise', price: 0, period: 'Custom', seats: 'Unlimited seats', features: ['Everything in Growth', 'SSO + SAML', 'Custom integrations', 'Dedicated CSM', '99.99% SLA'], current: false, popular: false },
];
