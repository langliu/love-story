<script setup lang="ts">
const story = ref<{ title: string; content: string } | null>(null)
const route = useRoute()
const supabase = useSupabase()

async function getStory(storeId: string) {
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storeId)

  if (stories?.length) {
    story.value = stories[0]
  }
}

onMounted(() => {
  getStory(route.params.id as string)
})
</script>

<template>
  <div class="p-4">
    <Head>
      <Title>{{ story?.title }}</Title>
    </Head>
    <h3 v-if="story?.title" class="text-2xl font-bold mb-4 md:mb-6 text-center">{{ story.title }}</h3>
    <div v-if="story?.title">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="story.content" />
    </div>
  </div>
</template>
