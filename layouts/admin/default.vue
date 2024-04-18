<script setup lang="ts">

</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <AdminSide/>
      </template>
      <template #default>
        <slot/>
      </template>
    </UPage>
  </UContainer>
</template>

<style scoped>

</style>