<template>
  <div class="flex flex-col min-h-screen">
    <the-navbar />

    <main class="relative flex-grow pt-16">
      <nuxt class="py-4" />
      <salesrooms />
    </main>

    <the-footer />
  </div>
</template>

<style>
html,
body {
  @apply bg-gray-100;
  @apply min-h-screen;
}
</style>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: this.$exp.$classes.join(' '),
      },
    }
  },
}
</script>
