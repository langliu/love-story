<script setup lang="ts">
const links = [
  {
    id: 'home',
    label: '仪表盘',
    icon: 'i-heroicons-home',
    to: '/admin',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H'],
    },
  },
  {
    id: 'inbox',
    label: '故事管理',
    icon: 'i-heroicons-book-open',
    to: '/admin/stories',
    tooltip: {
      text: 'Inbox',
      shortcuts: ['G', 'I'],
    },
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/admin/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U'],
    },
  },
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'General',
        to: '/settings',
        exact: true,
      },
      {
        label: 'Members',
        to: '/settings/members',
      },
      {
        label: 'Notifications',
        to: '/settings/notifications',
      },
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S'],
    },
  },
]

const footerLinks = [
  {
    label: 'Invite people',
    icon: 'i-heroicons-plus',
    to: '/settings/members',
  },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
  },
]
</script>

<template>
  <div class="flex min-h-screen">
    <div class="min-w-60 px-4 flex flex-col border-gray-200 border-r dark:border-gray-800">
      <div class="h-16 flex justify-center items-center">
        <Brand />
      </div>
      <UVerticalNavigation :links="links" />
      <UDivider />
      <div class="flex-1" />
      <UVerticalNavigation :links="footerLinks" />
    </div>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
