<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <app-input
      :id="`title${id}`"
      v-model.trim="formData.title"
      name="title"
      required
      label="Название"
      placeholder="напр. Автомобиль ВАЗ-2107"
      autocomplete="no"
      class="w-full lg:col-span-2"
      rules="required"
    />

    <app-input
      :id="`category${id}`"
      v-model.trim="formData.category"
      name="category"
      required
      label="Категория имущества"
      autocomplete="no"
      class="w-full"
      rules="required"
    >
      <div class="relative">
        <select
          id="type"
          v-model="formData.category"
          name="type"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        >
          <option
            v-for="category in categories"
            :key="`filter-option-${category}`"
            :value="category"
          >
            {{ $t(`auctions.category.${category}`) }}
          </option>
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
    </app-input>

    <app-input
      :id="`title${id}`"
      v-model.trim="formData.price_start"
      name="price_start"
      required
      label="Начальная стоимость"
      autocomplete="no"
      class="w-full"
      rules="required|numeric"
    >
      <template v-slot:default="{ v }">
        <currency-input
          v-model.number="formData.price_start"
          placeholder="200 BYN"
          :class="{
            'border-red-600': v.failed,
          }"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </template>
    </app-input>

    <app-input
      :id="`price_min${id}`"
      v-model="formData.price_min"
      name="price_min"
      required
      label="Минимальная стоимость"
      autocomplete="no"
      class="w-full"
      :rules="`required|numeric|between:${minPrice},${formData.price_start}`"
    >
      <template v-slot:default="{ v }">
        <currency-input
          v-model.number="formData.price_min"
          placeholder="200 BYN"
          :min="minPrice"
          :max="formData.price_start"
          :class="{
            'border-red-600': v.failed,
          }"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
        <vue-slider
          v-model="formData.price_min"
          :min="minPrice"
          :max="formData.price_start"
          :interval="1"
        ></vue-slider>
      </template>
    </app-input>

    <app-input
      :id="`step${id}`"
      v-model="formData.step"
      name="step"
      required
      label="Шаг торгов"
      autocomplete="no"
      class="w-full"
      :rules="`required|numeric|between:${minStep},${formData.price_start}`"
    >
      <template v-slot:default="{ v }">
        <currency-input
          v-model.number="formData.step"
          placeholder="200 BYN"
          :min="minStep"
          :max="formData.price_start"
          :class="{
            'border-red-600': v.failed,
          }"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
        <vue-slider
          v-model="formData.step"
          :min="minStep"
          :max="formData.price_start"
          :interval="1"
        ></vue-slider>
      </template>
    </app-input>

    <app-input
      :id="`deposit${id}`"
      v-model="formData.deposit"
      name="deposit"
      required
      label="Залог"
      autocomplete="no"
      class="w-full"
      :rules="`required|numeric|between:1,${formData.price_start}`"
    >
      <template v-slot:default="{ v }">
        <currency-input
          v-model.number="formData.deposit"
          placeholder="200 BYN"
          :min="1"
          :max="formData.price_start"
          :class="{
            'border-red-600': v.failed,
          }"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
        <vue-slider
          v-model="formData.deposit"
          :min="1"
          :max="formData.price_start"
          :interval="1"
        ></vue-slider>
      </template>
    </app-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },

    id: {
      type: String,
      default: '_' + Math.random().toString(36).substr(2, 9),
    },
  },

  data() {
    return {
      categories: [
        'realty',
        'vehicle',
        'equipment',
        'receivables',
        'enterprise',
        'spare-part',
        'inventory',
      ],
    }
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

    minPrice() {
      return Math.round(
        ((this.formData.price_start * 0.8 + Number.EPSILON) * 100) / 100
      )
    },

    minStep() {
      return Math.round(
        ((this.formData.price_start * 0.05 + Number.EPSILON) * 100) / 100
      )
    },
  },

  watch: {
    'formData.price_start'(value, old) {
      const ratio = value / old

      this.formData.price_min = this.formData.price_min * ratio
    },
  },
}
</script>
