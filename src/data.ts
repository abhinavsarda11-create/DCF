import {
  NavItem,
  StatItem,
  HeroSlide,
  StoryItem,
  FAQItem,
  RiseWithLoveQuadrant,
  ShaalaCurriculumWeek,
} from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Who We Are', href: '#who-we-are' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Our Impact', href: '#our-impact' },
  { label: 'Documentation', href: '#documentation' },
  { label: 'Upload PDF', href: '#upload-documents' },
  { label: 'Get Involved', href: '#get-involved' },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=1920&q=80', // Indian women / mothers community workshop
    heading: 'Empowering Parents to Shape a Brighter Future for Our Children',
    caption: 'Dedicated to community parent circles, nurturing homes, and holistic childhood growth.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80', // Children learning together happily
    heading: 'Nurturing Every Child With Compassion, Safety, and Joy',
    caption: 'Safe learning environments supporting early cognitive and emotional development.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80', // Education classroom mentorship
    heading: 'Transforming Communities Through Inclusive Early Education',
    caption: 'Partnering with schools and families to create lifelong positive impact.',
  },
];

export const STATS_DATA: StatItem[] = [
  { id: 'stat-schools', icon: 'school', value: '20+', label: 'Schools' },
  { id: 'stat-students', icon: 'students', value: '1000+', label: 'Students' },
  { id: 'stat-volunteers', icon: 'volunteers', value: '30+', label: 'Volunteers' },
  { id: 'stat-parents', icon: 'parents', value: '2000+', label: 'Parents' },
];

export const SUCCESS_STORIES: StoryItem[] = [
  {
    id: 'story-kartik',
    title: 'Kartik Story of Resilience',
    subtitle: 'Overcoming early learning barriers through guided parental counseling.',
    category: 'Early Child Development',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80',
    imageGradient: 'from-amber-500/80 via-orange-600/70 to-red-600/80',
    fullStory:
      'Kartik, a 6-year-old child from an underserved community in South Delhi, struggled with expressive speech and emotional anxiety. Through the Dawn Child parental circle, his mother learned mindful communication techniques and play-based reading. Today, Kartik is thriving enthusiastically at school with newfound confidence and joy.',
  },
  {
    id: 'story-kavya',
    title: 'Building Better Tomorrow With Kavya',
    subtitle: 'Fostering emotional safety and positive habits in early schooling.',
    category: 'Nurturing Homes',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    imageGradient: 'from-orange-500/80 via-amber-600/70 to-yellow-600/80',
    fullStory:
      'Kavya’s family participated in our 12-week Non-Violent Communication program. By replacing stress and disciplinary friction with empathetic storytelling, Kavya’s mother and father transformed their home atmosphere, helping Kavya excel both academically and socially.',
  },
  {
    id: 'story-kartik-2',
    title: 'Community Circle of Resilience',
    subtitle: 'How persistent support and community bonding created lasting transformation.',
    category: 'Community Support',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=900&q=80',
    imageGradient: 'from-amber-600/80 via-orange-500/70 to-amber-700/80',
    fullStory:
      'Our volunteer-led workshops connected local mothers with developmental educators. Together, they established weekly peer-support sessions where parents share challenges, learn self-regulation, and raise emotionally secure children.',
  },
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How Can I Donate?',
    answer:
      'You can donate directly through our website. Simply visit the donation page and choose your amount. Every contribution makes a difference!',
  },
  {
    id: 'faq-2',
    question: 'What initiatives do you support?',
    answer:
      'We support various initiatives including early childhood education, parenting skills development, community outreach programs, and mental health support for children and families.',
  },
  {
    id: 'faq-3',
    question: 'How can I volunteer?',
    answer:
      'We welcome volunteers! You can join our community programs, help with events, or contribute your professional skills. Contact us to learn about current volunteer opportunities.',
  },
  {
    id: 'faq-4',
    question: 'Where Can I Find Updates?',
    answer:
      'Stay updated through our website, newsletter, and social media channels. We regularly share success stories, upcoming events, and program updates.',
  },
  {
    id: 'faq-5',
    question: 'Can I Host an Event?',
    answer:
      'Yes! We encourage community members to host fundraising events. Contact our team to discuss your ideas and we\'ll provide support and guidance.',
  },
];

