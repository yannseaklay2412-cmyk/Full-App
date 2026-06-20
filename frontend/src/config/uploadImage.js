import { supabase } from './supabaseClient'  // same folder, so use './' not '../config/'

export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('file_image')
    .upload(fileName, file)

  if (error) {
    console.error(error)
    return null
  }

  return fileName
}