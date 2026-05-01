// pages/parents.js — AI for Parents (Free Module)
// Access: requires login, no paid tier needed
// Additive new page — no existing files modified except nav + homepage + dashboard

import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Nav, Card, SectionLabel, Reveal, Button, Spinner, LessonFeedback } from '../components/ui'
import { useAuth } from '../lib/auth'

// ─────────────────────────────────────────────────────────────────────────────
// MODULE CONTENT
// ─────────────────────────────────────────────────────────────────────────────

const LESSONS = [
  {
    id: 'p-l1',
    number: 1,
    title: 'What AI Actually Is — For Parents',
    duration: '8 min',
    icon: '🧠',
    content: `<h2>AI in plain language — no tech background needed</h2>
<p>Artificial Intelligence is software that learns from patterns. When your child uses ChatGPT to help write an essay, or asks Siri a question, or plays a game that adapts to their skill level — that's AI. It's not magic. It's not a person. It's a very sophisticated pattern-matching system that has been trained on enormous amounts of text, images, or other data.</p>
<p>The most important thing to understand as a parent: <strong>AI does not think or feel.</strong> It predicts what the most useful response would be, based on patterns it learned. This distinction matters enormously when your child forms a relationship with it.</p>

<h3>The Three Types Your Child Will Encounter</h3>
<table>
<thead><tr><th>Type</th><th>Examples</th><th>What It Does</th><th>Common Use by Kids</th></tr></thead>
<tbody>
<tr><td><strong>Chatbots & Assistants</strong></td><td>ChatGPT, Claude, Gemini, Siri, Alexa</td><td>Answers questions, generates text, holds conversations</td><td>Homework help, creative writing, questions about life</td></tr>
<tr><td><strong>Creative AI</strong></td><td>DALL-E, Midjourney, Canva AI, Spotify AI</td><td>Generates images, music, designs from descriptions</td><td>Creating art, making music, designing things</td></tr>
<tr><td><strong>Recommendation AI</strong></td><td>YouTube, TikTok, Netflix, Instagram</td><td>Predicts what you'll want to watch or read next</td><td>Every social media and streaming platform — this is the most pervasive</td></tr>
</tbody>
</table>

<h3>What AI Can and Cannot Do</h3>
<table>
<thead><tr><th>AI CAN</th><th>AI CANNOT</th></tr></thead>
<tbody>
<tr><td>Generate text that sounds confident and human</td><td>Know if what it says is true</td></tr>
<tr><td>Answer almost any question</td><td>Tell the difference between a right answer and a plausible-sounding wrong one</td></tr>
<tr><td>Adapt to your child's communication style</td><td>Genuinely care about your child's wellbeing</td></tr>
<tr><td>Be available 24/7</td><td>Replace human connection, empathy, or judgment</td></tr>
<tr><td>Help with almost any creative or intellectual task</td><td>Guarantee accuracy — it makes things up confidently</td></tr>
</tbody>
</table>

<h3>Key Insights</h3>
<ul>
<li><strong>AI is already in your home.</strong> If your family uses YouTube, TikTok, Netflix, or any voice assistant — your children are already interacting with AI daily.</li>
<li><strong>The "sounds confident" problem.</strong> AI generates responses that sound authoritative even when they're wrong. Children (and adults) instinctively trust confident answers. This is the #1 literacy issue to address.</li>
<li><strong>AI feels like a friend.</strong> Chatbots are designed to be warm, patient, and responsive. Children can form emotional attachments to AI in ways that deserve parental awareness — not panic, but awareness.</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Parents who understand what AI is — even at a basic level — have far more productive conversations with their children about it than parents who approach it with fear or dismissal.</p>
<p><strong>Example:</strong> A parent discovered their 13-year-old had been using ChatGPT to help write creative stories for months. Rather than reacting with alarm, the parent — who had taken 20 minutes to understand what ChatGPT is — was able to ask: "What do you like about using it? What does it do well? What does it do badly?" The conversation became collaborative rather than confrontational. The child ended up explaining the limitations of AI to their parent — which built exactly the critical thinking skills the parent was hoping for.</p>
<p><strong>Why it matters:</strong> Your children will use AI regardless of whether you engage with it. The question is whether they'll use it thoughtfully or blindly. Your engagement determines which.</p>
<p><strong>What parents should do:</strong> Spend 30 minutes this week trying ChatGPT or Claude yourself. Ask it something you know the answer to. Notice when it's right, when it's overconfident, and when it's wrong. You will have better conversations with your child from a place of personal experience.</p>
<p><strong>What this prevents:</strong> Children forming uncritical dependence on AI for answers — treating it as infallible rather than as a useful but fallible tool.</p>
</div>`,
  },
  {
    id: 'p-l2',
    number: 2,
    title: 'How Kids Are Using AI Right Now',
    duration: '10 min',
    icon: '👧',
    content: `<h2>What your children are actually doing with AI</h2>
<p>Understanding how kids use AI — not how adults fear they use it — is essential for having useful conversations at home. The reality is more nuanced, more varied, and in many ways more interesting than the headlines suggest.</p>

<h3>The 6 Ways Kids Use AI Most Commonly</h3>
<table>
<thead><tr><th>Use</th><th>What It Looks Like</th><th>Age Group</th><th>Parents Often Know?</th></tr></thead>
<tbody>
<tr><td><strong>Homework assistance</strong></td><td>Asking AI to explain a concept, help structure an essay, check maths working, translate text</td><td>10+</td><td>Sometimes</td></tr>
<tr><td><strong>Creative projects</strong></td><td>Co-writing stories, generating game ideas, creating art, composing music, building characters</td><td>8+</td><td>Rarely</td></tr>
<tr><td><strong>Social/emotional conversations</strong></td><td>Talking to AI about problems, feelings, social situations — especially when they don't want to talk to a person</td><td>12+</td><td>Almost never</td></tr>
<tr><td><strong>Learning and curiosity</strong></td><td>Deep-diving topics: "How does a black hole work?" "Why did Rome fall?" "What happens when you die?"</td><td>10+</td><td>Sometimes</td></tr>
<tr><td><strong>Gaming and entertainment</strong></td><td>AI-generated game characters, AI NPCs, AI opponents that adapt — this is now mainstream in gaming</td><td>8+</td><td>Rarely</td></tr>
<tr><td><strong>Social media consumption</strong></td><td>The recommendation algorithms on TikTok, YouTube, and Instagram are AI — this is the most pervasive use</td><td>All ages</td><td>Often not framed as "AI"</td></tr>
</tbody>
</table>

<h3>The Homework Question — What's Actually Happening</h3>
<p>The most common parental concern is AI doing homework. The reality is more complex than "cheating vs not cheating":</p>
<ul>
<li><strong>Some children use AI to avoid thinking</strong> — copying outputs without understanding. This is a genuine concern.</li>
<li><strong>Some children use AI as a tutor</strong> — asking it to explain concepts they didn't understand in class, then doing the work themselves. This is genuinely useful.</li>
<li><strong>Most children do both</strong> — depending on the subject, the deadline, and how much they care about the task.</li>
</ul>
<p>The useful question is not "did you use AI?" but "do you understand this?" If your child can explain what they submitted in their own words, the learning happened. If they can't, it didn't — regardless of whether AI was involved.</p>

<h3>The Emotional Support Pattern — Worth Knowing</h3>
<p>A growing number of teenagers use AI chatbots for emotional support — to process feelings, talk through social situations, or discuss things they're embarrassed to raise with adults. This is not inherently concerning, but it warrants awareness:</p>
<ul>
<li>AI is patient, never judges, and never gets frustrated — qualities that can be appealing to teenagers who fear disappointing the people around them</li>
<li>AI cannot assess risk — it cannot identify when a child needs real support versus conversation</li>
<li>The behaviour is not a sign that your child doesn't trust you — it may be a sign they're navigating something they're not ready to share</li>
</ul>

<h3>Key Insights</h3>
<ul>
<li>Your child's AI use is almost certainly more varied and thoughtful than you'd assume without asking.</li>
<li>The most important thing is not what tools they use — it's the habits of mind they're developing while using them.</li>
<li>Schools are behind on this. Most children are navigating AI norms with minimal guidance from adults.</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Parents who ask curious, open questions about their children's AI use consistently report learning things they didn't expect — and finding more opportunity than risk.</p>
<p><strong>Example:</strong> A parent of a 15-year-old assumed AI use was limited to essay writing. In a 20-minute dinner conversation, they discovered their child had used AI to: research a career they were curious about, help understand why a friendship had become complicated, co-write a fantasy story with AI as a "writing partner," and teach themselves basic Python programming by asking AI to explain each concept step by step. None of this was known to the parent. None of it was harmful. All of it reflected genuine curiosity and self-directed learning.</p>
<p><strong>Why it matters:</strong> Your assumptions about how your children use AI are probably incomplete. The gap between what parents imagine and what children actually do is significant — and closing that gap requires curiosity, not surveillance.</p>
<p><strong>What parents should do:</strong> Ask open questions once a week: "What's something interesting you've done with AI lately?" Not "have you been using AI for homework?" Framing matters.</p>
<p><strong>What this prevents:</strong> Treating legitimate, thoughtful AI use as suspicious — which damages trust and makes children less likely to come to you when they do encounter something genuinely concerning.</p>
</div>`,
  },
  {
    id: 'p-l3',
    number: 3,
    title: 'Benefits vs Risks — The Honest Picture',
    duration: '12 min',
    icon: '⚖️',
    content: `<h2>Neither utopia nor catastrophe — the realistic picture</h2>
<p>Most media coverage of AI and children sits at two extremes: AI will revolutionise education and unlock every child's potential, or AI will destroy critical thinking and enable cheating at scale. The honest picture is between these poles — significant benefits alongside real risks, most of which are navigable with parental engagement.</p>

<h3>The Real Benefits — With Evidence</h3>
<table>
<thead><tr><th>Benefit</th><th>What It Looks Like</th><th>Important Caveat</th></tr></thead>
<tbody>
<tr><td><strong>Personalised learning support</strong></td><td>Child stuck on a concept can ask AI for a different explanation, a simpler version, or more examples — at 11pm when no tutor is available</td><td>Works best when child is motivated to actually understand; doesn't work when child just wants the answer</td></tr>
<tr><td><strong>Lowered barrier to creativity</strong></td><td>Children who felt they "couldn't draw" or "weren't a writer" can now create visual art and stories. AI lowers the cost of creative experimentation.</td><td>Important to ensure child develops their own taste and judgment, not just AI-assisted output</td></tr>
<tr><td><strong>Accessible research tool</strong></td><td>Curious children can explore any topic with a guide that meets them at their level</td><td>AI generates confident-sounding misinformation. Verification skills are essential.</td></tr>
<tr><td><strong>Reduced social anxiety in learning</strong></td><td>Some children ask AI questions they'd be embarrassed to ask a teacher or parent</td><td>Cannot replace human guidance for anything emotionally significant</td></tr>
<tr><td><strong>Preparation for working life</strong></td><td>AI fluency will be a baseline expectation in most careers within a decade</td><td>Using AI thoughtfully is the skill — not just using AI</td></tr>
</tbody>
</table>

<h3>The Real Risks — Without Exaggeration</h3>
<table>
<thead><tr><th>Risk</th><th>What It Actually Looks Like</th><th>How Serious?</th><th>What Helps</th></tr></thead>
<tbody>
<tr><td><strong>Bypassing learning</strong></td><td>Getting the answer without doing the thinking. Essay written but not understood. Maths solved but method not learned.</td><td>Real and common</td><td>Test understanding through conversation, not just submission</td></tr>
<tr><td><strong>Misinformation acceptance</strong></td><td>AI states something confidently that's wrong. Child doesn't check. Wrong belief is formed.</td><td>Real and significant</td><td>Source-checking habits; "How do we know this is right?"</td></tr>
<tr><td><strong>Emotional over-reliance</strong></td><td>Child prefers talking to AI over people because AI is always patient, never busy, never disappointed</td><td>Moderate — worth monitoring</td><td>Maintain human connection; notice patterns of avoidance</td></tr>
<tr><td><strong>Privacy risks</strong></td><td>Children sharing personal information, family details, or location data with AI services that retain data</td><td>Real and under-discussed</td><td>Clear family rules about what is never shared with AI</td></tr>
<tr><td><strong>Recommendation algorithm impact</strong></td><td>AI curates increasingly narrow content based on engagement — can amplify anxiety, comparison, and extreme viewpoints</td><td>Real and well-documented</td><td>Discuss algorithm mechanics; encourage diverse content sources</td></tr>
<tr><td><strong>Inappropriate content generation</strong></td><td>Children prompting AI for content that is inappropriate — violence, adult themes, harmful information</td><td>Real but often overstated</td><td>Most major platforms have filters; parental controls; open conversation</td></tr>
</tbody>
</table>

<h3>The Bigger Picture Question</h3>
<p>The most important question is not "is AI good or bad for my child?" It's "is my child developing the judgment to use AI well?" That judgment includes:</p>
<ul>
<li>Knowing when AI is useful and when human thinking is necessary</li>
<li>Verifying important information rather than accepting confident-sounding answers</li>
<li>Maintaining real human relationships and not substituting AI for them</li>
<li>Understanding that AI reflects the content it was trained on — including its biases</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The families who navigate AI best are not the ones with the strictest rules or the most permissive approach. They're the ones who've made AI a normal topic of dinner table conversation — something to be curious about and think critically about together.</p>
<p><strong>Example:</strong> Two families, both with 14-year-olds. Family A banned AI tools entirely. Their child used them anyway via friends' phones and felt no need to tell parents about AI-related concerns. Family B discussed AI openly, acknowledged both benefits and risks, and established clear household rules together. Their child came to them 6 months later when a classmate showed them an AI-generated deepfake image being circulated as real. They handled it together. Family A's child saw the same image. Said nothing.</p>
<p><strong>Why it matters:</strong> Children who can't talk to parents about AI will navigate its risks alone. The goal is not to prevent use — it's to be the trusted adult they turn to when something concerning happens.</p>
<p><strong>What parents should do:</strong> Aim to be the person your child comes to with AI questions and concerns — not the last to know. That requires being curious about it yourself, not afraid of it.</p>
<p><strong>What this prevents:</strong> Children handling inappropriate AI content, misinformation, or emotional over-reliance in isolation — without parental awareness until the consequences are already visible.</p>
</div>`,
  },
  {
    id: 'p-l4',
    number: 4,
    title: 'What Parents Should Watch For',
    duration: '10 min',
    icon: '👀',
    content: `<h2>Signs worth noticing — without becoming surveillance</h2>
<p>There is a meaningful difference between awareness and surveillance. Awareness means knowing enough about your child's digital life to notice when something seems off. Surveillance means monitoring every keystroke, which typically destroys trust without improving safety.</p>
<p>This lesson focuses on the observable patterns — things you can notice in normal family life — that may warrant a conversation.</p>

<h3>Signs of Healthy AI Use</h3>
<ul>
<li>Child can explain and discuss what they're working on in their own words</li>
<li>AI is one tool among many — not the default answer to everything</li>
<li>Child expresses opinions and independent viewpoints, including disagreeing with AI</li>
<li>Child still seeks out books, human experts, and their own experience as sources</li>
<li>Child shows curiosity about how AI works, not just what it produces</li>
</ul>

<h3>Signs Worth a Conversation</h3>
<table>
<thead><tr><th>What You Might Notice</th><th>What It Could Mean</th><th>How to Approach It</th></tr></thead>
<tbody>
<tr><td>Child can't explain work they submitted in their own words</td><td>May have submitted without understanding — genuine learning gap</td><td>"Walk me through how you worked this out" — curious, not accusatory</td></tr>
<tr><td>Strong reluctance to do any task without AI assistance</td><td>Could be avoidance of difficulty, anxiety, or habit — worth understanding</td><td>"What's hard about this without AI?" — understand the underlying need</td></tr>
<tr><td>Significant time spent in private conversation with AI chatbots</td><td>May be processing something they're not ready to discuss with people</td><td>"I've noticed you spend time talking to AI apps — I'm curious, not worried. What do you find helpful about it?"</td></tr>
<tr><td>Quoting AI responses as if they're facts, without source checking</td><td>Misinformation risk — hasn't developed verification habits</td><td>"That's interesting — how would we check if that's accurate?"</td></tr>
<tr><td>Social media use patterns that seem compulsive or distressing</td><td>May be responding to recommendation algorithm dynamics</td><td>Open conversation about how algorithms work — factual, not judgmental</td></tr>
<tr><td>Anxiety or distress after AI content interactions</td><td>May have encountered inappropriate content or upsetting material</td><td>Create space: "Sometimes AI shows things that are upsetting. Has that ever happened to you?"</td></tr>
</tbody>
</table>

<h3>The Privacy Conversation — Specific Guidance</h3>
<p>Children routinely share more with AI than they realise. Establish family rules around what is never shared:</p>
<ul>
<li>Full name + age + school combination</li>
<li>Home address or location</li>
<li>Photos of yourself, family, or home</li>
<li>Passwords or account details</li>
<li>Information about family finances, relationships, or problems</li>
<li>Medical or health information</li>
</ul>
<p>Explain the reason — not as a rule to obey, but as a principle to understand: "AI services store conversations. We don't always know who can access them or how they're used. Protect your information the same way you would in any public space."</p>

<h3>The AI Content Generation Concern</h3>
<p>Older children (14+) may attempt to prompt AI for inappropriate content. Most major platforms have safeguards. What parents should know:</p>
<ul>
<li>Safeguards are imperfect — motivated teenagers can find workarounds</li>
<li>The approach that works best is prior conversation, not post-incident restriction</li>
<li>Most children who encounter inappropriate AI content don't seek it out — they encounter it through peers or by accident</li>
<li>How your child responds to and talks about it matters more than whether they encounter it</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The warning signs parents most need to act on are usually not dramatic. They're subtle patterns that only become visible if you're paying attention and have an open enough relationship for your child to show you their digital life.</p>
<p><strong>Example:</strong> A parent noticed their 16-year-old becoming increasingly anxious and withdrawn over several weeks. Digital life seemed normal. After a gentle conversation, it emerged that the child had been using an AI chatbot for emotional support — processing anxiety about their future — and the AI had, through repeated conversation, reinforced a spiral of catastrophic thinking rather than providing balance. The AI was doing what it's designed to do: responding to the emotional register of the conversation. It had no capacity to notice the pattern was harmful. The parent intervening, getting their child professional support, and having honest conversations about what AI can and cannot provide — changed the trajectory.</p>
<p><strong>Why it matters:</strong> AI cannot notice when a pattern of use is harmful to a child. Parents can. This is irreplaceable.</p>
<p><strong>What parents should do:</strong> Pay attention to emotional patterns, not just screen time. How is your child feeling? Have they been more withdrawn? More anxious? These signals matter more than what app they're using.</p>
<p><strong>What this prevents:</strong> AI use that inadvertently compounds mental health challenges — the risk that grows when AI replaces human connection without parents knowing.</p>
</div>`,
  },
  {
    id: 'p-l5',
    number: 5,
    title: 'How to Have the Conversation',
    duration: '8 min',
    icon: '💬',
    content: `<h2>Conversation over control — what actually works</h2>
<p>Restrictions without conversation create workarounds. Conversation without follow-through creates inconsistency. The families that navigate AI best have ongoing, genuine dialogue — not a single "we need to talk about AI" announcement, but a living conversation that evolves as the technology and the child do.</p>

<h3>The Conversation Starters That Work — By Age</h3>
<p><strong>Ages 8–11 (curiosity and introduction):</strong></p>
<ul>
<li>"I've been learning about AI — do you want to try it together?"</li>
<li>"Have you ever used a voice assistant? What did you ask it?"</li>
<li>"Did you know YouTube uses AI to decide what video to show you next? What do you think about that?"</li>
<li>"If you asked a computer to help you with a story, is it still your story?"</li>
</ul>

<p><strong>Ages 12–15 (critical thinking and norms):</strong></p>
<ul>
<li>"What do you think about using AI for homework? What's the line for you?"</li>
<li>"Have you ever gotten information from AI that turned out to be wrong?"</li>
<li>"How do your friends use AI? What do you think about that?"</li>
<li>"If you could ask AI anything without anyone knowing, what would you ask?"</li>
</ul>

<p><strong>Ages 16+ (values and future):</strong></p>
<ul>
<li>"What do you think AI will mean for the career you're interested in?"</li>
<li>"What are you most excited about with AI? What are you most concerned about?"</li>
<li>"How do you decide when to use AI and when to figure something out yourself?"</li>
<li>"What do you think the ethical lines around AI should be?"</li>
</ul>

<h3>The Conversations to Avoid</h3>
<table>
<thead><tr><th>Don't Say This</th><th>Say This Instead</th><th>Why</th></tr></thead>
<tbody>
<tr><td>"Have you been using AI for your homework?"</td><td>"Tell me about how you worked on this assignment"</td><td>The first invites a yes/no answer. The second invites a conversation.</td></tr>
<tr><td>"AI is dangerous / AI is destroying a generation"</td><td>"AI has real benefits and real risks — let's talk about both"</td><td>Fear-based framing closes the conversation. Balanced framing opens it.</td></tr>
<tr><td>"You shouldn't trust AI"</td><td>"AI is useful but not always accurate — here's how to check"</td><td>Blanket distrust is unhelpful. Verification skills are what matter.</td></tr>
<tr><td>"I don't understand AI so I can't help you"</td><td>"I don't know much about this yet — can we figure it out together?"</td><td>Ignorance is honest; abdication is not. Curiosity modelled is curiosity taught.</td></tr>
</tbody>
</table>

<h3>After the Conversation — What to Do</h3>
<ul>
<li><strong>Establish household norms together</strong> — not mandated rules, but agreed principles (see Lesson 6)</li>
<li><strong>Check in weekly</strong> — a 5-minute "AI update" as part of normal conversation, not an interrogation</li>
<li><strong>Stay curious yourself</strong> — try the tools your children are using. Your personal experience makes every conversation better.</li>
<li><strong>Acknowledge when you don't know</strong> — AI moves fast. "I don't know, let's look at that together" is always an honest and connecting response.</li>
</ul>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The single most effective thing a parent can do for their child's AI literacy is model curiosity — ask questions, try things, admit uncertainty. Children who see their parents engaging thoughtfully with technology do the same.</p>
<p><strong>Example:</strong> A parent with no technical background started spending 15 minutes a week exploring AI tools — trying ChatGPT, reading one article about AI, asking their child to show them what they use. Within 6 weeks, their 13-year-old spontaneously started sharing their AI projects and questions. Not because the parent became an expert — but because the child saw that their parent was genuinely interested. The conversation became a shared activity rather than a monitoring exercise.</p>
<p><strong>Why it matters:</strong> Children talk to parents who are curious. They hide from parents who only ask to check up on them. The relationship predicts the conversation, and the conversation predicts the safety.</p>
<p><strong>What parents should do:</strong> Commit to one AI-related conversation per week. Not a serious talk — a casual question over dinner. "I read something interesting about AI today — want to hear it?" starts the habit.</p>
<p><strong>What this prevents:</strong> The silence that allows concerning AI use to develop without parental awareness — which is far more dangerous than imperfect parental knowledge of the technology.</p>
</div>`,
  },
  {
    id: 'p-l6',
    number: 6,
    title: 'Practical Rules at Home',
    duration: '10 min',
    icon: '🏠',
    content: `<h2>Household AI guidelines that actually work</h2>
<p>Rules that children have a voice in creating are rules they follow. Rules handed down without context are rules they work around. This lesson gives you a framework for establishing household AI norms that are practical, age-appropriate, and durable.</p>

<h3>The Household AI Norms Framework</h3>
<p>Rather than a list of prohibitions, effective household AI norms address four questions:</p>
<ol>
<li><strong>When is AI appropriate?</strong> (What tasks, what purposes, what contexts)</li>
<li><strong>When is AI not appropriate?</strong> (What should be done without AI assistance)</li>
<li><strong>What is never shared with AI?</strong> (Privacy boundaries)</li>
<li><strong>How do we talk about AI use at home?</strong> (Transparency norms)</li>
</ol>

<h3>Sample Household Norms — Adapt for Your Family</h3>
<table>
<thead><tr><th>Category</th><th>Norm</th><th>Rationale to Share with Children</th></tr></thead>
<tbody>
<tr><td><strong>Homework</strong></td><td>AI can help you understand something you're stuck on. The work you submit should reflect your thinking.</td><td>"Your teacher is assessing your understanding, not your ability to prompt AI. If you can't explain it, you haven't learned it."</td></tr>
<tr><td><strong>Creativity</strong></td><td>AI is a tool for creativity — like a paintbrush. Using it is fine. Presenting AI output as entirely your own work isn't.</td><td>"There's a difference between AI assisting your creativity and AI replacing it. Be honest about which one it is."</td></tr>
<tr><td><strong>Privacy</strong></td><td>We don't share personal information — names, school, address, family details — with any AI service.</td><td>"AI conversations can be stored and accessed. Protect your information the same way you would in public."</td></tr>
<tr><td><strong>Emotional support</strong></td><td>AI can be a useful sounding board. It can't replace real relationships. If something is weighing on you, please come to us too.</td><td>"AI is patient and available — that's genuinely useful. But it doesn't know you, and it can't make good judgments about what you need."</td></tr>
<tr><td><strong>Verification</strong></td><td>If AI tells you something important, we check it.</td><td>"AI makes things up confidently. It's not lying — it just predicts probable text. Always check important information."</td></tr>
<tr><td><strong>Transparency</strong></td><td>We can talk about AI use at home without it turning into an interrogation. If you find something interesting or concerning, share it.</td><td>"I'm curious, not suspicious. I want to understand what you're doing with AI because I think it's genuinely interesting."</td></tr>
</tbody>
</table>

<h3>Age-Specific Guidance</h3>
<p><strong>Under 10:</strong> AI use should be supervised or co-explored. Focus on curiosity rather than rules. The best question for under-10s: "Shall we ask it something together?"</p>
<p><strong>10–13:</strong> Introduce the norms framework explicitly. Co-create household rules. Focus on: privacy protection, verification habits, and the difference between AI-assisted and AI-replaced work.</p>
<p><strong>14–17:</strong> Shift from rules to principles. "What do you think is fair?" is more effective than "this is the rule." Focus on: values alignment, professional and academic integrity norms, emotional wellbeing awareness.</p>

<h3>The Weekly AI Check-In Template</h3>
<p>A 5-minute weekly conversation — not an audit, a check-in:</p>
<pre>1. "Did you use AI for anything interesting this week?"
2. "Was there anything AI got wrong or where it wasn't helpful?"
3. "Anything you're wondering about or want to talk about?"</pre>
<p>These three questions, asked genuinely and without agenda, keep the channel open.</p>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The most effective household AI norms are short, principled, and co-created. A list of 20 rules is not followed. Three principles, developed together, are internalized.</p>
<p><strong>Example:</strong> A family of four (children aged 11 and 15) held a 30-minute family meeting to create their "AI House Rules." The parents came with a draft. The children rewrote it — clarifying the homework rule (which the parents had made too vague), removing a rule they found insulting (no AI for creative work, which they argued against convincingly), and adding a rule the parents hadn't thought of (AI cannot be used for arguments between family members — a specific incident had occurred). The final document was one page, five principles, signed by all four family members. 18 months later, all principles were still being honoured and discussed. The process of creating them together was more valuable than any individual rule.</p>
<p><strong>Why it matters:</strong> Rules imposed without voice create resentment and workarounds. Rules created together create ownership and compliance — even when parents aren't watching.</p>
<p><strong>What parents should do:</strong> Hold a family meeting. Present AI as something to navigate together. Ask for input. Be willing to change your mind if your children make a good argument. The goal is principles they'll apply when you're not in the room.</p>
<p><strong>What this prevents:</strong> Secret AI use that operates entirely outside household awareness and values — which is what happens when children have no voice in the norms they're expected to follow.</p>
</div>`,
  },
  {
    id: 'p-l7',
    number: 7,
    title: 'Setting Boundaries That Hold',
    duration: '9 min',
    icon: '🛡️',
    content: `<h2>Boundaries that are understood, not just enforced</h2>
<p>The most durable boundaries are ones children understand the reason for. A child who knows why a boundary exists will apply it independently. A child who just knows a rule exists will look for the edge of it.</p>

<h3>The 3 Types of Boundaries</h3>
<table>
<thead><tr><th>Boundary Type</th><th>Purpose</th><th>Examples</th><th>How to Frame It</th></tr></thead>
<tbody>
<tr><td><strong>Safety boundaries</strong></td><td>Protect from genuine harm</td><td>No personal information sharing. No AI use for explicit content search. No sharing photos of self/family.</td><td>"This protects you from real risks. Non-negotiable, with explanation."</td></tr>
<tr><td><strong>Learning boundaries</strong></td><td>Protect the learning process</td><td>AI can help you understand; it can't do the thinking for you. Explain what you submit. Verify before believing.</td><td>"This is about what's actually useful for you. Not about rules for their own sake."</td></tr>
<tr><td><strong>Wellbeing boundaries</strong></td><td>Protect emotional health and real relationships</td><td>AI time doesn't replace family or friend time. Come to us with things that matter. AI is not a therapist.</td><td>"This is about making sure technology serves your life, not the other way around."</td></tr>
</tbody>
</table>

<h3>Technical Boundaries — What's Available and What Actually Works</h3>
<p>Technical controls exist and have their place — but they have significant limitations:</p>
<ul>
<li><strong>Screen time controls</strong> (Apple Screen Time, Google Family Link) — useful for total device time, limited for specific AI apps</li>
<li><strong>Content filters</strong> — effective for obvious content; less effective for nuanced AI interactions</li>
<li><strong>SafeSearch and similar tools</strong> — useful baseline; not comprehensive</li>
<li><strong>AI-specific controls</strong> (e.g. supervised accounts on some platforms) — available on some platforms, absent on others</li>
</ul>
<p><strong>The honest reality:</strong> A motivated 14-year-old can work around most technical controls. Technical controls buy time and reduce casual exposure to inappropriate content. They are not a substitute for relationship and conversation. Use them as one layer of a multi-layer approach — not as the primary approach.</p>

<h3>When Boundaries Are Crossed</h3>
<p>When you discover your child has not followed household norms:</p>
<ol>
<li><strong>Respond to the behaviour, not the technology.</strong> If a child submitted AI-written work without understanding it, the issue is academic integrity — not AI specifically. The same principles apply as with any honesty issue.</li>
<li><strong>Ask before reacting.</strong> "What happened?" before "why did you do this?" Curiosity before judgment. You may learn something that changes the appropriate response.</li>
<li><strong>Connect consequence to principle.</strong> Consequences that explain the "why" are more effective than consequences that only enforce the rule. "You submitted work that wasn't yours — the consequence reflects our family's value of honesty."</li>
<li><strong>Revisit the norm.</strong> Sometimes a boundary being crossed signals it needs adjustment — it wasn't clear, or it wasn't fair. Be willing to revise.</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> Boundaries that children understand the reason for are maintained independently. Boundaries that are just rules are maintained only when someone is watching.</p>
<p><strong>Example:</strong> A parent discovered their 13-year-old had been using AI to write an entire school essay. Rather than immediate punishment, the parent asked three questions: What made you do this? Do you understand the material the essay was about? What do you think the problem is with submitting work that isn't yours? The child's answers revealed: extreme anxiety about a deadline, genuine misunderstanding of a key concept, and a reasonable understanding of why academic integrity matters. The consequence addressed all three: a rewrite done by the child (with AI help to understand, not to write), a conversation with the teacher, and a plan for handling deadline anxiety. Six months later, the child came to their parent proactively about a similar situation — before using AI to avoid it.</p>
<p><strong>Why it matters:</strong> How parents respond to the first boundary crossing determines whether children come to them with the second one. Respond in ways that keep the conversation open.</p>
<p><strong>What parents should do:</strong> When boundaries are crossed, aim to understand before you judge. The child's explanation will tell you what actually needs addressing — which is often not what you initially assumed.</p>
<p><strong>What this prevents:</strong> Children managing AI-related issues in secret rather than with parental support — which is the most dangerous outcome of the most heavy-handed responses.</p>
</div>`,
  },
  {
    id: 'p-l8',
    number: 8,
    title: 'The Future of AI in Education',
    duration: '10 min',
    icon: '🎓',
    content: `<h2>What's coming — and how to prepare your child for it</h2>
<p>The education system is mid-transition. Schools are navigating AI without a clear consensus — some have banned it, some have embraced it, most are somewhere between. In 5–10 years, the current debate about "should students use AI?" will seem as dated as the debate about whether students should use calculators. The question will shift to: "Are students using AI thoughtfully?"</p>
<p>Your role as a parent is to ensure your child arrives at that future with the skills and judgment to thrive in it.</p>

<h3>What Education Will Look Like with AI</h3>
<table>
<thead><tr><th>Today</th><th>Within 5 Years</th><th>What This Means for Your Child</th></tr></thead>
<tbody>
<tr><td>Essay writing as a core assessment method</td><td>Oral defence, collaborative projects, applied demonstrations alongside written work</td><td>Communication, critical thinking, and demonstration of understanding will matter more than polished written output</td></tr>
<tr><td>AI use as a grey area or banned in schools</td><td>AI as a standard tool with documented use norms (like citation for sources)</td><td>Learning to use AI responsibly and cite its contribution will be a required academic skill</td></tr>
<tr><td>Teachers as primary knowledge source</td><td>Teachers as guides, curators, and critical thinking coaches</td><td>Learning how to learn — and how to evaluate information — will matter more than memorising content</td></tr>
<tr><td>Career paths based on knowledge and credentials</td><td>Career paths based on judgment, creativity, and human skills that AI doesn't replace</td><td>Emotional intelligence, complex problem-solving, and the ability to direct AI effectively will differentiate careers</td></tr>
</tbody>
</table>

<h3>The Skills That Will Matter Most</h3>
<p>Research into AI's impact on careers consistently points to the same cluster of skills remaining high-value:</p>
<ul>
<li><strong>Critical evaluation</strong> — the ability to assess whether an AI output is correct, useful, or misleading</li>
<li><strong>Clear communication</strong> — giving AI good instructions requires clear thinking; human communication requires even more</li>
<li><strong>Creativity and original perspective</strong> — AI can remix; original insight and genuine perspective remain human</li>
<li><strong>Emotional intelligence</strong> — understanding people, managing relationships, and navigating complex human dynamics</li>
<li><strong>Learning agility</strong> — the ability to learn new tools and approaches quickly as the landscape changes</li>
</ul>
<p>These skills are developed through practice, challenge, and genuine human engagement — not through AI use. The risk is not that AI replaces these skills. The risk is that convenient AI use prevents their development.</p>

<h3>What to Do Now — A Parent's Action List</h3>
<ol>
<li><strong>Have the AI conversation at home</strong> — regularly, curiously, without agenda</li>
<li><strong>Model verification habits</strong> — "Let's check that" should become a household reflex, not just an AI policy</li>
<li><strong>Protect the struggle</strong> — let your child wrestle with hard problems. The frustration is the learning. AI that immediately resolves it removes the growth.</li>
<li><strong>Develop real-world social skills</strong> — invest in human activities, conversations, and relationships. These are what AI cannot provide and what your child will need most.</li>
<li><strong>Stay informed without panic</strong> — AI will continue to develop rapidly. You don't need to be an expert. You need to stay curious and engaged.</li>
</ol>

<div class="real-world-box">
<h3>🌍 From Real-World Practice</h3>
<p><strong>Insight:</strong> The children who will thrive in an AI-augmented world are not necessarily the ones who use AI most — they're the ones who use it most thoughtfully, with clear human judgment guiding the tool rather than the tool guiding them.</p>
<p><strong>Example:</strong> A high school teacher observing students use AI for research projects noted a clear pattern: students who used AI as a starting point and then developed original analysis consistently produced better work than students who used AI as an ending point. The first group used AI to understand the landscape of a topic faster — then applied their own thinking. The second group used AI to avoid thinking. Two years later, at university, the pattern continued. The first group adapted to AI-enabled academic environments. The second group struggled when original thought was required.</p>
<p><strong>Why it matters:</strong> The relationship your child develops with AI during these years — whether AI is a tool they direct or a shortcut they rely on — will shape their capacity to thrive in every future environment they enter.</p>
<p><strong>What parents should do:</strong> Talk about the future with your children. Not with anxiety — with curiosity. "What do you think your job might look like in 15 years? What do you think AI will and won't be able to do?" These conversations build the future-orientation and adaptability that matters more than any specific skill.</p>
<p><strong>What this prevents:</strong> Children arriving at adulthood as passive consumers of AI output rather than active, critical directors of AI tools — the distinction that will define opportunity and outcomes in the careers ahead.</p>
</div>`,
  },
]

