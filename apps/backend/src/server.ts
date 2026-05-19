import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server as HTTPServer } from 'http';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import pool from './config/database.js';

// Load environment variables
dotenv.config();

const app: Express = express();
const server: HTTPServer = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API Routes
app.use('/api/auth', (req: Request, res: Response) => {
  res.json({ message: 'Auth routes coming soon' });
});
app.use('/api/auctions', (req: Request, res: Response) => {
  res.json({ message: 'Auction routes coming soon' });
});
app.use('/api/bids', (req: Request, res: Response) => {
  res.json({ message: 'Bid routes coming soon' });
});
app.use('/api/users', (req: Request, res: Response) => {
  res.json({ message: 'User routes coming soon' });
});
app.use('/api/categories', (req: Request, res: Response) => {
  res.json({ message: 'Category routes coming soon' });
});
app.use('/api/payments', (req: Request, res: Response) => {
  res.json({ message: 'Payment routes coming soon' });
});
app.use('/api/messages', (req: Request, res: Response) => {
  res.json({ message: 'Message routes coming soon' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Socket.IO setup for real-time bidding
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('join-auction', (auctionId: string) => {
    socket.join(`auction-${auctionId}`);
    console.log(`User ${socket.id} joined auction ${auctionId}`);
  });

  socket.on('place-bid', (data: any) => {
    const { auctionId, bidAmount, bidderId } = data;
    io.to(`auction-${auctionId}`).emit('bid-placed', {
      auctionId,
      bidAmount,
      bidderId,
      timestamp: new Date(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, io };
