import mongoose from 'mongoose';

const conectarBD = async () => {
  return await mongoose
  
    // .connect("mongodb+srv://admin:AdminGrupo14@proyectogrupo14.m93zt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .connect("mongodb://admin:AdminGrupo14@proyectogrupo14-shard-00-00.m93zt.mongodb.net:27017,proyectogrupo14-shard-00-01.m93zt.mongodb.net:27017,proyectogrupo14-shard-00-02.m93zt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8nb0fr-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => {
      console.log('Conexion exitosa');
    })
    .catch((e) => {
      console.error('Error conectando a la bd', e);
    });
};

export default conectarBD;


// NOMBRE CLUSTER ProyectoGrupo14
// Usuario Admin
// Password AdminGrupo14



// const url = "mongodb://mintic:MinticEquipo14@gestionproyectosmisiont-shard-00-00.b7eel.mongodb.net:27017,gestionproyectosmisiont-shard-00-01.b7eel.mongodb.net:27017,gestionproyectosmisiont-shard-00-02.b7eel.mongodb.net:27017/GestionProyectos?ssl=true&replicaSet=atlas-be29yz-shard-0&authSource=admin&retryWrites=true&w=majority";

