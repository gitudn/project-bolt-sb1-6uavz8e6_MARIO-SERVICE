import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import Quote from '../models/Quote';

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
    console.error('Error submitting quote:', error);
    res.status(500).json({ message: 'Error submitting quote request' });
  }
});

// Get all quotes (protected route - admin only)
router.get('/', authenticateToken, async (req: express.Request, res: express.Response) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes' });
  }
}); 