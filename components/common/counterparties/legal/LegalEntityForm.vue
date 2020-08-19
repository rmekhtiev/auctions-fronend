<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <app-input
      id="inn"
      v-model.trim="formData.inn"
      type="tel"
      name="inn"
      required
      label="УНП"
      placeholder="9 цифр"
      pattern="[0-9]{9}"
      inputmode="number"
      autocomplete="no"
      minlength="9"
      maxlength="9"
      class="w-full lg:col-span-1"
      rules="required|digits:9"
    />

    <app-input
      id="shortName"
      v-model.trim="formData.name.short_name"
      type="text"
      name="short_name"
      required
      label="Короткое название организации"
      placeholder="ООО «Ромашка»"
      autocomplete="organization"
      class="w-full lg:col-span-2"
      rules="required"
    />

    <app-input
      id="fullName"
      v-model.trim="formData.name.full_name"
      type="text"
      name="full_name"
      required
      label="Полное название организации"
      placeholder="Общество с ограниченной ответственностью «Ромашка»"
      autocomplete="organization"
      class="w-full lg:col-span-3"
      rules="required"
    />

    <validation-provider
      v-slot="v"
      tag="div"
      rules="required"
      class="w-full lg:col-span-1"
    >
      <label
        for="egrDate"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Дата регистрации ЕГР <span class="text-red-700">*</span>
      </label>
      <client-only>
        <v-date-picker v-model="formData.egr_date" :max-date="new Date()">
          <input
            id="date"
            slot-scope="{ inputProps, inputEvents }"
            placeholder="Дата постановки на учет"
            class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            autocomplete="no"
            v-bind="inputProps"
            v-on="inputEvents"
          />
        </v-date-picker>
        <input
          id="egrDate"
          slot="placeholder"
          key="egrDate"
          v-model="formData.egr_date"
          placeholder="Дата постановки на учет"
          name="egr_date"
          type="date"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </client-only>
      <div v-if="v.errors" class="mt-3 text-xs italic text-red-600">
        <p v-for="error in v.errors" :key="error">
          {{ error }}
        </p>
      </div>
    </validation-provider>

    <app-input
      id="email"
      v-model.trim="formData.email"
      name="email"
      required
      label="Электронная почта"
      placeholder="Для связи при торгах"
      autocomplete="email"
      class="w-full lg:col-span-1"
      rules="required|email"
    />

    <app-input
      id="phone"
      :value="formData.phone"
      name="phone"
      required
      label="Номер телефона"
      class="w-full lg:col-span-1"
      rules="required"
    >
      <client-only>
        <vue-tel-input
          key="phone"
          v-model="formData.phone"
          input-id="phone"
          placeholder="Для связи при торгах"
          name="phone"
          type="tel"
          default-country="BY"
          :preferred-countries="['BY', 'RU']"
          input-classes="block w-full px-4 py-3 appearance-none bg-grey-lighter text-grey-darker focus:outline-none"
        />

        <input
          id="phone"
          slot="placeholder"
          key="phone"
          v-model="formData.phone"
          placeholder="Для связи при торгах"
          name="phone"
          type="tel"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </client-only>
    </app-input>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { VueTelInput } from 'vue-tel-input'
import numbers from '~/directives/numbers'

export default {
  components: {
    VueTelInput,
    ValidationProvider,
  },

  directives: {
    numbers,
  },

  props: {
    value: {
      type: Object,
      required: true,
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

  methods: {},
}
</script>

<style lang="scss" scoped>
.vue-tel-input {
  @apply border-2 rounded border-gray-300;

  &:focus-within {
    @apply shadow-none border-gray-600;
  }
}
</style>
