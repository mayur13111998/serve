import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public customer_id : number

  @column()
  public Customer_name:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order)
  public order: HasMany<typeof Order>

}
