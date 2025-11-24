import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Prefer Service Role Key for admin scripts to bypass RLS, otherwise fallback to Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_ANON_KEY) are required in .env file.');
    console.error('Please copy .env.example to .env and fill in your credentials.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
