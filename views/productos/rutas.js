import Express from "express"
import { crearProducto, editarProducto, eliminarProductos, queryAllProducts } from "../../controllers/productos/controller.js";

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
    const producto=req.body;
    eliminarProductos(producto,genericCallback(res));
});

export default rutasProductos;