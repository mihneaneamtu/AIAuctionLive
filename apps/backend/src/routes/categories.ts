import { Router, Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response.js';

const router = Router();

const sampleCategories = [
  { id: 'vehicles', name: 'Vehicles', description: 'Cars, trucks, motorcycles, and more.' },
  { id: 'electronics', name: 'Electronics', description: 'Gadgets, phones, laptops, cameras and more.' },
  { id: 'services', name: 'Services', description: 'Home, automotive, logistics, and professional services.' },
  { id: 'collectibles', name: 'Collectibles', description: 'Art, memorabilia, rare and vintage items.' },
  { id: 'real-estate', name: 'Real Estate', description: 'Residential, commercial, and investment property.' },
];

router.get('/', (req: Request, res: Response) => {
  res.json(successResponse(sampleCategories));
});

router.get('/:slug', (req: Request, res: Response) => {
  const category = sampleCategories.find((item) => item.id === req.params.slug);
  if (!category) {
    return res.status(404).json(errorResponse('Category not found'));
  }
  res.json(successResponse(category));
});

export default router;
