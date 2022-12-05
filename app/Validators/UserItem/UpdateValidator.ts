import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    quantity: schema.number.optional([rules.range(1, 100)]),
    status: schema.enum.optional([ITEM_STATUS.BOUGHT, ITEM_STATUS.SAVED]),
  })

  public messages: CustomMessages = {
    'quantity.range': 'A quantidade deve ser entre 1 e 100',
  }
}
