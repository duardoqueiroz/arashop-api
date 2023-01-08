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
Route.resource('users.items', 'CartItemsController')
  .apiOnly()
  .middleware({
    '*': ['auth'],
  })
Route.get('/users/:id/saved-items', 'SavedItemsController.index').middleware('auth')
Route.get('/users/:id/saved-items/:item_id', 'SavedItemsController.show').middleware('auth')
Route.post('/users/:id/saved-items', 'SavedItemsController.store').middleware('auth')
Route.delete('/users/:id/saved-items/:item_id', 'SavedItemsController.destroy').middleware('auth')
Route.post('/users/:id/bought-items', 'BoughtItemsController.store').middleware('auth')
