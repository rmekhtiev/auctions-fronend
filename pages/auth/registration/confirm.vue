<template>
  <div
    class="flex flex-col items-center justify-center max-w-lg mx-auto md:w-1/2"
  >
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mx-4 mt-16 bg-white rounded shadow-md"
    >
      <form @submit.prevent="verify">
        <div class="flex flex-col">
          <p class="mb-3 text-sm text-center text-gray-600">
            Мы отправили вам на Email, указанный ранее, код активации. Введите
            код в поле ниже, или нажмите на ссылку в письме.
          </p>

          <div class="w-full py-3 mb-3 text-center">
            <a
              :href="`https://${domain}/`"
              target="_blank"
              class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
            >
              Открыть {{ domain | capitalize }}
            </a>
          </div>
          <div class="w-full">
            <div>
              <label
                for="otp"
                class="block mb-2 text-xs font-bold tracking-wide text-center uppercase text-grey-darker"
              >
                Ваш код номер №{{ formData.counter }}
              </label>
              <input
                id="otp"
                v-model="formData.otp"
                name="otp"
                type="tel"
                pattern="[0-9]{6}"
                inputmode="number"
                autocomplete="one-time-code"
                minlength="6"
                maxlength="6"
                :class="{ 'border-red-600': errors }"
                class="block w-full px-4 py-3 mb-3 tracking-widest text-center border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />

              <p v-if="errors" class="text-xs italic text-center text-red-600">
                {{ errors }}
              </p>
            </div>

            <button
              type="submit"
              class="block w-full px-6 py-3 mt-3 text-lg font-semibold text-white bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
            >
              Подтвердить
            </button>

            <div
              class="mt-3 font-bold text-center text-gray-500"
              @click="sendCode"
            >
              <small>Отправить еще раз</small>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  verified: false,
  data: () => ({
    formData: {
      otp: '',
      counter: '',
    },
    errors: null,
  }),
  computed: {
    email() {
      return this.$auth.user.attributes.email
    },
    domain() {
      return this.email.replace(/.*@/, '')
    },
  },
  created() {
    this.sendCode()
  },
  methods: {
    sendCode() {
      this.$axios
        .post('auth/verification/ask')
        .then((response) => {
          this.formData.counter = response.data.counter
        })
        .catch((_err) => {})
    },
    verify() {
      this.$axios
        .post('auth/verification/verify', this.formData)
        .then(() => {
          this.$auth.fetchUser().then(() => {
            this.$router.push({ name: 'auth-registration-success' })
          })
        })
        .catch((_err) => {
          this.errors = _err.response.data.message
        })
    },
  },
}
</script>
