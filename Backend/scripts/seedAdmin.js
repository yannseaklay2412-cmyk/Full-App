import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const { data, error } = await supabase.auth.signUp({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
});

if (error) {
  console.error('❌ Error creating admin auth user:', error.message);
} else {
  const { error: insertError } = await supabase
    .from('admin')
    .insert({
      admin_name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      telegram: null,
    });

  if (insertError) {
    console.error(' Error inserting admin record:', insertError.message);
  } else {
    console.log(' Admin created successfully!');
  }
}