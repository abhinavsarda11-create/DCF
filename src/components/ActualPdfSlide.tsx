import React from 'react';
import {
  Users,
  School,
  Building,
  Handshake,
  BookOpen,
  UserCheck,
  MessageSquare,
  Award,
  Heart,
  Calendar,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ActualPdfSlideProps {
  pageNumber: number;
}

export function ActualPdfSlide({ pageNumber }: ActualPdfSlideProps) {
  // Brand Header component for slides 1 to 14
  const SlideBrandHeader = ({ title, rightBadge }: { title?: string; rightBadge?: string }) => (
    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-amber-900/10 mb-4 sm:mb-6">
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Sun Swirl Emblem */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#fde047] flex items-center justify-center p-1 shadow-xs shrink-0">
          <div className="w-full h-full rounded-full border-2 border-dashed border-white/80 flex items-center justify-center text-[10px] font-bold text-white leading-none">
            DC
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-hindi text-base sm:text-xl font-black text-[#c2410c] tracking-tight">
              शुभ: आरम्भ
            </span>
            <span className="font-serif italic font-bold text-[#c2410c] text-sm sm:text-base">
              Dawn Child
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] font-medium text-stone-500 tracking-wide uppercase">
            Early Childhood Care & Education
          </p>
        </div>
      </div>

      <div className="text-right">
        {rightBadge && (
          <span className="text-lg sm:text-2xl font-black text-stone-900 font-sans tracking-tight">
            {rightBadge}
          </span>
        )}
      </div>
    </div>
  );

  // Bottom footer tag on every slide
  const SlideFooter = ({ customTag }: { customTag?: string }) => (
    <div className="pt-3 sm:pt-4 border-t border-amber-900/10 flex items-center justify-between text-[11px] sm:text-xs text-stone-500 font-medium mt-auto">
      <span>Dawn Child Foundation • New Delhi</span>
      <span className="italic font-sans text-stone-600 font-semibold">
        {customTag || 'Activities 2024-25 Dawn Child Foundation'}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-[#fcf8ef] text-stone-900 rounded-2xl p-6 sm:p-10 shadow-lg border border-amber-200/80 flex flex-col justify-between aspect-[16/9] min-h-[460px] sm:min-h-[580px] overflow-hidden select-none">
      {/* ================= PAGE 1: COVER ================= */}
      {pageNumber === 1 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center flex-1 my-2">
            <div className="md:col-span-7 space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 leading-tight">
                Empowering Parents in Early Childhood Development:
              </h1>
              <div className="text-xl sm:text-2xl font-bold text-stone-800">
                A Journey with
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#c2410c] tracking-tight">
                Dawn Child Foundation
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-stone-700 leading-relaxed pt-2 max-w-xl">
                At Dawn Child, we empower parents through our 10 Week Curriculum which is a unique blend of early childhood activities, mindfulness, and non-violent communication to foster happy and healthy childhoods.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-3 border-amber-300/80 w-full aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=800&q=80"
                  alt="Community session in circle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-white p-2 text-center text-[11px]">
                  Community circle session with mothers & children
                </div>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 2: VISION AND MISSION ================= */}
      {pageNumber === 2 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-2">
            {/* Left side */}
            <div className="md:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                Vision and Mission
              </h2>
              <div className="text-2xl sm:text-3xl font-black text-[#c2410c]">
                Dawn Child Foundation
              </div>
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-3 border-amber-300 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
                  alt="Mothers walking together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Middle Badge */}
            <div className="md:col-span-2 flex justify-center">
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-[#f59e0b] text-white font-hindi font-black text-lg shadow-sm border border-amber-300">
                शुभ: आरम्भ
              </div>
            </div>

            {/* Right side */}
            <div className="md:col-span-5 space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-stone-900">Vision</h3>
                <p className="text-sm sm:text-base text-stone-800 leading-snug">
                  A world where every parent or caregiver will love and enjoy playing meaningfully with their child.
                </p>
              </div>

              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm ml-auto">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80"
                  alt="Parents in session"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-stone-900">Mission</h3>
                <p className="text-sm sm:text-base text-stone-800 leading-snug">
                  Support parents enjoy their Parenthood, so that their children can enjoy their Childhood.
                </p>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 3: SUMMARY ================= */}
      {pageNumber === 3 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Summary" />

          <div className="space-y-4 sm:space-y-6 flex-1 my-2">
            <h2 className="text-lg sm:text-2xl font-black text-stone-900 leading-snug">
              We formed connections with 10 Schools, &gt;1000 parents, &gt;30 School staffs, &gt;50 Volunteers so far
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs sm:text-sm">
              {/* Left Column */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                    <School className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Orientation with Principals, Teachers, and Parents
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Connected with &gt;1000 parents during school and community visits
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Conducted weekly sessions in ten schools, community centers, parks, homes
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    collaborated with other CSOs to get their support in our work
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Build frameworks around our programme structure
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Engagend interns/ volunteers from colleges to assisting us and for sprit of volunteerism
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Collected stories of change from the field
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-stone-800 font-semibold leading-snug">
                    Created impact with our work
                  </span>
                </div>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 4: OUR WORK SO FAR ================= */}
      {pageNumber === 4 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-2">
            <div className="md:col-span-6 bg-[#fde9d9] p-5 sm:p-6 rounded-2xl border border-orange-200 space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 pb-1 border-b border-orange-300/60">
                Our work so far...
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 leading-snug">
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Conducted introductory orientation sessions with parents and teachers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Conducted 40 workshops with parents across 5 MCD primary schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Collaborated with other CSOs and Colleges students to conduct sessions on topics related to livelihood, caregiving and women empowerment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Undertook multiple parents, community and Anganwadi visits to gain contextual understanding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Conducted conducted Focused Group Discussion on identifying the needs of the parents</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-6 space-y-2">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-stone-200 aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=800&q=80"
                  alt="Mothers seated in circle outdoors"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
                  📍 New Delhi, India • 840/1A, Chirag Dilli
                </div>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 5: PEG MEETINGS & 100% RATINGS ================= */}
      {pageNumber === 5 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader />

          <div className="space-y-5 flex-1 my-2">
            {/* Top row: Oval + Bar chart */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="bg-[#ffd966] p-4 rounded-3xl text-center shadow-xs border border-amber-400 w-full max-w-[220px]">
                  <h3 className="text-sm sm:text-base font-black text-stone-900 leading-tight">
                    PEG* Meeting in 10 schools more than 100 sessions
                  </h3>
                </div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-stone-300 mt-2 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80"
                    alt="Parents group"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-bold text-stone-600 mt-1">
                  *PEG - Parent Engagement Group
                </span>
              </div>

              {/* Bar Chart mockup */}
              <div className="md:col-span-8 bg-white/70 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-600 block mb-2">
                  🔴 Number of sessions in 5 school
                </span>
                <div className="flex items-end justify-around h-32 pt-4 border-b border-stone-300">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-red-600">11</span>
                    <div className="w-12 sm:w-16 bg-[#ea4335] rounded-t-md h-24" />
                    <span className="text-[10px] text-stone-600 text-center max-w-[80px] leading-tight">
                      Hauz Rani Urdu CoEd
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-red-600">8</span>
                    <div className="w-12 sm:w-16 bg-[#ea4335] rounded-t-md h-18" />
                    <span className="text-[10px] text-stone-600 text-center max-w-[80px] leading-tight">
                      Hauz Rani Hindi (G&B)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-red-600">6</span>
                    <div className="w-12 sm:w-16 bg-[#ea4335] rounded-t-md h-14" />
                    <span className="text-[10px] text-stone-600 text-center max-w-[80px] leading-tight">
                      Malviya Nagar (B)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-red-600">7</span>
                    <div className="w-12 sm:w-16 bg-[#ea4335] rounded-t-md h-16" />
                    <span className="text-[10px] text-stone-600 text-center max-w-[80px] leading-tight">
                      Malviya Nagar (G)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Ratings */}
            <div className="bg-red-50/70 p-4 rounded-2xl border border-red-200 flex flex-col sm:flex-row items-center justify-around gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-black text-red-600">
                  Ratings for our work on aspects of
                </h4>
                <div className="mt-2 space-y-1 font-bold text-stone-800 text-sm">
                  <div>Behaviour</div>
                  <div>Efforts</div>
                  <div>Connections</div>
                </div>
              </div>

              {/* 100% Stamp */}
              <div className="w-24 h-24 rounded-full border-4 border-red-600 flex flex-col items-center justify-center font-black text-red-600 rotate-6 shadow-sm">
                <span className="text-2xl leading-none">100%</span>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 6: OUR PROGRAM - SHUBH AARAMBH ================= */}
      {pageNumber === 6 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Our Program - शुभ: आरंभ" />

          <div className="space-y-4 flex-1 my-2">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-4xl">
              We have incorporated this framework and it has been our guiding force to bring sustainable change in our society and in the lives of our children who are the future of our country.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#fce5cd] p-4 rounded-2xl border border-orange-300">
                <h3 className="text-base font-black text-[#c2410c] mb-1">
                  Self - as Parent and Caregiver
                </h3>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Focus on the self awareness, inner self and connection with self is the corner stone. Parents and caregivers consider their roles from connecting to the self
                </p>
              </div>

              <div className="bg-[#fff2cc] p-4 rounded-2xl border border-amber-300">
                <h3 className="text-base font-black text-[#b45309] mb-1">
                  Family - as Nurturer
                </h3>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Focus on family as a ‘unit of change’ for ECCE practices, handholding, love, respect, care within the household during those formative years
                </p>
              </div>

              <div className="bg-[#ffe599] p-4 rounded-2xl border border-amber-400">
                <h3 className="text-base font-black text-amber-900 mb-1">
                  Community - as Support
                </h3>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Focus on collective support, peer learning from the lived experiences, parents share their knowledge and experience with others, building a community of caregivers
                </p>
              </div>

              <div className="bg-[#fce5cd] p-4 rounded-2xl border border-orange-300">
                <h3 className="text-base font-black text-[#c2410c] mb-1">
                  School - as Safe Space
                </h3>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  Focus on learning and facilitation of workshops/ sessions with parents and caregivers practice through dialogical dialogue and different perspectives
                </p>
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 7: MINDFUL PARENTING MODULES ================= */}
      {pageNumber === 7 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="MINDFUL PARENTING MODULES" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-2">
            {/* Left Quadrant Compass */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-dashed border-amber-300 bg-white/70 p-4 relative flex items-center justify-center text-center shadow-md">
                <div className="w-24 h-24 rounded-full bg-amber-100 flex flex-col items-center justify-center font-bold text-xs text-[#c2410c]">
                  <span>MINDFUL</span>
                  <span>PARENTING</span>
                </div>
                <div className="absolute top-2 text-[10px] font-bold text-stone-600">
                  Mindfulness (Calm)
                </div>
                <div className="absolute bottom-2 text-[10px] font-bold text-stone-600">
                  Express & Resolve
                </div>
                <div className="absolute left-2 text-[10px] font-bold text-stone-600">
                  Self Compassion
                </div>
                <div className="absolute right-2 text-[10px] font-bold text-stone-600">
                  Skillful Communication
                </div>
              </div>
            </div>

            {/* Right 10 Modules List */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { title: 'Know yourself', desc: 'Baseline understanding, safe space.' },
                { title: 'Childhood & Beliefs', desc: 'Understanding of own patterns begins.' },
                { title: 'Pressured Parenting', desc: 'Insight into stress, first body-based tools.' },
                { title: 'Loving Routines', desc: 'Routines created at home for bonding and safety.' },
                { title: 'Listening to Understanding', desc: 'Parents practice empathic listening.' },
                { title: 'Speaking with Heart', desc: 'When feelings are heard, hearts grow closer' },
                { title: 'Stories and Play as Tools', desc: 'Play becomes a parenting tool; improved bonding.' },
                { title: 'Respect Begins at Home Equity & Gender', desc: 'Understanding of equity, dignity, and fairness at home.' },
                { title: 'Peer Circles & Community', desc: 'Mutual support, reduced isolation.' },
                { title: 'Celebration & Endline', desc: 'Sense of identity, closure, and ownership of growth.' },
              ].map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 p-2 rounded-xl border border-stone-200"
                >
                  <div className="font-bold text-stone-900 leading-tight">
                    {idx + 1}. {mod.title}
                  </div>
                  <div className="text-[10px] text-stone-600 mt-0.5">{mod.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 8: KNOWLEDGE COLLABORATIONS ================= */}
      {pageNumber === 8 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Knowledge Collaborations" />

          <div className="space-y-4 flex-1 my-2">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Our meaningful partnerships with various other organisation working in different domains have guided, mentored, and shared resources, with us enabling us to sustain ourselves so far
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                'ALOHOMORA: unlocking minds',
                'Sri Aurobindo College (DU)',
                'TEACH FOR INDIA',
                'INDUS ACTION',
                'Saajha',
                'HIPA (Haryana)',
                'نحن نحب القراءة (We Love Reading)',
                'IGNOU',
                'Insight Walk',
                'Ritambhara (contemplative)',
                'MANTAVYA',
                'Living Bridges',
                'The Barefoot Academy of Governance',
                'Institute for Empowering Communication',
                'MANZIL NGO',
                'Lady Shri Ram College (LSR)',
              ].map((org, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs flex items-center justify-center text-center font-bold text-xs text-stone-800 h-16"
                >
                  {org}
                </div>
              ))}
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 9: STORIES FROM THE FIELD ================= */}
      {pageNumber === 9 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Stories from the field" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 my-2 text-xs">
            {/* Left Story: Reena ji */}
            <div className="md:col-span-4 bg-white/90 p-3.5 rounded-xl border border-stone-200 space-y-2">
              <p className="text-stone-800 leading-relaxed italic">
                "We were sharing ‘Positive Childhood Experiences’ during a workshop, when a parent (Reena ji) shared that she did not remember any pleasant memories of their childhood."
              </p>
              <p className="text-stone-800 leading-relaxed italic">
                "When asked again she come up with a memory which she related to eating sweets and that memory (of taste) still makes her happy !"
              </p>
              <p className="text-stone-800 leading-relaxed">
                We synthesized with sensory aspects of ECCE for all the parents on that day. It was a fun filled and “sweets” session.
              </p>
            </div>

            {/* Middle Story: Aaliya ji */}
            <div className="md:col-span-4 bg-[#fde9d9] p-3.5 rounded-xl border border-orange-200 font-hindi space-y-2">
              <p className="leading-relaxed">
                जब एक session में parents से पूछा की क्या उन्होंने पिछले session में जो सीखा उसे करने का प्रयास किया तो (आलिया जी) जिनका बच्चा 5 साल का है उन्होंने बताया कि, उनका बच्चा स्कूल में रोता था और रुकता नही था।
              </p>
              <p className="leading-relaxed">
                “प्यार क्या है और कैसा दिखता है।” के प्रश्न पर हमारे session मे, जहां हमने बात की कि बच्चे के लिए प्यार दिखता कैसे है, बच्चे को प्यार कैसे देते है... जब उन्होंने ‘प्यार’ को समझा और बताया कि उन्हे भी अपने बच्चे को रोता देख कर दुख होता है... और उनका बच्चा इस बात को समझ गया है।
              </p>
            </div>

            {/* Right Story: Observation Learning */}
            <div className="md:col-span-4 bg-white/90 p-3.5 rounded-xl border border-stone-200 font-hindi space-y-2">
              <p className="leading-relaxed">
                एक गतिविधि मे दिए गए निर्देशों का पालन करना था। आश्चर्यजनक रूप से, हमने देखा कि माता-पिता निर्देशों का पालन करने के बजाय अपने सुविधा अनुसार कार्यों की नकल कर रहे थे।
              </p>
              <p className="leading-relaxed">
                इसे देख कर सीखने की शक्ति और बच्चे दूसरों को देखकर कैसे सीखते हैं, पर चर्चा हुई... हमने एक नाटक से भी इसको समझा, अभ्यास भी किया जहां एक मां और बच्चे ने बातचीत को उजागर किया।
              </p>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 10: UPCOMING PLANS ================= */}
      {pageNumber === 10 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Upcoming Plans" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-2">
            <div className="md:col-span-5 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-amber-300 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=600&q=80"
                  alt="Community session"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-2.5 text-xs sm:text-sm text-stone-800">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Step-up engagements in 25 schools (15 New)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Engage with School Management Committee (SMC) Members for increase in attendance of parents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Conduct awareness sessions for parents about the organization and our 10 Week Curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Conduct regular community and home visits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Hold Storytelling sessions and train storytellers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Train parents to become Bachpan Saathees</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Continue conducting weekly sessions with parents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ea580c] font-black">•</span>
                  <span>Collect parents' data from the school to track the families’ journey</span>
                </li>
              </ul>
            </div>
          </div>

          <SlideFooter customTag="Activities 2023-24 Dawn Child Foundation" />
        </div>
      )}

      {/* ================= PAGE 11: IMPACT SUMMARY ================= */}
      {pageNumber === 11 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Impact Summary" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 flex-1 my-4 items-center">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center space-y-3">
              <div className="h-28 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
                  alt="MCD school entrance"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">10 Schools</h3>
              <p className="text-xs font-bold text-[#c2410c]">South Delhi MCD Schools</p>
              <p className="text-[11px] text-stone-600">
                Intervention in 5 MCD schools of South Delhi for improved early childhood development.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center space-y-3">
              <div className="h-28 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=400&q=80"
                  alt="Parents in circle"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">~700 Parents</h3>
              <p className="text-xs font-bold text-[#c2410c]">Household Interactions</p>
              <p className="text-[11px] text-stone-600">
                Interacted with 500 parents/households on importance of self awareness for holistic early childhood development.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center space-y-3">
              <div className="h-28 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80"
                  alt="Classroom workshop"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">&gt;200 Sessions</h3>
              <p className="text-xs font-bold text-[#c2410c]">In-School Workshops</p>
              <p className="text-[11px] text-stone-600">
                Conducted 40 sessions in school premises, to foster parent engagement for early childhood growth.
              </p>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 12: EXPRESSING GRATITUDE ================= */}
      {pageNumber === 12 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Expressing Gratitude" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1 my-2">
            <div className="md:col-span-6 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Heart className="w-8 h-8 fill-red-600/30" />
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-stone-900">
                  Thanking every co-traveler, whoever showed us the path, supported us, guided us, contributed to our journey and experiences.
                </h3>
              </div>

              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-semibold">
                  Gratitude to all the children and parents who allowed us in their lives, loved us unconditionally and being part of this wonderful journey.
                </p>
              </div>
            </div>

            <div className="md:col-span-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden shadow-xs h-32">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80"
                  alt="Children learning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-xs h-32">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80"
                  alt="Students in classroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 rounded-xl overflow-hidden shadow-xs h-32">
                <img
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=600&q=80"
                  alt="Mothers and children"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 13: GLIMPSES PART 1 ================= */}
      {pageNumber === 13 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Glimpses of our sessions" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 flex-1 my-2">
            {[
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=300&q=80' },
              { label: 'Showcase', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=300&q=80' },
              { label: 'Storytelling session', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80' },
              { label: 'Student activities', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80' },
              { label: 'Session with parents', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-xs border border-stone-200 flex flex-col">
                <img src={item.img} alt={item.label} className="w-full h-20 sm:h-24 object-cover" />
                <div className="bg-[#ffd966] py-1 px-1.5 text-center text-[10px] font-bold text-stone-900 truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <SlideFooter />
        </div>
      )}

      {/* ================= PAGE 14: GLIMPSES PART 2 ================= */}
      {pageNumber === 14 && (
        <div className="flex-1 flex flex-col justify-between">
          <SlideBrandHeader rightBadge="Glimpses of our sessions" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 flex-1 my-2">
            {[
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=350&q=80' },
              { label: "Parent's workshop", img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=350&q=80' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-xs border border-stone-200 flex flex-col">
                <img src={item.img} alt={item.label} className="w-full h-24 sm:h-28 object-cover" />
                <div className="bg-[#ffd966] py-1 px-1.5 text-center text-[11px] font-bold text-stone-900 truncate">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <SlideFooter />
        </div>
      )}
    </div>
  );
}
