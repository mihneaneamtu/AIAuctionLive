import Link from 'next/link';

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-black text-secondary-50">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Support center</p>
            <h1 className="text-5xl font-bold">Help & support for buyers and sellers</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">Access guides, community resources, and support channels designed to keep your auction experience fast and secure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Buying guidance', description: 'Learn how to place bids and manage your auctions safely.' },
              { title: 'Selling tips', description: 'Discover best practices for pricing, listing, and fulfillment.' },
              { title: 'Troubleshooting', description: 'Find answers to common payment, delivery, and account questions.' },
            ].map((item) => (
              <div key={item.title} className="card p-8">
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="text-secondary-600 dark:text-secondary-400">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="card p-8 bg-slate-950/80">
            <h2 className="text-3xl font-semibold mb-4">Need one-on-one support?</h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">Our support team is ready to help with account setup, payments, and dispute resolution.</p>
            <Link href="/contact" className="btn-primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
