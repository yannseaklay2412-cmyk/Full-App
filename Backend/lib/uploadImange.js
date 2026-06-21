import { supabase } from '../config/supabase'  // adjust path to match your project

export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file)

  if (error) {
    console.error(error)
    return null
  }

  return fileName
}