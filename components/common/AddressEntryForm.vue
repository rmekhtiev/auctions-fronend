<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <div class="w-full">
      <label
        for="countryId"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Страна <span class="text-red-700">*</span>
      </label>
      <div class="relative">
        <select
          id="countryId"
          v-model="formData.country_code"
          name="countryId"
          type="text"
          autocomplete="country"
          :disabled="noCountry"
          :class="{
            'bg-gray-200 cursor-not-allowed': noCountry,
          }"
          class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        >
          <option value="BY">Беларусь</option>
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

    <app-input
      id="state"
      v-model.trim="formData.state"
      name="state"
      required
      label="Область"
      placeholder="напр.: Минская область"
      autocomplete="address-level1"
      class="w-full"
      rules="required"
    />

    <app-input
      id="city"
      v-model.trim="formData.city"
      name="city"
      required
      label="Населенный пункт"
      placeholder="напр.: г. Минск"
      autocomplete="address-level2"
      class="w-full"
      rules="required"
    />

    <app-input
      id="postalCode"
      v-model.trim="formData.postal_code"
      name="postalCode"
      required
      label="Индекс"
      placeholder="Введите индекс"
      autocomplete="postal-code"
      class="w-full"
      rules="required|integer"
    />

    <app-input
      id="address"
      v-model.trim="formData.address"
      name="address"
      required
      label="Адрес"
      placeholder="Улица, дом, кв./офис"
      autocomplete="address-line1"
      class="w-full lg:col-span-2"
      rules="required"
    />
  </div>
</template>

<script>
import numbers from '~/directives/numbers'

export default {
  directives: {
    numbers,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
    noCountry: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formData: {
      get() {
        return this.value
      },
      set(formData) {
        this.$emit('input', formData)
      },
    },
  },

  watch: {
    noCountry(val) {
      if (val) {
        this.value.country_code = 'BY'
      }
    },
  },
}
</script>
