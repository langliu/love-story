<template>
  <NuxtLayout name="admin-default">
    <div class="py-4">
      <UBreadcrumb :links="links"/>
      <UPage>
        <UPageHeader title="故事管理" :description="page?.description"/>
        <UPageBody>
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
        </UPageBody>
      </UPage>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const supabase = useSupabase()
const countries = ref<{ title: string; id: string; content: string }[]>([])
const route = useRoute()

useHead({
  title: '故事管理'
})

const {data: page} = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Navigation',
  icon: 'i-heroicons-square-3-stack-3d'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link'
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
