import { getDB } from "../../bd/bd.js";
import { ObjectId } from "mongodb";

const queryAllVentas = async (callback) => {
  const conexion = getDB();
  await conexion.collection("ventas").find({}).limit(50).toArray(callback);
};

const crearVentas = async (datosVentas, callback) => {
  if (
    Object.keys(datosVentas).includes("nombreP") &&
    Object.keys(datosVentas).includes("idVenta") &&
    Object.keys(datosVentas).includes("idProd") &&
    Object.keys(datosVentas).includes("precioU") &&
    Object.keys(datosVentas).includes("cantidad") &&
    Object.keys(datosVentas).includes("valorF")
  ) {
    //codigo para crear Ventas en la bd
    const conexion = getDB();
    await conexion.collection("ventas").insertOne(datosVentas, callback);
  } else {
    return "error";
  }
};

const editarVentas = async (id, edicion, callback) => {
  const filtroVentas = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const conexion = getDB();
  await conexion
    .collection("ventas")
    .findOneAndUpdate(
      filtroVentas,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarVentas = async (ventas,callback) =>{
    const filtroVentas = { _id: new ObjectId(ventas.id) };
    const conexion=getDB()
    await conexion.collection("ventas").deleteOne(filtroVentas,callback)
}

export { queryAllVentas, crearVentas, editarVentas, eliminarVentas };
