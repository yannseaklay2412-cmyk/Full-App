import 'dotenv/config'
import { supabase } from '../config/supabase.js'

const { data, error } = await supabase
  .from('appointments')
  .select('id, status, appointment_date, start_time, end_time, created_at, dentists(dentist_name), patients(full_name)')
  .eq('dentists.dentist_name', 'Dr. Yann LaiE')
console.log(JSON.stringify(data, null, 2))

const { data: byId } = await supabase
  .from('appointments')
  .select('*')
  .eq('id', '6f05db55-bbba-45a8-9cc4-45f456eb094a')
  .maybeSingle()
console.log('Direct by id 6f05db55:', JSON.stringify(byId, null, 2))
