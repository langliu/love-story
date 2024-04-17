<template>
  <div class="p-4">
    <h1 class="text-3xl mb-4">爱的故事</h1>
    <ul>
      <ULink
        v-for="country in countries"
        :key="country.id"
        :to="`/admin/stories/${country.id}`"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {{ country.title }}
      </ULink>
    </ul>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabase()
const countries = ref<{ title: string; id: string; content: string }[]>([])

/**
 * 获取故事列表
 */
async function getCountries() {
  const { data } = await supabase.from('stories').select()
  countries.value = data ?? []
}

onMounted(() => {
  getCountries()
})
</script>
