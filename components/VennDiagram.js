// components/VennDiagram.js — Reusable three-circle Venn diagram
//
// Designed to address the "AI Success Zone" visibility problem flagged
// in the UI brief. Built with:
//   - Three intersecting circles (SVG, scales with container)
//   - Balanced overlap so the centre intersection is clearly visible
//   - High-contrast label for the centre region (the "Success Zone")
//   - Responsive: SVG viewBox handles all screen sizes naturally
//   - Light-mode friendly (default) with optional dark variant
//
// Usage example:
//   <VennDiagram
//     circles={[
//       { label: 'People',    color: '#1A6EFF' },
//       { label: 'Process',   color: '#10B981' },
//       { label: 'Technology', color: '#F59E0B' },
//     ]}
//     centreLabel="AI Success Zone"
//   />

export default function VennDiagram({
  circles = [],
  centreLabel = 'Success Zone',
  variant = 'light',
  className = '',
}) {
  // Expect exactly 3 circles; fall back gracefully if fewer
  const safeCircles = (circles.length === 3)
    ? circles
    : [
        { label: 'Circle 1', color: '#1A6EFF' },
        { label: 'Circle 2', color: '#10B981' },
        { label: 'Circle 3', color: '#F59E0B' },
      ]

  const isDark = variant === 'dark'
  const textColour = isDark ? '#FFFFFF' : '#0A1628'
  const centreText = isDark ? '#FFFFFF' : '#0A1628'
  const bgFill = isDark ? '#0F1A2E' : '#FFFFFF'

  // SVG geometry — viewBox 400x340, three overlapping circles of radius 110
  // positioned to create a balanced overlap with clear centre intersection.
  // Mix-blend-multiply makes overlaps darker (visible) without obscuring the centre.

  return (
    <div className={`venn-diagram-wrapper ${className}`} style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 400 340"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label={`Venn diagram showing the overlap of ${safeCircles.map(c => c.label).join(', ')} producing ${centreLabel}`}
      >
        {/* Three circles with mix-blend-multiply for visible overlaps */}
        <g style={{ mixBlendMode: 'multiply' }}>
          <circle cx="140" cy="130" r="105" fill={safeCircles[0].color} fillOpacity="0.55" />
          <circle cx="260" cy="130" r="105" fill={safeCircles[1].color} fillOpacity="0.55" />
          <circle cx="200" cy="230" r="105" fill={safeCircles[2].color} fillOpacity="0.55" />
        </g>

        {/* Strong stroke outlines to make each circle's identity clear */}
        <g fill="none" strokeWidth="2.5">
          <circle cx="140" cy="130" r="105" stroke={safeCircles[0].color} strokeOpacity="0.9" />
          <circle cx="260" cy="130" r="105" stroke={safeCircles[1].color} strokeOpacity="0.9" />
          <circle cx="200" cy="230" r="105" stroke={safeCircles[2].color} strokeOpacity="0.9" />
        </g>

        {/* Outer circle labels — positioned outside the circles for clarity */}
        <text x="60" y="75" textAnchor="middle"
              fontSize="15" fontWeight="700" fill={safeCircles[0].color}
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
          {safeCircles[0].label}
        </text>
        <text x="340" y="75" textAnchor="middle"
              fontSize="15" fontWeight="700" fill={safeCircles[1].color}
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
          {safeCircles[1].label}
        </text>
        <text x="200" y="325" textAnchor="middle"
              fontSize="15" fontWeight="700" fill={safeCircles[2].color}
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif">
          {safeCircles[2].label}
        </text>

        {/* Centre "Success Zone" label — placed in the triple-intersection
            with a subtle white background pill for legibility */}
        <g>
          <rect
            x="135" y="160"
            width="130" height="32"
            rx="16"
            fill={bgFill}
            fillOpacity="0.92"
            stroke="#0A1628"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          <text x="200" y="181" textAnchor="middle"
                fontSize="13" fontWeight="800" fill={centreText}
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                letterSpacing="0.2">
            {centreLabel}
          </text>
        </g>
      </svg>

      {/* Legend below — clarifies which colour means what (mobile-friendly) */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '16px',
        fontSize: '13px',
      }}>
        {safeCircles.map((c, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: c.color,
            }} />
            <span style={{ color: textColour, fontWeight: 600 }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
