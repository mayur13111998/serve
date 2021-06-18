import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'
import Orderitem from 'App/Models/Orderitem'
import Product from 'App/Models/Product'

export default class OrderItemsController {

    public async index({ params, response }: HttpContextContract) {
        const no = params.no
        const order = await Order.find(no)
        if (order) {
            const oderitems = await Orderitem.query().where('order_no', no).orWhereNull('order_no')
            if (oderitems.length > 0) {
                return response.json(oderitems)
            } else {
                await order.delete()
                return response.json({
                    massage: 'This order is has been cancel'
                })
            }
        } else {
            return response.json({
                message: 'This order is has been cancel'
            })
        }
    }


    public async store({ request, response, params }: HttpContextContract) {

        const no = params.no

        const quantity = request.input('quantity')
        const price_per_item = request.input('price_per_item')
        const amount = quantity * price_per_item
        const total_amount = request.input('total_amount')
        const customer_id = request.input('customer_id')
        const order_date = request.input('order_date')
        const product_no = params.product_no
        const order = Order.find(no)
        if (order) {
            const product = await Product.find(product_no)
            if (product) {
                const orderitems = await Orderitem.create({
                    order_no: no,
                    product_id: product_no,
                    quantity: quantity,
                    price_per_item: price_per_item,
                    amount: amount
                })
                return response.json({
                    message: 'Your Order have Been the send',
                    orderitems: orderitems
                })
            } else {
                return response.json({
                    message: 'This Product has been deleted '
                })
            }
        } else {
            const order2 = await Order.create({
                customer_id: customer_id,
                total_amount: total_amount,
                order_date: order_date
            })
        }

    }

    public async store2({response ,request}: HttpContextContract) {
        
        const data =  request.all()

        const orderitem = new Orderitem()
        orderitem.order_no = data.order_no
        orderitem.product_id = data.product_id
        orderitem.quantity=data.quantity
        orderitem.price_per_item = data.price_per_item
        orderitem.amount = data.amount
        orderitem.save()

        return response.status(200).json({
            message:'order insert'
        })
    }

    public async show({ params, response }: HttpContextContract) {
        const no = params.no
        const order = await Order.find(no)
        if (order) {
            const Orderitem = await Database.from('orderitems').where('order_no', no)
            if (Orderitem.length > 0) {
                return response.status(200).json(Orderitem)
            } else {
                return response.status(201).json({
                    massage: 'there are no order'
                })
            }
        } else {
            return response.json({
                massage: `this order no = ${no} is cancel`
            })
        }
    }
    public async destroy({params, response}:HttpContextContract){
        const no = params.no
        const order = await Database.from('orderitems').where('order_no', no).delete()
        if(order){
            response.status(205).json({
                status: true,
                message:'Order Items is delete'
            })
        }else{
            response.status(204).json({
                status: false,
                message: 'Order Is not available'
            })          
        }
        
    }

}

