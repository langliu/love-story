<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  badge: {
    type: Number,
    default: undefined,
  },
})
</script>

<template>
  <div
    class="h-16 flex-shrink-0 flex items-center border-b border-gray-200 dark:border-gray-800 px-4 gap-x-4 min-w-0 justify-between sticky top-0 z-10 bg-white dark:bg-slate-900"
  >
    <div class="gap-1.5 flex items-center">
      <h1 class="font-semibold text-gray-900 dark:text-white">
        {{ title ?? '' }}
      </h1>
      <UBadge v-if="badge" variant="outline" size="xs">{{ badge }}</UBadge>
    </div>

    <div class="flex gap-1.5">
      <slot name="right" />
    </div>
  </div>
</template>
