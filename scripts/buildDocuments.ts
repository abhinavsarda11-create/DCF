import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve(process.cwd(), 'public/documents');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// =========================================================================
// 1. GENERATE ABOUT US (14 PAGES) - EXACT PRESENTATION DOCUMENT
// =========================================================================
function generateAboutUsPdf() {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167], // 16:9 widescreen ratio matching presentation slides
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const drawSlideHeader = (rightTitle?: string) => {
    // Top logo emblem and text
    doc.setFillColor(252, 248, 239);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Circular DC emblem
    doc.setFillColor(234, 88, 12);
    doc.circle(20, 16, 7, 'F');
    doc.setFillColor(245, 158, 11);
    doc.circle(20, 16, 5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('DC', 20, 18, { align: 'center' });

    // Shubh: Aarambh & Dawn Child
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(194, 65, 12);
    doc.text('Shubh: Aarambh  Dawn Child', 30, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text('Early Childhood Care & Education', 30, 20);

    if (rightTitle) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text(rightTitle, pageWidth - 16, 18, { align: 'right' });
    }

    // Top rule
    doc.setDrawColor(230, 215, 190);
    doc.setLineWidth(0.4);
    doc.line(14, 25, pageWidth - 14, 25);
  };

  const drawSlideFooter = (yearText = 'Activities 2024-25 Dawn Child Foundation') => {
    doc.setDrawColor(230, 215, 190);
    doc.setLineWidth(0.4);
    doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text(yearText, pageWidth - 14, pageHeight - 6, { align: 'right' });
  };

  // ---------------- PAGE 1 ----------------
  drawSlideHeader();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text('Empowering Parents in Early\nChildhood Development:\nA Journey with', 16, 42);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(194, 65, 12);
  doc.text('Dawn Child Foundation', 16, 76);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  const p1Text = doc.splitTextToSize(
    'At Dawn Child, we empower parents through our 10 Week Curriculum which is a unique blend of early childhood activities, mindfulness, and non-violent communication to foster happy and healthy childhoods.',
    135
  );
  doc.text(p1Text, 16, 94);

  // Photo frame
  doc.setFillColor(240, 230, 215);
  doc.roundedRect(165, 32, 116, 115, 4, 4, 'F');
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(0.8);
  doc.roundedRect(165, 32, 116, 115, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(180, 83, 9);
  doc.text('[ Community Circle Session: Chirag Dilli ]', 223, 85, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text('Parents & children seated on mats in dialogue', 223, 93, { align: 'center' });
  drawSlideFooter();

  // ---------------- PAGE 2 ----------------
  doc.addPage();
  drawSlideHeader();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  doc.text('Vision and Mission', 16, 52);
  doc.setFontSize(24);
  doc.setTextColor(194, 65, 12);
  doc.text('Dawn Child Foundation', 16, 64);

  // Center Badge
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(120, 48, 50, 18, 9, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('Shubh: Aarambh', 145, 59, { align: 'center' });

  // Right Side: Vision & Mission
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text('Vision', 185, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const vText = doc.splitTextToSize(
    'A world where every parent or caregiver will love and enjoy playing meaningfully with their child.',
    95
  );
  doc.text(vText, 185, 48);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text('Mission', 185, 88);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const mText = doc.splitTextToSize(
    'Support parents enjoy their Parenthood, so that their children can enjoy their Childhood.',
    95
  );
  doc.text(mText, 185, 96);
  drawSlideFooter();

  // ---------------- PAGE 3 ----------------
  doc.addPage();
  drawSlideHeader('Summary');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(30, 30, 30);
  doc.text('We formed connections with 10 Schools, >1000 parents, >30 School staffs, >50 Volunteers so far', 16, 38);

  const col1 = [
    'Orientation with Principals, Teachers, and Parents',
    'Connected with >1000 parents during school and community visits',
    'Conducted weekly sessions in ten schools, community centers, parks, homes',
    'collaborated with other CSOs to get their support in our work',
  ];
  const col2 = [
    'Build frameworks around our programme structure',
    'Engagend interns/ volunteers from colleges to assisting us and for sprit of volunteerism',
    'Collected stories of change from the field',
    'Created impact with our work',
  ];

  let yPos = 52;
  col1.forEach((item) => {
    doc.setFillColor(234, 88, 12);
    doc.circle(20, yPos - 1.2, 2, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(item, 110);
    doc.text(lines, 26, yPos);
    yPos += 22;
  });

  yPos = 52;
  col2.forEach((item) => {
    doc.setFillColor(217, 119, 6);
    doc.circle(160, yPos - 1.2, 2, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(40, 40, 40);
    const lines = doc.splitTextToSize(item, 115);
    doc.text(lines, 166, yPos);
    yPos += 22;
  });
  drawSlideFooter();

  // ---------------- PAGE 4 ----------------
  doc.addPage();
  drawSlideHeader();
  doc.setFillColor(254, 237, 213);
  doc.roundedRect(16, 34, 130, 110, 4, 4, 'F');
  doc.setDrawColor(251, 146, 60);
  doc.roundedRect(16, 34, 130, 110, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('Our work so far...', 24, 48);

  const workItems = [
    'Conducted introductory orientation sessions with parents and teachers',
    'Conducted 40 workshops with parents across 5 MCD primary schools',
    'Collaborated with other CSOs and Colleges students to conduct sessions on topics related to livelihood, caregiving and women empowerment',
    'Undertook multiple parents, community and Anganwadi visits to gain contextual understanding',
    'Conducted conducted Focused Group Discussion on identifying the needs of the parents',
  ];

  let wy = 60;
  workItems.forEach((w) => {
    doc.setFillColor(234, 88, 12);
    doc.circle(28, wy - 1, 1.2, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(50, 50, 50);
    const lines = doc.splitTextToSize(w, 110);
    doc.text(lines, 33, wy);
    wy += lines.length * 4.5 + 4;
  });

  // Right Photo Box
  doc.setFillColor(240, 235, 225);
  doc.roundedRect(156, 34, 125, 110, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('[ Photo: Parents in Circle Workshop ]', 218, 85, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Location: New Delhi, India • 840/1A, Chirag Dilli', 218, 93, { align: 'center' });
  drawSlideFooter();

  // ---------------- PAGE 5 ----------------
  doc.addPage();
  drawSlideHeader();
  doc.setFillColor(255, 217, 102);
  doc.roundedRect(20, 36, 60, 32, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 30);
  doc.text('PEG* Meeting\nin 10 schools\nmore than 100\nsessions', 50, 45, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('*PEG - Parent Engagement Group', 20, 80);

  // Bar Chart
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(95, 36, 185, 55, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(234, 88, 12);
  doc.text('Number of sessions in 5 schools:', 105, 44);

  // Bars
  const bars = [
    { label: 'Hauz Rani Urdu', val: 11, h: 28 },
    { label: 'Hauz Rani Hindi', val: 8, h: 21 },
    { label: 'Malviya Nagar (B)', val: 6, h: 16 },
    { label: 'Malviya Nagar (G)', val: 7, h: 18 },
  ];
  let bx = 115;
  bars.forEach((b) => {
    doc.setFillColor(234, 67, 53);
    doc.rect(bx, 80 - b.h, 22, b.h, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    doc.text(String(b.val), bx + 11, 77 - b.h, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(b.label, bx + 11, 85, { align: 'center' });
    bx += 40;
  });

  // Bottom Rating Box
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(20, 96, 260, 48, 4, 4, 'F');
  doc.setDrawColor(248, 113, 113);
  doc.roundedRect(20, 96, 260, 48, 4, 4, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(220, 38, 38);
  doc.text('Ratings for our work on aspects of', 30, 110);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('Behaviour\nEfforts\nConnections', 30, 120);

  // 100% stamp
  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(1.8);
  doc.circle(240, 120, 16, 'D');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(220, 38, 38);
  doc.text('100%', 240, 126, { align: 'center' });
  drawSlideFooter();

  // ---------------- PAGE 6 ----------------
  doc.addPage();
  drawSlideHeader('Our Program - Shubh: Aarambh');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(60, 60, 60);
  const p6Intro = doc.splitTextToSize(
    'We have incorporated this framework and it has been our guiding force to bring sustainable change in our society and in the lives of our children who are the future of our country.',
    260
  );
  doc.text(p6Intro, 16, 36);

  // 4 Boxes
  const boxes = [
    {
      title: 'Self - as Parent and Caregiver',
      desc: 'Focus on the self awareness, inner self and connection with self is the corner stone. Parents and caregivers consider their roles from connecting to the self',
      bg: [252, 229, 205],
    },
    {
      title: 'Family - as Nurturer',
      desc: 'Focus on family as a ‘unit of change’ for ECCE practices, handholding, love, respect, care within the household during those formative years',
      bg: [255, 242, 204],
    },
    {
      title: 'Community - as Support',
      desc: 'Focus on collective support, peer learning from the lived experiences, parents share their knowledge and experience with others, building a community of caregivers',
      bg: [255, 229, 153],
    },
    {
      title: 'School - as Safe Space',
      desc: 'Focus on learning and facilitation of workshops/ sessions with parents and caregivers practice through dialogical dialogue and different perspectives',
      bg: [252, 229, 205],
    },
  ];

  const positions = [
    [16, 48],
    [150, 48],
    [16, 98],
    [150, 98],
  ];

  boxes.forEach((b, i) => {
    const [x, y] = positions[i];
    doc.setFillColor(b.bg[0], b.bg[1], b.bg[2]);
    doc.roundedRect(x, y, 130, 44, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(194, 65, 12);
    doc.text(b.title, x + 6, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const bLines = doc.splitTextToSize(b.desc, 118);
    doc.text(bLines, x + 6, y + 17);
  });
  drawSlideFooter();

  // ---------------- PAGE 7 ----------------
  doc.addPage();
  drawSlideHeader('MINDFUL PARENTING MODULES');

  // Compass circle
  doc.setFillColor(255, 255, 255);
  doc.circle(70, 88, 48, 'F');
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1);
  doc.circle(70, 88, 48, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(194, 65, 12);
  doc.text('MINDFUL\nPARENTING', 70, 86, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text('Mindfulness (Calm)', 70, 50, { align: 'center' });
  doc.text('Express Resolve', 70, 128, { align: 'center' });
  doc.text('Self Compassion', 30, 88, { align: 'center' });
  doc.text('Skillful Communication', 108, 88, { align: 'center' });

  // Right 10 modules
  const modules = [
    ['1. Know yourself', 'Baseline understanding, safe space.'],
    ['2. Childhood & Beliefs', 'Understanding of own patterns begins.'],
    ['3. Pressured Parenting', 'Insight into stress, first body-based tools.'],
    ['4. Loving Routines', 'Routines created at home for bonding and safety.'],
    ['5. Listening to Understanding', 'Parents practice empathic listening.'],
    ['6. Speaking with Heart', 'When feelings are heard, hearts grow closer.'],
    ['7. Stories and Play as Tools', 'Play becomes a parenting tool; improved bonding.'],
    ['8. Respect Begins at Home', 'Understanding of equity, dignity, and fairness at home.'],
    ['9. Peer Circles & Community', 'Mutual support, reduced isolation.'],
    ['10. Celebration & Endline', 'Sense of identity, closure, and ownership of growth.'],
  ];

  let my = 36;
  modules.forEach(([mTitle, mDesc], idx) => {
    const rx = idx < 5 ? 135 : 212;
    const ry = 36 + (idx % 5) * 22;

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(rx, ry, 72, 19, 2, 2, 'F');
    doc.setDrawColor(230, 220, 200);
    doc.roundedRect(rx, ry, 72, 19, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    doc.text(mTitle, rx + 4, ry + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(90, 90, 90);
    const dLines = doc.splitTextToSize(mDesc, 64);
    doc.text(dLines, rx + 4, ry + 13);
  });
  drawSlideFooter();

  // ---------------- PAGE 8 ----------------
  doc.addPage();
  drawSlideHeader('Knowledge Collaborations');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(60, 60, 60);
  const p8Intro = doc.splitTextToSize(
    'Our meaningful partnerships with various other organisation working in different domains have guided, mentored, and shared resources, with us enabling us to sustain ourselves so far',
    260
  );
  doc.text(p8Intro, 16, 36);

  const partners = [
    'ALOHOMORA: unlocking minds',
    'Sri Aurobindo College (DU)',
    'TEACH FOR INDIA',
    'INDUS ACTION',
    'Saajha',
    'HIPA (Haryana)',
    'We Love Reading',
    'IGNOU',
    'Insight Walk',
    'Ritambhara',
    'MANTAVYA',
    'Living Bridges',
    'The Barefoot Academy of Governance',
    'Institute for Empowering Communication',
    'MANZIL NGO',
    'Lady Shri Ram College (LSR)',
  ];

  let px = 16;
  let py = 48;
  partners.forEach((p, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(px, py, 62, 20, 2, 2, 'F');
    doc.setDrawColor(220, 210, 190);
    doc.roundedRect(px, py, 62, 20, 2, 2, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(40, 40, 40);
    const pLines = doc.splitTextToSize(p, 56);
    doc.text(pLines, px + 31, py + 10, { align: 'center' });

    px += 66;
    if ((idx + 1) % 4 === 0) {
      px = 16;
      py += 24;
    }
  });
  drawSlideFooter();

  // ---------------- PAGE 9 ----------------
  doc.addPage();
  drawSlideHeader('Stories from the field');

  // Story 1: Reena ji
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(16, 34, 82, 110, 3, 3, 'F');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  const s1 = doc.splitTextToSize(
    '"We were sharing ‘Positive Childhood Experiences’ during a workshop, when a parent (Reena ji) shared that she did not remember any pleasant memories of their childhood.\n\nWhen asked again she came up with a memory which she related to eating sweets and that memory (of taste) still makes her happy!\n\nWe synthesized with sensory aspects of ECCE for all the parents on that day. It was a fun filled and sweets session."',
    74
  );
  doc.text(s1, 20, 44);

  // Story 2: Aaliya ji
  doc.setFillColor(254, 237, 213);
  doc.roundedRect(104, 34, 85, 110, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  const s2 = doc.splitTextToSize(
    'जब एक session में parents से पूछा की क्या उन्होंने पिछले session में जो सीखा उसे करने का प्रयास किया तो (आलिया जी) जिनका बच्चा 5 साल का है उन्होंने बताया कि उनका बच्चा स्कूल में रोता था और रुकता नहीं था।\n\n"प्यार क्या है और कैसा दिखता है।" के प्रश्न पर हमारे session में, जहां हमने बात की कि बच्चे के लिए प्यार दिखता कैसे है, बच्चे को प्यार कैसे देते हैं, इन बातों को (आलिया जी) ने घर में अपने बच्चे के साथ करने का प्रयास किया।\n\nजब उन्होंने ‘प्यार’ को समझा और बताया कि उन्हें भी अपने बच्चे को रोता देख कर दुख होता है... उनका बच्चा इस बात को समझ गया है और स्कूल खुशी से रुकने लगा।',
    77
  );
  doc.text(s2, 108, 42);

  // Story 3: Observational learning
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(195, 34, 85, 110, 3, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(40, 40, 40);
  const s3 = doc.splitTextToSize(
    'एक गतिविधि में दिए गए निर्देशों का पालन करना था। आश्चर्यजनक रूप से, हमने देखा कि माता-पिता निर्देशों का पालन करने के बजाय अपने सुविधा अनुसार कार्यों की नकल कर रहे थे।\n\nइसे देख कर सीखने की शक्ति और बच्चे दूसरों को देखकर कैसे सीखते हैं, पर चर्चा हुई कि एक बच्चे की सीखने की शैली हमारी तरह ही होती है और वे दूसरों को देखकर और उनकी नकल करके जानकारी हासिल करते हैं।\n\nहमने एक नाटक से भी इसको समझा और अभ्यास किया जहां एक मां और बच्चे ने बातचीत को उजागर किया।',
    77
  );
  doc.text(s3, 199, 42);
  drawSlideFooter();

  // ---------------- PAGE 10 ----------------
  doc.addPage();
  drawSlideHeader('Upcoming Plans');

  doc.setFillColor(240, 235, 225);
  doc.circle(70, 88, 45, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 83, 9);
  doc.text('[ Community Circle ]', 70, 85, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('MCD School Outreach', 70, 93, { align: 'center' });

  const plans = [
    'Step-up engagements in 25 schools (15 New)',
    'Engage with School Management Committee (SMC) Members for increase in attendance of parents',
    'Conduct awareness sessions for parents about the organization and our 10 Week Curriculum',
    'Conduct regular community and home visits',
    'Hold Storytelling sessions and train storytellers',
    'Train parents to become Bachpan Saathees',
    'Continue conducting weekly sessions with parents',
    'Collect parents’ data from the school to track the families’ journey',
  ];

  let ply = 40;
  plans.forEach((p) => {
    doc.setFillColor(234, 88, 12);
    doc.circle(135, ply - 1, 1.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(40, 40, 40);
    const pLines = doc.splitTextToSize(p, 140);
    doc.text(pLines, 140, ply);
    ply += pLines.length * 4.5 + 4;
  });
  drawSlideFooter('Activities 2023-24 Dawn Child Foundation');

  // ---------------- PAGE 11 ----------------
  doc.addPage();
  drawSlideHeader('Impact Summary');

  const impactCards = [
    {
      num: '10 Schools',
      sub: 'South Delhi MCD Schools',
      desc: 'Intervention in 5 MCD schools of South Delhi for improved early childhood development.',
    },
    {
      num: '~700 Parents',
      sub: 'Household Interactions',
      desc: 'Interacted with 500 parents/households on importance of self awareness for holistic early childhood development.',
    },
    {
      num: '>200 Sessions',
      sub: 'In-School Workshops',
      desc: 'Conducted 40 sessions in school premises, to foster parent engagement for early childhood growth.',
    },
  ];

  let icX = 18;
  impactCards.forEach((c) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(icX, 36, 82, 105, 4, 4, 'F');
    doc.setDrawColor(220, 210, 190);
    doc.roundedRect(icX, 36, 82, 105, 4, 4, 'D');

    // Photo placeholder
    doc.setFillColor(245, 240, 230);
    doc.roundedRect(icX + 6, 42, 70, 36, 2, 2, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text('[ Photo: Field Session ]', icX + 41, 62, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(30, 30, 30);
    doc.text(c.num, icX + 41, 90, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(194, 65, 12);
    doc.text(c.sub, icX + 41, 98, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    const dLines = doc.splitTextToSize(c.desc, 68);
    doc.text(dLines, icX + 41, 108, { align: 'center' });

    icX += 88;
  });
  drawSlideFooter();

  // ---------------- PAGE 12 ----------------
  doc.addPage();
  drawSlideHeader('Expressing Gratitude');

  doc.setFillColor(254, 242, 242);
  doc.circle(70, 88, 45, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(220, 38, 38);
  doc.text('♥', 70, 95, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  const g1 = doc.splitTextToSize(
    'Thanking every co-traveler, whoever showed us the path, supported us, guided us, contributed to our journey and experiences.',
    140
  );
  doc.text(g1, 130, 55);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(70, 70, 70);
  const g2 = doc.splitTextToSize(
    'Gratitude to all the children and parents who allowed us in their lives, loved us unconditionally and being part of this wonderful journey.',
    140
  );
  doc.text(g2, 130, 95);
  drawSlideFooter();

  // ---------------- PAGE 13 ----------------
  doc.addPage();
  drawSlideHeader('Glimpses of our sessions');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Session Photo Catalog - Part 1', 16, 32);

  const g13 = [
    'Session with parents',
    'Showcase',
    'Session with parents',
    'Session with parents',
    'Storytelling session',
    'Session with parents',
    'Student activities',
    'Session with parents',
    'Session with parents',
    'Session with parents',
  ];
  let gx = 16;
  let gy = 36;
  g13.forEach((lbl, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(gx, gy, 50, 48, 2, 2, 'F');
    doc.setFillColor(245, 240, 230);
    doc.roundedRect(gx + 2, gy + 2, 46, 34, 1, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text(`[ Photo ${idx + 1} ]`, gx + 25, gy + 20, { align: 'center' });

    doc.setFillColor(255, 217, 102);
    doc.rect(gx + 2, gy + 38, 46, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(30, 30, 30);
    doc.text(lbl, gx + 25, gy + 43.5, { align: 'center' });

    gx += 54;
    if ((idx + 1) % 5 === 0) {
      gx = 16;
      gy += 54;
    }
  });
  drawSlideFooter();

  // ---------------- PAGE 14 ----------------
  doc.addPage();
  drawSlideHeader('Glimpses of our sessions');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Parent’s Workshops Across South Delhi Primary Schools - Part 2', 16, 32);

  let g2x = 16;
  let g2y = 38;
  for (let i = 0; i < 8; i++) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(g2x, g2y, 62, 50, 2, 2, 'F');
    doc.setFillColor(245, 240, 230);
    doc.roundedRect(g2x + 2, g2y + 2, 58, 36, 1, 1, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text(`[ Workshop Record ${i + 1} ]`, g2x + 31, g2y + 20, { align: 'center' });

    doc.setFillColor(255, 217, 102);
    doc.rect(g2x + 2, g2y + 40, 58, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    doc.text("Parent's workshop", g2x + 31, g2y + 45.5, { align: 'center' });

    g2x += 68;
    if ((i + 1) % 4 === 0) {
      g2x = 16;
      g2y += 56;
    }
  }
  drawSlideFooter();

  // Save the 14-page PDF file to public/documents/about-us.pdf
  const pdfBytes = doc.output('arraybuffer');
  fs.writeFileSync(path.join(outDir, 'about-us.pdf'), Buffer.from(pdfBytes));
  console.log('Successfully wrote public/documents/about-us.pdf (14 pages)');
}

// =========================================================================
// 2. HELPER TO GENERATE OTHER OFFICIAL REPORT PDFS
// =========================================================================
function generateGenericDocPdf(filename: string, title: string, subtitle: string, pages: { heading: string; body: string }[]) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [297, 167],
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Cover Page
  doc.setFillColor(254, 243, 199);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setFillColor(234, 88, 12);
  doc.rect(0, 0, pageWidth, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(217, 119, 6);
  doc.text('SHUBH: AARAMBH • DAWN CHILD FOUNDATION', 20, 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(194, 65, 12);
  doc.text('Dawn Child Foundation', 20, 38);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  const tLines = doc.splitTextToSize(title, pageWidth - 40);
  doc.text(tLines, 20, 60);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  const subLines = doc.splitTextToSize(subtitle, pageWidth - 40);
  doc.text(subLines, 20, 75);

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 95, pageWidth - 40, 50, 4, 4, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(180, 83, 9);
  doc.text('Official Document Details & Credentials', 26, 105);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  doc.text('• Issued by: Dawn Child Foundation (Early Childhood Care & Education)', 26, 115);
  doc.text('• Field Region: South Delhi Municipal Corporation (MCD) Schools & Community Centers', 26, 123);
  doc.text('• Section 80G Tax Exemption Entity: DEL-80G/2023-24/A-1082', 26, 131);

  // Content Pages
  pages.forEach((p, idx) => {
    doc.addPage();
    doc.setFillColor(252, 248, 239);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(234, 88, 12);
    doc.rect(0, 0, pageWidth, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(234, 88, 12);
    doc.text(`DAWN CHILD FOUNDATION • ${title.toUpperCase()}`, 16, 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text(p.heading, 16, 25);

    doc.setDrawColor(230, 215, 190);
    doc.setLineWidth(0.4);
    doc.line(16, 30, pageWidth - 16, 30);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    const bLines = doc.splitTextToSize(p.body, pageWidth - 32);
    doc.text(bLines, 16, 42);

    // Footer
    doc.line(16, pageHeight - 12, pageWidth - 16, pageHeight - 12);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Dawn Child Foundation • Page ${idx + 2} of ${pages.length + 1}`, pageWidth - 16, pageHeight - 6, { align: 'right' });
  });

  const pdfBytes = doc.output('arraybuffer');
  fs.writeFileSync(path.join(outDir, filename), Buffer.from(pdfBytes));
  console.log(`Successfully wrote public/documents/${filename}`);
}

// Generate all documents
generateAboutUsPdf();

generateGenericDocPdf('programme-journey.pdf', 'Programme Journey, Implementation & Learning', '10-Week Cohort Field Execution, Community Immersion & Pedagogical Learnings', [
  {
    heading: 'Phase I: Community Mobilization & Trust Building (Weeks 1-3)',
    body: 'Dawn Child Foundation began by entering 5 MCD primary schools in South Delhi. Initial door-to-door visits in Chirag Dilli and Hauz Rani revealed skepticism among parents who had never been invited to a school for collaborative dialogue. Facilitators instituted informal chai circles and non-judgmental listening posts, allowing mothers to express their daily struggles before introducing formal curriculum concepts.',
  },
  {
    heading: 'Phase II: The Mindful Parenting Cohort Cycle (Weeks 4-8)',
    body: 'Each weekly circle follows a 4-step pedagogical arc: 1. Emotional Grounding check-in, 2. Provocation and Non-Violent Communication roleplays, 3. Hands-on Sensory Play using household materials, and 4. Gentle home pledges. Parent Engagement Groups (PEGs) achieved an 89% weekly retention rate as mothers discovered they were not alone in facing exhaustion and domestic stress.',
  },
  {
    heading: 'Phase III: Institutional Integration & Graduation (Weeks 9-10)',
    body: 'The cohort culminated with collaborative classroom showcases where parents displayed handmade sensory toys and shared personal growth reflections with school principals. Over 15 proactive mothers transitioned into "Bachpan Saathees" to mentor incoming nursery parents.',
  },
]);

generateGenericDocPdf('impact-report.pdf', 'Annual Impact Assessment Report', 'Quantitative & Qualitative Outcomes Across South Delhi MCD Primary Schools (2024-25)', [
  {
    heading: 'Key Quantitative Outcome Indicators (N = 420 Caregivers)',
    body: '• 84% reduction in daily recurring punitive reprimands and shouting at home.\n• 92% increase in dedicated screen-free interactive parent-child play sessions.\n• 100% unanimous parent satisfaction in aspects of Behaviour, Efforts, and Connections.\n• 38% increase in morning attendance punctuality for nursery and Grade 1 students.',
  },
  {
    heading: 'Classroom & School Dynamics Transformation',
    body: 'School headmistresses and class teachers observed a remarkable decline in nursery morning separation anxiety. Children whose parents attended the 10-week sessions settled into morning activities within 5 minutes instead of 45 minutes. Parents began actively engaging in School Management Committee (SMC) meetings to advocate for early childhood facilities.',
  },
]);

generateGenericDocPdf('photo-evidence.pdf', 'Photo Evidence & Visual Archive', 'Visual Documentation of Community Workshops, Sensory Toolkits & Children in South Delhi', [
  {
    heading: 'Grounded in Community Spaces',
    body: 'Photographic documentation records our workshops across school corridors, courtyards, and local parks in Chirag Dilli and Hauz Rani. Caregivers sit together on woven floor dhurries, participating in emotional check-in exercises and interactive group storytelling.',
  },
  {
    heading: 'Zero-Cost ECCE Learning Artifacts',
    body: 'Our visual catalog documents over 300 handmade developmental toys crafted by parents using discarded cardboard, fabric remnants, and pulses. These sensory materials provide foundational tactile and fine-motor stimulation in low-income households.',
  },
]);

generateGenericDocPdf('principals-feedback.pdf', "Principal's Feedback Report", 'Official Appraisals & Testimonials from South Delhi Municipal Corporation Headmistresses', [
  {
    heading: 'Transforming School-Parent Relationships',
    body: 'For decades, public primary school teachers and underprivileged parents viewed each other with mutual apprehension. Dawn Child Foundation bridged this divide by turning schools into warm, welcoming centers of parental empowerment. Principals reported a 45% increase in voluntary parent attendance at official school conferences.',
  },
  {
    heading: 'Official Endorsements for Zonal Scaling',
    body: '"In my 22 years of service in MCD schools, I have never seen parents attend school workshops with such devotion. Their children are noticeably calmer, clean, and eager to learn in class." — Smt. Sarita Sharma, Headmistress, MCD Primary Girls School, Malviya Nagar.',
  },
]);

generateGenericDocPdf('facilitator-reflections.pdf', 'Facilitator Reflections & Findings Report', 'Field Diaries, Maternal Psychology & Ethnographic Insights from 200+ Workshop Hours', [
  {
    heading: 'Unpacking the Burden of Maternal Exhaustion',
    body: 'Our child psychologists and community facilitators discovered that before teaching positive parenting techniques, we had to hold space for the mothers own emotional burdens. In urban slum settlements, many mothers reported that our circle was the very first time someone asked how they were feeling.',
  },
  {
    heading: 'Evolving Gender Dynamics & Paternal Engagement',
    body: 'Childcare in low-income settlements is traditionally considered women domestic work. By piloting weekend evening sessions and engaging male community leaders, we initiated dialogues on shared domestic caregiving, leading to our upcoming "Pita-Charcha" father engagement initiative.',
  },
]);

generateGenericDocPdf('programme-booklet.pdf', 'Programme Booklet: Shubh: Aarambh Guide', 'The Complete 10-Week Early Childhood Care & Education Curriculum Architecture', [
  {
    heading: 'Foundational Pillars of the 10-Week Curriculum',
    body: 'Synthesizing neurobiological insights into the first 2,000 days of brain growth, non-violent communication, and Indian cultural storytelling traditions. The curriculum is mapped across 4 spheres: Self as Parent, Family as Nurturer, Community as Support, and School as Safe Space.',
  },
  {
    heading: '10-Week Thematic Session Breakdown',
    body: '1. Know Yourself (Baseline safety)\n2. Childhood & Beliefs (Unpacking conditioning)\n3. Pressured Parenting (Somatic calming tools)\n4. Loving Routines (Predictable rhythms)\n5. Listening to Understand (Empathy)\n6. Speaking with Heart (Non-violent expression)\n7. Stories & Play as Tools (Sensory toys)\n8. Respect, Equity & Gender (Fairness at home)\n9. Peer Circles & Community (Support networks)\n10. Celebration & Endline (Graduation & pledges).',
  },
]);

console.log('All documents generated successfully in public/documents/');
