import { jsPDF } from 'jspdf';
import { DocumentationItem, DOCUMENTATION_ITEMS } from '../data/documentationItems';
import { downloadAboutUsPdf } from './generateAboutUsPdf';

export function downloadDocumentPdf(docItem: DocumentationItem) {
  // If it's the core 14-page presentation "About Us", use its dedicated generator
  if (docItem.id === 'about-us') {
    downloadAboutUsPdf();
    return;
  }

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Helper for adding footer
  const addFooter = (pageNum: number, total: number) => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      `Dawn Child Foundation | ${docItem.title} • ${docItem.period}`,
      14,
      pageHeight - 8
    );
    doc.text(`Page ${pageNum} of ${total}`, pageWidth - 25, pageHeight - 8);
  };

  // Helper for top banner
  const addHeader = (title: string, subtitle?: string) => {
    doc.setFillColor(234, 88, 12);
    doc.rect(0, 0, pageWidth, 5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(234, 88, 12);
    doc.text('DAWN CHILD FOUNDATION • SHUBH: AARAMBH', 14, 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text(title, 14, 23);

    if (subtitle) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(subtitle, 14, 30);
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
  doc.text('SHUBH: AARAMBH • OFFICIAL DOCUMENT', 20, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(194, 65, 12);
  doc.text('Dawn Child Foundation', 20, 42);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(120, 53, 15);
  doc.text('Early Childhood Care & Education (ECCE) • South Delhi, India', 20, 50);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 30, 30);
  const titleLines = doc.splitTextToSize(docItem.title, pageWidth - 40);
  doc.text(titleLines, 20, 72);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(194, 65, 12);
  const subtitleLines = doc.splitTextToSize(docItem.subtitle, pageWidth - 40);
  doc.text(subtitleLines, 20, 84);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(docItem.description, pageWidth - 50);
  doc.text(descLines, 20, 104);

  // Key Highlights Box on Cover
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(20, 128, pageWidth - 40, 45, 4, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 83, 9);
  doc.text('KEY REPORT HIGHLIGHTS & CREDENTIALS:', 26, 137);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(50, 50, 50);
  let hY = 145;
  docItem.keyHighlights.forEach((hl) => {
    doc.setFillColor(234, 88, 12);
    doc.circle(28, hY - 1.2, 1.2, 'F');
    const hlText = doc.splitTextToSize(hl, pageWidth - 65);
    doc.text(hlText, 32, hY);
    hY += 6.5;
  });

  addFooter(1, docItem.slides.length + 1);

  // ---------------- SUBSEQUENT PAGES ----------------
  docItem.slides.forEach((slide, idx) => {
    doc.addPage();
    const pageNum = idx + 2;
    addHeader(slide.title, slide.subtitle);

    let currentY = 40;

    slide.sections.forEach((sec) => {
      if (sec.heading) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(194, 65, 12);
        doc.text(sec.heading, 16, currentY);
        currentY += 7;
      }

      if (sec.text) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10.5);
        doc.setTextColor(50, 50, 50);
        const splitText = doc.splitTextToSize(sec.text, pageWidth - 32);
        doc.text(splitText, 16, currentY);
        currentY += splitText.length * 5.5 + 4;
      }

      if (sec.highlightBox) {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(16, currentY, pageWidth - 32, 16, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(180, 83, 9);
        const hText = doc.splitTextToSize(sec.highlightBox, pageWidth - 42);
        doc.text(hText, 22, currentY + 6.5);
        currentY += 21;
      }

      if (sec.bullets) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        sec.bullets.forEach((b) => {
          doc.setFillColor(234, 88, 12);
          doc.circle(20, currentY - 1, 1.2, 'F');
          const bText = doc.splitTextToSize(b, pageWidth - 45);
          doc.text(bText, 25, currentY);
          currentY += bText.length * 5 + 2;
        });
        currentY += 4;
      }

      if (sec.quote) {
        doc.setFillColor(255, 247, 237);
        doc.roundedRect(16, currentY, pageWidth - 32, 24, 3, 3, 'F');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10.5);
        doc.setTextColor(40, 40, 40);
        const qText = doc.splitTextToSize(`"${sec.quote.text}"`, pageWidth - 42);
        doc.text(qText, 22, currentY + 7);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(194, 65, 12);
        doc.text(
          `— ${sec.quote.author} (${sec.quote.role})`,
          22,
          currentY + 18
        );
        currentY += 28;
      }
    });

    addFooter(pageNum, docItem.slides.length + 1);
  });

  doc.save(docItem.pdfFilename);
}
