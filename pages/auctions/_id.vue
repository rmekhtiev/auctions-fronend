<template>
  <loading-spinner v-if="$fetchState.pending" />
  <div v-else-if="!!auction">
    <div class="z-40 mb-4 bg-gray-100 //lg:sticky top-16">
      <div class="container flex flex-col mx-auto">
        <auction-header
          :auction="auction.attributes"
          :address="address ? address.attributes : null"
        />
      </div>
    </div>
    <nuxt-child :auction="auction" />
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      await this.$store.dispatch('auctions/loadById', {
        id: this.$route.params.id,
      })
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: err.data.message })
    }
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

  head() {
    return {
      title: this.auction.title,
    }
  },
}
</script>
