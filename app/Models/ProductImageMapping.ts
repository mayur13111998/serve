import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import ProductImage from './ProductImage'
import Product from './Product'

export default class ProductImageMapping extends BaseModel {
  @column({ isPrimary: true })
  public product_image_id : number

  @column()
  public image_id :number

  @belongsTo(()=> ProductImage)
  public productimage: BelongsTo<typeof ProductImage>

  @column()
  public product_id :number

  @belongsTo(()=>Product)
  public product:BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
