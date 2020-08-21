<template>
  <nav class="fixed z-40 w-full bg-gray-800">
    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <!-- Mobile menu button-->
          <button
            class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            aria-label="Main menu"
            aria-expanded="false"
            @click="open = !open"
          >
            <!-- Icon when menu is closed. -->
            <svg
              v-show="!open"
              class="block w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open. -->
            <svg
              v-show="open"
              class="block w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex items-center justify-center flex-1 lg:items-stretch lg:justify-start"
        >
          <nuxt-link :to="{ name: 'index' }" class="flex-shrink-0 text-2xl text-white">
            Realtorgi.by
          </nuxt-link>
          <div class="hidden lg:block lg:ml-6">
            <div class="flex">
              <nuxt-link
                v-for="(item, index) in menu"
                :key="`menu-item-${index}`"
                :to="item.to"
                :class="{ 'ml-4': index !== 0 }"
                class="px-3 py-2 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                {{ item.title }}
              </nuxt-link>

              <nuxt-link
                v-if="displayNotifications"
                :to="'#'"
                class="px-3 py-2 ml-4 text-sm font-medium leading-5 text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Контакты
              </nuxt-link>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0"
        >
          <div
            v-if="!displayNotifications"
            class="flex-col items-end hidden mr-4 md:flex"
          >
            <a
              href="#"
              class="text-lg font-bold leading-none text-gray-300 no-underline hover:text-white focus:text-white"
            >
              +375 (29) 357-01-01
            </a>
            <a
              href="#"
              class="text-xs leading-tight text-gray-300 no-underline hover:text-white focus:text-white"
            >
              info@auctions.by
            </a>
          </div>
          <template v-if="$auth.$state.loggedIn">
            <button
              v-if="displayNotifications"
              class="p-1 mr-3 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
              aria-label="Notifications"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

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
                    :alt="user.attributes.login"
                  />
                </button>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out transform"
                enter-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in transform"
                leave-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <the-navbar-profile v-show="profile" class="absolute right-0" />
              </transition>
            </div>
          </template>
          <template v-else>
            <nuxt-link
              :to="{ name: 'auth' }"
              class="px-3 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-700"
              @click.native="tryAutoSignIn"
            >
              Войти в аккаунт
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>

    <!--
      Mobile menu, toggle classes based on menu state.

      Menu open: "block", Menu closed: "hidden"
    -->
    <div :class="{ block: open, hidden: !open }" class="lg:hidden">
      <div class="px-2 pt-2 pb-3">
        <nuxt-link
          v-for="(item, index) in menu"
          :key="`menu-item-${index}`"
          :to="item.to"
          :class="{ 'mt-1': index !== 0 }"
          class="block px-3 py-2 text-base font-medium text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          {{ item.title }}
        </nuxt-link>

        <nuxt-link
          v-if="displayNotifications"
          :to="'#'"
          class="block px-3 py-2 mt-1 text-base font-medium text-gray-300 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Контакты
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import clickOutside from 'vue-click-outside'

export default {
  directives: {
    clickOutside,
  },
  data: () => ({
    appName: 'Auctions',
    open: false,
    profile: false,
    menu: [
      {
        title: 'Аукционы',
        to: { name: 'auctions' },
      },
      {
        title: 'Новости',
        to: '#',
      },
      {
        title: 'Как участвовать',
        to: '#',
      },
      {
        title: 'Организаторам',
        to: '#',
      },
      {
        title: 'О площадке',
        to: '#',
      },
    ],
  }),
  computed: {
    user() {
      return this.$auth.user
    },
    displayNotifications() {
      return (
        this.$exp.name === 'navbar-contacts' &&
        this.$exp.$activeVariants.some(({ name }) => name === 'notifications')
      )
    },
  },
  methods: {
    async tryAutoSignIn(event) {
      if (!window.PasswordCredential) {
        return
      }

      const credential = await navigator.credentials.get({
        password: true,
        mediation: 'optional',
      })

      if (!credential) {
        return
      }

      const response = await this.$auth.loginWith('local', {
        data: {
          email: credential.id,
          password: credential.password,
        },
      })

      if (response) event.preventDefault()
    },
  },
}
</script>
