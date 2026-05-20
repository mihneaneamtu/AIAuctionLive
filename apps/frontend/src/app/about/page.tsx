import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-secondary-900 dark:bg-secondary-950 dark:text-white">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">About AI Auction Live</p>
            <h1 className="text-5xl font-bold">We modernize auctions for vehicles, goods, and services</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">Our mission is to provide a transparent, secure, and fast marketplace for buyers and sellers worldwide. We combine real-time bidding, trusted verification, and full-service payments.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Trusted network', description: 'Verified sellers, reliable buyer protections, and fair auction rules.' },
              { title: 'Live bidding', description: 'Instant updates, reserve monitoring, and countdown timers built into every listing.' },
              { title: 'Support-driven', description: 'Dedicated customer service and dispute resolution to keep auctions fair.' },
            ].map((item) => (
              <div key={item.title} className="card p-8">
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-secondary-600 dark:text-secondary-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-secondary-600 dark:text-secondary-400">Want to learn more about our platform and partnerships?</p>
              <Link href="/contact" className="btn-outline inline-block">Contact our team</Link>
            </div>
            <div className="text-secondary-500 dark:text-secondary-400">Supporting auctions for vehicles, electronics, services, collectibles, and real estate since 2024.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
