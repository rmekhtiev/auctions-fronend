function numbers($event) {
  const keyCode = $event.keyCode ? $event.keyCode : $event.which
  if (keyCode < 48 || keyCode > 57) {
    // 46 is dot
    $event.preventDefault()
  }
}

export default {
  inserted(el) {
    el.addEventListener('keypress', numbers)
  },
}
