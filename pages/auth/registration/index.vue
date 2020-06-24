<template>
  <form
    class="mt-8 mx-4 md:mx-auto p-4 w-full md:w-2/3 xl:w-1/2"
    @submit.prevent="submit"
  >
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 md:pr-4">
        <div class="py-2">
          <label for="firstName" class="px-1 text-sm text-gray-600">Имя</label>
          <input
            id="firstName"
            v-model="formData.first_name"
            placeholder="Александр"
            name="first_name"
            type="text"
            autocomplete="given-name"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pl-4">
        <div class="py-2">
          <label for="lastName" class="px-1 text-sm text-gray-600">
            Фамилия
          </label>
          <input
            id="lastName"
            v-model="formData.last_name"
            placeholder="Пушкин"
            name="last_name"
            type="text"
            autocomplete="family-name"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pr-4">
        <div class="py-2">
          <label for="email" class="px-1 text-sm text-gray-600">Email</label>
          <input
            id="email"
            v-model="formData.email"
            placeholder="pushkin01@gmail.com"
            name="email"
            type="email"
            autocomplete="email"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pl-4">
        <div class="py-2">
          <span class="px-1 text-sm text-gray-600">Логин</span>
          <input
            id="login"
            v-model="formData.login"
            placeholder="pushkin01"
            name="login"
            type="text"
            autocomplete="no"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pr-4">
        <div class="py-2">
          <label for="password" class="px-1 text-sm text-gray-600">
            Пароль
          </label>
          <input
            id="password"
            v-model="formData.password"
            placeholder="8+ символов"
            name="password"
            type="password"
            autocomplete="new-password"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 md:pl-4">
        <div class="py-2">
          <label for="passwordConfirmation" class="px-1 text-sm text-gray-600">
            Пароль (ещё раз)
          </label>
          <input
            id="passwordConfirmation"
            v-model="formData.password_confirmation"
            placeholder="Что бы не опечататься"
            name="password_confirmation"
            type="password"
            autocomplete="new-password"
            class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-500 shadow-md focus:placeholder-gray-400 focus:bg-white focus:border-gray-600 focus:outline-none"
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
        class="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
      >
        Продолжить
      </button>
    </div>
  </form>
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
      this.$axios.post('auth/register', this.formData)
    },
  },
}
</script>
