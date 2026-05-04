// pages/roi-calculator.js — ROI Calculator (fixed logic)
//
// CORRECT MODEL:
// Value comes from: hours saved × people × hourly rate (user controls this)
// Cost comes from:  implementation + (token cost × volume) + support
// Higher tokens = higher cost = lower net benefit ✓
// More expensive model = higher cost = lower net benefit ✓
// Higher complexity = higher implementation cost + more tokens = lower net benefit ✓
// Improvement rate is separate from complexity (user sets the use case value)

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Nav, Card, SectionLabel, Button } from '../components/ui'
import Link from 'next/link'

// Complexity affects implementation cost and token volume ONLY
// It does NOT affect the value/improvement rate
const COMPLEXITY = {
  low:    { label:'Low',    implWeeks:4,  supportHrsWk:2, tokensPerCall:500,   desc:'Simple prompt + API · ~4 weeks build · low support overhead' },
  medium: { label:'Medium', implWeeks:8,  supportHrsWk:4, tokensPerCall:2000,  desc:'Workflow integration · ~8 weeks build · moderate support' },
  high:   { label:'High',   implWeeks:16, supportHrsWk:8, tokensPerCall:8000,  desc:'Custom build + data work · ~16 weeks · significant support' },
}

const MODEL_OPTIONS = [
  { label:'Gemini 1.5 Flash (most efficient)',      costPerToken:0.000000075 },
  { label:'GPT-4o-mini / Claude Haiku (efficient)', costPerToken:0.00000015  },
  { label:'Mixed strategy (recommended)',            costPerToken:0.0000005   },
  { label:'GPT-4o / Claude Sonnet (frontier)',      costPerToken:0.0000025   },
  { label:'Claude 3.5 Sonnet (premium)',            costPerToken:0.000005     },
]

const fmtAUD = (n) => {
  if (!isFinite(n) || isNaN(n)) return '$0'
  const abs = Math.abs(n)
  const sign = n < 0 ? '-' : ''
  if (abs >= 1000000) return sign + '$' + (abs / 1000000).toFixed(1) + 'M'
  if (abs >= 1000)    return sign + '$' + Math.round(abs).toLocaleString('en-AU')
  return sign + '$' + Math.round(abs).toLocaleString('en-AU')
}

