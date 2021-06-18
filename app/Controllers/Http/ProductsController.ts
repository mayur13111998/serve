import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {
    public async index({ response }: HttpContextContract) {
        const product = await Product.all()
        if (product.length > 0) {
            return response.status(200).json(product)
        } else {
            return response.status(201).json({
                message: 'No product'
            })
        }
    }
    public async store({ request, response }: HttpContextContract) {
        const p_name = request.input('product_name')
        const p_price = request.input('product_price')
        const prodctImage = request.file('product_image')

        if (prodctImage) {


            const product_image = new Date().getTime().toString() + `.${prodctImage?.extname}`
            
            await prodctImage.move(Application.publicPath('images'),{
                name: product_image
              })
            
            const product = await Product.create({ product_name: p_name, product_price: p_price, product_image:product_image })
            return response.status(201).json({
                massage: 'New product is create'
            })
        }

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
