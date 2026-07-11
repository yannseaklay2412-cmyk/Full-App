import { createClient } from '@supabase/supabase-js';

// Debug - remove after fix
console.log('URL:', process.env.SUPABASE_URL);
console.log('KEY:', process.env.SUPABASE_SERVICE_KEY);
console.log('EMAIL:', process.env.ADMIN_EMAIL);
console.log('PASSWORD:', process.env.ADMIN_PASSWORD);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const { data, error } = await supabase.auth.signUp({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
});

if (error) {
  console.error(' Error creating admin auth user:', error.message);
} else {
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: data.user.id, email: process.env.ADMIN_EMAIL, role: 'admin' });

  if (profileError) {
    console.error(' Error creating admin profile:', profileError.message);
  } else {
    console.log(' Admin created successfully!');
  }
}