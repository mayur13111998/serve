import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Customers extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('customer_id').primary()
      table.string('customer_name').notNullable()
      table.string('customer_email').notNullable()
      table.string('password').notNullable()
      table.string('creat_by').notNullable()
      table.string('update_by').notNullable()
      table.boolean('is_active').notNullable()
      table.boolean('is_deleted').notNullable()
      table.timestamps(true ,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
