<template>
  <div>
    <UCard class="shadow-xl border border-gray-100 rounded-2xl">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Forgot Password</h2>
        </div>
      </template>

      <div v-if="!isSuccess">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          :submit="{
            label: 'Send reset link',
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

        <div class="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div class="flex items-start">
            <UIcon name="i-lucide-info" class="text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
            <div class="text-sm text-primary-700">
              <p class="font-medium">Reset Instructions</p>
              <p class="mt-1">
                The password reset link will be valid for 1 hour. Please check your email (including
                spam folder) in time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-lucide-check-circle" class="text-green-600 text-2xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Email sent</h3>
        <p class="text-gray-600 mb-4">
          We have sent a password reset link to
          <strong class="text-primary-600">{{ submittedEmail }}</strong
          >.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton variant="outline" :loading="isResending" @click="resendEmail">
            <template #leading>
              <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" />
            </template>
            Resend email
          </UButton>
          <UButton to="/auth/login" variant="solid"> Return to login </UButton>
        </div>

        <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-left">
          <p class="text-sm text-green-700">
            <strong>Hint: </strong>
            If you do not receive the email, please check your spam folder or make sure you have
            entered the correct email address.
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  title: 'Forgot Password',
})

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    icon: 'i-lucide-user',
    required: true,
  },
]

const schema = z.object({
  email: z.string('Email is required').email('Invalid email'),
})

type Schema = z.output<typeof schema>

const toast = useToast()
const { resetPasswordForEmail } = useAuth()

const isLoading = ref(false)
const isSuccess = ref(false)
const isResending = ref(false)
const submittedEmail = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  const result = await resetPasswordForEmail(event.data.email)

  if (result.success) {
    submittedEmail.value = event.data.email
    isSuccess.value = true

    toast.add({
      title: 'Reset link sent',
      description: 'Please check your email and follow the instructions to reset your password.',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }

  isLoading.value = false
}

async function resendEmail() {
  if (!submittedEmail.value) return

  isResending.value = true

  const result = await resetPasswordForEmail(submittedEmail.value)

  if (result.success) {
    toast.add({
      title: 'Resent',
      description: 'A new reset link has been sent to your email',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }

  isResending.value = false
}
</script>
