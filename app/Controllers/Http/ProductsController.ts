import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Application from '@ioc:Adonis/Core/Application'
import ProductImage from 'App/Models/ProductImage'
import ProductImageMapping from 'App/Models/ProductImageMapping'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        try {
            const product = await Product.all()
            if (product.length > 0) {
                return response.status(200).json(product)
            } else {
                return response.status(201).json({
                    message: 'No product'
                })
            }
        } catch (err) {
            console
        }
    }
    public async store({ request, response }: HttpContextContract) {
        const p_name = request.input('product_name')
        const p_price = request.input('product_price')
        const prodctImage = request.files('product_image')
 
        const product = await Product.create({ product_name: p_name, product_price: p_price })
 
        if (prodctImage) {
 
            for (var i = 0; i < prodctImage.length; i++) {
                const image  = prodctImage[i]
        
                const product_image = new Date().getTime().toString() + `.${image?.extname}`
 
                await image.move(Application.publicPath('images'), {
                    name: product_image
                })
                const p_id = product.product_id
                const image2 = await ProductImage.create({ image: product_image })
                const image_id = image2.image_id
                await ProductImageMapping.create({ product_id: p_id, image_id: image_id })
            }
            return response.status(201).json({
                massage: 'New product is create',
                res: product
            })
        }


    public async show({ params, response }: HttpContextContract) {
        const id = params.id
        const product = await Product.find(id)
        if (product) {
            return response.json({
                product: product
            })
        } else {
            return response.json({
                message: 'This product is not available'
            })
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        const id = params.id
        const product = await Product.find(id)
        if (product) {
            product.delete()
            return response.json({
                message: 'product is deleted'
            })
        } else {
            return response.json({
                message: 'product is not find'
            })
        }
    }

    public async edit({ request, response, params }: HttpContextContract) {
        const id = params.id
        const product = await Product.find(id)
        if (product) {
            const productImage = request.file('product_image')

            const product_image = new Date().getTime().toString() + `.${productImage?.extname}`
            if (productImage) {
                await productImage?.move(Application.publicPath('images'), {
                    name: product_image
                })

            }

            product.product_image = product_image
            product.product_name = request.input('product_name')
            product.product_price = request.input('product_price')
            product.save()
            return response.json({
                message: 'product is update',
                product: product
            })
        } else {
            return response.json({
                massage: 'product is not find'
            })
        }
    }
    public async edit2({ request, response, params }: HttpContextContract) {
        const id = params.id
        const product = await Product.find(id)
        if (product) {
            product.product_name = request.input('product_name')
            product.product_price = request.input('product_price')
            product.save()
            return response.json({
                message: 'product is update',
                product: product
            })
        } else {
            return response.json({
                massage: 'product is not find'
            })
        }
    }

}
