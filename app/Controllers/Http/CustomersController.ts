import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer'

import Hash from '@ioc:Adonis/Core/Hash'

export default class CustomersController {
    public async index({ response }: HttpContextContract) {
        const customer = await Customer.all()
        if (customer.length > 0) {
            return response.status(200).json({
                customer: customer
            })
        } else {
            return response.status(201).json({
                message: 'No customer'
            })
        }
    }
    public async store({request,response}:HttpContextContract){

        // const customer = new Customer();
        // customer.Customer_name=request.input("Customer_name")
        // await customer.save()
        // return response.json(customer)

        const customer_name = request.input('customer_name')
        const password = request.input('password')
        const customer_email =  request.input('customer_email')
        const createBy = "admin"
        const updateBy = "admin"
        const IsActive = true
        const IsDeleted = false
        const customber = await Customer.create({customer_name,customer_email, password,createBy, updateBy,IsActive, IsDeleted})
        
        return response.status(201).json({
            massage: 'New Customber is create'
        })
    }

    public async show({params,response}:HttpContextContract){
        const id = params.id
        const customer = await Customer.find(id)
        if (customer){
            return response.json({
                customer:customer
            })
        }else{
            return response.json({
                message:'This customer is not available'
            })
        }
    }

    public async destroy({params,response}:HttpContextContract){
        const id = params.id
        const customer = await Customer.find(id)
        if(customer)
        {
            customer.delete()
            return response.json({
                message: 'Customer is deleted'
            })
        }else{
            return response.json({
                message:'Customer is not find'
            })
        }
    }

    public async edit({request,response,params}:HttpContextContract){
        const id = params.id
        const customer = await Customer.find(id)
        if (customer){
            customer.customer_name = request.input('customer_name')
            customer.save()
            return response.json({
                message:'customber is update',
                customber:customer
            })
        }else{
            return response.json({
                massage:'Customber is not find'
            })
        }
    }

    public async login({auth,request,response}:HttpContextContract){
        const customer_email = request.input('customer_email')
        const password = request.input('password')

        const customer = await auth.use('api').attempt(customer_email,password)

                return response.status(200).json({
                    isLoggin: true,
                    message : "login successfully",
                    token: customer
                })
    }

}
