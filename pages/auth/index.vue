<template>
  <div class="container mx-auto">
    <div
      class="flex flex-col items-center justify-center max-w-lg mx-auto mt-16 md:w-1/2"
    >
      <validation-observer
        v-slot="{ passed, handleSubmit }"
        ref="form"
        tag="div"
        class="flex flex-col w-full p-4 px-8 pb-8 mx-4 bg-white rounded shadow-md"
      >
        <form @submit.prevent="handleSubmit(submit)">
          <div class="flex flex-col">
            <div class="w-full">
              <validation-provider
                v-slot="v"
                rules="required|email"
                name="email"
                tag="div"
                class="py-3"
              >
                <label
                  for="email"
                  class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  placeholder="pushkin01@gmail.com"
                  name="email"
                  type="email"
                  autocomplete="email"
                  :class="{ 'border-red-600': v.failed }"
                  class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
                />
                <div v-if="v.errors" class="mt-3 text-xs italic text-red-600">
                  <p v-for="error in v.errors" :key="error">
                    {{ error }}
                  </p>
                </div>
              </validation-provider>
            </div>

            <div class="w-full">
              <validation-provider
                v-slot="v"
                rules="required"
                name="password"
                tag="div"
                class="py-3"
              >
                <label
                  for="password"
                  class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
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
                  :class="{ 'border-red-600': v.failed }"
                  class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
                />
                <div v-if="v.errors" class="mt-3 text-xs italic text-red-600">
                  <p v-for="error in v.errors" :key="error">
                    {{ error }}
                  </p>
                </div>
              </validation-provider>
            </div>

            <div class="flex justify-between">
              <label class="inline-flex items-center my-4 font-bold">
                <input type="checkbox" class="text-gray-600 form-checkbox" />
                <span class="ml-2 text-sm leading-snug text-gray-600">
                  Запомнить меня
                </span>
              </label>
              <div class="block my-4 font-bold text-gray-500">
                <nuxt-link
                  :to="{ name: 'auth-reset-email' }"
                  class="tracking-tighter text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                >
                  Забыли пароль?
                </nuxt-link>
              </div>
            </div>

            <button
              type="submit"
              :disabled="!passed"
              :class="{
                'cursor-not-allowed opacity-50': !passed,
              }"
              class="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
            >
              Войти
            </button>

            <!-- <div class="flex mt-4">
            <button
              type="submit"
              class="block w-1/2 px-6 py-3 mr-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
            >
              Google
            </button>
            <button
              type="submit"
              class="block w-1/2 px-6 py-3 ml-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
            >
              Apple
            </button>
          </div> -->
          </div>
        </form>
      </validation-observer>

      <hr class="w-full my-6 border-gray-400 border-b-1" />

      <!-- <div class="mt-6 mb-3 text-center">
      <p class="text-sm font-bold text-gray-600">
        или
        <nuxt-link
          :to="{ name: 'auth-registration' }"
          class="tracking-tighter text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
        >
          <span>cоздать аккаунт</span>
        </nuxt-link>
      </p>
    </div> -->

      <div class="w-full px-8">
        <nuxt-link
          :to="{ name: 'auth-registration' }"
          class="block w-full px-6 py-3 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
        >
          Зарегистрироваться
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  verified: false,
  auth: 'guest',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  middleware: ['auth', 'verified'],

  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),

  mounted() {
    // this.tryAutoSignIn()
  },

  methods: {
    submit() {
      this.$auth
        .loginWith('local', { data: this.formData })
        .then(() => {
          this.storePassword(this.formData.email, this.formData.password)
        })
        .catch((_err) => {
          this.$toast.error('Неправильный Email или пароль')
        })
    },

    storePassword(username, password) {
      if (!window.PasswordCredential) {
        return Promise.resolve()
      }

      const cred = new window.PasswordCredential({
        id: username,
        password,
        name: username,
      })

      return navigator.credentials.store(cred)
    },

    tryAutoSignIn() {
      if (!window.PasswordCredential) {
        return
      }

      navigator.credentials
        .get({
          password: true,
          mediation: 'optional',
        })
        .then((credential) => {
          if (!credential) {
            return
          }

          this.$auth.loginWith('local', {
            data: {
              email: credential.id,
              password: credential.password,
            },
          })
        })
    },
  },

  head() {
    return {
      title: 'Вход',
    }
  },
}
</script>
