import { createClient } from "@supabase/supabase-js"

let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://yggcovcpzdctwsizmzjz.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZ2NvdmNwemRjdHdzaXptemp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMjczMDIsImV4cCI6MjA3OTkwMzMwMn0.JZ_HquKrHgzc5VgdfH5KsygbMRsUEqRr15ZA3zGXZ-0"
    )
  }
  return supabaseClient
}
