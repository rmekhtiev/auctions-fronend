<template>
  <div>
    <the-navbar />

    <main class="relative h-0 min-h-screen pt-16">
      <Nuxt />
    </main>
    <the-footer />
  </div>
</template>

<style>
html,
body {
  @apply bg-gray-100 h-screen;
}
</style>
