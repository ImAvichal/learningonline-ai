import '../styles/globals.css'
import { AuthProvider } from '../lib/auth'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05091A" />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
