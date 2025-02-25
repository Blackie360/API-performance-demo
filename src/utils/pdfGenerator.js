import PDFDocument from 'pdfkit';

export const generatePDF = (invoice) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add company logo/header
      doc.fontSize(20).text('INVOICE', { align: 'center' });
      doc.moveDown();

      // Add invoice details
      doc.fontSize(12)
        .text(`Invoice Number: ${invoice.invoiceNumber}`)
        .text(`Date: ${invoice.date.toLocaleDateString()}`)
        .text(`Due Date: ${invoice.dueDate.toLocaleDateString()}`)
        .moveDown();

      // Add client information
      doc.text('Bill To:')
        .text(invoice.client.name)
        .text(invoice.client.email)
        .text(invoice.client.address)
        .moveDown();

      // Add items table
      doc.text('Items:', { underline: true }).moveDown();
      invoice.items.forEach(item => {
        doc.text(`${item.description}`)
          .text(`Quantity: ${item.quantity} x Price: $${item.price} = $${item.amount}`)
          .moveDown(0.5);
      });

      // Add totals
      doc.moveDown()
        .text(`Subtotal: $${invoice.subtotal}`)
        .text(`Tax: $${invoice.tax}`)
        .text(`Total: $${invoice.total}`, { bold: true });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};