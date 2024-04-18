<script setup lang="ts">
  const avatar = 'https://avatars.githubusercontent.com/u/23360933?s=200&v=4'
</script>

<template>
  <UButton color="gray" variant="ghost" class="w-full">
    <UAvatar :src="avatar" size="2xs" />

    <span class="truncate text-gray-900 dark:text-white font-semibold">Nuxt</span>
  </UButton>
</template>

<style scoped>

</style>