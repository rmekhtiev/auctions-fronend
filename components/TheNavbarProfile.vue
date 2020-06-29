<template>
  <!-- Profile dropdown -->
  <div
    v-click-outside="
      () => {
        profile = false
      }
    "
    class="relative"
  >
    <div>
      <button
        id="user-menu"
        class="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-white"
        aria-label="User menu"
        aria-haspopup="true"
        @click="profile = !profile"
      >
        <img
          class="w-8 h-8 rounded-full"
          :src="user.attributes.avatar"
          alt="user.attributes.login"
        />
      </button>
    </div>
    <!--
      Profile dropdown panel, show/hide based on dropdown state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
    <transition
      enter-active-class="transition duration-100 ease-out transform"
      enter-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in transform"
      leave-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="profile"
        class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
      >
        <div
          class="py-1 bg-white rounded-md shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <nuxt-link
            :to="{ name: 'account' }"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            Личный кабинет
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'account-settings' }"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            role="menuitem"
          >
            Настройки
          </nuxt-link>
          <a
            href="#"
            class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            role="menuitem"
            @click.prevent="logout"
          >
            Выйти
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import clickOutside from 'vue-click-outside'

export default {
  directives: {
    clickOutside,
  },
  data: () => ({
    profile: false,
  }),
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
