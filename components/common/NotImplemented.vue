<template>
  <div class="flex flex-col items-center justify-center min-h-full mx-auto">
    <div
      class="flex flex-col items-center justify-center max-w-sm text-center text-gray-700"
    >
      <div
        class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
      >
        <activity-icon class="w-16 h-16" />
      </div>
      <span class="mx-4 text-xl font-medium">Сейчас здесь пусто</span>
      <p v-if="!suggest" class="m-4 italic">
        Скоро мы это исправим, а пока что попробуйте
        <nuxt-link
          :to="{ name: 'account-profiles-new' }"
          class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
        >
          заполнить профиль
        </nuxt-link>
      </p>
      <p v-else class="mx-4 my-2 italic">
        Помогите нам стать лучше и
        <a
          :href="`mailto:gitlab+d-1-huskymedia-auctions-auctions-frontend-20-issue-@devolt.one?subject=Предложение для секции ${suggest}`"
          class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
          target="_blank"
          >расскажите</a
        >, что бы Вы хотели здесь видеть
      </p>
    </div>
  </div>
</template>

<script>
import { ActivityIcon } from 'vue-feather-icons'

export default {
  components: {
    ActivityIcon,
  },
  props: {
    suggest: {
      type: String,
      default: null,
    },
  },
}
</script>
