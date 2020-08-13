<template>
  <div class="flex flex-row justify-between text-sm">
    <div class="px-4 py-2">
      <div class="font-medium leading-5 text-gray-500">
        @{{ user.attributes.login }}
      </div>
      <div class="leading-5 text-gray-900">
        Сделал ставку
        <span class="font-semibold">
          {{ bet.attributes.bet_amount | currency }}
        </span>
      </div>
    </div>

    <div class="px-4 py-2">
      <span class="font-medium leading-5 text-gray-500">
        {{ $moment(bet.attributes.created_at).format('LT') }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bet: {
      type: Object,
      required: true,
    },
  },

  computed: {
    user() {
      return this.$store.getters['users/related']({
        parent: this.bet,
        relationship: 'author',
      })
    },
  },
}
</script>
