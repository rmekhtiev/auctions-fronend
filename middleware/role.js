export default function ({ $auth, route, error }) {
  let roles = []
  route.meta.map((meta) => {
    if (meta.role && typeof meta.role !== 'undefined') roles = meta.role
  })

  if (!roles.includes($auth.user.attributes.role)) {
    error({ statusCode: 403, message: 'Вам сюда нельзя' })
  }
}
