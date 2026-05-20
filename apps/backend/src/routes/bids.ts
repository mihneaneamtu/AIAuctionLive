import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

const sampleBids = [
  { id: 'bid_1001', auctionId: '1', bidderId: 'user_101', amount: 25000, timestamp: new Date().toISOString() },
  { id: 'bid_1002', auctionId: '1', bidderId: 'user_102', amount: 25500, timestamp: new Date().toISOString() },
  { id: 'bid_1003', auctionId: '2', bidderId: 'user_103', amount: 1500, timestamp: new Date().toISOString() },
];

router.get('/', (req: Request, res: Response) => {
  const { auctionId } = req.query;
  const filtered = auctionId
    ? sampleBids.filter((bid) => bid.auctionId === auctionId)
    : sampleBids;
  res.json(successResponse(filtered));
});

router.post('/', (req: Request, res: Response) => {
  const { auctionId, bidderId, amount } = req.body;

  if (!auctionId || !bidderId || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json(errorResponse('auctionId, bidderId, and amount are required and amount must be positive'));
  }

  const newBid = {
    id: `bid_${Date.now()}`,
    auctionId,
    bidderId,
    amount,
    timestamp: new Date().toISOString(),
  };

  sampleBids.push(newBid);
  res.status(201).json(successResponse(newBid, 'Bid placed successfully'));
});

export default router;
