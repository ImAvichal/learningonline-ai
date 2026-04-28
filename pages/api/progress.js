// pages/api/progress.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  if (req.method === 'POST') {
    const { userId, lessonId, moduleId, completed } = req.body
    if (!userId || !lessonId) return res.status(400).json({ error: 'userId and lessonId required' })

    const { error } = await supabase.from('course_progress').upsert(
      { user_id: userId, lesson_id: lessonId, module_id: moduleId, completed },
      { onConflict: 'user_id,lesson_id' }
    )
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ success: true })
  }

  if (req.method === 'GET') {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ error: 'userId required' })

    const { data, error } = await supabase
      .from('course_progress')
      .select('lesson_id, module_id, completed')
      .eq('user_id', userId)
      .eq('completed', true)

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ progress: data })
  }

  res.status(405).end()
}
