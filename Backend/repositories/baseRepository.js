import { supabase } from '../config/supabase.js'

export function createRepository(tableName, { selectFields = '*', orderBy = null } = {}) {
  const getAll = async () => {
    let query = supabase.from(tableName).select(selectFields)
    if (orderBy) query = query.order(orderBy)
    const { data, error } = await query
    if (error) throw error
    return data
  }

  const getById = async (id) => {
    const { data, error } = await supabase
      .from(tableName)
      .select(selectFields)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  const create = async (record) => {
    const { data, error } = await supabase
      .from(tableName)
      .insert(record)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const update = async (id, updates) => {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const remove = async (id) => {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)
    if (error) throw error
    return { message: `${tableName.slice(0, -1)} deleted` }
  }

  return { getAll, getById, create, update, remove }
}
