import { jsPDF } from 'jspdf';

export function downloadAboutUsPdf() {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper for adding footer
  const addFooter = (pageNum: number) => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'Activities 2024-25 Dawn Child Foundation | Shubh: Aarambh',
      14,
      pageHeight - 8
    );
    doc.text(`Page ${pageNum} of 14`, pageWidth - 25, pageHeight - 8);
  };

  // Helper for header
  const addHeader = (title: string, subtitle?: string) => {
    // Amber banner line
    doc.setFillColor(234, 88, 12);
    doc.rect(0, 0, pageWidth, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(234, 88, 12);
    doc.text('DAWN CHILD FOUNDATION - SHUBH: AARAMBH', 14, 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text(title, 14, 25);

    if (subtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 90);
      doc.text(subtitle, 14, 32);
    }
  };

  // ---------------- PAGE 1: COVER ----------------
  doc.setFillColor(254, 243, 199);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(217, 119, 6);
  doc.text('SHUBH: AARAMBH', 20, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(194, 65, 12);
  doc.text('Dawn Child Foundation', 20, 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(120, 53, 15);
  doc.text('Early Childhood Care & Education (ECCE)', 20, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  const coverTitleLines = doc.splitTextToSize(
    'Empowering Parents in Early Childhood Development: A Journey with Dawn Child Foundation',
    pageWidth - 40
  );
  doc.text(coverTitleLines, 20, 75);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  const coverDesc = doc.splitTextToSize(
    'At Dawn Child, we empower parents through our 10 Week Curriculum which is a unique blend of early childhood activities, mindfulness, and non-violent communication to foster happy and healthy childhoods.',
    pageWidth - 50
  );
  doc.text(coverDesc, 20, 110);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 145, pageWidth - 40, 28, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(194, 65, 12);
  doc.text('Annual Overview & Impact Portfolio (2024-2025)', 26, 156);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(
    'Registered Office: 206 Second Floor, Block A, Shivalik, Malviya Nagar, New Delhi - 110017 | Tel: +91 93113 23002',
    26,
    164
  );
  addFooter(1);

  // ---------------- PAGE 2: VISION & MISSION ----------------
  doc.addPage();
  addHeader('Vision and Mission', 'Dawn Child Foundation');

  // Vision Box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(20, 45, (pageWidth - 50) / 2, 85, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(180, 83, 9);
  doc.text('VISION', 30, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(40, 40, 40);
  const visionText = doc.splitTextToSize(
    'A world where every parent or caregiver will love and enjoy playing meaningfully with their child.',
    (pageWidth - 50) / 2 - 20
  );
  doc.text(visionText, 30, 75);

  // Mission Box
  doc.setFillColor(255, 237, 213);
  doc.roundedRect(30 + (pageWidth - 50) / 2, 45, (pageWidth - 50) / 2, 85, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(194, 65, 12);
  doc.text('MISSION', 40 + (pageWidth - 50) / 2, 60);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(40, 40, 40);
  const missionText = doc.splitTextToSize(
    'Support parents enjoy their Parenthood, so that their children can enjoy their Childhood.',
    (pageWidth - 50) / 2 - 20
  );
  doc.text(missionText, 40 + (pageWidth - 50) / 2, 75);

  addFooter(2);

  // ---------------- PAGE 3: SUMMARY ----------------
  doc.addPage();
  addHeader('Executive Summary', 'Key highlights and milestone engagements');

  doc.setFillColor(243, 244, 246);
  doc.roundedRect(15, 38, pageWidth - 30, 20, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  doc.text(
    'Milestone: Formed connections with 10 Schools, >1000 Parents, >30 School Staff, >50 Volunteers',
    20,
    51
  );

  const summaryPoints = [
    'Orientation with Principals, Teachers, and Parents across public primary schools',
    'Connected with >1,000 parents during intensive school and community home visits',
    'Conducted weekly interactive parenting circles in schools, community centres, parks, and homes',
    'Collaborated with allied Civil Society Organisations (CSOs) for ground support and resources',
    'Constructed evidence-based developmental frameworks around our core 10-week programme structure',
    'Engaged college student interns and community volunteers in the spirit of volunteerism',
    'Collected authentic stories of transformation and family emotional shifts directly from the field',
    'Measured tangible impact with 100% positive feedback on behaviour, efforts, and emotional bonding',
  ];

  let yPos = 70;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  summaryPoints.forEach((point) => {
    doc.setFillColor(234, 88, 12);
    doc.circle(20, yPos - 1.5, 1.5, 'F');
    doc.text(point, 26, yPos);
    yPos += 12;
  });

  addFooter(3);

  // ---------------- PAGE 4: OUR WORK SO FAR ----------------
  doc.addPage();
  addHeader('Our Work So Far', 'Grassroots field initiatives across South Delhi');

  const workItems = [
    {
      title: 'Introductory Orientations',
      desc: 'Conducted introductory orientation sessions with parents and school teachers to build mutual trust.',
    },
    {
      title: '40 MCD Workshops',
      desc: 'Conducted 40 structured workshops with parents across 5 Municipal Corporation of Delhi (MCD) primary schools.',
    },
    {
      title: 'Inter-CSO & Student Collaborations',
      desc: 'Partnered with university students and CSOs on livelihood, mindful caregiving, and women empowerment.',
    },
    {
      title: 'Anganwadi & Home Visits',
      desc: 'Undertook door-to-door community and Anganwadi visits in Chirag Dilli and Hauz Rani for contextual understanding.',
    },
    {
      title: 'Focused Group Discussions (FGD)',
      desc: 'Conducted specialized FGDs to listen, document, and prioritize the real emotional and daily needs of mothers.',
    },
  ];

  let workY = 45;
  workItems.forEach((item, idx) => {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(15, workY, pageWidth - 30, 22, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(180, 83, 9);
    doc.text(`${idx + 1}. ${item.title}`, 22, workY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(item.desc, 22, workY + 16);

    workY += 26;
  });

  addFooter(4);

  // ---------------- PAGE 5: PEG MEETINGS & RATINGS ----------------
  doc.addPage();
  addHeader('Parent Engagement Groups (PEG)', 'School sessions and participant evaluation');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(194, 65, 12);
  doc.text('PEG Meetings in 10 Schools - Over 100 Sessions Conducted', 15, 45);

  const schoolSessions = [
    { school: 'Hauz Rani Urdu CoEd Primary School', count: '11 Sessions' },
    { school: 'Hauz Rani Hindi (G&B) Primary School', count: '8 Sessions' },
    { school: 'Malviya Nagar Boys Primary School', count: '6 Sessions' },
    { school: 'Malviya Nagar Girls Primary School', count: '7 Sessions' },
  ];

  let schoolY = 55;
  schoolSessions.forEach((s) => {
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(15, schoolY, 130, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(s.school, 20, schoolY + 9);
    doc.setTextColor(234, 88, 12);
    doc.text(s.count, 110, schoolY + 9);
    schoolY += 18;
  });

  // 100% Ratings Card
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(155, 45, pageWidth - 170, 85, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(185, 28, 28);
  doc.text('Ratings for Our Work', 165, 60);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('• Behavioural Change: 100%', 165, 75);
  doc.text('• Parent Efforts: 100%', 165, 87);
  doc.text('• Emotional Connections: 100%', 165, 99);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(220, 38, 38);
  doc.text('100% SATISFACTION', 165, 120);

  addFooter(5);

  // ---------------- PAGE 6: PROGRAMME FRAMEWORK ----------------
  doc.addPage();
  addHeader('Our Program - Shubh: Aarambh', 'Guiding 4-dimensional framework for sustainable impact');

  const quadrants = [
    {
      title: '1. Self - as Parent and Caregiver',
      desc: 'Focus on self-awareness, inner self, and emotional grounding as the cornerstone. Caregivers consider their roles starting with self-connection.',
    },
    {
      title: '2. Family - as Nurturer',
      desc: 'Focus on family as a "unit of change" for ECCE practices, gentle handholding, unconditional love, mutual respect, and care during formative years.',
    },
    {
      title: '3. Community - as Support',
      desc: 'Collective peer learning from lived experience. Parents exchange vulnerability and knowledge, dismantling isolation and building caregiver solidarity.',
    },
    {
      title: '4. School - as Safe Space',
      desc: 'Facilitating supportive workshops in school premises with teachers and parents through dialogical sharing and diverse empathetic perspectives.',
    },
  ];

  quadrants.forEach((q, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const qX = 15 + col * ((pageWidth - 35) / 2 + 5);
    const qY = 45 + row * 65;
    const qW = (pageWidth - 35) / 2;

    doc.setFillColor(idx === 0 || idx === 3 ? 255 : 254, idx === 0 || idx === 3 ? 247 : 243, 237);
    doc.roundedRect(qX, qY, qW, 58, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(194, 65, 12);
    doc.text(q.title, qX + 6, qY + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const qDesc = doc.splitTextToSize(q.desc, qW - 12);
    doc.text(qDesc, qX + 6, qY + 24);
  });

  addFooter(6);

  // ---------------- PAGE 7: MINDFUL PARENTING MODULES ----------------
  doc.addPage();
  addHeader('Mindful Parenting Modules', 'The 10 core progressive learning circles');

  const modules = [
    { num: '01', title: 'Know Yourself', desc: 'Baseline understanding, creating safe emotional spaces.' },
    { num: '02', title: 'Childhood & Beliefs', desc: 'Unpacking internalized intergenerational conditioning.' },
    { num: '03', title: 'Pressured Parenting', desc: 'Insight into parental stress and body-based tools.' },
    { num: '04', title: 'Loving Routines', desc: 'Predictable home routines for psychological safety.' },
    { num: '05', title: 'Listening to Understand', desc: 'Practicing deep, undivided empathic presence.' },
    { num: '06', title: 'Speaking with Heart', desc: 'Non-violent communication that brings hearts closer.' },
    { num: '07', title: 'Stories and Play as Tools', desc: 'Harnessing imaginative play for parent-child bonding.' },
    { num: '08', title: 'Respect, Equity & Gender', desc: 'Dismantling gender stereotypes and fairness at home.' },
    { num: '09', title: 'Peer Circles & Community', desc: 'Mutual peer support networks and reducing isolation.' },
    { num: '10', title: 'Celebration & Endline', desc: 'Graduation, personal pledges, and closure.' },
  ];

  modules.forEach((m, idx) => {
    const col = idx < 5 ? 0 : 1;
    const row = idx % 5;
    const mX = 15 + col * ((pageWidth - 35) / 2 + 5);
    const mY = 45 + row * 24;
    const mW = (pageWidth - 35) / 2;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(mX, mY, mW, 20, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(234, 88, 12);
    doc.text(`${m.num}. ${m.title}`, mX + 5, mY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(m.desc, mX + 5, mY + 14);
  });

  addFooter(7);

  // ---------------- PAGE 8: KNOWLEDGE COLLABORATIONS ----------------
  doc.addPage();
  addHeader('Knowledge Collaborations', 'Partner organizations guiding and sharing expertise');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(
    'Our meaningful partnerships with organizations working across domains have guided, mentored, and shared resources:',
    15,
    42
  );

  const partners = [
    'Alohomora - Unlocking Minds',
    'Sri Aurobindo College (University of Delhi)',
    'Teach For India',
    'Indus Action',
    'Saajha',
    'Haryana Institute of Public Administration (HIPA)',
    'We Love Reading (Jordan / Global)',
    'Indira Gandhi National Open University (IGNOU)',
    'Insight Walk',
    'Ritambhara - Contemplative Conversations',
    'Mantavya - The Conscious Community Project',
    'Living Bridges',
    'The Barefoot Academy of Governance',
    'Institute for Empowering Communication (CNVC partner)',
    'Manzil NGO',
    'Lady Shri Ram College for Women (LSR)',
  ];

  let pY = 55;
  partners.forEach((partner, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const pX = 15 + col * 135;
    const currentY = pY + row * 12;

    doc.setFillColor(254, 243, 199);
    doc.rect(pX, currentY - 4, 3, 8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text(partner, pX + 6, currentY + 2);
  });

  addFooter(8);

  // ---------------- PAGE 9: STORIES FROM THE FIELD ----------------
  doc.addPage();
  addHeader('Stories from the Field', 'Real transformations in homes and school circles');

  // Story 1
  doc.setFillColor(255, 247, 237);
  doc.roundedRect(15, 42, 125, 125, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(194, 65, 12);
  doc.text('Positive Childhood Memories (Reena ji)', 22, 53);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  const story1Text = doc.splitTextToSize(
    'We were sharing "Positive Childhood Experiences" during a workshop, when a parent (Reena ji) shared that she did not remember any pleasant memories of her childhood.\n\nWhen gently asked again, she came up with a memory which she related to eating sweets — and that memory of taste still makes her smile!\n\nWe synthesized this with sensory aspects of ECCE for all parents that day. It was a fun-filled and sweet session of emotional rediscovery.',
    110
  );
  doc.text(story1Text, 22, 65);

  // Story 2
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(148, 42, 130, 125, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(180, 83, 9);
  doc.text('Overcoming School Anxiety (Aaliya ji)', 155, 53);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  const story2Text = doc.splitTextToSize(
    'During our session, Aaliya ji shared that her 5-year-old child cried persistently every morning at the school gates.\n\nAfter our workshop exploring "What does love feel like to a child?", she talked to her child warmly before leaving, explaining she misses him too and will return promptly right after work.\n\nHer child felt secure and stopped crying. Aaliya ji shared deep gratitude as this dialogue strengthened their mutual understanding.',
    115
  );
  doc.text(story2Text, 155, 65);

  addFooter(9);

  // ---------------- PAGE 10: UPCOMING PLANS ----------------
  doc.addPage();
  addHeader('Upcoming Plans', 'Strategic expansion roadmap for 2025-2026');

  const plans = [
    'Step-up active engagements to 25 schools (adding 15 new partner schools)',
    'Engage with School Management Committee (SMC) members to boost parent attendance',
    'Conduct targeted awareness drives for parents about the 10-Week ECCE Curriculum',
    'Deepen regular door-to-door community and home visits',
    'Launch community storytelling circles and train volunteer storytellers',
    'Train dedicated parents to become grassroots "Bachpan Saathees"',
    'Continue weekly in-depth mindful parenting cohorts',
    'Digitize parent progress tracking to measure longitudinal family outcomes',
  ];

  let planY = 50;
  plans.forEach((plan, i) => {
    doc.setFillColor(234, 88, 12);
    doc.roundedRect(15, planY, 7, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(`${i + 1}`, 17.5, planY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(plan, 28, planY + 5.5);

    planY += 14;
  });

  addFooter(10);

  // ---------------- PAGE 11: IMPACT SUMMARY ----------------
  doc.addPage();
  addHeader('Impact Summary', 'Measured scale across MCD public schools in Delhi');

  const impactStats = [
    {
      num: '10 Schools',
      label: 'South Delhi MCD Primary Schools',
      desc: 'Sustained institutional interventions across MCD schools for early childhood care.',
    },
    {
      num: '~700 Parents',
      label: 'Direct Household Interactions',
      desc: 'Engaged 500+ households on importance of self-awareness for holistic child growth.',
    },
    {
      num: '>200 Sessions',
      label: 'In-School Facilitation',
      desc: 'Over 200 interactive sessions conducted on school premises for family bonding.',
    },
  ];

  impactStats.forEach((stat, i) => {
    const sX = 15 + i * ((pageWidth - 40) / 3 + 5);
    const sW = (pageWidth - 40) / 3;

    doc.setFillColor(254, 243, 199);
    doc.roundedRect(sX, 55, sW, 85, 4, 4, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(234, 88, 12);
    doc.text(stat.num, sX + 10, 75);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    const sLabel = doc.splitTextToSize(stat.label, sW - 20);
    doc.text(sLabel, sX + 10, 90);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(70, 70, 70);
    const sDesc = doc.splitTextToSize(stat.desc, sW - 20);
    doc.text(sDesc, sX + 10, 110);
  });

  addFooter(11);

  // ---------------- PAGE 12: GRATITUDE ----------------
  doc.addPage();
  addHeader('Expressing Gratitude', 'Our heartfelt thanks to co-travelers and communities');

  doc.setFillColor(255, 247, 237);
  doc.roundedRect(25, 45, pageWidth - 50, 100, 5, 5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(194, 65, 12);
  doc.text('Thanking every co-traveler on this journey', 35, 65);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(50, 50, 50);
  const grat1 = doc.splitTextToSize(
    '"Whoever showed us the path, supported us, guided us, and contributed their energy, wisdom, and resources to our journey and experiences."',
    pageWidth - 75
  );
  doc.text(grat1, 35, 80);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(180, 83, 9);
  doc.text('Gratitude to the children and parents:', 35, 105);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(50, 50, 50);
  const grat2 = doc.splitTextToSize(
    '"Gratitude to all the children and parents who allowed us into their lives, loved us unconditionally, and walked beside us as part of this wonderful journey."',
    pageWidth - 75
  );
  doc.text(grat2, 35, 118);

  addFooter(12);

  // ---------------- PAGE 13 & 14: GLIMPSES ----------------
  doc.addPage();
  addHeader('Glimpses of Our Sessions', 'Field photo documentation - Part I');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(
    'Photo records of community parent workshops, student activities, showcases, and storytelling sessions:',
    15,
    42
  );

  const glimpses1 = [
    'Parent Workshops - Chirag Dilli & Hauz Rani',
    'Student Creative & Sensory Activities',
    'Interactive Storytelling in MCD Classrooms',
    'Community Dialogue in Local Parks',
    'Curriculum Showcase with Teachers & Principals',
    'Mindful Listening & Peer Support Circles',
  ];

  let gY = 55;
  glimpses1.forEach((g) => {
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(15, gY, pageWidth - 30, 16, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(194, 65, 12);
    doc.text('📷 ' + g, 22, gY + 10.5);
    gY += 20;
  });

  addFooter(13);

  doc.addPage();
  addHeader('Glimpses of Our Sessions', 'Field photo documentation - Part II');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(
    'Parent and caregiver engagement in action across South Delhi communities:',
    15,
    42
  );

  const glimpses2 = [
    'Hands-on Play & Sensory ECCE Tools',
    'Parent-to-Parent Experience Exchanges',
    'Non-Violent Communication Roleplays',
    'Bachpan Saathees Leadership Training',
    'Celebration & Endline Milestone Ceremonies',
    'Community Wall Paintings and Learning Displays',
  ];

  let g2Y = 55;
  glimpses2.forEach((g) => {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(15, g2Y, pageWidth - 30, 16, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(180, 83, 9);
    doc.text('🎨 ' + g, 22, g2Y + 10.5);
    g2Y += 20;
  });

  addFooter(14);

  // Save the PDF
  doc.save('Dawn_Child_Foundation_About_Us_Activities_2024-25.pdf');
}
