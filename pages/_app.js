import '../styles/globals.css'
import { AuthProvider } from '../lib/auth'
import { ThemeProvider } from '../lib/theme'
import { I18nProvider } from '../lib/i18n'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#F0F2F8" />
          </Head>
          <Component {...pageProps} />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
