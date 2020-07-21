<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-col">
      <home-auctions :auctions="auctions" :pending="$fetchState.pending" />
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('auctions/loadWhere', { filter: this.filter })
  },

  data: () => ({
    filter: {
      status: 'UPCOMING',
    },
  }),

  computed: {
    auctions() {
      return this.$store.getters['auctions/where']({
        filter: this.filter,
      }).slice(0, 4)
    },
  },
}
</script>
