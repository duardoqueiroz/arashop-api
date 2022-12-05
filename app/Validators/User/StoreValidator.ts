import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required(), rules.minLength(3)]),
    email: schema.string({}, [rules.required(), rules.email()]),
    password: schema.string({}, [rules.minLength(6), rules.confirmed('password_confirmation')]),
    phone: schema.string.optional({}, [
      rules.unique({ table: 'users', column: 'phone' }),
      rules.mobile({ locale: ['pt-BR'] }),
    ]),
    addresses: schema.array.optional().members(
      schema.object().members({
        street: schema.string({}, [rules.required()]),
        houseNumber: schema.number([rules.required()]),
        zipCode: schema.string({}, [rules.required()]),
        district: schema.string({}, [rules.required()]),
      })
    ),
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.minLength': 'O campo nome deve ter no mínimo 3 caracteres',
    'email.required': 'O campo email é obrigatório',
    'email.email': 'O campo email deve ser um email válido',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
    'password.confirmed': 'O campo senha deve ser igual ao campo confirmação de senha',
    'phone.mobile': 'O campo telefone deve ser um número de celular válido',
    'phone.unique': 'O campo telefone deve ser único',
    'addresses.*.street.required': 'O campo rua é obrigatório',
    'addresses.*.houseNumber.required': 'O campo número é obrigatório',
    'addresses.*.zipCode.required': 'O campo cep é obrigatório',
    'addresses.*.district.required': 'O campo bairro é obrigatório',
  }
}
