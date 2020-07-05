<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-1/2 xl:w-1/3 lg:pr-4">
      <div class="py-3">
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
            autocomplete="no"
            :disabled="noCountry"
            :class="{
              'bg-gray-300': noCountry,
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
    </div>

    <div class="w-full lg:w-1/2 xl:w-1/3 lg:pl-4 xl:px-4">
      <div class="py-3">
        <label
          for="state"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Область
        </label>
        <input
          id="state"
          v-model.trim="formData.state"
          placeholder="Введите область"
          name="state"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/2 lg:pr-4 xl:w-1/3">
      <div class="py-3">
        <label
          for="sity"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Населенный пункт <span class="text-red-700">*</span>
        </label>
        <input
          id="sity"
          v-model.trim="formData.sity"
          placeholder="Введите населенный пункт"
          name="sity"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/2 xl:pr-4 xl:w-1/3 lg:pl-4 xl:pl-0">
      <div class="py-3">
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
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full xl:w-2/3 xl:pl-4">
      <div class="py-3">
        <label
          for="address"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Адрес <span class="text-red-700">*</span>
        </label>
        <input
          id="address"
          v-model.trim="formData.address"
          placeholder="Введите адрес"
          name="address"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
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
