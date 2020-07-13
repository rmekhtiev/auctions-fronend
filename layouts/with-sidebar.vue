<template>
  <div class="flex flex-col min-h-screen">
    <the-navbar />

    <div class="relative flex flex-1 pt-16 lg:flex-grow">
      <aside
        class="fixed inset-x-0 bottom-0 z-30 w-screen shadow lg:shadow-none lg:static lg:w-64 lg:flex-shrink-0"
      >
        <profile-navigation class="h-full" />
      </aside>
      <div class="flex flex-grow pb-16 overflow-hidden lg:pb-0">
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
