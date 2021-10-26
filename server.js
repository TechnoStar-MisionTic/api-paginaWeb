//Import express tradicional
// const express = require('express')
//nueva forma de exportar aún en preview
import Express from "express";

import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD} from "./bd/bd.js";
import rutasProductos from "./views/productos/rutas.js";

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasProductos)


const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Listen port ${process.env.PORT}`);
  });
};

conectarBD(main);
