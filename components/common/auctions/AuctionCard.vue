<template>
  <article
    class="relative flex flex-col overflow-hidden bg-white rounded shadow-md"
  >
    <div>
      <picture>
        <img
          class="object-cover object-center w-full h-56 lg:h-48 xl:h-56"
          src="https://via.placeholder.com/450x450"
          :alt="auction.attributes.title"
        />
      </picture>
    </div>
    <h2 class="flex-grow px-6 pt-4 text-lg font-semibold text-gray-800">
      {{ auction.attributes.title }}
    </h2>
    <ul class="px-6">
      <li class="flex items-center mt-2 text-gray-700">
        <clock-icon class="w-4 h-4" />
        <div
          class="px-2 text-sm"
          v-text="$moment(auction.attributes.starts_at).format('LL')"
        />
      </li>
      <li class="flex items-center mt-2 text-gray-700">
        <users-icon class="w-4 h-4" />
        <div class="px-2 text-sm">Участников еще нет</div>
      </li>
      <li class="flex items-center mt-2 text-gray-700">
        <map-pin-icon class="w-4 h-4" />
        <div class="px-2 text-sm">Минская область</div>
      </li>
    </ul>
    <nuxt-link
      :to="{
        name: 'auctions-id',
        params: {
          id: auction.id,
        },
      }"
      class="block px-6 py-3 m-4 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
    >
      623 695.41 BYN
    </nuxt-link>
  </article>
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
}
</script>
