// pages/sitemap.xml.js
//
// Serves /sitemap.xml dynamically. Listing only public, indexable marketing/
// content pages — deliberately excluding auth (login/signup), transactional
// (checkout/success/course-complete) and app (dashboard) pages, which we don't
// want in search results.
//
// changefreq/priority are hints to crawlers, not guarantees. Home + pricing +
// choose-ai are the highest-priority entry points.

const SITE = 'https://www.learningonline.ai'

// path, changefreq, priority
const PAGES = [
  ['/',                'weekly',  '1.0'],
  ['/pricing',         'weekly',  '0.9'],
  ['/choose-ai',       'weekly',  '0.9'],
  ['/parents',         'monthly', '0.8'],
  ['/mindset',         'monthly', '0.7'],
  ['/model-selection', 'monthly', '0.7'],
  ['/roi-calculator',  'monthly', '0.7'],
  ['/glossary',        'monthly', '0.6'],
  ['/contact',         'monthly', '0.5'],
  ['/terms',           'yearly',  '0.3'],
  ['/privacy',         'yearly',  '0.3'],
]

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0]
  const urls = PAGES.map(([path, freq, pri]) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${pri}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.write(buildSitemap())
  res.end()
  return { props: {} }
}

// Page component never renders (response is written above), but Next requires a default export.
export default function Sitemap() { return null }
