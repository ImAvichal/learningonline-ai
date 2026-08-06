// components/RegionBadge.js — tiny read-only indicator of the detected pricing
// region. For troubleshooting/support only: no user-facing switching (billing
// currency is enforced server-side from request geolocation).
import { useRegion } from '../lib/region'

export default function RegionBadge({ className = '' }) {
  const { region } = useRegion()
  return <span className={className} title="Detected pricing region">· {region}</span>
}
