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
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'

export default {
  // middleware: ['role'],

  middleware: 'role',
  meta: {
    role: ['BANKRUPTCY_MANGER'],
  },

  components: {
    PlusIcon,
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
  }),
}
</script>
