import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

const sampleMessages = [
  { id: 'msg_001', from: 'buyer@example.com', subject: 'Auction Inquiry', body: 'Is the item still available?' },
  { id: 'msg_002', from: 'support@example.com', subject: 'Payment Confirmed', body: 'Your payment has been processed.' },
];

router.get('/', (_req: Request, res: Response) => {
  res.json(successResponse(sampleMessages));
});

router.post('/send', (req: Request, res: Response) => {
  const { from, subject, body } = req.body;
  if (!from || !subject || !body) {
    return res.status(400).json(errorResponse('from, subject, and body are required'));
  }

  const newMessage = {
    id: `msg_${Date.now()}`,
    from,
    subject,
    body,
    sentAt: new Date().toISOString(),
  };

  sampleMessages.push(newMessage);
  res.status(201).json(successResponse(newMessage, 'Message sent successfully'));
});

export default router;
