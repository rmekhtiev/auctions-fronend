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
  },
}
