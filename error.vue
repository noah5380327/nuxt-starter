<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full text-center">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon
          :name="statusCode === 404 ? 'i-lucide-file-question' : 'i-lucide-alert-circle'"
          class="text-red-600 text-3xl"
        />
      </div>

      <h1 class="text-4xl font-bold text-gray-900 mb-2">
        {{ statusCode === 404 ? '404' : '500' }}
      </h1>

      <p class="text-lg text-gray-600 mb-8">
        {{
          statusCode === 404
            ? 'Sorry, the page does not exist'
            : 'Sorry, an unexpected error occurred'
        }}
      </p>

      <div class="space-y-3">
        <UButton size="lg" color="primary" class="w-full" @click="onGoHome">
          <template #leading>
            <UIcon name="i-lucide-home" class="w-5 h-5" />
          </template>
          Return to Home
        </UButton>

        <UButton variant="outline" class="w-full" @click="onGoBack">
          <template #leading>
            <UIcon name="i-lucide-arrow-left" class="w-5 h-5" />
          </template>
          Return to previous page
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: any
}>()

const statusCode = computed(() => props.error?.statusCode || 500)

const onGoHome = () => {
  clearError({ redirect: '/dashboard' })
}

const onGoBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    onGoHome()
  }
}
</script>
