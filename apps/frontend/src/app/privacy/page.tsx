export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-secondary-900 dark:bg-secondary-950 dark:text-white">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Legal</p>
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">We respect your privacy and are committed to protecting your personal data while using our auction services.</p>
          </div>

          <div className="space-y-6 text-secondary-600 dark:text-secondary-400">
            <section>
              <h2 className="text-2xl font-semibold mb-3">Information collection</h2>
              <p>We collect account information, transaction data, and usage analytics to improve the platform and secure your experience.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Data usage</h2>
              <p>Your data is used to support bidding, payments, and communications, and is never sold to third parties without consent.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Security</h2>
              <p>We implement industry-standard security controls to protect your information and require strong authentication for account access.</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
