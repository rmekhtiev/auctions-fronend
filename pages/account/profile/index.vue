<template>
  <div v-if="Array.isArray(accounts) && accounts.length" class="flex flex-col">
    <div
      class="min-w-full align-middle bg-white border-b border-gray-200 rounded shadow-md"
    >
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
            >
              Название
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
            >
              Идентификатор
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
            >
              Статус
            </th>
            <th class="px-6 py-3 border-b border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          <account-row
            v-for="(account, index) in accounts"
            :key="`account-${index}`"
            :account="account"
          />
        </tbody>
      </table>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center min-h-full mx-auto"
  >
    <div
      class="flex flex-col items-center justify-center max-w-sm text-center text-gray-700"
    >
      <nuxt-link
        :to="{ name: 'account-profile-new' }"
        class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
      >
        <plus-icon class="w-16 h-16" />
      </nuxt-link>
      <span class="mx-4 mb-4 text-xl font-medium">Добавьте профиль</span>
      <p class="mx-4 italic">
        Что бы участвовать в торгах, сначала надо
        <nuxt-link
          :to="{ name: 'account-profile-new' }"
          class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
        >
          заполнить профиль
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'

export default {
  components: {
    PlusIcon,
  },

  async fetch() {
    await this.$store.dispatch('accounts/loadRelated', {
      parent: this.$auth.user,
    })
  },

  computed: {
    accounts() {
      return this.$store.getters['accounts/related']({
        parent: this.$auth.user,
      })
    },
  },
}
</script>
