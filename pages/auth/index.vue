<template>
  <div
    class="mt-16 flex flex-col justify-center items-center md:w-1/2 max-w-lg mx-auto"
  >
    <div
      class="bg-white shadow-md rounded px-8 pb-8 flex flex-col mx-4 p-4 w-full"
    >
      <form @submit.prevent="submit()">
        <div class="flex flex-col">
          <div class="w-full">
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

          <div class="w-full">
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
                placeholder="Никто не знает"
                name="password"
                type="password"
                autocomplete="password"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border-2 border-grey-lighter focus:border-gray-600 focus:outline-none rounded py-3 px-4"
              />
            </div>
          </div>

          <div class="flex justify-between">
            <label class="block text-gray-500 font-bold my-4">
              <input type="checkbox" class="leading-loose text-pink-600" />
              <span class="py-2 text-sm text-gray-600 leading-snug">
                Запомнить меня
              </span>
            </label>
            <label class="block text-gray-500 font-bold my-4">
              <a
                href="#"
                class="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
              >
                <span>Забыли пароль?</span>
              </a>
            </label>
          </div>

          <button
            type="submit"
            class="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block hover:text-white hover:bg-black border-2 border-transparent focus:border-gray-600 focus:outline-none"
          >
            Войти
          </button>

          <!-- <div class="flex mt-4">
            <button
              type="submit"
              class="text-lg font-semibold bg-white w-1/2 text-center text-black rounded-lg px-6 py-3 block hover:text-black hover:bg-gray-200 border-2 focus:border-gray-600 focus:outline-none mr-2"
            >
              Google
            </button>
            <button
              type="submit"
              class="text-lg font-semibold bg-white w-1/2 text-center text-black rounded-lg px-6 py-3 block hover:text-black hover:bg-gray-200 border-2 focus:border-gray-600 focus:outline-none ml-2"
            >
              Apple
            </button>
          </div> -->
        </div>
      </form>
    </div>

    <hr class="my-6 border-b-1 border-gray-400 w-full" />

    <!-- <div class="text-center mt-6 mb-3">
      <p class="text-gray-600 text-sm font-bold">
        или
        <nuxt-link
          :to="{ name: 'auth-registration' }"
          class="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400"
        >
          <span>cоздать аккаунт</span>
        </nuxt-link>
      </p>
    </div> -->

    <div class="px-8 w-full">
      <nuxt-link
        :to="{ name: 'auth-registration' }"
        class="text-lg font-semibold bg-white w-full text-center text-black rounded-lg px-6 py-3 block hover:text-black hover:bg-gray-200 border-2 focus:border-gray-600 focus:outline-none"
      >
        Зарегистрироваться
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  methods: {
    submit() {
      this.$auth.loginWith('local', { data: this.formData })
    },
  },
}
</script>
