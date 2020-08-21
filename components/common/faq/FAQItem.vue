<template>
  <div class="mb-2">
    <div
      class="flex flex-row-reverse px-2 py-3 mt-2 text-lg font-medium text-gray-800 bg-white rounded-sm cursor-pointer hover:bg-white"
      @click="toggle"
    >
      <div class="flex-auto">{{ title }}</div>
      <div class="px-2 mt-1">
        <div>
          <chevron-down-icon
            class="w-5 h-5 transition-transform duration-150 transform"
            :class="{
              'rotate-180': isOpen,
            }"
          />
        </div>
      </div>
    </div>
    <transition>
      <div v-show="isOpen" class="p-2 mb-5 text-left text-gray-800 bg-white">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'

export default {
  components: {
    ChevronDownIcon,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    isOpen: false,
  }),

  watch: {
    isOpen(value) {
      this.$emit('op', value)
    },
  },

  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
