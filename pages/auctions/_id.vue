<template>
  <div class="container p-4 mx-auto">
    <div class="flex flex-col">
      <div class="grid grid-cols-3 gap-8">
        <div class="flex">
          <picture>
            <img
              class="object-cover object-center w-full border border-gray-200 rounded"
              src="https://via.placeholder.com/450x450"
              :alt="auction.attributes.display_title"
            />
          </picture>
        </div>
        <div class="col-span-2">
          <dl>
            <div
              class="flex items-center py-2 text-sm font-medium leading-5 text-gray-500"
            >
              <div>
                <dt class="inline">Номер лота:</dt>
                <dd
                  class="inline font-bold text-gray-900"
                  v-text="auction.id"
                />
              </div>
              <div class="flex pl-3 ml-3 border-l-2 border-gray-200">
                <a
                  class="font-bold text-black border-b-2 border-gray-200 cursor-pointer hover:border-gray-400"
                >
                  Состав лота
                </a>
              </div>
            </div>
            <div>
              <dt class="text-sm tracking-widest text-gray-500 title-font">
                Наименование
              </dt>
              <dd>
                <h1
                  class="mb-1 text-3xl font-medium text-gray-900 title-font"
                  v-text="auction.attributes.display_title"
                />
              </dd>
            </div>

            <div class="flex mb-4">
              <span class="flex items-center text-gray-500">
                <eye-icon class="w-5 h-5" />
                <span class="ml-3">4 просмотра</span>
              </span>
              <div
                class="flex py-2 pl-3 ml-3 transition-colors duration-150 ease-in-out border-l-2 border-gray-200"
              >
                <a class="text-gray-500 hover:text-gray-700">
                  <facebook-icon class="w-5 h-5" />
                </a>
                <a
                  class="ml-2 text-gray-500 transition-colors duration-150 ease-in-out hover:text-gray-700"
                >
                  <twitter-icon class="w-5 h-5" />
                </a>
                <a
                  class="ml-2 text-gray-500 transition-colors duration-150 ease-in-out hover:text-gray-700"
                >
                  <share-2-icon class="w-5 h-5" />
                </a>
              </div>
            </div>

            <div class="pb-2 mb-4 border-b-2 border-gray-200">
              <div class="mb-2">
                <dt class="text-sm font-medium leading-5 text-gray-500">
                  Адрес
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900">
                  Минская обл., Червенский р-н, г. Червень, ул. Чапаева, д. 21
                </dd>
              </div>
              <div class="mb-2">
                <dt class="text-sm font-medium leading-5 text-gray-500">
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
            </div>
          </dl>
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
    FacebookIcon,
    TwitterIcon,
    Share2Icon,
    EyeIcon,
  },
  async fetch() {
    await this.$store.dispatch('auctions/loadById', {
      id: this.$route.params.id,
    })
  },
  async asyncData({ store, route }) {
    await store.dispatch('auctions/loadById', { id: route.params.id })
    // return {
    //   auction: store.getters['auctions/byId']({ id: route.params.id }),
    // }
  },
  computed: {
    auction() {
      return this.$store.getters['auctions/byId']({ id: this.$route.params.id })
    },
    seller() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'counterparty',
      })
    },
  },
}
</script>
