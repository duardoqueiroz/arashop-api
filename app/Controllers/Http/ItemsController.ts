import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import StoreValidator from 'App/Validators/Item/StoreValidator'

export default class ItemsController {
  public async index({ response }: HttpContextContract) {
    const items = await Item.all()
    if (items.length === 0) {
      return response.noContent()
    }
    return response.ok(items)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const item = await Item.create(data)
    return response.created(item)
  }

  public async show({ params, response }: HttpContextContract) {
    const item = await Item.find(params.id)
    if (!item) {
      return response.notFound({ message: 'Item não encontrado' })
    }
    return response.ok(item)
  }

  public async update({ params, response, request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const item = await Item.find(params.id)
    if (!item) {
      return response.notFound({ message: 'Item não encontrado' })
    }
    item.merge(data)
    await item.save()
    return response.ok(item)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const item = await Item.find(params.id)
    if (!item) {
      return response.notFound({ message: 'Item não encontrado' })
    }
    await item.delete()
    return response.noContent()
  }
}
