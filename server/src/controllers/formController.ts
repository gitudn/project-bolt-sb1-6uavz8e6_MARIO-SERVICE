import { Request, Response } from 'express';
import { FormSubmission } from '../models/FormSubmission';

export const submitForm = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      service,
      message,
      gdprConsent,
    } = req.body;

    // Create new form submission
    const formSubmission = new FormSubmission({
      fullName,
      phone,
      email,
      service,
      message,
      gdprConsent,
    });

    // Save to database
    await formSubmission.save();

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: formSubmission,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting form',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllSubmissions = async (_req: Request, res: Response) => {
  try {
    const submissions = await FormSubmission.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}; 