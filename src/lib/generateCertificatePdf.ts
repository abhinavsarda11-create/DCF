import { jsPDF } from 'jspdf';

export type DonationTier = 'diamond' | 'gold' | 'silver' | 'bronze';

export interface CertificateDetails {
  donorName: string;
  donorEmail: string;
  amount: number;
  tier: DonationTier;
  certificateId: string;
  transactionId: string;
  date: string;
}

export function getDonationTier(amountNum: number): {
  tier: DonationTier;
  tierName: string;
  tierColor: string;
  bgDesc: string;
  badgeLabel: string;
} {
  if (amountNum > 10000) {
    return {
      tier: 'diamond',
      tierName: 'Diamond Patron',
      tierColor: '#0284c7', // Cyan-blue diamond
      bgDesc: 'Diamond Holographic Crystalline Background',
      badgeLabel: '💎 Diamond Tier',
    };
  } else if (amountNum >= 1001) {
    return {
      tier: 'gold',
      tierName: 'Gold Benefactor',
      tierColor: '#d97706', // Warm amber gold
      bgDesc: 'Lustrous Radiant Gold Background',
      badgeLabel: '🥇 Gold Tier',
    };
  } else if (amountNum >= 101) {
    return {
      tier: 'silver',
      tierName: 'Silver Champion',
      tierColor: '#64748b', // Slate silver
      bgDesc: 'Polished Metallic Silver Background',
      badgeLabel: '🥈 Silver Tier',
    };
  } else {
    return {
      tier: 'bronze',
      tierName: 'Bronze Supporter',
      tierColor: '#b45309', // Warm bronze copper
      bgDesc: 'Brushed Antique Bronze Background',
      badgeLabel: '🥉 Bronze Tier',
    };
  }
}

