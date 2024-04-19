<script setup lang="ts">
import {z} from 'zod'

const router = useRouter()

const schema = z.object({
  title: z.string(),
  content: z.string()
})
const story = ref<{ title: string; content: string } | null>(null)
const storyContent = ref<string | undefined>(undefined)
const route = useRoute()
const supabase = useSupabase()
const toast = useToast()

const state = reactive({
  title: undefined,
  content: undefined
})

async function onSubmit() {
  const {error} = await supabase.from('stories').insert({
    ...state
  }).eq('id', route.params.id as string).select()
  if (error) {
    alert(error.message)
  } else {
    toast.add({title: '新增成功'})
    router.back()
  }
}
</script>

<template>
  <NuxtLayout name="admin-default">
    <UDashboardPage>
      <UDashboardPanel grow>
        <Head>
          <Title>新增编辑</Title>
        </Head>

        <UDashboardNavbar title="新增故事">
          <template #right>
            <UButton
                trailing-icon="i-heroicons-plus"
                type="submit"
                class="font-bold"
                @click="onSubmit">
              提交
            </UButton>
          </template>
        </UDashboardNavbar>


        <UDashboardPanelContent class="pb-24">
          <UForm :state="state" class="space-y-4">
            <UFormGroup label="标题" name="title">
              <UInput v-model="state.title"/>
            </UFormGroup>

            <UFormGroup label="内容" name="content">
              <TipTap v-model:model-value="state.content"/>
            </UFormGroup>
          </UForm>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>
