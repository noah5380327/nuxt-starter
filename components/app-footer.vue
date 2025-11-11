<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-sm text-gray-600">&copy; {{ new Date().getFullYear() }} {{ title }}</div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PRODUCT_NAME } from '~/constants/common'

const title: string = PRODUCT_NAME
</script>
