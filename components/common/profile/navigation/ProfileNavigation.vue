<template>
  <div class="flex flex-col justify-between w-64 bg-white shadow-md">
    <nav class="my-10">
      <nuxt-link
        :to="{ name: 'account' }"
        exact-active-class="bg-gray-200 border-r-4 border-gray-700"
        class="flex items-center px-8 py-2 mb-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
      >
        <inbox-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Уведомления</span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'account-profile' }"
        active-class="bg-gray-200 border-r-4 border-gray-700"
        class="flex items-center px-8 py-2 mb-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
      >
        <users-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Профили</span>
      </nuxt-link>

      <nuxt-link
        :to="'#'"
        active-class="bg-gray-200 border-r-4 border-gray-700"
        class="flex items-center px-8 py-2 mb-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
      >
        <settings-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Настройки</span>
      </nuxt-link>
    </nav>

    <nav class="my-10">
      <a
        class="flex items-center px-8 py-2 text-gray-500 transition duration-150 ease-in-out hover:text-gray-600"
        href="#"
      >
        <help-circle-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Помощь</span>
      </a>
    </nav>
  </div>
</template>

<script>
import {
  InboxIcon,
  UsersIcon,
  SettingsIcon,
  HelpCircleIcon,
} from 'vue-feather-icons'

export default {
  components: {
    InboxIcon,
    UsersIcon,
    SettingsIcon,
    HelpCircleIcon,
  },
}
</script>
