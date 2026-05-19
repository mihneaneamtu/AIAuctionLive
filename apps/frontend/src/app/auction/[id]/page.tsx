'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiHeart, FiShare2, FiClock, FiUser, FiMapPin } from 'react-icons/fi';

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'bids' | 'seller'>('overview');

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-secondary-950/80 border-b border-secondary-200 dark:border-secondary-800">
        <div className="section-container flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-gradient">
            AI Auction Live
          </Link>
        </div>
      </header>

      <div className="section-padding">
        <div className="section-container">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-secondary-600 dark:text-secondary-400">
            <Link href="/auctions" className="flex items-center gap-1 hover:text-primary-600">
              <FiArrowLeft size={18} />
              Back to Auctions
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="glass h-96 mb-8 flex items-center justify-center">
                <div className="text-9xl">🚗</div>
              </div>

              {/* Title & Basic Info */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">2019 Tesla Model 3</h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400">Premium Electric Sedan</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFavorited(!isFavorited)}
                      className={`p-3 rounded-lg transition-all ${
                        isFavorited
                          ? 'bg-red-100 dark:bg-red-900 text-red-600'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-600'
                      }`}
                    >
                      <FiHeart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-800 text-secondary-600 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all">
                      <FiShare2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="badge-error mb-6">
                  🔴 Live - Ending in 2 hours 30 minutes
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="card">
                    <p className="text-sm text-secondary-500 mb-1">Current Bid</p>
                    <p className="text-2xl font-bold">$25,000</p>
                  </div>
                  <div className="card">
                    <p className="text-sm text-secondary-500 mb-1">Total Bids</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                  <div className="card">
                    <p className="text-sm text-secondary-500 mb-1">Watchers</p>
                    <p className="text-2xl font-bold">128</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="flex gap-0 border-b border-secondary-200 dark:border-secondary-800 mb-8">
                  {(['overview', 'bids', 'seller'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-semibold border-b-2 transition-all ${
                        activeTab === tab
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-secondary-600 hover:text-secondary-900 dark:hover:text-secondary-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Description</h2>
                      <div className="prose dark:prose-invert max-w-none">
                        <p>
                          This is a stunning 2019 Tesla Model 3 with excellent condition. The vehicle has been meticulously maintained
                          with full service history. Features include:
                        </p>
                        <ul>
                          <li>Premium exterior color</li>
                          <li>Clean interior</li>
                          <li>Full autopilot</li>
                          <li>Premium audio system</li>
                          <li>All original documentation</li>
                        </ul>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Vehicle Details</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { label: 'Year', value: '2019' },
                          { label: 'Make', value: 'Tesla' },
                          { label: 'Model', value: 'Model 3' },
                          { label: 'Mileage', value: '45,230 miles' },
                          { label: 'Transmission', value: 'Automatic' },
                          { label: 'Fuel Type', value: 'Electric' },
                          { label: 'Body Type', value: 'Sedan' },
                          { label: 'Condition', value: 'Excellent' },
                        ].map((detail) => (
                          <div key={detail.label} className="card">
                            <p className="text-secondary-600 dark:text-secondary-400 text-sm">{detail.label}</p>
                            <p className="font-semibold">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Location</h2>
                      <div className="card">
                        <div className="flex items-center gap-3">
                          <FiMapPin size={24} className="text-primary-600" />
                          <div>
                            <p className="font-semibold">Los Angeles, California</p>
                            <p className="text-secondary-600 dark:text-secondary-400">United States</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'bids' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Bid History</h2>
                    <div className="space-y-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="card flex items-center justify-between">
                          <div>
                            <p className="font-semibold">User_{Math.random().toString(36).substring(7)}</p>
                            <p className="text-sm text-secondary-500">2 minutes ago</p>
                          </div>
                          <p className="text-xl font-bold">${(25000 - i * 500).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
                    <div className="card">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl">
                          👤
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">Premium Dealer</h3>
                          <p className="text-secondary-600 dark:text-secondary-400">Verified Seller</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>⭐</span>
                              ))}
                            </div>
                            <span className="text-sm text-secondary-600">4.9/5 (234 reviews)</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-800">
                        <div>
                          <p className="text-secondary-600 dark:text-secondary-400 text-sm">Total Sales</p>
                          <p className="text-2xl font-bold">1,234</p>
                        </div>
                        <div>
                          <p className="text-secondary-600 dark:text-secondary-400 text-sm">Positive Rating</p>
                          <p className="text-2xl font-bold">99%</p>
                        </div>
                      </div>

                      <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                        Trusted seller with years of experience in vehicle sales. All items inspected and certified.
                      </p>

                      <button className="btn-outline w-full">Contact Seller</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Bid Box */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <div className="mb-6">
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">Current Price</p>
                  <p className="text-4xl font-bold text-primary-600 mb-2">$25,000</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">45 bids placed</p>
                </div>

                <div className="mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-800">
                  <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 mb-3">
                    <FiClock size={18} />
                    <span className="text-sm font-semibold">Time Left</span>
                  </div>
                  <p className="text-3xl font-bold text-accent-600">2:30:45</p>
                  <p className="text-sm text-secondary-500 mt-2">Ending on Dec 15, 2024 at 5:00 PM</p>
                </div>

                <div className="mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-800">
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">Next Minimum Bid</p>
                  <p className="text-2xl font-bold">$25,100</p>
                </div>

                <div className="space-y-3 mb-6">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid"
                    className="input-field"
                  />
                  <button className="btn-primary w-full py-4 text-lg">
                    Place Bid
                  </button>
                </div>

                <p className="text-xs text-secondary-600 dark:text-secondary-400 text-center mb-4">
                  By placing a bid, you agree to the terms and conditions. You must be 18+ years old.
                </p>

                <div className="space-y-2">
                  <button className="btn-outline w-full">
                    Buy It Now - $29,999
                  </button>
                  <button className="btn-outline w-full">
                    Make an Offer
                  </button>
                </div>

                {/* Seller Info Card */}
                <div className="card mt-6 bg-secondary-50 dark:bg-secondary-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FiUser size={18} className="text-primary-600" />
                    <span className="font-semibold">Seller Details</span>
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                    Seller is located in Los Angeles, CA
                  </p>
                  <button className="btn-outline w-full text-sm py-2">
                    Message Seller
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Auctions */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Similar Auctions</h2>
            <div className="grid_responsive">
              {Array.from({ length: 6 }).map((_, i) => (
                <Link key={i} href={`/auction/${i}`}>
                  <div className="card-hover">
                    <div className="glass h-48 mb-4 flex items-center justify-center">
                      <div className="text-6xl">🚗</div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Tesla Model {3 + i}</h3>
                    <p className="text-sm text-secondary-500 mb-4">2019 - Premium Sedan</p>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="font-semibold">${(25000 + i * 1000).toLocaleString()}</span>
                      <span className="text-secondary-500">{45 + i} bids</span>
                    </div>
                    <button className="btn-primary w-full" onClick={(e) => e.preventDefault()}>
                      Place Bid
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
