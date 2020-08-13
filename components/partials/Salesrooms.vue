<template>
  <div>
    <client-only v-if="$roles(['USER'])">
      <template v-for="auction in openSalesrooms">
        <salesroom-window
          :key="`salesroom-${auction.id}`"
          :auction="auction"
          class="bottom-0 right-0 md:right-16"
        />
      </template>
    </client-only>
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
