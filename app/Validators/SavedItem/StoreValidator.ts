import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    item_id: schema.number([rules.exists({ table: 'items', column: 'id' }), rules.required()]),
  })

  public messages: CustomMessages = {}
}
