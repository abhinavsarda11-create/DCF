import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  QrCode,
  Building,
  Smartphone,
  CheckCircle2,
  X,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getDonationTier, DonationTier } from '../lib/generateCertificatePdf';
import { useGoldenBurst } from './GoldenSparkles';

interface DummyPaymentPortalProps {
  isOpen: boolean;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  frequency: 'once' | 'monthly';
  onClose: () => void;
  onPaymentSuccess: (transactionData: {
    transactionId: string;
    certificateId: string;
    paidAt: string;
    tier: DonationTier;
  }) => void;
}

export function DummyPaymentPortal({
  isOpen,
  donorName,
  donorEmail,
  donorPhone,
  amount,
  frequency,
  onClose,
  onPaymentSuccess,
}: DummyPaymentPortalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState(`${donorEmail ? donorEmail.split('@')[0] : 'donor'}@okhdfcbank`);
  const [cardNumber, setCardNumber] = useState('4532 8812 9043 7712');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const { triggerGoldenBurst } = useGoldenBurst();

  if (!isOpen) return null;

  const tierInfo = getDonationTier(amount);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep('Connecting to secure banking network...');

    setTimeout(() => {
      setProcessingStep('Authorizing dummy transaction with issuing bank...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Transaction verified! Generating 80G tax receipt and certificate...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      triggerGoldenBurst(window.innerWidth / 2, window.innerHeight / 2, 45);

      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const txId = `TXN-DCF-${Date.now().toString().slice(-6)}-${randomDigits.toString().slice(0, 4)}`;
      let certId = `DCF-CERT-2026-${randomDigits}`;
      const nowFormatted = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Persist digital certificate record in database through Express API
      fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName: donorName || 'Distinguished Supporter',
          donorEmail: donorEmail || 'contributor@example.com',
          donationAmount: amount,
          transactionId: txId,
          certificateNumber: certId,
          issuedAt: new Date().toISOString(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.certificate) {
            certId = data.certificate.certificate_number;
          }
        })
        .catch((err) => console.warn('Certificate database save notice:', err))
        .finally(() => {
          onPaymentSuccess({
            transactionId: txId,
            certificateId: certId,
            paidAt: nowFormatted,
            tier: tierInfo.tier,
          });
        });
    }, 2600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-4"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ea580c] to-[#f59e0b] flex items-center justify-center text-white shadow-xs">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/80">
                  Sandbox Test Portal
                </span>
                <span className="text-xs font-mono text-stone-400">256-bit SSL</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Dawn Child Foundation Secure Checkout
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip with Tier Preview */}
        <div className="bg-amber-50/80 dark:bg-stone-800/80 px-6 py-4 border-b border-amber-200/70 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
              Donation Summary
            </span>
            <div className="text-sm font-bold text-stone-900 dark:text-white">
              {donorName || 'Kind Supporter'} •{' '}
              <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                {donorEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tier Badge */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
                tierInfo.tier === 'diamond'
                  ? 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300'
                  : tierInfo.tier === 'gold'
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300'
                  : tierInfo.tier === 'silver'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300'
                  : 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border-orange-300'
              }`}
            >
              {tierInfo.badgeLabel}
            </div>

            <div className="text-right">
              <span className="text-[10px] font-semibold text-stone-500 uppercase block">
                Total Amount
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#ea580c] dark:text-amber-400">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods Body */}
        {!isProcessing ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Method selector */}
              <div className="md:col-span-4 space-y-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Payment Method
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === 'upi'
                      ? 'border-[#ea580c] bg-orange-50/70 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold ring-1 ring-[#ea580c]'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#ea580c]" />
                  <div>
                    <span className="text-xs block">UPI / QR Code</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      GPay, PhonePe, Paytm
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#ea580c] bg-orange-50/70 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold ring-1 ring-[#ea580c]'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#ea580c]" />
                  <div>
                    <span className="text-xs block">Debit / Credit Card</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      Visa, Mastercard, RuPay
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#ea580c] bg-orange-50/70 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold ring-1 ring-[#ea580c]'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#ea580c]" />
                  <div>
                    <span className="text-xs block">Net Banking</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      All Major Indian Banks
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('wallet')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedMethod === 'wallet'
                      ? 'border-[#ea580c] bg-orange-50/70 dark:bg-orange-950/40 text-stone-900 dark:text-white font-bold ring-1 ring-[#ea580c]'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#ea580c]" />
                  <div>
                    <span className="text-xs block">Wallets</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      Amazon Pay, Paytm
                    </span>
                  </div>
                </button>
              </div>

              {/* Right Column: Interactive method details */}
              <div className="md:col-span-8 bg-stone-50 dark:bg-stone-800/50 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 flex flex-col justify-between">
                {selectedMethod === 'upi' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        Scan Dummy QR with Any UPI App
                      </span>
                      <span className="text-[10px] font-mono text-[#ea580c] bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded-full">
                        Instant Approval
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-5 bg-white dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                      {/* Simulated QR Code Canvas */}
                      <div className="w-32 h-32 bg-stone-900 p-2 rounded-xl flex flex-col items-center justify-center text-white shrink-0 relative overflow-hidden shadow-inner">
                        <div className="w-full h-full border-2 border-dashed border-amber-400/80 rounded-lg flex flex-col items-center justify-center p-1 text-center">
                          <QrCode className="w-16 h-16 text-white" />
                          <span className="text-[8px] font-mono text-amber-300 mt-1">
                            DAWNCHILD@UPI
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                        <p className="font-semibold text-stone-800 dark:text-white">
                          Scan to pay ₹{amount} to Dawn Child Foundation
                        </p>
                        <p className="text-[11px] text-stone-500">
                          Supports Google Pay, PhonePe, Paytm, BHIM, CRED, and all BHIM UPI bank apps.
                        </p>
                        <div className="pt-1">
                          <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                            Or Enter Virtual Payment Address (VPA / UPI ID)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'card' && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                      Dummy Card Details (Pre-filled for Sandbox Testing)
                    </span>

                    <div>
                      <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                          Valid Thru (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={donorName || 'Distinguished Supporter'}
                        readOnly
                        className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'netbanking' && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                      Select Simulated Bank for NetBanking
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(
                        (bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`p-2.5 text-xs font-medium rounded-xl border transition-all text-left cursor-pointer ${
                              selectedBank === bank
                                ? 'border-[#ea580c] bg-orange-100/70 dark:bg-orange-950/60 font-bold text-stone-900 dark:text-white'
                                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300'
                            }`}
                          >
                            🏦 {bank}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {selectedMethod === 'wallet' && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                      Select Digital Wallet
                    </span>
                    <div className="space-y-2">
                      {['Paytm Wallet (Linked: +91 93113 23002)', 'Amazon Pay Balance', 'PhonePe Wallet'].map(
                        (w, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 flex items-center justify-between"
                          >
                            <span>📱 {w}</span>
                            <span className="text-[10px] text-emerald-600 font-bold">Ready</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Simulated Payment Trigger Button */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-700 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSimulatePayment}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] text-white font-bold text-sm shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                    <span>Complete Test Payment of ₹{amount.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p className="text-[11px] text-center text-stone-500 mt-2">
                    🔒 Sandbox environment: Simulates genuine transaction and auto-dispatches certificate to {donorEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Processing Screen */
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-amber-200 border-t-[#ea580c] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#ea580c]" />
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h4 className="text-xl font-bold text-stone-900 dark:text-white">
                Processing Test Payment...
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-mono animate-pulse">
                {processingStep}
              </p>
            </div>

            <div className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-semibold">
              Please do not refresh or close this sandbox portal
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
