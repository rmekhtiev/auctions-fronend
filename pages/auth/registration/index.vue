<template>
  <div
    class="flex flex-col items-center justify-center w-full mx-auto md:w-2/3"
  >
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mx-4 mt-16 bg-white rounded shadow-md"
    >
      <form @submit.prevent="submit()">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-1/2 lg:pr-4">
            <div class="py-3">
              <label
                for="firstName"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/2 lg:pl-4">
            <div class="py-3">
              <label
                for="lastName"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/2 lg:pr-4">
            <div class="py-3">
              <label
                for="email"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
                >Email</label
              >
              <input
                id="email"
                v-model="formData.email"
                placeholder="pushkin01@gmail.com"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/2 lg:pl-4">
            <div class="py-3">
              <label
                for="login"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                inputmode="verbatim"
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/2 lg:pr-4">
            <div class="py-3">
              <label
                for="password"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="w-full lg:w-1/2 lg:pl-4">
            <div class="py-3">
              <label
                for="passwordConfirmation"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
            </div>
          </div>

          <div class="flex justify-start">
            <label class="flex items-center my-4 font-bold text-gray-500">
              <input
                v-model="formData.policy"
                class="top-0 leading-loose text-pink-600"
                type="checkbox"
              />
              <span class="py-2 ml-2 text-sm text-left text-gray-600">
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
            class="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
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
        .then(() => {
          this.$router.push({
            name: 'auth-registration-confirm',
          })
        })
    },
  },
}
</script>
