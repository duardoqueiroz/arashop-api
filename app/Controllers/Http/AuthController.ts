import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password, { expiresIn: '7days' })
      let user: User = token.user
      await user.load('addresses')
      return response.ok({ user, token })
    } catch (error) {
      return response.unauthorized({ message: 'Falha na autenticação', error })
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok('ok')
  }
}
