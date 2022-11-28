module.exports = (app) => {
    //IMPORT ROUTE
    const users = require("./users")(app)
    const productos = require("./productos")(app)
}