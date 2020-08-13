<template>
  <div
    class="fixed z-50 flex flex-col w-full mx-auto bg-white rounded shadow-md md:h-auto md:w-96"
  >
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

          <client-only v-if="isRunning">
            (до {{ $moment(auction.attributes.real_ends_at).format('LT') }})
          </client-only>
        </nuxt-link>
      </h4>

      <div class="flex flex-row">
        <button
          class="p-1 ml-2 transition-colors duration-150 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-200"
          @click="maximazed = !maximazed"
        >
          <component
            :is="maximazed ? 'minus-icon' : 'maximize-2-icon'"
            class="w-5 h-5"
          ></component>
        </button>
        <button
          class="p-1 ml-2 transition-colors duration-150 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-200"
          @click="closeSalesroom(auction)"
        >
          <x-icon class="w-5 h-5"></x-icon>
        </button>
      </div>
    </div>
    <transition name="smooth">
      <div v-show="maximazed" class="relative flex flex-col bg-gray-100 h-128">
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
        <div
          v-else-if="!confirmed"
          class="flex flex-col justify-between flex-1 w-full h-full p-4 px-8 pt-6 pb-8"
        >
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
        <template v-else>
          <div
            class="flex flex-col p-4 bg-white border-b border-gray-200 flex-0"
          >
            <span class="flex flex-col mr-2 text-sm">
              Текущая цена:
              <span class="text-lg font-semibold">
                {{ auction.attributes.price_current | currency }}
              </span>
            </span>

            <span class="mt-2 text-sm">
              Шаг:
              <span class="font-semibold">
                {{ auction.attributes.step | currency }}
              </span>
            </span>
          </div>
          <div
            class="flex flex-col flex-1 overflow-y-scroll divide-y divide-gray-200"
          >
            <template v-for="bet in bets">
              <bet-list-item :key="`bet-${bet.id}`" :bet="bet" />
            </template>
          </div>
          <div
            class="flex flex-col p-4 bg-white border-t border-gray-200 flex-0"
          >
            <div class="mb-2">
              <span class="mt-2 text-sm text-gray-700">
                Следующая возможная ставка:
                <button
                  class="font-semibold text-gray-900"
                  @click="bet_amount = nextBet"
                >
                  {{ nextBet | currency }}
                </button>
              </span>
            </div>
            <div class="flex flex-row">
              <div
                v-if="isEnded"
                class="block w-full px-4 py-3 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
              >
                Торги окончены
              </div>
              <template v-else>
                <input
                  v-model.number="bet_amount"
                  type="number"
                  class="block w-full px-4 py-3 border-2 rounded-l-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
                  @change="(v) => v > 0 || false"
                />
                <button
                  :disabled="!canBet || betLoading"
                  :class="{
                    'opacity-50 cursor-not-allowed': !canBet || betLoading,
                  }"
                  :min="nextBet"
                  :step="auction.attributes.step"
                  class="block px-4 py-3 text-white transition duration-150 bg-gray-800 border-transparent rounded-r-lg appearance-none hover:text-white hover:bg-black focus:shadow-outline focus:outline-none"
                  @click="makeBet()"
                >
                  <loader-icon v-if="betLoading" class="animate-spin" />
                  <send-icon v-else />
                </button>
              </template>
            </div>
          </div>
        </template>
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
  SendIcon,
  LoaderIcon,
} from 'vue-feather-icons'

import auction from '~/mixins/data-types/auction'

export default {
  components: {
    AlertTriangleIcon,
    MinusIcon,
    Maximize2Icon,
    XIcon,
    SendIcon,
    LoaderIcon,
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

    nowInterval: null,
    loadBetsInterval: null,

    betLoading: false,

    bet_amount: null,
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
    counterparty() {
      return this.$store.getters['counterparties/related']({
        parent: this.fromUserRequest,
        relationship: 'counterparty',
      })
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

    bets() {
      return this.$store.getters['bets/related']({
        parent: this.auction,
      })
    },

    betData() {
      return {
        attributes: {
          bet_amount: this.bet_amount,
        },
        relationships: {
          auction: {
            data: {
              type: 'auctions',
              id: this.auction.id,
            },
          },
          counterparty: {
            data: {
              type: 'counterparties',
              id: this.counterparty.id,
            },
          },
        },
      }
    },

    nextBet() {
      return (
        // ? какой дурак забыл в ф-цию округления JS добавить сохранения n знаков дроби...
        Math.round(
          // eslint-disable-next-line prettier/prettier
          (this.auction.attributes.price_current + this.auction.attributes.step) * 100
        ) / 100
      )
    },

    canBet() {
      return (
        this.bet_amount && // ставка указана
        this.bet_amount > this.auction.attributes.price_current && // ставка больше, чем текущая цена
        // eslint-disable-next-line prettier/prettier
        (Math.round((this.bet_amount - this.auction.attributes.price_current) * 100) / 100) % this.auction.attributes.step === 0 // ставка кратна шагу с округлением
      )
    },

    isEnded() {
      return (
        this.status !== 'RUNNING' ||
        !this.isRunning ||
        this.$moment().isAfter(
          this.$moment(this.auction.attributes.real_ends_at)
        )
      )
    },
  },

  beforeCreate() {
    this.now = this.$moment()
  },

  mounted() {
    this.nowInterval = setInterval(() => {
      this.now = this.$moment()
    }, 1000)

    this.loadBetsInterval = setInterval(() => {
      this.loadBets()
    }, 5000)
  },

  beforeDestroy() {
    clearInterval(this.nowInterval)
    clearInterval(this.loadBetsInterval)
  },

  methods: {
    loadBets() {
      return this.$store.dispatch('bets/loadRelated', {
        parent: this.auction,
      })
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

    async makeBet() {
      this.betLoading = true

      try {
        await this.$store.dispatch('bets/create', this.betData)
        await this.loadBets()
      } catch (e) {
        this.$toast.error('Неправильная ставка')
      } finally {
        this.bet_amount = null
        this.betLoading = false
      }
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
