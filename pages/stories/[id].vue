<script setup lang="ts">
const story = ref<{ title: string; content: string } | null>(null)
const loading = ref(false)
const route = useRoute()
const supabase = useSupabase()

async function getStory(storeId: string) {
  loading.value = true
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storeId)

  if (stories?.length) {
    story.value = stories[0]
  }
  loading.value = false
}

onMounted(() => {
  getStory(route.params.id as string)
})
</script>

<template>
  <div class="p-4 mb-16 md:mb-24">
    <Head>
      <Title>{{ story?.title }}</Title>
    </Head>
    <h3 v-if="story?.title" class="text-2xl font-bold mb-4 md:mb-6 text-center">
      {{ story.title }}
    </h3>
    <div v-if="story?.title">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="story-content max-w-3xl m-auto" v-html="story.content" />
    </div>
  </div>
</template>

<style>
.story-content p {
  margin-bottom: 0.5rem;
}

@media (max-width: 450px) {
  .story-content p {
    font-size: 1.2rem;
  }
}
</style>
