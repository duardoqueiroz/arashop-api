import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Item from './Item'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address>

  @manyToMany(() => Item, {
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'item_id',
    pivotTable: 'saved_items',
  })
  public savedItems: ManyToMany<typeof Item>

  @manyToMany(() => Item, {
    pivotColumns: ['quantity', 'status'],
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'item_id',
    pivotTable: 'user_items',
    onQuery(query) {
      query.where('status', ITEM_STATUS.BOUGHT)
    },
  })
  public purchasedItems: ManyToMany<typeof Item>

  @manyToMany(() => Item, {
    pivotColumns: ['quantity', 'status'],
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'item_id',
    pivotTable: 'user_items',
    onQuery(query) {
      query.where('status', ITEM_STATUS.CART)
    },
  })
  public cartItems: ManyToMany<typeof Item>

  @hasMany(() => Item, {
    localKey: 'id',
  })
  public createdItems: HasMany<typeof Item>

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
