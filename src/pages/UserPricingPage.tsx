import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ArrowRight, Zap, Check, CreditCard, Clock } from 'lucide-react';
import { useAppContext } from '@/src/context/AppContext';

const MOCK_PURCHASES = [
  { plan: 'Free Plan',    date: 'Apr 22, 2026  ·  1:10 PM',  price: '$0.00', credits: 20,  status: 'Active'  },
  { plan: 'Scholar Pro',  date: 'Mar 15, 2026  ·  9:42 AM',  price: '$9.99', credits: 200, status: 'Expired' },
];

export const UserPricingPage: React.FC = () => {
  const { user } = useAppContext();
  const maxCredits = user?.plan === 'pro' ? 200 : 20;
  const usedCredits = maxCredits - (user?.credits ?? 0);
  const usedPct = Math.min((usedCredits / maxCredits) * 100, 100);

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-12 py-8 pb-16">

      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pricing &amp; Credits</h1>
        <p className="text-slate-500 mt-1">Your purchase history and current credit balance.</p>
      </div>

      {/* ── Current Balance Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-indigo-50 border border-indigo-100 p-7"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em] mb-1">Current Balance</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-slate-900">{user?.credits ?? 0}</span>
              <span className="text-slate-400 text-lg mb-1.5 font-semibold">/ {maxCredits} credits</span>
            </div>
            <p className="text-slate-500 text-sm mt-1 capitalize">Plan: <span className="font-bold text-slate-700">{user?.plan}</span></p>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between text-xs text-slate-500 font-medium mb-2">
              <span>{usedCredits} used</span>
              <span>{user?.credits} remaining</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white border border-indigo-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${usedPct}%` }} transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-indigo-600"
              />
            </div>
          </div>
          <Link
            to="/pricing"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shrink-0"
          >
            Buy More Credits <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* ── Purchase History ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Purchase History</h2>
            <p className="text-xs text-slate-400">All your past transactions</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-7 py-4">Plan</th>
                <th className="px-7 py-4">Date &amp; Time</th>
                <th className="px-7 py-4">Credits</th>
                <th className="px-7 py-4">Amount</th>
                <th className="px-7 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PURCHASES.map((p, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                  className="hover:bg-indigo-50/40 transition-colors"
                >
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <p className="font-semibold text-slate-800 text-sm">{p.plan}</p>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-slate-300" />
                      {p.date}
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-orange-400" />
                      <span className="text-sm font-bold text-slate-700">{p.credits} credits</span>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <span className="text-sm font-black text-slate-900">{p.price}</span>
                  </td>
                  <td className="px-7 py-5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      p.status === 'Active'
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Available Plans CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Zap className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Available Packs</h2>
            <p className="text-xs text-slate-400">One-time credit purchases, no subscriptions</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Starter Pack', price: '$5',  credits: 500,  popular: false },
            { name: 'Scholar Pack', price: '$10', credits: 1000, popular: true  },
            { name: 'Master Pack',  price: '$20', credits: 2000, popular: false },
          ].map((pack) => (
            <div
              key={pack.name}
              className={`relative rounded-xl p-5 border transition-all hover:border-indigo-300 hover:shadow-sm cursor-pointer ${
                pack.popular ? 'border-indigo-400 bg-indigo-50' : 'border-slate-200 bg-white'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-2.5 left-4 px-3 py-0.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  Most Popular
                </div>
              )}
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">{pack.name}</p>
              <p className="text-3xl font-black text-slate-900 mb-1">{pack.price}</p>
              <p className="text-sm text-slate-500 mb-4">{pack.credits.toLocaleString()} credits</p>
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all"
              >
                <Check className="h-3.5 w-3.5" /> Buy Now
              </Link>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
