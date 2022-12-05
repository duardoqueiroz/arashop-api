import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/google/redirect', async ({ ally }) => {
  return ally.use('google').redirect()
})

Route.get('/google/callback', async ({ ally, auth, response }) => {
  const google = ally.use('google')

  /**
   * User has explicitly denied the login request
   */
  if (google.accessDenied()) {
    return 'Access was denied'
  }

  /**
   * Unable to verify the CSRF state
   */
  if (google.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  /**
   * There was an unknown error during the redirect
   */
  if (google.hasError()) {
    return google.getError()
  }

  /**
   * Finally, access the user
   */
  const googleUser = await google.user()
  var user = await User.findBy('email', googleUser.email)
  if (!user) {
    user = await User.create({
      email: googleUser.email!,
      name: googleUser.name,
    })
  }
  await auth.use('api').login(user)
  return response.redirect().back()
})
