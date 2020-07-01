<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center justify-center mt-16">
      <div class="w-full p-4 mx-8 mb-8 md:mx-auto md:w-1/2">
        <div class="flex items-center">
          <template v-for="(step, key, index) in steps">
            <div
              :key="`step-${key}`"
              :class="{
                'text-gray-00': isPrevious(key),
                'text-white': isCurrent(key),
                'text-gray-500': !isCurrent(key) && isFuture(key),
              }"
              class="relative flex items-center"
            >
              <div
                :class="{
                  'bg-gray-800': isCurrent(key),
                  'border-gray-800': isPrevious(key) || isCurrent(key),
                  'border-gray-300': isFuture(key),
                }"
                class="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-gray-300 rounded-full"
              >
                <component :is="step.icon" width="100%" height="100%" />
              </div>
              <div
                :class="{
                  'text-gray-800': isPrevious(key) || isCurrent(key),
                  'text-gray-500': isFuture(key),
                }"
                class="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center uppercase"
                v-text="/* $t(`registration.steps.${key}`) */ key"
              />
            </div>
            <div
              v-if="index != Object.keys(steps).length - 1"
              :key="`step-${key}-line`"
              :class="{
                'border-gray-300': !isPrevious(key),
                'border-gray-800': isPrevious(key),
              }"
              class="flex-auto transition duration-500 ease-in-out border-t-2 border-gray-300"
            ></div>
          </template>
        </div>
      </div>

      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { UserPlusIcon, MailIcon, CheckIcon } from 'vue-feather-icons'

export default {
  // verified: false,
  // auth: false,
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UserPlusIcon,
    // eslint-disable-next-line vue/no-unused-components
    MailIcon,
    // eslint-disable-next-line vue/no-unused-components
    CheckIcon,
  },
  data: () => ({
    steps: {
      index: {
        icon: 'UserPlusIcon',
        route: {
          name: 'auth-registration',
        },
      },
      verify: {
        icon: 'MailIcon',
        route: {
          name: 'auth-registration-confirm',
        },
      },
      success: {
        icon: 'CheckIcon',
        route: {
          name: 'auth-registration-success',
        },
      },
    },
  }),
  computed: {
    stepsKeys() {
      return Object.keys(this.steps)
    },
    stepsRoutes() {
      return Object.values(this.steps).map(({ route: { name } }) => name)
    },
    currentRouteName() {
      return this.$route.name
    },
  },
  methods: {
    isPrevious(_step) {
      return (
        this.stepsKeys.indexOf(_step) <
        this.stepsRoutes.indexOf(this.currentRouteName)
      )
    },
    isCurrent(key) {
      return this.currentRouteName === this.steps[key].route.name
    },
    isFuture(_step) {
      return (
        this.stepsKeys.indexOf(_step) >
        this.stepsRoutes.indexOf(this.currentRouteName)
      )
    },
  },
}
</script>
