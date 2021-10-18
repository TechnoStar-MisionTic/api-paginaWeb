//Import express tradicional
// const express = require('express')
//nueva forma de exportar aún en preview
import Express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Cors from "cors";

const stringConnection =
  "mongodb+srv://aninot:un3022077849@proyectoweb.gsl81.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(stringConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/registroProductos", (req, res) => {
  console.log("Someone use get on /registro");
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
  client.connect((err, db) => {
    if (err) {
      console.error("Error conenctando a la base de datos");
      return "error";
    }
    conexion = db.db("paginaWeb");
    console.log("Conexion exitosa");
    app.listen(5000, () => {
      console.log("listen port 5000");
    });
  });
};

main();
