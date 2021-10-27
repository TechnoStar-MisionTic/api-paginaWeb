import { getDB } from "../../bd/bd.js";
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) => {
  const conexion = getDB();
  await conexion.collection("producto").find({}).limit(50).toArray(callback);
};

const crearProducto = async (datosProducto, callback) => {
  if (
    Object.keys(datosProducto).includes("nombreP") &&
    Object.keys(datosProducto).includes("idProd") &&
    Object.keys(datosProducto).includes("precioU") &&
    Object.keys(datosProducto).includes("cantidad")
  ) {
    //codigo para crear producto en la bd
    const conexion = getDB();
    await conexion.collection("producto").insertOne(datosProducto, callback);
  } else {
    return "error";
  }
};

const editarProducto = async (id, edicion, callback) => {
  const filtroProducto = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const conexion = getDB();
  await conexion
    .collection("producto")
    .findOneAndUpdate(
      filtroProducto,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarProductos = async (producto,callback) =>{
    const filtroProducto = { _id: new ObjectId(producto.id) };
    const conexion=getDB()
    await conexion.collection("producto").deleteOne(filtroProducto,callback)
}

export { queryAllProducts, crearProducto, editarProducto, eliminarProductos };
