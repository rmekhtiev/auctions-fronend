<template>
  <div>
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="mb-2 text-xl font-bold">Новый профиль</div>

      <div class="flex flex-wrap">
        <div class="w-full lg:w-1/3 lg:pr-4">
          <div class="py-3">
            <label
              for="type"
              class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
            >
              Форма собственности <span class="text-red-700">*</span>
            </label>
            <div class="relative">
              <select
                id="type"
                v-model="counterparty.type"
                name="type"
                type="text"
                autocomplete="no"
                class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
              >
                <option value="UL">Юридическое лицо</option>
              </select>
              <div
                class="absolute top-0 bottom-0 right-0 flex items-center px-4 pointer-events-none text-grey-darker"
              >
                <svg
                  class="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="mb-2 text-xl font-bold">Основные данные</div>

      <legal-entity-form v-model="counterparty" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    counterparty: {
      type: 'UL',
      name: {},
    },
  }),
}
</script>
