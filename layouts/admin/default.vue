<script setup lang="ts">
// const {isHelpSlideoverOpen} = useDashboard()
const links = [{
  id: 'home',
  label: '仪表盘',
  icon: 'i-heroicons-home',
  to: '/admin',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  }
}, {
  id: 'inbox',
  label: '故事管理',
  icon: 'i-heroicons-book-open',
  to: '/admin/stories',
  tooltip: {
    text: 'Inbox',
    shortcuts: ['G', 'I']
  }
}, {
  id: 'users',
  label: 'Users',
  icon: 'i-heroicons-user-group',
  to: '/admin/users',
  tooltip: {
    text: 'Users',
    shortcuts: ['G', 'U']
  }
}, {
  id: 'settings',
  label: 'Settings',
  to: '/settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Notifications',
    to: '/settings/notifications'
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  }
}]

const footerLinks = [{
  label: 'Invite people',
  icon: 'i-heroicons-plus',
  to: '/settings/members'
}, {
  label: 'Help & Support',
  icon: 'i-heroicons-question-mark-circle',
  // click: () => isHelpSlideoverOpen.value = true
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <Brand/>
        </template>
      </UDashboardNavbar>
      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton/>
        </template>

        <UDashboardSidebarLinks :links="links"/>

        <UDivider/>

<!--        <UDashboardSidebarLinks-->
<!--:links="[{ label: 'Colors', draggable: true, children: colors }]"-->
<!--                                @update:links="colors => defaultColors = colors"/>-->

        <div class="flex-1"/>

        <UDashboardSidebarLinks :links="footerLinks"/>

        <UDivider class="sticky bottom-0"/>

        <!--        <template #footer>-->
        <!--          &lt;!&ndash; ~/components/UserDropdown.vue &ndash;&gt;-->
        <!--          <UserDropdown />-->
        <!--        </template>-->
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot />
  </UDashboardLayout>
</template>

<style scoped>

</style>