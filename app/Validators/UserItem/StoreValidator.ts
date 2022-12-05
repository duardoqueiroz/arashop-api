import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    item_id: schema.number([rules.exists({ table: 'items', column: 'id' }), rules.required()]),
    quantity: schema.number([rules.range(1, 100), rules.required()]),
  })

  public messages: CustomMessages = {
    'item_id.exists': 'Item não encontrado',
    'item.required': 'Item é obrigatório',
    'quantity.range': 'Quantidade deve ser entre 1 e 100',
    'quantity.required': 'Quantidade é obrigatório',
  }
}
