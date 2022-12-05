import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ITEM_STATUS } from 'Contracts/enums/ITEM_STATUS'

export default class extends BaseSchema {
  protected tableName = 'user_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE')
      table.integer('quantity').notNullable()
      table.enum('status', [ITEM_STATUS.BOUGHT, ITEM_STATUS.SAVED]).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
