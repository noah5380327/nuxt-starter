<template>
  <div class="min-h-screen flex flex-col">
    <app-header />

    <main class="flex-1">
      <div class="container mx-auto px-4 py-6">
        <slot />
      </div>
    </main>

    <app-footer />
  </div>
</template>
