<template>
  <div class="p-4 bg-white rounded shadow-md">
    <div
      v-for="(group, date, index) in groupedAuctions"
      :key="`upcoming-auctions-${index}`"
      class="flex flex-col mb-2"
    >
      <div class="flex items-center mb-2">
        <span
          class="relative flex-grow-0 inline-block font-medium tracking-widest text-gray-800 uppercase"
        >
          {{ date }}
        </span>
        <div class="flex-grow my-2 ml-4 border-t border-gray-300"></div>
      </div>

      <div
        v-for="auction in group"
        :key="`upcoming-auctions-${index}-${auction.id}`"
        class="flex mb-2"
      >
        <div class="w-1/6">
          <span class="block text-sm text-gray-600">
            {{ $moment(auction.attributes.starts_at).format('LT') }}
          </span>
          <span class="block text-sm text-gray-600">
            {{ $moment(auction.attributes.ends_at).format('LT') }}
          </span>
        </div>
        <div class="w-5/6">
          <div class="block text-sm">
            <nuxt-link
              :to="{
                name: 'auctions-id',
                params: {
                  id: auctions.id,
                },
              }"
              class="font-semibold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
            >
              {{ auction.attributes.title }}
            </nuxt-link>
          </div>
          <span
            class="block text-sm"
            v-text="$tc('auctions.contestants.count', 1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'

export default {
  props: {
    auctions: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    groupedAuctions() {
      return groupBy(this.auctions, (auction) =>
        this.$moment(auction.attributes.starts_at).format('dddd D')
      )
    },
  },
}
</script>
