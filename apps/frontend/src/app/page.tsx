'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiTrendingUp, FiClock, FiCheckCircle, FiAward } from 'react-icons/fi';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-secondary-950/80 border-b border-secondary-200 dark:border-secondary-800">
        <div className="section-container flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-gradient">
            AI Auction Live
          </Link>
          <nav className="hidden md:flex gap-8">
            <Link href="/auctions" className="hover:text-primary-600 transition-colors">
              Browse Auctions
            </Link>
            <Link href="/sell" className="hover:text-primary-600 transition-colors">
              Sell
            </Link>
            <Link href="/services" className="hover:text-primary-600 transition-colors">
              Services
            </Link>
            <Link href="/about" className="hover:text-primary-600 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login" className="btn-outline text-sm">
              Login
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              The Modern Auction <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
              Buy and sell vehicles, products, and services in real-time with our premium auction platform. Secure bidding, instant payments, and verified sellers.
            </p>
            <div className="flex gap-4">
              <Link href="/auctions" className="btn-primary">
                Browse Auctions
              </Link>
              <Link href="/sell" className="btn-outline">
                Start Selling
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="glass h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-secondary-500">Premium Vehicle Auctions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-16 glass p-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <FiSearch className="absolute left-4 top-4 text-secondary-400" size={20} />
              <input
                type="text"
                placeholder="Search vehicles, products, services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <button className="btn-primary">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-12 text-center">Browse Categories</h2>
          <div className="grid-responsive">
            {[
              { name: 'Vehicles', icon: '🚗', count: '12,543' },
              { name: 'Electronics', icon: '💻', count: '8,234' },
              { name: 'Motorcycles', icon: '🏍️', count: '3,421' },
              { name: 'Luxury Items', icon: '👜', count: '1,892' },
              { name: 'Services', icon: '🔧', count: '4,567' },
              { name: 'Real Estate', icon: '🏠', count: '892' },
              { name: 'Collectibles', icon: '🎨', count: '2,134' },
              { name: 'Spare Parts', icon: '⚙️', count: '5,678' },
            ].map((category) => (
              <Link key={category.name} href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}>
                <div className="card-hover">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-secondary-500">{category.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Live Auctions</h2>
            <Link href="/auctions?filter=live" className="text-primary-600 hover:text-primary-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid-responsive">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <AuctionCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose AI Auction Live?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTrendingUp size={32} />,
                title: 'Real-Time Bidding',
                description: 'Live auction updates with instant bid placement and notifications',
              },
              {
                icon: <FiCheckCircle size={32} />,
                title: 'Verified Sellers',
                description: 'Trusted marketplace with verified and rated sellers',
              },
              {
                icon: <FiAward size={32} />,
                title: 'Secure Payments',
                description: 'Multiple payment options and escrow protection',
              },
              {
                icon: <FiClock size={32} />,
                title: '24/7 Support',
                description: 'Round-the-clock customer support for your peace of mind',
              },
              {
                icon: <FiMapPin size={32} />,
                title: 'Global Reach',
                description: 'Buy and sell worldwide with worldwide shipping options',
              },
              {
                icon: <FiSearch size={32} />,
                title: 'Advanced Search',
                description: 'Powerful filters to find exactly what you need',
              },
            ].map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="text-primary-600 flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-accent-500">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-lg opacity-90">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <p className="text-lg opacity-90">Listings</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <p className="text-lg opacity-90">Total Volume</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <p className="text-lg opacity-90">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="section-container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
            Join thousands of buyers and sellers on the most trusted auction platform
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Create an Account
            </Link>
            <Link href="/auctions" className="btn-outline">
              Browse Auctions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 dark:bg-secondary-950 text-white py-16">
        <div className="section-container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-secondary-300">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 pt-8 text-center text-secondary-400">
            <p>&copy; 2024 AI Auction Live. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AuctionCard() {
  return (
    <Link href="/auctions/1">
      <div className="card-hover">
        <div className="glass h-48 mb-4 flex items-center justify-center">
          <div className="text-6xl">🚗</div>
        </div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">2019 Tesla Model 3</h3>
            <p className="text-sm text-secondary-500">Premium Sedan</p>
          </div>
          <span className="badge-error text-xs">LIVE</span>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600 dark:text-secondary-400">Current Bid</span>
            <span className="font-semibold">$25,000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600 dark:text-secondary-400">Total Bids</span>
            <span className="font-semibold">45 bids</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600 dark:text-secondary-400">Time Left</span>
            <span className="font-semibold text-accent-600">2h 30m</span>
          </div>
        </div>
        <button className="w-full btn-primary">Place Bid</button>
      </div>
    </Link>
  );
}
