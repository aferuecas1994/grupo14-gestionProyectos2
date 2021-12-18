import { ProjectModel } from '../proyecto/proyecto.js';
import { ModeloAvance } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      let filter = {};
      if (args.project) {
        filter = { ...args };
      }
      const avances = await ModeloAvance.find(filter).populate('proyecto').populate('creadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = await ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });

      const avances = await ModeloAvance.find({ proyecto: avanceCreado.proyecto });

      if (avances.length === 1) {
        const proyectoModificado = await ProjectModel.findOneAndUpdate(
          { _id: avanceCreado.proyecto },
          {
            fase: 'DESARROLLO',
          }
        );
        console.log('proy modificado', proyectoModificado);
      }

      return avanceCreado;
    },
<<<<<<< HEAD



  //},
  modificarAvance: async (parents,args) => {//HU_023
    const avanceModificado = ModeloAvance.findByIdAndUpdate({
     // args._id, {...args.campos}, {new: true}
     proyecto: args.proyecto
    // args._id, {...args.campos}, {new: true}
  
    });
  
    return avanceActualizado;
=======
>>>>>>> d397190907b2951b130bce12a438a64c9fe85ef3
  },
};

export { resolversAvance };





// import { ModeloAvance } from './avance.js';

// const resolversAvance = {
//   Query: {
//     Avances: async (parent, args) => {
//       let filter = {};
//       if (args.project) {
//         filter = { ...args };
//       }
//       const avances = await ModeloAvance.find(filter).populate('proyecto').populate('creadoPor');
//       return avances;
//     },
//     filtrarAvance: async (parents, args) => {
//       const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
//         .populate('proyecto')
//         .populate('creadoPor');
//       return avanceFiltrado;
//     },
//     // Avances: async (parent, args) => {
//     //   const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      
//     //   return avances;
//     // },


//     // filtrarAvance: async (parents, args) => {
//     //   const avanceFiltrado = await ModeloAvance.find({ proyecto: args.idProyecto })
//     //     .populate('proyecto')
//     //     .populate('creadoPor');
        


//     //   return avanceFiltrado;
//     // },

//     avancesEstudiantes: async (parent, args) => { //HU_021
//       const avancesEstudiantes = await ModeloAvance.find({creadoPor: args.creadoPor })
//       .populate('proyecto');
//       // if (args.rol==="ESTUDIANTE") {   
//          return avancesEstudiantes;   
//       // }
//       // else {
//       //   return null;
//       // }

//     },
//   },




//   Mutation: {
//     crearAvance: async (parents, args) => { //HU_022
//       const avanceCreado = ModeloAvance.create({
//         fecha: args.fecha,
//         descripcion: args.descripcion,
//         proyecto: args.proyecto,
//         creadoPor: args.creadoPor,
//       });
     
//         return avanceCreado;   
      
//       return avanceCreado;
//     },


//   //},
//   modificarAvance: async (parents,args) => {//HU_023
//     const avanceModificado = ModeloAvance.findByIdAndUpdate({
//      // args._id, {...args.campos}, {new: true}
//      proyecto: args.proyecto
//     // args._id, {...args.campos}, {new: true}
  
//     });
  
//     return avanceActualizado;
//   },
// actualizarAvance: async (parent, args) => {//HU_018
//         const avanceActualizado = await ModeloAvance.findByIdAndUpdate(
//             args._id,
//             { ...args.campos },
//             { new: true }
//         );
  
//         return avanceActualizado;
//       },
//     }
// };

// export { resolversAvance };









