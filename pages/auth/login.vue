<template>
  <div>
    <UCard class="shadow-xl border border-gray-100 rounded-2xl">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900">Login</h2>
        </div>
      </template>

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
          <div class="text-center text-sm text-gray-600">
            Don't have an account yet?
            <ULink
              to="/auth/register"
              class="text-primary-600 hover:text-primary-500 font-semibold transition-colors"
            >
              Sign Up
            </ULink>
          </div>
        </template>

        <template #password-hint>
          <div class="flex justify-between items-center">
            <ULink
              to="/auth/forgot-password"
              class="text-sm text-primary-600 hover:text-primary-500 font-medium transition-colors"
            >
              Forgot password？
            </ULink>
          </div>
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
  title: 'Login',
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
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
  },
]

const schema = z.object({
  email: z
    .string('Email is required')
    .email('Invalid email')
    .refine((email) => email.includes('@uq.edu.au') || email.includes('@student.uq.edu.au'), {
      message: 'Invalid UQ email',
    }),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Must contain uppercase and lowercase letters and numbers'
    ),
})

type Schema = z.output<typeof schema>

const toast = useToast()
const { signInWithEmail } = useAuth()

const isLoading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  const result = await signInWithEmail(event.data.email, event.data.password)

  if (result.success) {
    toast.add({
      title: 'Login successful',
      description: 'Welcome back!',
      color: 'success',
    })
    await navigateTo('/dashboard')
  }

  isLoading.value = false
}
</script>
