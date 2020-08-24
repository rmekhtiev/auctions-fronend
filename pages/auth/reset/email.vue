<template>
  <div class="container mx-auto">
    <div
      class="flex flex-col items-center justify-center max-w-lg mx-auto mt-16 md:w-1/2"
    >
      <validation-observer
        v-slot="{ passed }"
        ref="form"
        tag="div"
        class="flex flex-col w-full p-4 px-8 pb-8 mx-4 bg-white rounded shadow-md"
      >
        <form @submit.prevent="submit">
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
                  placeholder="Введите email"
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

            <button
              type="submit"
              :disabled="loading || !passed"
              :class="{
                'cursor-not-allowed opacity-50': loading || !passed,
              }"
              class="flex w-full px-6 py-3 mt-3 text-lg justify-center font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
            >
              <loader-icon
                v-if="loading"
                class="w-5 h-5 mx-2 my-1 -ml-1 animate-spin"
              />
              Сбросить
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { LoaderIcon } from 'vue-feather-icons'

export default {
  auth: 'guest',

  middleware: ['auth'],

  components: {
    ValidationObserver,
    ValidationProvider,
    LoaderIcon,
  },

  data: () => ({
    loading: false,
    formData: {
      email: '',
    },
  }),

  mounted() {
    // this.tryAutoSignIn()
  },

  methods: {
    async submit() {
      this.loading = true

      try {
        await this.$axios.post('auth/password/reset', this.formData)
        this.$router.push({ name: 'auth-reset-sended' })
      } catch (_err) {
        // todo: server-side errors
      } finally {
        this.loading = false
      }
    },
  },

  head() {
    return {
      title: 'Сброс пароля',
    }
  },
}
</script>
