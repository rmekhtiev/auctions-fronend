<template>
  <div class="p-4 bg-white rounded shadow-md">
    <template v-if="Array.isArray(auctions) && auctions.length">
      <div
        v-for="(group, date, index) in groupedAuctions"
        :key="`upcoming-auctions-${index}`"
        class="flex flex-col mb-2"
      >
        <div class="flex items-center mb-2">
          <span
            class="relative flex-grow-0 inline-block font-medium tracking-widest text-gray-800 uppercase"
          >
            {{ date }}
          </span>
          <div class="flex-grow my-2 ml-4 border-t border-gray-300"></div>
        </div>

        <div
          v-for="auction in group"
          :key="`upcoming-auctions-${index}-${auction.id}`"
          class="flex mb-2"
        >
          <div class="w-1/6">
            <span class="block text-sm text-gray-600">
              {{ $moment(auction.attributes.starts_at).format('LT') }}
            </span>
            <span class="block text-sm text-gray-600">
              {{ $moment(auction.attributes.ends_at).format('LT') }}
            </span>
          </div>
          <div class="w-5/6">
            <div class="block text-sm">
              <nuxt-link
                :to="{
                  name: 'auctions-id',
                  params: {
                    id: auction.id,
                  },
                }"
                class="font-semibold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
              >
                {{ auction.attributes.title }}
              </nuxt-link>
            </div>
            <span
              class="block text-sm"
              v-text="
                $tc(
                  'auctions.contestants.count',
                  auction.attributes.participants_count
                )
              "
            />
          </div>
        </div>
      </div>
    </template>
    <div
      v-else
      class="flex flex-col items-center justify-center min-h-full mx-auto"
    >
      <div
        class="flex flex-col items-center justify-center max-w-sm text-center text-gray-700"
      >
        <div
          class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
        >
          <zap-icon class="w-16 h-16" />
        </div>
        <span class="mx-4 text-xl font-medium">Нет предстоящих торгов</span>
        <p class="m-4 italic">
          Попробуйте
          <nuxt-link
            :to="{ name: 'auctions' }"
            class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
          >
            найти интересующий аукцион
          </nuxt-link>
          и подать заявку на участие
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ZapIcon } from 'vue-feather-icons'
import groupBy from 'lodash.groupby'

export default {
  props: {
    auctions: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    ZapIcon
  },

  computed: {
    groupedAuctions() {
      return groupBy(this.auctions, (auction) =>
        this.$moment(auction.attributes.starts_at).format('dddd D')
      )
    },
  },
}
</script>
