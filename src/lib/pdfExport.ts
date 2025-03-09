
import { Checklist, Category, ChecklistItem } from './checklistData';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autotable: (options: any) => jsPDF;
  }
}

export const exportToPdf = (checklist: Checklist): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(checklist.title, 14, 22);
  
  // Add date
  doc.setFontSize(10);
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Generated on: ${currentDate}`, 14, 30);
  
  let yPos = 40;
  
  checklist.categories.forEach((category: Category) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Category title
    doc.setFontSize(14);
    doc.text(category.title, 14, yPos);
    yPos += 10;
    
    const tableData = category.items.map((item: ChecklistItem) => [
      item.completed ? '✓' : '□',
      item.title,
      item.priority,
    ]);
    
    doc.setFontSize(10);
    doc.autotable({
      startY: yPos,
      head: [['Status', 'Task', 'Priority']],
      body: tableData,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 130 },
        2: { cellWidth: 30 },
      },
      headStyles: {
        fillColor: [66, 133, 244],
      },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 15;
  });
  
  // Save the PDF
  doc.save('cx-checklist.pdf');
};

export const exportDetailsReportToPdf = (checklist: Checklist): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(checklist.title, 14, 22);
  
  // Add date
  doc.setFontSize(10);
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Detailed Report - Generated on: ${currentDate}`, 14, 30);
  
  let yPos = 40;
  let pageCount = 1;
  
  // Function to add header to new pages
  const addPageHeader = () => {
    doc.setFontSize(10);
    doc.text(`${checklist.title} - Page ${pageCount}`, 14, 10);
    doc.text(`Generated on: ${currentDate}`, 14, 15);
    yPos = 25;
  };
  
  checklist.categories.forEach((category: Category) => {
    // Check if we need a new page
    if (yPos > 270) {
      doc.addPage();
      pageCount++;
      addPageHeader();
    }
    
    // Category title
    doc.setFontSize(14);
    doc.text(category.title, 14, yPos);
    yPos += 10;
    
    category.items.forEach((item: ChecklistItem) => {
      // Check if we need a new page for each item
      if (yPos > 250) {
        doc.addPage();
        pageCount++;
        addPageHeader();
      }
      
      // Item title and status
      doc.setFontSize(12);
      const status = item.completed ? '✓' : '□';
      doc.text(`${status} ${item.title} (${item.priority})`, 14, yPos);
      yPos += 8;
      
      // Item details
      doc.setFontSize(9);
      doc.setTextColor(100);
      
      // Action
      doc.text('Action:', 20, yPos);
      
      // Word wrap for long text
      const splitAction = doc.splitTextToSize(item.action, 170);
      doc.text(splitAction, 20, yPos + 5);
      yPos += 5 + (splitAction.length * 5);
      
      // Reason
      doc.text('Why:', 20, yPos);
      const splitReason = doc.splitTextToSize(item.reason, 170);
      doc.text(splitReason, 20, yPos + 5);
      yPos += 5 + (splitReason.length * 5);
      
      // Insight
      doc.text('Expert Insight:', 20, yPos);
      const splitInsight = doc.splitTextToSize(item.insight, 170);
      doc.text(splitInsight, 20, yPos + 5);
      yPos += 5 + (splitInsight.length * 5) + 5;
      
      // Reset text color
      doc.setTextColor(0);
    });
    
    yPos += 10;
  });
  
  // Save the PDF
  doc.save('cx-checklist-detailed.pdf');
};

