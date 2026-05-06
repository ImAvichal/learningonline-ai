import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Nav, Reveal, Button } from '../components/ui'
import { useAuth } from '../lib/auth'

export default function CourseComplete() {
  const { user } = useAuth()
  const router = useRouter()
  const { track } = router.query

  const isParents = track === 'parents'

  const title = isParents
    ? "Well done — you've completed AI for Parents"
    : "Well done — you've completed your learning path"

  const body = isParents
    ? "You now have a stronger foundation to guide calm, practical AI conversations at home. Revisit any lesson anytime, and keep the family AI rules handy."
    : "You've taken an important step from AI anxiety to AI awareness. Keep applying what you've learned, revisit your modules, and continue building practical confidence with AI."

  return (
    <>
      <Head>
        <title>Course Complete — LeO AI</title>
      </Head>

      <Nav user={user} />

      <main className="min-h-screen pt-24 flex items-center">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="font-display font-bold text-3xl mb-4">{title}</h1>
            <p className="text-muted text-lg leading-relaxed mb-10 max-w-lg mx-auto">{body}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="large" href="/dashboard">Back to Dashboard</Button>
              <Button variant="ghost" href="/pricing" className="text-sm px-6 py-3">Explore Next Path</Button>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  )
}
