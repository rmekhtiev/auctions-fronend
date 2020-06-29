<template>
  <div class="flex flex-col items-center justify-center w-full mx-auto">
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mx-4 mt-16 bg-white rounded shadow-md"
    >
      <form @submit.prevent="submit()">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/3 lg:pr-4">
            <div class="py-3">
              <label
                for="unp"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
              >
                УНП*
              </label>
              <input
                id="unp"
                v-model="formData.unp"
                placeholder="Введите УНП"
                name="unp"
                type="text"
                autocomplete="no"
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/3 lg:pr-4">
            <div class="py-3">
              <label
                for="fullName"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
              >
                Полное название организации*
              </label>
              <input
                id="fullName"
                v-model="formData.full_name"
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
                for="shortName"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
              >
                Короткое название организации*
              </label>
              <input
                id="shortName"
                v-model="formData.short_name"
                placeholder="Введите короткое название организации"
                name="short_name"
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
                Дата регистрации ЕГР*
              </label>
              <input
                id="registrationDate"
                v-model="formData.registration_date"
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
                Электронная почта*
              </label>
              <input
                id="email"
                v-model="formData.email"
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
                Номер телефона*
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                placeholder="Введите номер телефона"
                name="phone"
                type="text"
                autocomplete="no"
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    formData: {
      unp: '',
      full_name: '',
      short_name: '',
      registration_date: '',
      email: '',
      phone: '',
    },
  }),
  // methods: {
  //   submit() {
  //     this.$axios
  //       .post('route', this.formData)
  //       .then((_result) => {
  //         this.$auth.loginWith('local', { data: this.formData })
  //       })
  //       .catch((_err) => {})
  //   },
  // },
}
</script>
