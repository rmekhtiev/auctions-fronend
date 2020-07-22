<template>
  <div class="container flex flex-col p-4 mx-auto">
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="flex items-center mb-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-600">Подача заявки</h3>
          <p class="text-sm text-gray-500">
            Введите данные для подачи заявки
          </p>
        </div>
      </div>

      <loading-spinner v-if="$fetchState.pending" />
      <div
        v-else-if="hasParticipated"
        class="flex flex-col items-center justify-center max-w-sm mx-auto text-center text-gray-700"
      >
        <span
          :to="{ name: 'account-profiles-new' }"
          class="flex items-center justify-center w-24 h-24 m-4 bg-gray-200 rounded-full"
        >
          <plus-icon class="w-16 h-16" />
        </span>
        <span class="mx-4 text-xl font-medium">Вы уже участвуете</span>
        <p class="m-4 italic">
          Вы уже подавали заявку на участие в&nbsp;данном&nbsp;аукционе.
          <nuxt-link
            :to="{ name: 'account-customer' }"
            class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
          >
            Все заявки
          </nuxt-link>
        </p>
      </div>
      <no-profiles v-else-if="!counterparties.length" />
      <form v-else @submit.prevent="submit()">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <div class="w-full">
            <label
              for="seller"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Профиль <span class="text-red-700">*</span>
            </label>

            <div class="relative">
              <select
                id="seller"
                v-model="formData.counterparty_id"
                name="seller"
                autocomplete="no"
                class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              >
                <option
                  v-for="counterparty in counterparties"
                  :key="`counterparty-select-${counterparty.id}`"
                  :value="counterparty.id"
                  v-text="counterparty.attributes.display_name"
                />
              </select>
              <div
                class="absolute top-0 bottom-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-start">
          <label class="flex items-center my-4 font-bold text-gray-500">
            <input
              v-model="formData.policy"
              class="top-0 leading-loose text-gray-600 form-checkbox"
              type="checkbox"
            />
            <span class="py-2 ml-2 text-sm text-left text-gray-600">
              Я прочитал и согласен с
              <a
                href="#"
                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
              >
                Правилами площадки
              </a>
              и
              <a
                href="#"
                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
              >
                Регламентом проведения Торгов
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          :disabled="!formData.policy || !formData.counterparty_id"
          :class="{
            'cursor-not-allowed opacity-50':
              !formData.policy || !formData.counterparty_id,
          }"
          class="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
        >
          Продолжить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auction: {
      type: Object,
      required: true,
    },
  },

  middleware: ['auth', 'verified', 'role'],

  meta: {
    role: ['USER'],
  },

  async fetch() {
    await Promise.all([
      this.$store.dispatch('counterparties/loadRelated', {
        parent: this.$auth.user,
        relation: 'counterparties',
      }),
      this.$store.dispatch('participation-requests/loadRelated', {
        parent: this.$auth.user,
      }),
    ])
  },

  data: () => ({
    formData: {
      policy: false,
      counterparty_id: null,
    },
  }),

  computed: {
    counterparties() {
      return this.$store.getters['counterparties/related']({
        parent: this.$auth.user,
        relation: 'counterparties',
      })
    },
    participationRequests() {
      return this.$store.getters['participation-requests/related']({
        parent: this.$auth.user,
      })
    },
    hasParticipated() {
      return !!this.participationRequests.filter(
        ({ relationships: { auction, author } }) =>
          auction.data.id == this.auction.id &&
          author.data.id == this.$auth.user.id
      ).length
    },
    request() {
      return {
        relationships: {
          counterparty: {
            data: {
              type: 'counterparties',
              id: `${this.formData.counterparty_id}`,
            },
          },
          auction: {
            data: {
              type: this.auction.type,
              id: `${this.auction.id}`,
            },
          },
        },
      }
    },
  },

  methods: {
    async submit() {
      await this.$store.dispatch('participation-requests/create', this.request)

      this.$router.push({ name: 'account-customer' })
    },
  },
}
</script>
