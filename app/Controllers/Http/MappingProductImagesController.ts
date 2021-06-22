import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import ProductImageMapping from 'App/Models/ProductImageMapping'

export default class MappingProductImagesController {
    public async index({ response, params }: HttpContextContract) {
        const result = await Database.from('product_image_mappings')
            .innerJoin('products', 'products.product_id', '=', 'product_image_mappings.product_id')
            .innerJoin('product_images', 'product_images.image_id', '=', 'product_image_mappings.image_id')
            .where('product_image_mappings.product_id', params.product_id)
        if (result.length > 0) {
            response.status(200).json(result)
        }else{
            response.json({
                message:'images are not found.....'
            })
        }
    }

    public async show({ response, params }: HttpContextContract) {
        const result = await Database.from('product_image_mappings')
            .innerJoin('products','products.product_id','=','product_image_mappings.product_id')
            .innerJoin('product_images','product_images.image_id','=','product_image_mappings.image_id')
            .where('product_image_mappings.product_id', params.product_id)
        if(result){
            response.status(200).json({
                result:result[0].image
            })
        }else{
            response.json({
                message:'image is not found.......'
            })
        }
    }

    public async store({request,response}:HttpContextContract){
        const product_id = request.input('product_id')
        const image_id = request.input('image_id')
        const res = await ProductImageMapping.create({product_id:product_id,image_id:image_id})
        return response.status(201).json({
            Message:'Product is insert....',
            res:res
        })
    }
}
