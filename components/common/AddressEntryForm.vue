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

    <div class="w-full">
      <label
        for="state"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Область
      </label>
      <input
        id="state"
        v-model.trim="formData.state"
        placeholder="напр.: Минская область"
        name="state"
        type="text"
        autocomplete="address-level1"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="sity"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Населенный пункт <span class="text-red-700">*</span>
      </label>
      <input
        id="sity"
        v-model.trim="formData.sity"
        placeholder="напр.: г. Минск"
        name="sity"
        type="text"
        autocomplete="address-level2"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="postalCode"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Индекс
      </label>
      <input
        id="postalCode"
        v-model="formData.postal_code"
        placeholder="Введите индекс"
        name="postal_code"
        type="tel"
        autocomplete="postal-code"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full lg:col-span-2">
      <label
        for="address"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Адрес <span class="text-red-700">*</span>
      </label>
      <input
        id="address"
        v-model.trim="formData.address"
        placeholder="Улица, дом, кв./офис"
        name="address"
        type="text"
        autocomplete="address-line1"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>
  </div>
</template>

<script>
export default {
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
