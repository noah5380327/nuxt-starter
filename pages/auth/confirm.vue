<template>
  <div>
    <UCard class="shadow-xl border border-gray-100 rounded-2xl">
      <template #header>
        <h2 class="text-2xl font-bold text-center">Verifying...</h2>
      </template>

      <div class="text-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin mx-auto mb-4" />
        <p>Your account is being verified, please wait...</p>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  title: 'Confirm',
})

onMounted(async () => {
  setTimeout(() => {
    navigateTo('/dashboard')
  }, 3000)
})
</script>
