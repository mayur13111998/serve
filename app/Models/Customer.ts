import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public customer_id : number

  @column()
  public customer_name: string

  @column()
  public customer_email : string

  @column()
  public password: string

  @column()
  public createBy : string 

  @column()
  public updateBy : string

  @column()
  public IsActive : boolean

  @column()
  public IsDeleted : boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @beforeSave()
  public static async hashPassword(customer: Customer) {
    if (customer.$dirty.password) {
      customer.password = await Hash.make(customer.password)
    }
  }
}
