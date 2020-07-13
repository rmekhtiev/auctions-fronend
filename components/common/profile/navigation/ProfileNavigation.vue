<template>
  <div class="flex justify-between bg-white shadow-md lg:flex-col">
    <nav
      class="flex flex-row items-stretch justify-around w-full lg:py-10 lg:block lg:sticky top-16"
    >
      <nuxt-link
        :to="{ name: 'account' }"
        exact-active-class="bg-gray-200 border-gray-700"
        class="relative flex items-center justify-center flex-1 px-4 py-4 text-gray-700 transition duration-150 ease-in-out border-b-4 border-transparent lg:justify-start lg:pl-8 lg:pr-2 lg:border-b-0 lg:border-r-4 lg:mb-2 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <inbox-icon class="w-5 h-5" />

        <span class="hidden mx-4 font-medium lg:inline">Уведомления</span>

        <span
          class="absolute inline-flex px-2 text-xs font-semibold leading-5 text-red-800 transform translate-x-1/2 -translate-y-1/2 bg-red-300 bg-opacity-25 rounded-full lg:transform-none lg:static"
        >
          24
        </span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'account-profiles' }"
        active-class="bg-gray-200 border-gray-700"
        class="relative flex items-center justify-center flex-1 px-4 py-4 text-gray-700 transition duration-150 ease-in-out border-b-4 border-transparent lg:justify-start lg:pl-8 lg:pr-2 lg:border-b-0 lg:border-r-4 lg:mb-2 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <users-icon class="w-5 h-5" />

        <span class="hidden mx-4 font-medium lg:inline">Профили</span>
      </nuxt-link>

      <nuxt-link
        :to="{ name: 'account-settings' }"
        active-class="bg-gray-200 border-gray-700"
        class="relative items-center justify-center flex-1 hidden px-4 py-4 text-gray-700 transition duration-150 ease-in-out border-b-4 border-transparent lg:flex lg:justify-start lg:pl-8 lg:pr-2 lg:border-b-0 lg:border-r-4 lg:mb-2 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <settings-icon class="w-5 h-5" />

        <span class="hidden mx-4 font-medium lg:inline">Настройки</span>
      </nuxt-link>

      <div class="my-2 border-t border-gray-300"></div>

      <nuxt-link
        :to="{
          name: 'account-customer',
        }"
        active-class="bg-gray-200 border-gray-700"
        class="relative flex items-center justify-center flex-1 px-4 py-4 text-gray-700 transition duration-150 ease-in-out border-b-4 border-transparent lg:justify-start lg:pl-8 lg:pr-2 lg:border-b-0 lg:border-r-4 lg:mb-2 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <shopping-cart-icon class="w-5 h-5" />

        <span class="hidden mx-4 font-medium lg:inline">Покупателю</span>
      </nuxt-link>

      <nuxt-link
        :to="{
          name: 'account-seller',
        }"
        active-class="bg-gray-200 border-gray-700"
        class="relative flex items-center justify-center flex-1 px-4 py-4 text-gray-700 transition duration-150 ease-in-out border-b-4 border-transparent lg:justify-start lg:pl-8 lg:pr-2 lg:border-b-0 lg:border-r-4 lg:mb-2 hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:bg-gray-200"
        role="menuitem"
      >
        <briefcase-icon class="w-5 h-5" />

        <span class="hidden mx-4 font-medium lg:inline">Продавцу</span>
      </nuxt-link>
    </nav>

    <nav class="hidden py-10 lg:block">
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
