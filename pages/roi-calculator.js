// pages/roi-calculator.js — ROI Calculator with updated spec
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Nav, Card, SectionLabel, Button } from '../components/ui'
import Link from 'next/link'

const COMPLEXITY = {
  low:    { label: 'Low',    tokens: 50000,   improvement: 0.20, desc: '~50K tokens/month · 20% efficiency gain' },
  medium: { label: 'Medium', tokens: 250000,  improvement: 0.35, desc: '~250K tokens/month · 35% efficiency gain' },
  high:   { label: 'High',   tokens: 1000000, improvement: 0.50, desc: '~1M tokens/month · 50% efficiency gain' },
}

const fmt   = (n) => '$' + Math.round(n).toLocaleString('en-AU')
const fmtK  = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : fmt(n)

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    hoursPerDay:   2,
    people:        10,
    dayRate:       500,
    complexity:    'medium',
    costPerToken:  0.000005,
  })
  const [results, setResults] = useState(null)

  useEffect(() => { calc() }, [inputs])

  const calc = () => {
    const { hoursPerDay, people, dayRate, complexity, costPerToken } = inputs
    const cx = COMPLEXITY[complexity]
    const hourlyRate = dayRate / 8

    // Monthly effort cost (current manual cost)
    const monthlyEffortCost = hoursPerDay * people * hourlyRate * 22 // 22 working days

    // AI cost
    const monthlyAICost = cx.tokens * costPerToken

    // Value unlocked — improvement applied to monthly effort
    const valueUnlocked = monthlyEffortCost * cx.improvement

    // Net benefit
    const netBenefit = valueUnlocked - monthlyAICost

    // Annual
    const annualBenefit = netBenefit * 12

    setResults({ monthlyEffortCost, monthlyAICost, valueUnlocked, netBenefit, annualBenefit })
  }

  const set = (k) => (e) => {
    const val = e.target.type === 'range' || e.target.type === 'number'
      ? parseFloat(e.target.value) : e.target.value
    setInputs(p => ({ ...p, [k]: val }))
  }

  const Slider = ({ label, field, min, max, step = 1, prefix = '', suffix = '' }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">{label}</label>
        <span className="font-display font-bold text-blue-bright text-xl">
          {prefix}{inputs[field].toLocaleString()}{suffix}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={inputs[field]}
        onChange={set(field)}
        className="w-full h-1.5 bg-white/10 rounded-full outline-none cursor-pointer accent-blue" />
      <div className="flex justify-between text-[10px] text-muted mt-1">
        <span>{prefix}{min}{suffix}</span><span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>ROI Calculator — Le On AI</title></Head>
      <Nav />
      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>ROI Calculator</SectionLabel>
            <h1 className="font-display font-black text-5xl tracking-tight mb-4">Calculate your AI ROI</h1>
            <p className="text-muted text-lg max-w-xl mx-auto">
              Adjust the inputs below to model your specific situation. Results update instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Inputs */}
            <div>
              <Card className="p-7 mb-5">
                <h3 className="font-display font-bold text-base mb-6">Your Current Situation</h3>
                <Slider label="Hours spent on manual tasks per person per day" field="hoursPerDay" min={0.5} max={8} step={0.5} suffix=" hrs" />
                <Slider label="Number of people affected" field="people" min={1} max={500} />
                <Slider label="Day rate per person" field="dayRate" min={200} max={2000} step={50} prefix="$" />
              </Card>

              <Card className="p-7 mb-5">
                <h3 className="font-display font-bold text-base mb-6">Implementation Complexity</h3>
                <div className="space-y-3">
                  {Object.entries(COMPLEXITY).map(([key, cx]) => (
                    <button key={key} onClick={() => setInputs(p => ({ ...p, complexity: key }))}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        inputs.complexity === key
                          ? 'border-blue/50 bg-blue/10'
                          : 'border-white/10 hover:border-blue/30'
                      }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${inputs.complexity === key ? 'border-blue bg-blue' : 'border-white/30'}`}>
                          {inputs.complexity === key && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="font-display font-bold text-sm text-white capitalize">{cx.label}</div>
                          <div className="text-xs text-muted">{cx.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-7">
                <h3 className="font-display font-bold text-base mb-6">Token Cost</h3>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-display font-bold text-muted uppercase tracking-wider">Cost per token (USD)</label>
                    <span className="font-display font-bold text-blue-bright">${inputs.costPerToken}</span>
                  </div>
                  <select value={inputs.costPerToken} onChange={set('costPerToken')}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-blue">
                    <option value={0.0000015}>$0.0000015 — GPT-4o-mini / Claude Haiku (input)</option>
                    <option value={0.000005}>$0.000005 — GPT-4o (input)</option>
                    <option value={0.000015}>$0.000015 — GPT-4o (output) / Claude Sonnet</option>
                    <option value={0.000001}>$0.000001 — Fine-tuned / Open source model</option>
                  </select>
                  <p className="text-xs text-muted mt-2">
                    Token assumption: {COMPLEXITY[inputs.complexity].tokens.toLocaleString()} tokens/month ({inputs.complexity} complexity)
                  </p>
                </div>
              </Card>
            </div>

            {/* Results */}
            {results && (
              <div className="space-y-4">
                <Card className="p-6 border-white/10">
                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-5">Monthly Summary</div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted">Monthly effort cost (current)</span>
                        <span className="font-display font-bold text-red-400">{fmtK(results.monthlyEffortCost)}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400/50 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted">Monthly AI cost</span>
                        <span className="font-display font-bold text-amber-400">{fmtK(results.monthlyAICost)}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400/50 rounded-full"
                          style={{ width: `${Math.min(100, (results.monthlyAICost / results.monthlyEffortCost) * 100)}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted">Value unlocked</span>
                        <span className="font-display font-bold text-success">{fmtK(results.valueUnlocked)}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-success/50 rounded-full"
                          style={{ width: `${Math.min(100, (results.valueUnlocked / results.monthlyEffortCost) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className={`p-6 ${results.netBenefit > 0 ? 'border-success/30 bg-success/5' : 'border-red-400/30 bg-red-400/5'}`}>
                  <div className="text-xs font-display font-bold uppercase tracking-wider mb-3 text-muted">Monthly Net Benefit</div>
                  <div className={`font-display font-black text-4xl mb-1 ${results.netBenefit > 0 ? 'text-success' : 'text-red-400'}`}>
                    {results.netBenefit > 0 ? '' : '−'}{fmtK(Math.abs(results.netBenefit))}
                  </div>
                  <div className="text-sm text-muted">per month</div>
                </Card>

                <Card className="p-6 border-blue/20 bg-blue/5">
                  <div className="text-xs font-display font-bold text-blue-bright uppercase tracking-wider mb-3">Annual Benefit</div>
                  <div className="font-display font-black text-3xl text-white mb-1">
                    {fmtK(results.annualBenefit)}
                  </div>
                  <div className="text-sm text-muted">projected annual net benefit</div>
                </Card>

                <Card className="p-5">
                  <div className="text-xs font-display font-bold text-muted uppercase tracking-wider mb-3">Assumptions</div>
                  <div className="space-y-1 text-xs text-muted">
                    <div>• 22 working days per month</div>
                    <div>• Complexity: {COMPLEXITY[inputs.complexity].label} — {COMPLEXITY[inputs.complexity].improvement * 100}% efficiency improvement</div>
                    <div>• Token usage: {COMPLEXITY[inputs.complexity].tokens.toLocaleString()}/month</div>
                    <div>• No implementation or setup costs included</div>
                  </div>
                </Card>

                <Button href="/pricing" variant="primary" className="w-full justify-center">
                  Enrol to Build This Use Case →
                </Button>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <p className="text-xs text-muted max-w-2xl mx-auto">
              <strong className="text-white">Disclaimer:</strong> This calculator provides indicative estimates for planning purposes only.
              Actual ROI depends on use case design, data quality, adoption rate, and implementation approach.
              Results should not be relied upon as financial advice. Le On AI recommends completing a full
              cost-benefit analysis using the Module 9 ROI template before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
