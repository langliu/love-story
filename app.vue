<template>
  <div class="bg-white dark:bg-slate-900 min-h-dvh">
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup lang="ts"></script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

body {
  @apply bg-white dark:bg-slate-900 min-h-dvh;
}
</style>
