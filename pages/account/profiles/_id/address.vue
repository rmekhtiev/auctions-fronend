<template>
  <div class="container flex flex-col mx-auto">
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
  name: 'Address',
  components: {
    CheckIcon,
  },
  data: () => ({
    address: {
      country_code: 'BY',
    },
  }),
  computed: {
    requestData() {
      return {
        attributes: this.counterparty,
      }
    },
    addressData() {
      return {
        attributes: this.address,
        relationships: {
          addressable: {
            data: {
              id: this.$route.params.id,
              type: 'counterparties',
            },
          },
        },
      }
    },
  },

  methods: {
    async save() {
      await this.$store.dispatch('addresses/create', this.addressData)
      this.$router.push({ name: 'account-profiles' })
    },
  },
}
</script>
