import pool from '../src/config/database.js';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Insert Categories
    const categories = [
      { name: 'Vehicles', slug: 'vehicles', description: 'Cars, trucks, motorcycles, and more', is_featured: true },
      { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets and tech', is_featured: true },
      { name: 'Motorcycles', slug: 'motorcycles', description: 'Motorcycles and bikes', is_featured: false },
      { name: 'Trucks', slug: 'trucks', description: 'Pickup trucks and commercial vehicles', is_featured: false },
      { name: 'Luxury Items', slug: 'luxury-items', description: 'Designer goods and luxury products', is_featured: true },
      { name: 'Services', slug: 'services', description: 'Professional services', is_featured: false },
      { name: 'Real Estate', slug: 'real-estate', description: 'Properties and land', is_featured: false },
      { name: 'Collectibles', slug: 'collectibles', description: 'Art, collectibles, and rare items', is_featured: false },
    ];

    console.log('📚 Seeding categories...');
    for (const cat of categories) {
      await pool.query(
        'INSERT INTO categories (name, slug, description, is_featured) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING',
        [cat.name, cat.slug, cat.description, cat.is_featured]
      );
    }

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

seedDatabase();
