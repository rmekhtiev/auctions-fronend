<template>
  <loading-spinner v-if="$fetchState.pending" />
  <div v-else>
    <div class="z-40 bg-gray-100 //lg:sticky top-16">
      <div class="container flex flex-col mx-auto">
        <auction-header
          :auction="auction.attributes"
          :address="address.attributes"
        ></auction-header>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('auctions/loadById', {
      id: this.$route.params.id,
    })
  },

  computed: {
    auction() {
      return this.$store.getters['auctions/byId']({ id: this.$route.params.id })
    },
    address() {
      return this.$store.getters['addresses/related']({
        parent: this.auction,
        relationship: 'address',
      })
    },
  },
}
</script>
