import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public userId:number

  @column()
  public price: number

  @column()
  public imageUrl: string

  @column()
  public description: string

  @manyToMany(() => User, {
    pivotTable: 'user_items',
    pivotForeignKey: 'item_id',
    pivotRelatedForeignKey: 'user_id',
    pivotColumns: ['quantity', 'status'],
  })
  public users: ManyToMany<typeof User>

  @belongsTo(()=>User, {
    foreignKey: "userId"
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
