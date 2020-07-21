<template>
  <div class="container flex flex-col mx-auto">
    <home-auctions
      :auctions="auctions"
      :filters="filter"
      :filters-options="filterOptions"
      :pending="$fetchState.pending"
    />
  </div>
</template>

<script>
import omitby from 'lodash.omitby'

export default {
  async fetch() {
    await this.$store.dispatch('auctions/loadWhere', {
      options: this.pageOptions,
      filter: this.pureFilter,
    })
  },
  watchQuery: true,
  data: () => ({
    filterOptions: {
      status: ['UPCOMING'],
      category: [
        undefined,
        'realty',
        'vehicle',
        'equipment',
        'receivables',
        'enterprise',
        'spare-part',
        'inventory',
      ],
    },
    filter: {
      status: 'UPCOMING',
      category: undefined,
    },
  }),
  computed: {
    pureFilter() {
      return omitby(this.filter, (value) => value === undefined)
    },
    pageOptions() {
      return {
        'page[number]': this.$route.query.page ?? 1,
      }
    },
    auctions() {
      return this.$store.getters['auctions/where']({
        options: this.pageOptions,
        filter: this.pureFilter,
      })
    },
  },
  watch: {
    filter: {
      deep: true,
      handler(_newValue) {
        this.$fetch()
      },
    },
    '$route.query': '$fetch',
  },
}
</script>
