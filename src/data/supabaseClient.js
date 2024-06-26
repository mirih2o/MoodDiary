import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vkifrjdmoquweyqgckel.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZraWZyamRtb3F1d2V5cWdja2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTQwNjIsImV4cCI6MjAzMjAzMDA2Mn0.Zp2VVsjnlgzapZXAvy-gwLb-rRjTRgAxL-1Pc0HCMnI";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
