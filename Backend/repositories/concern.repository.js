import { supabase } from '../config/supabase.js'

export const create = async (message) => {
  const { data, error } = await supabase
    .from('concerns')
    .insert({ message })
    .select()
    .single()
  if (error) throw error
  return data
}

export const getAll = async () => {
  const { data, error } = await supabase
    .from('concerns')
    .select('id, message, created_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
