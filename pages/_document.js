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
        {/* ── Google Consent Mode v2 default state ──
            MUST run before the GTM container loads so tags respect consent
            from the very first pageview. We default everything that isn't
            strictly necessary to 'denied'. The cookie banner calls
            gtag('consent','update',...) when the user chooses.
            'wait_for_update' gives the banner a moment to restore a saved
            choice before tags evaluate. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
// Restore a previously saved choice (so returning visitors aren't re-prompted
// and their prior consent is applied before tags evaluate).
try {
  var saved = localStorage.getItem('leo_consent');
  if (saved) {
    var c = JSON.parse(saved);
    gtag('consent', 'update', {
      ad_storage: c.ad ? 'granted' : 'denied',
      ad_user_data: c.ad ? 'granted' : 'denied',
      ad_personalization: c.ad ? 'granted' : 'denied',
      analytics_storage: c.analytics ? 'granted' : 'denied'
    });
  }
} catch (e) {}`,
          }}
        />
        {/* ── End Google Consent Mode v2 default ── */}

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

        {/* ── Favicon / brand icon ──
            SVG favicon: retina-crisp at any size, dark/light compatible.
            The theme-color + apple meta give clean mobile-browser treatment. */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-title" content="LeO AI" />
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
