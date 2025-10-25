<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'light'

const route = useRoute()

watch(
  () => route.path,
  () => {
    const defaultSubTitle = 'Nuxt Starter'

    useHead({
      title: route.meta.title ? `${route.meta.title} - ${defaultSubTitle}` : defaultSubTitle,
    })
  },
  { immediate: true }
)
</script>
