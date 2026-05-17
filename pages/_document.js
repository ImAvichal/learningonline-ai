// pages/_document.js — Custom Document for Next.js Pages Router
//
// Purpose:
//   - Inject Google Tag Manager scripts (both head + noscript variants)
//   - Set lang attribute on <html> for accessibility / SEO
//
// PEER-REVIEW NOTE on GTM placement (16 May 2026):
// GTM is loaded synchronously, as recommended by Google's official setup.
// We deliberately use dangerouslySetInnerHTML rather than `next/script` because:
//   1. GTM needs to register window.dataLayer BEFORE any tracked events fire
//   2. next/script's "afterInteractive" strategy can miss early events
//   3. The synchronous load is intentional per Google's specs — the inline
//      portion is non-blocking (just registers dataLayer + queues async fetch)
//
// GTM container ID: GTM-5RFR2PR8

import { Html, Head, Main, NextScript } from 'next/document'

const GTM_ID = 'GTM-5RFR2PR8'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ── Google Tag Manager (head) ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* ── End Google Tag Manager (head) ── */}
      </Head>
      <body>
        {/* ── Google Tag Manager (noscript) — must be immediately after <body> ── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* ── End Google Tag Manager (noscript) ── */}

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
