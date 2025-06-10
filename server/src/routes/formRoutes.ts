import { Router } from 'express';
import { submitForm, getAllSubmissions } from '../controllers/formController';
import { body } from 'express-validator';

const router = Router();

// Validation middleware
const validateFormSubmission = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('service').trim().notEmpty().withMessage('Service selection is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  body('gdprConsent').isBoolean().equals('true').withMessage('GDPR consent is required'),
];

// Routes
router.post('/submit', validateFormSubmission, submitForm);
router.get('/submissions', getAllSubmissions);

export default router; 