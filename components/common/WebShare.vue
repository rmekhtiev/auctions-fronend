<template>
  <button v-if="supported" @click="share()">
    <slot>Share</slot>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: null,
    },
  },

  computed: {
    supported() {
      return process.browser && navigator && navigator.share
    },
    getUrl() {
      if (this.url) {
        return this.url
      }

      const canonicalElement = document.querySelector('link[rel=canonical]')
      if (canonicalElement !== null) {
        return canonicalElement.href
      }

      return document.location.href
    },
  },

  methods: {
    shareViaWebShare() {
      navigator.share({
        title: this.title,
        text: this.text,
        url: this.url,
      })
    },
  },
}
</script>
