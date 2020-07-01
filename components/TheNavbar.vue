<template>
  <nav class="fixed z-40 w-full bg-gray-800">
    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
          class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start"
        >
          <nuxt-link :to="{ name: 'index' }" class="flex-shrink-0">
            <img
              class="block w-auto h-8 lg:hidden"
              src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
              alt="Workflow logo"
            />
            <img
              class="hidden w-auto h-8 lg:block"
              src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg"
              alt="Workflow logo"
            />
          </nuxt-link>
          <div class="hidden sm:block sm:ml-6">
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
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="flex flex-col items-end">
            <a
              href="#"
              class="font-sans text-xl font-bold leading-none text-gray-300 no-underline hover:text-white focus:text-white"
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
            <!--
            <button
              class="p-1 text-gray-400 transition duration-150 ease-in-out border-2 border-transparent rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
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
            -->

            <the-navbar-profile />
          </template>
          <template v-else>
            <nuxt-link
              :to="{ name: 'auth' }"
              class="px-3 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-700"
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
    <div :class="{ block: open, hidden: !open }" class="sm:hidden">
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
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    appName: 'Auctions',
    open: false,
    menu: [
      {
        title: 'Аукционы',
        to: '#',
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
}
</script>
