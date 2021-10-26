import Express from "express"
import {getDB } from "../../bd/bd.js";
import { crearProducto, queryAllProducts } from "../../controllers/productos/controller.js";

const rutasProductos=Express.Router();

const genericCallback=(res)=>(err,result)=>{
    if (err) {
        console.log("Error consultando base de datos");
        res.sendStatus(500).send("Error consultando vehiculos");
    } else {
        res.json(result);
    }
}

rutasProductos.route("/registroProductos").get((req, res) => {
    console.log("Someone use get on /registro");
    queryAllProducts(genericCallback(res))
});
  
rutasProductos.route("/registroProductos/nuevo").post((req, res) => {
    const datosProducto = req.body;
    crearProducto(req.body,genericCallback(res))
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
  
rutasProductos.route("/registroProductos/editar").patch((req, res) => {
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
  
rutasProductos.route("/registroProductos/eliminar").delete((req,res) =>{
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

export default rutasProductos;