import fs from 'node:fs'

const key = process.env.ANTHROPIC_API_KEY
if (!key) { console.log('ANTHROPIC_API_KEY is not configured; skipping content refresh.'); process.exit(0) }

const sources = [
  'https://platform.openai.com/docs/models',
  'https://docs.anthropic.com/en/docs/about-claude/models/overview',
  'https://ai.google.dev/gemini-api/docs/models',
]
const extracts = []
for (const url of sources) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'LearningOnline.ai content freshness bot/1.0' } })
    if (!response.ok) throw new Error(String(response.status))
    const text = (await response.text())
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .slice(0, 18000)
    extracts.push(`SOURCE: ${url}\n${text}`)
  } catch (err) { console.warn(`[content-refresh] ${url}: ${err.message}`) }
}
if (!extracts.length) process.exit(0)

const path = 'data/ai-landscape.js'
const current = fs.readFileSync(path, 'utf8')
const prompt = `Maintain LearningOnline.ai's AI landscape reference. Update ONLY facts clearly supported by the official source extracts below. Do not change exports or schema, pricing, authentication, curriculum, or pedagogical framing. Return only the complete replacement JavaScript file. If nothing material changed, return the current file byte-for-byte.\n\nCURRENT FILE:\n${current}\n\nOFFICIAL SOURCES:\n${extracts.join('\n\n')}`

const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
  body: JSON.stringify({
    model: process.env.CONTENT_REFRESH_MODEL || 'claude-sonnet-4-5',
    max_tokens: 12000,
    temperature: 0,
    messages: [{ role: 'user', content: prompt }],
  }),
})
if (!response.ok) throw new Error(`Anthropic ${response.status}: ${await response.text()}`)
const body = await response.json()
const output = body.content?.filter((item) => item.type === 'text').map((item) => item.text).join('\n').trim()
if (!output || !output.includes('export') || output.includes('```')) throw new Error('Generated content failed validation')
if (output !== current.trim()) { fs.writeFileSync(path, `${output}\n`); console.log('AI landscape updated') } else { console.log('No material AI landscape change') }