const roiColor = (roi) => roi > 200 ? 'text-success' : roi > 0 ? 'text-amber-400' : 'text-red-400'

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    // Value inputs (what does the use case save?)
    hoursPerDay:     1.5,   // hours of manual work saved per person per day
    people:          10,    // people affected
    dayRate:         500,   // fully loaded day rate (AUD)
    improvementRate: 60,    // % of saved hours actually recovered (realistic, not 100%)
    adoptionRate:    70,    // % of team that actually uses it

    // Cost inputs
    complexity:      'medium',
    callsPerDay:     200,   // AI API calls per day
    costPerToken:    0.0000005, // cost per token (model dependent)
    devDayRate:      1200,  // developer day rate for implementation
  })

  const [results, setResults] = useState(null)

  useEffect(() => { calc() }, [inputs])

  const calc = () => {
    const {
      hoursPerDay, people, dayRate, improvementRate, adoptionRate,
      complexity, callsPerDay, costPerToken, devDayRate,
    } = inputs

    const cx          = COMPLEXITY[complexity]
    const hourlyRate  = dayRate / 8
    const improvement = improvementRate / 100
    const adoption    = adoptionRate / 100

    // ── VALUE (what does AI save?) ───────────────────────────────────────────
    // Time saved = hours freed × adoption × improvement recovery
    // improvement rate = realistic % of that time that translates to actual value
    // (not all "saved" time becomes productive — some is absorbed by other tasks)
    const hoursRecoveredPerDayPerPerson = hoursPerDay * improvement
    const effectivePeople               = people * adoption
    const annualHoursSaved              = hoursRecoveredPerDayPerPerson * effectivePeople * 250
    const annualValue                   = annualHoursSaved * hourlyRate
    const monthlyValue                  = annualValue / 12

    // ── COST (what does AI cost to build and run?) ───────────────────────────

    // Implementation cost = developer time to build
    const implCost = cx.implWeeks * 5 * devDayRate  // 5 dev days per week

    // Token cost: calls × tokens per call × cost per token × working days
    const tokensPerCall      = cx.tokensPerCall
    const dailyTokenCost     = callsPerDay * tokensPerCall * costPerToken
    const monthlyTokenCost   = dailyTokenCost * 22
    const annualTokenCost    = dailyTokenCost * 250

    // Support cost: hours per week × hourly rate × 52
    const annualSupportCost  = cx.supportHrsWk * hourlyRate * 52

    // Annual maintenance total
    const annualMaintenance  = annualTokenCost + annualSupportCost

    // Monthly AI running cost (tokens only — what user sees monthly)
    const monthlyAICost      = monthlyTokenCost

    // ── NET BENEFIT ──────────────────────────────────────────────────────────
    const monthlyNetBenefit  = monthlyValue - monthlyAICost
    const annualNetBenefit   = annualValue - annualMaintenance

    // ── 5-YEAR MODEL ─────────────────────────────────────────────────────────
    const fiveYearCost       = implCost + (annualMaintenance * 5)
    const fiveYearValue      = annualValue * 5
    const fiveYearNet        = fiveYearValue - fiveYearCost
    const roi                = fiveYearCost > 0 ? ((fiveYearNet / fiveYearCost) * 100) : 0

    // ── BREAK-EVEN ───────────────────────────────────────────────────────────
    // How many months until cumulative value covers implementation cost?
    const breakEvenMonths    = monthlyNetBenefit > 0
      ? Math.ceil(implCost / monthlyNetBenefit)
      : null

    const paybackText = breakEvenMonths === null
      ? 'Negative monthly return — increase value or reduce cost'
      : breakEvenMonths <= 2  ? `Outstanding — payback in ${breakEvenMonths} month${breakEvenMonths === 1 ? '' : 's'}`
      : breakEvenMonths <= 6  ? `Strong — payback in ${breakEvenMonths} months`
      : breakEvenMonths <= 12 ? `Solid — payback in ${breakEvenMonths} months`
      : breakEvenMonths <= 24 ? `Acceptable — payback in ${breakEvenMonths} months`
      : `Slow payback (${breakEvenMonths} months) — reassess use case or reduce cost`

    // ── SENSITIVITY (adoption rate scenarios) ────────────────────────────────
    const scenarios = [
      { label:'Conservative', adoptionPct:40,  note:'Slow adoption, resistance' },
      { label:'Base',         adoptionPct:adoptionRate, note:'Your estimate' },
      { label:'Target',       adoptionPct:90,  note:'Full adoption, champions active' },
    ].map(s => {
      const a       = s.adoptionPct / 100
      const effPpl  = people * a
      const annVal  = hoursRecoveredPerDayPerPerson * effPpl * 250 * hourlyRate
      const fyVal   = annVal * 5
      const fyNet   = fyVal - fiveYearCost
      const r       = fiveYearCost > 0 ? Math.round((fyNet / fiveYearCost) * 100) : 0
      const mnthNet = (annVal / 12) - monthlyAICost
      const bev     = mnthNet > 0 ? Math.ceil(implCost / mnthNet) : null
      return { ...s, annualValue: annVal, fiveYearNet: fyNet, roi: r, breakEven: bev }
    })

    // ── TOKEN COST SENSITIVITY (show impact of model choice) ─────────────────
    const modelComparison = MODEL_OPTIONS.map(m => {
      const mDailyToken = callsPerDay * tokensPerCall * m.costPerToken
      const mAnnToken   = mDailyToken * 250
      const mAnnMaint   = mAnnToken + annualSupportCost
      const mFYCost     = implCost + (mAnnMaint * 5)
      const mFYNet      = fiveYearValue - mFYCost
      const mRoi        = mFYCost > 0 ? Math.round((mFYNet / mFYCost) * 100) : 0
      const mMonthlyNet = monthlyValue - (mDailyToken * 22)
      const mBEV        = mMonthlyNet > 0 ? Math.ceil(implCost / mMonthlyNet) : null
      return { label: m.label, monthlyTokenCost: mDailyToken * 22, annualROI: mRoi, breakEven: mBEV, fiveYearNet: mFYNet }
    })

    setResults({
      annualHoursSaved, annualValue, monthlyValue,
      implCost, monthlyTokenCost, monthlyAICost, annualTokenCost, annualSupportCost, annualMaintenance,
      monthlyNetBenefit, annualNetBenefit,
      fiveYearCost, fiveYearValue, fiveYearNet, roi,
      breakEvenMonths, paybackText,
      scenarios, modelComparison,
      tokensPerCall,
    })
  }

  const set = (k) => (e) => {
    const val = ['complexity'].includes(k) ? e.target.value : parseFloat(e.target.value)
    setInputs(p => ({ ...p, [k]: val }))
  }

  const Slider = ({ label, field, min, max, step = 1, prefix = '', suffix = '', hint }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">{label}</label>
        <span className="font-display font-bold text-blue-bright text-lg">
          {prefix}{Number(inputs[field]).toLocaleString()}{suffix}
        </span>
      </div>
      {hint && <p className="text-[11px] text-muted mb-2">{hint}</p>}
      <input type="range" min={min} max={max} step={step} value={inputs[field]} onChange={set(field)}
        className="w-full h-1.5 bg-white/10 rounded-full outline-none cursor-pointer accent-blue" />
      <div className="flex justify-between text-[10px] text-muted mt-1">
        <span>{prefix}{Number(min).toLocaleString()}{suffix}</span>
        <span>{prefix}{Number(max).toLocaleString()}{suffix}</span>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>AI ROI Calculator — LeO AI</title>
        <meta name="description" content="Calculate the real ROI of your AI investment. Includes break-even, 5-year model, sensitivity analysis, and model cost comparison." />
      </Head>
      <Nav />

      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <SectionLabel>ROI Calculator</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">Calculate Your AI ROI</h1>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Set the value your use case delivers and the real costs to build and run it.
              Higher token costs and more complex builds correctly reduce your net benefit.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8">

            {/* ── Inputs ── */}
            <div className="space-y-5">

              {/* Value inputs */}
              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-1">What value does the use case deliver?</h3>
                <p className="text-xs text-muted mb-6">This is what AI saves your team — independent of the technology cost.</p>

                <Slider
                  label="Hours of manual work saved per person per day"
                  field="hoursPerDay" min={0.5} max={8} step={0.5} suffix=" hrs"
                  hint="How much time does the current manual process take per person?"
                />
                <Slider
                  label="Number of people affected"
                  field="people" min={1} max={500}
                  hint="How many staff members will use or benefit from this AI?"
                />
                <Slider
                  label="Average day rate per person (AUD, fully loaded)"
                  field="dayRate" min={200} max={2000} step={50} prefix="$"
                  hint="Include salary, super, leave loading, and overhead (typically 1.3–1.5× base salary)"
                />
                <Slider
                  label="Realistic time recovery rate"
                  field="improvementRate" min={10} max={90} suffix="%"
                  hint="Not all 'saved' time becomes productive. 60% is a reasonable default. 100% is unrealistic."
                />
                <Slider
                  label="Expected team adoption rate"
                  field="adoptionRate" min={10} max={100} suffix="%"
                  hint="What % of affected staff will actually use this consistently? Start conservative."
                />
              </Card>

              {/* Cost inputs */}
              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-1">What does it cost to build and run?</h3>
                <p className="text-xs text-muted mb-6">Higher complexity and more expensive models increase costs and reduce net benefit.</p>

                {/* Complexity */}
                <div className="mb-5">
                  <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Implementation complexity</label>
                  <div className="space-y-2">
                    {Object.entries(COMPLEXITY).map(([key, cx]) => (
                      <button key={key} onClick={() => setInputs(p => ({ ...p, complexity: key }))}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${inputs.complexity === key ? 'border-blue/50 bg-blue/10' : 'border-white/10 hover:border-blue/30'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${inputs.complexity === key ? 'border-blue bg-blue' : 'border-white/30'}`}>
                          {inputs.complexity === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-white capitalize">{cx.label}</div>
                          <div className="text-xs text-muted">{cx.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Slider
                  label="Developer day rate (AUD)"
                  field="devDayRate" min={500} max={3000} step={100} prefix="$"
                  hint="Cost per day of development time. Used to calculate implementation cost."
                />

                <Slider
                  label="AI API calls per day"
                  field="callsPerDay" min={1} max={10000} step={10}
                  hint="How many times per day will the AI be called? More calls = higher token cost."
                />

                <div className="mb-5">
                  <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">AI model selection</label>
                  <select value={inputs.costPerToken} onChange={set('costPerToken')}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue">
                    {MODEL_OPTIONS.map(m => (
                      <option key={m.costPerToken} value={m.costPerToken}>{m.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted mt-1.5">
                    Tokens per call: <strong className="text-white">{COMPLEXITY[inputs.complexity].tokensPerCall.toLocaleString()}</strong> ({inputs.complexity} complexity) ·
                    Monthly token cost: <strong className="text-white">{fmtAUD(inputs.callsPerDay * COMPLEXITY[inputs.complexity].tokensPerCall * inputs.costPerToken * 22)}</strong>
                  </p>
                  <Link href="/model-selection" className="text-xs text-blue-bright hover:underline">
                    → Help choosing a model
                  </Link>
                </div>
              </Card>
            </div>

            {/* ── Results ── */}
            <div className="space-y-4">
              {results && (
                <>
                  {/* Monthly snapshot */}
                  <Card className="p-6">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Monthly Snapshot</div>
                    <div className="space-y-3">
                      {[
                        { label:'Value delivered (time saved)',   val: results.monthlyValue,        color:'text-success',  note:`${Math.round(results.annualHoursSaved / 12)} hrs/month recovered` },
                        { label:'AI token running cost',          val: results.monthlyTokenCost,    color:'text-amber-400', note:`${results.tokensPerCall.toLocaleString()} tokens × ${inputs.callsPerDay} calls/day` },
                        { label:'Monthly net benefit',            val: results.monthlyNetBenefit,   color: results.monthlyNetBenefit > 0 ? 'text-success' : 'text-red-400', note:'' },
                      ].map(r => (
                        <div key={r.label}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm text-muted">{r.label}</span>
                            <span className={`font-display font-bold text-lg ${r.color}`}>{fmtAUD(r.val)}</span>
                          </div>
                          {r.note && <div className="text-[11px] text-muted">{r.note}</div>}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Implementation cost */}
                  <Card className="p-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Cost Breakdown</div>
                    <div className="space-y-2 text-sm">
                      {[
                        { label:`Implementation (${COMPLEXITY[inputs.complexity].implWeeks}wks × ${inputs.devDayRate * 5}/wk)`, val: results.implCost, color:'text-white' },
                        { label:'Annual token cost',          val: results.annualTokenCost,    color:'text-amber-400' },
                        { label:'Annual support cost',        val: results.annualSupportCost,  color:'text-amber-400' },
                        { label:'Total annual maintenance',   val: results.annualMaintenance,  color:'text-white' },
                        { label:'5-Year total cost',          val: results.fiveYearCost,       color:'text-red-400' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-muted text-xs">{r.label}</span>
                          <span className={`font-display font-bold text-sm ${r.color}`}>{fmtAUD(r.val)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Break-even */}
                  <Card className={`p-5 ${results.breakEvenMonths && results.breakEvenMonths <= 12 ? 'border-success/30 bg-success/[0.03]' : results.breakEvenMonths ? 'border-amber-400/30' : 'border-red-400/30 bg-red-400/[0.02]'}`}>
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Break-Even Timeline</div>
                    <div className={`font-display font-black text-3xl mb-1 ${results.breakEvenMonths && results.breakEvenMonths <= 12 ? 'text-success' : results.breakEvenMonths ? 'text-amber-400' : 'text-red-400'}`}>
                      {results.breakEvenMonths ? `${results.breakEvenMonths} months` : 'Negative return'}
                    </div>
                    <p className="text-xs text-muted">{results.paybackText}</p>
                  </Card>

                  {/* 5-year summary */}
                  <Card className="p-5 border-blue/20 bg-blue/[0.03]">
                    <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-3">5-Year Financial Summary</div>
                    <div className="space-y-2 mb-3">
                      {[
                        { label:'5-Year value',    val: results.fiveYearValue, color:'text-success' },
                        { label:'5-Year cost',     val: results.fiveYearCost,  color:'text-red-400' },
                        { label:'5-Year net',      val: results.fiveYearNet,   color: results.fiveYearNet > 0 ? 'text-success' : 'text-red-400' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-sm text-muted">{r.label}</span>
                          <span className={`font-display font-bold ${r.color}`}>{fmtAUD(r.val)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
                      <span className="font-display font-bold text-white">5-Year ROI</span>
                      <span className={`font-display font-black text-3xl ${roiColor(results.roi)}`}>{Math.round(results.roi)}%</span>
                    </div>
                  </Card>

                  {/* Sensitivity — adoption rate */}
                  <Card className="p-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Adoption Rate Sensitivity</div>
                    <div className="space-y-2">
                      {results.scenarios.map((s, i) => (
                        <div key={i} className={`p-3 rounded-lg border ${i === 1 ? 'border-blue/25 bg-blue/[0.04]' : 'border-white/5'}`}>
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <span className="text-xs font-display font-bold text-white">{s.label}</span>
                              <span className="text-xs text-muted ml-2">({s.adoptionPct}% — {s.note})</span>
                            </div>
                            <span className={`font-display font-bold text-sm ${roiColor(s.roi)}`}>{s.roi}% ROI</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted">
                            <span>Annual: {fmtAUD(s.annualValue)}</span>
                            <span>Payback: {s.breakEven ? `${s.breakEven}mo` : 'Negative'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Model cost sensitivity */}
                  <Card className="p-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-1">Model Cost Impact</div>
                    <p className="text-xs text-muted mb-3">Same use case — different models. Shows how model choice affects your ROI.</p>
                    <div className="space-y-2">
                      {results.modelComparison.map((m, i) => {
                        const isSelected = Math.abs(MODEL_OPTIONS[i].costPerToken - inputs.costPerToken) < 0.0000001
                        return (
                          <div key={i} className={`p-3 rounded-lg border ${isSelected ? 'border-blue/30 bg-blue/[0.05]' : 'border-white/5'}`}>
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-xs font-display font-bold text-white leading-snug flex-1 pr-2">{m.label}</div>
                              <span className={`font-display font-bold text-sm flex-shrink-0 ${roiColor(m.annualROI)}`}>{m.annualROI}%</span>
                            </div>
                            <div className="flex justify-between text-xs text-muted">
                              <span>Monthly tokens: {fmtAUD(m.monthlyTokenCost)}</span>
                              <span>Net (5yr): {fmtAUD(m.fiveYearNet)}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <Link href="/model-selection" className="block text-center text-xs text-blue-bright hover:underline mt-3">
                      Full model selection guide →
                    </Link>
                  </Card>

                  <Button href="/pricing" variant="primary" className="w-full justify-center">
                    Enrol to Build This Use Case →
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-xs text-muted max-w-2xl mx-auto">
              <strong className="text-white">Disclaimer:</strong> Indicative estimates for planning purposes only.
              Actual ROI depends on use case design, data quality, adoption rate, and implementation approach.
              Not financial advice. Token prices are approximate — verify at provider pricing pages before committing.
              LeO AI recommends completing the full Module 9 ROI model for investment decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
