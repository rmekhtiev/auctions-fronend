<template>
  <div class="flex flex-col items-center justify-center min-h-full mx-auto">
    <div
      class="flex flex-col items-center justify-center max-w-sm text-center text-gray-700"
    >
      <div
        class="w-24 h-24 m-4 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"
      />
      <span class="mx-4 text-xl font-medium">Загружаем&mldr;</span>
      <p
        class="mx-4 my-2 italic transition-opacity duration-300"
        :class="{
          'opacity-0': !display,
        }"
      >
        <a
          :href="`mailto:gitlab+d-1-huskymedia-auctions-auctions-frontend-20-issue-@devolt.one?subject=Не загружается страница: ${$route.path}`"
          class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
          target="_blank"
          >Сообщите нам</a
        >, если страница так&nbsp;и&nbsp;не&nbsp;загрузилась
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    display: false,
  }),

  mounted() {
    setTimeout(() => {
      this.display = true
    }, 1500)
  },
}
</script>

<style>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
