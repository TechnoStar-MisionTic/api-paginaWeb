import { getDB } from "../../bd/bd.js";

const queryAllProducts = async (callback) => {
  const conexion = getDB();
  await conexion.collection("producto").find({}).limit(50).toArray(callback);
};

const crearProducto = async(datosProducto,callback)=>{
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
          .insertOne(datosProducto, callback);
      } else {
        return "error"
      }
}
export {queryAllProducts, crearProducto}