<template>
  <loading-spinner v-if="$fetchState.pending" />
  <div v-else class="container flex flex-col mx-auto">
    <div class="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2 xl:grid-cols-3">
      <upcoming-auctions :auctions="auctions.slice(0, 3)" />

      <div class="p-4 bg-white rounded shadow-md xl:col-span-2">
        <not-implemented suggest="account-seller-top" />
      </div>
    </div>

    <!-- table-component -->
    <div
      class="min-w-full mb-4 align-middle bg-white border-b border-gray-200 rounded shadow-md"
    >
      <div class="py-8">
        <div>
          <h3 class="px-4 text-xl font-semibold text-gray-600">Мои заявки</h3>
        </div>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    v-for="item in tableHeaders"
                    :key="`table-header-${item.text}`"
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200"
                  >
                    {{ item.text }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <!-- <tr
                  v-if="$fetchState.pending"
                  class="border-b border-gray-200 last:border-b-0"
                >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm font-medium leading-5 text-gray-900" />
                  </td>
                  Загрузка аукционов...
                </tr>
                todo add lazy loading-->
                <tr
                  v-for="participation in participations"
                  :key="`reqest-${participation.id}`"
                  class="border-b border-gray-200 last:border-b-0"
                >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="participation.id"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm font-medium leading-5 text-gray-900">
                      <nuxt-link
                        class="font-semibold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                        :to="{
                          name: 'auctions-id',
                          params: {
                            id: participation.relationships.auction.data.id,
                          },
                        }"
                      >
                        {{
                          $store.getters['auctions/byId']({
                            id: participation.relationships.auction.data.id,
                          }).attributes.title
                        }}
                      </nuxt-link>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="
                        $store.getters['counterparties/byId']({
                          id: participation.relationships.counterparty.data.id,
                        }).attributes.display_name
                      "
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm font-medium leading-5 text-gray-900"
                      v-text="
                        $moment(
                          $store.getters['auctions/byId']({
                            id: participation.relationships.auction.data.id,
                          }).attributes.starts_at
                        ).format('LLL')
                      "
                    />
                  </td>
                  <td
                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                  >
                    <span
                      v-if="participation.attributes.approved_at"
                      class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                      ></span>
                      <span class="relative">Одобрена</span>
                    </span>

                    <span
                      v-else
                      class="relative inline-block px-3 py-1 font-semibold leading-tight text-orange-900"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-orange-200 rounded-full opacity-50"
                      ></span>
                      <span class="relative">На&nbsp;рассмотрении</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mb-4">
      <nuxt-link
        :to="{
          name: 'auctions',
        }"
        class="inline-flex px-4 py-2 text-sm font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg shadow-sm hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
      >
        Найти еще аукционы
        <arrow-right-icon class="flex-shrink w-5 h-5 ml-2" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'

export default {
  components: {
    ArrowRightIcon,
  },
  async fetch() {
    await this.$store.dispatch('participation-requests/loadRelated', {
      parent: this.$auth.user,
    })
  },
  data: () => ({
    tableHeaders: [
      { text: '№', value: 'id' },
      { text: 'Название аукциона' },
      { text: 'Профиль' },
      { text: 'Начало торгов' },
      { text: 'Статус', value: 'attributes.status' },
    ],
  }),
  computed: {
    participations() {
      return this.$store.getters['participation-requests/related']({
        parent: this.$auth.user,
      })
    },
    auctions() {
      return this.participations.map((participation) =>
        this.$store.getters['auctions/byId']({
          id: participation.relationships.auction.data.id,
        })
      )
    },
  },
  middleware: 'role',
  meta: {
    role: ['USER'],
  },
}
</script>
