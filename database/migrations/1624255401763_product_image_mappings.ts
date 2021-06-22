import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductImageMappings extends BaseSchema {
  protected tableName = 'product_image_mappings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('product_image_id')
      table.integer('image_id').unsigned().notNullable().references('image_id').inTable('product_images').onDelete('cascade')
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('products').onDelete('cascade')
      table.timestamps(true,true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
