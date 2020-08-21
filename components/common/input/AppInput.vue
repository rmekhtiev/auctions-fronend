<template>
  <validation-provider
    :id="id"
    v-slot="v"
    :vid="vid"
    :rules="rules"
    :name="name || label"
    tag="div"
  >
    <label
      :for="`app-input-${id}`"
      class="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
    >
      <slot name="label">
        {{ label }} <sup v-if="required" class="text-red-700">*</sup>
      </slot>
    </label>
    <slot :value="innerValue" :v="v">
      <input
        :id="`app-input-${id}`"
        :key="name"
        v-model="innerValue"
        :placeholder="placeholder"
        :name="name"
        :type="type"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :pattern="pattern"
        :minlength="minlength"
        :maxlength="maxlength"
        :class="{
          'border-red-600': v.failed,
          'bg-gray-200 cursor-not-allowed': disabled,
        }"
        class="block w-full px-4 py-3 border-2 rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter focus:border-gray-600 focus:outline-none"
      />
    </slot>
    <div v-if="v.errors" class="mt-3 text-xs italic text-red-600">
      <p v-for="error in v.errors" :key="error">
        {{ error }}
      </p>
    </div>
  </validation-provider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider,
  },

  props: {
    value: {
      type: null,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: () => Math.random() * 1000,
    },

    label: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'text',
      validator(value) {
        return [
          'url',
          'text',
          'password',
          'tel',
          'search',
          'number',
          'email',
          'time',
        ].includes(value)
      },
    },

    inputmode: {
      type: String,
      default: null,
    },

    pattern: {
      type: String,
      default: null,
    },

    minlength: {
      type: [Number, String],
      default: null,
    },

    maxlength: {
      type: [Number, String],
      default: null,
    },

    placeholder: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    autocomplete: {
      type: String,
      default: 'no',
    },

    vid: {
      type: String,
      default: undefined,
    },

    rules: {
      type: [Object, String],
      default: '',
    },
  },

  data: () => ({
    innerValue: '',
  }),

  computed: {
    hasValue() {
      return !!this.innerValue
    },
  },

  watch: {
    innerValue(value) {
      this.$emit('input', value)
    },
    value(val) {
      if (val !== this.innerValue) {
        this.innerValue = val
      }
    },
  },
}
</script>
