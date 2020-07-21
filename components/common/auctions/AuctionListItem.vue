<template>
  <nuxt-link
    :to="{
      name: 'auctions-id',
      params: {
        id: auction.id,
      },
    }"
    class="flex flex-row items-center justify-between whitespace-no-wrap bg-white border-b border-gray-200"
  >
    <div class="flex flex-col px-6 py-4">
      <div>
        <nuxt-link
          :to="{
            name: 'auctions-id',
            params: {
              id: auction.id,
            },
          }"
          class="font-bold"
          v-text="auction.attributes.title"
        />
      </div>
      <div>
        <ul class="flex flex-row">
          <li class="flex items-center mt-2 text-gray-700">
            <users-icon class="w-4 h-4" />
            <div class="px-2 text-sm">Участников еще нет</div>
          </li>
          <li v-if="address" class="flex items-center mt-2 text-gray-700">
            <map-pin-icon class="w-4 h-4" />
            <div v-if="address.attributes.state" class="px-2 text-sm">
              {{ address.attributes.state }}
            </div>
            <div v-else class="px-2 text-sm">{{ address.attributes.city }}</div>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex flex-col px-6 py-4">
      <div class="text-right">
        <span class="font-bold">
          {{ auction.attributes.price_start | currency }}
        </span>
      </div>
      <div>
        <ul class="flex flex-row">
          <li class="flex items-center mt-2 text-gray-700">
            <clock-icon class="w-4 h-4" />
            <div
              class="px-2 text-sm"
              v-text="$moment(auction.attributes.starts_at).format('LL')"
            />
          </li>
        </ul>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import { ClockIcon, UsersIcon, MapPinIcon } from 'vue-feather-icons'

export default {
  components: {
    ClockIcon,
    UsersIcon,
    MapPinIcon,
  },
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },
  computed: {
    address() {
      return this.$store.getters['addresses/related']({
        parent: this.auction,
        relationship: 'address',
      })
    },
  },
}
</script>
