// pages/_document.js — Custom Document for Next.js Pages Router
//
// Purpose:
//   - Force light theme at HTML root (no flash of dark content on page load)
//   - Inject Google Tag Manager scripts (both head + noscript variants)
//   - Set lang attribute on <html> for accessibility / SEO
//
// The data-theme="light" attribute drives the comprehensive [data-theme="light"]
// CSS overrides in globals.css. Setting it at the document level (vs. via
// useEffect in ThemeProvider) prevents the brief dark flash on initial load.
//
// GTM container ID: GTM-5RFR2PR8

import { Html, Head, Main, NextScript } from 'next/document'

const GTM_ID = 'GTM-5RFR2PR8'

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
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
