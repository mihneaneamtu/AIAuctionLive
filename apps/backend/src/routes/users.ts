import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

const sampleUsers = [
  { id: 'user_101', username: 'auctionfan', email: 'buyer@example.com', role: 'buyer' },
  { id: 'user_102', username: 'sellerpro', email: 'seller@example.com', role: 'seller' },
];

router.get('/', (req: Request, res: Response) => {
  res.json(successResponse(sampleUsers));
});

router.get('/me', (_req: Request, res: Response) => {
  const currentUser = sampleUsers[0];
  res.json(successResponse(currentUser));
});

router.get('/:id', (req: Request, res: Response) => {
  const user = sampleUsers.find((item) => item.id === req.params.id);
  if (!user) {
    return res.status(404).json(errorResponse('User not found'));
  }
  res.json(successResponse(user));
});

export default router;
