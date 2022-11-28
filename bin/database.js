const mongoose = require('mongoose');
try{
    mongoose.connect("mongodb+srv://root:12345KLHSgabs@cluster0.1scbtnp.mongodb.net/TiendadB?retryWrites=true&w=majority")

    {
        useNewUrlParser: true
    }

    console.log("DB CONNECT")

} catch (err){
    console.log(err)
}

