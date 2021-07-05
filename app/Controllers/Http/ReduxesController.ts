import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Orderitem from 'App/Models/OrderItem'

export default class ReduxesController {
    public async store ({request,response}:HttpContextContract){

        let data =  request.body('data')
        
        let order = await Order.create({
            total_amount:data.total,
            customer_id:data.customer_id
        })
        let order_no = order.order_no
        data.products.map((data)=> {
           let ordermain = Orderitem.create({
                order_no: order_no,
                product_id: data.product_id,
                quantity: data.quantity,
                price_per_item: data.product_price,
                amount:data.product_total_price
            })
        })

        return response.status(200).json({
            message : "Order is add suscces fully..."
        })
    
    }
}
