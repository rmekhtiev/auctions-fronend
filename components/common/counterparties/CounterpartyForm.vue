<template>
  <div class="flex flex-col">
    <div
      class="flex flex-col w-full p-4 px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div class="flex items-center mb-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-600">Основные данные</h3>
          <p class="text-sm text-gray-500">Profit Share between customers</p>
        </div>
      </div>
      <template>
        <legal-entity-form
          v-if="counterparty._type === 'UL'"
          v-model="counterparty"
        />
        <individual-enterpreneur-form
          v-if="counterparty._type === 'IP'"
          v-model="counterparty"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    LegalEntityForm: () => import('./legal/LegalEntityForm'),
    IndividualEnterpreneurForm: () =>
      import('./legal/IndividualEnterpreneurForm'),
  },
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
  },
}
</script>
