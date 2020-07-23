export default function (context, inject) {
  const { $auth } = context

  const $roles = function (roles) {
    return $auth.loggedIn && roles.includes($auth.user.attributes.role)
  }

  inject('roles', $roles)
  context.$roles = $roles
}
