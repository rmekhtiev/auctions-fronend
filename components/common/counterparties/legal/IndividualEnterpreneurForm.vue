<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <div class="w-full">
      <label
        for="inn"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        УНП <span class="text-red-700">*</span>
      </label>
      <input
        id="inn"
        key="inn"
        v-model.trim="formData.inn"
        v-numbers
        placeholder="9 цифр"
        name="inn"
        type="tel"
        pattern="[0-9]{9}"
        inputmode="number"
        autocomplete="no"
        minlength="9"
        maxlength="9"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="fullName"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        ФИО (полностью) <span class="text-red-700">*</span>
      </label>
      <input
        id="fullName"
        key="fullName"
        v-model.trim="formData.name.full_name"
        placeholder="Александр Сергеевич Пушкин"
        name="full_name"
        type="text"
        autocomplete="name"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="egrDate"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Дата регистрации ЕГР <span class="text-red-700">*</span>
      </label>
      <client-only>
        <v-date-picker v-model="formData.egr_date">
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
    </div>

    <div class="w-full">
      <label
        for="email"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Электронная почта <span class="text-red-700">*</span>
      </label>
      <input
        id="email"
        key="email"
        v-model.trim="formData.email"
        placeholder="Для связи при торгах"
        name="email"
        type="email"
        autocomplete="no"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="phone"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Номер телефона <span class="text-red-700">*</span>
      </label>
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
    </div>

    <div class="w-full">
      <label
        for="passportNumber"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Серия и номер паспорта <span class="text-red-700">*</span>
      </label>
      <input
        id="passportNumber"
        key="passportNumber"
        v-model.trim="formData.document.passport_number"
        placeholder="МС1234567"
        name="passport_number"
        type="text"
        autocomplete="no"
        minlength="9"
        maxlength="9"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="passportIssuer"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Кем выдан паспорт <span class="text-red-700">*</span>
      </label>
      <input
        id="passportIssuer"
        key="passportIssuer"
        v-model.trim="formData.document.passport_issuer"
        placeholder="Кем выдан паспорт"
        name="passport_issuer"
        type="text"
        autocomplete="no"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>

    <div class="w-full">
      <label
        for="passportDate"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Дата выдачи паспорта <span class="text-red-700">*</span>
      </label>
      <client-only>
        <v-date-picker v-model="formData.document.passport_date">
          <input
            id="date"
            slot-scope="{ inputProps, inputEvents }"
            placeholder="Когда выдан паспорт"
            class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
            autocomplete="no"
            v-bind="inputProps"
            v-on="inputEvents"
          />
        </v-date-picker>
        <input
          id="passportDate"
          slot="placeholder"
          key="passportDate"
          v-model="formData.document.passport_date"
          placeholder="Когда выдан паспорт"
          name="passport_date"
          type="date"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </client-only>
    </div>

    <div class="w-full">
      <label
        for="passportPersonal"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        Личный номер паспорта <span class="text-red-700">*</span>
      </label>
      <input
        id="passportPersonal"
        key="passportPersonal"
        v-model.trim="formData.document.passport_personal"
        placeholder="4131087B052PB4"
        name="passport_personal"
        type="text"
        autocomplete="no"
        minlength="14"
        maxlength="14"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import numbers from '~/directives/numbers'

export default {
  components: {
    VueTelInput,
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
