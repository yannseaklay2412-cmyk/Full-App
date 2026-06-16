import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error(' Supabase connection failed:', error.message);
  } else {
    console.log(' Supabase connected successfully!', data);
  }
});