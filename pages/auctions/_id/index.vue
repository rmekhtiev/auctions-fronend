<template>
  <div class="container p-4 mx-auto">
    <CoolLightBox
      v-if="hasImages"
      :items="auction.attributes.images"
      :index="lightBoxIndex"
      :use-zoom-bar="true"
      @close="lightBoxIndex = null"
    >
    </CoolLightBox>

    <div class="flex flex-col">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="flex flex-col">
          <template v-if="hasImages">
            <picture class="mb-4">
              <img
                :src="auction.attributes.images[imageDisplayIndex]"
                :alt="auction.attributes.title"
                class="object-contain object-center w-full h-64 bg-gray-400 border border-gray-200 rounded"
                @click="lightBoxIndex = imageDisplayIndex"
              />
            </picture>
            <div class="grid grid-cols-4 gap-2">
              <picture
                v-for="(image, index) in auction.attributes.images"
                :key="`auction-image-${index}`"
              >
                <img
                  :src="image"
                  :alt="auction.attributes.title"
                  class="object-cover object-center w-full h-full border border-gray-200 rounded"
                  @mouseover="imageDisplayIndex = index"
                  @click="lightBoxIndex = index"
                />
              </picture>
            </div>
          </template>
          <picture v-else class="mb-4">
            <img
              :src="cover"
              :alt="auction.attributes.title"
              class="object-cover object-center w-full border border-gray-200 rounded"
              @click="lightBoxIndex = 0"
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
                <div
                  v-if="isEnded"
                  class="block w-full px-6 py-3 mb-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
                >
                  Торги окончены
                </div>

                <button
                  v-else-if="isRunning"
                  class="relative block w-full px-6 py-3 mb-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
                  @click="openSalesroom(auction)"
                >
                  Аукционный зал
                  <span
                    class="absolute top-0 right-0 flex w-3 h-3 transform translate-x-1/2 -translate-y-1/2"
                  >
                    <span
                      class="absolute inline-flex w-full h-full bg-pink-400 rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      class="relative inline-flex w-3 h-3 bg-pink-500 rounded-full"
                    ></span>
                  </span>
                </button>

                <nuxt-link
                  v-else-if="status === 'UPCOMING'"
                  :to="{
                    name: 'auctions-id-participate',
                    params: {
                      id: auction.id,
                    },
                  }"
                  class="block w-full px-6 py-3 mb-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
                >
                  Подать заявку
                </nuxt-link>

                <div
                  v-else
                  class="block w-full px-6 py-3 mb-2 text-lg font-semibold text-center text-black transition duration-150 bg-white border-2 rounded-lg md:w-64 lg: hover:text-black hover:bg-gray-200 focus:border-gray-600 focus:outline-none"
                >
                  Торги отменены
                </div>

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
</template>

<script>
import {
  FacebookIcon,
  TwitterIcon,
  Share2Icon,
  EyeIcon,
} from 'vue-feather-icons'

import auction from '@/mixins/data-types/auction'

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

  mixins: [auction],

  data: () => ({
    lightBoxIndex: null,
    imageDisplayIndex: 0,
  }),

  computed: {
    seller() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'seller',
      })
    },
    organizer() {
      return this.$store.getters['counterparties/related']({
        parent: this.auction,
        relationship: 'organizer',
      })
    },
    address() {
      return this.$store.getters['addresses/related']({
        parent: this.auction,
        relationship: 'address',
      })
    },

    hasImages() {
      return (
        Array.isArray(this.auction.attributes.images) &&
        this.auction.attributes.images.length
      )
    },
  },
}
</script>
