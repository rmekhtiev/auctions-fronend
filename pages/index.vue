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
    const filter = {
      status: 'UPCOMING',
    }

    await store.dispatch('auctions/loadWhere', { filter })

    return {
      auctions: store.getters['auctions/where']({ filter }),
    }
  },

  data: () => ({
    //
  }),
}
</script>
