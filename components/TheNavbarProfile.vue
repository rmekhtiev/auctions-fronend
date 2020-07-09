<template>
  <div class="w-64 overflow-hidden bg-white rounded shadow-lg">
    <div class="p-6 text-center border-b">
      <img
        class="w-24 h-24 mx-auto rounded-full"
        :src="user.attributes.avatar"
        :alt="user.attributes.login"
      />
      <p
        class="pt-2 text-lg font-semibold"
        v-text="`@${user.attributes.login}`"
      />
      <p class="text-sm text-gray-600" v-text="user.attributes.email" />
      <!--
      <div class="mt-5">
        <a
          href="#"
          class="px-4 py-2 text-xs font-semibold text-gray-700 transition duration-150 ease-in-out border rounded-full hover:bg-gray-100"
        >
          Manage your Account
        </a>
      </div>
      -->
    </div>
    <div class="border-b">
      <nuxt-link
        :to="{ name: 'account' }"
        class="flex items-center px-4 py-2 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
        <div>
          <inbox-icon class="w-5 h-5" />
        </div>
        <div class="pl-3">
          <p class="text-sm font-medium leading-none">
            Уведомления
          </p>
          <p class="text-xs text-gray-500">События и сообщения</p>
        </div>
      </nuxt-link>
      <nuxt-link
        :to="{ name: 'account-profiles' }"
        class="flex items-center px-4 py-2 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
        <div>
          <users-icon class="w-5 h-5" />
        </div>
        <div class="pl-3">
          <p class="text-sm font-medium leading-none">
            Профили
          </p>
          <p class="text-xs text-gray-500">Юр. лица, ИП и физ. лица</p>
        </div>
      </nuxt-link>
      <a
        href="#"
        class="flex items-center px-4 py-2 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
        <div>
          <settings-icon class="w-5 h-5" />
        </div>
        <div class="pl-3">
          <p class="text-sm font-medium leading-none">
            Настройки
          </p>
          <p class="text-xs text-gray-500">Email, аккаунт, уведомления</p>
        </div>
      </a>
    </div>

    <!-- todo: в зависимости от роли показывать разное меню -->
    <div class="border-b">
      <nuxt-link
        :to="{
          name: 'account-customer',
        }"
        class="flex px-4 py-3 hover:bg-gray-100"
      >
        <p class="text-sm font-medium leading-none text-gray-800">
          Покупателю
        </p>
      </nuxt-link>
      <nuxt-link
        :to="{
          name: 'account-seller',
        }"
        class="flex px-4 py-3 hover:bg-gray-100"
      >
        <p class="text-sm font-medium leading-none text-gray-800">
          Продавцу
        </p>
      </nuxt-link>
    </div>

    <div class="">
      <a
        href="#"
        class="flex px-4 py-3 text-sm font-medium leading-none text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      >
        Помощь
      </a>
      <a
        href="#"
        class="flex px-4 py-3 text-sm font-medium leading-none text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        @click="logout()"
      >
        Выйти
      </a>
    </div>
  </div>
</template>

<script>
import {
  InboxIcon,
  UsersIcon,
  SettingsIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
} from 'vue-feather-icons'

export default {
  components: {
    InboxIcon,
    UsersIcon,
    SettingsIcon,
    // eslint-disable-next-line vue/no-unused-components
    ShoppingCartIcon,
    // eslint-disable-next-line vue/no-unused-components
    BriefcaseIcon,
  },
  data: () => ({}),
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    logout() {
      return this.$auth.logout().then(() => {
        this.$router.push({
          name: 'auth',
        })
      })
    },
  },
}
</script>
