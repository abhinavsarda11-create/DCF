import { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { useGoldenBurst } from './GoldenSparkles';

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Parenting Circles Volunteer');
  const [isSuccess, setIsSuccess] = useState(false);
  const { triggerGoldenBurst } = useGoldenBurst();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerGoldenBurst(window.innerWidth / 2, window.innerHeight / 2 - 30, 45);
    setIsSuccess(true);

    fetch('/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: name,
        email,
        phone,
        rolePreference: role,
        availability: 'Flexible (4-6 hrs/week)',
        preferredSchools: ['South Delhi MCD Primary Schools (Chirag Dilli / Hauz Rani)'],
      }),
    }).catch((err) => console.log('Volunteer registration backend notice:', err));
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-[#fdfbf7] dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-[#e2d7c5] dark:border-stone-800"
      >
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-[#eee7da] dark:hover:bg-stone-800 transition-colors z-10 cursor-pointer"
          aria-label="Close volunteer modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="p-6 bg-gradient-to-r from-[#c2410c] via-[#ea580c] via-[#f59e0b] via-[#ea580c] to-[#c2410c] text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(253,224,71,0.35),rgba(255,255,255,0))] pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-100 mb-1">
                <Users className="w-4 h-4 text-amber-300" />
                <span>Join Our Mission</span>
              </div>
              <h3 className="relative z-10 text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                Volunteer with Dawn Child
              </h3>
              <p className="relative z-10 text-xs text-white/95 mt-1">
                Share your time and skills to support children, parents, and community workers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#f25c27]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#f25c27]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9311323002"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#f25c27]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Area of Interest
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#e2d7c5] dark:border-stone-700 bg-[#fdfbf7] dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-[#f25c27]"
                >
                  <option>Parenting Circles Volunteer</option>
                  <option>Early Childhood Educator / Mentor</option>
                  <option>Community Outreach & Field Visits</option>
                  <option>Event Organizing & Fundraiser</option>
                  <option>Content, Design & Storytelling</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.35), 0 0 15px 2px rgba(251, 191, 36, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-2 py-3 rounded-full bg-gradient-to-r from-[#ea580c] via-[#f25c27] to-[#e04515] hover:brightness-105 text-white font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ring-1 ring-amber-300/40"
              >
                <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
                <span>Submit Application</span>
              </motion.button>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
              Welcome to the Family, {name}!
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">
              Our community team in Malviya Nagar, New Delhi will reach out to you within 24-48 hours.
            </p>
            <button
              onClick={handleReset}
              className="px-8 py-2.5 rounded-full bg-[#f25c27] text-white font-semibold text-xs tracking-wide shadow-sm hover:brightness-105 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
