<template>
  <NuxtLayout name="admin-default">
    <div class="max-h-screen overflow-y-auto">
      <DashboardNavbar title="故事管理" :badge="countries.length">
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            autocomplete="off"
            placeholder="搜索故事..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="新增故事"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="goToCreate"
          />
        </template>
      </DashboardNavbar>

      <UTable :rows="countries" :columns="columns" :loading="loading">
        <template #created_at-data="{ row }">
          <span>{{ dateFormat(row.created_at) }}</span>
        </template>
        <template #updated_at-data="{ row }">
          <span>{{ dateFormat(row.updated_at) }}</span>
        </template>
        <template #id-data="{ row }">
          <ULink
            :to="`/admin/stories/${row.id}`"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            编辑
          </ULink>
        </template>
      </UTable>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const supabase = useSupabase()
const countries = ref<{ title: string; id: string; content: string }[]>([])
const q = ref('')
const input = ref<{ input: HTMLInputElement }>()
const route = useRouter()
const loading = ref<boolean>(false)

useHead({
  title: '故事管理',
})

const columns = [
  {
    key: 'title',
    label: '标题',
  },
  {
    key: 'created_at',
    label: '创建时间',
  },
  {
    key: 'updated_at',
    label: '更新时间',
  },
  {
    key: 'id',
    label: '操作',
  },
]

function goToCreate() {
  route.push('/admin/stories/create')
}

/**
 * 获取故事列表
 */
async function getCountries() {
  loading.value = true
  const { data } = await supabase.from('stories').select()
  countries.value = data ?? []
  loading.value = false
}

onMounted(() => {
  getCountries()
})
</script>
