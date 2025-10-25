<template>
  <div>
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">Dashboard</h1>
          <UButton @click="signOut">Logout</UButton>
        </div>
      </template>

      <div class="space-y-4">
        <p>Welcome back, {{ user?.email }}</p>
      </div>
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Dashboard',
})

const { user, signOut } = useAuth()
</script>
