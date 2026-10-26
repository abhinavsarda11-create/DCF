import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  Printer,
  Mail,
  CheckCircle2,
  X,
  Award,
  ShieldCheck,
  Share2,
  Sparkles,
  ExternalLink,
  Calendar,
  FileCheck,
  Eye,
} from 'lucide-react';
import {
  DonationTier,
  getDonationTier,
  downloadCertificatePdf,
  CertificateDetails,
} from '../lib/generateCertificatePdf';
import { useGoldenBurst } from './GoldenSparkles';

interface DonorCertificateModalProps {
  isOpen: boolean;
  donorName: string;
  donorEmail: string;
  amount: number;
  transactionId: string;
  certificateId: string;
  paidAt: string;
  tier: DonationTier;
  onClose: () => void;
}

export function DonorCertificateModal({
  isOpen,
  donorName,
  donorEmail,
  amount,
  transactionId,
  certificateId,
  paidAt,
  tier,
  onClose,
}: DonorCertificateModalProps) {
  const [activeTab, setActiveTab] = useState<'certificate' | 'email'>('certificate');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { triggerGoldenBurst } = useGoldenBurst();

  if (!isOpen) return null;

  const tierInfo = getDonationTier(amount);

  const certDetails: CertificateDetails = {
    donorName: donorName || 'Distinguished Supporter',
    donorEmail: donorEmail || 'contributor@example.com',
    amount,
    tier,
    certificateId,
    transactionId,
    date: paidAt,
  };

  const handleDownload = (e: React.MouseEvent<HTMLElement>) => {
    triggerGoldenBurst(e.clientX, e.clientY, 30);
    downloadCertificatePdf(certDetails);
    setToastMessage(`Downloaded ${tierInfo.tierName} Certificate (PDF)`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="relative w-full max-w-4xl bg-[#fdfbf7] dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-4"
      >
        {/* Top Celebration Bar */}
        <div className="bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#f59e0b] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 shadow-xs">
              <Award className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 bg-black/20 px-2 py-0.5 rounded-full">
                  Payment Verified • 100% Tax Exempt
                </span>
                <span className="text-xs font-mono text-white/90">
                  Ref: {transactionId}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
                Donation Received! Your {tierInfo.tierName} Certificate Is Ready
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Certificate vs Email Dispatch */}
        <div className="bg-stone-100 dark:bg-stone-800/80 px-6 py-2.5 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'certificate'
                  ? 'bg-white dark:bg-stone-900 text-[#ea580c] dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Donor Certificate</span>
            </button>

            <button
              onClick={() => setActiveTab('email')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'email'
                  ? 'bg-white dark:bg-stone-900 text-[#ea580c] dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Simulated Email to {donorEmail}</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Email dispatched automatically</span>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {activeTab === 'certificate' ? (
            /* ================= CERTIFICATE DISPLAY ================= */
            <div className="space-y-4">
              {/* Actual Certificate Container with exact tier background */}
              <div
                className={`w-full rounded-2xl p-6 sm:p-10 border-4 shadow-xl flex flex-col justify-between aspect-[16/10] sm:aspect-[16/9] min-h-[440px] sm:min-h-[520px] select-none relative overflow-hidden transition-all ${
                  tier === 'diamond'
                    ? 'bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100 text-sky-950 border-cyan-400 shadow-[0_0_35px_rgba(56,189,248,0.25)]'
                    : tier === 'gold'
                    ? 'bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 text-amber-950 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.25)]'
                    : tier === 'silver'
                    ? 'bg-gradient-to-br from-slate-100 via-stone-100 to-slate-200 text-slate-900 border-slate-400 shadow-[0_0_30px_rgba(148,163,184,0.2)]'
                    : 'bg-gradient-to-br from-orange-50 via-amber-100 to-orange-200 text-amber-950 border-amber-600 shadow-[0_0_25px_rgba(217,119,6,0.2)]'
                }`}
              >
                {/* Decorative Diamond / Gold / Silver / Bronze Watermark Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center font-black text-9xl">
                  {tier === 'diamond'
                    ? 'DIAMOND'
                    : tier === 'gold'
                    ? 'GOLD'
                    : tier === 'silver'
                    ? 'SILVER'
                    : 'BRONZE'}
                </div>

                {/* Inner double border */}
                <div
                  className={`absolute inset-2 sm:inset-3 rounded-xl border pointer-events-none ${
                    tier === 'diamond'
                      ? 'border-cyan-300'
                      : tier === 'gold'
                      ? 'border-amber-300'
                      : tier === 'silver'
                      ? 'border-slate-300'
                      : 'border-orange-300'
                  }`}
                />

                {/* Certificate Top Header */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-black/10">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                        tier === 'diamond'
                          ? 'bg-gradient-to-tr from-sky-600 to-cyan-400 text-white'
                          : tier === 'gold'
                          ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 text-white'
                          : tier === 'silver'
                          ? 'bg-gradient-to-tr from-slate-600 to-slate-400 text-white'
                          : 'bg-gradient-to-tr from-amber-800 to-orange-600 text-white'
                      }`}
                    >
                      DC
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-hindi text-base sm:text-lg font-bold text-[#c2410c]">
                          शुभ: आरम्भ
                        </span>
                        <span className="font-serif italic font-bold text-[#c2410c] text-sm">
                          Dawn Child
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-600 uppercase tracking-wide">
                        Early Childhood Care & Education • Sec 80G Certified
                      </p>
                    </div>
                  </div>

                  {/* Tier Badge Banner */}
                  <div
                    className={`px-3 sm:px-4 py-1 rounded-full font-bold text-xs uppercase tracking-wider shadow-xs border ${
                      tier === 'diamond'
                        ? 'bg-cyan-500 text-white border-cyan-400'
                        : tier === 'gold'
                        ? 'bg-amber-500 text-white border-amber-400'
                        : tier === 'silver'
                        ? 'bg-slate-600 text-white border-slate-500'
                        : 'bg-amber-800 text-white border-amber-700'
                    }`}
                  >
                    {tierInfo.badgeLabel}
                  </div>
                </div>

                {/* Main Body */}
                <div className="relative z-10 text-center my-auto py-4 space-y-3">
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-600">
                    Certificate of Philanthropic Impact
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                    {donorName || 'Distinguished Supporter'}
                  </h3>

                  <div className="w-24 h-0.5 bg-black/20 mx-auto" />

                  <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed">
                    In profound appreciation for your compassionate donation of{' '}
                    <strong className="text-black font-black">
                      ₹{amount.toLocaleString('en-IN')}/-
                    </strong>{' '}
                    to Dawn Child Foundation. Your contribution directly funds mindful parenting workshops, sensory ECCE toolkits, and early childhood care for vulnerable children across Delhi NCR.
                  </p>
                </div>

                {/* Meta details strip */}
                <div className="relative z-10 bg-white/70 backdrop-blur-xs rounded-xl p-3 border border-black/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-stone-700 gap-2">
                  <div>
                    <span className="text-stone-400">CERTIFICATE NO: </span>
                    <span className="font-bold text-stone-900">{certificateId}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">TXN REF: </span>
                    <span className="font-bold text-stone-900">{transactionId}</span>
                  </div>
                  <div>
                    <span className="text-stone-400">80G REG: </span>
                    <span className="font-bold text-stone-900">DEL-80G/2023-24/A-1082</span>
                  </div>
                  <div>
                    <span className="text-stone-400">DATE: </span>
                    <span className="font-bold text-stone-900">{paidAt}</span>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="relative z-10 pt-4 border-t border-black/10 flex items-center justify-between text-center">
                  <div className="space-y-0.5">
                    <div className="font-serif italic font-bold text-xs text-stone-900">
                      Dr. Ananya Sen
                    </div>
                    <div className="w-28 h-px bg-stone-400 mx-auto" />
                    <div className="text-[10px] text-stone-600 font-medium">
                      Managing Trustee
                    </div>
                  </div>

                  {/* Verified Seal */}
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#ea580c] flex flex-col items-center justify-center text-center p-1 text-[8px] font-black text-[#ea580c] leading-tight rotate-12">
                    <span>DAWN CHILD</span>
                    <span className="text-[6px]">VERIFIED</span>
                    <span>SEAL</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-serif italic font-bold text-xs text-stone-900">
                      Rajesh K. Verma
                    </div>
                    <div className="w-28 h-px bg-stone-400 mx-auto" />
                    <div className="text-[10px] text-stone-600 font-medium">
                      Programme Director
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-500" />
                  <span>Print Certificate</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('email')}
                    className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4 text-stone-500" />
                    <span>View Sent Email</span>
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownload}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f59e0b] hover:from-[#c2410c] hover:to-[#ea580c] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {tierInfo.tierName} Certificate (PDF)</span>
                  </motion.button>
                </div>
              </div>
            </div>
          ) : (
            /* ================= SIMULATED EMAIL INBOX ================= */
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden text-xs sm:text-sm">
              {/* Email Client Header */}
              <div className="bg-stone-50 dark:bg-stone-800 p-4 border-b border-stone-200 dark:border-stone-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    ✓ Email Successfully Delivered
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {paidAt} • Instant Dispatch
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium w-16">From:</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      Dawn Child Foundation &lt;contributions@dawnchild.org&gt;
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium w-16">To:</span>
                    <span className="font-semibold text-stone-900 dark:text-white">
                      {donorEmail}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium w-16">Subject:</span>
                    <span className="font-bold text-stone-900 dark:text-white">
                      Payment Successful: Your ₹{amount} Tax Exemption Receipt & {tierInfo.tierName} Certificate
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="p-6 space-y-4 text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                <p>Dear <strong>{donorName || 'Kind Patron'}</strong>,</p>

                <p>
                  Thank you from the bottom of our hearts for your generous contribution of <strong>₹{amount.toLocaleString('en-IN')}</strong> to the Dawn Child Foundation.
                </p>

                <p>
                  Because of your timely support, we are able to sustain our 10-Week "Shubh: Aarambh" Early Childhood Care & Education cohorts across Municipal Corporation of Delhi primary schools, empowering mothers and creating safe, joyful learning environments.
                </p>

                {/* Highlights Callout */}
                <div className="bg-amber-50 dark:bg-stone-800 p-4 rounded-xl border border-amber-200 dark:border-stone-700 space-y-2">
                  <div className="font-bold text-amber-900 dark:text-amber-400 text-xs uppercase tracking-wider">
                    Official Transaction & Tax Exemption Record:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div>Transaction ID: <strong>{transactionId}</strong></div>
                    <div>Certificate ID: <strong>{certificateId}</strong></div>
                    <div>Amount Paid: <strong>₹{amount} (INR)</strong></div>
                    <div>80G Registration: <strong>DEL-80G/2023-24/A-1082</strong></div>
                    <div>Tax Benefit: <strong>50% Tax Exemption</strong></div>
                    <div>Tier Level: <strong>{tierInfo.tierName}</strong></div>
                  </div>
                </div>

                {/* Attachment Card */}
                <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                    <div>
                      <span className="font-bold text-stone-900 dark:text-white block text-xs">
                        Dawn_Child_{tier.toUpperCase()}_Certificate.pdf
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Official Signed Certificate with {tierInfo.bgDesc}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-4 py-1.5 rounded-lg bg-white dark:bg-stone-700 hover:bg-stone-200 text-stone-900 dark:text-white text-xs font-bold border border-stone-300 dark:border-stone-600 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                <p className="text-xs text-stone-500 pt-2">
                  Warm regards,<br />
                  <strong>The Team at Dawn Child Foundation</strong><br />
                  Registered Office: 206 Second Floor, Block A, Shivalik, Malviya Nagar, New Delhi - 110017<br />
                  Helpline: +91 93113 23002 | Email: contact@dawnchild.org
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Download Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-60 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-300/40 text-xs sm:text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
