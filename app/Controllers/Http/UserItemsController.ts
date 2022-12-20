import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/UserItem/StoreValidator'

export default class UserItemsController {
  public async index({response, params, auth}: HttpContextContract) {
    await auth.user!.load("savedItems")
    return response.ok(auth.user!.savedItems)
  }

  public async store({response,request,auth}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await auth.user!.load("savedItems")
    data.items.forEach(async(i)=>{
      await auth.user!.related("savedItems").attach({[i.item_id]: {
        quantity: i.quantity,
        status: i.status
      }})
    })
    return response.ok("Ok!")
  }

  public async show({response,params, auth}: HttpContextContract) {
    await auth.user!.load("savedItems")
    const item = auth.user!.savedItems.find((i)=> +i.id === +params.id)
    if(!item){
      return response.notFound("Item não encontrado!")
    }
    return response.ok(item)
  }
}
