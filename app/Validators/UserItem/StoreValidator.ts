import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    item_id: schema.number([rules.exists({ table: 'items', column: 'id' }), rules.required()]),
    quantity: schema.number([rules.range(1, 100)]),
    status: schema.enum([ITEM_STATUS.BOUGHT, ITEM_STATUS.SAVED]),
  })

  public messages: CustomMessages = {}
}
