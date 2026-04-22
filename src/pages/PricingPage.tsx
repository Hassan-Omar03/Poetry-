import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Star, Crown, ChevronDown, ChevronUp, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* ── Plans ─────────────────────────────────────────────── */
const PLANS = [
  {
    icon: <Gift className="h-5 w-5" />,
    label: 'Free Starter',
    price: '$0',
    period: '',
    credits: 10,
    creditLabel: '10 Credits',
    desc: 'Perfect to explore the platform.',
    features: [
      '10 credits on signup',
      'Full poem analysis per credit',
      'Translation in 5 languages',
      'Literary device detection',
      'Word dictionary',
      'Save up to 5 poems',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'border border-white/30 bg-white/10 text-white hover:bg-white/20',
    to: '/signup',
    badge: null,
  },
  {
    icon: <Zap className="h-5 w-5" />,
    label: 'Starter Pack',
    price: '$5',
    period: 'one-time',
    credits: 500,
    creditLabel: '500 Credits',
    desc: 'Great for regular poetry readers.',
    features: [
      '500 credits one-time purchase',
      'Full poem analysis per credit',
      'Translation in 120+ languages',
      'Full literary device suite',
      'Unlimited poem saving',
      'Chat follow-ups are free',
    ],
    cta: 'Buy 500 Credits',
    ctaStyle: 'bg-white text-indigo-700 hover:bg-indigo-50 font-bold',
    to: '/signup',
    badge: 'Most Popular',
  },
  {
    icon: <Star className="h-5 w-5" />,
    label: 'Scholar Pack',
    price: '$10',
    period: 'one-time',
    credits: 1000,
    creditLabel: '1000 Credits',
    desc: 'For students and avid readers.',
    features: [
      '1000 credits one-time purchase',
      'Full poem analysis per credit',
      'Translation in 120+ languages',
      'Full literary device suite',
      'Unlimited poem saving',
      'Export to PDF',
    ],
    cta: 'Buy 1000 Credits',
    ctaStyle: 'bg-indigo-600 text-white hover:bg-indigo-700',
    to: '/signup',
    badge: 'Best Value',
  },
  {
    icon: <Crown className="h-5 w-5" />,
    label: 'Master Pack',
    price: '$20',
    period: 'one-time',
    credits: 2000,
    creditLabel: '2000 Credits',
    desc: 'For scholars and power users.',
    features: [
      '2000 credits one-time purchase',
      'Full poem analysis per credit',
      'Translation in 120+ languages',
      'Full literary device suite',
      'Unlimited poem saving',
      'Export to PDF + Priority support',
    ],
    cta: 'Buy 2000 Credits',
    ctaStyle: 'bg-indigo-600 text-white hover:bg-indigo-700',
    to: '/signup',
    badge: null,
  },
];

/* ── FAQ items ─────────────────────────────────────────── */
const FAQS = [
  { q: 'What counts as one credit?',    a: 'Each complete poem analysis uses one credit. This includes translation, explanation, literary devices, and the initial AI response. Follow-up chat messages within the same analysis are free.' },
  { q: 'Do unused credits roll over?',  a: 'No. Credits reset on the 1st of each month. We recommend using your credits throughout the month to get maximum value.' },
  { q: 'Can I cancel anytime?',         a: "Yes. You can cancel your subscription at any time from your account settings. You'll retain access until the end of your billing period." },
  { q: 'Is there a free trial for Pro?',a: 'Yes! New users get 10 free credits with the Free plan. You can upgrade to Pro at any time and we offer a 7-day money-back guarantee.' },
  { q: 'Do credit packs expire?',       a: 'Purchased credit packs are valid for 12 months from the date of purchase. Your free monthly credits reset on the 1st of each month.' },
  { q: 'Can I buy multiple packs?',     a: 'Absolutely! You can purchase multiple credit packs and they will stack. Buy a Starter Pack and a Scholar Pack to get 1500 credits in total.' },
];

/* ── Component ─────────────────────────────────────────── */
export const PricingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      <section className="py-24 px-4 bg-indigo-50">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em] mb-3">Pricing</div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Pay only for what you use
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium" style={{ fontFamily:"'Playfair Display',Georgia,serif" }}>
            No subscriptions. Buy credits once, use them whenever you want. Start free — no card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            {['10 free credits on signup', 'No expiry on paid credits', 'Cancel anytime'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-orange-400 shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-7 flex flex-col border transition-all hover:shadow-lg ${
                  plan.badge
                    ? 'border-indigo-400 bg-indigo-600 text-white'
                    : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[10px] font-black text-indigo-700 bg-white uppercase tracking-widest">
                    {plan.badge}
                  </div>
                )}

                {/* icon + label */}
                <div className={`mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${plan.badge ? 'text-indigo-100' : 'text-indigo-600'}`}>
                  {plan.icon}
                  {plan.label}
                </div>

                {/* price */}
                <div className="mb-1">
                  <span className={`text-5xl font-bold ${plan.badge ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm ml-2 font-medium ${plan.badge ? 'text-indigo-100' : 'text-slate-400'}`}>{plan.period}</span>}
                </div>

                {/* credit badge */}
                <div className={`mb-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                  plan.badge ? 'bg-white/10 text-white border-white/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  <Zap className="h-3 w-3" />
                  {plan.creditLabel}
                </div>

                <p className={`text-sm mb-6 leading-relaxed ${plan.badge ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.desc}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <div className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${plan.badge ? 'bg-white/20 border border-white/30' : 'bg-indigo-50 border border-indigo-200'}`}>
                        <Check className={`h-2.5 w-2.5 ${plan.badge ? 'text-white' : 'text-indigo-600'}`} />
                      </div>
                      <span className={plan.badge ? 'text-indigo-50' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.to}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold text-center uppercase tracking-widest transition-all block ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credit comparison ── */}
      <section className="py-4 px-4 pb-20">
        <div className="container mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-100">
              <div className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Plan</div>
              <div className="px-4 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Price</div>
              <div className="px-4 py-4 text-center text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50">Credits</div>
              <div className="px-4 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Per Credit</div>
            </div>
            {[
              { name: 'Free Starter',  price: '$0',  credits: 10,   per: 'Free' },
              { name: 'Starter Pack',  price: '$5',  credits: 500,  per: '$0.010' },
              { name: 'Scholar Pack',  price: '$10', credits: 1000, per: '$0.010' },
              { name: 'Master Pack',   price: '$20', credits: 2000, per: '$0.010' },
            ].map((row, i) => (
              <div key={row.name} className={`grid grid-cols-4 items-center border-b border-slate-100 last:border-0 ${i % 2 !== 0 ? 'bg-slate-50/50' : ''}`}>
                <div className="px-5 py-4 text-sm font-semibold text-slate-700">{row.name}</div>
                <div className="px-4 py-4 text-center text-sm font-bold text-slate-900">{row.price}</div>
                <div className="px-4 py-4 text-center bg-indigo-50/40">
                  <span className="text-sm font-bold text-indigo-700">{row.credits.toLocaleString()}</span>
                </div>
                <div className="px-4 py-4 text-center text-sm text-slate-500 font-medium">{row.per}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing FAQ ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Pricing FAQ
            </h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === i
                    ? 'border-indigo-200 bg-white'
                    : 'border-slate-200 bg-white hover:border-indigo-100'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 text-base pr-4">{faq.q}</span>
                  <div className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openFaq === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {openFaq === i ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-slate-500 leading-relaxed text-[15px]">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* bottom CTA */}
          <div className="mt-14 text-center">
            <p className="text-slate-500 mb-6 font-medium">Not sure which pack? Start free — no card required.</p>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-10 py-4 font-bold text-white text-sm hover:bg-indigo-700 transition-all">
              Get 10 Free Credits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
