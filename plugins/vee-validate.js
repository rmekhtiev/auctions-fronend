/* eslint-disable camelcase */

import { localize, extend } from 'vee-validate'
import {
  required,
  email,
  alpha_num,
  integer,
  digits,
} from 'vee-validate/dist/rules'
import ru from 'vee-validate/dist/locale/ru.json'

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
  message: 'Поле должно содержать только латинские буквы и цифры',
})

extend('digits', {
  ...digits,
  message: 'Поле должно содержать {length} цифр',
})

extend('integer', {
  ...integer,
  message: 'Поле должно быть числом',
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Пароли не совпадают',
})

extend('passport', {
  validate(value) {
    return /([A-ZА-Я]{2})(\d{7})/.test(value)
  },
  message: 'Введите номер и серию в формате ББЦЦЦЦЦЦЦ',
})

extend('passport_personal', {
  validate(value) {
    return /(\d{7})([A-ZА-Я])(\d{3})([A-ZА-Я]{2})(\d)/.test(value)
  },
  message: 'Введите номер в формате ЦЦЦЦЦЦЦБЦЦЦББЦ',
})

localize({
  ru,
})
