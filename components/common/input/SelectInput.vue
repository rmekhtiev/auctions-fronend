<template>
  <div>
    <div class="py-3">
      <label
        v-if="label"
        for="title"
        class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        {{ label }} <span v-if="required" class="text-red-700">*</span>
      </label>

      <div class="relative">
        <select
          id="type"
          name="type"
          type="text"
          autocomplete="no"
          class="block w-full px-4 py-3 pr-12 bg-white border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
        >
          <option value="UL">Юридическое лицо</option>
        </select>
        <div
          class="absolute top-0 bottom-0 right-0 flex items-center px-4 text-gray-400 pointer-events-none"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
