<template>
  <section>
    <div class="flex items-center justify-between my-4">
      <button
        type="button"
        class="inline-flex justify-center text-sm font-medium leading-5 text-gray-700"
      >
        Предстоящие торги
        <chevron-down-icon class="w-5 h-5 ml-2" />
      </button>

      <div
        class="inline-flex text-sm leading-none text-gray-500 bg-gray-200 border-2 border-gray-200 rounded-full"
      >
        <button
          id="grid"
          class="inline-flex items-center px-4 py-2 transition-colors duration-150 ease-in-out rounded-full rounded-l-full focus:outline-none hover:text-gray-800 focus:text-gray-800"
          :class="{
            'bg-white text-gray-800 focus:shadow-outline': display === 'grid',
          }"
          @click="display = 'grid'"
        >
          <grid-icon class="w-4 h-4 mr-2 fill-current" />
          <span>Grid</span>
        </button>
        <button
          id="list"
          class="inline-flex items-center px-4 py-2 transition-colors duration-150 ease-in-out rounded-full rounded-r-full focus:outline-none hover:text-gray-800 focus:text-gray-800"
          :class="{
            'bg-white text-gray-800 focus:shadow-outline': display === 'list',
          }"
          @click="display = 'list'"
        >
          <list-icon class="w-4 h-4 mr-2 fill-current" />
          <span>List</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-2 lg:grid-cols-4">
      <auction-card
        v-for="(auction, index) in auctions"
        :key="`home-auctions-${index}`"
      />
    </div>
    <div class="flex flex-row justify-end">
      <nuxt-link
        :to="'#'"
        class="block px-6 py-3 text-sm font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
      >
        Смотреть все
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { ChevronDownIcon, GridIcon, ListIcon } from 'vue-feather-icons'

export default {
  components: {
    ChevronDownIcon,
    GridIcon,
    ListIcon,
  },
  props: {
    auctions: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    display: 'grid',
  }),
}
</script>
