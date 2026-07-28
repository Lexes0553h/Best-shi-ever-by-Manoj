'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'We replaced three tools with Vocalyze and cut our average response time from 4 hours to 12 minutes. The AI follow-ups alone paid for the platform in the first month.',
    name: 'Sarah Chen',
    role: 'VP Sales',
    company: 'Northwind Logistics',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    quote:
      'The live monitoring changed how we coach. I can whisper guidance to a struggling rep mid-call and watch them close it. Our conversion is up 38% quarter over quarter.',
    name: 'Marcus Reid',
    role: 'Director of Inside Sales',
    company: 'Vertex.io',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    quote:
      'I\'ve used every CRM on the market. Vocalyze is the first one my reps actually open without being told to. It\'s fast, it\'s beautiful, and it just works.',
    name: 'Priya Nair',
    role: 'Head of Revenue Ops',
    company: 'Lumen Health',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    quote:
      'Onboarding 200 reps took a single afternoon. The pipeline view, auto-dialer, and WhatsApp integration mean our team never leaves the app. Game changer.',
    name: 'James Holt',
    role: 'COO',
    company: 'Apex Financial',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
  {
    quote:
      'The sentiment analysis flagged a churn-risk call before we lost the account. That single save covered our annual contract. Vocalyze pays for itself.',
    name: 'Lena Ortiz',
    role: 'Customer Success Lead',
    company: 'Pinnacle Group',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    rating: 5,
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-12 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-10 lg:mb-16 max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/80">Testimonials</span>
          <h2 className="mt-4 font-display text-4xl font-light tracking-tight sm:text-5xl">
            Loved by the teams
            <span className="gradient-text"> who live on the phone.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-12 min-h-[320px] sm:min-h-[300px] flex flex-col justify-center">
              <Quote className="absolute right-4 top-4 sm:right-8 sm:top-8 h-12 w-12 sm:h-16 sm:w-16 text-primary/10" />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-4 sm:mb-6 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-balance text-base font-light leading-relaxed text-foreground sm:text-xl">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 sm:mt-8 flex items-center gap-4">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <div>
                      <p className="font-medium text-sm sm:text-base">{t.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === index ? 'w-8 bg-primary' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-500 transition-all hover:border-primary/40 hover:text-slate-900"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-500 transition-all hover:border-primary/40 hover:text-slate-900"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
