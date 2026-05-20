import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

const samplePayments = [
  { id: 'pay_001', auctionId: '1', amount: 25000, status: 'completed', provider: 'Stripe' },
  { id: 'pay_002', auctionId: '2', amount: 1200, status: 'pending', provider: 'PayPal' },
];

router.get('/', (_req: Request, res: Response) => {
  res.json(successResponse(samplePayments));
});

router.post('/checkout', (req: Request, res: Response) => {
  const { auctionId, amount, paymentMethod } = req.body;
  if (!auctionId || typeof amount !== 'number' || !paymentMethod) {
    return res.status(400).json(errorResponse('auctionId, amount, and paymentMethod are required')); 
  }

  const newPayment = {
    id: `pay_${Date.now()}`,
    auctionId,
    amount,
    status: 'processing',
    provider: paymentMethod,
    createdAt: new Date().toISOString(),
  };

  samplePayments.push(newPayment);
  res.status(201).json(successResponse(newPayment, 'Payment initialized successfully'));
});

export default router;
