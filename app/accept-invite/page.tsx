'use client';

import { useState, useEffect, Suspense, type FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, User, Mail, Building2, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { AuthShell, authInputClass } from '@/components/auth/auth-shell';
import { useAuth } from '@/lib/auth/auth-context';

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { acceptInvite } = useAuth();

  const token = searchParams.get('token') || 'inv_demo_123';
  const emailParam = searchParams.get('email') || 'employee@xyzcompany.com';
  const companyParam = searchParams.get('company') || 'Vocalyze Global';

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      setError('Please provide your name and set a password.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await acceptInvite({ token, name, password });
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      router.push('/app/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to activate employee account.');
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title={`Join ${companyParam}`}
      subtitle="You’ve been invited to join the Telecalling CRM Workstation"
    >
      <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-center gap-3">
        <Building2 className="h-5 w-5 text-emerald-700 shrink-0" />
        <div className="text-xs text-emerald-900">
          <p className="font-bold">Company Invitation Valid</p>
          <p className="text-emerald-700">Invited Email: <span className="font-medium">{emailParam}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Robert Vance"
              className={`${authInputClass} pl-11`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Work Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              disabled
              value={emailParam}
              className={`${authInputClass} pl-11 bg-slate-100 text-slate-500 cursor-not-allowed`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">Set Account Password *</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              required
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 characters password"
              className={`${authInputClass} pl-11 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-600 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:bg-emerald-800 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Activating Account…
            </>
          ) : (
            <>
              Activate Account & Enter Workstation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm text-slate-500">Loading Invitation…</div>}>
      <AcceptInviteContent />
    </Suspense>
  );
}
