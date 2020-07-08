<template>
  <div>
    <div class="z-40 mb-6 bg-gray-100 //lg:sticky top-16">
      <div class="container flex flex-col mx-auto">
        <auction-header :auction="auction" :address="address">
          <template slot="actions">
            <span class="sm:ml-3">
              <button
                type="button"
                class="inline-flex px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-indigo-600 border-2 border-transparent rounded-lg shadow-sm hover:text-white hover:bg-indigo-500 focus:border-indigo-300 focus:outline-none"
                @click="save()"
              >
                <check-icon class="w-5 h-5 mr-2 -ml-1" />
                Сохранить
              </button>
            </span>
          </template>
        </auction-header>
      </div>
    </div>
    <div class="container flex flex-col mx-auto">
      <div
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">Новый аукцион</h3>
            <p class="text-sm text-gray-500">
              Введите основные данные о предстоящем аукционе
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <div class="w-full lg:col-span-2">
            <label
              for="title"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Название аукциона <span class="text-red-700">*</span>
            </label>
            <input
              id="title"
              key="title"
              v-model.trim="auction.title"
              placeholder="Введите значение"
              name="title"
              type="string"
              autocomplete="no"
              minlength="3"
              maxlength="255"
              class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div class="w-full">
            <label
              for="type"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Тип торгов <span class="text-red-700">*</span>
            </label>

            <div class="relative">
              <select
                id="type"
                v-model="auction._type"
                name="type"
                autocomplete="no"
                class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              >
                <option value="BANKRUPCY">Банкротство</option>
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

          <div class="w-full">
            <label
              for="seller"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Продавец <span class="text-red-700">*</span>
            </label>

            <div class="relative">
              <select
                id="seller"
                v-model="auction.seller_id"
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

          <div class="w-full">
            <label
              for="organizer"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Организатор <span class="text-red-700">*</span>
            </label>

            <div class="relative">
              <select
                id="organizer"
                v-model="auction.organizer_id"
                name="organizer"
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
      </div>

      <div
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">Адрес лота</h3>
            <p class="text-sm text-gray-500">
              Введите адрес, где будет находится лот, на момент проведения
              торгов
            </p>
          </div>
        </div>

        <address-entry-form v-model="address" no-country />
      </div>

      <div
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">
              Дата и время проведения аукциона
            </h3>
            <p class="text-sm text-gray-500">
              Выберите дату и время, когда будут проводится торги
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="w-full lg:col-span-1">
            <label
              for="date"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              День проведения <span class="text-red-700">*</span>
            </label>
            <client-only>
              <v-date-picker v-model="auction.date">
                <input
                  id="date"
                  key="date"
                  slot-scope="{ inputProps, inputEvents }"
                  placeholder="День проведения торгов"
                  class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
                  autocomplete="no"
                  v-bind="inputProps"
                  v-on="inputEvents"
                />
              </v-date-picker>
              <input
                id="date"
                slot="placeholder"
                key="date"
                v-model="auction.date"
                placeholder="День проведения торгов"
                name="date"
                type="date"
                autocomplete="no"
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </client-only>
          </div>

          <div class="w-full lg:col-span-1">
            <label
              for="startTime"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Начало <span class="text-red-700">*</span>
            </label>
            <input
              id="startTime"
              key="startTime"
              v-model="auction.start_time"
              placeholder="Время начала"
              name="startTime"
              type="time"
              autocomplete="no"
              disabled
              :class="{
                'bg-gray-200 cursor-not-allowed': true,
              }"
              class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div class="w-full lg:col-span-1">
            <label
              for="endTime"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Конец <span class="text-red-700">*</span>
            </label>
            <input
              id="endTime"
              key="endTime"
              v-model="auction.end_time"
              placeholder="День проведения торгов"
              name="end_time"
              type="time"
              autocomplete="no"
              disabled
              :class="{
                'bg-gray-200 cursor-not-allowed': true,
              }"
              class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vue-feather-icons'

export default {
  components: {
    CheckIcon,
  },

  middleware: ['auth', 'verified'],

  async fetch() {
    await this.loadCounterparties()
  },

  data: () => ({
    auction: {
      title: '',
      _type: 'BANKRUPCY',
      start_time: '10:00',
      end_time: '18:00',
      seller_id: null,
      organizer_id: null,
    },
    address: {
      country_code: 'BY',
    },
  }),

  computed: {
    counterparties() {
      return this.$store.getters['counterparties/related']({
        parent: this.$auth.user,
        relation: 'counterparties',
      })
    },
  },

  watch: {
    'auction.date'() {
      this.recalculateDatetimes()
    },
    'auction.start_time'() {
      this.recalculateDatetimes()
    },
    'auction.end_time'() {
      this.recalculateDatetimes()
    },
  },

  methods: {
    loadCounterparties() {
      return this.$store.dispatch('counterparties/loadRelated', {
        parent: this.$auth.user,
        relation: 'counterparties',
      })
    },

    recalculateDatetimes() {
      console.log(this.auction.date.getDate())

      const startsAt = this.$moment(
        this.$moment(this.auction.date).format('YYYY-MM-DD') +
          ' ' +
          this.auction.start_time
      ).clone()
      const endsAt = this.$moment(
        this.$moment(this.auction.date).format('YYYY-MM-DD') +
          ' ' +
          this.auction.end_time
      ).clone()

      this.auction.starts_at = startsAt
      this.auction.ends_at = endsAt
    },

    save() {
      const formData = {
        attributes: this.auction,
        relationships: {
          seller: {
            data: {
              type: 'counterparties',
              id: `${this.auction.seller_id}`,
            },
          },
          organizer: {
            data: {
              type: 'counterparties',
              id: `${this.auction.organizer_id}`,
            },
          },
        },
      }
      this.$store.dispatch('auctions/create', formData)
    },
  },
}
</script>
