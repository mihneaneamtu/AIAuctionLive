import { Router, Request, Response } from 'express';
import pool from '../config/database.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';

const router = Router();

// Get all auctions with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 20,
      status = 'live',
      category_id,
      sort_by = 'end_time',
      search,
    } = req.query;

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    let query = 'SELECT * FROM auctions WHERE status = $1';
    const params: any[] = [status];
    let paramCount = 2;

    if (category_id) {
      query += ` AND category_id = $${paramCount}`;
      params.push(category_id);
      paramCount++;
    }

    if (search) {
      query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Sort
    if (sort_by === 'ending-soon') {
      query += ' ORDER BY end_time ASC';
    } else if (sort_by === 'price-high') {
      query += ' ORDER BY current_price DESC';
    } else if (sort_by === 'price-low') {
      query += ' ORDER BY current_price ASC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    // Get total
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM auctions WHERE status = $1' +
        (category_id ? ` AND category_id = $2` : '') +
        (search ? ` AND (title ILIKE $${category_id ? 3 : 2} OR description ILIKE $${category_id ? 3 : 2})` : ''),
      params
    );
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    query += ` LIMIT ${limit} OFFSET ${offset}`;
    const result = await pool.query(query, params);

    res.json(
      paginatedResponse(
        result.rows,
        parseInt(page as string),
        parseInt(limit as string),
        total
      )
    );
  } catch (error) {
    console.error('Get auctions error:', error);
    res.status(500).json(errorResponse('Server error'));
  }
});

// Get auction by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT a.*, 
              c.name as category_name,
              u.username as seller_username,
              u.profile_image as seller_image,
              COUNT(b.id) as total_bids
       FROM auctions a
       LEFT JOIN categories c ON a.category_id = c.id
       LEFT JOIN users u ON a.seller_id = u.id
       LEFT JOIN bids b ON a.id = b.auction_id
       WHERE a.id = $1
       GROUP BY a.id, c.name, u.username, u.profile_image`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse('Auction not found'));
    }

    // Get images
    const imagesResult = await pool.query(
      'SELECT image_url, thumbnail_url, alt_text FROM auction_images WHERE auction_id = $1 ORDER BY display_order',
      [id]
    );

    const auction = result.rows[0];
    auction.images = imagesResult.rows;

    // Increment view count
    await pool.query('UPDATE auctions SET view_count = view_count + 1 WHERE id = $1', [id]);

    res.json(successResponse(auction));
  } catch (error) {
    console.error('Get auction error:', error);
    res.status(500).json(errorResponse('Server error'));
  }
});

// Create auction (requires authentication)
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category_id,
      starting_price,
      reserve_price,
      buyout_price,
      start_time,
      end_time,
      auction_type = 'standard',
      bid_increment = 1,
    } = req.body;

    // In a real app, you'd get seller_id from authenticated user
    const seller_id = req.headers['x-user-id'] || 'test-seller-id';

    // Validation
    if (!title || !description || !category_id || !starting_price) {
      return res.status(400).json(errorResponse('Missing required fields'));
    }

    const result = await pool.query(
      `INSERT INTO auctions 
       (title, description, category_id, seller_id, auction_type, status, starting_price, 
        current_price, reserve_price, buyout_price, start_time, end_time, bid_increment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        title,
        description,
        category_id,
        seller_id,
        auction_type,
        'draft',
        starting_price,
        starting_price,
        reserve_price,
        buyout_price,
        start_time,
        end_time,
        bid_increment,
      ]
    );

    res.status(201).json(successResponse(result.rows[0], 'Auction created successfully'));
  } catch (error) {
    console.error('Create auction error:', error);
    res.status(500).json(errorResponse('Server error'));
  }
});

// Update auction
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const result = await pool.query(
      'UPDATE auctions SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse('Auction not found'));
    }

    res.json(successResponse(result.rows[0], 'Auction updated successfully'));
  } catch (error) {
    console.error('Update auction error:', error);
    res.status(500).json(errorResponse('Server error'));
  }
});

// Delete auction
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM auctions WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json(errorResponse('Auction not found'));
    }

    res.json(successResponse(null, 'Auction deleted successfully'));
  } catch (error) {
    console.error('Delete auction error:', error);
    res.status(500).json(errorResponse('Server error'));
  }
});

export default router;