export const RISE_WITH_LOVE_QUADRANTS: RiseWithLoveQuadrant[] = [
  {
    id: 'self-as-parent',
    title: 'SELF AS PARENT',
    items: [
      'Understanding emotions and triggers',
      'Stress management and self-care',
      'Positive self-talk',
      'Personal values and parenting identity',
    ],
  },
  {
    id: 'family-as-nurturer',
    title: 'FAMILY AS NURTURER',
    items: [
      'Non-Violent Communication',
      'Conflict resolution',
      'Shared family responsibilities',
      'Emotional validation',
    ],
  },
  {
    id: 'community-as-support',
    title: 'COMMUNITY AS SUPPORT',
    items: [
      'Peer learning circles',
      'Community solidarity',
      'Neighbourhood support networks',
      'Cross-family connections',
    ],
  },
  {
    id: 'school-as-safe-space',
    title: 'SCHOOL AS SAFE SPACE',
    items: [
      'Child\'s emotional safety',
      'Teacher-parent relationships',
      'Participatory school events',
      'Inclusive learning environments',
    ],
  },
];

export const PARIVAAR_PARIVARTAN_SHAALA_CURRICULUM: ShaalaCurriculumWeek[] = [
  {
    week: 1,
    theme: 'Introduction',
    focus: 'Understanding the parent\'s role and emotional baggage',
    detailedPoints: [
      'Reflecting on how personal upbringing shapes current parenting instincts',
      'Creating a safe, non-judgmental community space for parents',
      'Setting mutual intentions and expectations for the 10-week journey',
    ],
  },
  {
    week: 2,
    theme: 'Self-Awareness',
    focus: 'Recognising emotions and personal triggers',
    detailedPoints: [
      'Identifying emotional triggers and physiological stress responses',
      'Practicing somatic pause and deep breathing techniques in moments of anger',
      'Reframing self-criticism into compassionate self-talk',
    ],
  },
  {
    week: 3,
    theme: 'Communication',
    focus: 'Introduction to Non-Violent Communication (NVC)',
    detailedPoints: [
      'The four components of NVC: Observations, Feelings, Needs, and Requests',
      'Shifting from blame and demands to open, empathetic dialogue',
      'Listening actively without interrupting or dismissing a child\'s tears',
    ],
  },
  {
    week: 4,
    theme: 'Needs & Boundaries',
    focus: 'Understanding needs behind children\'s behaviours',
    detailedPoints: [
      'Decoding behavioral distress signals as unmet developmental needs',
      'Establishing firm, consistent, and kind boundary structures',
      'Co-creating household agreements rather than punitive rules',
    ],
  },
  {
    week: 5,
    theme: 'Play & Learning',
    focus: 'The importance of play in early childhood development',
    detailedPoints: [
      'How unstructured play fosters neural connections and executive function',
      'Simple, low-cost sensory and role-playing games using everyday objects',
      'Balancing guided learning with child-led exploration',
    ],
  },
  {
    week: 6,
    theme: 'Literacy & Stories',
    focus: 'Reading aloud, storytelling, and language development',
    detailedPoints: [
      'Interactive dialogic reading practices that build vocabulary',
      'Oral folk storytelling to preserve cultural heritage and emotional warmth',
      'Creating cozy home reading nooks on any budget',
    ],
  },
  {
    week: 7,
    theme: 'Screen Time & Safety',
    focus: 'Digital wellbeing and keeping children safe',
    detailedPoints: [
      'Understanding the neurodevelopmental effects of excessive passive screen time',
      'Realistic screen-free alternatives and boredom busters for busy households',
      'Child personal safety, body autonomy, and digital awareness',
    ],
  },
  {
    week: 8,
    theme: 'School & Community',
    focus: 'Building partnerships with schools and neighbours',
    detailedPoints: [
      'Engaging actively and constructively with Anganwadi and school teachers',
      'Building collaborative neighbourhood babysitting and study circles',
      'Advocating for inclusive and positive discipline in classroom settings',
    ],
  },
  {
    week: 9,
    theme: 'Conflict Resolution',
    focus: 'Managing disagreements constructively',
    detailedPoints: [
      'De-escalation strategies during sibling rivalry and public meltdowns',
      'Modeling constructive disagreement between spouses and extended family',
      'Restorative apologies and repairing bonds after moments of conflict',
    ],
  },
  {
    week: 10,
    theme: 'Integration & Celebration',
    focus: 'Reflection, commitments, and community celebration',
    detailedPoints: [
      'Reviewing milestones achieved and positive behavioral shifts at home',
      'Formulating personal lifelong parenting pledges and peer accountability pairings',
      'Graduation ceremony, parent testimonials, and community celebration feast',
    ],
  },
];


