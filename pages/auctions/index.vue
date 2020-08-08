<template>
  <div class="container flex flex-col mx-auto">
    <home-auctions
      :auctions="auctions"
      :filters="filter"
      :filters-options="filterOptions"
      :pending="$fetchState.pending"
    />
    <div v-if="lastMeta && lastMeta.page">
      <div class="flex justify-between flex-1 sm:hidden">
        <component
          :is="$store.getters['auctions/hasPrevious'] ? 'nuxt-link' : 'button'"
          :to="{ path: $route.path, query: { page: page - 1 } }"
          :disabled="!$store.getters['auctions/hasPrevious']"
          :class="{
            'opacity-50 cursor-not-allowed': !$store.getters[
              'auctions/hasPrevious'
            ],
          }"
          class="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
        >
          Назад
        </component>
        <component
          :is="$store.getters['auctions/hasNext'] ? 'nuxt-link' : 'button'"
          :to="{ path: $route.path, query: { page: page + 1 } }"
          :disabled="!$store.getters['auctions/hasNext']"
          :class="{
            'opacity-50 cursor-not-allowed': !$store.getters[
              'auctions/hasNext'
            ],
          }"
          class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
        >
          Вперед
        </component>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm leading-5 text-gray-700">
            Показано с
            <span class="font-medium">{{ lastMeta.page.from }}</span>
            по
            <span class="font-medium">{{ lastMeta.page.to }}</span>
            из
            <span class="font-medium">{{ lastMeta.page.total }}</span>
            всего
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex shadow-sm">
            <nuxt-link
              v-if="$store.getters['auctions/hasPrevious']"
              :to="{ path: $route.path, query: { page: page - 1 } }"
              class="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
              aria-label="Назад"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </nuxt-link>
            <component
              :is="showPaginationItem(p) ? 'nuxt-link' : 'button'"
              v-for="p in lastMeta.page['last-page']"
              v-show="showPaginationItem(p) || showPaginationItem(p + 1)"
              :key="`auctions-pagination-${p}`"
              :to="{ path: $route.path, query: { page: p } }"
              class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700"
            >
              {{ showPaginationItem(p) ? p : '...' }}
            </component>
            <nuxt-link
              v-if="$store.getters['auctions/hasNext']"
              :to="{ path: $route.path, query: { page: page + 1 } }"
              class="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500"
              aria-label="Вперед"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </nuxt-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import omitby from 'lodash.omitby'

export default {
  async fetch() {
    const options = {
      ...this.pageOptions,
    }

    Object.entries(this.pureFilter).forEach(([key, value]) => {
      options[`filter[${key}]`] = value
    })

    await this.$store.dispatch('auctions/loadPage', {
      options,
      filter: this.pureFilter,
    })
  },
  watchQuery: true,
  data: () => ({
    filterOptions: {
      status: ['UPCOMING'],
      category: [
        undefined,
        'realty',
        'vehicle',
        'equipment',
        'receivables',
        'enterprise',
        'spare-part',
        'inventory',
      ],
    },
    filter: {
      status: 'UPCOMING',
      category: undefined,
    },
  }),
  computed: {
    page: {
      get() {
        return parseInt(this.$route.query.page ?? 1)
      },
      set(val) {
        this.$router.push({ path: this.$route.path, query: { page: val } })
      },
    },
    pureFilter() {
      return omitby(this.filter, (value) => value === undefined)
    },
    lastMeta() {
      return this.$store.getters['auctions/lastMeta']
    },
    pageOptions() {
      return {
        'page[size]': 12,
        'page[number]': this.page,
      }
    },
    auctions() {
      return this.$store.getters['auctions/page']
    },
  },
  watch: {
    filter: {
      deep: true,
      handler(_newValue) {
        this.page = 1
        this.$fetch()
      },
    },
    '$route.query': '$fetch',
  },
  methods: {
    showPaginationItem(p) {
      return (
        p <= 2 ||
        p >= this.lastMeta.page['last-page'] - 1 ||
        Math.abs(p - this.page) <= 1
      )
    },
  },
}
</script>
