export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white text-secondary-900 dark:bg-secondary-950 dark:text-white">
      <section className="section-container py-24">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Frequently Asked Questions</p>
            <h1 className="text-5xl font-bold">Get fast answers to common auction questions</h1>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">From bidding rules to payment and delivery, our FAQ page is here to help you move confidently through every step.</p>
          </div>

          <div className="grid gap-6">
            {[
              {
                question: 'How do I place a bid?',
                answer: 'Browse live auctions, select an item, enter your bid amount, and confirm. The highest valid bid at auction close wins.',
              },
              {
                question: 'Can I withdraw a bid?',
                answer: 'Bids are binding once placed. If you need help, contact support immediately to discuss your options.',
              },
              {
                question: 'How do payments work?',
                answer: 'Payments are processed securely after auction close. We support multiple payment providers and escrow protection.',
              },
            ].map((item) => (
              <div key={item.question} className="card p-8">
                <h2 className="text-2xl font-semibold mb-3">{item.question}</h2>
                <p className="text-secondary-600 dark:text-secondary-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
