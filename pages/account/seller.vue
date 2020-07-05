<template>
  <div class="container flex flex-col mx-auto">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <upcoming-auctions :auctions="auctions.slice(0, 3)" />

      <div class="p-4 bg-white rounded shadow-md lg:col-span-2">
        <not-implemented suggest="account-seller-top" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    auctions: [
      {
        id: 0,
        attributes: {
          title: 'Проверка',
          starts_at: '2020-07-05T10:00:00+03:00',
          ends_at: '2020-07-05T18:00:00+03:00',
        },
      },
      {
        id: 1,
        attributes: {
          title: 'Проверка 2',
          starts_at: '2020-07-05T12:00:00+03:00',
          ends_at: '2020-07-05T16:00:00+03:00',
        },
      },
      {
        id: 2,
        attributes: {
          title: 'Проверка',
          starts_at: '2020-12-05T10:00:00+03:00',
          ends_at: '2020-12-05T18:00:00+03:00',
        },
      },
    ],
  }),
}
</script>
