<template>
  <NuxtLayout name="admin-default">
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="故事管理" :badge="countries.length">
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
                <UKbd value="/"/>
              </template>
            </UInput>

            <UButton label="新增故事" trailing-icon="i-heroicons-plus" color="gray" @click="isNewUserModalOpen = true"/>
          </template>
        </UDashboardNavbar>

        <UTable :rows="countries" :columns="columns">
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

      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
const supabase = useSupabase()
const countries = ref<{ title: string; id: string; content: string }[]>([])
const route = useRoute()
const q = ref('')
const input = ref<{ input: HTMLInputElement }>()
const isNewUserModalOpen = ref(false)

useHead({
  title: '故事管理'
})

const {data: page} = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const links = [{
  label: '后台',
  icon: 'i-heroicons-home',
  to: '/admin'
}, {
  label: '故事管理',
  icon: 'i-heroicons-book-open'
}]

const columns = [
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'created_at',
    label: '创建时间'
  },
  {
    key: 'updated_at',
    label: '更新时间'
  },
  {
    key: 'id',
    label: '操作',
  },
]

/**
 * 获取故事列表
 */
async function getCountries() {
  const {data} = await supabase.from('stories').select()
  countries.value = data ?? []
}

onMounted(() => {
  getCountries()
})
</script>