export function downloadCertificatePdf(details: CertificateDetails) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210 mm

  const { tier, donorName, amount, certificateId, transactionId, date } = details;

  // 1. Draw Tier-Specific Backgrounds & Borders
  if (tier === 'diamond') {
    // Diamond Background: Crystalline Ice Cyan & White gradient simulation
    doc.setFillColor(240, 249, 255); // Ice cyan
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Inner diamond border tint
    doc.setFillColor(224, 242, 254);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'F');

    doc.setFillColor(255, 255, 255);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28, 'F');

    // Double Diamond Borders
    doc.setDrawColor(2, 132, 199); // Sky blue
    doc.setLineWidth(1.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(0.6);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32, 'D');

    // Corner diamond shapes
    doc.setFillColor(2, 132, 199);
    [[14, 14], [pageWidth - 14, 14], [14, pageHeight - 14], [pageWidth - 14, pageHeight - 14]].forEach(([cx, cy]) => {
      doc.circle(cx, cy, 3, 'F');
    });
  } else if (tier === 'gold') {
    // Gold Background: Lustrous Warm Gold / Cream
    doc.setFillColor(255, 251, 235); // Amber-50
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(254, 243, 199); // Amber-100
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'F');

    doc.setFillColor(255, 255, 255);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28, 'F');

    // Gold borders
    doc.setDrawColor(217, 119, 6); // Amber-600
    doc.setLineWidth(1.8);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

    doc.setDrawColor(245, 158, 11); // Amber-500
    doc.setLineWidth(0.8);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32, 'D');

    // Corner golden accents
    doc.setFillColor(217, 119, 6);
    [[14, 14], [pageWidth - 14, 14], [14, pageHeight - 14], [pageWidth - 14, pageHeight - 14]].forEach(([cx, cy]) => {
      doc.circle(cx, cy, 3, 'F');
    });
  } else if (tier === 'silver') {
    // Silver Background: Polished Metallic Slate / Platinum
    doc.setFillColor(248, 250, 252); // Slate-50
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(241, 245, 249); // Slate-100
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'F');

    doc.setFillColor(255, 255, 255);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28, 'F');

    // Silver borders
    doc.setDrawColor(100, 116, 139); // Slate-500
    doc.setLineWidth(1.6);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

    doc.setDrawColor(148, 163, 184); // Slate-400
    doc.setLineWidth(0.7);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32, 'D');

    // Corner silver accents
    doc.setFillColor(100, 116, 139);
    [[14, 14], [pageWidth - 14, 14], [14, pageHeight - 14], [pageWidth - 14, pageHeight - 14]].forEach(([cx, cy]) => {
      doc.circle(cx, cy, 3, 'F');
    });
  } else {
    // Bronze Background: Warm Brushed Bronze / Copper
    doc.setFillColor(255, 247, 237); // Orange-50
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(254, 237, 213); // Orange-100
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16, 'F');

    doc.setFillColor(255, 255, 255);
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28, 'F');

    // Bronze borders
    doc.setDrawColor(180, 83, 9); // Amber-700
    doc.setLineWidth(1.6);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24, 'D');

    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.7);
    doc.rect(16, 16, pageWidth - 32, pageHeight - 32, 'D');

    // Corner bronze accents
    doc.setFillColor(180, 83, 9);
    [[14, 14], [pageWidth - 14, 14], [14, pageHeight - 14], [pageWidth - 14, pageHeight - 14]].forEach(([cx, cy]) => {
      doc.circle(cx, cy, 3, 'F');
    });
  }

  // 2. Header Emblem & Titles
  const centerX = pageWidth / 2;

  // Foundation Brand
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  if (tier === 'diamond') {
    doc.setTextColor(2, 132, 199);
  } else if (tier === 'gold') {
    doc.setTextColor(217, 119, 6);
  } else if (tier === 'silver') {
    doc.setTextColor(71, 85, 105);
  } else {
    doc.setTextColor(180, 83, 9);
  }
  doc.text('SHUBH: AARAMBH • DAWN CHILD FOUNDATION', centerX, 30, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Registered Non-Profit Organisation | 80G Recognized Tax-Exempt Entity', centerX, 35, { align: 'center' });

  // Main Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(30, 30, 30);
  doc.text('CERTIFICATE OF PHILANTHROPIC IMPACT', centerX, 48, { align: 'center' });

  // Tier Badge Banner
  const tierUpper = tier.toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  if (tier === 'diamond') {
    doc.setTextColor(2, 132, 199);
    doc.text(`◆ ${tierUpper} TIER PATRON AWARD ◆`, centerX, 57, { align: 'center' });
  } else if (tier === 'gold') {
    doc.setTextColor(217, 119, 6);
    doc.text(`★ ${tierUpper} TIER BENEFACTOR AWARD ★`, centerX, 57, { align: 'center' });
  } else if (tier === 'silver') {
    doc.setTextColor(71, 85, 105);
    doc.text(`● ${tierUpper} TIER CHAMPION AWARD ●`, centerX, 57, { align: 'center' });
  } else {
    doc.setTextColor(180, 83, 9);
    doc.text(`▲ ${tierUpper} TIER SUPPORTER AWARD ▲`, centerX, 57, { align: 'center' });
  }

  // Presentation text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(90, 90, 90);
  doc.text('This official certificate is proudly and gratefully presented to', centerX, 70, { align: 'center' });

  // Donor Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(20, 20, 20);
  doc.text(donorName || 'Distinguished Supporter', centerX, 84, { align: 'center' });

  // Thin separator under name
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(centerX - 60, 88, centerX + 60, 88);

  // Contribution body description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11.5);
  doc.setTextColor(50, 50, 50);
  const appreciationText =
    `In profound appreciation for your compassionate donation of INR ₹${amount.toLocaleString('en-IN')}/- to Dawn Child Foundation. ` +
    `Your support directly empowers underprivileged parents with our 10-Week Early Childhood Care & Education (ECCE) curriculum, ` +
    `nurturing resilient, loved, and emotionally flourishing children across Delhi NCR.`;

  const splitAppreciation = doc.splitTextToSize(appreciationText, pageWidth - 70);
  doc.text(splitAppreciation, centerX, 98, { align: 'center' });

  // Key Tax & Reference Details Block
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(centerX - 100, 126, 200, 22, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(centerX - 100, 126, 200, 22, 3, 3, 'D');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`CERTIFICATE REF: ${certificateId}`, centerX - 92, 134);
  doc.text(`TRANSACTION ID: ${transactionId}`, centerX - 92, 142);

  doc.text(`SECTION 80G REG: DEL-80G/2023-24/A-1082`, centerX + 10, 134);
  doc.text(`DATE OF ISSUANCE: ${date}`, centerX + 10, 142);

  // Signatures & Official Stamp
  // Left: Managing Trustee
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text('Dr. Ananya Sen', centerX - 70, 175, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 110);
  doc.text('Managing Trustee, Dawn Child', centerX - 70, 180, { align: 'center' });
  doc.setDrawColor(180, 180, 180);
  doc.line(centerX - 100, 168, centerX - 40, 168);

  // Center: Official Verified Seal
  doc.setFillColor(254, 243, 199);
  doc.circle(centerX, 172, 14, 'F');
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1.2);
  doc.circle(centerX, 172, 14, 'D');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text('DAWN CHILD', centerX, 169, { align: 'center' });
  doc.text('VERIFIED', centerX, 173, { align: 'center' });
  doc.text('SEAL 2026', centerX, 177, { align: 'center' });

  // Right: Programme Director
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text('Rajesh K. Verma', centerX + 70, 175, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 110);
  doc.text('ECCE Programme Director', centerX + 70, 180, { align: 'center' });
  doc.setDrawColor(180, 180, 180);
  doc.line(centerX + 40, 168, centerX + 100, 168);

  // Bottom Security Footnote
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'Dawn Child Foundation | 206 Second Floor, Block A, Shivalik, Malviya Nagar, New Delhi - 110017 | contact@dawnchild.org | Eligible for 50% Tax Exemption under Sec 80G',
    centerX,
    196,
    { align: 'center' }
  );

  // Save PDF
  const cleanName = (donorName || 'Supporter').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Dawn_Child_${tierUpper}_Certificate_${cleanName}.pdf`);
}
