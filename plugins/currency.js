import VueCurrencyFilter from 'vue-currency-filter'
import Vue from 'vue'

Vue.use(VueCurrencyFilter, {
  symbol: 'BYN',
  thousandsSeparator: ' ',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'after',
  symbolSpacing: true,
})
