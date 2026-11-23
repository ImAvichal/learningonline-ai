// Source-level contract checks for the paid Starting the Journey curriculum.
// No network, customer accounts, Stripe calls or Supabase mutation required.
import { readFileSync } from 'node:fs'

async function loadSelfContainedModule(path) {
  const code = readFileSync(path, 'utf8')
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
}

const { MODULES, getLessonsForTier } = await loadSelfContainedModule('data/modules.js')
const { JOURNEY_PRACTICE, JOURNEY_MODULE_IDS, JOURNEY_LESSON_PROMPTS } = await loadSelfContainedModule('data/journey-practice.js')
const expectedModuleNumbers = [1,2,3,4,5,6,7,8,9,12]
const expectedModuleIds = expectedModuleNumbers.map(n => `module-${n}`)
const journey = getLessonsForTier('journey')
const pro = getLessonsForTier('pro')
const parents = getLessonsForTier('parents')
const workbookSource = readFileSync('pages/journey-guide.js', 'utf8')
const checks = [
  ['Journey workbook uses consecutive 01–10 numbering independent of full-curriculum IDs', workbookSource.includes('String(idx + 1).padStart') && workbookSource.includes('JOURNEY MODULE')],
  ['Journey workbook explains missing full-curriculum modules 10 and 11', workbookSource.includes('Modules 10 (Responsible AI) and 11 (Sustainability') && workbookSource.includes('full curriculum Module 12')],

  ['Exactly ten Journey modules are defined', expectedModuleIds.length === 10 && expectedModuleIds.every(id => JOURNEY_MODULE_IDS.includes(id)) && JOURNEY_MODULE_IDS.length === 10],
  ['All ten Journey modules exist in source', expectedModuleIds.every(id => MODULES.some(m => m.id === id))],
  ['Exactly thirteen current Journey lessons are accessible', journey.length === 13],
  ['Journey never unlocks an enterprise lesson', journey.every(l => l.tier === 'individual' || l.tier === 'smb')],
  ['Pro contains all Journey lessons', journey.every(l => pro.some(p => p.id === l.id))],
  ['Pro offers more than Journey', pro.length > journey.length],
  ['Free Parents does not unlock paid module lessons', parents.length === 0],
  ['All ten practice activities are genuinely usable', expectedModuleIds.every(id => {
    const a = JOURNEY_PRACTICE[id]
    return a && a.title && a.objective && a.time && a.evidence && a.reflection && a.steps?.length === 4
      && a.steps.every(step => step.length > 30)
  })],
  ['Every Journey module has a practical activity', expectedModuleIds.every(id => journey.some(l => l.moduleId === id) && JOURNEY_PRACTICE[id])],
  ['Every Journey lesson has one specific practice prompt', journey.every(l => typeof JOURNEY_LESSON_PROMPTS[l.id] === 'string' && JOURNEY_LESSON_PROMPTS[l.id].length > 45)
    && Object.keys(JOURNEY_LESSON_PROMPTS).length === journey.length],
]
let failed = false
for (const [label, passed] of checks) {
  console.log(`${passed ? '✓' : '✗'} ${label}`)
  if (!passed) failed = true
}
if (failed) process.exitCode = 1
