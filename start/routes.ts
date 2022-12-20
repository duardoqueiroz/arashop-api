import Route from '@ioc:Adonis/Core/Route'
import './routes/google'

Route.post('/login', 'AuthController.store')
Route.post('/logout', 'AuthController.destroy')
Route.resource('/users', 'UsersController')
  .apiOnly()
  .middleware({
    index: ['auth'],
    show: ['auth'],
    update: ['auth'],
  })
Route.resource('items', 'ItemsController')
  .apiOnly()
  .middleware({
    destroy: ['auth'],
    update: ['auth'],
    store: ['auth'],
  })
Route.resource('users.items', 'UsersItemsController')
  .apiOnly()
  .middleware({
    '*': ['auth'],
  })
