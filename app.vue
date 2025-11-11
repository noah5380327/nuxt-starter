<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { PRODUCT_NAME } from '~/constants/common'

const route = useRoute()

watch(
  () => route.path,
  () => {
    const defaultSubTitle = PRODUCT_NAME

    useHead({
      title: route.meta.title ? `${route.meta.title} - ${defaultSubTitle}` : defaultSubTitle,
    })
  },
  { immediate: true }
)
</script>
