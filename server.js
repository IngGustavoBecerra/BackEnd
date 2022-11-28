const express = require('express');
const app = express()
const port = 5000

require("./middleware")(app)

//Configuracion del servidor en Mongo
require('./bin/database')

app.get('/', (req, res) => {
    res.send({version:"1.0.0"})
})


require("./routes/index")(app)



app.listen(port, (req, res) => {
    console.log("Servidor Levantado")
})