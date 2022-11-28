const usersController = require('../bin/controller/User.controller')
const validateAuthor = require('../middleware/auth')

module.exports = (app) => {

    app.get('/users', usersController.finALL)

    //Usuario autenticado
    //app.get('/users', validateAuthor, usersController.finALL)

    app.get('/users/:idUser', usersController.finOne)

    app.post('/users', usersController.create)

    app.post('/login', usersController.login)

    app.post("/logout", usersController.logout)

    app.put("/users/:userId", usersController.update)

    app.delete("/users/:userId", usersController.delete)


}