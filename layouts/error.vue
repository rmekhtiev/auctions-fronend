<template>
  <div class="container mx-auto text-center">
    <h1 class="text-6xl">{{ error.statusCode }}</h1>
    <h1 class="text-2xl text-gray-600">{{ error.message }}</h1>
    <nuxt-link
      :to="'/'"
      class="inline-flex px-4 py-2 mt-8 text-sm font-semibold text-black transition duration-150 bg-white border-2 rounded-lg shadow-sm hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
    >
      <arrow-left-icon class="flex-shrink w-5 h-5 mr-2" />
      На главную
    </nuxt-link>
  </div>
</template>
<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
  components: { ArrowLeftIcon },
  props: ['error'],
}
</script>
