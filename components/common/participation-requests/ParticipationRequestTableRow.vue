<template>
  <tr class="border-b border-gray-200 last:border-b-0">
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
          {{ auction.attributes.title }}
        </nuxt-link>

        <auction-status-chip class="ml-2" :auction="auction" />
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm font-medium leading-5 text-gray-900">
        {{
          $store.getters['counterparties/byId']({
            id: participation.relationships.counterparty.data.id,
          }).attributes.display_name
        }}
      </div>
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
    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
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
</template>

<script>
export default {
  props: {
    participation: {
      type: Object,
      required: true,
    },
  },

  computed: {
    auction() {
      return this.$store.getters['auctions/related']({
        relationship: 'auction',
        parent: this.participation,
      })
    },
  },
}
</script>
