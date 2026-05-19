import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import { hashPassword, comparePassword, validateEmail, validatePassword, validateUsername } from '../utils/validators.js';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    // Validation
    if (!validateEmail(email)) {
      return res.status(400).json(errorResponse('Invalid email format'));
    }
    if (!validatePassword(password)) {
      return res.status(400).json(errorResponse('Password must be at least 8 characters'));
    }
    if (!validateUsername(username)) {
      return res.status(400).json(errorResponse('Username must be 3-20 characters'));
    }

    // Check if user exists
    const userExists = await pool.query('SELECT id FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (userExists.rows.length > 0) {
      return res.status(409).json(errorResponse('Email or username already exists'));
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, username, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, username, role',
      [email, username, passwordHash, firstName, lastName, 'user']
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json(
      successResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          },
          token,
        },
        'Registration successful'
      )
    );
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json(errorResponse('Server error during registration'));
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(errorResponse('Email and password required'));
    }

    // Find user
    const result = await pool.query(
      'SELECT id, email, username, password_hash, role, account_status FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    const user = result.rows[0];

    // Check if account is active
    if (user.account_status !== 'active') {
      return res.status(403).json(errorResponse('Account is not active'));
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json(errorResponse('Invalid credentials'));
    }

    // Update last login
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    const token = generateToken(user.id, user.email, user.role);

    res.json(
      successResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          },
          token,
        },
        'Login successful'
      )
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(errorResponse('Server error during login'));
  }
});

// Verify Token
router.get('/verify', (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(errorResponse('No token provided'));
  }

  try {
    const payload = verifyToken(token);
    res.json(successResponse({ valid: true, payload }));
  } catch (error) {
    res.status(401).json(errorResponse('Invalid token'));
  }
});

// Refresh Token (you might want to implement this)
router.post('/refresh', (req: Request, res: Response) => {
  // Implementation for token refresh
  res.json(successResponse({ message: 'Refresh token endpoint' }));
});

export default router;
