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
      imageUrl:
        'https://s2.glbimg.com/XyUa9fSiGGOOz269tQqVJhs7rL4=/0x0:550x638/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_f035dd6fd91c438fa04ab718d608bbaa/internal_photos/bs/2022/F/O/pQRBBKStecsmgbgEh0dA/capa-album-copa.jpg',
      price: 100,
      userId: 1,
    })
    await Item.create({
      name: 'Camisa da copa',
      description: 'N possui nome do mininu ney nas costas :(',
      imageUrl:
        'https://a-static.mlcdn.com.br/800x560/camisa-brasil-oficial-amarelo-selecao-brasileiras-original-cbf/vidapeshop/aj5026g/48dc8e33ec5c3aef1f7502fc835824b5.jpeg',
      price: 100,
      userId: 1,
    })
    await Item.create({
      name: 'Figurinha da copa',
      description: 'É a do mininu ney :)',
      imageUrl:
        'https://classic.exame.com/wp-content/uploads/2022/08/neymar_-_figurinha.jpg?quality=70&strip=info&w=1024',
      price: 100,
      userId: 1,
    })
  }
}
