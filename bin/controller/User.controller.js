const { response } = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require('fs')
const path = require('path')


exports.create = (req, res) => {
    if(!req.body){
        res.status(404).send({
            Message:"EL CONTENIDO NO DEBE SER VACIO"
        })
    }

    let { name, password, email, roll} = req.body
    let user = new User({
        name, 
        password, 
        email, 
        roll
    })

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            user.password = hash

            user
            .save()
            .then((data) =>{
                res.send(data)
            })
            .catch((err)=>{
                    res.status(500).send({
                    messages: err.message || "Ocurrio un error mientras se creaba el usuario",
                })
            })
        })
    })

}

exports.finALL = (req,res) => {
    User.find({},(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Se presento un error en la busqueda"
            })
        }
        else res.send(data)
    })
}

exports.finOne = (req, res) => {
    User.findById(req.params.idUser, (err,data)=>{
        if(err){

            if(err.kind==="not_found"){
                res.status(404).send({
                    message: "No se encuentra USER"
                })
            }
            else {
                res.status(500).send({
                    message: "Error al tratar de obtener USER"
                })
            }
        }
        else {
            res.send(data)
        }
    })
}

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
    }
    
    let { name, password } = req.body;
    
    // Find user by username
    User
    .findOne({ name })
    .then((user) => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ usernamenotfound: "Username not found" });
        }
    
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
          // User matched
          if (isMatch) {
            // Create JWT Payload
            fs.readFile(
              path.join(__dirname, "../keys/private.key"),
              "utf8",
              (err, privateKey) => {
                if (err) {
                    throw err;
                }

                let payload = {
                  id: user._id,
                  name: user.name,
                  rol: user.roll,
                };
    
                // Sign token
                jwt.sign(
                  payload,
                  privateKey,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                        algorithm: "RS256",
                    },
                    (err, token) => {
                       if (err) {
                            throw err
                        }

                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
    });

}

exports.logout = (req, res) => {
    res.status(200).send({
      message: "Logout",
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    User.updateOne({ _id: req.params.userId }, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId,
          });
        }
      } else res.send(data);
    });
};

exports.delete = (req, res) => {
    User.deleteOne({ _id: req.params.userId }, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.userId,
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
};