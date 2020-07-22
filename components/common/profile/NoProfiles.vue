<template>
  <div
    class="flex flex-col items-center justify-center max-w-sm mx-auto text-center text-gray-700"
  >
    <nuxt-link
      :to="{ name: 'account-profiles-new' }"
      class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
    >
      <plus-icon class="w-16 h-16" />
    </nuxt-link>
    <span class="mx-4 text-xl font-medium">Добавьте профиль</span>
    <p class="m-4 italic">
      Что бы участвовать в торгах, сначала надо
      <nuxt-link
        :to="{ name: 'account-profiles-new' }"
        class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
      >
        заполнить профиль
      </nuxt-link>
    </p>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'

export default {
  components: {
    PlusIcon,
  },
}
</script>
