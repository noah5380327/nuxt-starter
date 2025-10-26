<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Index',
})

onMounted(async () => {
  navigateTo('/dashboard')
})
</script>
