<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  title: z.string(),
  content: z.string(),
})
const story = ref<{ title: string; content: string } | null>(null)
const storyContent = ref<string | undefined>(undefined)
const route = useRoute()
const router = useRouter()
const supabase = useSupabase()
const toast = useToast()

const state = reactive({
  title: undefined,
  content: undefined,
})

async function getStory(storeId: string) {
  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('id', storeId)

  if (stories?.length) {
    story.value = stories[0]
    storyContent.value = stories[0].content
    state.title = stories[0].title
    state.content = stories[0].content
  }
}

async function onSubmit() {
  const { error } = await supabase
    .from('stories')
    .update({
      ...state,
    })
    .eq('id', route.params.id as string)
    .select()
  if (error) {
    alert(error.message)
  } else {
    toast.add({ title: '修改成功' })
    router.back()
  }
}

onMounted(() => {
  getStory(route.params.id as string)
})
</script>

<template>
  <NuxtLayout name="admin-default">
    <div class="max-h-screen overflow-y-auto">
      <Head>
        <Title>{{ story?.title }} - 编辑</Title>
      </Head>

      <DashboardNavbar title="编辑详情">
        <template #right>
          <UButton
            trailing-icon="i-eva-save-outline"
            type="submit"
            class="font-bold"
            @click="onSubmit"
          >
            保存修改
          </UButton>
        </template>
      </DashboardNavbar>

      <div class="pb-24 flex-1 p-4">
        <UForm :state="state" class="space-y-4">
          <UFormGroup label="标题" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>

          <UFormGroup label="内容" name="content">
            <TipTap v-model:model-value="state.content" />
          </UFormGroup>
        </UForm>
      </div>
    </div>
  </NuxtLayout>
</template>
