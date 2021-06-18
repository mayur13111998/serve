import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orderitems extends BaseSchema {
  protected tableName = 'orderitems'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_item_no').primary()
      table.integer('order_no').unsigned().notNullable().references('order_no').inTable('orders').onDelete('cascade')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('products').onDelete('cascade')
      table.integer('quantity').notNullable()
      table.integer('price_per_item').notNullable()
      table.decimal('amount').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
