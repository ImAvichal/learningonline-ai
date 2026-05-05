// pages/_document.js — Forces dark theme at HTML root level (no FOUC)
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme="dark" className="dark">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
