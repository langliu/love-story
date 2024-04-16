<template>
  <div>
    <p>Index Page</p>
    <TipTap v-model:model-value="content" />
    <ul>
      <ULink
        v-for="country in countries"
        :key="country.id"
        :to="`/stories/${country.id}`"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {{ country.title }}
      </ULink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import {supabase} from '~/lib/supabaseClient'

const supabase = useSupabase()

const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig)
// const supabase = createClient(
//   runtimeConfig.public.supabaseUrl,
//   runtimeConfig.public.supabaseKey
// )
const countries = ref<{ title: string; id: string; content: string }[]>([])

async function getCountries() {
  const { data } = await supabase.from('stories').select()
  countries.value = data ?? []
}

onMounted(() => {
  getCountries()
})

const content = ref<string>(
  '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>'
)
</script>
