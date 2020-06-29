<template>
  <!-- Profile dropdown -->
  <div
    v-click-outside="
      () => {
        profile = false
      }
    "
    class="relative ml-3"
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
    <div
      class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg"
      :class="{ block: profile, hidden: !profile }"
    >
      <div
        class="py-1 bg-white rounded-md shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <a
          href="#"
          class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          role="menuitem"
        >
          Личный кабинет
        </a>
        <a
          href="#"
          class="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
          role="menuitem"
        >
          Настройки
        </a>
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
