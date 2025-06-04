import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const router = express.Router();

// Validation middleware
const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Admin login
router.post('/login', validateLogin, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

// Create initial admin user (should be protected in production)
router.post('/setup', async (req: express.Request, res: express.Response) => {
  try {
    // Remove any existing admin users
    await User.deleteMany({ role: 'admin' });

    const admin = new User({
      email: 'admin@marioservice.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ 
      message: 'Admin user created successfully',
      credentials: {
        email: admin.email,
        password: 'admin123'  // Only showing this in development
      }
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Error creating admin user' });
  }
}); 