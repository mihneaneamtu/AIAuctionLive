export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-secondary-50">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Legal</p>
            <h1 className="text-5xl font-bold">Terms of Service</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">These terms govern your use of AI Auction Live. By accessing our services, you agree to comply with these policies and all applicable laws.</p>
          </div>

          <div className="space-y-6 text-secondary-600 dark:text-secondary-400">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Use of service</h2>
              <p>You may use the platform for buying, selling, and placing bids on auctions according to the rules and fees published on this site.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Account responsibilities</h2>
              <p>Account holders are responsible for keeping login credentials secure and for all activity on their account.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Payments and disputes</h2>
              <p>Payments are processed using secure third-party providers. Only completed auctions are eligible for payment settlement under our service terms.</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
