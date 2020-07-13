import Vue from 'vue'
import Vcalendar from 'v-calendar'
// import 'v-calendar/lib/v-calendar.min.css'

const monday = {
  firstDayOfWeek: 2,
  masks: {
    L: 'YYYY-MM-DD',
    input: ['YYYY-MM-DD'],
    data: ['YYYY-MM-DD'],
  },
}

Vue.use(Vcalendar, {
  locales: {
    ru: monday,
    'ru-RU': monday,
    be: monday,
    'be-BY': monday,
    uk: monday,
    'uk-UA': monday,
  },
  locale: 'ru',
})
