// pages/roi-calculator.js — Le On AI ROI Calculator
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Nav, Card, SectionLabel, Button } from '../components/ui'

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-AU')
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    hoursPerDay:    2,
    people:         10,
    dayRate:        500,
    complexity:     'medium',
    costPerToken:   0.000005,
    callsPerDay:    500,
    tokensPerCall:  2000,
  })

  const [results, setResults] = useState(null)

  const complexityMultiplier = { low: 0.6, medium: 1.0, high: 1.5 }

  useEffect(() => {
    calc()
  }, [inputs])

  const calc = () => {
    const { hoursPerDay, people, dayRate, complexity, costPerToken, callsPerDay, tokensPerCall } = inputs

    const hourlyRate       = dayRate / 8
    const annualManualCost = hoursPerDay * people * hourlyRate * 250
    const monthlyManualCost = annualManualCost / 12

    const dailyTokenCost   = callsPerDay * tokensPerCall * costPerToken
    const monthlyAICost    = dailyTokenCost * 30
    const annualAICost     = dailyTokenCost * 365

    const cmult            = complexityMultiplier[complexity]
    const implCost         = people * dayRate * 5 * cmult  // ~5 person-days impl per person affected
    const annualMaint      = annualAICost + (people * hourlyRate * 10) // AI cost + 10hr support/person

    const valueUnlockedAnnual = annualManualCost * 0.55 // 55% efficiency recovery (conservative)
    const netBenefitAnnual = valueUnlockedAnnual - annualAICost
    const fiveYrValue     = (valueUnlockedAnnual * 5) - implCost - (annualMaint * 5)
    const roi             = ((fiveYrValue) / (implCost + annualMaint * 5)) * 100

    setResults({
      monthlyManualCost,
      annualManualCost,
      monthlyAICost,
      annualAICost,
      implCost,
      valueUnlockedAnnual,
      netBenefitAnnual,
      fiveYrValue,
      roi,
    })
  }

  const set = (k) => (e) => {
    const val = e.target.type === 'range' || e.target.type === 'number'
      ? parseFloat(e.target.value) : e.target.value
    setInputs(p => ({ ...p, [k]: val }))
  }

  const SliderInput = ({ label, field, min, max, step = 1, prefix = '', suffix = '', format }) => (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">{label}</label>
        <span className="font-display font-bold text-blue-bright text-lg">
          {prefix}{format ? format(inputs[field]) : inputs[field]}{suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={inputs[field]}
        onChange={set(field)}
        className="w-full h-1.5 bg-white/10 rounded-full outline-none cursor-pointer accent-blue" />
      <div className="flex justify-between text-[10px] text-muted mt-1">
        <span>{prefix}{min}{suffix}</span><span>{prefix}{max}{suffix}</span>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>ROI Calculator — Le On AI</title></Head>
      <Nav />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>ROI Calculator</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">
              Calculate your AI ROI
            </h1>
            <p className="text-muted text-xl max-w-xl mx-auto">
              Adjust the inputs to model your organisation's specific situation. Results update in real time.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-6">Manual Work Profile</h3>
                <SliderInput label="Hours spent on manual tasks per person per day" field="hoursPerDay" min={0.5} max={8} step={0.5} suffix=" hrs" />
                <SliderInput label="Number of people affected" field="people" min={1} max={200} />
                <SliderInput label="Average day rate per person" field="dayRate" min={200} max={2000} step={50} prefix="$" />
                <div className="mb-2">
                  <label className="block text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Implementation Complexity</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low','medium','high'].map(c => (
                      <button key={c} onClick={() => setInputs(p => ({ ...p, complexity: c }))}
                        className={`py-2.5 rounded-lg font-display font-bold text-xs border transition-all capitalize ${
                          inputs.complexity === c
                            ? 'bg-blue border-blue text-white'
                            : 'border-white/10 text-muted hover:border-blue/40 hover:text-white'
                        }`}>
                        {c}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Low: simple automation · Medium: workflow integration · High: custom build + data work
                  </p>
                </div>
              </Card>

              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-6">AI Cost Profile</h3>
                <SliderInput label="AI API calls per day" field="callsPerDay" min={10} max={10000} step={10} />
                <SliderInput label="Average tokens per call (input + output)" field="tokensPerCall" min={500} max={10000} step={100} />
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">Cost per token (USD)</label>
                    <span className="font-display font-bold text-blue-bright">${inputs.costPerToken}</span>
                  </div>
                  <select value={inputs.costPerToken} onChange={set('costPerToken')}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue">
                    <option value={0.0000015}>$0.0000015 — GPT-4o-mini (input)</option>
                    <option value={0.000005}>$0.000005 — GPT-4o (input)</option>
                    <option value={0.000015}>$0.000015 — GPT-4o (output)</option>
                    <option value={0.000003}>$0.000003 — Claude Haiku</option>
                    <option value={0.000015}>$0.000015 — Claude Sonnet</option>
                    <option value={0.000001}>$0.000001 — Custom/fine-tuned</option>
                  </select>
                </div>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {results && (
                <>
                  <Card className="p-6 border-blue/20 bg-blue/[0.03]">
                    <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-4">Monthly Snapshot</div>
                    <div className="space-y-3">
                      {[
                        { label: 'Monthly manual cost', val: fmt(results.monthlyManualCost), color: 'text-red-400' },
                        { label: 'Monthly AI cost', val: fmt(results.monthlyAICost), color: 'text-amber-400' },
                        { label: 'Monthly value unlocked', val: fmt(results.valueUnlockedAnnual / 12), color: 'text-success' },
                        { label: 'Monthly net benefit', val: fmt(results.netBenefitAnnual / 12), color: results.netBenefitAnnual > 0 ? 'text-success' : 'text-red-400' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between items-center">
                          <span className="text-sm text-muted">{r.label}</span>
                          <span className={`font-display font-bold text-lg ${r.color}`}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-4">Annual View</div>
                    <div className="space-y-3">
                      {[
                        { label: 'Annual manual cost (current)', val: fmt(results.annualManualCost), color: 'text-red-400' },
                        { label: 'Annual AI operating cost', val: fmt(results.annualAICost), color: 'text-amber-400' },
                        { label: 'Annual value unlocked (55%)', val: fmt(results.valueUnlockedAnnual), color: 'text-success' },
                        { label: 'Implementation cost (one-time)', val: fmt(results.implCost), color: 'text-white' },
                      ].map(r => (
                        <div key={r.label} className="flex justify-between items-center">
                          <span className="text-sm text-muted">{r.label}</span>
                          <span className={`font-display font-bold ${r.color}`}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 bg-success/5 border-success/25">
                    <div className="text-xs font-display font-bold text-success uppercase tracking-wider mb-4">5-Year Financial Summary</div>
                    <div className="mb-4">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm text-muted">5-Year Net Benefit</span>
                        <span className={`font-display font-black text-3xl ${results.fiveYrValue > 0 ? 'text-success' : 'text-red-400'}`}>
                          {fmt(results.fiveYrValue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm text-muted">5-Year ROI</span>
                        <span className={`font-display font-black text-2xl ${results.roi > 0 ? 'text-success' : 'text-red-400'}`}>
                          {Math.round(results.roi)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      Conservative estimate assuming 55% efficiency recovery and standard maintenance costs. 
                      Actual results vary by use case, adoption rate, and implementation quality.
                    </p>
                  </Card>

                  <Card className="p-5">
                    <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Assumptions</div>
                    <div className="space-y-1 text-xs text-muted">
                      <div>• 55% efficiency recovery (conservative; typical range 40–75%)</div>
                      <div>• 250 working days per year</div>
                      <div>• Implementation = ~5 person-days × complexity multiplier</div>
                      <div>• Annual maintenance includes AI costs + 10hr/person support</div>
                      <div>• No adoption failure discount applied</div>
                    </div>
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
              This calculator provides indicative estimates for planning purposes. Actual ROI depends on use case design, 
              adoption rate, data quality, and implementation approach. Le On AI recommends building a full 5-year model 
              using the Module 4 financial template for investment decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
