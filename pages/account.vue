<template>
  <div class="flex flex-no-wrap min-h-full">
    <profile-navigation class="flex-grow-0" />

    <div class="flex-grow p-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('users/loadById', this.$auth.user)
    await this.$auth.fetchUser(
      this.$store.getters['users/byId'](this.$auth.user).links.self
    )
  },
}
</script>
