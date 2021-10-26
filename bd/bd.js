import { MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})

const stringConnection=process.env.DATABASE_URL
const client = new MongoClient(stringConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let conexion;

const conectarBD = (callback) => {
    client.connect((err, db) => {
      if (err) {
        console.error("Error conenctando a la base de datos");
        return "error";
      }
      conexion = db.db("paginaWeb");
      console.log("Conexion exitosa");
      return callback();
    });
};

const getDB=()=>{
    return conexion;
}
export {conectarBD, getDB}