'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Search,
  Play,
  X,
  MoreVertical,
} from 'lucide-react';
import { PageHeader, Card, Badge, Button, Avatar } from '@/components/crm/crm-ui';
import { useCalls, useContacts } from '@/lib/data/hooks';
import type { Call } from '@/lib/crm-data';
import { cn } from '@/lib/utils';

const DIRECTIONS = ['All', 'Inbound', 'Outbound', 'Missed'] as const;
type DirectionFilter = (typeof DIRECTIONS)[number];


function DirectionIcon({ direction }: { direction: Call['direction'] }) {
  if (direction === 'inbound') {
    return <PhoneIncoming className="h-4 w-4 text-cyan" />;
  }
  if (direction === 'outbound') {
    return <PhoneOutgoing className="h-4 w-4 text-primary" />;
  }
  return <PhoneMissed className="h-4 w-4 text-red-400" />;
}

function dispositionVariant(disposition: string): 'primary' | 'cyan' | 'green' | 'red' | 'muted' {
  const v = disposition.toLowerCase();
  if (v.includes('interest') || v.includes('demo')) return 'cyan';
  if (v.includes('proposal') || v.includes('negotiat')) return 'primary';
  if (v.includes('follow') || v.includes('needs')) return 'green';
  if (v.includes('no answer') || v.includes('lost')) return 'red';
  return 'muted';
}

function Waveform({ playing }: { playing: boolean }) {
  const bars = Array.from({ length: 48 });
  return (
    <div className="flex h-16 items-center gap-0.5">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 flex-shrink-0 rounded-full bg-gradient-to-t from-primary/40 to-cyan"
          initial={{ height: 4 }}
          animate={
            playing
              ? { height: [4, 6 + ((i * 7) % 44), 8 + ((i * 13) % 32), 6, 4] }
              : { height: 6 + ((i * 11) % 26) }
          }
          transition={
            playing
              ? { duration: 0.9, repeat: Infinity, delay: (i % 12) * 0.05, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export default function CallHistoryPage() {
  const { data: CALLS = [] } = useCalls();
  const { data: CONTACTS = [] } = useContacts();
  const AVATAR_BY_NAME: Record<string, string> = Object.fromEntries(
    CONTACTS.map((c) => [c.name, c.avatar])
  );
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<DirectionFilter>('All');
  const [selected, setSelected] = useState<Call | null>(null);
  const [playing, setPlaying] = useState(false);

  const filtered = useMemo(
    () =>
      CALLS.filter((c) => {
        const matchesSearch =
          c.contact.toLowerCase().includes(search.toLowerCase()) ||
          c.company.toLowerCase().includes(search.toLowerCase()) ||
          c.agent.toLowerCase().includes(search.toLowerCase());
        const matchesDirection =
          direction === 'All' || c.direction === direction.toLowerCase();
        return matchesSearch && matchesDirection;
      }),
    [search, direction]
  );

  const openModal = (call: Call) => {
    setSelected(call);
    setPlaying(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Call History" subtitle="All calls across your team" />

      {/* Filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by contact, company, or agent…"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as DirectionFilter)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {DIRECTIONS.map((d) => (
            <option key={d} value={d} className="bg-bg-secondary">
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Calls table */}
      <Card className="p-0" delay={0.1}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Direction</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Disposition</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Recording</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((call, i) => (
                <motion.tr
                  key={call.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  onClick={() => openModal(call)}
                  className="cursor-pointer border-b border-white/5 transition-colors last:border-0 hover:bg-white/5"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={AVATAR_BY_NAME[call.contact]} name={call.contact} size={32} />
                      <div>
                        <p className="font-medium">{call.contact}</p>
                        <p className="text-xs text-muted-foreground">{call.agent}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{call.company}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <DirectionIcon direction={call.direction} />
                      <span className="capitalize text-muted-foreground">{call.direction}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{call.duration}</td>
                  <td className="px-5 py-3">
                    <Badge variant={dispositionVariant(call.disposition)}>{call.disposition}</Badge>
                  </td>
                  <td className="px-5 py-3">
                    <p>{call.date}</p>
                    <p className="text-xs text-muted-foreground">{call.time}</p>
                  </td>
                  <td className="px-5 py-3">
                    {call.recording ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(call);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/15 text-cyan ring-1 ring-cyan/20 transition-colors hover:bg-cyan/25"
                      >
                        <Play className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center text-sm text-muted-foreground">
            No calls match your filters.
          </div>
        )}
      </Card>

      {/* Call detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg overflow-hidden rounded-2xl glass-strong p-6"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={AVATAR_BY_NAME[selected.contact]} name={selected.contact} size={44} ring />
                    <div>
                      <h2 className="font-medium">{selected.contact}</h2>
                      <p className="text-xs text-muted-foreground">
                        {selected.company} • {selected.agent}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-muted-foreground">Direction</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <DirectionIcon direction={selected.direction} />
                      <span className="text-sm capitalize">{selected.direction}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="mt-1 text-sm tabular-nums">{selected.duration}</p>
                  </div>
                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-muted-foreground">Disposition</p>
                    <div className="mt-1">
                      <Badge variant={dispositionVariant(selected.disposition)}>
                        {selected.disposition}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selected.recording ? (
                  <div className="mb-5 rounded-xl bg-white/5 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium">Recording</p>
                      <Button
                        size="sm"
                        variant={playing ? 'secondary' : 'primary'}
                        onClick={() => setPlaying((p) => !p)}
                      >
                        <Play className="h-3.5 w-3.5" />
                        {playing ? 'Pause' : 'Play'}
                      </Button>
                    </div>
                    <Waveform playing={playing} />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>0:00</span>
                      <span>{selected.duration}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5 rounded-xl bg-white/5 p-4 text-center text-sm text-muted-foreground">
                    No recording available for this call.
                  </div>
                )}

                <div>
                  <p className="mb-2 text-sm font-medium">Notes</p>
                  <p className="rounded-xl bg-white/5 p-4 text-sm text-muted-foreground">
                    {selected.notes || 'No notes recorded for this call.'}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
