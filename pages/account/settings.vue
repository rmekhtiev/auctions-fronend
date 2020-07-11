<template>
  <div>
    <div class="container flex flex-col mx-auto">
      <div
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">Настройки</h3>
          </div>
        </div>
        <form>
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="w-full lg:col-span-1">
              <label
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
                :class="{ 'border-red-600': errors && errors.email }"
                class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
              <div v-if="errors" class="text-xs italic text-red-600">
                <p v-for="error in errors.email" :key="error" class="pt-3">
                  {{ error }}
                </p>
              </div>
            </div>

            <div class="w-full lg:col-span-1">
              <label
                for="login"
                class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
              >
                Логин
              </label>
              <input
                id="login"
                :value="$auth.user.attributes.login"
                placeholder="pushkin01"
                name="login"
                type="text"
                autocomplete="no"
                inputmode="verbatim"
                disabled
                class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
              <div v-if="errors" class="text-xs italic text-red-600">
                <p v-for="error in errors.login" :key="error" class="pt-3">
                  {{ error }}
                </p>
              </div>
            </div>

            <div class="w-full lg:col-span-1">
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
                :class="{ 'border-red-600': errors && errors.password }"
                class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
              <div v-if="errors" class="text-xs italic text-red-600">
                <p v-for="error in errors.password" :key="error" class="pt-3">
                  {{ error }}
                </p>
              </div>
            </div>

            <div class="w-full lg:col-span-1">
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
                :class="{
                  'border-red-600': errors && errors.password_confirmation,
                }"
                class="block w-full px-4 py-3 transition duration-150 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              />
              <div v-if="errors" class="text-xs italic text-red-600">
                <p
                  v-for="error in errors.password_confirmation"
                  :key="error"
                  class="pt-3"
                >
                  {{ error }}
                </p>
              </div>
            </div>
          </div>
        </form>
        <div class="flex justify-start mt-4">
          <ul>
            <li class="flex items-center py-1">
              <div
                :class="{
                  'bg-green-200 text-green-700':
                    formData.password == formData.password_confirmation &&
                    formData.password.length > 0,
                  'bg-red-200 text-red-700':
                    formData.password != formData.password_confirmation ||
                    formData.password.length == 0,
                }"
                class="p-1 rounded-full fill-current"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-show="
                      formData.password == formData.password_confirmation &&
                      formData.password.length > 0
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                  <path
                    v-show="
                      formData.password != formData.password_confirmation ||
                      formData.password.length == 0
                    "
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span
                :class="{
                  'text-green-700':
                    formData.password == formData.password_confirmation &&
                    formData.password.length > 0,
                  'text-red-700':
                    formData.password != formData.password_confirmation ||
                    formData.password.length == 0,
                }"
                class="ml-3 text-sm font-medium"
                v-text="
                  formData.password == formData.password_confirmation &&
                  formData.password.length > 0
                    ? 'Пароль и подтверждение совпадают'
                    : 'Пароль не совпадают'
                "
              ></span>
            </li>
            <li class="flex items-center py-1">
              <div
                :class="{
                  'bg-green-200 text-green-700': formData.password.length >= 8,
                  'bg-red-200 text-red-700': formData.password.length < 8,
                }"
                class="p-1 rounded-full fill-current"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-show="formData.password.length >= 8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                  <path
                    v-show="formData.password.length < 8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <span
                :class="{
                  'text-green-700': formData.password.length >= 8,
                  'text-red-700': formData.password.length < 8,
                }"
                class="ml-3 text-sm font-medium"
                v-text="
                  formData.password.length > 7
                    ? 'Минимальная длина пароля соответствует требованиям платформы'
                    : 'Минимальная длина пароля 8 символов'
                "
              ></span>
            </li>
          </ul>
        </div>
        <button
          type="submit"
          class="block w-full px-6 py-3 mt-4 text-lg font-semibold text-white transition duration-150 bg-gray-800 border-2 border-transparent rounded-lg hover:text-white hover:bg-black focus:border-gray-600 focus:outline-none"
          @click="submit"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    formData: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    errors: null,
  }),
  watch: {},
  created() {
    this.formData.email = this.$auth.user.attributes.email
  },
  methods: {
    submit() {
      const form = {
        data: {
          attributes: this.formData,
          id: `${this.$auth.user.id}`,
          type: 'users',
        },
      }
      this.$axios
        .patch('users/' + this.$auth.user.id, form)
        .then(() => {
          this.$auth.fetchUser()
          this.$toast.success('Обновлено')
        })
        .catch((_err) => {
          this.$toast.error(_err)
        })
    },
  },
}
</script>
