// components/RegionSelector.js — visible pricing-region control.
// Self-contained: drop <RegionSelector /> anywhere. Selections persist
// (localStorage) and broadcast via the useRegion hook, so every priced
// component on the page updates instantly.
import { useRegion } from '../lib/region'

const REGIONS = {
  AU: { flag: '🇦🇺', name: 'Australia',     currency: 'AUD' },
  US: { flag: '🇺🇸', name: 'United States', currency: 'USD' },
  IN: { flag: '🇮🇳', name: 'India',         currency: 'INR' },
  PH: { flag: '🇵🇭', name: 'Philippines',   currency: 'PHP' },
}

export default function RegionSelector({ className = '' }) {
  const { region, setRegion } = useRegion()
  return (
    <label className={`inline-flex items-center gap-2 text-xs text-gray-500 ${className}`}>
      <span className="font-display font-bold uppercase tracking-wider">Pricing region</span>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        aria-label="Select your pricing region"
        className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-blue/40 cursor-pointer"
      >
        {Object.entries(REGIONS).map(([code, r]) => (
          <option key={code} value={code}>{r.flag} {r.name} · {r.currency}</option>
        ))}
      </select>
    </label>
  )
}
