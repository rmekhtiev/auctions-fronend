<template>
  <div>
    <div class="z-40 bg-gray-100 //lg:sticky top-16">
      <div class="container flex flex-col mx-auto">
        <auction-header
          :auction="auction.attributes"
          :address="address.attributes"
        ></auction-header>
      </div>
    </div>
    <div class="container p-4 mx-auto">
      <div class="flex flex-col">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="flex">
            <picture>
              <img
                class="object-cover object-center w-full border border-gray-200 rounded"
                src="https://via.placeholder.com/450x450"
                :alt="auction.attributes.title"
              />
            </picture>
          </div>
          <div class="lg:col-span-2">
            <dl class="flex flex-col">
              <div
                class="flex items-center order-first py-2 mb-4 text-sm font-medium leading-5 text-gray-600 border-b-2 border-gray-200"
              >
                <div>
                  <dt class="inline">Номер лота:</dt>
                  <dd
                    class="inline font-bold text-gray-900"
                    v-text="auction.id"
                  />
                </div>
                <!-- <span
                  class="flex items-center pl-3 ml-3 text-gray-600 border-l-2 border-gray-200"
                >
                  <eye-icon class="w-5 h-5" />
                  <span class="ml-3">4 просмотра</span>
                </span> -->

                <div
                  class="flex pl-3 ml-3 transition-colors duration-150 ease-in-out border-l-2 border-gray-200"
                >
                  <!-- <a class="text-gray-600 hover:text-gray-700">
                    <facebook-icon class="w-5 h-5" />
                  </a>
                  <a
                    class="ml-2 text-gray-600 transition-colors duration-150 ease-in-out hover:text-gray-700"
                  >
                    <twitter-icon class="w-5 h-5" />
                  </a> -->
                  <web-share
                    class="ml-2 text-gray-600 transition-colors duration-150 ease-in-out hover:text-gray-700"
                    :title="auction.attributes.title"
                  >
                    <share-2-icon class="w-5 h-5" />
                  </web-share>
                </div>
              </div>

              <div class="pb-2 mb-4 border-b-2 border-gray-200">
                <div class="mb-2">
                  <dt class="text-sm font-medium leading-5 text-gray-600">
                    Адрес
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900">
                    {{ auction.attributes.display_address }}
                  </dd>
                </div>
                <div class="mb-2">
                  <dt class="text-sm font-medium leading-5 text-gray-600">
                    Продавец
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900">
                    {{ seller.attributes.display_name }} (тел.
                    <a
                      :href="`tel:${seller.attributes.phone}`"
                      class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                      >{{ seller.attributes.phone }}</a
                    >, Email:
                    <a
                      :href="`mailto:${seller.attributes.email}`"
                      class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                      >{{ seller.attributes.email }}</a
                    >)
                  </dd>
                </div>
                <div class="mb-2">
                  <dt class="text-sm font-medium leading-5 text-gray-600">
                    Организатор
                  </dt>
                  <dd class="mt-1 text-sm leading-5 text-gray-900">
                    {{ organizer.attributes.display_name }} (тел.
                    <a
                      :href="`tel:${organizer.attributes.phone}`"
                      class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                      >{{ organizer.attributes.phone }}</a
                    >, Email:
                    <a
                      :href="`mailto:${organizer.attributes.email}`"
                      class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                      >{{ organizer.attributes.email }}</a
                    >)
                  </dd>
                </div>
              </div>
              <div
                class="flex flex-col pb-2 mb-4 border-b-2 border-gray-200 md:justify-between md:flex-row"
              >
                <div class="flex flex-col flex-1 mb-2">
                  <div class="mb-2">
                    <dt class="text-sm font-medium leading-5 text-gray-600">
                      Начальная цена
                    </dt>
                    <dd class="mt-1 text-lg font-bold leading-5 text-gray-900">
                      {{ auction.attributes.price_start | currency }}
                    </dd>
                  </div>
                  <div class="flex items-center mb-2">
                    <div class="w-1/2">
                      <dt
                        class="mt-1 text-sm font-medium leading-5 text-gray-600"
                      >
                        Минимальная цена
                      </dt>
                      <dd class="mt-1 leading-5 text-gray-900">
                        {{ auction.attributes.price_min | currency }}
                      </dd>
                    </div>
                    <div class="w-1/2 ml-3">
                      <dt
                        class="mt-1 text-sm font-medium leading-5 text-gray-600"
                      >
                        Залог
                      </dt>
                      <dd class="mt-1 leading-5 text-gray-900">
                        {{ auction.attributes.deposit | currency }}
                      </dd>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center justify-center">
                  <button
                    disabled
                    class="block w-full px-6 py-3 mb-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
                  >
                    Подать заявку
                  </button>

                  <nuxt-link :to="'#'" class="mb-2 text-sm text-gray-600">
                    Как участвовать?
                  </nuxt-link>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FacebookIcon,
  TwitterIcon,
  Share2Icon,
  EyeIcon,
} from 'vue-feather-icons'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FacebookIcon,
    // eslint-disable-next-line vue/no-unused-components
    TwitterIcon,
    Share2Icon,
    // eslint-disable-next-line vue/no-unused-components
    EyeIcon,
  },
  // async fetch() {
  //   await this.$store.dispatch('auctions/loadById', {
  //     id: this.$route.params.id,
  //   })
  // },
  async asyncData({ store, route }) {
    await store.dispatch('auctions/loadById', { id: route.params.id })
    const auction = store.getters['auctions/byId']({ id: route.params.id })

    return {
      auction,
      seller: store.getters['counterparties/related']({
        parent: auction,
        relationship: 'seller',
      }),
      organizer: store.getters['counterparties/related']({
        parent: auction,
        relationship: 'organizer',
      }),
      address: store.getters['addresses/related']({
        parent: auction,
        relationship: 'address',
      }),
    }
  },

  computed: {
    // auction() {
    //   return this.$store.getters['auctions/byId']({ id: this.$route.params.id })
    // },
    // seller() {
    //   return this.$store.getters['counterparties/related']({
    //     parent: this.auction,
    //     relationship: 'seller',
    //   })
    // },
    // organizer() {
    //   return this.$store.getters['counterparties/related']({
    //     parent: this.auction,
    //     relationship: 'organizer',
    //   })
    // },
  },
}
</script>
