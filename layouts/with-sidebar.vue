<template>
  <div class="flex flex-col min-h-screen">
    <the-navbar />

    <div class="relative flex flex-grow pt-16">
      <aside class="flex-shrink-0 w-64">
        <profile-navigation class="h-full" />
      </aside>
      <div class="flex flex-grow">
        <main class="flex flex-col w-full py-4">
          <nuxt />
        </main>
        <!-- <the-footer class="px-4" /> -->
      </div>
    </div>
  </div>
</template>

<style>
html,
body {
  @apply bg-gray-100;
  @apply min-h-screen;
}
</style>
