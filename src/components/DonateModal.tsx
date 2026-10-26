import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  Info,
} from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';
import { getDonationTier, DonationTier } from '../lib/generateCertificatePdf';
import { DummyPaymentPortal } from './DummyPaymentPortal';
import { DonorCertificateModal } from './DonorCertificateModal';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState('2500');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Portal & Certificate States
  const [isPaymentPortalOpen, setIsPaymentPortalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [completedTxData, setCompletedTxData] = useState<{
    transactionId: string;
    certificateId: string;
    paidAt: string;
    tier: DonationTier;
  } | null>(null);

  const { triggerGoldenBurst } = useGoldenBurst();

  // Tier Presets mapping to the user's specific tier rules
  const presetAmounts = [
    { label: '₹50', value: '50', tierBadge: '🥉 Bronze (₹1-₹99)' },
    { label: '₹500', value: '500', tierBadge: '🥈 Silver (₹101-₹999)' },
    { label: '₹2,500', value: '2500', tierBadge: '🥇 Gold (₹1,001-₹10K)' },
    { label: '₹15,000', value: '15000', tierBadge: '💎 Diamond (>₹10K)' },
  ];

  const parsedAmount = Math.max(1, Number(amount) || 1);
  const currentTier = getDonationTier(parsedAmount);

  const handlePresetClick = (presetVal: string, e: React.MouseEvent) => {
    setAmount(presetVal);
    triggerGoldenBurst(e.clientX, e.clientY, 14);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerGoldenBurst(window.innerWidth / 2, window.innerHeight / 2 - 40, 24);
    setIsPaymentPortalOpen(true);
  };

  const handlePaymentSuccess = (txData: {
    transactionId: string;
    certificateId: string;
    paidAt: string;
    tier: DonationTier;
  }) => {
    setCompletedTxData(txData);
    setIsPaymentPortalOpen(false);
    setIsCertificateModalOpen(true);

    fetch('/api/donation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        donorName: name || 'Generous Supporter',
        donorEmail: email || 'donor@dawnchildfoundation.org',
        donorPhone: phone || '',
        amount: Number(amount) || 1000,
        paymentMethod: 'UPI',
        transactionReference: txData.transactionId,
        purpose: `Dawn Child Foundation Support (${txData.tier.toUpperCase()} tier)`,
        is80GRequested: true,
      }),
    }).catch((err) => console.log('Donation sync notice:', err));
  };

  const handleCloseAll = () => {
    setIsPaymentPortalOpen(false);
    setIsCertificateModalOpen(false);
    setCompletedTxData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-[#fdfbf7] dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-[#e2d7c5] dark:border-stone-800 my-4"
        >
          <button
            onClick={handleCloseAll}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-[#eee7da] dark:hover:bg-stone-800 transition-colors z-10 cursor-pointer"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            {/* Modal Top Header with Radiant Blend */}
            <div className="p-6 bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.36),rgba(255,255,255,0))] pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-100 mb-1">
                <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Make a Lasting Impact</span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Donate to Dawn Child Foundation
              </h3>
              <p className="relative z-10 text-xs text-white/95 mt-1">
                Empower a mother, educate a child, and nurture an entire community.
              </p>
            </div>

            {/* Donation Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Frequency Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#eee7da] dark:bg-stone-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    frequency === 'once'
                      ? 'bg-[#fdfbf7] dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  One-time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    frequency === 'monthly'
                      ? 'bg-[#fdfbf7] dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  Monthly Nurturer
                </button>
              </div>

              {/* Amount Selection & Dynamic Tier Badges */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Select Amount (INR ₹)
                  </label>
                  <span className="text-[11px] font-bold text-[#ea580c] dark:text-amber-400">
                    Tier: {currentTier.badgeLabel}
                  </span>
                </div>

                {/* Preset Tier Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                  {presetAmounts.map((preset) => (
                    <button
                      type="button"
                      key={preset.value}
                      onClick={(e) => handlePresetClick(preset.value, e)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                        amount === preset.value
                          ? 'border-[#ea580c] bg-orange-50 dark:bg-orange-950/40 text-[#ea580c] dark:text-amber-400 ring-2 ring-amber-300/60 shadow-xs'
                          : 'border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-[#d4c5b0]'
                      }`}
                    >
                      <div className="text-sm font-black">{preset.label}</div>
                      <div className="text-[9px] text-stone-500 truncate mt-0.5">
                        {preset.tierBadge.split(' ')[1]}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom donation amount"
                    className="w-full pl-8 pr-4 py-2.5 text-sm font-semibold rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                    min="1"
                    required
                  />
                </div>

                {/* Dynamic Certificate Tier Explanation Callout */}
                <div
                  className={`mt-2 p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                    currentTier.tier === 'diamond'
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 text-sky-900 dark:text-sky-200'
                      : currentTier.tier === 'gold'
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-900 dark:text-amber-200'
                      : currentTier.tier === 'silver'
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-800 dark:text-slate-200'
                      : 'bg-orange-50 dark:bg-orange-950/60 border-orange-300 text-orange-900 dark:text-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 shrink-0 text-[#ea580c] dark:text-amber-400" />
                    <span className="font-semibold text-[11px] sm:text-xs">
                      Unlocks <strong>{currentTier.badgeLabel}</strong> ({currentTier.bgDesc})
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider shrink-0 opacity-80">
                    Auto-Emailed
                  </span>
                </div>
              </div>

              {/* Donor Contact info */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Full Name (Appears on Donor Certificate)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#ea580c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Email Address (To Receive Certificate)
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anjali@example.com"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#ea580c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#ea580c]"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Benefits badge */}
              <div className="flex items-center gap-2 p-2.5 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200/70 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  All contributions receive an instant Section 80G tax rebate receipt.
                </span>
              </div>

              {/* Action Button: Opens Dummy Payment Portal */}
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    '0 10px 25px -5px rgba(234, 88, 12, 0.35), 0 0 15px 2px rgba(251, 191, 36, 0.35)',
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:brightness-105 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ring-1 ring-amber-300/50"
              >
                <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>Proceed to Dummy Payment Portal (₹{parsedAmount})</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* ================= DUMMY PAYMENT PORTAL ================= */}
      <DummyPaymentPortal
        isOpen={isPaymentPortalOpen}
        donorName={name || 'Distinguished Supporter'}
        donorEmail={email || 'donor@example.com'}
        donorPhone={phone || '+91 93113 23002'}
        amount={parsedAmount}
        frequency={frequency}
        onClose={() => setIsPaymentPortalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* ================= DONOR CERTIFICATE & SIMULATED EMAIL MODAL ================= */}
      {completedTxData && (
        <DonorCertificateModal
          isOpen={isCertificateModalOpen}
          donorName={name || 'Distinguished Supporter'}
          donorEmail={email || 'donor@example.com'}
          amount={parsedAmount}
          transactionId={completedTxData.transactionId}
          certificateId={completedTxData.certificateId}
          paidAt={completedTxData.paidAt}
          tier={completedTxData.tier}
          onClose={handleCloseAll}
        />
      )}
    </>
  );
}
