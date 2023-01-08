import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/UserItem/StoreValidator'
import UpdateValidator from 'App/Validators/UserItem/UpdateValidator'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class CartItemsController {
  public async index({ response, params, auth }: HttpContextContract) {
    await auth.user!.load('purchasedItems')
    await auth.user!.load('cartItems')
    return response.ok({
      cart_items: auth.user!.cartItems,
      purshased_items: auth.user!.purchasedItems,
    })
  }

  public async store({ response, request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await auth.user!.load('cartItems')
    await auth.user!.related('cartItems').attach({
      [data.item_id]: {
        quantity: data.quantity,
        status: ITEM_STATUS.CART,
      },
    })
    return response.ok('Ok!')
  }

  public async show({ response, params, auth }: HttpContextContract) {
    await auth.user!.load('cartItems')
    const item = auth.user!.cartItems.find((i) => +i.id === +params.id)
    if (!item) {
      return response.notFound('Item não encontrado!')
    }
    return response.ok(item)
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    await auth.user!.load('cartItems')
    const item = auth.user!.cartItems.find((i) => +i.id === +params.id)
    if (!item) {
      return response.notFound('Item não encontrado!')
    }
    await auth.user!.related('cartItems').detach([item.id])
    return response.ok('Ok!')
  }
}
