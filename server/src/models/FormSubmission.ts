import mongoose from 'mongoose';

const formSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  gdprConsent: {
    type: Boolean,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'completed'],
    default: 'new',
  }
});

export const FormSubmission = mongoose.model('FormSubmission', formSubmissionSchema); 