import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/SavedItem/StoreValidator'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class SavedItemsController {
  public async index({ auth, response }: HttpContextContract) {
    await auth.user!.load('savedItems')
    return response.ok(auth.user!.savedItems)
  }

  public async show({ auth, params, response }: HttpContextContract) {
    await auth.user!.load('savedItems')
    const item = auth.user!.savedItems.find((i) => +i.id === +params.item_id)
    if (!item) {
      return response.notFound('Item não encontrado!')
    }
    return response.ok(item)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await auth.user!.load('savedItems')
    await auth.user!.related('savedItems').attach([data.item_id])
    return response.ok('Ok!')
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    await auth.user!.load('savedItems')
    const item = auth.user!.savedItems.find((i) => +i.id === +params.item_id)
    if (!item) {
      return response.notFound('Item não encontrado!')
    }
    await auth.user!.related('savedItems').detach([item.id])
    return response.ok('Ok!')
  }
}
