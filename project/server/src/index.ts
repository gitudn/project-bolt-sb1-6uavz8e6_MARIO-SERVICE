import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as quoteRoutes } from './routes/quotes';
import { router as authRoutes } from './routes/auth';
import User from './models/User';

dotenv.config();

const app = express();
const host = '127.0.0.1';
const port = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow frontend origins
  credentials: true
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Database connection
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://marioservice:marioservice123@cluster0.mongodb.net/mario_service?retryWrites=true&w=majority';
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
    
    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const admin = new User({
        email: 'admin@marioservice.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(port, host, () => {
      console.log(`Server is running at http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();