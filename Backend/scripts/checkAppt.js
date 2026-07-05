import 'dotenv/config'
import { supabase } from '../config/supabase.js'

const { data, error } = await supabase
  .from('appointments')
  .select('id, status, appointment_date, start_time, end_time, created_at, patients(full_name)')
  .eq('status', 'pending')
if (error) throw error
console.log(JSON.stringify(data, null, 2))
console.log('Server "today" used by cron:', new Date().toISOString().slice(0, 10))
