<template>
  <div class="container flex flex-col mx-auto">
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
                  v-for="(participation, index) in participations"
                  :key="participation"
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
                      v-text="
                        $store.getters['auctions/byId']({
                          id: participation.relationships.auction.data.id,
                        }).attributes.title
                      "
                    />
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
                        $store.getters['auctions/byId']({
                          id: participation.relationships.auction.data.id,
                        }).attributes.price_start
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
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <span
                      v-if="participation.attributes.approved_at"
                      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      ></span>
                      <span class="relative">Активный</span>
                    </span>

                    <span
                      v-else
                      class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                      ></span>
                      <span class="relative">На рассмотрении</span>
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
        Все аукционы
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
      { text: 'Контрагент' },
      { text: 'Начальная цена' },
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
  },
  middleware: 'role',
  meta: {
    role: ['USER'],
  },
}
</script>
