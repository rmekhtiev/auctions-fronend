<template>
  <div class="container flex flex-col mx-auto">
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="flex items-center mb-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-600">Новый профиль</h3>
          <p class="text-sm text-gray-500">Profit Share between customers</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div class="w-full">
          <label
            for="type"
            class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
          >
            Форма собственности <span class="text-red-700">*</span>
          </label>
          <div class="relative">
            <select
              id="type"
              v-model="counterparty._type"
              name="type"
              type="text"
              autocomplete="no"
              class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            >
              <option value="UL">Юридическое лицо</option>
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
          <h3 class="text-xl font-semibold text-gray-600">Основные данные</h3>
          <p class="text-sm text-gray-500">Profit Share between customers</p>
        </div>
      </div>
      <legal-entity-form v-model="counterparty" />
    </div>
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="flex items-center mb-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-600">Юридический адрес</h3>
          <p class="text-sm text-gray-500">Profit Share between customers</p>
        </div>
      </div>
      <address-entry-form v-model="address" no-country />
    </div>

    <div class="flex flex-row justify-end">
      <button
        class="inline-flex px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-indigo-600 border-2 border-transparent rounded-lg shadow-sm hover:text-white hover:bg-indigo-500 focus:border-indigo-300 focus:outline-none"
        @click="save()"
      >
        <check-icon class="w-5 h-5 mr-2 -ml-1" />
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vue-feather-icons'

export default {
  components: {
    CheckIcon,
  },
  data: () => ({
    counterparty: {
      _type: 'UL',
      name: {},
    },
    address: {
      country_code: 'BY',
    },
  }),
  methods: {
    save() {
      const recordData = {
        attributes: this.counterparty,
        relationships: {
          users: {
            data: [
              {
                id: `${this.$auth.user.id}`,
                type: 'users',
              },
            ],
          },
        },
      }

      this.$store
        .dispatch('counterparties/create', recordData)
        .then((_response) => {
          const addressData = {
            attributes: this.address,
            relationships: {
              addressable: {
                data: {
                  id: this.$store.getters['counterparties/lastCreated'].id,
                  type: 'counterparties',
                },
              },
            },
          }
          this.$store
            .dispatch('addresses/create', addressData)
            .then((_response) => {
              this.$router.push({ name: 'account-profiles' })
            })
        })
    },
  },
}
</script>
