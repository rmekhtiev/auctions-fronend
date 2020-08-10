<template>
  <div>
    <template v-for="auction in openSalesrooms">
      <salesroom-window
        :key="`salesroom-${auction.id}`"
        :auction="auction"
        class="bottom-0 right-16"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['openSalesrooms']),
  },
}
</script>
