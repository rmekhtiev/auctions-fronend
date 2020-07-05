<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-col">
      <home-auctions :auctions="auctions" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ store }) {
    await store.dispatch('auctions/loadAll')

    return {
      auctions: store.getters['auctions/all'],
    }
  },

  data: () => ({
    //
  }),
}
</script>
