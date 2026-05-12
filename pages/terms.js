// pages/terms.js — Terms & Conditions / Refund Policy
//
// Plain English. Australian tone. Designed to be readable on mobile.
// Not a substitute for legal review — Australian Consumer Law statutory
// guarantees override anything written here.

import Head from 'next/head'
import Link from 'next/link'
import { Nav, Reveal } from '../components/ui'

// ── Section component — keeps spacing and heading hierarchy consistent ──────
function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="font-display font-bold text-xl sm:text-2xl mb-4 text-gray-900 scroll-mt-24">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4 text-[15px] sm:text-base">
        {children}
      </div>
    </section>
  )
}

export default function Terms() {
  const lastUpdated = '12 May 2026'

  return (
    <>
      <Head>
        <title>Terms & Refund Policy — LeO AI</title>
        <meta name="description" content="Plain-English terms of use, payment terms, and our 3-day refund policy for LeO AI." />
      </Head>

      <Nav />

      <main className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">

          {/* Header */}
          <Reveal>
            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.18em] text-blue font-display font-bold mb-3">
                Legal
              </p>
              <h1 className="font-display font-black text-3xl sm:text-4xl mb-3 leading-tight text-gray-900 break-words">
                Terms &amp; Refund Policy
              </h1>
              <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
            </div>
          </Reveal>

          {/* Quick summary box — sets the tone */}
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
              <p className="text-sm text-gray-600 mb-3 font-display font-bold uppercase tracking-wider">
                The short version
              </p>
              <ul className="space-y-2.5 text-gray-700 text-[15px]">
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>LeO AI is a learning platform. You pay for access to the modules in your tier.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>Paid subscriptions renew monthly or annually until you cancel.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span><strong>3-day refund window</strong> — request a refund within 72 hours of enrolment.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>Approved refunds are processed in 3–5 business days.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>Request refunds via the <Link href="/contact" className="text-blue hover:underline font-bold">Contact page</Link> &mdash; select &ldquo;Refund Request&rdquo;.</span></li>
              </ul>
            </div>
          </Reveal>

          {/* Sections */}
          <Reveal>
            <Section id="who-we-are" title="1. Who we are">
              <p>
                LeO AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides online learning content
                about artificial intelligence at <Link href="/" className="text-blue hover:underline">learningonline.ai</Link>.
                When you create an account or purchase access, you agree to these terms.
              </p>
              <p>
                If you have questions, just reach out via the <Link href="/contact" className="text-blue hover:underline">Contact page</Link>.
              </p>
            </Section>

            <Section id="what-you-get" title="2. What you get">
              <p>
                Access depends on the tier you&apos;re enrolled in:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Parents &amp; Caregivers</strong> &mdash; a free module covering AI fundamentals for families. Sign-in required.</li>
                <li><strong>Starting the Journey</strong> &mdash; paid subscription covering practical AI capability for professionals.</li>
                <li><strong>The Pro</strong> &mdash; paid subscription including everything in Starting the Journey, plus enterprise-scale leadership content.</li>
              </ul>
              <p>
                Your access starts immediately after successful payment. Your progress is saved automatically.
              </p>
            </Section>

            <Section id="payment" title="3. Payment and billing">
              <p>
                Paid subscriptions are billed monthly or annually based on what you chose at checkout. Payments are processed securely by Stripe; we don&apos;t see or store your card details.
              </p>
              <p>
                Subscriptions renew automatically at the end of each billing period until you cancel. You can cancel at any time &mdash; just email us via the <Link href="/contact" className="text-blue hover:underline">Contact page</Link> and we&apos;ll process it. Your access continues to the end of the period you&apos;ve already paid for.
              </p>
              <p>
                Prices are shown in your local currency where supported (AUD, INR, PHP, USD). Local taxes may apply where required by law.
              </p>
            </Section>

            <Section id="refunds" title="4. 3-Day refund policy">
              <p>
                <strong>You may request a refund within 3 days (72 hours) of enrolment</strong> if you don&apos;t believe the platform delivers value for your learning journey.
              </p>
              <p>
                The 72-hour window starts from the timestamp of your successful payment.
              </p>
              <p>
                To request a refund:
              </p>
              <ol className="space-y-2 list-decimal pl-5">
                <li>Visit the <Link href="/contact" className="text-blue hover:underline">Contact page</Link></li>
                <li>Select <strong>&ldquo;Refund Request&rdquo;</strong> from the enquiry type dropdown</li>
                <li>Briefly tell us why &mdash; this helps us improve, but is not required for approval within the 3-day window</li>
                <li>Submit the form</li>
              </ol>
              <p>
                Approved refunds are typically processed within <strong>3&ndash;5 business days</strong> back to your original payment method.
              </p>
              <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <strong>Your statutory rights:</strong> Nothing in this policy limits any consumer guarantees you have under Australian Consumer Law (or equivalent laws in your jurisdiction). Those rights apply regardless of what&apos;s written here.
              </p>
            </Section>

            <Section id="your-responsibilities" title="5. Your responsibilities">
              <p>When you use LeO AI you agree to:</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Provide accurate sign-up information</li>
                <li>Keep your password secure and not share your account</li>
                <li>Use the platform for your own learning &mdash; don&apos;t resell or redistribute the content</li>
                <li>Treat any AI tools mentioned in lessons as just that &mdash; tools. We don&apos;t guarantee any specific business outcome from the content.</li>
              </ul>
              <p>
                We may suspend access if an account is used in a way that breaks these terms or harms other learners.
              </p>
            </Section>

            <Section id="content" title="6. Our content">
              <p>
                Lessons, videos, written material, and downloadable resources are owned by us (or licensed to us). You may use them for your own learning. You may not republish, redistribute, or use them to train AI models without written permission.
              </p>
            </Section>

            <Section id="changes" title="7. Changes to the service or terms">
              <p>
                We&apos;ll continue to improve the platform. We may add modules, update content, and refine features. If we make a material change to these terms or pricing, we&apos;ll let you know by email or in-app notice before it takes effect.
              </p>
            </Section>

            <Section id="liability" title="8. Liability">
              <p>
                We do our best to keep the platform working well. To the extent permitted by law, our total liability for any claim relating to LeO AI is limited to what you paid us in the 12 months before the claim arose. Nothing here limits liability that can&apos;t be limited by law (such as Australian Consumer Law statutory guarantees).
              </p>
            </Section>

            <Section id="contact" title="9. Contact us">
              <p>
                Questions about these terms, your account, or a refund? <Link href="/contact" className="text-blue hover:underline">Get in touch</Link>. We aim to reply to every message within two business days.
              </p>
            </Section>
          </Reveal>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>
              These terms are governed by the laws of New South Wales, Australia.
              For statutory consumer rights, see the{' '}
              <a href="https://www.accc.gov.au/consumers" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">ACCC consumer rights</a> guidance.
            </p>
          </div>

        </div>
      </main>
    </>
  )
}
