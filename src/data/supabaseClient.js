import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "your-supabase-url";
const SUPABASE_ANON_KEY = "your-supabase-anon-key";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
