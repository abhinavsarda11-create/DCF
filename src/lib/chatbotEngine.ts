import { ChatMessage, ChatAction } from '../types';

export interface ChatbotResponse {
  text: string;
  suggestedActions?: ChatAction[];
}

interface KnowledgeItem {
  id: string;
  keywords: string[];
  patterns: RegExp[];
  response: string;
  actions?: ChatAction[];
}

// Royalty-Free Open-Source Knowledge Base for Dawn Child Foundation & ECCE Parenting
const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // --- GREETINGS & INTRO ---
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'morning', 'afternoon', 'evening', 'start', 'help'],
    patterns: [/^(hi|hello|hey|namaste|greetings|hola)\b/i, /how\s+(are\s+you|do\s+you\s+do)/i],
    response:
      "Hello! Warm welcome to the Dawn Child Foundation. I'm your open-source AI parenting and community guide. How can I support you today? You can ask about our parenting framework, donation impact, volunteering, or early childhood tips.",
    actions: [
      { label: '📖 Parenting Framework', action: 'parenting' },
      { label: '🤝 How to Volunteer', action: 'volunteer' },
      { label: '🧡 Support with a Donation', action: 'donate' },
      { label: '❓ View FAQs', action: 'faq' },
    ],
  },
  {
    id: 'who_are_you',
    keywords: ['who are you', 'what are you', 'bot', 'chatbot', 'ai', 'model', 'opensource', 'open-source'],
    patterns: [/who\s+are\s+you/i, /what\s+is\s+your\s+name/i, /are\s+you\s+(a\s+bot|an\s+ai|real)/i],
    response:
      "I am the Dawn Assistant, a 100% free, royalty-free open-source conversational guide designed for the Dawn Child Foundation. I provide instant, reliable answers on early childhood education, positive parenting strategies, and ways to get involved in our community initiatives.",
    actions: [
      { label: '👶 Parenting Advice', action: 'parenting' },
      { label: '📍 Foundation Mission', action: 'query', payload: 'What is Dawn Child Foundation?' },
    ],
  },

  // --- DAWN CHILD FOUNDATION MISSION ---
  {
    id: 'about_foundation',
    keywords: ['foundation', 'mission', 'vision', 'dawn child', 'about us', 'what do you do', 'purpose', 'objective'],
    patterns: [/about\s+(the\s+)?foundation/i, /what\s+does\s+dawn\s+child\s+do/i, /mission\s+and\s+vision/i],
    response:
      "Dawn Child Foundation is dedicated to empowering parents and nurturing children's minds through Early Childhood Care and Education (ECCE). We believe when you equip a parent with compassionate, science-backed guidance, you create a ripple effect that uplifts entire communities for generations.",
    actions: [
      { label: '📖 Explore 3D Parenting Journey', action: 'parenting' },
      { label: '🤝 Join Community Initiatives', action: 'volunteer' },
      { label: '🧡 Donate to our Mission', action: 'donate' },
    ],
  },

  // --- DOCUMENTATION & COMPLIANCE ---
  {
    id: 'documentation_compliance',
    keywords: [
      'documentation',
      'document',
      'documents',
      '80g',
      '12a',
      'tax',
      'csr',
      'darpan',
      'certificate',
      'compliance',
      'audit',
      'financials',
      'balance sheet',
      'policy',
    ],
    patterns: [
      /document(ation|s)?/i,
      /80\s*g/i,
      /12\s*a/i,
      /csr(-|\s*)1/i,
      /ngo(\s+|-)?darpan/i,
      /audit(ed)?\s+(report|financials)/i,
      /tax\s+exemption/i,
    ],
    response:
      "You can explore all official Dawn Child Foundation publications in our Documentation section, including:\n\n• **About Us** (Core Presentation)\n• **Programme Journey, Implementation & Learning**\n• **Impact Report** (Annual Outcomes)\n• **Photo Evidence** (Community Visual Archive)\n• **Principal's Feedback Report**\n• **Facilitator Reflections & Findings Report**\n• **Programme Booklet** (10-Week Shubh: Aarambh Guide)\n\nYou can view and download all documents directly as PDFs.",
    actions: [
      { label: '📄 Go to Documentation', action: 'query', payload: 'Take me to Documentation' },
      { label: '🧡 Support with a Donation', action: 'donate' },
    ],
  },
  {
    id: 'parent_child_guidance',
    keywords: [
      'parent child',
      'relationship',
      'pressure',
      'study pressure',
      'career dreams',
      'marriage pressure',
      'dreams',
      'guidance',
      'conflict',
      'counseling',
      'mediation',
      'understanding',
      'communication',
      'listen',
    ],
    patterns: [
      /parent.*child/i,
      /study\s+pressure/i,
      /forcing.*(marriage|marry|study)/i,
      /pressure\s+to\s+study/i,
      /follow\s+(my|their)\s+dream/i,
      /family\s+conflict/i,
    ],
    response:
      "At Dawn Child Foundation, we believe in nurturing healthy parent-child relationships where children can grow in an empathetic and positive environment. When families encounter friction—such as academic pressure, career disagreements, or early marriage pressure—our trained community counselors provide non-judgmental guidance and mediation to bridge understanding between parents and youth.",
    actions: [
      { label: '📖 Explore 7 Pillars of Parenting', action: 'parenting' },
      { label: '🤝 Community Circles', action: 'volunteer' },
      { label: '📞 Talk to a Counselor', action: 'contact' },
    ],
  },

  // --- PARENTING GUIDANCE (7 Key Pillars) ---
  {
    id: 'tantrums_meltdowns',
    keywords: ['tantrum', 'meltdown', 'anger', 'crying', 'stubborn', 'screaming', 'discipline', 'behavior', 'frustrated'],
    patterns: [/tantrum/i, /meltdown/i, /crying\s+a\s+lot/i, /handle\s+anger/i, /child\s+doesn't\s+listen/i],
    response:
      "Tantrums are a child's natural way of expressing big emotions when their cognitive verbal skills are still forming. Key practices:\n\n1. **Co-Regulate**: Stay calm and ground yourself; emotions are contagious.\n2. **Name the Feeling**: Say 'I see you are really upset that playtime ended.'\n3. **Safe Presence**: Offer a hug or sit nearby without lecturing until their nervous system settles.\n4. **Connect Before Correct**: Discuss alternative ways to react only once they are calm.",
    actions: [
      { label: '📖 View Full Parenting Journey', action: 'parenting' },
      { label: '💡 Screen Time Tips', action: 'query', payload: 'How to manage screen time?' },
    ],
  },
  {
    id: 'not_yet_pledge',
    keywords: ['pledge', 'not yet', 'smartphone', 'social media', 'delay', 'class 9', 'screen', 'age 16', 'device', 'promise'],
    patterns: [/not\s+yet\s+(parent\s+)?pledge/i, /take\s+(the\s+)?pledge/i, /smartphone\s+pledge/i, /social\s+media\s+delay/i, /class\s+9\s+phone/i],
    response:
      "The Dawn Child Foundation 'Not Yet' Parent Pledge (2025–2026) is a vital community commitment to protect childhood, delay smartphone and social media use, and champion real-world play:\n\n1. No smartphone until the end of Class 9.\n2. No social media (Instagram, Snapchat, Reels, etc.) until age 16.\n3. Encouraging unsupervised free play and device-free creativity.\n4. Supporting phone-free classrooms and tuition centres.",
    actions: [
      { label: '📜 Take the Not Yet Parent Pledge', action: 'pledge' },
      { label: '🌱 Explore 7 Pillars of Parenting', action: 'parenting' },
      { label: '💡 Screen Time Tips', action: 'query', payload: 'How to manage screen time?' },
    ],
  },
  {
    id: 'screen_time',
    keywords: ['screen', 'phone', 'tv', 'ipad', 'mobile', 'tablet', 'youtube', 'games', 'digital'],
    patterns: [/screen\s*time/i, /mobile\s*addiction/i, /watching\s+tv/i, /phone\s*habit/i],
    response:
      "For healthy neuro-development in early childhood:\n\n• **Under 2 years**: Zero recreational screen time (except video calls with loved ones).\n• **Ages 2 to 5**: Maximum 1 hour per day of high-quality, co-viewed content.\n• **Screen-Free Zones**: Keep bedrooms and dining areas device-free.\n• **The 1-for-1 Rule**: Replace every 30 minutes of media with active physical, outdoor, or hands-on sensory play.\n• **Join the Movement**: Take our 'Not Yet' Parent Pledge to delay smartphones until Class 9!",
    actions: [
      { label: '📜 Take "Not Yet" Parent Pledge', action: 'pledge' },
      { label: '🎨 Play-Based Activities', action: 'query', payload: 'Fun play-based learning ideas' },
      { label: '📖 Explore Parenting Framework', action: 'parenting' },
    ],
  },
  {
    id: 'sleep_routine',
    keywords: ['sleep', 'bedtime', 'wake', 'routine', 'night', 'nap', 'tired', 'insomnia'],
    patterns: [/bedtime\s*routine/i, /child\s+not\s+sleeping/i, /wake\s+up\s+at\s+night/i],
    response:
      "Consistent sleep hygiene directly impacts emotional balance and cognitive retention:\n\n1. **Predictable 4-Step Routine**: Bath → Pajamas → Storybook reading → Lullaby/Cuddles.\n2. **Dim Lighting**: Lower bright lights 45 minutes prior to sleep to stimulate natural melatonin.\n3. **Consistent Timing**: Maintain regular sleep and wake times even on weekends.",
    actions: [
      { label: '📖 Check Sleep Focus Card', action: 'parenting' },
      { label: '🍎 Nutrition Tips', action: 'query', payload: 'Child nutrition and eating habits' },
    ],
  },
  {
    id: 'speech_language',
    keywords: ['speech', 'talking', 'language', 'words', 'speak', 'vocabulary', 'delay', 'communication'],
    patterns: [/speech\s*delay/i, /how\s+to\s+improve\s+talking/i, /first\s+words/i, /language\s*skills/i],
    response:
      "Language development thrives on responsive conversation:\n\n• **Serve and Return**: When your toddler points or babbles, respond with eye contact and complete words.\n• **Narrate Your Day**: Speak out loud what you are cooking, cleaning, or observing together.\n• **Daily Reading**: Point to illustrations and ask open-ended questions like 'Where did the rabbit hop?'.",
    actions: [
      { label: '📖 Early Childhood Details', action: 'parenting' },
      { label: '🤝 Volunteer as Mentor', action: 'volunteer' },
    ],
  },
  {
    id: 'nutrition_eating',
    keywords: ['food', 'eating', 'nutrition', 'picky', 'vegetables', 'diet', 'meal', 'feed', 'appetite'],
    patterns: [/picky\s*eater/i, /child\s+refuses\s+to\s+eat/i, /healthy\s+diet\s+for\s+kids/i, /eating\s+habits/i],
    response:
      "Healthy nutrition starts with joyful, pressure-free dining:\n\n• **Division of Responsibility**: Parents decide *what*, *when*, and *where* to eat; the child decides *if* and *how much*.\n• **Rainbow Plates**: Introduce varied colors with fruits, whole grains, and lentils.\n• **Involve Them**: Let children wash vegetables or mix safe ingredients to boost curiosity.",
    actions: [
      { label: '📖 View Nutrition Framework', action: 'parenting' },
      { label: '🧡 Support Child Nutrition', action: 'donate' },
    ],
  },
  {
    id: 'positive_discipline',
    keywords: ['punishment', 'scolding', 'hitting', 'beating', 'discipline', 'positive', 'rules', 'boundaries'],
    patterns: [/how\s+to\s+discipline/i, /should\s+i\s+punish/i, /scolding/i, /set\s+boundaries/i],
    response:
      "Positive discipline teaches rather than punishes:\n\n• **Clear, Kind Boundaries**: 'I cannot let you throw toys because they might hurt someone. You can throw this soft ball outside.'\n• **Natural Consequences**: Allow safe outcomes to teach life lessons.\n• **Focus on Solutions**: Involve the child in repairing mistakes (e.g. wiping spilled water together).",
    actions: [
      { label: '📖 Parenting Focus Cards', action: 'parenting' },
    ],
  },
  {
    id: 'play_learning',
    keywords: ['play', 'toys', 'activity', 'activities', 'games', 'outdoor', 'creative', 'learning'],
    patterns: [/play\s*based/i, /activities\s+for\s+toddler/i, /learning\s+games/i],
    response:
      "Play is the highest form of childhood research! Simple suggestions:\n\n• **Sensory Bins**: Rice, dried beans, water, and cups for tactile exploration.\n• **Open-Ended Building**: Cardboard boxes, wooden blocks, and fabric sheets for imaginative roleplay.\n• **Nature Walks**: Collect fallen leaves, observe birds, and count stones together.",
    actions: [
      { label: '📖 View 3D Journey', action: 'parenting' },
    ],
  },

  // --- DONATIONS & 80G TAX EXEMPTION ---
  {
    id: 'donation_info',
    keywords: ['donate', 'donation', 'money', 'contribution', 'fund', 'tax', '80g', 'receipt', 'bank', 'payment'],
    patterns: [/how\s+(can\s+i\s+)?donate/i, /is\s+donation\s+tax\s+deductible/i, /80g\s+certificate/i, /where\s+does\s+money\s+go/i],
    response:
      "Every contribution makes a direct, measurable difference! Key facts:\n\n• **Tax Benefit**: All Indian donations are eligible for 50% tax exemption under Section 80G.\n• **Impact Breakdown**:\n  - ₹500: Essential learning materials for a child.\n  - ₹1,000: Monthly parenting circle workshop access.\n  - ₹2,500: Comprehensive early childhood developmental kits.\n  - ₹5,000: Full nutrition & health monitoring support.\n• **Instant Receipts**: Sent to your registered email immediately.",
    actions: [
      { label: '🧡 Donate Now (Quick Modal)', action: 'donate' },
      { label: '❓ View FAQ Details', action: 'faq' },
    ],
  },

  // --- VOLUNTEERING ---
  {
    id: 'volunteer_info',
    keywords: ['volunteer', 'join', 'help us', 'contribute time', 'internship', 'mentor', 'roles'],
    patterns: [/how\s+to\s+volunteer/i, /volunteer\s+opportunities/i, /can\s+i\s+join/i, /volunteer\s+form/i],
    response:
      "We warmly welcome volunteers! Available volunteer roles include:\n\n1. **Parenting Circles Facilitator**: Assist trained educators in hosting workshops.\n2. **Early Childhood Educator / Mentor**: Engage children with interactive storytelling and play.\n3. **Community Outreach**: Assist with field visits, health screenings, and family surveys.\n4. **Event Organizing & Media**: Support fundraisers and awareness drives.",
    actions: [
      { label: '🤝 Fill Volunteer Application', action: 'volunteer' },
      { label: '📞 Contact Field Office', action: 'contact' },
    ],
  },

  // --- LOCATION & CONTACT ---
  {
    id: 'contact_location',
    keywords: ['contact', 'address', 'location', 'phone', 'call', 'email', 'delhi', 'office', 'where are you'],
    patterns: [/where\s+are\s+you\s+located/i, /contact\s+number/i, /phone\s*number/i, /office\s*address/i],
    response:
      "You can visit or reach out to us directly:\n\n📍 **Address**: 206 Second Floor, Block A, Shivalik, Malviya Nagar, New Delhi, Pin - 110017\n📞 **Phone**: +91 9311323002\n✉️ **Email**: contact@dawnchild.org\n🕒 **Hours**: Monday to Saturday, 9:30 AM – 6:00 PM IST",
    actions: [
      { label: '📞 Call +919311323002', action: 'contact' },
      { label: '🤝 Volunteer in Delhi', action: 'volunteer' },
    ],
  },

  // --- SUCCESS STORIES & IMPACT ---
  {
    id: 'impact_stories',
    keywords: ['impact', 'stories', 'success', 'results', 'evidence', 'case study', 'outcomes'],
    patterns: [/success\s*stories/i, /impact\s*numbers/i, /has\s+this\s+helped\s+anyone/i],
    response:
      "Through our grassroots circles, Dawn Child Foundation has touched over 5,000+ children and 3,200+ parents across 40+ learning centers. Check out our documented community cases of children overcoming speech delays, families managing tantrums, and mothers gaining early childhood confidence.",
    actions: [
      { label: '📖 View Success Stories Section', action: 'query', payload: 'Take me to Success Stories' },
      { label: '🧡 Support More Children', action: 'donate' },
    ],
  },

  // --- GRATITUDE / POLITE CLOSING ---
  {
    id: 'thanks',
    keywords: ['thanks', 'thank you', 'dhanyawad', 'shukriya', 'great', 'awesome', 'good'],
    patterns: [/thank\s*(s|you)/i, /dhanyawad/i, /shukriya/i, /that\s+helps/i],
    response:
      "You're very welcome! Nurturing young minds is a community journey. Let me know if you need any other parenting tips, donation info, or volunteer guidelines.",
    actions: [
      { label: '🧡 Make a Donation', action: 'donate' },
      { label: '📖 Explore Parenting Framework', action: 'parenting' },
    ],
  },

  // --- RISE WITH LOVE MODEL ---
  {
    id: 'rise_with_love',
    keywords: ['rise with love', 'rise', 'model', 'quadrant', 'self as parent', 'family as nurturer', 'community as support', 'school as safe space'],
    patterns: [/rise\s+with\s+love/i, /parenting\s+model/i, /self\s+as\s+parent/i],
    response:
      "Our core model is 'RISE with LOVE' (Parent Wellbeing → Communication & Relationships → Early Childhood Development → RISE with LOVE). It spans 4 key quadrants: 1) Self as Parent (emotions, triggers, self-care), 2) Family as Nurturer (NVC, conflict resolution), 3) Community as Support (peer learning, solidarity), and 4) School as Safe Space (inclusive environments, teacher relationships).",
    actions: [
      { label: '📖 Explore RISE with LOVE', action: 'parenting' },
      { label: '🎓 Parivaar Parivartan Shaala', action: 'query', payload: 'Tell me about Parivaar Parivartan Shaala' },
    ],
  },

  // --- PARIVAAR PARIVARTAN SHAALA ---
  {
    id: 'parivaar_parivartan_shaala',
    keywords: ['parivaar parivartan shaala', 'shaala', 'curriculum', '10 week', '10-week', 'flagship programme', 'flagship program', 'south delhi'],
    patterns: [/parivaar\s+parivartan/i, /shaala/i, /10[- ]week/i, /flagship\s+programme/i],
    response:
      "Parivaar Parivartan Shaala is our 10-week flagship parenting programme in South Delhi. Delivered through interactive sessions using storytelling, role-play, and reflective circles, it covers: 1. Introduction, 2. Self-Awareness, 3. Communication (NVC), 4. Needs & Boundaries, 5. Play & Learning, 6. Literacy & Stories, 7. Screen Time & Safety, 8. School & Community, 9. Conflict Resolution, and 10. Integration & Celebration.",
    actions: [
      { label: '📖 View 10-Week Curriculum', action: 'parenting' },
      { label: '🤝 Facilitate a Shaala Circle', action: 'volunteer' },
      { label: '🧡 Sponsor a Cohort', action: 'donate' },
    ],
  },
];

