<template>
  <div class="p-4 min-h-dvh bg-white dark:bg-slate-900">
    <h1 class="text-3xl mb-4">果果故事屋</h1>
    <ul
      v-if="!loading"
      role="list"
      class="divide-y divide-gray-200 dark:divide-gray-800"
    >
      <ULink
        v-for="country in countries"
        :key="country.id"
        :to="`/stories/${country.id}`"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        class="flex items-center justify-between gap-3 py-3 pr-4 sm:pr-6"
      >
        {{ country.title }}
      </ULink>
    </ul>
    <ul v-else class="divide-y divide-gray-200 dark:divide-gray-800">
      <StoryItemSkeleton v-for="item in new Array(10)" :key="item"/>
    </ul>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const supabase = useSupabase()
const countries = ref<{ title: string; id: string; content: string }[]>([])

/**
 * 获取故事列表
 */
async function getCountries() {
  loading.value = true
  const { data } = await supabase.from('stories').select()
  countries.value = data ?? []
  loading.value = false
}

useSeoMeta({
  title: '果果故事屋',
  description: '将给果果听的故事合集',
})

onMounted(() => {
  getCountries()
})
</script>
