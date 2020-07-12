<template>
  <div class="container flex flex-col mx-auto">
    <div class="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2 xl:grid-cols-3">
      <upcoming-auctions :auctions="auctions.slice(0, 3)" />

      <div class="p-4 bg-white rounded shadow-md xl:col-span-2">
        <not-implemented suggest="account-seller-top" />
      </div>
    </div>

    <div class="flex justify-end mb-4">
      <nuxt-link
        :to="'#'"
        class="inline-flex px-4 py-2 mr-4 text-sm font-semibold text-black transition duration-150 bg-white border-2 rounded-lg shadow-sm hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
      >
        <plus-icon class="flex-shrink w-5 h-5 mr-2" />
        Новый лот
      </nuxt-link>

      <nuxt-link
        :to="{
          name: 'auctions-new',
        }"
        class="inline-flex px-4 py-2 text-sm font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg shadow-sm hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
      >
        <plus-icon class="flex-shrink w-5 h-5 mr-2" />
        Новый аукцион
      </nuxt-link>
    </div>

    <!-- table-component -->

    <div
      class="container mx-auto px-4 sm:px-8 antialiased font-sans bg-gray-200"
    >
      <div class="py-8">
        <div>
          <h2 class="text-2xl font-semibold leading-tight">
            Мои аукционы
          </h2>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            class="inline-block min-w-full shadow rounded-lg overflow-hidden"
          >
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    v-for="item in tableHeaders"
                    :key="item"
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {{ item.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="auction in auctions" :key="auction">
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    {{ item.id }}
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">Admin</p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      Jan 21, 2020
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <span
                      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      ></span>
                      <span class="relative">Active</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    await this.$store.dispatch('counterparties/loadRelated', {
      parent: this.$auth.user,
    })
    await this.$store.dispatch('auctions/loadWhere', {
      filter: this.auctionFilter,
    })
  },
  data: () => ({
    auctions: [
      {
        id: 0,
        attributes: {
          title: 'Проверка',
          starts_at: '2020-07-05T10:00:00+03:00',
          ends_at: '2020-07-05T18:00:00+03:00',
        },
      },
      {
        id: 1,
        attributes: {
          title: 'Проверка 2',
          starts_at: '2020-07-05T12:00:00+03:00',
          ends_at: '2020-07-05T16:00:00+03:00',
        },
      },
      {
        id: 2,
        attributes: {
          title: 'Проверка',
          starts_at: '2020-12-05T10:00:00+03:00',
          ends_at: '2020-12-05T18:00:00+03:00',
        },
      },
    ],
    tableHeaders: [
      { text: '№', value: 'id' },
      { text: 'Название', value: 'attributes.title' },
      { text: 'Начало торгов', value: 'attributes.starts_at' },
      { text: 'Начальная цена', value: 'attributes.price_start' },
      { text: 'Продавец', value: 'relationships.seller.data.id' },
      { text: 'Организатор', value: 'relationships.organizer.data.id' },
      { text: 'Статус', value: 'attributes.status' },
    ],
    upcomingAuctions: null,
  }),

  computed: {
    counterparties() {
      return this.$store.getters['counterparties/related']({
        parent: this.$auth.user,
      })
    },
    auctions() {
      return this.$store.getters['auctions/where']({
        filter: this.auctionFilter,
      })
    },

    auctionIds() {
      const organizedIds = this.counterparties.map((counterparty) =>
        counterparty.relationships.organized.data.map((data) => data.id)
      )
      const soldIds = this.counterparties.map((counterparty) =>
        counterparty.relationships.sold.data.map((data) => data.id)
      )
      return [].concat
        .apply([], soldIds)
        .concat([].concat.apply([], organizedIds))
    },

    auctionFilter() {
      return {
        id: this.auctionIds,
      }
    },
  },
}
</script>
