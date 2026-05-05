// pages/api/region.js — Detect user's region using geolocation headers
// Add ?debug=1 to see raw headers for troubleshooting
export default function handler(req, res) {
  // Vercel automatically populates these headers in production
  const country = req.headers['x-vercel-ip-country'] 
    || req.headers['cf-ipcountry']  // Cloudflare fallback
    || req.headers['x-country-code']  // generic fallback
    || 'AU'  // default

  // Map country to supported region
  let region = 'AU'  // default
  if (country === 'IN') region = 'IN'
  else if (country === 'PH') region = 'PH'
  else if (country === 'US') region = 'US'

  // Debug mode — show raw headers (safe to expose since they're already client-visible)
  if (req.query.debug === '1') {
    return res.status(200).json({
      region,
      country,
      headers: {
        'x-vercel-ip-country':   req.headers['x-vercel-ip-country'] || null,
        'x-vercel-ip-city':      req.headers['x-vercel-ip-city'] || null,
        'x-vercel-ip-region':    req.headers['x-vercel-ip-region'] || null,
        'cf-ipcountry':          req.headers['cf-ipcountry'] || null,
        'x-forwarded-for':       req.headers['x-forwarded-for'] || null,
      },
      note: 'If x-vercel-ip-country is null, Vercel geo detection is not active. Use ?region=US in URL to force a region.'
    })
  }

  res.status(200).json({ region, country })
}
