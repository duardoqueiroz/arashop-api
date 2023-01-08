import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    items: schema.array([rules.required(), rules.minLength(1)]).members(
      schema.object().members({
        item_id: schema.number([rules.exists({ table: 'items', column: 'id' }), rules.required()]),
        quantity: schema.number([rules.range(1, 100)]),
      })
    ),
  })

  public messages: CustomMessages = {
    'quantity.range': 'A quantidade deve ser entre 1 e 100',
  }
}
