<template>
  <nuxt-child />
</template>

<script>
export default {
  layout: 'with-sidebar',

  middleware: ['auth', 'verified'],

  async fetch() {
    await this.$store.dispatch('users/loadById', this.$auth.user)
    await this.$auth.fetchUser(
      this.$store.getters['users/byId'](this.$auth.user).links.self
    )
  },
}
</script>
