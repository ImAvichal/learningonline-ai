// components/Seo.js
//
// Reusable <head> SEO block: title, meta description, canonical, and social
// cards (Open Graph + Twitter). Drop <Seo .../> into any page's render (it
// uses next/head, so it merges into the document head).
//
// Usage:
//   <Seo
//     title="Pricing — LeO AI"
//     description="..."
//     path="/pricing"
//   />
//
// `image` defaults to the site OG image; override per-page if needed.

import Head from 'next/head'

const SITE = 'https://www.learningonline.ai'
const DEFAULT_IMAGE = `${SITE}/og-image.png`
const SITE_NAME = 'LeO AI'

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const url = `${SITE}${path}`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
