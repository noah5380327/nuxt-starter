<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
      <p class="text-gray-600 mt-1">Manage your account information</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <UCard class="lg:col-span-2">
        <template #header>
          <h2 class="text-lg font-semibold">Personal Information</h2>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UFormField label="Email">
              <UInput :value="user?.email" disabled />
            </UFormField>

            <UFormField label="User ID">
              <UInput :value="user?.id" disabled />
            </UFormField>
          </div>
        </div>
      </UCard>

      <div class="space-y-6">
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">Account Operations</h2>
          </template>

          <div class="space-y-3">
            <UModal v-model:open="showChangePasswordModal">
              <UButton variant="outline" class="w-full justify-start"> Change Password </UButton>
              <template #content>
                <change-password-form
                  @success="onPasswordChangeSuccess"
                  @cancel="showChangePasswordModal = false"
                />
              </template>
            </UModal>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Profile',
})

const { user } = useAuth()

const showChangePasswordModal = ref(false)

const onPasswordChangeSuccess = () => {
  showChangePasswordModal.value = false
}
</script>
