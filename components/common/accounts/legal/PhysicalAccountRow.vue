<template>
  <tr class="border-b border-gray-200 last:border-b-0">
    <td class="px-6 py-4 whitespace-no-wrap">
      <div
        class="text-sm font-medium leading-5 text-gray-900"
        v-text="counterparty.attributes.display_name"
      />
      <div class="text-sm leading-5 text-gray-500">
        Физическое лицо
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <div class="text-sm leading-5 text-gray-900">
        Паспорт {{ counterparty.attributes.document.passport_number }}
      </div>
      <div class="text-sm leading-5 text-gray-500">
        выдан
        {{ $moment(counterparty.attributes.document.passport_date).format('LL') }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-no-wrap">
      <span
        class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
      >
        Активный
      </span>
    </td>
    <td
      class="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap"
    >
      <nuxt-link
        v-if="!counterparty.attributes.display_address"
        :to="{
          name: 'account-profiles-id-address',
          params: { id: counterparty.id },
        }"
        class="text-indigo-600 hover:text-indigo-900"
      >
        Добавить адрес
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    counterparty: {
      type: Object,
      required: true,
    },
    account: {
      type: Object,
      required: true,
    },
  },
}
</script>
