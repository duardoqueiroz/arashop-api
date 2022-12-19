import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({},[rules.required(), rules.minLength(3)]),
    price: schema.number([rules.required()]),
    description: schema.string.optional({},[rules.minLength(5)]),
  })

  public messages: CustomMessages = {}
}
