<template>
  <tr class="border-b border-gray-200 last:border-b-0">
    <td class="px-6 py-4 whitespace-no-wrap">
      <div
        class="text-sm font-medium leading-5 text-gray-900"
        v-text="auction.id"
      />
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm font-medium leading-5 text-gray-900">
        <nuxt-link
          :to="{
            name: 'auctions-id',
            params: { id: auction.id },
          }"
          class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
          v-text="auction.attributes.title"
        />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div
        class="text-sm font-medium leading-5 text-gray-900"
        v-text="$moment(auction.attributes.starts_at).format('LLL')"
      />
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm font-medium leading-5 text-right text-gray-900">
        {{ auction.attributes.price_min | currency }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm font-medium leading-5 text-right text-gray-900">
        {{ auction.attributes.price_current | currency }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm font-medium leading-5 text-center text-gray-900">
        {{ auction.attributes.participants_count }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <span
        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
      >
        {{ $t(`auctions.status.${auction.attributes.status}`) }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },

  computed: {
    seller() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'seller',
      })
    },

    organizer() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'organizer',
      })
    },
  },
}
</script>
