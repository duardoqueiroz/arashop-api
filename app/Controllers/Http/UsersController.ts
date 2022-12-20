import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    data.phone = data.phone?.replace(/\D/g, '')
    const user = await User.create(data)
    data.addresses && (await user.related('addresses').createMany(data.addresses))
    return response.created(user)
  }

  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    if (users.length === 0) {
      return response.noContent()
    }
    return response.ok(users)
  }

  public async show({ params, response }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
    await user.load('addresses')
    await user.load('createdItems')
    await user.load('savedItems')
    return response.ok(user)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
    user.merge(data)
    await user.save()
    return response.ok(user)
  }

  public async destroy({ response, params }: HttpContextContract) {
    const user = await User.find(params.id)
    if (!user) {
      return response.notFound({ message: 'Usuário não encontrado' })
    }
    await user.delete()
    return response.noContent()
  }
}
