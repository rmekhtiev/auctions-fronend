<template>
  <div
    class="flex flex-col items-center justify-center max-w-lg mx-auto md:w-1/2"
  >
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mx-4 mt-16 bg-white rounded shadow-md"
    >
      <div class="flex flex-col">
        <h3 class="text-center pb-3 text-2xl">
          Поздравляем!
        </h3>
        <p class="mb-3 text-center text-sm text-gray-600">
          Ваш аккаунт подтвержден. Вы можете перейти в личный кабинет, дополнить
          свою учетную запись и пройти модерацию. Это не займет много времени)
        </p>

        <div class="w-full py-3 mb-3 text-center">
          <a
            href="#"
            target="_blank"
            class="font-semibold text-black border-b-2 border-gray-200 hover:border-gray-500"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendCode() {
      this.$axios
        .post('auth/verification/ask')
        .then((response) => {
          this.formData.counter = response.data.counter
          console.log('Counter - ' + this.formData.counter)
        })
        .catch((_err) => {
          console.error(_err)
        })
    },
    verify() {
      console.log(this.formData)
      this.$axios
        .post('auth/verification/verify', this.formData)
        .then(() => {
          this.$router.push({
            name: 'auth-registration-confirm',
          })
        })
        .catch((_err) => {
          console.error(_err)
        })
    },
  },
}
</script>
