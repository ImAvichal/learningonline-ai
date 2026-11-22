import '../styles/globals.css'
import { AuthProvider } from '../lib/auth'
import { ThemeProvider } from '../lib/theme'
import { I18nProvider } from '../lib/i18n'
import CookieConsent from '../components/CookieConsent'
import Head from 'next/head'
import Script from 'next/script'
import { DM_Sans, Syne } from 'next/font/google'

// Next.js self-hosts these font files, removing runtime dependence on Google Fonts.
const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-leo-body' })
const syne = Syne({ subsets: ['latin'], display: 'swap', variable: '--font-leo-display' })

const GA_MEASUREMENT_ID = 'G-B3E8TW3LN2'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <div className={`${dmSans.variable} ${syne.variable} ${dmSans.className} leo-font-root`}>
      <I18nProvider>
        <AuthProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#F0F2F8" />
          </Head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
          <Component {...pageProps} />
          <CookieConsent />
        </AuthProvider>
      </I18nProvider>
      </div>
    </ThemeProvider>
  )
}
