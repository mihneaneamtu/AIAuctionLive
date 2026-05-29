'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiGrid, FiList, FiFilter, FiSearch } from 'react-icons/fi';

export default function AuctionsPage() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('ending-soon');

  const categories = [
    'All',
    'Vehicles',
    'Electronics',
    'Motorcycles',
    'Luxury Items',
    'Services',
    'Real Estate',
    'Collectibles',
  ];

  const auctions = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    currentPrice: Math.floor(Math.random() * 50000) + 1000,
    totalBids: Math.floor(Math.random() * 100),
    timeLeft: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
    isLive: Math.random() > 0.3,
  }));

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-white/10">
        <div className="section-container flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-gradient">
            AI Auction Live
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/auctions" className="text-primary-600 font-semibold">
              Browse
            </Link>
            <Link href="/sell" className="hover:text-primary-600 transition-colors">
              Sell
            </Link>
            <Link href="/services" className="hover:text-primary-600 transition-colors">
              Services
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/logout">Logout</Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="section-padding border-b border-secondary-200 dark:border-secondary-800">
        <div className="section-container">
          <h1 className="text-4xl font-bold mb-4">Browse Auctions</h1>
          <p className="text-lg text-secondary-600 dark:text-secondary-400">
            Explore our collection of {auctions.length} active auctions
          </p>
        </div>
      </section>

      <div className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <FiFilter size={20} />
                  <h2 className="text-xl font-bold">Filters</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-800">
                  <h3 className="font-semibold mb-4">Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={cat.toLowerCase()}
                          checked={selectedCategory === cat.toLowerCase()}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-secondary-200 dark:border-secondary-800">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under $1,000', value: '0-1000' },
                      { label: '$1,000 - $5,000', value: '1000-5000' },
                      { label: '$5,000 - $25,000', value: '5000-25000' },
                      { label: '$25,000+', value: '25000-999999' },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="font-semibold mb-4">Status</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Live Now', value: 'live' },
                      { label: 'Ending Soon', value: 'ending' },
                      { label: 'Scheduled', value: 'scheduled' },
                    ].map((status) => (
                      <label key={status.value} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" defaultChecked={status.value === 'live'} />
                        <span>{status.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative w-full">
                  <FiSearch className="absolute left-4 top-4 text-secondary-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search auctions..."
                    className="input-field pl-12 w-full"
                  />
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
                  <option value="ending-soon">Ending Soon</option>
                  <option value="newly-listed">Newly Listed</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="most-bids">Most Bids</option>
                </select>
                <div className="flex gap-2 border border-secondary-300 dark:border-secondary-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded ${viewType === 'grid' ? 'bg-primary-900 text-primary-200' : ''}`}
                  >
                    <FiGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded ${viewType === 'list' ? 'bg-primary-900 text-primary-200' : ''}`}
                  >
                    <FiList size={20} />
                  </button>
                </div>
              </div>

              {/* Auctions Grid */}
              <div className={viewType === 'grid' ? 'grid-responsive' : 'space-y-4'}>
                {auctions.map((auction) => (
                  <AuctionItemCard key={auction.id} auction={auction} viewType={viewType} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AuctionItemCardProps {
  auction: {
    id: number;
    title: string;
    currentPrice: number;
    totalBids: number;
    timeLeft: string;
    category: string;
    isLive: boolean;
  };
  viewType: 'grid' | 'list';
}

function AuctionItemCard({ auction, viewType }: AuctionItemCardProps) {
  return (
    <Link href={`/auction/${auction.id}`}>
      {viewType === 'grid' ? (
        <div className="card-hover">
          <div className="glass h-48 mb-4 flex items-center justify-center">
            <div className="text-6xl">🎯</div>
          </div>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">{auction.title}</h3>
              <p className="text-sm text-secondary-500">{auction.category}</p>
            </div>
            {auction.isLive && <span className="badge-error text-xs">LIVE</span>}
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Current Bid</span>
              <span className="font-semibold">${auction.currentPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Bids</span>
              <span className="font-semibold">{auction.totalBids}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Time Left</span>
              <span className="font-semibold text-accent-600">{auction.timeLeft}</span>
            </div>
          </div>
          <button className="w-full btn-primary" onClick={(e) => e.preventDefault()}>
            Place Bid
          </button>
        </div>
      ) : (
        <div className="card-hover p-4">
          <div className="flex gap-4">
            <div className="glass w-24 h-24 flex items-center justify-center flex-shrink-0">
              <div className="text-4xl">🎯</div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{auction.title}</h3>
                  <p className="text-sm text-secondary-500">{auction.category}</p>
                </div>
                {auction.isLive && <span className="badge-error text-xs">LIVE</span>}
              </div>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Current Bid</span>
                  <p className="font-semibold">${auction.currentPrice.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Bids</span>
                  <p className="font-semibold">{auction.totalBids}</p>
                </div>
                <div>
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Time Left</span>
                  <p className="font-semibold text-accent-600">{auction.timeLeft}</p>
                </div>
              </div>
            </div>
            <button className="btn-primary self-center" onClick={(e) => e.preventDefault()}>
              Bid Now
            </button>
          </div>
        </div>
      )}
    </Link>
  );
}
