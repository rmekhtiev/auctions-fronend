<template>
  <div class="my-2 lg:flex lg:items-center lg:justify-between">
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate"
        v-text="auction.title || 'Новый аукцион'"
      />
      <div class="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
        <div
          v-if="auction.starts_at"
          class="flex items-center mt-2 text-sm leading-5 text-gray-600 sm:mr-6"
        >
          <clock-icon class="flex-shrink-0 w-5 h-5 mr-2 text-gray-500" />
          {{ $moment(auction.starts_at).format('LL') }}
        </div>

        <div
          v-if="address.state"
          class="flex items-center mt-2 text-sm leading-5 text-gray-600 sm:mr-6"
        >
          <map-pin-icon class="flex-shrink-0 w-5 h-5 mr-2 text-gray-500" />
          {{ address.state }}
        </div>
      </div>
    </div>
    <div class="flex mt-5 lg:mt-0 lg:ml-4">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
import { ClockIcon, MapPinIcon } from 'vue-feather-icons'

export default {
  components: {
    ClockIcon,
    MapPinIcon,
  },
  props: {
    auction: {
      type: Object,
      required: true,
    },
    address: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
