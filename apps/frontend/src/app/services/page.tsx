import Link from 'next/link';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-secondary-900 dark:bg-secondary-950 dark:text-white">
      <section className="section-container py-24">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Marketplace services</p>
            <h1 className="text-5xl font-bold">Hire trusted services and professional support</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">Book automotive inspections, shipping, installation, event planning, and more from verified service providers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Vehicle Inspection', description: 'Certified experts inspect the vehicle before bidding.', icon: '🔍' },
              { title: 'Logistics & Shipping', description: 'Door-to-door shipping for auction wins worldwide.', icon: '📦' },
              { title: 'Seller Concierge', description: 'List management, photography, and pricing support.', icon: '🧑‍💼' },
            ].map((item) => (
              <div key={item.title} className="card p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-secondary-600 dark:text-secondary-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="card p-8 bg-secondary-50 dark:bg-secondary-900">
            <h2 className="text-3xl font-semibold mb-4">Browse service providers</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">Our platform connects buyers and sellers with top-rated professionals for every auction clearance.</p>
            <Link href="/auctions" className="btn-primary">Explore Auctions</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
