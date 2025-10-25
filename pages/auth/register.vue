<template>
  <div>
    <UCard class="shadow-xl border border-gray-100 rounded-2xl">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Register</h2>
        </div>
      </template>

      <div v-if="!isSuccess">
        <UAuthForm
          :schema="schema"
          :fields="fields"
          :submit="{
            label: 'Submit',
            loading: isLoading,
            color: 'primary',
            size: 'lg',
            block: true,
          }"
          icon="i-lucide-lock"
          @submit="onSubmit"
        >
          <template #description>
            Already have an account?
            <ULink to="/auth/login" class="text-primary font-medium">Sign In</ULink>.
          </template>
        </UAuthForm>
      </div>

      <div v-else class="text-center py-8">
        <div
          class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <UIcon name="i-lucide-check-circle" class="text-green-600 text-2xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Reset email sent</h3>
        <p class="text-gray-600 mb-4">
          We have sent a sign up link to
          <strong class="text-primary-600">{{ submittedEmail }}</strong
          >.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton to="/auth/login" variant="solid"> Return to login </UButton>
        </div>

        <div class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-left">
          <p class="text-sm text-green-700">
            <strong>Hint: </strong>
            If you do not receive the email, please check your spam folder or make sure you have
            entered the correct UQ email address.
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
  title: 'Register',
})

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    icon: 'i-lucide-user',
    required: true,
  },
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
    email: z.string('Email is required').email('Invalid email'),
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
const { signUpWithEmail } = useAuth()

const isLoading = ref(false)
const isSuccess = ref(false)
const submittedEmail = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  const result = await signUpWithEmail(event.data.email, event.data.password)

  if (result.success) {
    submittedEmail.value = event.data.email
    isSuccess.value = true

    toast.add({
      title: 'Register link sent',
      description:
        'Please check your email and follow the instructions to complete your registration.',
      color: 'success',
      icon: 'i-lucide-check-circle',
    })
  }

  isLoading.value = false
}
</script>
