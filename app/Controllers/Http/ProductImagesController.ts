import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductImage from 'App/Models/ProductImage'
import Application from '@ioc:Adonis/Core/Application'


export default class ProductImagesController {
    public async store ({request,response}:HttpContextContract){
        const images = request.files('product_images')
        console.log(images)
        const image_id = []
        for(let i=0 ; i< images.length ; i++){
            const image = images[i]
            const image_name = new Date().getTime().toString() +`.${image.extname}`
            await image.move(Application.publicPath('images'),{
                name:image_name
            })
            const res= await ProductImage.create({image:image_name})
            const a={
                image_id:res.image_id
            }
            image_id.push(a)
        }
        return response.json(image_id)
    }
}
