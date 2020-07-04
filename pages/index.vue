<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-col">
      <home-auctions :auctions="auctions" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    auctions: [
      {
        id: '1',
      },
      {
        id: '2',
      },
      {
        id: '3',
      },
      {
        id: '3',
      },
    ],
  }),
}
</script>
