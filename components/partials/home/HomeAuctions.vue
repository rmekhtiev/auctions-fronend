<template>
  <section>
    <div class="flex items-center justify-between my-4">
      <div class="flex">
        <slot name="filters">
          <slot v-for="(filter, name) in filters" :name="`filters.${name}`">
            <div
              :key="`filter-${name}`"
              class="relative mr-4 text-gray-500 duration-150 ease-in-out hover-within:text-gray-800"
            >
              <select
                :id="`option-${name}`"
                v-model="filters[name]"
                type="button"
                :disabled="pending"
                class="px-4 py-2 pr-12 text-sm leading-none transition-colors bg-white border-2 border-gray-200 rounded-full rounded-l-full appearance-none focus:shadow-outline focus:outline-none"
              >
                <option
                  v-for="filtersOption in filtersOptions[name]"
                  :key="`filter-${name}-option-${filtersOption}`"
                  :value="filtersOption"
                >
                  {{ $t(`auctions.${name}.${filtersOption}`) }}
                </option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none"
              >
                <chevron-down-icon class="w-5 h-5" />
              </div>
            </div>
          </slot>
        </slot>
      </div>

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
    <loading-spinner v-if="pending" />
    <div
      v-else
      class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <auction-card
        v-for="(auction, index) in auctions"
        :key="`home-auctions-${index}`"
        :auction="auction"
      />
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
    filters: {
      type: Object,
      default: () => {},
    },
    filtersOptions: {
      type: Object,
      default: () => [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    display: 'grid',
  }),
}
</script>
