<template>
  <LegalEntityAccountRow
    v-if="counterparty.attributes._type === 'UL'"
    :account="account"
    :counterparty="counterparty"
    :class="{
      'bg-yellow-100':
        $store.getters['counterparties/lastCreated'] &&
        counterparty.id === $store.getters['counterparties/lastCreated'].id,
    }"
  />

  <IndividualEnterpreneurAccountRow
    v-else-if="counterparty.attributes._type === 'IP'"
    :account="account"
    :counterparty="counterparty"
    :class="{
      'bg-yellow-100':
        $store.getters['counterparties/lastCreated'] &&
        counterparty.id === $store.getters['counterparties/lastCreated'].id,
    }"
  />

  <PhysicalAccountRow
    v-else-if="counterparty.attributes._type === 'FL'"
    :account="account"
    :counterparty="counterparty"
    :class="{
      'bg-yellow-100':
        $store.getters['counterparties/lastCreated'] &&
        counterparty.id === $store.getters['counterparties/lastCreated'].id,
    }"
  />
</template>

<script>
export default {
  components: {
    LegalEntityAccountRow: () => import('./legal/LegalEntityAccountRow'),
    IndividualEnterpreneurAccountRow: () =>
      import('./legal/IndividualEnterpreneurAccountRow'),
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
