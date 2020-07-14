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
      class="min-w-full mb-4 align-middle bg-white border-b border-gray-200 rounded shadow-md"
    >
      <div class="py-8">
        <div>
          <h3 class="px-4 text-xl font-semibold text-gray-600">Мои аукционы</h3>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    v-for="item in tableHeaders"
                    :key="item"
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
                  >
                    {{ item.text }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(auction, index) in auctions"
                  :key="auction"
                  class="border-b border-gray-200 last:border-b-0"
                >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="index + 1"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="auction.attributes.title"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="
                        ($moment(auction.attributes.starts_at).format('LL'),
                        $moment(auction.attributes.starts_at).format('LT'))
                      "
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="auction.attributes.price_min"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="
                        $store.getters['counterparties/byId']({
                          id: auction.relationships.seller.data.id,
                        }).attributes.display_name
                      "
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="
                        $store.getters['counterparties/byId']({
                          id: auction.relationships.organizer.data.id,
                        }).attributes.display_name
                      "
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <span
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                    >
                      {{ auction.attributes.status }}
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
      return this.counterparties
        ? this.$store.getters['auctions/where']({
            filter: this.auctionFilter,
          })
        : []
    },

    auctionIds() {
      const organizedIds = this.counterparties.map((counterparty) =>
        counterparty.relationships.organized_auctions.data.map(
          (data) => data.id
        )
      )
      const soldIds = this.counterparties.map((counterparty) =>
        counterparty.relationships.sold_auctions.data.map((data) => data.id)
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
