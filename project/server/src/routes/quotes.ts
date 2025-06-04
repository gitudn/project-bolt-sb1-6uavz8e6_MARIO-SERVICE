import express from 'express';
import { body, validationResult } from 'express-validator';
import Quote from '../models/Quote';
import { authenticateToken } from '../middleware/auth';

export const router = express.Router();

// Validation middleware
const validateQuote = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('service').isIn(['plumbing', 'shutters', 'locks']).withMessage('Invalid service'),
  body('message').optional().trim()
];

// Submit a new quote request
router.post('/', validateQuote, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quote = new Quote(req.body);
    await quote.save();
    
    res.status(201).json({
      message: 'Quote request submitted successfully',
      quote
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quote request' });
  }
});

// Get all quotes (protected route - admin only)
router.get('/', authenticateToken, async (req: express.Request, res: express.Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quotes' });
  }
});

// Get a specific quote by ID (protected route - admin only)
router.get('/:id', authenticateToken, async (req: express.Request, res: express.Response) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote' });
  }
});

// Update quote status (protected route - admin only)
router.patch('/:id/status', authenticateToken, async (req: express.Request, res: express.Response) => {
  try {
    const { status } = req.body;
    if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: 'Error updating quote status' });
  }
}); 