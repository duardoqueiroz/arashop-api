import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateValidator from 'App/Validators/UserItem/UpdateValidator'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class BoughtItemsController {
  public async store({ response, request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    await auth.user!.load('cartItems')
    data.items.forEach(async (i) => {
      await auth.user!.related('cartItems').detach([i.item_id])
      await auth.user!.related('purchasedItems').attach({
        [i.item_id]: {
          quantity: i.quantity,
          status: ITEM_STATUS.BOUGHT,
        },
      })
    })
    return response.ok('Ok!')
  }
}
