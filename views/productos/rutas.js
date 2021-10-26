import Express from "express"
import {getDB } from "../../bd/bd.js";
import { crearProducto, editarProducto, queryAllProducts } from "../../controllers/productos/controller.js";

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
    queryAllProducts(genericCallback(res))
});
  
rutasProductos.route("/registroProductos/nuevo").post((req, res) => {
    const datosProducto = req.body;
    crearProducto(datosProducto,genericCallback(res))
});
  
rutasProductos.route("/registroProductos/editar").patch((req, res) => {
    const edicion = req.body;
    editarProducto(edicion,genericCallback(res))
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