// Reviewed 2026-11-23. Parent-facing activities; content-only additions.
// Preserve existing p-l1..p-l9 IDs and completion semantics.
export const PARENT_REFRESH_REVIEWED = '23 November 2026'
const ACTIVITIES = [
  {
    "id": "p-l1",
    "title": "Try it together: How can we check an AI answer?",
    "exercise": "Ask a parent-operated or school-approved AI tool to explain why the sky looks blue. Find a trustworthy science source and compare one claim. Ask: What was useful? What needed checking?",
    "caution": "AI can sometimes check facts using tools, but confident language is not proof of accuracy. Children should not be required to create accounts."
  },
  {
    "id": "p-l2",
    "title": "Conversation starter: What are kids actually using?",
    "exercise": "Ask: Which AI tools have you seen? What do your friends use them for? What would you like help learning? Listen before setting rules.",
    "caution": "Do not assume every child uses the same tools or treat illustrative age ranges as research findings. Check minimum ages and consent requirements."
  },
  {
    "id": "p-l3",
    "title": "Benefits and risks: Try the same task two ways",
    "exercise": "Use a fictional science question. First ask for a complete answer; then ask for three hints and explain the solution independently. Compare what you learned.",
    "caution": "A useful response is not the same as independent learning. Follow school assessment and disclosure rules."
  },
  {
    "id": "p-l4",
    "title": "Privacy and synthetic examples",
    "exercise": "Rewrite a fictional prompt containing a student name, school, timetable and report into a non-identifying request for generic study advice.",
    "caution": "Never upload student identifiers, private messages, health details, school records or classmates' images to an unapproved tool."
  },
  {
    "id": "p-l5",
    "title": "The five-minute family conversation",
    "exercise": "Ask: What do you like about AI? When has it been wrong? What would you do if a chatbot told you to keep a secret? Agree on one trusted adult to approach.",
    "caution": "A child should feel able to report uncomfortable, manipulative or harmful AI interactions without fear of punishment."
  },
  {
    "id": "p-l6",
    "title": "A practical homework agreement",
    "exercise": "For a fictional Year 7 maths problem, request hints, solve it yourself, and explain the reasoning without AI. Agree when AI must be acknowledged.",
    "caution": "Do not submit AI-generated work as original when school rules prohibit it. Ask teachers about permitted use."
  },
  {
    "id": "p-l7",
    "title": "Write a family AI agreement",
    "exercise": "Agree on age-appropriate tools, school rules, privacy, source checking, trusted adults, and offline time. Put a reminder in your family calendar to revisit in four weeks.",
    "caution": "Family rules should evolve with age and school guidance. Do not treat one provider's safety settings as a guarantee."
  },
  {
    "id": "p-l8",
    "title": "Deepfake and misinformation check",
    "exercise": "Discuss a clearly labelled synthetic headline or image. Ask who made it, where the original source is, and whether another independent source corroborates it.",
    "caution": "Do not create or share impersonating, humiliating or intimate images of real people."
  },
  {
    "id": "p-l9",
    "title": "Chatbots are tools, not trusted adults",
    "exercise": "Use a fictional scenario in which a chatbot offers overly confident personal advice. Practise responding: I will talk to a parent, teacher or other trusted adult.",
    "caution": "AI companions can feel personal but cannot replace human support. If someone is in immediate danger in Australia, call 000."
  }
]
const sources = [
  ['Australian eSafety Commissioner — parents and carers', 'https://www.esafety.gov.au/parents'],
  ['NSW Government — safe AI for families', 'https://www.nsw.gov.au/education-and-training/digital-citizenship/parents-and-carers/safe-ai'],
  ['UNESCO — generative AI in education and research', 'https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research'],
]
const safe = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
export const PARENT_REFRESH_BY_ID = Object.fromEntries(ACTIVITIES.map(a => [a.id,
  '<section class="mt-8 p-5 rounded-xl border border-blue/30 bg-blue/5" aria-label="Family activity">' +
  '<p class="text-xs font-bold uppercase tracking-wide">Family activity · reviewed ' + PARENT_REFRESH_REVIEWED + '</p>' +
  '<h3>' + safe(a.title) + '</h3><p><strong>Try together:</strong> ' + safe(a.exercise) + '</p>' +
  '<p><strong>Safety and school check:</strong> ' + safe(a.caution) + '</p>' +
  '<p class="text-sm">Sources: ' + sources.map(([name,url]) => '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + safe(name) + '</a>').join(' · ') + '</p></section>'
]))
