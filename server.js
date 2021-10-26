//Import express tradicional
// const express = require('express')
//nueva forma de exportar aún en preview
import Express from "express";

import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD, getDB } from "./bd/bd.js";

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/registroProductos", (req, res) => {
  console.log("Someone use get on /registro");
  const conexion=getDB()
  conexion
    .collection("producto")
    .find({})
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        console.log("Error consultando base de datos");
        res.sendStatus(500).send("Error consultando vehiculos");
      } else {
        res.json(result);
      }
    });
});

app.post("/registroProductos/nuevo", (req, res) => {
  const datosProducto = req.body;
  try {
    if (
      Object.keys(datosProducto).includes("nombreP") &&
      Object.keys(datosProducto).includes("idProd") &&
      Object.keys(datosProducto).includes("precioU") &&
      Object.keys(datosProducto).includes("cantidad")
    ) {
      //codigo para crear producto en la bd
      const conexion=getDB()
      conexion
        .collection("producto")
        .insertOne(datosProducto, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            console.log("Enviado a la bd");
            res.sendStatus(200);
          }
        });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch("/registroProductos/editar", (req, res) => {
  const edicion = req.body;
  const filtroProducto = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const conexion=getDB()
  conexion
    .collection("producto")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("Error actualizando", err);
          res.sendStatus(500);
        } else {
          console.log("actualizado con exito");
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/registroProductos/eliminar",(req,res) =>{
  const filtroProducto = { _id: new ObjectId(req.body.id) };
  const conexion=getDB()
  conexion.collection("producto").deleteOne(filtroProducto,(err,result)=>{
    if(err){
      console.error("Error borrando: ",err)
      res.sendStatus(500)
    } else {
      console.log("Eliminado con exito")
      res.sendStatus(200)
    }
  })
});

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Listen port ${process.env.PORT}`);
  });
};

conectarBD(main);
