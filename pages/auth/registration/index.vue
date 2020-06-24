<template>
  <div
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 flex flex-col mt-16 mx-4 md:mx-auto p-4 w-full md:w-2/3"
  >
    <form @submit.prevent="submit()">
      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/2 lg:pr-4">
          <div class="py-3">
            <label
              for="firstName"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Имя
            </label>
            <input
              id="firstName"
              v-model="formData.first_name"
              placeholder="Александр"
              name="first_name"
              type="text"
              autocomplete="given-name"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="w-full lg:w-1/2 lg:pl-4">
          <div class="py-3">
            <label
              for="lastName"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Фамилия
            </label>
            <input
              id="lastName"
              v-model="formData.last_name"
              placeholder="Пушкин"
              name="last_name"
              type="text"
              autocomplete="family-name"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="w-full lg:w-1/2 lg:pr-4">
          <div class="py-3">
            <label
              for="email"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              >Email</label
            >
            <input
              id="email"
              v-model="formData.email"
              placeholder="pushkin01@gmail.com"
              name="email"
              type="email"
              autocomplete="email"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="w-full lg:w-1/2 lg:pl-4">
          <div class="py-3">
            <label
              for="login"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Логин
            </label>
            <input
              id="login"
              v-model="formData.login"
              placeholder="pushkin01"
              name="login"
              type="text"
              autocomplete="no"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="w-full lg:w-1/2 lg:pr-4">
          <div class="py-3">
            <label
              for="password"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Пароль
            </label>
            <input
              id="password"
              v-model="formData.password"
              placeholder="8+ символов"
              name="password"
              type="password"
              autocomplete="new-password"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="w-full lg:w-1/2 lg:pl-4">
          <div class="py-3">
            <label
              for="passwordConfirmation"
              class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Пароль (ещё раз)
            </label>
            <input
              id="passwordConfirmation"
              v-model="formData.password_confirmation"
              placeholder="Что бы не опечататься"
              name="password_confirmation"
              type="password"
              autocomplete="new-password"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
            />
          </div>
        </div>

        <div class="flex justify-start">
          <label class="text-gray-500 font-bold my-4 flex items-center">
            <input
              v-model="formData.policy"
              class="leading-loose text-pink-600 top-0"
              type="checkbox"
            />
            <span class="ml-2 text-sm py-2 text-gray-600 text-left">
              Я прочитал и согласен с
              <a
                href="#"
                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
              >
                Правилами площадки
              </a>
              и
              <a
                href="#"
                class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
              >
                Политикой конфиденциальности.
              </a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          class="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black border-2 border-transparent focus:border-gray-600 focus:outline-none"
        >
          Продолжить
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    formData: {
      first_name: '',
      last_name: '',
      email: '',
      login: '',
      password: '',
      password_confirmation: '',
      policy: false,
    },
  }),
  watch: {
    'formData.email'(val, old) {
      const newPossibleLogin =
        val.indexOf('@') > 1 ? val.substr(0, val.indexOf('@')) : val
      const oldPossibleLogin =
        old.indexOf('@') > 1 ? old.substr(0, old.indexOf('@')) : old

      // console.log(newPossibleLogin, oldPossibleLogin)

      if (oldPossibleLogin === this.formData.login) {
        this.formData.login = newPossibleLogin
      }
    },
  },
  methods: {
    submit() {
      this.$axios
        .post('auth/register', this.formData)
        .then((_result) => {
          this.$auth.loginWith('local', { data: this.formData })
        })
        .catch((_err) => {})
    },
  },
}
</script>
