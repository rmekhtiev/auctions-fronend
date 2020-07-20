export default function ({ $auth, route }) {
  let roles = []
  route.meta.map((meta) => {
    if (meta.role && typeof meta.role !== 'undefined') roles = meta.role
  })

  if (roles.includes($auth.user.attributes.role)) {
    console.log('Allowed') // todo adds redirect
  } else {
    console.error('Not allowed')
  }
}
