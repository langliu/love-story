import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const runtimeConfig = useRuntimeConfig()
  console.log(runtimeConfig)
  const supabase = createClient(
    runtimeConfig.public.supabaseUrl,
    runtimeConfig.public.supabaseKey
  )
  return supabase
}