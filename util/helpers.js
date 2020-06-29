export const routeOption = (route, key, value) => {
  // console.log(
  //   route.matched.map(({ components }) =>
  //     Object.values(components).map(({ options }) => options)
  //   )
  // )

  return route.matched.some((m) => {
    if (process.client) {
      // Client
      return Object.values(m.components).some(
        (component) => component.options && component.options[key] === value
      )
    } else {
      // SSR
      return Object.values(m.components).some((component) =>
        Object.values(component._Ctor).some(
          (ctor) => ctor.options && ctor.options[key] === value
        )
      )
    }
  })
}