// Fallback suggestions
const FALLBACK_ACTIONS: ChatAction[] = [
  { label: '👶 Parenting Framework', action: 'parenting' },
  { label: '🧡 How to Donate', action: 'donate' },
  { label: '🤝 Volunteer Roles', action: 'volunteer' },
  { label: '📍 Foundation Location', action: 'contact' },
];

/**
 * Open-Source Natural Language Intent Matcher
 * Computes semantic relevance scores using tokenization, pattern testing, and keyword matching.
 */
export function generateChatbotReply(userMessage: string): ChatbotResponse {
  const normalized = userMessage.toLowerCase().trim();

  if (!normalized) {
    return {
      text: "I didn't catch that. Please feel free to ask any question about parenting, our programs, or foundation initiatives!",
      suggestedActions: FALLBACK_ACTIONS,
    };
  }

  // 1. Direct Regex Pattern Matching (Highest Precision)
  for (const item of KNOWLEDGE_BASE) {
    for (const pattern of item.patterns) {
      if (pattern.test(normalized)) {
        return {
          text: item.response,
          suggestedActions: item.actions || FALLBACK_ACTIONS,
        };
      }
    }
  }

  // 2. Multi-token Keyword Scoring
  const words = normalized.split(/[\s,?.!;:()/'"-\\]+/).filter((w) => w.length > 2);
  let bestItem: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of item.keywords) {
      const kwLower = keyword.toLowerCase();
      if (normalized.includes(kwLower)) {
        score += 3;
      }
      for (const word of words) {
        if (kwLower === word) {
          score += 2;
        } else if (kwLower.includes(word) || word.includes(kwLower)) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestItem = item;
    }
  }

  // Threshold check
  if (bestItem && highestScore >= 2) {
    return {
      text: bestItem.response,
      suggestedActions: bestItem.actions || FALLBACK_ACTIONS,
    };
  }

  // 3. Empathetic Open-Source Fallback with Structured Guidance
  return {
    text: "Thank you for asking! I'm your open-source Dawn Assistant. While I specialize in early childhood parenting strategies (tantrums, sleep, nutrition, screen time, language) and Dawn Child Foundation programs (donations, 80G benefits, volunteering in Delhi), I'd love to help you find what you're looking for:",
    suggestedActions: [
      { label: '👶 Parenting Framework', action: 'parenting' },
      { label: '🧡 Support with a Donation', action: 'donate' },
      { label: '🤝 Become a Volunteer', action: 'volunteer' },
      { label: '📞 Contact Details', action: 'contact' },
    ],
  };
}
