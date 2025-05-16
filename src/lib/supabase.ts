import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with proper configuration
export const supabase = createClient(
  'https://yaipueurjaexcxztztzi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhaXB1ZXVyamFleGN4enR6dHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzY4MDAsImV4cCI6MjAyNTI1MjgwMH0.qDJpHK1pqK9_2OXYXUxS-wXTxG7W0pl4JMO9ComwgXY',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);