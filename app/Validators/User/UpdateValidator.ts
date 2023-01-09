import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.minLength(3)]),
    email: schema.string.optional({}, [rules.email()]),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.confirmed('password_confirmation'),
    ]),
    phone: schema.string.optional({}, [
      rules.unique({ table: 'users', column: 'phone' }),
      rules.mobile({ locale: ['pt-BR'] }),
    ]),
    addresses: schema.array.optional().members(
      schema.object().members({
        street: schema.string.optional({}, []),
        houseNumber: schema.string.optional({}, []),
        zipCode: schema.string.optional({}, []),
        district: schema.string.optional({}, []),
      })
    ),
  })

  public messages: CustomMessages = {
    'name.minLength': 'O campo nome deve ter no mínimo 3 caracteres',
    'email.email': 'O campo email deve ser um email válido',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
    'password.confirmed': 'O campo senha deve ser igual ao campo confirmação de senha',
    'phone.mobile': 'O campo telefone deve ser um número de celular válido',
    'phone.unique': 'O campo telefone deve ser único',
  }
}
