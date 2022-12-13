import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/UserItem/StoreValidator'

export default class UserItemsController {
  public async index({response, params, auth}: HttpContextContract) {
    const items = await auth.user!.load("items")
    return response.ok(items)
  }

  public async store({response,request,auth}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await auth.user!.related("items").sync(data.items.map((i)=> i.item_id))
  }

  public async show({response,params, auth}: HttpContextContract) {
    await auth.user!.load("items")
    const item = auth.user!.items.find((i)=> i.id === params.item_id)
    if(!item){
      return response.notFound("Item não encontrado!")
    }
    return response.ok(item)
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
