export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-secondary-50">
      <section className="section-container py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Contact</p>
            <h1 className="text-5xl font-bold">Reach out to our team</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">Need help with a listing, payment, or account? Send us a message and we’ll respond as soon as possible.</p>
          </div>

          <div className="card p-8 bg-slate-950/80">
            <form className="space-y-6">
              <label className="block">
                <span className="text-sm font-medium">Your name</span>
                <input className="input-field mt-2" placeholder="Jane Doe" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Email</span>
                <input className="input-field mt-2" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Message</span>
                <textarea className="input-field mt-2 min-h-[140px]" placeholder="How can we help?" />
              </label>
              <button type="button" className="btn-primary">Send Message</button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Support', value: 'support@aiauctionlive.com' },
              { label: 'Sales', value: 'sales@aiauctionlive.com' },
              { label: 'Phone', value: '+1 (800) 123-4567' },
            ].map((item) => (
              <div key={item.label} className="card p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary-600">{item.label}</p>
                <p className="mt-4 text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
