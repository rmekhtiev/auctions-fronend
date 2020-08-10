<template>
  <div class="fixed flex flex-col mx-auto mb-4 bg-white rounded shadow-md w-96">
    <div
      class="flex flex-row justify-between p-4 border-b border-gray-200 flex-0"
    >
      <h4 class="text-lg font-semibold">
        <nuxt-link
          :to="{
            name: 'auctions-id',
            params: {
              id: auction.id,
            },
          }"
        >
          {{ auction.attributes.title }}
        </nuxt-link>
      </h4>

      <div class="flex flex-row">
        <button class="ml-4" @click="maximazed = !maximazed">
          <component
            :is="maximazed ? 'minus-icon' : 'maximize-2-icon'"
            class="w-6 h-6"
          ></component>
        </button>
        <button class="ml-4">
          <x-icon class="w-6 h-6"></x-icon>
        </button>
      </div>
    </div>
    <transition name="smooth">
      <div v-show="maximazed" class="p-4 px-8 pt-6 pb-8 h-128">
        <loading-spinner v-if="$fetchState.pending" />
        <div
          v-else-if="!fromUserRequest | !participating"
          class="flex flex-col items-center justify-center max-w-sm mx-auto text-center text-gray-700"
        >
          <span
            class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
          >
            <alert-triangle-icon class="w-16 h-16" />
          </span>
          <span class="mx-4 text-xl font-medium">
            Вы не допущены до&nbsp;участия
          </span>
          <p v-if="!fromUserRequest" class="m-4 italic">
            Вы не подавали заявку на участие в торгах
          </p>
          <p v-else-if="!participating" class="m-4 italic">
            Ваша заявка не была одобрена
          </p>
        </div>
        <div v-else-if="!confirmed" class="flex flex-col w-full">
          <div class="flex items-center mb-4">
            <div>
              <h3 class="text-xl font-semibold text-gray-600">
                Подтверждение участия
              </h3>
              <p class="text-sm text-gray-500">
                Окончательная регистрация на участие в аукционе
              </p>
            </div>
          </div>

          <p class="italic">
            Подтверждаю, что {{ $moment().format('ll') }} прошел заключительную
            регистрацию на участие в аукционе по лоту №{{ auction.id }}
          </p>

          <button
            type="submit"
            class="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
            @click="confirm()"
          >
            Подтвердить участие
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  AlertTriangleIcon,
  MinusIcon,
  Maximize2Icon,
  XIcon,
} from 'vue-feather-icons'

import auction from '~/mixins/data-types/auction'

export default {
  components: {
    AlertTriangleIcon,
    MinusIcon,
    Maximize2Icon,
    XIcon,
  },

  mixins: [auction],

  async fetch() {
    await Promise.all([
      this.$store.dispatch('participation-requests/loadRelated', {
        parent: this.auction,
      }),
      this.loadBets(),
    ])
  },

  data: () => ({
    now: null,
    maximazed: true,
  }),

  computed: {
    participationRequests() {
      return this.$store.getters['participation-requests/related']({
        parent: this.auction,
      })
    },
    fromUserRequest() {
      return this.participationRequests.find(
        (request) =>
          parseInt(request.relationships.author.data.id) ===
          parseInt(this.$auth.user.id)
      )
    },
    participating() {
      return (
        !!this.fromUserRequest && !!this.fromUserRequest.attributes.approved_at
      )
    },
    confirmed() {
      return (
        !!this.participating && !!this.fromUserRequest.attributes.confirmed_at
      )
    },
  },

  beforeCreate() {
    this.now = this.$moment()
  },

  mounted() {
    setInterval(() => {
      this.now = this.$moment()
    }, 1000)
  },

  methods: {
    loadBets() {
      //
    },
    confirm() {
      this.$store.dispatch('participation-requests/update', {
        id: this.fromUserRequest.id,
        type: this.fromUserRequest.type,
        attributes: {
          ...this.fromUserRequest.attributes,
          confirmed_at: this.$moment(),
        },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.smooth-enter-active,
.smooth-leave-active {
  transition: height 0.5s;
  overflow: hidden;
}
.smooth-enter,
.smooth-leave-to {
  height: 0;
}
</style>
