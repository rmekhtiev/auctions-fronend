<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-1/2 xl:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="inn"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          УНП <span class="text-red-700">*</span>
        </label>
        <input
          id="inn"
          v-model.trim="formData.inn"
          placeholder="Введите УНП"
          name="inn"
          type="tel"
          pattern="[0-9]{9}"
          inputmode="tel"
          autocomplete="no"
          minlength="9"
          maxlength="9"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/2 xl:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="shortName"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Короткое название организации <span class="text-red-700">*</span>
        </label>
        <input
          id="shortName"
          v-model.trim="formData.name.short_name"
          placeholder="Введите короткое название организации"
          name="short_name"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full xl:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="fullName"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Полное название организации <span class="text-red-700">*</span>
        </label>
        <input
          id="fullName"
          v-model.trim="formData.name.full_name"
          placeholder="Введите полное название организации"
          name="full_name"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="registrationDate"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Дата регистрации ЕГР <span class="text-red-700">*</span>
        </label>
        <input
          id="registrationDate"
          v-model="formData.egr_date"
          placeholder="Введите дату регистрации"
          name="registration_date"
          type="date"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="email"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Электронная почта <span class="text-red-700">*</span>
        </label>
        <input
          id="email"
          v-model.trim="formData.email"
          placeholder="Введите электронную почту"
          name="email"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        />
      </div>
    </div>

    <div class="w-full lg:w-1/3 lg:pr-4">
      <div class="py-3">
        <label
          for="phone"
          class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
        >
          Номер телефона <span class="text-red-700">*</span>
        </label>
        <input
          id="phone"
          v-model="formData.phone"
          placeholder="Введите номер телефона"
          name="phone"
          type="tel"
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
