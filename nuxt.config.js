require('dotenv').config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vue-string-filter',
    '~/plugins/reststate-vuex',
    '~/plugins/vue-i18n',
    { src: '~/plugins/axios', ssr: false },
    { src: '~plugins/v-calendar.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
    '@nuxtjs/moment',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    'nuxt-google-optimize',
    '@nuxtjs/toast',
  ],

  googleAnalytics: {
    id: process.env.GA_ID || 'UA-167845392-3',
  },

  toast: {
    position: 'top-right',
    duration: 3000,
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    host: 'auctions-backend.test',
    prefix: '/api/v1',
    port: '80',
  },

  auth: {
    redirect: {
      login: '/auth',
      logout: '/',
      callback: '/auth',
      home: '/',
    },

    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/token',
            method: 'post',
            propertyName: 'jwt',
          },
          logout: { url: '/auth/token', method: 'delete' },
          user: { url: '/auth/me', method: 'get', propertyName: 'data' },
        },
      },
    },
  },

  moment: {
    defaultTimezone: 'Europe/Minsk',
    defaultLocale: 'ru',
    locales: ['ru'],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [
      //
      '@reststate/vuex',
      '@reststate/client',
    ],
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
  },
}
