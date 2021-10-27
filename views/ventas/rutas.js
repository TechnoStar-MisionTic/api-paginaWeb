import Express from "express";
import {
  crearVentas,
  editarVentas,
  eliminarVentas,
  queryAllVentas,
} from "../../controllers/ventas/controller.js";

const rutasVentas = Express.Router();

const genericCallback = (res) => (err, result) => {
  if (err) {
    console.log("Error consultando base de datos");
    res.sendStatus(500).send("Error consultando Ventas");
  } else {
    res.json(result);
  }
};

rutasVentas.route("/registroVentas").get((req, res) => {
  queryAllVentas(genericCallback(res));
});

rutasVentas.route("/registroVentas").post((req, res) => {
  const datosVentas = req.body;
  crearVentas(datosVentas, genericCallback(res));
});

rutasVentas.route("/registroVentas/:id").patch((req, res) => {
  const id = req.params.id;
  const edicion = req.body;
  editarVentas(id, edicion, genericCallback(res));
});

rutasVentas.route("/registroVentas/eliminar").delete((req, res) => {
  const venta = req.body;
  eliminarVentas(venta, genericCallback(res));
});

export default rutasVentas;
