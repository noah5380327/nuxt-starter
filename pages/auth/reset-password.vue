<template>
  <div>
    <UCard class="shadow-xl border border-gray-100 rounded-2xl">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Reset Password</h2>
        </div>
      </template>

      <div v-if="isLoadingSession" class="text-center py-8">
        <div class="flex justify-center">
          <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-600" />
        </div>
        <p class="mt-4 text-gray-600">Verifying reset link...</p>
      </div>

      <div v-else-if="sessionError" class="text-center py-8">
        <div
          class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-lucide-alert-circle" class="text-red-600 text-2xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">The link is invalid or expired</h3>
        <p class="text-gray-600 mb-4">{{ sessionError }}</p>
        <UButton to="/auth/forgot-password" variant="solid" class="mb-2">
          Re-request reset link
        </UButton>
        <div class="mt-4 text-sm text-gray-500">
          Or <ULink to="/auth/login" class="text-primary-600 hover:text-primary-500">Sign In</ULink>
        </div>
      </div>

      <div v-else-if="!isSuccess">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          :submit="{
            label: 'Reset password',
            loading: isLoading,
            color: 'primary',
            size: 'lg',
            block: true,
          }"
          icon="i-lucide-mail"
          @submit="onSubmit"
        >
          <template #description>
            <div class="text-center text-sm text-gray-600">
              Remember the password?
              <ULink
                to="/auth/login"
                class="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
              >
                Sign In
              </ULink>
            </div>
          </template>
        </UAuthForm>
      </div>

      <div v-else class="text-center py-8">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-lucide-check-circle" class="text-green-600 text-2xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Password updated successfully</h3>
        <p class="text-gray-600 mb-6">
          Your password has been updated successfully. You can now log in using your new password.
        </p>
        <UButton to="/auth/login" variant="solid" size="lg"> Sign In </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  title: 'Reset Password',
})

const fields: AuthFormField[] = [
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    icon: 'i-lucide-lock',
    required: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    icon: 'i-lucide-lock',
    required: true,
  },
]

const schema = z
  .object({
    password: z
      .string('Password is required')
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
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords entered twice do not match',
    path: ['confirmPassword'],
  })

type Schema = z.output<typeof schema>

const toast = useToast()
const { getResetLinkSession, updateUserPassword } = useAuth()

const isLoading = ref(false)
const isLoadingSession = ref(true)
const isSuccess = ref(false)
const sessionError = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  const result = await updateUserPassword(event.data.password)

  if (result.success) {
    isSuccess.value = true

    toast.add({
      title: 'Password updated successfully',
      description: 'Your password has been successfully updated.',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }

  isLoading.value = false
}

async function checkSession() {
  const result = await getResetLinkSession()

  if (!result.success) {
    sessionError.value = result.error
  }

  isLoadingSession.value = false
}

onMounted(async () => {
  await checkSession()
})
</script>
