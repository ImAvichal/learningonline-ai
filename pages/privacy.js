// pages/privacy.js — Privacy & Cookie Policy
//
// Plain English. Australian tone. Designed to be readable on mobile.
// Matches the structure/styling of pages/terms.js.
//
// NOT a substitute for legal review. This accurately describes the platform's
// actual data practices as built, but should be checked by a qualified person
// before being relied upon for compliance.

import Head from 'next/head'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Nav, Reveal } from '../components/ui'

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

export default function Privacy() {
  const lastUpdated = '22 May 2026'

  return (
    <>
      <Head>
        <title>Privacy &amp; Cookie Policy — LeO AI</title>
        <meta name="description" content="How LeO AI collects, uses, and protects your data, and how we use cookies and analytics." />
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
                Privacy &amp; Cookie Policy
              </h1>
              <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
            </div>
          </Reveal>

          {/* Quick summary box */}
          <Reveal>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
              <p className="text-sm text-gray-600 mb-3 font-display font-bold uppercase tracking-wider">
                The short version
              </p>
              <ul className="space-y-2.5 text-gray-700 text-[15px]">
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>We collect the account details you give us and basic usage data to run the platform.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>Payments are handled by <strong>Stripe</strong>. We never see or store your full card number.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>We use cookies for analytics and advertising <strong>only with your consent</strong>.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>You can request a copy of your data, or its deletion, at any time.</span></li>
                <li className="flex gap-2.5"><span className="text-blue flex-shrink-0">→</span><span>Questions? Reach us via the <Link href="/contact" className="text-blue hover:underline font-bold">Contact page</Link>.</span></li>
              </ul>
            </div>
          </Reveal>

          {/* Sections */}
          <Reveal>
            <Section id="who-we-are" title="1. Who we are">
              <p>LeO AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates this learning platform at learningonline.ai. This policy explains what personal information we collect, why, how we use it, and the choices you have. It applies to visitors and registered users of the site.</p>
            </Section>

            <Section id="what-we-collect" title="2. What we collect">
              <p>We collect information in three ways:</p>
              <p><strong>Information you give us.</strong> When you create an account, we collect your name, email address, and (optionally) your company and job title. If you contact us, we keep the content of your message and your contact details so we can respond.</p>
              <p><strong>Payment information.</strong> When you subscribe, our payment processor <strong>Stripe</strong> collects and processes your payment details. We do not receive or store your full card number. We retain a record of your subscription tier, billing interval, transaction amount, and a Stripe customer reference so we can manage your access and support your account.</p>
              <p><strong>Information collected automatically.</strong> Like most websites, we collect basic technical and usage data — such as pages visited, approximate location (from IP), device and browser type, and how you arrived at the site. Where you have consented, this includes analytics and advertising identifiers (see the Cookies section below).</p>
            </Section>

            <Section id="how-we-use-it" title="3. How we use your information">
              <p>We use your information to:</p>
              <p>• Provide and manage your account and access to the modules in your tier;<br />
              • Process payments, renewals, upgrades, and refunds;<br />
              • Track your learning progress so you can resume where you left off;<br />
              • Send you service messages (e.g. payment confirmations, important account notices);<br />
              • Respond to your enquiries and provide support;<br />
              • With your consent, understand how the site is used and measure the effectiveness of our advertising;<br />
              • Meet our legal and tax obligations.</p>
            </Section>

            <Section id="cookies" title="4. Cookies & similar technologies">
              <p>Cookies are small files stored on your device. We group them as follows:</p>
              <p><strong>Strictly necessary.</strong> Required for the site to function — for example, keeping you logged in and remembering your cookie choice. These are always on and don&rsquo;t require consent.</p>
              <p><strong>Analytics.</strong> Help us understand how visitors use the site (e.g. Google Analytics). Set only if you accept.</p>
              <p><strong>Advertising.</strong> Used to measure and improve our advertising and, where applicable, to show relevant ads (e.g. Google Ads). Set only if you accept.</p>
              <p>When you first visit, we ask for your consent before setting any analytics or advertising cookies. We use <strong>Google Consent Mode</strong>, which means these tools respect your choice from the very first page load. You can change your mind at any time by clearing the site&rsquo;s stored data in your browser, which will prompt the consent banner again.</p>
            </Section>

            <Section id="sharing" title="5. Who we share it with">
              <p>We don&rsquo;t sell your personal information. We share it only with the service providers that help us run the platform, including:</p>
              <p>• <strong>Stripe</strong> — payment processing;<br />
              • <strong>Supabase</strong> — secure database and authentication for your account;<br />
              • <strong>Resend</strong> — transactional email delivery;<br />
              • <strong>Google</strong> (Analytics / Ads / Tag Manager) — analytics and advertising measurement, where you have consented;<br />
              • <strong>Vercel</strong> — website hosting.</p>
              <p>These providers process data on our behalf under their own security and privacy commitments. Some may process data outside Australia; where that happens, we take reasonable steps to ensure appropriate protection.</p>
            </Section>

            <Section id="retention" title="6. How long we keep it">
              <p>We keep your account and transaction records for as long as you have an account and for a reasonable period afterwards to meet legal, tax, and accounting obligations. You can ask us to delete your account data at any time, subject to records we are legally required to retain.</p>
            </Section>

            <Section id="your-rights" title="7. Your rights">
              <p>You can ask us to: access the personal information we hold about you; correct it if it&rsquo;s wrong; delete it; or stop using it for certain purposes. To make a request, contact us via the <Link href="/contact" className="text-blue hover:underline font-bold">Contact page</Link>. We&rsquo;ll respond within a reasonable timeframe.</p>
              <p>If you are in a region with specific data protection laws (such as the EU/UK GDPR), you may have additional rights, including the right to lodge a complaint with your local data protection authority. In Australia, you may contact the Office of the Australian Information Commissioner (OAIC).</p>
            </Section>

            <Section id="security" title="8. Security">
              <p>We take reasonable technical and organisational measures to protect your information, including encryption in transit and access controls on our systems. No method of transmission or storage is completely secure, but we work to protect your data and to respond promptly if an issue arises.</p>
            </Section>

            <Section id="children" title="9. Children">
              <p>Our paid platform is intended for adults. Our Parents &amp; Caregivers content is designed for adults supporting children&rsquo;s learning — it is not directed at children themselves. We do not knowingly collect personal information from children.</p>
            </Section>

            <Section id="changes" title="10. Changes to this policy">
              <p>We may update this policy from time to time. When we make material changes, we&rsquo;ll update the &ldquo;last updated&rdquo; date above and, where appropriate, notify you. Your continued use of the site after an update means you accept the revised policy.</p>
            </Section>

            <Section id="contact" title="11. Contact us">
              <p>Questions about this policy or your data? Reach us through the <Link href="/contact" className="text-blue hover:underline font-bold">Contact page</Link> and we&rsquo;ll be glad to help.</p>
            </Section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
              <p>This policy is provided in good faith and describes our actual data practices. It is not legal advice. Australian Privacy Principles and any applicable overseas data protection laws apply regardless of anything stated here.</p>
            </div>
          </Reveal>

        </div>
      </main>

      <Footer variant="light" />
    </>
  )
}
