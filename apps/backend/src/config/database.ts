import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'auction_user',
  password: process.env.DB_PASSWORD || 'auction_password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'auction_db',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
