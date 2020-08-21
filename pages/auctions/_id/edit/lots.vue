<template>
  <validation-observer
    v-slot="{ passed, handleSubmit }"
    ref="form"
    tag="div"
    class="container flex flex-col mx-auto"
  >
    <form @submit.prevent="handleSubmit(save)">
      <div
        v-for="(lot, index) in lots"
        :key="`lot-${index}`"
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">
              {{ lot.title ? lot.title : 'Новый лот' }}
            </h3>
            <p class="text-sm text-gray-500">
              Введите информацию о лоте
            </p>
          </div>
        </div>

        <lot-form v-model="lots[index]" />
      </div>

      <div
        v-show="false"
        class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div class="flex items-center mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-600">
              Прикрепите документы
            </h3>
            <p class="text-sm text-gray-500">
              Список необходимых файлов:
              <a
                href="#"
                class="font-semibold text-gray-700 border-b-2 border-gray-200 hover:border-gray-500"
              >
                Правила проведения торгов
              </a>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <client-only>
            <file-pond
              allow-multiple="true"
              accepted-file-types="image/jpeg, image/png"
              @updatefiles="handleSubmitImages"
            />
          </client-only>
        </div>
      </div>

      <div class="flex flex-row justify-end">
        <button
          class="inline-flex px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 bg-indigo-600 border-2 border-transparent rounded-lg shadow-sm hover:text-white hover:bg-indigo-500 focus:border-indigo-300 focus:outline-none"
          :disabled="loading || !passed"
          :class="{
            'cursor-not-allowed opacity-50': loading || !passed,
          }"
        >
          <component
            :is="loading ? 'loader-icon' : 'check-icon'"
            class="w-5 h-5 mr-2 -ml-1"
            :class="{
              'animate-spin': loading,
            }"
          />
          Дальше
        </button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { CheckIcon, LoaderIcon } from 'vue-feather-icons'

export default {
  components: {
    ValidationObserver,
    CheckIcon,
    LoaderIcon,
  },

  data: () => ({
    loading: false,
    lots: [
      {
        title: '',
        category: '',

        price_start: 0,
        price_min: 0,
        deposit: 0,
        step: 0,
      },
    ],
  }),

  methods: {
    async save() {
      this.loading = true

      try {
        await Promise.all(
          this.lots.map((lot) => {
            const lotData = {
              attributes: lot,
              relationships: {
                auction: {
                  data: {
                    id: this.$route.params.id,
                    type: 'auctions',
                  },
                },
              },
            }

            return this.$store.dispatch('lots/create', lotData)
          })
        )
        this.$router.push({
          name: 'auctions-id-edit-address',
          params: { id: this.$route.params.id },
        })
      } catch (_err) {
        // todo: server-side errors
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
