<template>
  <div class="min-h-screen flex">
    <div
      class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:bg-gradient-to-br lg:from-primary-50 lg:to-primary-100"
    >
      <div class="max-w-md px-8 text-center">
        <div
          class="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <UIcon name="i-lucide-graduation-cap" class="text-white text-3xl" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ title }}</h1>

        <div class="mt-12 grid grid-cols-2 gap-6">
          <div v-for="feature in features" :key="feature.name" class="text-center">
            <div
              class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3 border border-primary-200"
            >
              <UIcon :name="feature.icon" class="text-primary-600 text-xl" />
            </div>
            <span class="text-sm font-medium text-gray-700">{{ feature.name }}</span>
            <p v-if="feature.description" class="text-xs text-gray-500 mt-1">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 bg-white">
      <div class="mx-auto w-full max-w-md">
        <div class="lg:hidden flex justify-center mb-8">
          <div
            class="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <UIcon name="i-lucide-graduation-cap" class="text-white text-2xl" />
          </div>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_NAME } from '~/constants/common'

interface Feature {
  name: string
  icon: string
  description: string
}

const title: string = PRODUCT_NAME

const features: Feature[] = [
  {
    name: 'feature name',
    icon: 'i-lucide-book-open',
    description: 'feature description',
  },
]
</script>
