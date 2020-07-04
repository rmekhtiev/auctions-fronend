<template>
  <LegalEntityAccountRow
    v-if="counterparty.attributes._type === 'UL'"
    :account="account"
    :counterparty="counterparty"
  />
</template>

<script>
export default {
  components: {
    LegalEntityAccountRow: () => import('./legal/LegalEntityAccountRow'),
  },

  props: {
    account: {
      type: Object,
      required: true,
    },
  },

  computed: {
    counterparty() {
      return this.$store.getters['counterparties/related']({
        parent: this.account,
        relationship: 'counterparty',
      })
    },
  },
}
</script>
