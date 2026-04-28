// pages/api/contact.js — Store contact queries in Supabase
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, company, query_type, message } = req.body

  if (!name || !email || !query_type || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error } = await supabase.from('contact_queries').insert({
      name, email, company: company || null,
      query_type, message,
    })

    if (error) throw error

    // Optional: send notification email via Resend/SendGrid
    // await sendNotificationEmail({ name, email, query_type, message })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Failed to save message' })
  }
}
