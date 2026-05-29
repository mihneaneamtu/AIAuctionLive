'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiList,
  FiShoppingCart,
  FiHeart,
  FiMessageSquare,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiUser,
} from 'react-icons/fi';

const sidebarItems = [
  { icon: FiHome, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
  { icon: FiShoppingCart, label: 'My Bids', href: '/dashboard/bids', id: 'bids' },
  { icon: FiList, label: 'My Auctions', href: '/dashboard/auctions', id: 'auctions' },
  { icon: FiHeart, label: 'Watchlist', href: '/dashboard/watchlist', id: 'watchlist' },
  { icon: FiMessageSquare, label: 'Messages', href: '/dashboard/messages', id: 'messages' },
  { icon: FiDollarSign, label: 'Payments', href: '/dashboard/payments', id: 'payments' },
  { icon: FiUser, label: 'Profile', href: '/dashboard/profile', id: 'profile' },
  { icon: FiSettings, label: 'Settings', href: '/dashboard/settings', id: 'settings' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950 border-b border-white/10">
        <div className="flex items-center justify-between h-20 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-900 rounded-lg"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link href="/" className="text-2xl font-bold text-gradient hidden sm:block">
              AI Auction Live
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-slate-900 rounded-lg relative">
              <FiBell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-secondary-200 dark:border-secondary-800">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                👤
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-secondary-600">Verified Seller</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-slate-950 border-r border-white/10 h-screen sticky top-20 overflow-y-auto">
            <nav className="p-6 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-primary-900 text-primary-200 font-semibold'
                        : 'text-secondary-300 hover:bg-slate-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <hr className="my-4 border-secondary-200 dark:border-secondary-800" />
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary-300 hover:bg-slate-900 transition-all">
                <FiLogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-12">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'bids' && <MyBidsPage />}
          {activeTab === 'auctions' && <MyAuctionsPage />}
          {activeTab === 'watchlist' && <WatchlistPage />}
          {activeTab === 'messages' && <MessagesPage />}
          {activeTab === 'payments' && <PaymentsPage />}
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome Back, John!</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Here's what's happening with your auctions today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Active Bids', value: '12', color: 'primary' },
          { label: 'Watchlist Items', value: '28', color: 'accent' },
          { label: 'Total Spent', value: '$45,230', color: 'green' },
          { label: 'Account Balance', value: '$5,430', color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Active Bids */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Bids</h2>
            <Link href="/dashboard/bids" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 dark:bg-secondary-800 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-primary-900 flex items-center justify-center text-2xl">
                  🚗
                </div>
                <div className="flex-1">
                  <p className="font-semibold">2019 Tesla Model 3</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Current bid: $25,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-accent-600">2h 30m</p>
                  <p className="text-xs text-secondary-500">Ending soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchases */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Purchases</h2>
            <Link href="/dashboard/payments" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-950 dark:bg-secondary-800 rounded-lg">
                <div className="w-12 h-12 rounded-lg bg-emerald-900 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Item #123456</p>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">Delivered on Dec 10</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$1,299</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyBidsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Bids</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Track and manage all your active bids</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-800">
                <th className="text-left py-3 px-4 font-semibold">Item</th>
                <th className="text-left py-3 px-4 font-semibold">Your Bid</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Time Left</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-secondary-200 dark:border-secondary-800 hover:bg-slate-900 dark:hover:bg-secondary-800">
                  <td className="py-3 px-4">
                    <div">
                      <p className="font-semibold">Item {i + 1}</p>
                      <p className="text-sm text-secondary-500">Category</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold">${(1000 + i * 500).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${i === 0 ? 'badge-error' : 'badge-success'}`}>
                      {i === 0 ? 'Winning' : 'Outbid'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{i * 2}h {(i * 15) % 60}m</td>
                  <td className="py-3 px-4">
                    <Link href={`/auction/${i}`} className="text-primary-600 hover:text-primary-700 font-semibold">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MyAuctionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Auctions</h1>
          <p className="text-secondary-600 dark:text-secondary-400">Create and manage your listings</p>
        </div>
        <Link href="/sell" className="btn-primary">
          Create Auction
        </Link>
      </div>

      <div className="grid-responsive">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-hover">
            <div className="glass h-48 mb-4 flex items-center justify-center">
              <div className="text-6xl">📦</div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Listing {i + 1}</h3>
            <p className="text-sm text-secondary-500 mb-4">Status: {i % 2 === 0 ? 'Live' : 'Ended'}</p>
            <div className="flex gap-2">
              <button className="btn-secondary flex-1 text-sm py-2">Edit</button>
              <button className="btn-outline flex-1 text-sm py-2">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WatchlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Watchlist</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Items you're following</p>
      </div>

      <div className="grid-responsive">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card-hover">
            <div className="glass h-48 mb-4 flex items-center justify-center relative">
              <div className="text-6xl">⭐</div>
              <button className="absolute top-3 right-3 p-2 bg-slate-900 dark:bg-secondary-900 rounded-lg hover:bg-red-900/30">
                <FiHeart size={18} fill="red" stroke="red" />
              </button>
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">Watchlist Item {i + 1}</h3>
            <p className="text-sm text-secondary-500 mb-4">${(1000 + i * 500).toLocaleString()}</p>
            <button className="btn-primary w-full">View Item</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card max-h-96 overflow-y-auto">
          <h2 className="font-semibold mb-4">Conversations</h2>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg hover:bg-slate-900 cursor-pointer">
                <p className="font-semibold text-sm">User {i + 1}</p>
                <p className="text-xs text-secondary-500 truncate">Last message preview...</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 card">
          <p className="text-secondary-600">Select a conversation to view messages</p>
        </div>
      </div>
    </div>
  );
}

function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Payments & Transactions</h1>
        <p className="text-secondary-600 dark:text-secondary-400">View your payment history</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-800">
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Description</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b border-secondary-200 dark:border-secondary-800 hover:bg-slate-900 dark:hover:bg-secondary-800">
                  <td className="py-3 px-4">Dec {15 - i}, 2024</td>
                  <td className="py-3 px-4">Auction Payment - Item {i}</td>
                  <td className="py-3 px-4 font-semibold">${(i * 500 + 500).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="badge-success">Completed</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card text-center">
            <div className="w-32 h-32 rounded-full bg-primary-600 flex items-center justify-center text-white text-6xl mx-auto mb-4">
              👤
            </div>
            <h2 className="text-xl font-bold mb-1">John Doe</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">Verified Seller</p>
            <button className="btn-outline w-full">Change Avatar</button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <form className="space-y-4">
              <input type="text" defaultValue="John" placeholder="First Name" className="input-field" />
              <input type="text" defaultValue="Doe" placeholder="Last Name" className="input-field" />
              <input type="email" defaultValue="john@example.com" placeholder="Email" className="input-field" />
              <input type="tel" defaultValue="+1 (555) 000-0000" placeholder="Phone" className="input-field" />
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              'Auction ending reminders',
              'Outbid notifications',
              'Message notifications',
              'Promotional emails',
            ].map((option, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked={i < 3} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Security</h2>
          <button className="btn-outline">Change Password</button>
        </div>

        <div className="card border-red-700 bg-red-900/10 dark:border-red-900 dark:bg-red-950">
          <h2 className="text-xl font-bold mb-4">Danger Zone</h2>
          <button className="btn-outline text-red-600 border-red-600 hover:bg-red-900/30">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
