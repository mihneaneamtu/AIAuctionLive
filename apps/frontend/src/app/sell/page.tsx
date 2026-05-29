import Link from 'next/link';

export default function SellPage() {
  return (
    <main className="min-h-screen bg-black text-secondary-50">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Sell with confidence</p>
            <h1 className="text-5xl font-bold">List your vehicle, product, or service today</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">Create a listing, set your reserve price, and start receiving live bids from verified buyers across the platform.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-4">Why sell with us?</h2>
              <ul className="space-y-3 text-secondary-600 dark:text-secondary-300">
                <li>• Real-time auction matching</li>
                <li>• Secure payment and escrow support</li>
                <li>• Easy listing management</li>
                <li>• Safe, verified buyer pool</li>
              </ul>
            </div>
            <div className="card p-8 bg-slate-950/80">
              <h2 className="text-2xl font-semibold mb-4">Start a new listing</h2>
              <form className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Title</span>
                  <input className="input-field mt-2" placeholder="Auction title" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Category</span>
                  <select className="input-field mt-2">
                    <option>Vehicles</option>
                    <option>Electronics</option>
                    <option>Services</option>
                    <option>Collectibles</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-medium">Starting price</span>
                  <input className="input-field mt-2" placeholder="$0.00" />
                </label>
                <button type="button" className="btn-primary w-full">Create Listing</button>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-secondary-500 dark:text-secondary-400">Need help listing your item? Visit our support page or contact our sales team.</p>
            <Link href="/help" className="btn-outline">Support Center</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
