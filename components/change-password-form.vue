<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Change Password</h2>
        <UButton
          color="primary"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="$emit('cancel')"
        />
      </div>
    </template>

    <UForm :schema="schema" :state="formState" @submit="onSubmit">
      <div class="space-y-4">
        <UFormField label="Current Password" name="currentPassword">
          <UInput
            v-model="formState.currentPassword"
            type="password"
            placeholder="Enter current password"
            :disabled="isLoading"
            class="w-full"
          />
        </UFormField>

        <UFormField label="New Password" name="newPassword">
          <UInput
            v-model="formState.newPassword"
            type="password"
            placeholder="Enter new password"
            :disabled="isLoading"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Confirm New Password" name="confirmPassword">
          <UInput
            v-model="formState.confirmPassword"
            type="password"
            placeholder="Enter confirm new password"
            :disabled="isLoading"
            class="w-full"
          />
        </UFormField>

        <div class="p-3 bg-primary-50 rounded-lg border border-primary-200">
          <p class="text-sm font-medium text-primary-800 mb-1">Password requirements:</p>
          <ul class="text-xs text-primary-700 space-y-1">
            <li>• At least 8 characters</li>
            <li>• Contains uppercase and lowercase letters</li>
            <li>• Contains numbers</li>
            <li>• Cannot be the same as the current password</li>
          </ul>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-8">
        <UButton type="button" variant="outline" :disabled="isLoading" @click="$emit('cancel')">
          Cancel
        </UButton>
        <UButton type="submit" :loading="isLoading" :disabled="!isFormValid"> Submit </UButton>
      </div>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import * as z from 'zod'

const emit = defineEmits<{
  success: []
  cancel: []
}>()

const schema = z
  .object({
    currentPassword: z
      .string('Current password is required')
      .min(8, 'Must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Must contain uppercase and lowercase letters and numbers'
      ),
    newPassword: z
      .string('New password is required')
      .min(8, 'Must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Must contain uppercase and lowercase letters and numbers'
      ),
    confirmPassword: z
      .string('Confirm password is required')
      .min(8, 'Must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Must contain uppercase and lowercase letters and numbers'
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'The passwords entered twice do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'The new password cannot be the same as the current password',
    path: ['newPassword'],
  })

const isFormValid = computed(() => {
  return (
    formState.currentPassword &&
    formState.newPassword &&
    formState.confirmPassword &&
    formState.newPassword === formState.confirmPassword
  )
})

const toast = useToast()
const { updateUserPassword } = useAuth()

const isLoading = ref(false)
const formState = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

async function onSubmit() {
  isLoading.value = true

  const result = await updateUserPassword(formState.newPassword)

  if (result.success) {
    toast.add({
      title: 'Password updated successfully',
      description: 'Your password has been successfully updated.',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })

    Object.assign(formState, {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })

    emit('success')
  }

  isLoading.value = false
}
</script>
