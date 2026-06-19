import { supabase } from '../config/supabase.js'

export const findAll = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      id,
      full_name,
      email,
      is_banned,
      created_at,
      appointments ( id )
    `)
    .order('created_at', { ascending: false })

  if (error) throw { status: 500, message: error.message }

  // Map to flat shape with appointment_count
  return data.map(p => ({
    id:                p.id,
    name:              p.full_name,
    email:             p.email,
    is_banned:         p.is_banned ?? false,
    created_at:        p.created_at,
    appointment_count: p.appointments?.length ?? 0,
  }))
}

export const findById = async (id) => {
  const { data, error } = await supabase
    .from('patients')
    .select('id, full_name, email, is_banned, created_at')
    .eq('id', id)
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}

export const findByEmail = async (email) => {
  const { data, error } = await supabase
    .from('patients')
    .select('id, full_name, email, phone, sex, created_at,is_banned')
    .eq('email', email)
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}

export const updateByEmail = async (email, body) => {
  const allowed = ['full_name', 'phone', 'sex']
  const updates = Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  )

  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('email', email)
    .select()
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}

export const banById = async (id) => {
  const { data, error } = await supabase
    .from('patients')
    .update({ is_banned: true })
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) throw { status: 500, message: error.message }
  return data || null
}