const DOWNLOADABLE = {
  title: 'AI at Home — Parent Guide',
  sections: [
    {
      heading: "✅ Do's",
      items: [
        'Try AI tools yourself — your personal experience makes every conversation better',
        'Have regular, casual conversations about AI — not one big "talk"',
        'Ask curious questions: "What did you use AI for this week?"',
        'Co-create household AI norms with your children\'s input',
        'Model verification habits: "Let\'s check that"',
        'Acknowledge when you don\'t know something about AI',
        'Protect your child\'s time for independent thinking and struggling with hard problems',
        'Invest in human activities, relationships, and social development',
        'Stay informed — one article about AI per week is enough',
        'Respond to AI-related boundary crossings with curiosity before judgment',
      ],
    },
    {
      heading: "❌ Don'ts",
      items: [
        'Don\'t lead with fear — it closes the conversation',
        'Don\'t ban AI without explanation — it creates workarounds and secrecy',
        'Don\'t assume your child\'s AI use is purely for avoiding work',
        'Don\'t use "have you been using AI?" as your opening question',
        'Don\'t accept AI as the only authority — teach verification as a family habit',
        'Don\'t rely solely on technical controls — relationship and conversation are more effective',
        'Don\'t ignore signs of emotional over-reliance on AI chatbots',
        'Don\'t let AI-related discipline destroy the trust needed for future conversations',
        'Don\'t pretend to understand AI if you don\'t — curiosity is better than false expertise',
        'Don\'t treat this as a one-time conversation — it needs to evolve as the technology does',
      ],
    },
    {
      heading: '💬 Conversation Starters by Age',
      items: [
        'Ages 8–11: "Shall we try asking AI something together?"',
        'Ages 8–11: "Did you know YouTube uses AI to choose what shows you next videos?"',
        'Ages 12–15: "What do you think is the right line for using AI on homework?"',
        'Ages 12–15: "Have you ever caught AI being wrong about something?"',
        'Ages 16+: "What do you think AI will mean for the career you\'re thinking about?"',
        'Ages 16+: "What are you most curious about — and most concerned about — with AI?"',
        'All ages: "What\'s something interesting you\'ve done with AI lately?"',
        'All ages: "Is there anything about AI you\'ve been wondering about?"',
      ],
    },
    {
      heading: '⚠️ Warning Signs Worth a Conversation',
      items: [
        'Can\'t explain submitted work in their own words',
        'Strong reluctance to attempt any task without AI assistance',
        'Significant private time with AI chatbots — especially around emotional topics',
        'Accepting AI responses as facts without checking',
        'Social withdrawal or anxiety that may be related to social media algorithm effects',
        'Distress after AI content interactions',
        'Presenting AI-generated creative work as entirely their own without acknowledgment',
        'Using AI to avoid rather than enhance — a consistent pattern, not a single instance',
      ],
    },
    {
      heading: '📅 Weekly Check-In Template',
      items: [
        '1. "Did you use AI for anything interesting this week?"',
        '2. "Was there anything AI got wrong or where it wasn\'t helpful?"',
        '3. "Anything about AI you\'ve been curious about or want to talk about?"',
        '4. "Any AI-related situations that felt complicated or unclear?"',
        '[ ] Make this a casual 5-minute conversation — not a formal review',
        '[ ] Ask from curiosity, not surveillance',
        '[ ] Share something you\'ve learned about AI yourself',
        '[ ] Let the conversation go where the child takes it',
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ParentsModule() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeLesson, setActiveLesson] = useState(0)
  const [completed,    setCompleted]    = useState({})
  const [showGuide,    setShowGuide]    = useState(false)

  // Gate: requires login. Unauthenticated → redirect to login
  useEffect(() => {
    if (loading) return
    if (!user) router.push('/login?redirect=/parents')
  }, [user, loading])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )

  if (!user) return null

  const lesson = LESSONS[activeLesson]
  const pct    = Math.round((Object.keys(completed).length / LESSONS.length) * 100)

  const markDone = () => {
    setCompleted(prev => ({ ...prev, [lesson.id]: true }))
    if (activeLesson < LESSONS.length - 1) {
      setTimeout(() => { setActiveLesson(i => i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 400)
    }
  }

  return (
    <>
      <Head>
        <title>AI for Parents — Le On AI</title>
        <meta name="description" content="A free guide for parents on how kids use AI, what to watch for, and how to have the conversation." />
      </Head>
      <Nav />

      <div className="pt-20 pb-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-8 pt-4">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <SectionLabel>Free Module</SectionLabel>
              <span className="px-3 py-1 bg-success/10 border border-success/25 rounded-full text-xs font-display font-bold text-success">
                FREE — No enrolment required
              </span>
            </div>
            <h1 className="font-display font-black text-4xl tracking-tight mb-2">AI for Parents</h1>
            <p className="text-muted max-w-xl leading-relaxed">
              Practical, calm guidance for parents navigating how AI is shaping how children learn, communicate, and grow.
              8 lessons — no technical background needed.
            </p>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted font-display">{pct}% complete</span>
              </div>
              <span className="text-xs text-muted">8 lessons · ~80 min total</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">

            {/* Sidebar — lesson list */}
            <div className="space-y-1.5">
              {LESSONS.map((l, i) => (
                <button key={l.id} onClick={() => { setActiveLesson(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                    activeLesson === i
                      ? 'border-blue/40 bg-blue/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}>
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {completed[l.id] ? '✅' : l.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted font-display mb-0.5">Lesson {l.number}</div>
                    <div className={`text-xs font-display font-bold leading-snug ${activeLesson === i ? 'text-white' : 'text-white/75'}`}>
                      {l.title}
                    </div>
                    <div className="text-[10px] text-muted mt-0.5">{l.duration}</div>
                  </div>
                </button>
              ))}

              {/* Download guide */}
              <button onClick={() => setShowGuide(true)}
                className="w-full text-left p-3 rounded-xl border border-success/20 bg-success/5 hover:border-success/40 transition-all mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📥</span>
                  <div>
                    <div className="text-xs font-display font-bold text-white">Parent Guide</div>
                    <div className="text-[10px] text-muted">AI at Home — free download</div>
                  </div>
                </div>
              </button>

              {/* Upsell if no tier */}
              {!user?.tier && !user?.isDevUser && (
                <div className="mt-4 p-4 rounded-xl border border-blue/20 bg-blue/5">
                  <div className="text-xs font-display font-bold text-white mb-1">Want the full curriculum?</div>
                  <p className="text-xs text-muted leading-relaxed mb-3">
                    15 modules on AI strategy, use cases, ROI, and execution — starting at $49.
                  </p>
                  <Link href="/pricing"
                    className="block text-center px-4 py-2 bg-blue hover:bg-blue-bright text-white font-display font-bold text-xs rounded-lg transition-all">
                    View Courses →
                  </Link>
                </div>
              )}
            </div>

            {/* Lesson content */}
            <div>
              <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-8 prose-lesson mb-5">
                <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue/10 border border-blue/25 rounded-full text-xs font-display font-bold text-blue-bright">
                        Lesson {lesson.number}
                      </span>
                      <span className="text-xs text-muted">{lesson.duration}</span>
                      {completed[lesson.id] && (
                        <span className="px-2 py-0.5 bg-success/10 border border-success/25 rounded-full text-[10px] font-display font-bold text-success">✓ Complete</span>
                      )}
                    </div>
                    <h2 className="font-display font-bold text-2xl">{lesson.title}</h2>
                  </div>
                </div>
                <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                  <LessonFeedback user={user} moduleId="parents" lessonId={lesson.id} />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  onClick={() => { setActiveLesson(i => Math.max(0, i - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={activeLesson === 0}
                  className="px-5 py-2.5 border border-white/10 text-muted hover:text-white hover:border-white/20 font-display font-bold text-sm rounded-lg transition-all disabled:opacity-30">
                  ← Previous
                </button>
                <button onClick={markDone}
                  className={`px-6 py-3 font-display font-bold text-sm rounded-lg transition-all ${
                    completed[lesson.id]
                      ? 'bg-success/10 border border-success/30 text-success'
                      : 'bg-blue hover:bg-blue-bright text-white shadow-[0_0_20px_rgba(26,110,255,0.3)]'
                  }`}>
                  {completed[lesson.id]
                    ? '✓ Completed'
                    : activeLesson === LESSONS.length - 1
                    ? 'Complete Module ✓'
                    : 'Mark Complete & Next →'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowGuide(false)}>
          <div className="bg-navy-mid border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-navy-mid border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg">📥 {DOWNLOADABLE.title}</h2>
                <p className="text-xs text-muted">AI at Home — Parent Reference Guide</p>
              </div>
              <button onClick={() => setShowGuide(false)} className="text-muted hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 space-y-6">
              {DOWNLOADABLE.sections.map((sec, i) => (
                <div key={i}>
                  <h3 className="font-display font-bold text-base mb-3">{sec.heading}</h3>
                  <ul className="space-y-2">
                    {sec.items.map((item, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-muted">
                        <span className="flex-shrink-0 text-white/30 mt-0.5">·</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <button onClick={() => {
                const text = DOWNLOADABLE.sections.map(s =>
                  s.heading + '\n' + s.items.map(i => '• ' + i).join('\n')
                ).join('\n\n')
                const blob = new Blob([`AI AT HOME — PARENT GUIDE\nlearningonline.ai\n\n${text}`], { type: 'text/plain' })
                const url  = URL.createObjectURL(blob)
                const a    = document.createElement('a')
                a.href = url; a.download = 'AI-at-Home-Parent-Guide.txt'; a.click()
                URL.revokeObjectURL(url)
              }}
                className="w-full py-3 bg-success/10 border border-success/30 text-success font-display font-bold text-sm rounded-lg hover:bg-success/20 transition-all">
                Download Guide (.txt)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
