// pages/api/region.js — Detect user's region (AU default, IN if from India)
// Uses Vercel geolocation headers when available
export default function handler(req, res) {
  // Vercel automatically populates these headers in production
  const country = req.headers['x-vercel-ip-country'] 
    || req.headers['cf-ipcountry']  // Cloudflare fallback
    || req.headers['x-country-code']  // generic fallback
    || 'AU'  // default

  // Map country to supported region
  let region = 'AU'  // default
  if (country === 'IN') region = 'IN'

  res.status(200).json({ region, country })
}
