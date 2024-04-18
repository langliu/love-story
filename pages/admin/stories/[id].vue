<script setup lang="ts">
import {z} from 'zod'
import type {FormSubmitEvent} from '#ui/types'

const schema = z.object({
  title: z.string(),
  content: z.string()
})
type Schema = z.output<typeof schema>
const story = ref<{ title: string; content: string } | null>(null)
const storyContent = ref<string | undefined>(undefined)
const route = useRoute()
const supabase = useSupabase()
const toast = useToast()

const state = reactive({
  title: undefined,
  content: undefined
})

async function getStory(storeId: string) {
  const {data: stories} = await supabase
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
  const {error} = await supabase.from('stories').update({
    ...event.data
  }).eq('id', route.params.id as string).select()
  if (error) {
    alert(error.message)
  } else {
    toast.add({title: '修改成功'})
  }
}

onMounted(() => {
  getStory(route.params.id as string)
})
</script>

<template>
  <NuxtLayout name="admin-default">
    <div class="p-4">
      <Head>
        <Title>{{ story?.title }} - 编辑</Title>
      </Head>
      <UPage>
        <UPageHeader title="编辑详情"/>
        <UPageBody>
          <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="标题" name="title">
              <UInput v-model="state.title"/>
            </UFormGroup>

            <UFormGroup label="内容" name="content">
              <TipTap v-model:model-value="state.content"/>
            </UFormGroup>

            <UButton block type="submit" class="mt font-bold">提交修改</UButton>
          </UForm>
        </UPageBody>
      </UPage>

    </div>
  </NuxtLayout>
</template>
