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
  }
}
