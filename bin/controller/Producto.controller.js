const { response } = require("express")
const Producto = require("../models/Producto")
const fs = require('fs')
const path = require('path')


exports.create = (req, res) => {
    if(!req.body){
        res.status(404).send({
            Message:"EL CONTENIDO NO DEBE SER VACIO"
        })
    }

    let { nameProduct, cantidad, precio, imagen} = req.body
    let producto = new Producto({
        nameProduct,
        cantidad,
        precio,
        imagen
    })

    producto
    .save()
    .then((data) =>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            messages: err.message || "Ocurrio un error mientras se creaba el usuario",
        })
    })

}

exports.finALL = (req,res) => {
    Producto.find({},(err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Se presento un error en la busqueda"
            })
        }
        else res.send(data)
    })
}

exports.finOne = (req, res) => {
    Producto.findById(req.params.idProducto, (err,data)=>{
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

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
  
    Producto.updateOne({ _id: req.params.productoId }, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.productoId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.productoId,
          });
        }
      } else res.send(data);
    });
};

exports.delete = (req, res) => {
    Producto.deleteOne({ _id: req.params.productoId }, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.productoId}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.productoId,
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
};