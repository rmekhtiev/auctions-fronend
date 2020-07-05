<template>
  <div class="flex flex-col justify-between bg-white shadow-md">
    <nav class="sticky py-10 top-16">
      <nuxt-link
        :to="{ name: 'account' }"
        exact-active-class="bg-gray-200 border-gray-700"
        class="flex items-center py-4 pl-8 pr-2 mb-2 text-gray-700 transition duration-150 ease-in-out border-r-4 border-transparent hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <inbox-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Уведомления</span>

        <span
          class="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-300 bg-opacity-25 rounded-full"
        >
          24
        </span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'account-profiles' }"
        active-class="bg-gray-200 border-gray-700"
        class="flex items-center py-4 pl-8 pr-2 mb-2 text-gray-700 transition duration-150 ease-in-out border-r-4 border-transparent hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <users-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Профили</span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'account-settings' }"
        active-class="bg-gray-200 border-gray-700"
        class="flex items-center py-4 pl-8 pr-2 mb-2 text-gray-700 transition duration-150 ease-in-out border-r-4 border-transparent hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <settings-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Настройки</span>
      </nuxt-link>

      <div class="my-2 border-t border-gray-300"></div>

      <nuxt-link
        :to="{
          name: 'account-customer',
        }"
        active-class="bg-gray-200 border-r-4 border-gray-700"
        class="flex items-center py-4 pl-8 pr-2 mb-2 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <shopping-cart-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Покупателю</span>
      </nuxt-link>

      <nuxt-link
        :to="{
          name: 'account-seller',
        }"
        active-class="bg-gray-200 border-r-4 border-gray-700"
        class="flex items-center py-4 pl-8 pr-2 mb-2 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <briefcase-icon class="w-5 h-5" />

        <span class="mx-4 font-medium">Продавцу</span>
      </nuxt-link>
    </nav>

    <nav class="py-10">
      <a
        class="flex items-center py-4 pl-8 pr-2 text-gray-500 transition duration-150 ease-in-out hover:text-gray-600"
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
  ShoppingCartIcon,
  BriefcaseIcon,
  HelpCircleIcon,
} from 'vue-feather-icons'

export default {
  components: {
    InboxIcon,
    UsersIcon,
    SettingsIcon,
    ShoppingCartIcon,
    BriefcaseIcon,
    HelpCircleIcon,
  },
}
</script>
