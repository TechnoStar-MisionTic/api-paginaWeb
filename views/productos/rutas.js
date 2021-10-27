import Express from "express";
import {
  crearProducto,
  editarProducto,
  eliminarProductos,
  queryAllProducts,
} from "../../controllers/productos/controller.js";

const rutasProductos = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    console.log("Error consultando base de datos");
    return res.sendStatus(500).send("Error consultando vehiculos");
  } else {
    return res.json(result);
  }
};

rutasProductos.route("/registroProductos").get((req, res) => {
  queryAllProducts(genericCallback(res));
});

rutasProductos.route("/registroProductos").post((req, res) => {
  const datosProducto = req.body;
  crearProducto(datosProducto, genericCallback(res));
});

rutasProductos.route("/registroProductos/:id").patch((req, res) => {
  const id = req.params.id;
  const edicion = req.body;
  editarProducto(id, edicion, genericCallback(res));
});

rutasProductos.route("/registroProductos/eliminar").delete((req, res) => {
  const producto = req.body;
  eliminarProductos(producto, genericCallback(res));
});

export default rutasProductos;
