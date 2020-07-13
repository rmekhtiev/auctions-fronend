import { routeOption } from '~/util/helpers'

export default function ({ $auth, redirect, route }) {
  if (routeOption(route, 'verified', false)) {
    return
  }

  // If the user is not verified
  if (!$auth.$state.loggedIn || $auth.user.attributes.verified_at == null) {
    return redirect({ name: 'auth-registration-confirm' })
  }
}
