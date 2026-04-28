// pages/roi-calculator.js — Enhanced ROI Calculator
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Nav, Card, SectionLabel, Button } from '../components/ui'
import Link from 'next/link'

const COMPLEXITY = {
  low:    { label:'Low',    tokens:50000,   improvement:0.20, desc:'Simple automation · 50K tokens/month · 20% efficiency gain' },
  medium: { label:'Medium', tokens:250000,  improvement:0.35, desc:'Workflow integration · 250K tokens/month · 35% efficiency gain' },
  high:   { label:'High',   tokens:1000000, improvement:0.50, desc:'Custom build + data work · 1M tokens/month · 50% efficiency gain' },
}

const MODELS = [
  { label:'GPT-4o-mini / Claude Haiku (efficient)',   value:0.00000015 },
  { label:'GPT-4o / Claude Sonnet (frontier)',        value:0.0000025  },
  { label:'Gemini 1.5 Flash (fastest)',               value:0.000000075},
  { label:'Mixed model strategy (recommended)',        value:0.0000005  },
]

const fmtAUD = (n) => {
  if (!isFinite(n) || isNaN(n)) return '$0'
  if (Math.abs(n) >= 1000000) return '$' + (n/1000000).toFixed(1) + 'M'
  if (Math.abs(n) >= 1000) return '$' + Math.round(n).toLocaleString('en-AU')
  return '$' + Math.round(n).toLocaleString('en-AU')
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    hoursPerDay:  2,
    people:       10,
    dayRate:      500,
    complexity:   'medium',
    costPerToken: 0.0000005,
    implCost:     25000,
    adoptionRate: 75,
  })
  const [results, setResults] = useState(null)

  useEffect(() => { calc() }, [inputs])

  const calc = () => {
    const { hoursPerDay, people, dayRate, complexity, costPerToken, implCost, adoptionRate } = inputs
    const cx = COMPLEXITY[complexity]
    const hourlyRate = dayRate / 8
    const adoption = adoptionRate / 100

    // Monthly effort cost (current)
    const monthlyManualCost = hoursPerDay * people * hourlyRate * 22

    // AI token cost monthly
    const monthlyAICost = cx.tokens * costPerToken

    // Annual maintenance (AI cost + support estimate)
    const annualMaintenance = (monthlyAICost * 12) + (people * hourlyRate * 10)

    // Value unlocked (improvement × adoption × manual cost)
    const monthlyValueUnlocked = monthlyManualCost * cx.improvement * adoption
    const annualValue = monthlyValueUnlocked * 12

    // Net benefit
    const monthlyNetBenefit = monthlyValueUnlocked - monthlyAICost
    const annualNetBenefit  = monthlyNetBenefit * 12

    // 5-year
    const fiveYearCost    = implCost + (annualMaintenance * 5)
    const fiveYearValue   = annualValue * 5
    const fiveYearNet     = fiveYearValue - fiveYearCost
    const roi             = fiveYearCost > 0 ? ((fiveYearNet / fiveYearCost) * 100) : 0

    // Break-even (months)
    const breakEvenMonths = monthlyNetBenefit > 0
      ? Math.ceil(implCost / monthlyNetBenefit)
      : null

    // Payback narrative
    const paybackText = breakEvenMonths === null
      ? 'Negative return — reconsider approach'
      : breakEvenMonths <= 3
      ? `Exceptional — payback in ${breakEvenMonths} month${breakEvenMonths === 1 ? '' : 's'}`
      : breakEvenMonths <= 12
      ? `Strong — payback in ${breakEvenMonths} months`
      : breakEvenMonths <= 24
      ? `Acceptable — payback in ${breakEvenMonths} months`
      : `Long payback (${breakEvenMonths} months) — reassess use case`

    // Sensitivity scenarios
    const scenarios = [
      { label:'Conservative', adoption: 0.50, rate: '50% adoption' },
      { label:'Base',         adoption: adoption, rate: `${adoptionRate}% adoption` },
      { label:'Target',       adoption: 1.00, rate: '100% adoption' },
    ].map(s => {
      const val  = monthlyManualCost * cx.improvement * s.adoption * 12 * 5
      const net  = val - fiveYearCost
      const r    = fiveYearCost > 0 ? Math.round((net / fiveYearCost) * 100) : 0
      const bkev = (monthlyManualCost * cx.improvement * s.adoption - monthlyAICost) > 0
        ? Math.ceil(implCost / (monthlyManualCost * cx.improvement * s.adoption - monthlyAICost))
        : null
      return { ...s, fiveYearValue: val, fiveYearNet: net, roi: r, breakEven: bkev }
    })

    setResults({ monthlyManualCost, monthlyAICost, monthlyValueUnlocked, monthlyNetBenefit, annualValue, annualNetBenefit, fiveYearCost, fiveYearValue, fiveYearNet, roi, breakEvenMonths, paybackText, scenarios, annualMaintenance })
  }

  const set = (k) => (e) => {
    const val = e.target.type === 'range' || e.target.type === 'number'
      ? parseFloat(e.target.value) : e.target.value
    setInputs(p => ({ ...p, [k]: val }))
  }

  const Slider = ({ label, field, min, max, step = 1, prefix = '', suffix = '', format }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">{label}</label>
        <span className="font-display font-bold text-blue-bright text-lg">
          {prefix}{format ? format(inputs[field]) : Number(inputs[field]).toLocaleString()}{suffix}
        </span>
      </div>
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
        <title>AI ROI Calculator — Le On AI</title>
        <meta name="description" content="Calculate the ROI of your AI investment. Monthly cost, value unlocked, break-even timeline, and 5-year financial model." />
      </Head>
      <Nav />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>ROI Calculator</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">Calculate Your AI ROI</h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Model your investment before you commit. Includes break-even timeline,
              5-year projection, and sensitivity analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Inputs */}
            <div className="space-y-5">
              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-6">Current Situation</h3>
                <Slider label="Hours on manual tasks per person per day" field="hoursPerDay" min={0.5} max={8} step={0.5} suffix=" hrs" />
                <Slider label="Number of people affected" field="people" min={1} max={500} />
                <Slider label="Day rate per person (AUD)" field="dayRate" min={200} max={2000} step={50} prefix="$" />
                <Slider label="Expected adoption rate" field="adoptionRate" min={10} max={100} suffix="%" />
              </Card>

              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-5">Implementation Complexity</h3>
                <div className="space-y-3 mb-5">
                  {Object.entries(COMPLEXITY).map(([key, cx]) => (
                    <button key={key} onClick={() => setInputs(p => ({ ...p, complexity: key }))}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${inputs.complexity === key ? 'border-blue/50 bg-blue/10' : 'border-white/10 hover:border-blue/30'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${inputs.complexity === key ? 'border-blue bg-blue' : 'border-white/30'}`}>
                          {inputs.complexity === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-white">{cx.label}</div>
                          <div className="text-xs text-muted">{cx.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <Slider label="Estimated implementation cost (AUD)" field="implCost" min={5000} max={200000} step={5000} prefix="$" format={n => n.toLocaleString()} />
              </Card>

              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-4">AI Model Cost</h3>
                <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Model tier selection</label>
                <select value={inputs.costPerToken} onChange={set('costPerToken')}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue mb-3">
                  {MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <p className="text-xs text-muted">
                  Token assumption: {COMPLEXITY[inputs.complexity].tokens.toLocaleString()} tokens/month ({inputs.complexity} complexity)
                </p>
                <p className="text-xs text-muted mt-1">
                  Estimated monthly AI cost: <strong className="text-white">{fmtAUD(COMPLEXITY[inputs.complexity].tokens * inputs.costPerToken)}</strong>
                </p>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {results && (
                <>
                  {/* Monthly summary */}
                  <Card className="p-6">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Monthly Snapshot</div>
                    <div className="space-y-3">
                      {[
                        { label:'Current monthly manual cost',   val: results.monthlyManualCost,     color:'text-red-400' },
                        { label:'Monthly AI running cost',       val: results.monthlyAICost,          color:'text-amber-400' },
                        { label:'Monthly value unlocked',        val: results.monthlyValueUnlocked,   color:'text-success' },
                        { label:'Monthly net benefit',           val: results.monthlyNetBenefit,      color: results.monthlyNetBenefit > 0 ? 'text-success' : 'text-red-400' },
                      ].map(r => (
                        <div key={r.label} className="flex items-center justify-between">
                          <span className="text-sm text-muted">{r.label}</span>
                          <span className={`font-display font-bold text-lg ${r.color}`}>{fmtAUD(r.val)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Break-even */}
                  <Card className={`p-6 ${results.breakEvenMonths && results.breakEvenMonths <= 12 ? 'border-success/30 bg-success/[0.03]' : 'border-white/8'}`}>
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-2">Break-Even Timeline</div>
                    <div className={`font-display font-black text-3xl mb-1 ${results.breakEvenMonths && results.breakEvenMonths <= 12 ? 'text-success' : results.breakEvenMonths ? 'text-amber-400' : 'text-red-400'}`}>
                      {results.breakEvenMonths ? `${results.breakEvenMonths} months` : 'Negative ROI'}
                    </div>
                    <p className="text-xs text-muted">{results.paybackText}</p>
                  </Card>

                  {/* 5-year */}
                  <Card className="p-6 border-blue/20 bg-blue/[0.03]">
                    <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-3">5-Year Financial Model</div>
                    <div className="space-y-2 mb-4">
                      {[
                        { label:'5-Year total cost',   val: results.fiveYearCost,  color:'text-red-400' },
                        { label:'5-Year total value',  val: results.fiveYearValue, color:'text-success' },
                        { label:'5-Year net benefit',  val: results.fiveYearNet,   color: results.fiveYearNet > 0 ? 'text-success' : 'text-red-400' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between">
                          <span className="text-sm text-muted">{r.label}</span>
                          <span className={`font-display font-bold ${r.color}`}>{fmtAUD(r.val)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                      <span className="font-display font-bold text-white">5-Year ROI</span>
                      <span className={`font-display font-black text-3xl ${results.roi > 0 ? 'text-success' : 'text-red-400'}`}>{Math.round(results.roi)}%</span>
                    </div>
                  </Card>

                  {/* Sensitivity */}
                  <Card className="p-6">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Sensitivity Analysis</div>
                    <div className="space-y-3">
                      {results.scenarios.map((s, i) => (
                        <div key={i} className={`p-3 rounded-lg border ${i === 1 ? 'border-blue/25 bg-blue/[0.04]' : 'border-white/5'}`}>
                          <div className="flex justify-between items-center mb-1">
                            <div>
                              <span className="text-xs font-display font-bold text-white">{s.label}</span>
                              <span className="text-xs text-muted ml-2">({s.rate})</span>
                            </div>
                            <span className={`font-display font-bold text-sm ${s.roi > 0 ? 'text-success' : 'text-red-400'}`}>{s.roi}% ROI</span>
                          </div>
                          <div className="flex justify-between text-xs text-muted">
                            <span>Net: {fmtAUD(s.fiveYearNet)}</span>
                            <span>Payback: {s.breakEven ? `${s.breakEven}mo` : 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Button href="/pricing" variant="primary" className="w-full justify-center">
                    Enrol to Build This Use Case →
                  </Button>
                  <Link href="/model-selection" className="block text-center text-sm text-blue-bright hover:underline">
                    Need help selecting the right model? →
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-xs text-muted max-w-2xl mx-auto">
              <strong className="text-white">Disclaimer:</strong> This calculator provides indicative estimates for planning purposes only.
              Actual ROI depends on use case design, data quality, adoption rate, and implementation approach.
              Not financial advice. Le On AI recommends completing a full cost-benefit analysis using the Module 9 ROI template before making investment decisions.
              Token prices are approximate and subject to change — verify at provider pricing pages.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
