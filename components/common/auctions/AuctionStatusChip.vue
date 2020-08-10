<template>
  <component
    :is="isRunning ? 'nuxt-link' : 'span'"
    :to="{
      name: 'auctions-id-salesroom',
      params: {
        id: auction.id,
      },
    }"
    class="relative inline-block px-3 py-1 font-semibold leading-tight bg-opacity-50 rounded-full"
    :class="{
      'bg-yellow-200 text-yellow-900':
        status === 'DRAFT' || status === 'PENDING',
      'bg-blue-200 text-blue-900':
        status === 'UPCOMING' || status === 'RUNNING',
      'bg-green-200 text-green-900': status === 'SUCCEEDED',
      'bg-red-200 text-red-900': status === 'CANCELLED' || status === 'FAILED',
    }"
  >
    <loader-icon v-if="isRunning" class="inline w-4 h-4" />
    {{ $t(`auctions.status.${status}`) }}
  </component>
</template>

<script>
import { LoaderIcon } from 'vue-feather-icons'
import auction from '~/mixins/data-types/auction'

export default {
  components: {
    LoaderIcon,
  },
  mixins: [auction],
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
}
</script>
