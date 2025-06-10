import mongoose from 'mongoose';

export interface IQuote extends mongoose.Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  message?: string;
  privacy_consent: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  service: {
    type: String,
    required: true,
    enum: ['plumbing', 'shutters', 'locks']
  },
  message: {
    type: String,
    trim: true
  },
  privacy_consent: {
    type: String,
    required: true,
    enum: ['allowed', 'not allowed'],
    default: 'not allowed'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'contacted', 'completed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model<IQuote>('Quote', quoteSchema); 