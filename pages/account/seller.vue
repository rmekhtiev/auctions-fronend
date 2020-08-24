<template>
  <loading-spinner v-if="$fetchState.pending" />
  <div v-else class="container flex flex-col mx-auto">
    <div class="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2 xl:grid-cols-3">
      <upcoming-auctions :auctions="upcomingAuctions" />

      <div class="p-4 bg-white rounded shadow-md xl:col-span-2">
        <not-implemented suggest="account-seller-top" />
      </div>
    </div>

    <div class="flex justify-end mb-4">
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
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    v-for="item in tableHeaders"
                    :key="`header-${item.value}`"
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
                    :class="item.class"
                  >
                    {{ item.text }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <auction-table-row
                  v-for="auction in auctions"
                  :key="`auction-row-${auction.id}`"
                  :auction="auction"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatten from 'lodash.flatten'
import { PlusIcon } from 'vue-feather-icons'

export default {
  middleware: 'role',

  meta: {
    role: ['BANKRUPTCY_MANGER', 'ADMIN'],
  },

  components: {
    PlusIcon,
  },

  async fetch() {
    await this.$store.dispatch('counterparties/loadRelated', {
      parent: this.$auth.user,
      options: {
        include: [
          'organized-auctions',
          'organized-auctions.seller',
          'organized-auctions.organizer',
          'sold-auctions',
          'sold-auctions.seller',
          'sold-auctions.organizer',
        ],
      },
    })
  },

  data: () => ({
    tableHeaders: [
      { text: '№', value: 'id' },
      { text: 'Название', value: 'attributes.title' },
      { text: 'Начало торгов', value: 'attributes.starts_at' },
      {
        text: 'Начальная цена',
        value: 'attributes.price_start',
        class: 'text-right',
      },
      {
        text: 'Текущая цена',
        value: 'attributes.price_current',
        class: 'text-right',
      },
      {
        text: 'Участников',
        value: 'attributes.participants_count',
        class: 'text-center',
      },
      { text: 'Продавец', value: 'relationships.seller.data.id' },
      { text: 'Статус', value: 'attributes.status' },
    ],
  }),

  computed: {
    counterparties() {
      return this.$store.getters['counterparties/related']({
        parent: this.$auth.user,
      })
    },
    soldAuctions() {
      return flatten(
        this.counterparties
          .map((counterparty) =>
            this.$store.getters['auctions/related']({
              parent: counterparty,
              relationship: 'organized-auctions',
            })
          )
          .filter((auction) => !!auction)
      )
    },
    organizedAuctions() {
      return flatten(
        this.counterparties
          .map((counterparty) =>
            this.$store.getters['auctions/related']({
              parent: counterparty,
              relationship: 'sold-auctions',
            })
          )
          .filter((auction) => !!auction)
      )
    },
    auctions() {
      return this.removeDuplicates(
        [...this.soldAuctions, ...this.organizedAuctions],
        'id'
      ).sort(
        ({ attributes: { starts_at: a } }, { attributes: { starts_at: b } }) =>
          this.$moment(a).diff(b)
      )
    },
    upcomingAuctions() {
      return this.auctions
        .filter(({ attributes }) => attributes.status === 'UPCOMING')
        .slice(0, 5)
    },
  },

  methods: {
    removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos
      })
    },
  },

  head() {
    return {
      title: 'Продавцу',
    }
  },
}
</script>
