import { InscriptionModel } from '../inscripcion/inscripcion.js';
import { UserModel } from '../usuario/usuario.js';
import { ProjectModel } from './proyecto.js';


const resolversProyecto = { 
  Proyecto: {
    lider: async (parent, args, context) => {
      const usr = await UserModel.findOne({
        _id: parent.lider.toString(),
      });
      return usr;
    },
    inscripciones: async (parent, args, context) => {
      const inscripciones = await InscriptionModel.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
  },
  Query: {
    Proyectos: async (parent, args, context) => {//HU_06-HU_019
      if (context.userData){
        if(context.userData.rol === 'LIDER'){
          const proyectos = await ProjectModel.find({lider: context.userData._id});
          return proyectos
        }else if(context.userData.rol === 'LIDER'){
          
        }
      }
      const proyectos = await ProjectModel.find ();
      return proyectos;
    },
/*     Proyecto: async (parent, args) => { 
      const proyecto = await ProjectModel.findById({ _id: args._id });
      return proyecto ;   
    },
    ProyectosLider: async (parent, args, context) => { //HU_013: 
      const proyectosLider = await ProjectModel.find({ lider: args._id })
      .populate('lider'); 
      return proyectosLider ;   
    } */
  },

  // Proyectos: async (parent, args, context) => {
  //   if (context.userData) {
  //     if (context.userData.rol === 'LIDER') {
  //       const proyectos = await ProjectModel.find({ lider: context.userData._id });
  //       return proyectos;
  //     } else if (context.userData.rol === 'LIDER') {
        // LINEA COMENTADA POR DANIEL const proyectos = await ProjectModel.find({ lider: context.userData._id });
        // LINEA COMENTADA POR DANIEL return proyectos;
//       }
//     }
//     const proyectos = await ProjectModel.find();
//     return proyectos;
//   },
// },

  Mutation: { //HU_012
    crearProyecto: async (parent, args, context) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => { //HU_007-008-009-010
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(

        args._id,
        { ...args.campos },
        { new: true }
      );
      return proyectoEditado;   
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );

      return proyectoConObjetivo;
    },

    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },
    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },
  },
};

export { resolversProyecto };

//pendiente mutaci??n de editar proyecto con las condiciones que piden las historias de usuario