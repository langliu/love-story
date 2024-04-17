import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(
    runtimeConfig.public.supabaseUrl,
    runtimeConfig.public.supabaseKey
  )
  return supabase
}