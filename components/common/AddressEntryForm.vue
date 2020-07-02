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
        <select
          id="countryId"
          v-model="formData.country_id"
          name="countryId"
          type="text"
          autocomplete="no"
          :disabled="!formData.no_country"
          :class="{
            'cursor-not-allowed': !formData.no_country,
          }"
        >
          <option value="BY">Беларусь</option>
        </select>
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

    <div class="w-full xl:w-1/3 xl:pl-4">
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

    <div class="w-full lg:w-1/3 lg:pr-4">
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

    <div class="w-full lg:w-1/3 lg:px-4">
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
      default: true,
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
}
</script>
