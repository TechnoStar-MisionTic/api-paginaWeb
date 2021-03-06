//Import express tradicional
// const express = require('express')
//nueva forma de exportar aún en preview
import Express from "express";

import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD} from "./bd/bd.js";
import rutasProductos from "./views/productos/rutas.js";
import rutasVentas from "./views/ventas/rutas.js";

const app = Express();

const port =process.env.PORT || 3000;

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos)
app.use(rutasVentas)


const main = () => {
  return app.listen(port, () => {
    console.log(`Listen port ${port}`);
  });
};

conectarBD(main);
