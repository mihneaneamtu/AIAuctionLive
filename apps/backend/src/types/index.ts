export interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  phone_number?: string;
  role: 'user' | 'seller' | 'admin';
  account_status: 'active' | 'suspended' | 'banned';
  email_verified: boolean;
  identity_verified: boolean;
  wallet_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  category_id: string;
  seller_id: string;
  auction_type: 'standard' | 'fixed_price' | 'dutch';
  status: 'draft' | 'scheduled' | 'live' | 'ended' | 'completed' | 'cancelled';
  starting_price: number;
  current_price: number;
  reserve_price?: number;
  buyout_price?: number;
  start_time: Date;
  end_time: Date;
  bid_increment: number;
  total_bids: number;
  view_count: number;
  watchlist_count: number;
  is_featured: boolean;
  is_promoted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Bid {
  id: string;
  auction_id: string;
  bidder_id: string;
  bid_amount: number;
  proxy_bid_amount?: number;
  bid_time: Date;
  is_winning_bid: boolean;
  bid_status: 'active' | 'retracted' | 'cancelled';
}

export interface AuctionWinner {
  id: string;
  auction_id: string;
  winner_id: string;
  seller_id: string;
  winning_bid: number;
  total_price: number;
  status: 'pending_payment' | 'payment_confirmed' | 'shipped' | 'delivered' | 'completed' | 'disputed';
  payment_method?: string;
  shipping_address?: string;
  tracking_number?: string;
  created_at: Date;
  updated_at: Date;
}

export interface VehicleListing {
  id: string;
  auction_id: string;
  vin?: string;
  make: string;
  model: string;
  year: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  condition: string;
  color?: string;
}

export interface ServiceListing {
  id: string;
  auction_id: string;
  service_type: string;
  provider_id: string;
  pricing_packages: any[];
  certifications?: any;
}

export interface Review {
  id: string;
  auction_winner_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  review_type: 'buyer_to_seller' | 'seller_to_buyer';
  title?: string;
  comment?: string;
  created_at: Date;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  payment_method: 'card' | 'paypal' | 'wallet' | 'bank_transfer';
  payment_status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  stripe_payment_id?: string;
  created_at: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_featured: boolean;
  display_order?: number;
  created_at: Date;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  auction_id?: string;
  message_text: string;
  is_read: boolean;
  created_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title?: string;
  message?: string;
  is_read: boolean;
  created_at: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}
