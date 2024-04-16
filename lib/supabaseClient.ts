import { createClient } from '@supabase/supabase-js'

const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig)
export const supabase = createClient(
  runtimeConfig.public.supabaseUrl,
  runtimeConfig.public.supabaseKey
)