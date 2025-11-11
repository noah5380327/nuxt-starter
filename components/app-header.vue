<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <ULink to="/dashboard" class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
            <UIcon name="i-lucide-graduation-cap" class="text-white text-3xl" />
          </div>
          <span class="text-xl font-semibold text-gray-900">{{ title }}</span>
        </ULink>

        <nav class="hidden md:flex space-x-8">
          <ULink
            to="/dashboard"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 border-b-2 border-primary-600"
          >
            Dashboard
          </ULink>
          <ULink
            to="/profile"
            class="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
            active-class="text-primary-600 border-b-2 border-primary-600"
          >
            Profile
          </ULink>
        </nav>

        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-700 hidden sm:block">{{ user?.email }}</span>
          <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
            <UButton
              color="primary"
              variant="ghost"
              :trailing-icon="
                userMenuOpen
                  ? 'i-heroicons-chevron-up-20-solid'
                  : 'i-heroicons-chevron-down-20-solid'
              "
            >
              <UAvatar :alt="user?.email || 'User'" size="xs" />
            </UButton>
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { PRODUCT_NAME } from '~/constants/common'

const { user, signOut } = useAuth()
const userMenuOpen = ref(false)

const title: string = PRODUCT_NAME
const userMenuItems: DropdownMenuItem[][] = [
  [
    {
      label: 'Profile',
      icon: 'i-heroicons-user-20-solid',
      to: '/profile',
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
      onSelect: async () => {
        await signOut()
      },
    },
  ],
]
</script>
