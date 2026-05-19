-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_image VARCHAR(255),
  bio TEXT,
  phone_number VARCHAR(20),
  date_of_birth DATE,
  address VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  role VARCHAR(20) DEFAULT 'user', -- user, seller, admin
  account_status VARCHAR(20) DEFAULT 'active', -- active, suspended, banned
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  identity_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  two_factor_enabled BOOLEAN DEFAULT false,
  two_factor_secret VARCHAR(255),
  wallet_balance DECIMAL(15, 2) DEFAULT 0,
  escrow_balance DECIMAL(15, 2) DEFAULT 0,
  commission_owed DECIMAL(15, 2) DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  parent_category_id UUID REFERENCES categories(id),
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subcategories/Tags table
CREATE TABLE category_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  tag_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(category_id, tag_name)
);

-- Auctions table
CREATE TABLE auctions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  seller_id UUID NOT NULL REFERENCES users(id),
  auction_type VARCHAR(20) DEFAULT 'standard', -- standard, fixed_price, dutch
  status VARCHAR(20) DEFAULT 'draft', -- draft, scheduled, live, ended, completed, cancelled
  starting_price DECIMAL(15, 2) NOT NULL,
  current_price DECIMAL(15, 2) NOT NULL,
  reserve_price DECIMAL(15, 2),
  buyout_price DECIMAL(15, 2),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  duration_days INTEGER,
  bid_increment DECIMAL(15, 2) DEFAULT 1,
  total_bids INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  watchlist_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_promoted BOOLEAN DEFAULT false,
  min_bid_count INTEGER DEFAULT 1,
  auto_relist BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Bids table
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL REFERENCES users(id),
  bid_amount DECIMAL(15, 2) NOT NULL,
  proxy_bid_amount DECIMAL(15, 2),
  bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_winning_bid BOOLEAN DEFAULT false,
  bid_status VARCHAR(20) DEFAULT 'active', -- active, retracted, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auction winners/Completed sales
CREATE TABLE auction_winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
  winner_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES users(id),
  winning_bid DECIMAL(15, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  shipping_cost DECIMAL(15, 2),
  commission DECIMAL(15, 2),
  status VARCHAR(20) DEFAULT 'pending_payment', -- pending_payment, payment_confirmed, shipped, delivered, completed, disputed, cancelled
  payment_method VARCHAR(20),
  payment_id VARCHAR(255),
  shipping_address TEXT,
  tracking_number VARCHAR(255),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle listings (extends auctions)
CREATE TABLE vehicle_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL UNIQUE REFERENCES auctions(id) ON DELETE CASCADE,
  vin VARCHAR(20),
  make VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER,
  fuel_type VARCHAR(50), -- gasoline, diesel, electric, hybrid
  transmission VARCHAR(50), -- manual, automatic, cvt
  body_type VARCHAR(50), -- sedan, suv, truck, coupe, etc.
  condition VARCHAR(50), -- excellent, good, fair, poor
  color VARCHAR(50),
  engine_size VARCHAR(50),
  horsepower INTEGER,
  doors INTEGER,
  seats INTEGER,
  drive_type VARCHAR(20), -- fwd, rwd, awd, 4wd
  inspection_status VARCHAR(20) DEFAULT 'not_inspected', -- not_inspected, pending, passed, failed
  inspection_report_url VARCHAR(255),
  owner_history VARCHAR(50), -- single_owner, multiple_owners, fleet
  service_history TEXT,
  location_latitude DECIMAL(10, 8),
  location_longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product listings (extends auctions)
CREATE TABLE product_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL UNIQUE REFERENCES auctions(id) ON DELETE CASCADE,
  brand VARCHAR(100),
  model VARCHAR(100),
  condition VARCHAR(50), -- new, like_new, excellent, good, fair, poor
  quantity INTEGER DEFAULT 1,
  specifications JSONB,
  certifications JSONB,
  original_packaging BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service listings
CREATE TABLE service_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL UNIQUE REFERENCES auctions(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  provider_id UUID NOT NULL REFERENCES users(id),
  availability_start DATE,
  availability_end DATE,
  pricing_packages JSONB, -- array of {name, price, duration}
  service_area VARCHAR(255),
  service_radius_km INTEGER,
  certifications JSONB,
  years_of_experience INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auction images
CREATE TABLE auction_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
  image_url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255),
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Watchlist
CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  auction_id UUID NOT NULL REFERENCES auctions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, auction_id)
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- outbid, auction_ending, auction_ended, payment_received, shipment_update, message, etc.
  title VARCHAR(255),
  message TEXT,
  related_auction_id UUID REFERENCES auctions(id),
  related_user_id UUID REFERENCES users(id),
  is_read BOOLEAN DEFAULT false,
  action_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

