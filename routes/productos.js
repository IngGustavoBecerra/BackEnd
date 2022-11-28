const proController = require('../bin/controller/Producto.controller')


module.exports = (app) => {

    app.get('/productos', proController.finALL)

    //Usuario autenticado
    //app.get('/users', validateAuthor, usersController.finALL)

    app.get('/productos/:idProducto', proController.finOne)

    app.post('/productos', proController.create)

    app.put("/productos/:productoId", proController.update)

    app.delete("/productos/:productoId", proController.delete)


}