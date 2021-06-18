import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})



Route.group(() => {
  Route.get('/customer', 'CustomersController.index')
  Route.post('/customer', 'CustomersController.store')
  Route.get('/customer/:id', 'CustomersController.show')
  Route.delete('/customer/:id', 'CustomersController.destroy')
  Route.patch('/customer/:id/edit', 'CustomersController.edit')

  Route.group(() => {
    Route.get('/', 'ProductsController.index')
    Route.get('/:id', 'ProductsController.show')
    Route.post('/', 'ProductsController.store')
    Route.delete('/:id', 'ProductsController.destroy')
    Route.patch('/:id/edit', 'ProductsController.edit')
    
    Route.patch('/:id/edit2', 'ProductsController.edit2')
  }).prefix('product')

  Route.group(() => {
    Route.get('/', 'OrdersController.index')
    Route.get('/:no', 'OrdersController.show')
    Route.post('/', 'OrdersController.store')
    Route.delete('/:no', 'OrdersController.destroy')
    Route.patch('/:no/edit/:total_amount', 'OrdersController.edit')

    

    Route.get('/:no/orderitems','OrderItemsController.index')

    Route.post('/:no/:product_no/orderitems','OrderItemsController.store')

    Route.post('/addorderitems','OrderItemsController.store2')
    Route.delete('/:no/orderitems','OrderItemsController.destroy')

  }).prefix('order')


}).prefix('api')



Route.get('/orders','OrdersController.JionOrders')
Route.get('/orders/orderitems/:order_no','OrdersController.JionOrdersOrderItems')

Route.post('/posts', async ({ request }) => {
  const coverImage = request.file('fb')
console.log(coverImage)
  const imageName = new Date().getTime().toString() + `.${coverImage?.extname}`

  if (coverImage) {
    await coverImage.move(Application.publicPath('images'),{
      name: imageName
    })
    return coverImage
  }else{
    return 'mayur'
  }
})
Route.get('/file/:file',async({response, params})=>{
    return response.download(Application.publicPath(`images/${params.file}`))
})


Route.resource('/mayur', 'mayurContorller')
