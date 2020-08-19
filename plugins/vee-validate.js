/* eslint-disable camelcase */

import { localize, extend } from 'vee-validate'
import { required, email, alpha_num } from 'vee-validate/dist/rules'
import ru from 'vee-validate/dist/locale/ru.json'

localize({
  ru,
})

extend('email', {
  ...email,
  message: 'Введите корректный Email',
})

extend('required', {
  ...required,
  message: 'Поле обязательно для заполнения',
})

extend('alpha_num', {
  ...alpha_num,
  message: 'Поле может содержать только латинские буквы и цифры',
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Пароли не совпадают',
})
