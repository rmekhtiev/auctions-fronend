import { mapActions } from 'vuex'

export default {
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },

  computed: {
    cover() {
      return this.auction.attributes.images &&
        this.auction.attributes.images.length
        ? this.auction.attributes.images[0]
        : require('@/assets/img/placeholder.svg')
    },
    status() {
      return this.isRunning ? 'RUNNING' : this.auction.attributes.status
    },
    isRunning() {
      return (
        this.$moment().isBetween(
          this.auction.attributes.starts_at,
          this.auction.attributes.real_ends_at
        ) && this.auction.attributes.status === 'UPCOMING'
      )
    },
  },

  methods: {
    openSalesroom(auction) {
      if (!this.$auth.loggedIn) {
        this.$auth.redirect('login')
      }

      this.$store.dispatch('openSalesroom', auction)
    },
    closeSalesroom(auction) {
      this.$store.dispatch('closeSalesroom', auction)
    },
  },
}
