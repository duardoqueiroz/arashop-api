import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Item from 'App/Models/Item'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      id: 1,
      email: 'eduardoldq1@gmail.com',
      name: 'Eduardo Lúcio',
      password: '123456',
      phone: '11999999999',
    })
    await Item.create({
      name: 'Albu da copa',
      description: 'N possui o mininu ney :(',
      price: 100,
      userId: 1,
    })
    await Item.create({
      name: 'Camisa da copa',
      description: 'N possui nome do mininu ney nas costas :(',
      price: 100,
      userId: 1,
    })
    await Item.create({
      name: 'Figurinha da copa',
      description: 'É a do mininu ney :)',
      price: 100,
      userId: 1,
    })
  }
}