-- Messages (Chat)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id),
  recipient_id UUID NOT NULL REFERENCES users(id),
  auction_id UUID REFERENCES auctions(id),
  message_text TEXT NOT NULL,
  attachment_url VARCHAR(255),
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Message threads
CREATE TABLE message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES users(id),
  user2_id UUID NOT NULL REFERENCES users(id),
  auction_id UUID REFERENCES auctions(id),
  last_message_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and Ratings
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_winner_id UUID NOT NULL REFERENCES auction_winners(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id),
  reviewee_id UUID NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_type VARCHAR(20) NOT NULL, -- buyer_to_seller, seller_to_buyer
  title VARCHAR(255),
  comment TEXT,
  would_recommend BOOLEAN,
  accuracy_of_description INTEGER,
  communication INTEGER,
  shipping_speed INTEGER,
  packaging_quality INTEGER,
  item_condition INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_winner_id UUID REFERENCES auction_winners(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_method VARCHAR(50) NOT NULL, -- card, paypal, wallet, bank_transfer
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed, refunded
  stripe_payment_id VARCHAR(255),
  paypal_transaction_id VARCHAR(255),
  transaction_fee DECIMAL(15, 2),
  net_amount DECIMAL(15, 2),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seller payouts
CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(15, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed
  payout_method VARCHAR(50), -- bank_transfer, stripe, paypal
  payout_account VARCHAR(255),
  stripe_payout_id VARCHAR(255),
  paypal_payout_id VARCHAR(255),
  requested_at TIMESTAMP,
  processed_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disputes
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_winner_id UUID NOT NULL REFERENCES auction_winners(id),
  initiator_id UUID NOT NULL REFERENCES users(id),
  dispute_type VARCHAR(50) NOT NULL, -- item_not_as_described, item_not_received, payment_not_received, quality_issue
  status VARCHAR(20) DEFAULT 'open', -- open, in_review, resolved, closed, appealed
  title VARCHAR(255),
  description TEXT,
  evidence_urls JSONB, -- array of image/document URLs
  resolution VARCHAR(255),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- Reports (Fraud, spam, etc.)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  reported_auction_id UUID REFERENCES auctions(id),
  report_type VARCHAR(50) NOT NULL, -- fraud, spam, offensive_content, counterfeit, stolen_item
  status VARCHAR(20) DEFAULT 'pending', -- pending, under_review, resolved, dismissed
  description TEXT,
  evidence_urls JSONB,
  admin_notes TEXT,
  action_taken VARCHAR(50), -- warning, suspension, ban, removal
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- Featured listings (Admin promoted)
CREATE TABLE featured_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id UUID NOT NULL UNIQUE REFERENCES auctions(id) ON DELETE CASCADE,
  featured_type VARCHAR(50) NOT NULL, -- homepage_banner, category_featured, auction_listing_featured
  position INTEGER,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  cost DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seller info
CREATE TABLE seller_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255),
  business_registration_number VARCHAR(255),
  store_name VARCHAR(255),
  store_description TEXT,
  store_image_url VARCHAR(255),
  response_time_minutes INTEGER,
  positive_rating_count INTEGER DEFAULT 0,
  neutral_rating_count INTEGER DEFAULT 0,
  negative_rating_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  is_verified_seller BOOLEAN DEFAULT false,
  is_top_rated BOOLEAN DEFAULT false,
  accepts_returns BOOLEAN DEFAULT false,
  return_policy TEXT,
  shipping_policy TEXT,
  payment_policy TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin activity log
CREATE TABLE admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50), -- user, auction, payment, dispute, report
  target_id VARCHAR(255),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Search history (for recommendations)
CREATE TABLE search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  search_query VARCHAR(255),
  filters JSONB,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved searches
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  search_name VARCHAR(255),
  search_query VARCHAR(255),
  filters JSONB,
  category_id UUID REFERENCES categories(id),
  notify_on_match BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_auctions_category_id ON auctions(category_id);
CREATE INDEX idx_auctions_seller_id ON auctions(seller_id);
CREATE INDEX idx_auctions_status ON auctions(status);
CREATE INDEX idx_auctions_end_time ON auctions(end_time);
CREATE INDEX idx_bids_auction_id ON bids(auction_id);
CREATE INDEX idx_bids_bidder_id ON bids(bidder_id);
CREATE INDEX idx_auction_winners_auction_id ON auction_winners(auction_id);
CREATE INDEX idx_auction_winners_winner_id ON auction_winners(winner_id);
CREATE INDEX idx_auction_winners_seller_id ON auction_winners(seller_id);
CREATE INDEX idx_auction_images_auction_id ON auction_images(auction_id);
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
CREATE INDEX idx_watchlist_auction_id ON watchlist(auction_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payouts_seller_id ON payouts(seller_id);
CREATE INDEX idx_disputes_auction_winner_id ON disputes(auction_winner_id);
CREATE INDEX idx_vehicle_listings_auction_id ON vehicle_listings(auction_id);
CREATE INDEX idx_product_listings_auction_id ON product_listings(auction_id);
CREATE INDEX idx_service_listings_auction_id ON service_listings(auction_id);
