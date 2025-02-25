import express from 'express';
import { Invoice } from '../models/Invoice.js';
import { generatePDF } from '../utils/pdfGenerator.js';

export const router = express.Router();

// Create new invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate PDF for invoice
router.get('/:id/pdf', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    const pdfBuffer = await generatePDF(invoice);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update invoice
router.put('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});