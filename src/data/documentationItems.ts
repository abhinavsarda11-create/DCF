export interface DocSlideContent {
  pageNumber: number;
  title: string;
  subtitle?: string;
  badge?: string;
  sections: {
    heading?: string;
    text?: string;
    bullets?: string[];
    highlightBox?: string;
    statNumber?: string;
    statLabel?: string;
    quote?: {
      text: string;
      author: string;
      role: string;
    };
    image?: {
      url: string;
      caption: string;
    };
  }[];
}

export interface DocumentationItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Overview' | 'Implementation' | 'Impact' | 'Evidence' | 'Feedback' | 'Reflections' | 'Curriculum';
  badge: string;
  pagesCount: number;
  period: string;
  description: string;
  keyHighlights: string[];
  file: string;
  pdfFilename: string;
  slides: DocSlideContent[];
}

export const DOCUMENTATION_ITEMS: DocumentationItem[] = [
  // 1. About Us
  {
    id: 'about-us',
    title: 'About Us',
    subtitle: 'Empowering Parents in Early Childhood Development: A Journey with Dawn Child Foundation',
    category: 'Overview',
    badge: 'Core Presentation',
    pagesCount: 14,
    period: 'Activities 2024-25',
    description:
      'The foundational presentation covering our Vision & Mission, 10-Week Curriculum, 4-dimensional framework (Shubh: Aarambh), 100% PEG ratings, knowledge collaborations, field stories, and expansion roadmap.',
    keyHighlights: [
      'Vision: A world where every parent enjoys playing meaningfully with their child',
      'Summary: 10 Schools, >1000 Parents, >30 Staff, >50 Volunteers connected',
      'Evaluations: 100% satisfaction in Behaviour, Efforts, and Connections',
      'Knowledge Collaborations with 16 premier educational & non-profit partners',
    ],
    file: '/documents/about-us.pdf',
    pdfFilename: 'Dawn_Child_Foundation_About_Us_Activities_2024-25.pdf',
    slides: [],
  },

  // 2. Programme Journey, Implementation & Learning
  {
    id: 'programme-journey',
    title: 'Programme Journey, Implementation & Learning',
    subtitle: '10-Week Cohort Field Execution, Community Immersion & Pedagogical Learnings',
    category: 'Implementation',
    badge: 'Field Implementation',
    pagesCount: 8,
    period: 'Cohort 2024-25',
    description:
      'A comprehensive breakdown of how the 10-Week Parenting Curriculum is deployed across MCD primary schools, Anganwadis, and urban community clusters—highlighting community mobilization, facilitator methodologies, operational hurdles, and key pedagogical learnings.',
    keyHighlights: [
      'Step-by-step 10-week implementation roadmap across 5 MCD primary schools',
      'Community trust-building protocols: tea circles, informal park gatherings, and home visits',
      'Bilingual facilitation dynamics: blending Hindi and Urdu colloquial frameworks',
      'Pedagogical takeaways: Transitioning parents from didactic instruction to experiential play',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Programme_Journey_Implementation_Learning.pdf',
    file: '/documents/programme-journey.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Programme Journey & Implementation Overview',
        subtitle: 'Mobilizing Urban Communities for Formative Early Childhood Care',
        badge: 'Executive Summary',
        sections: [
          {
            heading: 'The Operational Mandate',
            text: 'Dawn Child Foundation’s flagship 10-Week "Shubh: Aarambh" curriculum bridges the critical gap between early childhood brain development and grassroots family habits in low-income urban clusters across South Delhi.',
          },
          {
            highlightBox: 'Deployed across 10 South Delhi MCD Schools, reaching 700+ direct caregiver households with 100+ intensive circle sessions.',
          },
          {
            heading: 'Key Implementation Pillars',
            bullets: [
              'School Management Committee (SMC) alignment & principal buy-in',
              'Non-hierarchical peer circles fostering emotional vulnerability',
              'Low-cost, culturally grounded sensory play toolkits for the home',
              'Bi-weekly facilitator debriefs and iterative curriculum adaptation',
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Phase I: Community Mobilization & Trust Building',
        subtitle: 'Weeks 1 to 3: From Stranger Anxiety to Safe Spaces',
        badge: 'Field Operations',
        sections: [
          {
            heading: 'Breaking Social Hesitation',
            text: 'Caregivers in Chirag Dilli and Hauz Rani often face deep socioeconomic exhaustion. Initial invitations were met with cautious skepticism: "Why do we need someone to teach us how to raise our own children?"',
          },
          {
            heading: 'Community Breakthrough Techniques',
            bullets: [
              'Informal Chai & Baatchit in local parks before formal sessions',
              'Door-to-door Anganwadi visits to listen rather than instruct',
              'Creating a zero-blame, zero-judgment atmosphere from Day 1',
              'Partnering with local Anganwadi Didis as community ambassadors',
            ],
          },
          {
            quote: {
              text: 'The day the facilitators sat down on the floor mat with us and asked how we were feeling instead of telling us our flaws, we knew this was our space.',
              author: 'Shabana Begum',
              role: 'Participating Mother, Hauz Rani',
            },
          },
        ],
      },
      {
        pageNumber: 3,
        title: 'Phase II: The Mindful Parenting Cohort Cycle',
        subtitle: 'Weeks 4 to 8: Inner Reflection, Non-Violent Communication & Routines',
        badge: 'Core Pedagogy',
        sections: [
          {
            heading: 'The 4-Step Circle Methodology',
            bullets: [
              '1. Emotional Grounding: 3 minutes of collective breathing & mindfulness check-in',
              '2. Conceptual Provocation: A relatable roleplay or prompt (e.g. "What does love feel like?")',
              '3. Hands-on Sensory Practice: Parents craft simple games using household objects',
              '4. Take-Home Pledge: One gentle behavioral experiment to try with their child',
            ],
          },
          {
            highlightBox: 'Parent Engagement Groups (PEGs) recorded an average attendance retention of 89% from Week 3 onward.',
          },
          {
            heading: 'Addressing Intergenerational Trauma',
            text: 'Through non-violent communication frameworks, mothers began recognizing that harsh yelling was an automatic conditioned response to their own upbringing, opening the gateway to emotional healing.',
          },
        ],
      },
      {
        pageNumber: 4,
        title: 'Phase III: Institutional Integration & Celebration',
        subtitle: 'Weeks 9 to 10: School Showcases, Graduation & Lifelong Pledges',
        badge: 'Graduation',
        sections: [
          {
            heading: 'From Isolated Caregivers to Bachpan Saathees',
            text: 'In the culminating weeks, participating parents presented their learning journals and home play projects to school principals and teachers, redefining the parent-teacher relationship from confrontation to mutual alliance.',
          },
          {
            bullets: [
              'Community Graduation Feast and awarding of Parent Achievement Charters',
              'Establishment of informal WhatsApp & neighborhood peer support circles',
              'Selection of 15 proactive mothers to undergo advanced "Bachpan Saathees" training',
              'Joint student-parent creative displays mounted in school entrance hallways',
            ],
          },
        ],
      },
      {
        pageNumber: 5,
        title: 'Key Pedagogical Learnings & Field Discoveries',
        subtitle: 'What the Data and Field Diaries Taught Us',
        badge: 'Pedagogical Insights',
        sections: [
          {
            heading: '1. Play Must Precede Discipline',
            text: 'When parents engage in just 10 minutes of uninterrupted child-led play daily, compliance with household routines improves organically by over 70% without shouting.',
          },
          {
            heading: '2. Emotional Vocabulary is the Missing Anchor',
            text: 'Most parents only recognized two emotions: "khush" (happy) or "gussa" (angry). Teaching words like "ghabrahat" (anxiety), "thakan" (exhaustion), and "sukoon" (peace) transformed home dialogues.',
          },
          {
            heading: '3. Fathers Require Flexible Timing',
            text: 'Weekend morning and late evening storytelling circles increased paternal engagement from 4% to 22% in the second cohort.',
          },
        ],
      },
    ],
  },

  // 3. Impact Report
  {
    id: 'impact-report',
    title: 'Impact Report',
    subtitle: 'Annual Quantitative & Qualitative Impact Assessment (2024-25)',
    category: 'Impact',
    badge: 'Evaluations & Metrics',
    pagesCount: 7,
    period: 'Annual Audit 2024-25',
    description:
      'Rigorous monitoring and evaluation report measuring cognitive, social-emotional, and behavioural shifts across 10 MCD schools, 700+ parents, and 1,000+ children using baseline and endline rubrics.',
    keyHighlights: [
      '84% decrease in punitive physical and verbal discipline at home',
      '92% increase in dedicated daily parent-child play and interactive reading',
      '100% satisfaction ratings on Behaviour, Caregiver Efforts, and Bonds',
      '38% boost in student morning attendance and reduced nursery separation distress',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Annual_Impact_Report_2024-25.pdf',
    file: '/documents/impact-report.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Executive Impact Dashboard (2024-25)',
        subtitle: 'Evidence-Based Outcomes from South Delhi Primary School Interventions',
        badge: 'Metrics Summary',
        sections: [
          {
            heading: 'Core Numbers at a Glance',
            bullets: [
              '🏫 10 Municipal Corporation of Delhi (MCD) Partner Schools',
              '👨‍👩‍👧 ~700 Parents directly trained across intensive cohorts',
              '🧒 1,000+ Children experiencing enhanced emotional safety at home',
              '⏱️ 200+ Interactive In-School & Community Workshops facilitated',
              '🌟 100% Unanimous Parent Satisfaction on Programme Outcomes',
            ],
          },
          {
            highlightBox: 'Independent assessment shows an 84% reduction in recurring punitive discipline and an 89% increase in proactive emotional validation among participating households.',
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Baseline vs. Endline Transformation Indicators',
        subtitle: 'Standardized Pre and Post-Cohort Psychological Assessments',
        badge: 'Comparative Study',
        sections: [
          {
            heading: 'Key Behavioral Shifts (Sample Size: N = 420 surveyed households)',
            bullets: [
              'Daily screen-free parent-child interactive play: Rose from 14% to 88%',
              'Parents recognizing early emotional distress signals: Rose from 22% to 91%',
              'Use of physical reprimands as first resort: Dropped from 68% to 11%',
              'Willingness to attend School Management Meetings (SMC): Rose from 19% to 74%',
              'Confidence in managing temper tantrums peacefully: Rose from 28% to 86%',
            ],
          },
          {
            quote: {
              text: 'Earlier, I thought yelling was the only way children would study. Now, my son comes and holds my hand when he is frightened. Our home has become quiet and joyful.',
              author: 'Sunita Devi',
              role: 'Mother of 6-year-old Aman, Malviya Nagar',
            },
          },
        ],
      },
      {
        pageNumber: 3,
        title: 'School-Level Educational Ripple Effects',
        subtitle: 'Observed Changes in MCD Primary Classrooms',
        badge: 'School Dynamics',
        sections: [
          {
            heading: '1. Drastic Reduction in Nursery Morning Separation Anxiety',
            text: 'Class teachers reported that children whose parents attended the "What Love Feels Like" module settled into class within 5 minutes, compared to 45 minutes of persistent tears earlier.',
          },
          {
            heading: '2. Higher Punctuality & Lower Dropout Risk',
            text: 'Morning arrival punctuality improved by 34% across Hauz Rani Urdu and Hindi primary wings as parents established predictable morning and evening sleep routines.',
          },
          {
            heading: '3. Constructive Teacher-Parent Collaboration',
            text: 'Instead of defensive arguments during parent-teacher meetings, parents began proactively asking teachers: "How can we support his fine motor skills at home?"',
          },
        ],
      },
    ],
  },

  // 4. Photo Evidence
  {
    id: 'photo-evidence',
    title: 'Photo Evidence',
    subtitle: 'Photographic Documentation of Community Workshops & Student Activities',
    category: 'Evidence',
    badge: 'Visual Archive',
    pagesCount: 6,
    period: 'Field Archive 2024-25',
    description:
      'Curated visual documentation capturing real moments: mother-child circles on ground rugs, interactive storytelling, fine-motor games, school showcases, and celebration feasts across Delhi NCR.',
    keyHighlights: [
      'Over 40 photographic records from MCD schools in Chirag Dilli & Hauz Rani',
      'Visual cataloging of handmade sensory toys crafted from scrap materials',
      'Photos of SMC collaboration forums with government school headmistresses',
      'High-resolution archival glimpses of the community celebration graduation',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Photo_Evidence_Archive_2024-25.pdf',
    file: '/documents/photo-evidence.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Visual Evidence: Community Circles in Action',
        subtitle: 'Authentic Field Moments in Chirag Dilli & Hauz Rani MCD Schools',
        badge: 'Field Photos',
        sections: [
          {
            heading: 'Grounded in Community Reality',
            text: 'Dawn Child sessions do not happen in air-conditioned auditoriums. They happen where life happens: on woven dhurries spread out in public primary school corridors, neighborhood parks, and Anganwadi rooms.',
          },
          {
            bullets: [
              '📸 Circle 1: Mother-infant sensory bonding using clay and fabric textures',
              '📸 Circle 2: Roleplay demonstrations on de-escalating anger and listening with open ears',
              '📸 Circle 3: Father-child weekend storytelling and puppet dialogue',
              '📸 Circle 4: Joint learning displays curated for school corridors',
            ],
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Sensory Toolkits & Play-Based Learning Artifacts',
        subtitle: 'Zero-Cost ECCE Solutions Created by Mothers',
        badge: 'Art & Artifacts',
        sections: [
          {
            heading: 'Democratizing Educational Toys',
            text: 'Commercial educational toys are often inaccessible to underprivileged households. We trained parents to design rich developmental tools using buttons, cardboard, dried pulses, and fabric scraps.',
          },
          {
            bullets: [
              'Sorting & Counting Mats: Developed for fine-motor control and pre-numeracy',
              'Emotion Emotion Emotion Dolls: Hand-stitched cloth puppets expressing sadness, joy, and fear',
              'Texture Paths: Sensory walking paths created using pebbles, grass, and smooth paper',
            ],
          },
        ],
      },
    ],
  },

  // 5. Principal's Feedback Report
  {
    id: 'principals-feedback',
    title: "Principal's Feedback Report",
    subtitle: 'Formal Evaluations & Endorsements by MCD School Principals & Administrators',
    category: 'Feedback',
    badge: 'Institutional Endorsements',
    pagesCount: 6,
    period: 'Academic Session 2024-25',
    description:
      'Official testimonials, letters of appreciation, and institutional assessments provided by principals and senior headmistresses across South Delhi Municipal primary schools.',
    keyHighlights: [
      'Official appraisals from 5 MCD Primary School Principals in South Delhi',
      'Noted 45% jump in parent attendance during official SMC conferences',
      'Observed tangible reductions in classroom behavioral disruptions',
      'Strong institutional recommendations for scaling across all zonal MCD schools',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Principals_Feedback_Report.pdf',
    file: '/documents/principals-feedback.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Institutional Appraisals from South Delhi MCD Principals',
        subtitle: 'How Dawn Child Transformed Parent-School Relations',
        badge: 'Leadership Letters',
        sections: [
          {
            heading: 'Bridging the Traditional School-Community Chasm',
            text: 'For decades, public primary school teachers and underprivileged parents viewed each other with friction. Dawn Child Foundation bridged this divide by converting school premises into welcoming hubs of parental empowerment.',
          },
          {
            quote: {
              text: 'In my 22 years of service in MCD schools, I have never seen parents attend school workshops with such devotion. Their children are noticeably calmer, clean, and eager to learn in class.',
              author: 'Smt. Sarita Sharma',
              role: 'Headmistress, MCD Primary Girls School, Malviya Nagar',
            },
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Key Principal Feedback Observations',
        subtitle: 'Synthesized Recommendations Across 5 Intervened Schools',
        badge: 'Formal Findings',
        sections: [
          {
            heading: '1. Higher SMC Participation',
            text: 'Parents who previously avoided school now actively voice constructive ideas during School Management Committee meetings, fostering democratic governance.',
          },
          {
            heading: '2. Better Hygiene & Routine at Home',
            text: 'Teachers noticed that children come with complete water bottles, clean hands, and established sleep cycles, drastically cutting midday fatigue.',
          },
          {
            heading: '3. Long-Term Administrative Request',
            text: 'All 5 school heads have submitted official requests to extend Dawn Child’s 10-week intervention to all incoming Grade 1 and Nursery cohorts in 2025-26.',
          },
        ],
      },
    ],
  },

  // 6. Facilitator Reflections & Findings Report
  {
    id: 'facilitator-reflections',
    title: 'Facilitator Reflections & Findings Report',
    subtitle: 'Field Diaries, Qualitative Nuances & Grassroots Psychological Insights',
    category: 'Reflections',
    badge: 'Qualitative Field Study',
    pagesCount: 8,
    period: 'Facilitator Logs 2024-25',
    description:
      'Introspective documentation by field facilitators, child counsellors, and community interns capturing emotional breakthroughs, mothers’ vulnerability, gender hurdles, and empathetic strategies.',
    keyHighlights: [
      'Detailed ethnographic field notes from 200+ hours of community sessions',
      'Analyzing the psychology of maternal fatigue and mental load in urban slums',
      'Breakthrough moments in de-escalating domestic and academic anxiety',
      'Recommended guidelines for grassroots facilitators working in ECCE',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Facilitator_Reflections_Findings.pdf',
    file: '/documents/facilitator-reflections.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Behind the Circles: Facilitator Field Notes',
        subtitle: 'Listening to the Unspoken Emotional Realities of Caregivers',
        badge: 'Ethnographic Diary',
        sections: [
          {
            heading: 'The Weight of Unspoken Exhaustion',
            text: 'Our facilitators quickly realized that before we could teach positive parenting techniques, we had to hold space for the mothers’ own unhealed childhood wounds and daily survival fatigue.',
          },
          {
            quote: {
              text: 'When a mother cried during our session on "Self-Compassion", she whispered that this was the very first time in 12 years someone asked her if she had eaten breakfast or rested.',
              author: 'Priya Mehra',
              role: 'Lead Facilitator, Dawn Child Foundation',
            },
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'Gender Dynamics & The Father Question',
        subtitle: 'Navigating Patriarchal Conditioning in Urban Settlements',
        badge: 'Social Analysis',
        sections: [
          {
            heading: 'Deconstructing the "Mother Only" Responsibility',
            text: 'Initially, childcare was treated strictly as women’s domestic labor. By hosting special evening Sunday sessions and bringing in male role models, we initiated conversations on shared domestic dignity.',
          },
          {
            bullets: [
              'Breakdown of rigid gendered division of play and discipline',
              'Mothers reporting spousal interest after children demonstrated mindfulness games at home',
              'Creation of "Pita-Charcha" (Father Dialogue Circles) as our next expansion pilot',
            ],
          },
        ],
      },
    ],
  },

  // 7. Programme Booklet
  {
    id: 'programme-booklet',
    title: 'Programme Booklet',
    subtitle: 'The 10-Week "Shubh: Aarambh" Early Childhood Care & Education Curriculum Guide',
    category: 'Curriculum',
    badge: 'Curriculum Guide',
    pagesCount: 12,
    period: 'Standard Edition 2024-25',
    description:
      'The comprehensive practitioner and parent handbook detailing the week-by-week curriculum, session lesson plans, sensory activities, emotional vocabulary charts, and non-violent communication protocols.',
    keyHighlights: [
      'Complete 10-Week progressive roadmap with thematic lesson architectures',
      'Non-Violent Communication (NVC) conversational guides and roleplays',
      'Illustrated sensory play activity sheets and home observation logs',
      'The 4-Quadrant Framework: Self, Family, Community, and School in practice',
    ],
    pdfFilename: 'Dawn_Child_Foundation_Programme_Booklet_Shubh_Aarambh.pdf',
    file: '/documents/programme-booklet.pdf',
    slides: [
      {
        pageNumber: 1,
        title: 'Programme Booklet: Shubh Aarambh ECCE Architecture',
        subtitle: 'A Holistic 10-Week Journey for Mindful Families and Resilient Children',
        badge: 'Curriculum Handbook',
        sections: [
          {
            heading: 'Core Pedagogical Foundation',
            text: 'The Shubh: Aarambh curriculum synthesizes cutting-edge neurobiology (the first 2,000 days of cognitive architecture), non-violent communication, and indigenous storytelling traditions to nurture joyful families.',
          },
          {
            highlightBox: 'Structured as 10 sequential 90-minute cohort sessions, supported by weekly home observation logs and community peer circles.',
          },
        ],
      },
      {
        pageNumber: 2,
        title: 'The 10-Week Curriculum Syllabus at a Glance',
        subtitle: 'From Self-Awareness to Lifelong Community Pledges',
        badge: 'Syllabus Breakdown',
        sections: [
          {
            bullets: [
              'Week 1: Know Yourself - Establishing baseline safety and self-worth',
              'Week 2: Childhood & Beliefs - Unpacking intergenerational conditioning',
              'Week 3: Pressured Parenting - Somatic stress tools and emotional pausing',
              'Week 4: Loving Routines - Predictable rhythms for household psychological safety',
              'Week 5: Listening to Understand - Empathic listening without judgment',
              'Week 6: Speaking with Heart - Expressing needs without blame or insults',
              'Week 7: Stories & Play as Tools - Sensory toolkits and imaginative bonding',
              'Week 8: Respect, Equity & Gender - Dignity and fairness in domestic spaces',
              'Week 9: Peer Circles & Community - Building lasting neighborhood support networks',
              'Week 10: Integration & Celebration - Graduation and lifelong parenting pledges',
            ],
          },
        ],
      },
    ],
  },
];
