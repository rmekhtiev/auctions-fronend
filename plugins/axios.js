export default function(nuxt) {
  const { $axios, redirect, app } = nuxt;
  const { $toast, $auth } = app;

  // eslint-disable-next-line no-unused-vars
  $axios.onRequest(config => {});

  $axios.onError(error => {
    switch(error.response.status) {
      case 500:
        $toast.error('Ошибка сервера')


      case 406:
        $toast.error('Ошибка валидации')

    }
  })

  $axios.onResponse(response => {
    switch(response.status) {

      case 201:
        $toast.success('Успешно создано')
        break
      case 202:
        $toast.success('Обновлено')
        break
      case 204:
        $toast.success('Удалено')
        break
      case 200:
        $toast.success('Success')
    }
  })
}
